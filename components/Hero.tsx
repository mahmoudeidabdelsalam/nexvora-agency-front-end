type HeroProps = {
  eyebrow: string;
  heading: string;
  subtext: string;
  ctaLabel: string;
  ctaLink: string;
};

export default function Hero({ eyebrow, heading, subtext, ctaLabel, ctaLink }: HeroProps) {
  return (
    <section className="border-b border-line bg-ink px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-signal">
            {eyebrow}
          </p>
          <h1 className="font-display text-4xl leading-[1.1] text-white md:text-6xl">
            {heading}
          </h1>
          <p className="mt-6 max-w-xl font-body text-lg text-white/60">{subtext}</p>
          <a
            href={ctaLink}
            className="mt-8 inline-block rounded-full bg-signal px-7 py-3 font-body text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
          >
            {ctaLabel}
          </a>
        </div>

        {/* Signature element: a terminal-style "system status" readout,
            standing in for the agency's delivery pipeline — a concrete
            artifact from a software shop's own world, not a stock graphic. */}
        <div className="rounded-lg border border-line bg-[#0B0D12] p-5 font-mono text-xs text-white/70 shadow-2xl">
          <div className="mb-3 flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
          <p><span className="text-signal">$</span> deploy --env production</p>
          <p className="text-white/40">&gt; running test suite... ok</p>
          <p className="text-white/40">&gt; build optimized bundle... ok</p>
          <p className="text-white/40">&gt; provisioning infrastructure... ok</p>
          <p className="mt-2 text-signal">&#10003; live in 2m 14s</p>
        </div>
      </div>
    </section>
  );
}
