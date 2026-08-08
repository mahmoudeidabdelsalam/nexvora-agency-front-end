import type { CaseStudy } from "@/lib/wordpress";

export default function CaseStudies({ caseStudies }: { caseStudies: CaseStudy[] }) {
  return (
    <section id="case-studies" className="bg-white px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0997AA]">Case studies</p>
          <h2 className="mt-3 text-3xl font-semibold text-[#262263] sm:text-xl">
            Trusted by teams that need high-impact execution and dependable delivery.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <a
              key={cs.title}
              href={cs.caseStudyFields.linkUrl || "#"}
              className="group overflow-hidden rounded-md border border-[#262263]/10 bg-[#f7fbfc] shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              {cs.caseStudyFields.thumbnail && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cs.caseStudyFields.thumbnail.node.sourceUrl}
                  alt={cs.caseStudyFields.thumbnail.node.altText}
                  className="h-44 w-full object-cover"
                />
              )}
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0997AA]">
                  {cs.caseStudyFields.clientName}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-[#262263]">{cs.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{cs.caseStudyFields.excerpt}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
