import ScrollReveal from "./ScrollReveal";

type solution = { icon: { node: { sourceUrl: string } }; valuee: string }; 

export default function Team({ solutions, heading, subheading }: { solutions: solution[]; heading: string; subheading: string }) {
  return (
    <section className="bg-white/10 px-6 py-10 lg:px-8 relative">
     
      <div className="mx-auto grid max-w-7xl relative z-2 grid-cols-1 gap-0">
        <ScrollReveal animation="fadeInLeft">
          <h2 className="max-w-3xl text-xl font-semibold leading-[1.05] text-[#262263] sm:text-2xl lg:text-3xl flex flex-row gap-4 items-center">
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
          <p className="mt-4 text-md leading-8 text-slate-600 max-w-3xl">
            {subheading}
          </p>
        </ScrollReveal>
      </div>

      <div className="mt-6 mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 relative z-2">
        {solutions.map((item, index) => (
          <ScrollReveal key={item.valuee} animation="fadeInUp" delay={index * 120}>
            <div 
              className="group flex items-center justify-center gap-2 text-left"
            >
            {item.icon.node.sourceUrl && (
              <div className="rounded-md border flex items-center justify-center border-[#0b97ab]/10 bg-[#0b97ab] h-18 w-30 p-3 backdrop-blur opacity-80 transition-opacity group-hover:opacity-100">
                  <img
                      key={item.valuee}
                      src={item.icon.node.sourceUrl}
                      alt={item.valuee}
                      className="w-full object-contain"
                  />
              </div>
            )}
              <p className="m-0 font-bold text-md text-[#262263] group-hover:text-[#0997AA] transition-colors">{item.valuee}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
