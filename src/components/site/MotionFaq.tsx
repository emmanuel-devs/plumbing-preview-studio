import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";

/** Native details remains functional without JS; animate only its measured height. */
export function MotionFaq({ question, answer, icon }: { question: string; answer: string; icon: ReactNode }) {
  const details = useRef<HTMLDetailsElement>(null);
  const animation = useRef<Animation | null>(null);
  const expanded = useRef(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const settle = () => {
      if (!animation.current) return;
      animation.current?.cancel();
      animation.current = null;
      if (details.current) {
        details.current.open = expanded.current;
        details.current.style.height = "";
      }
    };
    preference.addEventListener("change", settle);
    return () => {
      animation.current?.cancel();
      preference.removeEventListener("change", settle);
    };
  }, []);
  const toggle = (event: MouseEvent<HTMLElement>) => {
    const el = details.current;
    const summary = el?.querySelector("summary");
    if (!el || !summary) return;
    if (typeof el.animate !== "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      expanded.current = !el.open;
      return;
    }
    event.preventDefault();
    const from = el.getBoundingClientRect().height;
    expanded.current = animation.current ? !expanded.current : !el.open;
    animation.current?.cancel();
    el.open = true;
    const to = expanded.current ? el.getBoundingClientRect().height : summary.getBoundingClientRect().height;
    const next = el.animate([{ height: `${from}px` }, { height: `${to}px` }], { duration: 320, easing: "cubic-bezier(.22,1,.36,1)" });
    animation.current = next;
    next.onfinish = () => {
      el.open = expanded.current;
      animation.current = null;
    };
  };
  return (
    <details ref={details} className="faq group overflow-hidden px-6">
      <summary onClick={toggle} className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg font-bold text-plum">
        {question}{icon}
      </summary>
      <p className="pb-6 leading-relaxed text-muted-foreground">{answer}</p>
    </details>
  );
}
