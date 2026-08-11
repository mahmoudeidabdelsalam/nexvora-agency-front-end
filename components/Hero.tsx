import ScrollReveal from "./ScrollReveal";

type HeroProps = {
  eyebrow: string;
  heading: string;
  subtext: string;
  ctaLabel: string;
  ctaLink: string;
  bgimageurl?: string;
  globallyHeadline?: string;
  globallySubtext?: string;
  globallyImage?: string;
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
  globallyHeadline,
  globallySubtext,
  globallyImage,
  video,
  contactMap,
  imageFeatured
}: HeroProps) {
  return (
    <section className={`relative px-6 pt-24 sm:pt-28 lg:px-8 ${video ? "video-section" : ""}${globallyHeadline || globallySubtext || globallyImage || contactMap  ? "globally-section" : ""} hero-section`}>
      {bgimageurl && (
        <div
          className="absolute inset-0 bg-cover bg-top-right bg-no-repeat"
          style={{ backgroundImage: `url(${bgimageurl})` }}
        />
      )}
      <div className="relative mx-auto flex flex-col max-w-7xl">
        <div className="pb-14">
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

        {(globallyHeadline || globallySubtext || globallyImage) && (
          <div className="max-w-full lg:max-w-6xl mx-auto border p-6 rounded-md shadow border-[#c4c4c7] bg-white grid gap-4 lg:grid-cols-2 lg:gap-6 items-center justify-center globally">
            <div className="flex-1/2">
              {globallyHeadline && (
                <ScrollReveal animation="fadeInLeft" delay={80}>
                  <h2 className="max-w-3xl text-xl text-center font-semibold leading-[1.05] text-[#262263] sm:text-2xl lg:text-3xl flex flex-col items-center justify-center gap-4">
                  <svg width="30px" height="30px" viewBox="0 0 270 236" version="1.1">
                      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                          <g id="NEXVORA-" transform="translate(-1917, -683)" fill="#0997AA" fillRule="nonzero">
                              <path d="M2107.54,781.25 C2118.05,760.49 2130.92,740.91 2145.69,722.94 C2077.93,765.28 2030.45,838.65 2019.58,917.81 C1984.09,917.24 1995.79,917.78 1917.96,917.89 C1927.23,843.77 1970.22,774.55 2032.54,733.37 C2069.58,708.89 2112.39,694.28 2155.82,685.01 C2165.49,682.95 2177.46,681.94 2183.38,689.86 C2186.79,694.42 2186.93,700.56 2186.93,706.26 C2186.92,767.16 2186.9,828.06 2186.89,888.96 C2186.89,897.08 2186.55,906.08 2180.91,911.93 C2175,918.06 2165.48,918.46 2156.97,918.46 C2131.67,918.46 2106.37,918.45 2081.07,918.44 C2079.16,888.3 2082.48,858.24 2089.55,828.93 C2090.64,824.41 2092.05,819.91 2093.47,815.44 C2094.92,810.87 2097.39,806.63 2097.91,801.76 C2100.42,798.7 2100.59,794.57 2102.68,791.3 C2103.86,789.46 2104.63,787.36 2105.48,785.31" id="Path"></path>
                          </g>
                      </g>
                  </svg>
                  {globallyHeadline}
                  </h2>
                </ScrollReveal>
              )}
              {globallySubtext && (
                <ScrollReveal animation="fadeInLeft" delay={160}>
                  <p className="mt-4 text-md leading-8 text-slate-600 text-center">{globallySubtext}</p>
                </ScrollReveal>
              )}
            </div>
            {globallyImage && (
              <ScrollReveal animation="fadeInUp" delay={120}>
                <img
                  src={globallyImage}
                  alt="Global highlight"
                  className="w-full"
                />
              </ScrollReveal>
            )}
          </div>
        )}

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

        {contactMap && (
           <ScrollReveal animation="fadeInUp" delay={120}>
             <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center globally">
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
             <div className="flex flex-col items-center justify-center gap-4 text-center globally pb-5">
                <div className="w-full max-w-7xl h-180 bg-white rounded-md overflow-hidden shadow-lg shadow-[#262263]/10 m-auto p-2 lg:p-3">
                  <img className="w-full h-full object-cover object-top" src={imageFeatured} alt={heading} />
                </div>
              </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
