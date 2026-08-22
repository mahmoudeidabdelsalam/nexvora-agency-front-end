import ScrollReveal from "../shared/ScrollReveal";

type project = { projectsHeadline: string; projectsSubText: string; projectsImage: { node: { sourceUrl: string } }; projectsBgColor: string, projectsLink: string, projectsTextColor: string };

export default function Projects({ projects, widthCol }: { projects: project[]; widthCol: string; }) {
  return (
    <section className="bg-white/10 px-6 lg:px-8 pb-10 lg:pb-20 relative projects-section">
      <div className={`mx-auto grid max-w-7xl relative z-2 grid-cols-1 gap-6`}>
        {projects.map((item, index) => (
          <ScrollReveal key={index} animation="fadeInUp" delay={index * 120}>
            <div 
              className={`group flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center rounded-md overflow-hidden shadow-lg shadow-[#262263]/10 transition-transform hover:-translate-y-0.5`}
              style={{ backgroundColor: item.projectsBgColor }}
            >
              <a href={item.projectsLink} className="absolute inset-0 z-10" target="_blank" rel="noopener noreferrer" aria-label={`View details for ${item.projectsHeadline}`}></a>
              <div className="img-projects lg:p-12 p-2 flex-1/2">
                {item.projectsImage.node.sourceUrl && (
                  <img
                    key={index}
                    src={item.projectsImage.node.sourceUrl}
                    alt={item.projectsHeadline}
                    className={`object-cover object-top-left rounded-md border border-[#0b97ab] shadow group-hover:scale-105 transition-transform duration-300`}
                  />
                )}
              </div>
              <div className="flex flex-col p-6 content-projects flex-1/2">
                <h2 className="text-2xl sm:text-3xl lg:text-5xl  font-bold leading-[1.05] text-white mb-4 capitalize" style={{ color: item.projectsTextColor }}>
                  {item.projectsHeadline}
                </h2>
                <p className="text-lg text-white/80 mb-0" style={{ color: item.projectsTextColor }}>
                  {item.projectsSubText}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}