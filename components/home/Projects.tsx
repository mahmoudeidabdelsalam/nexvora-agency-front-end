import ScrollReveal from "../shared/ScrollReveal";

type project = { projectsHeadline: string; projectsSubText: string; projectsImage: { node: { sourceUrl: string } }; projectsBgColor: string, projectsLink: string, projectsTextColor: string };

export default function Projects({ projects, widthCol }: { projects: project[]; widthCol: string; }) {
  return (
    <section className="bg-white/10 px-6 lg:px-8 pb-10 lg:pb-20 relative projects-section">
      <div className={`mx-auto grid max-w-7xl relative z-2 grid-cols-1 lg:grid-cols-2 gap-6`}>
        {projects.map((item, index) => (
          <ScrollReveal key={index} animation="fadeInUp" delay={index * 120}>
            <div 
              className={`group flex flex-col rounded-md overflow-hidden shadow-lg shadow-[#262263]/10 transition-transform hover:-translate-y-0.5 h-full`}
              style={{ backgroundColor: item.projectsBgColor }}
            >
              <a href={item.projectsLink} className="absolute inset-0 z-10" target="_blank" rel="noopener noreferrer" aria-label={`View details for ${item.projectsHeadline}`}></a>
              <div className="flex items-center justify-center img-projects">
                {item.projectsImage.node.sourceUrl && (
                  <img
                    key={index}
                    src={item.projectsImage.node.sourceUrl}
                    alt={item.projectsHeadline}
                    className={`object-cover object-top group-hover:scale-105 transition-transform duration-300`}
                  />
                )}
              </div>
              <div className="flex flex-col p-6 content-projects">
                <h2 className="text-md font-bold leading-[1.05] text-white sm:text-2xl lg:text-3xl mb-4 capitalize" style={{ color: item.projectsTextColor }}>
                  {item.projectsHeadline}
                </h2>
                <p className="text-sm text-white/80 mb-0" style={{ color: item.projectsTextColor }}>
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