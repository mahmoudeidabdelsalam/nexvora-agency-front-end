type ClientLogo = { name: string; logo: { node: { sourceUrl: string } } };

export function ClientLogos({ logos }: { logos: ClientLogo[] }) {
  return (
    <section className="border-y border-line bg-ink px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {logos.map((client) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={client.name}
            src={client.logo.node.sourceUrl}
            alt={client.name}
            className="h-6 opacity-40 grayscale transition-opacity hover:opacity-80"
          />
        ))}
      </div>
    </section>
  );
}

export function FinalCta({ ctaLabel, ctaLink }: { ctaLabel: string; ctaLink: string }) {
  return (
    <section className="bg-ink px-6 py-24 text-center">
      <h2 className="font-display text-3xl text-white md:text-4xl">
        Ready to start your project?
      </h2>
      <a
        href={ctaLink}
        className="mt-8 inline-block rounded-full bg-signal px-8 py-3 font-body text-sm font-medium text-ink"
      >
        {ctaLabel}
      </a>
    </section>
  );
}
