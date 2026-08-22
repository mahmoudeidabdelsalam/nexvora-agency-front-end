import ScrollReveal from "./ScrollReveal";
import AnimatedNexus from "@/components/hero/AnimatedNexus";

type HeroProps = {
  eyebrow: string;
  heading: string;
  subtext: string;
  ctaLabel: string;
  ctaLink: string;
  bgimageurl?: string;
  video?: string;
  contactMap?: string;
  imageFeatured?: string;
  founderName?: string;
  founderTitle?: string;
  founderText?: string;
  imageFounder?: string;
  founderSocialLinks?: {
    socialLinkName: string;
    socialLinkUrl: string;
  }[];
};

export default function Hero({
  eyebrow,
  heading,
  subtext,
  ctaLabel,
  ctaLink,
  bgimageurl,
  video,
  contactMap,
  imageFeatured,
  imageFounder,
  founderSocialLinks,
  founderName,
  founderTitle,
  founderText,
}: HeroProps) {
  return (
    <section className={`relative ${eyebrow || heading || subtext || ctaLabel || ctaLink ? "lg:h-screen py-20 lg:py-0" : "pt-20"} bg-white px-6 lg:px-8 ${video ? "video-section" : ""} hero-section`}>
      {bgimageurl && (
        <div
          className="absolute inset-0 bg-cover bg-top-right bg-no-repeat"
          style={{ backgroundImage: `url(${bgimageurl})` }}
        />
      )}

      {imageFounder || founderSocialLinks || founderName || founderTitle || founderText ? (
        <div className="relative mx-auto flex flex-col max-w-7xl founder-section justify-center h-full">
          <div className="flex flex-col items-center justify-center gap-4 text-center founder-info">
            {imageFounder && (
              <ScrollReveal animation="fadeInUp" delay={120}>
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg shadow-[#262263]/10">
                  <img
                    className="w-full h-full object-cover"
                    src={imageFounder}
                    alt={founderName}
                  />
                </div>
              </ScrollReveal>
            )}
            {founderName && (
              <ScrollReveal animation="fadeInUp" delay={160}>
                <h3 className="text-xl font-semibold text-[#262263]">{founderName}</h3>
              </ScrollReveal>
            )}
            {founderTitle && (
              <ScrollReveal animation="fadeInUp" delay={200}>
                <p className="text-sm text-slate-600">{founderTitle}</p>
              </ScrollReveal>
            )}
            {founderSocialLinks && founderSocialLinks.length > 0 && (
              <ScrollReveal animation="fadeInUp" delay={280}>
                <div className="mb-2 flex gap-4">
                  {founderSocialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.socialLinkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0997AA] hover:text-[#066D7A] uppercase text-sm font-semibold tracking-[0.28em]"
                    >
                      {link.socialLinkName}
                    </a>
                  ))}
                </div>
              </ScrollReveal>
            )}
            {founderText && (
              <ScrollReveal animation="fadeInUp" delay={240}>
                <p className="max-w-2xl text-lg leading-8 text-slate-600">{founderText}</p>
              </ScrollReveal>
            )}
          </div>
        </div>
      ) : null}
       
      
        <div className="relative mx-auto flex flex-col max-w-7xl justify-center h-full">
          {!imageFeatured && (
            <>
            {eyebrow || heading || subtext || ctaLabel || ctaLink ? (
              <div className="pb-4 lg:py-24">
                <ScrollReveal animation="fadeInLeft">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#0997AA]">
                    {eyebrow}
                  </p>
                </ScrollReveal>
                <ScrollReveal animation="fadeInLeft" delay={80}>
                  <h2 className="max-w-3xl text-2xl font-semibold leading-[1.05] text-[#262263] sm:text-4xl lg:text-6xl">
                    {heading}
                  </h2>
                </ScrollReveal>
                <ScrollReveal animation="fadeInLeft" delay={160}>
                  <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                    {subtext}
                  </p>
                </ScrollReveal>
                {ctaLink && (
                  <ScrollReveal animation="fadeInLeft" delay={240}>
                    <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href={ctaLink}
                      className="rounded-md px-12 border border-[#0997AA]  py-3 text-sm font-semibold text-[#0997AA] shadow-lg shadow-[#0997AA]/20 transition-transform hover:-translate-y-0.5"
                    >
                      {ctaLabel}
                      <span className="ml-2" aria-hidden="true">→</span>
                    </a>

                    <a
                      href="/about-us/"
                      className="rounded-md px-12 border bg-[#0997AA]  py-3 text-sm font-semibold text-white shadow-lg shadow-[#0997AA]/20 transition-transform hover:-translate-y-0.5"
                    >
                      Learn More
                      <span className="ml-2" aria-hidden="true">→</span>
                    </a>
                    </div>
                  </ScrollReveal>
                )}
                <div className="absolute top-0 right-0 w-full h-full flex items-center justify-end pointer-events-none">
                  <AnimatedNexus />
                </div>
              </div>
            ) : null}
            </>
          )}
       

          {video && (
            <ScrollReveal animation="fadeInUp" delay={120}>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center video z-2">
                <div
                  className="w-full max-w-7xl aspect-video rounded-md overflow-hidden shadow-lg shadow-[#262263]/10"
                  dangerouslySetInnerHTML={{
                    __html: video || "",
                  }}
                />
              </div>
            </ScrollReveal>
          )}

          {contactMap && (
            <ScrollReveal animation="fadeInUp" delay={120}>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center global-hero">
                  <div
                    className="w-full max-w-7xl h-120 rounded-md overflow-hidden shadow-lg shadow-[#262263]/10 m-auto"
                    dangerouslySetInnerHTML={{
                      __html: contactMap || "",
                    }}
                  />
                </div>
            </ScrollReveal>
          )}

          {imageFeatured && (
            <ScrollReveal animation="fadeInUp" delay={120}>
              <div className="flex flex-row pb-5">
                {eyebrow || heading || subtext || ctaLabel || ctaLink ? (
                  <div className="flex-1/2">
                    <ScrollReveal animation="fadeInLeft">
                      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#0997AA]">
                        {eyebrow}
                      </p>
                    </ScrollReveal>
                    <ScrollReveal animation="fadeInLeft" delay={80}>
                      <h2 className="max-w-3xl text-2xl font-semibold leading-[1.05] text-[#262263] sm:text-4xl lg:text-6xl">
                        {heading}
                      </h2>
                    </ScrollReveal>
                    <ScrollReveal animation="fadeInLeft" delay={160}>
                      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                        {subtext}
                      </p>
                    </ScrollReveal>
                    {ctaLink && (
                      <ScrollReveal animation="fadeInLeft" delay={240}>
                        <div className="mt-8 flex flex-wrap gap-4">
                        <a
                          href={ctaLink}
                          className="rounded-md px-12 border border-[#0997AA]  py-3 text-sm font-semibold text-[#0997AA] shadow-lg shadow-[#0997AA]/20 transition-transform hover:-translate-y-0.5"
                        >
                          {ctaLabel}
                          <span className="ml-2" aria-hidden="true">→</span>
                        </a>

                        <a
                          href="/about-us/"
                          className="rounded-md px-12 border bg-[#0997AA]  py-3 text-sm font-semibold text-white shadow-lg shadow-[#0997AA]/20 transition-transform hover:-translate-y-0.5"
                        >
                          Learn More
                          <span className="ml-2" aria-hidden="true">→</span>
                        </a>
                        </div>
                      </ScrollReveal>
                    )}
                    <div className="absolute top-0 right-0 w-full h-full flex items-center justify-end pointer-events-none">
                      <AnimatedNexus />
                    </div>
                  </div>
                ) : null}
                  <div className="flex-1/2 h-120 bg-white rounded-md overflow-hidden shadow-lg shadow-[#262263]/10 m-auto p-2 lg:p-3">
                    <img className="w-full h-full object-cover object-top" src={imageFeatured} alt={heading} />
                  </div>
                </div>
            </ScrollReveal>
          )}
      </div>
    </section>
  );
}
