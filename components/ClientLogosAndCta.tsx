import ScrollReveal from "./ScrollReveal";

type ClientLogo = { name: string; logo: { node: { sourceUrl: string } } };

export function ClientLogos({ logos }: { logos: ClientLogo[] }) {
  return (
    <section className="border-y border-[#262263]/10 bg-[linear-gradient(135deg,#0997AA_0%,#262262_100%)] px-6 py-16 lg:px-8 relative">
      <div className="pattern"></div>
      <div className="mx-auto max-w-7xl text-center mb-12 relative z-2">
        <ScrollReveal animation="fadeInLeft">
          <h2 className="max-w-3xl text-xl font-semibold leading-[1.05] text-white sm:text-2xl lg:text-3xl flex flex-row gap-4 items-center">
            <svg width="30px" height="30px" viewBox="0 0 270 236" version="1.1">
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="NEXVORA-" transform="translate(-1917, -683)" fill="#0997AA" fillRule="nonzero">
                      <path d="M2107.54,781.25 C2118.05,760.49 2130.92,740.91 2145.69,722.94 C2077.93,765.28 2030.45,838.65 2019.58,917.81 C1984.09,917.24 1995.79,917.78 1917.96,917.89 C1927.23,843.77 1970.22,774.55 2032.54,733.37 C2069.58,708.89 2112.39,694.28 2155.82,685.01 C2165.49,682.95 2177.46,681.94 2183.38,689.86 C2186.79,694.42 2186.93,700.56 2186.93,706.26 C2186.92,767.16 2186.9,828.06 2186.89,888.96 C2186.89,897.08 2186.55,906.08 2180.91,911.93 C2175,918.06 2165.48,918.46 2156.97,918.46 C2131.67,918.46 2106.37,918.45 2081.07,918.44 C2079.16,888.3 2082.48,858.24 2089.55,828.93 C2090.64,824.41 2092.05,819.91 2093.47,815.44 C2094.92,810.87 2097.39,806.63 2097.91,801.76 C2100.42,798.7 2100.59,794.57 2102.68,791.3 C2103.86,789.46 2104.63,787.36 2105.48,785.31" id="Path"></path>
                  </g>
              </g>
            </svg>
            <span>CLIENTELE</span>
          </h2>
        </ScrollReveal>
      </div>
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 items-center justify-center gap-x-10 gap-y-8 relative z-2">
        {logos.map((client, index) => (
          <ScrollReveal key={client.name} animation="fadeInUp" delay={index * 80}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="flex h-32 flex-3/12 items-center justify-center bg-white rounded-md border border-white/10 px-4 py-2 backdrop-blur transition-transform hover:-translate-y-0.5">
              <img
                src={client.logo.node.sourceUrl}
                alt={client.name}
                className="object-contain opacity-90 transition-opacity hover:opacity-100 h-full"
              />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}