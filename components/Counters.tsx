"use client";

import { useEffect, useRef, useState } from "react";

type counter = { text: string; valuee: string };

export default function Counters({ counters, heading, subheading }: { counters: counter[]; heading: string; subheading: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white/10 px-6 py-16 lg:px-8 relative counters-section">
      <div className={`mt-12 mx-auto max-w-7xl grid grid-cols-1 gap-6 md:grid-cols-6 xl:grid-cols-12 ${isVisible ? "" : "opacity-0"}`}>
        <h2 className={`xl:col-span-12 md:col-span-6 text-xl font-semibold leading-[1.05] text-[#262263] sm:text-2xl lg:text-3xl flex flex-row gap-4 items-center ${isVisible ? "animated fadeInLeft" : "opacity-0"}`}>
          <svg width="30px" height="30px" viewBox="0 0 270 236" version="1.1">
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="NEXVORA-" transform="translate(-1917, -683)" fill="#0997AA" fillRule="nonzero">
                      <path d="M2107.54,781.25 C2118.05,760.49 2130.92,740.91 2145.69,722.94 C2077.93,765.28 2030.45,838.65 2019.58,917.81 C1984.09,917.24 1995.79,917.78 1917.96,917.89 C1927.23,843.77 1970.22,774.55 2032.54,733.37 C2069.58,708.89 2112.39,694.28 2155.82,685.01 C2165.49,682.95 2177.46,681.94 2183.38,689.86 C2186.79,694.42 2186.93,700.56 2186.93,706.26 C2186.92,767.16 2186.9,828.06 2186.89,888.96 C2186.89,897.08 2186.55,906.08 2180.91,911.93 C2175,918.06 2165.48,918.46 2156.97,918.46 C2131.67,918.46 2106.37,918.45 2081.07,918.44 C2079.16,888.3 2082.48,858.24 2089.55,828.93 C2090.64,824.41 2092.05,819.91 2093.47,815.44 C2094.92,810.87 2097.39,806.63 2097.91,801.76 C2100.42,798.7 2100.59,794.57 2102.68,791.3 C2103.86,789.46 2104.63,787.36 2105.48,785.31" id="Path"></path>
                  </g>
              </g>
          </svg>
          <span className="flex flex-col"><span>{heading}</span> <span className="font-normal capitalize text-[#0997AA]">{subheading}</span></span>
        </h2>
        {counters.map((item, index) => (
          <div
            key={item.valuee}
            className={`group bg-[#0b97ab] hover:bg-[#262263] transition-colors md:col-span-2 xl:col-span-2 flex flex-col items-start justify-center gap-1 text-left p-4 rounded-md backdrop-blur opacity-80 hover:opacity-100 relative ${isVisible ? "animated fadeInUp" : "opacity-0"}`}
            style={{ animationDelay: `${index * 120}ms` }}
          >
            <svg fill="none" viewBox="0 0 295 172" className="absolute inset-0 z-0 opacity-30 h-fit w-full object-contain">
              <linearGradient id="paint0_linear_3374_4545" gradientUnits="userSpaceOnUse" x1="282" x2="64" y1="-.000001" y2="172">
                <stop offset="0" stopColor="#e4ebf5"/>
                <stop offset="1" stopColor="#e4ebf5" stopOpacity=".5"/>
              </linearGradient>
              <mask id="mask0_3374_4545" height="172" maskUnits="userSpaceOnUse" width="295" x="0" y="0">
                <path d="M0 0H295V172H0V0Z" fill="url(#paint0_linear_3374_4545)"/>
              </mask>
              <g mask="url(#mask0_3374_4545)">
                <path d="M0 140.2C0 140.2 53.0806 114.323 135.075 114.323 217.069 114.323 266.922 146 366.386 146 465.849 146 520.669 88 621 88" stroke="#f5f9ff" strokeWidth="3"/>
              </g>
            </svg>
            <p className="m-0 font-sans font-extrabold text-[50px] text-white group-hover:text-[#0997AA] transition-colors z-1">{item.valuee}</p>
            <p className="m-0 text-lg text-white/90 group-hover:text-[#0997AA] transition-colors z-1">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
