"use client";

import { useEffect, useState } from "react";
import HeroParticles from "./HeroParticles";

type AnimatedNProps = {
  reducedMotion?: boolean;
  parallax?: { x: number; y: number };
};

export default function AnimatedN({ reducedMotion = false, parallax = { x: 0, y: 0 } }: AnimatedNProps) {
  const [hasAnimated, setHasAnimated] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const element = document.querySelector(".hero-visual");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      className={`hero-visual ${reducedMotion || hasAnimated ? "is-animated" : ""}`}
      style={{
        transform: `translate3d(${parallax.x * 0.55}px, ${parallax.y * 0.55}px, 0)`,
      }}
    >
      <svg
        viewBox="0 0 620 620"
        role="img"
        aria-label="Nexvora digital core"
        className="nexvora-svg"
      >
        <g className="n-graphic" style={{ transform: `translate3d(${parallax.x * -0.2}px, ${parallax.y * 0.2}px, 0)` }}>
          <g className="orbit-layer" aria-hidden="true">
            <ellipse className="orbit-ring reverse" cx="310" cy="310" rx="238" ry="170" fill="none" stroke="rgba(79,70,255,0.24)" strokeWidth="1.1" />
            <ellipse className="orbit-ring" cx="310" cy="310" rx="192" ry="230" fill="none" stroke="rgba(91,140,255,0.22)" strokeWidth="1" />
            <ellipse className="orbit-ring reverse" cx="310" cy="310" rx="258" ry="104" fill="none" stroke="rgba(124,58,237,0.18)" strokeWidth="0.9" />
          </g>
          <g className="n-main" aria-hidden="true">
            <path
              className="draw-stroke n-primary"
              d="M128 100 L184 100 L184 392 L286 100 L344 100 L344 500 L290 500 L290 188 L186 500 L128 500 Z"
              fill="url(#nGradient)"
              opacity="0.94"
              filter="url(#softGlow)"
            />
            <path
              className="draw-stroke n-inner"
              d="M170 138 L218 138 L218 354 L286 138 L334 138 L334 440 L282 440 L282 196 L214 440 L170 440 Z"
              fill="url(#nGlow)"
              opacity="0.21"
              stroke="rgba(255,255,255,0.62)"
              strokeWidth="1.2"
            />
            <path
              className="draw-stroke n-highlight"
              d="M200 164 L236 164 L236 318 L286 164 L322 164 L322 344 L286 344 L286 214 L238 344 L200 344 Z"
              fill="rgba(255,255,255,0.18)"
              opacity="0.7"
            />
          </g>
          <g className="data-lines" aria-hidden="true">
            <path className="flow-line" d="M118 282 L182 282" />
            <path className="flow-line" d="M458 272 L520 272" />
            <path className="flow-line" d="M268 102 L262 70" />
            <path className="flow-line" d="M356 102 L362 70" />
            <path className="flow-line" d="M204 486 L162 520" />
            <path className="flow-line" d="M364 486 L410 520" />
            <path className="flow-line" d="M116 206 L82 178" />
            <path className="flow-line" d="M490 210 L540 178" />
            <path className="flow-line" d="M142 160 L94 132" />
            <path className="flow-line" d="M468 160 L518 132" />
          </g>
          <g className="connection-points" aria-hidden="true">
            <circle className="node node-a" cx="118" cy="282" r="4" />
            <circle className="node node-b" cx="520" cy="272" r="4" />
            <circle className="node node-c" cx="262" cy="70" r="3.2" />
            <circle className="node node-d" cx="362" cy="70" r="3.2" />
            <circle className="node node-e" cx="162" cy="520" r="3.6" />
            <circle className="node node-f" cx="410" cy="520" r="3.6" />
            <circle className="node node-g" cx="82" cy="178" r="3.1" />
            <circle className="node node-h" cx="540" cy="178" r="3.1" />
          </g>
          <HeroParticles />
        </g>
      </svg>
    </div>
  );
}
