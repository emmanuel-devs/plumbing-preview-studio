import type { ReactNode } from "react";
import type { ServiceIcon } from "@/data/businesses";

export type IconName = ServiceIcon | "phone" | "mail" | "pin" | "check" | "menu" | "close" | "arrow" | "plus" | "clock";

const paths: Record<IconName, ReactNode> = {
  leak: <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />,
  drain: <><circle cx="12" cy="12" r="8" /><path d="M8 12h8M12 8v8" /></>,
  heater: <><rect x="6" y="3" width="12" height="18" rx="3" /><path d="M10 15c0-2 2-2 2-4 0 2 2 2 2 4a2 2 0 0 1-4 0z" /></>,
  fixture: <><path d="M4 10h10a4 4 0 0 1 4 4v1" /><path d="M8 10V6h4v4" /><path d="M18 18v.01M16 20v.01M20 20v.01" /></>,
  pipe: <><path d="M3 8h8a4 4 0 0 1 4 4v9" /><path d="M3 4v8M11 21h8" /></>,
  urgent: <><path d="M12 3 2 20h20L12 3z" /><path d="M12 10v4M12 17v.01" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  pin: <><path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
  check: <path d="m5 12 5 5L20 7" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
};

export function Icon({ name, className = "size-6" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
