import ScrollReveal from "./ScrollReveal";

type boxAbout = { boxHeadline: string; boxSubText: string; boxImage: { node: { sourceUrl: string } }; boxBgColor: string, boxTextColor: string };

export default function BoxAbout({ boxAbout }: { boxAbout: boxAbout[]; }) {
  return (
    <section className="bg-white relative">
      <div className="mx-auto grid max-w-7xl relative z-2 grid-cols-1">
        {boxAbout.map((item, index) => (
          <ScrollReveal key={index} animation="fadeInUp" delay={index * 120}>
            <div className={`group flex flex-col items-center justify-center ${ index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse" } mt-4`}>
              <div className="flex items-center justify-center flex-1/2 p-10">
                {item.boxImage.node.sourceUrl && (
                  <img
                    key={index}
                    src={item.boxImage.node.sourceUrl}
                    alt={item.boxHeadline}
                    className="w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <div 
                className="flex flex-col justify-center p-6 flex-1/2 relative"
                >
                <div
                className={`w-[200%] absolute h-full -z-10 rounded-md ${ index % 2 === 0 ? "right-0" : "left-0" }`}
                style={{ backgroundColor: item.boxBgColor }}
                ></div>
                <h2 className="text-md font-bold leading-[1.05] text-white sm:text-2xl lg:text-3xl mb-4" style={{ color: item.boxTextColor }}>
                  {item.boxHeadline}
                </h2>
                <p className="text-sm text-white/80" style={{ color: item.boxTextColor }}>
                  {item.boxSubText}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}