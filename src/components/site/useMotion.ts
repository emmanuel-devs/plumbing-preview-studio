import { useEffect, useState, type RefObject } from "react";

/** Finite Web Animations enhance visible-by-default content without a hiding class. */
export function useMotion(key: string, sectionIds: readonly string[], host: RefObject<HTMLDivElement | null>) {
  const [active, setActive] = useState(sectionIds[0]);
  useEffect(() => {
    const root = host.current;
    if (!root) return;
    setActive(sectionIds[0]);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1024px) and (pointer: fine) and (hover: hover)");
    const cleanups: (() => void)[] = [];
    const animations = new Set<Animation>();
    const play = (el: HTMLElement, frames: Keyframe[], delay = 0, duration = 750) => {
      if (preference.matches || typeof el.animate !== "function") return;
      const animation = el.animate(frames, { duration, delay, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    };
    root.querySelectorAll<HTMLElement>("[data-entrance]").forEach((el) => {
      const image = el.hasAttribute("data-image-reveal");
      const frames = image
        ? [{ clipPath: "inset(12% 0 88% 0 round 1.5rem)", transform: "scale(1.06)" }, { clipPath: "inset(0% 0 0% 0 round 1.5rem)", transform: "scale(1)" }]
        : [{ opacity: 0, transform: "translateY(28px)" }, { opacity: 1, transform: "translateY(0)" }];
      play(el, frames, Number(el.dataset["entrance"] || 0), image ? 1100 : 850);
    });
    if ("IntersectionObserver" in window) {
      const reveal = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const siblings = Array.from(el.parentElement?.children ?? []).filter((child) => child.classList.contains("reveal"));
          play(el, [{ opacity: 0, transform: "translateY(24px)" }, { opacity: 1, transform: "translateY(0)" }], Math.max(0, siblings.indexOf(el) % 4) * 75);
          reveal.unobserve(el);
        });
      }, { threshold: 0.1 });
      root.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
      cleanups.push(() => reveal.disconnect());
      const spy = new IntersectionObserver((entries) => {
        entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id));
      }, { rootMargin: "-20% 0px -65% 0px", threshold: 0 });
      sectionIds.forEach((id) => {
        const el = root.querySelector(`#${id}`);
        if (el) spy.observe(el);
      });
      cleanups.push(() => spy.disconnect());
    }
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"));
    const magnets = Array.from(root.querySelectorAll<HTMLElement>("[data-magnetic]"));
    let frame = 0;
    const enabled = () => !preference.matches && desktop.matches;
    const update = () => {
      frame = 0;
      items.forEach((el) => {
        if (!enabled()) { el.style.translate = ""; return; }
        const r = (el.parentElement ?? el).getBoundingClientRect();
        const speed = Number(el.dataset["parallax"] || "0.06");
        const offset = Math.max(-24, Math.min(24, (r.top + r.height / 2 - window.innerHeight / 2) * -speed));
        el.style.translate = `0 ${offset.toFixed(1)}px`;
      });
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const reset = () => {
      if (preference.matches) {
        animations.forEach((animation) => animation.cancel());
        animations.clear();
      }
      if (!enabled()) magnets.forEach((el) => { el.style.translate = ""; });
      onScroll();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    preference.addEventListener("change", reset);
    desktop.addEventListener("change", reset);
    update();
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      preference.removeEventListener("change", reset);
      desktop.removeEventListener("change", reset);
      cancelAnimationFrame(frame);
      items.forEach((el) => { el.style.translate = ""; });
      animations.forEach((animation) => animation.cancel());
    });
    magnets.forEach((el) => {
      const move = (event: PointerEvent) => {
        if (!enabled()) return;
        const r = el.getBoundingClientRect();
        const x = Math.max(-8, Math.min(8, (event.clientX - r.left - r.width / 2) * 0.1));
        const y = Math.max(-6, Math.min(6, (event.clientY - r.top - r.height / 2) * 0.15));
        el.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
      };
      const leave = () => { el.style.translate = ""; };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      el.addEventListener("blur", leave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
        el.removeEventListener("blur", leave);
        leave();
      });
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, [key, host, sectionIds]);
  return active;
}
