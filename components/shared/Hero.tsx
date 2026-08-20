import ScrollReveal from "./ScrollReveal";

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
};

export default function Hero({
  eyebrow,
  heading,
  subtext,
  ctaLabel,
  ctaLink,
  bgimageurl,
  video,
}: HeroProps) {
  return (
    <section className={`relative px-6 pt-24 sm:pt-28 lg:px-8 ${video ? "video-section" : ""} hero-section`}>
      {bgimageurl && (
        <div
          className="absolute inset-0 bg-cover bg-top-right bg-no-repeat"
          style={{ backgroundImage: `url(${bgimageurl})` }}
        />
      )}
      <div className="relative mx-auto flex flex-col max-w-7xl">
        <div className="pb-4 lg:pb-14">
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
                className="rounded-md bg-[#0997AA] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0997AA]/20 transition-transform hover:-translate-y-0.5"
              >
                {ctaLabel}
              </a>
              </div>
            </ScrollReveal>
          )}
        </div>

        {video && (
          <ScrollReveal animation="fadeInUp" delay={120}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center video">
              <div
                className="w-full max-w-7xl aspect-video rounded-md overflow-hidden shadow-lg shadow-[#262263]/10"
                dangerouslySetInnerHTML={{
                  __html: video || "",
                }}
              />
            </div>
          </ScrollReveal>
        )}

      </div>
    </section>
  );
}
