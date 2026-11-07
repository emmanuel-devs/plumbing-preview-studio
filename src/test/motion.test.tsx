import { renderHook, cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useMotion } from "@/components/site/useMotion";
import { MotionFaq } from "@/components/site/MotionFaq";

const ids = ["home", "contact"];
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

function fixture(reduced: boolean, desktop: boolean) {
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    matches: query.includes("reduce") ? reduced : desktop,
    media: query, onchange: null, addListener: vi.fn(), removeListener: vi.fn(),
    addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
  const root = document.createElement("div");
  const entrance = document.createElement("h1");
  entrance.dataset["entrance"] = "180";
  const animate = vi.fn(() => ({ cancel: vi.fn(), onfinish: null }));
  Object.defineProperty(entrance, "animate", { value: animate, configurable: true });
  const magnet = document.createElement("a");
  magnet.dataset["magnetic"] = "";
  magnet.style.translate = "";
  root.append(entrance, magnet);
  renderHook(() => useMotion("sample", ids, { current: root }));
  return { animate, entrance, magnet };
}

describe("Shared motion constraints", () => {
  it("does not animate entrances or magnetic CTAs with reduced motion", () => {
    const { animate, entrance, magnet } = fixture(true, true);
    fireEvent.pointerMove(magnet, { clientX: 50, clientY: 50 });
    expect(animate).not.toHaveBeenCalled();
    expect(entrance.style.opacity).toBe("");
    expect(magnet.style.translate).toBe("");
  });
  it("does not apply magnetic movement on mobile", () => {
    const { magnet } = fixture(false, false);
    fireEvent.pointerMove(magnet, { clientX: 50, clientY: 50 });
    expect(magnet.style.translate).toBe("");
  });
  it("starts a finite staggered entrance when motion is allowed", () => {
    const { animate } = fixture(false, true);
    expect(animate).toHaveBeenCalledWith(expect.any(Array), expect.objectContaining({ delay: 180, duration: 850, fill: "backwards" }));
  });
  it("keeps native FAQ toggling available when animations are unavailable", () => {
    const { container, getByText } = render(<MotionFaq question="Quote?" answer="Call us." icon={<span>+</span>} />);
    fireEvent.click(getByText("Quote?"));
    expect(container.querySelector("details")?.open).toBe(true);
    fireEvent.click(getByText("Quote?"));
    expect(container.querySelector("details")?.open).toBe(false);
  });
});