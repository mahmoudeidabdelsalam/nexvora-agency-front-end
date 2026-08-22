type Particle = {
  id: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  offsetX: number;
  offsetY: number;
  duration: number;
  delay: number;
};

const PARTICLES: Particle[] = [
  { id: "p1", x: 105, y: 156, size: 3.4, opacity: 0.7, offsetX: 8, offsetY: -10, duration: 5.8, delay: 0.2 },
  { id: "p2", x: 162, y: 104, size: 2.8, opacity: 0.5, offsetX: -6, offsetY: 9, duration: 6.5, delay: 0.4 },
  { id: "p3", x: 218, y: 196, size: 2.2, opacity: 0.45, offsetX: 10, offsetY: -8, duration: 7.1, delay: 0.7 },
  { id: "p4", x: 287, y: 136, size: 3.1, opacity: 0.6, offsetX: -7, offsetY: 8, duration: 5.6, delay: 1.2 },
  { id: "p5", x: 347, y: 228, size: 2.7, opacity: 0.5, offsetX: 8, offsetY: -7, duration: 8.1, delay: 1.4 },
  { id: "p6", x: 424, y: 174, size: 2.8, opacity: 0.7, offsetX: -9, offsetY: 9, duration: 6.8, delay: 0.9 },
  { id: "p7", x: 472, y: 268, size: 3.2, opacity: 0.6, offsetX: 9, offsetY: -11, duration: 7.4, delay: 1.8 },
  { id: "p8", x: 498, y: 126, size: 2.6, opacity: 0.55, offsetX: -8, offsetY: 8, duration: 7.8, delay: 1.1 },
  { id: "p9", x: 164, y: 312, size: 2.2, opacity: 0.4, offsetX: 9, offsetY: 5, duration: 6.6, delay: 1.9 },
  { id: "p10", x: 226, y: 382, size: 3.3, opacity: 0.65, offsetX: -8, offsetY: -8, duration: 5.9, delay: 2.1 },
  { id: "p11", x: 318, y: 442, size: 2.7, opacity: 0.55, offsetX: 11, offsetY: -12, duration: 6.7, delay: 2.4 },
  { id: "p12", x: 410, y: 392, size: 2.9, opacity: 0.6, offsetX: -10, offsetY: 11, duration: 7.6, delay: 2.7 },
  { id: "p13", x: 484, y: 344, size: 2.4, opacity: 0.4, offsetX: 6, offsetY: -7, duration: 8.4, delay: 3 },
  { id: "p14", x: 104, y: 438, size: 2.6, opacity: 0.45, offsetX: -7, offsetY: 7, duration: 8.8, delay: 2.9 },
  { id: "p15", x: 82, y: 260, size: 2.3, opacity: 0.42, offsetX: 7, offsetY: -8, duration: 9.1, delay: 3.1 },
  { id: "p16", x: 516, y: 232, size: 2.5, opacity: 0.5, offsetX: -7, offsetY: 9, duration: 7.9, delay: 1.6 },
  { id: "p17", x: 382, y: 90, size: 2.9, opacity: 0.7, offsetX: 7, offsetY: -6, duration: 8.2, delay: 0.8 },
  { id: "p18", x: 250, y: 82, size: 2.6, opacity: 0.45, offsetX: -6, offsetY: 10, duration: 7.1, delay: 1 },
  { id: "p19", x: 136, y: 212, size: 2.2, opacity: 0.35, offsetX: 5, offsetY: -6, duration: 8.9, delay: 2.3 },
  { id: "p20", x: 454, y: 458, size: 2.7, opacity: 0.5, offsetX: -8, offsetY: 8, duration: 8.5, delay: 3.2 },
  { id: "p21", x: 532, y: 164, size: 2.8, opacity: 0.52, offsetX: 8, offsetY: -9, duration: 7.3, delay: 1.3 },
  { id: "p22", x: 205, y: 470, size: 2.3, opacity: 0.42, offsetX: -6, offsetY: 7, duration: 8.7, delay: 3.4 },
  { id: "p23", x: 300, y: 508, size: 2.4, opacity: 0.47, offsetX: 8, offsetY: -8, duration: 9.3, delay: 3.8 },
  { id: "p24", x: 148, y: 520, size: 2.2, opacity: 0.4, offsetX: 7, offsetY: -7, duration: 7.9, delay: 3.6 },
  { id: "p25", x: 548, y: 300, size: 2.5, opacity: 0.48, offsetX: -7, offsetY: 7, duration: 8.6, delay: 2.8 },
  { id: "p26", x: 84, y: 338, size: 2.7, opacity: 0.46, offsetX: 9, offsetY: -10, duration: 7.5, delay: 2.6 },
  { id: "p27", x: 548, y: 430, size: 2.1, opacity: 0.4, offsetX: -6, offsetY: 6, duration: 9.5, delay: 4.1 },
  { id: "p28", x: 280, y: 556, size: 2.3, opacity: 0.35, offsetX: 6, offsetY: -6, duration: 8.1, delay: 4.2 },
];

export default function HeroParticles() {
  return (
    <g className="hero-particles" aria-hidden="true">
      {PARTICLES.map((particle) => (
        <g key={particle.id} className="particle-group">
          <circle
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill="url(#particleGradient)"
            opacity={particle.opacity}
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              values={`0 0; ${particle.offsetX} ${particle.offsetY}; 0 0`}
              dur={`${particle.duration}s`}
              repeatCount="indefinite"
              begin={`${particle.delay}s`}
            />
          </circle>
        </g>
      ))}
    </g>
  );
}
