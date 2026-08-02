import type { CaseStudy } from "@/lib/wordpress";

export default function CaseStudies({ caseStudies }: { caseStudies: CaseStudy[] }) {
  return (
    <section className="bg-ink px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl text-white md:text-4xl">
          Our clients are our partners
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {caseStudies.map((cs) => (
            <a
              key={cs.title}
              href={cs.caseStudyFields.link?.uri ?? "#"}
              className="group overflow-hidden rounded-lg border border-line transition-colors hover:border-signal"
            >
              {cs.caseStudyFields.thumbnail && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cs.caseStudyFields.thumbnail.node.sourceUrl}
                  alt={cs.caseStudyFields.thumbnail.node.altText}
                  className="h-44 w-full object-cover"
                />
              )}
              <div className="p-5">
                <p className="font-mono text-xs uppercase tracking-wide text-signal">
                  {cs.caseStudyFields.clientName}
                </p>
                <h3 className="mt-2 font-display text-lg text-white">{cs.title}</h3>
                <p className="mt-2 font-body text-sm text-white/50">
                  {cs.caseStudyFields.excerpt}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
