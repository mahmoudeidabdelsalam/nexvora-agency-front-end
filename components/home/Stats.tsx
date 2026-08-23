import Link from "next/link";
import ScrollReveal from "../shared/ScrollReveal";
import type { ServiceListItem } from "@/lib/wordpress";

export default function Stats({ stats, heading, subheading }: { stats: ServiceListItem[]; heading: string; subheading: string }) {
  return (
    <section className="border-y border-[#262263]/10 bg-[linear-gradient(135deg,#0997AA_0%,#262262_100%)] px-6 py-10 lg:py-20 lg:px-8 relative stats-section">
      <div className="pattern"></div>
      <div className="mx-auto grid max-w-7xl relative z-2 grid-cols-1 gap-0">
        <ScrollReveal animation="fadeInLeft">
          <h2 className="text-xl font-bold leading-[1.05] text-white sm:text-2xl lg:text-3xl mb-2 flex flex-row items-center gap-4">
            <svg width="30px" height="30px" viewBox="0 0 270 236" version="1.1">
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="NEXVORA-" transform="translate(-1917, -683)" fill="#0997AA" fillRule="nonzero">
                      <path d="M2107.54,781.25 C2118.05,760.49 2130.92,740.91 2145.69,722.94 C2077.93,765.28 2030.45,838.65 2019.58,917.81 C1984.09,917.24 1995.79,917.78 1917.96,917.89 C1927.23,843.77 1970.22,774.55 2032.54,733.37 C2069.58,708.89 2112.39,694.28 2155.82,685.01 C2165.49,682.95 2177.46,681.94 2183.38,689.86 C2186.79,694.42 2186.93,700.56 2186.93,706.26 C2186.92,767.16 2186.9,828.06 2186.89,888.96 C2186.89,897.08 2186.55,906.08 2180.91,911.93 C2175,918.06 2165.48,918.46 2156.97,918.46 C2131.67,918.46 2106.37,918.45 2081.07,918.44 C2079.16,888.3 2082.48,858.24 2089.55,828.93 C2090.64,824.41 2092.05,819.91 2093.47,815.44 C2094.92,810.87 2097.39,806.63 2097.91,801.76 C2100.42,798.7 2100.59,794.57 2102.68,791.3 C2103.86,789.46 2104.63,787.36 2105.48,785.31" id="Path"></path>
                  </g>
              </g>
            </svg>
            <span>{heading}</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal animation="fadeInLeft" delay={120}>
          <p className="text-md  max-w-3xl leading-8 text-white/80 relative z-2 mb-12">
            {subheading}
          </p>
        </ScrollReveal>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 relative z-2">
        {stats.map((stat, index) => (
          <ScrollReveal key={index} animation="fadeInLeft" delay={index * 120}>
            <Link 
              className="rounded-md border flex items-center gap-4 border-white/10 bg-black/40 px-5 py-3 backdrop-blur opacity-90 transition-opacity hover:opacity-100"
               href={`/service/${stat.slug}`}
            >
              {stat?.serviceFields?.icon?.node?.sourceUrl && (
                <img
                  src={stat?.serviceFields?.icon?.node?.sourceUrl}
                  alt={stat?.serviceFields?.icon?.node?.altText ?? ""}
                  className="h-12 w-12 object-contain"
                />
              )}
              <p className="m-0 text-lg text-white">{stat.title}</p>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
