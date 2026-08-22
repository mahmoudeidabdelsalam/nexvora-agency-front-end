"use client";

import { useEffect, useState } from "react";
import AnimatedN from "./AnimatedN";

export default function AnimatedNexus() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setMotionPreference = () => setReducedMotion(mediaQuery.matches);

    setMotionPreference();
    mediaQuery.addEventListener("change", setMotionPreference);

    return () => mediaQuery.removeEventListener("change", setMotionPreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const node = document.querySelector(".hero-visual-wrap");
    if (!node) return;

    let animationFrame = 0;

    const handlePointerMove = (event: Event) => {
      const pointerEvent = event as PointerEvent;
      const rect = node.getBoundingClientRect();
      const x = ((pointerEvent.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((pointerEvent.clientY - rect.top) / rect.height - 0.5) * 16;

      cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        setParallax({ x: Math.max(-10, Math.min(10, x)), y: Math.max(-8, Math.min(8, y)) });
      });
    };

    const handlePointerLeave = () => setParallax({ x: 0, y: 0 });

    node.addEventListener("pointermove", handlePointerMove);
    node.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      node.removeEventListener("pointermove", handlePointerMove);
      node.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [reducedMotion]);

  return <AnimatedN reducedMotion={reducedMotion} parallax={parallax} />;
}
