import { useEffect, useState } from "react";

/**
 * Shared motion system for every tenant site:
 * - scroll reveals (.reveal / .reveal-clip) via IntersectionObserver, once
 * - active-section tracking for the nav indicator
 * - restrained scroll parallax on [data-parallax="speed"] (desktop/tablet, motion allowed)
 * - magnetic hover on [data-magnetic] (fine pointer only)
 * Content stays visible without JS: hiding is gated on html.motion-ready.
 */
export function useMotion(key: string, sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal, .reveal-clip"));

    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-visible"));
    } else {
      root.classList.add("motion-ready");
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              io.unobserve(e.target);
            }
          }),
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );
      reveals.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // Active section
    if ("IntersectionObserver" in window) {
      const spy = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
        { rootMargin: "-45% 0px -50% 0px" },
      );
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) spy.observe(el);
      });
      cleanups.push(() => spy.disconnect());
    }

    // Parallax
    if (!reduce && window.matchMedia("(min-width: 768px)").matches) {
      const items = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
      let frame = 0;
      const update = () => {
        frame = 0;
        const vh = window.innerHeight;
        for (const el of items) {
          const host = el.parentElement ?? el;
          const r = host.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) continue;
          const speed = parseFloat(el.dataset.parallax || "0.1");
          const offset = (r.top + r.height / 2 - vh / 2) * -speed;
          el.style.translate = `0 ${offset.toFixed(1)}px`;
        }
      };
      const onScroll = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      cleanups.push(() => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        cancelAnimationFrame(frame);
        items.forEach((el) => (el.style.translate = ""));
      });
    }

    // Magnetic
    if (!reduce && window.matchMedia("(pointer: fine) and (hover: hover)").matches) {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width / 2)) * 0.2;
          const y = (e.clientY - (r.top + r.height / 2)) * 0.3;
          el.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
        };
        const leave = () => (el.style.translate = "");
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
          leave();
        });
      });
    }

    return () => cleanups.forEach((c) => c());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}
