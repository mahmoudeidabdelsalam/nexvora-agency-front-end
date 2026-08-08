import type { Service } from "@/lib/wordpress";

export default function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="bg-[#f7fbfc] px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <h2 className="text-sm font-bold uppercase tracking-[0.28em] text-[#0997AA]">Services</h2>
          <p className="mt-3 text-md font-semibold text-[#262263]">FROM CUSTOM SOFTWARE AND CLOUD-BASED PLATFORMS TO ENTERPRISE IT INFRASTRUCTURE AND DATA-DRIVEN MARKETING STRATEGIES, NEXVORA HELPS BUSINESSES EMBRACE DIGITAL TRANSFORMATION, IMPROVE OPERATIONAL EFFICIENCY, AND ACHIEVE SUSTAINABLE GROWTH.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <div key={service.title} className="rounded-md border border-[#262263]/10 bg-white p-7 shadow-sm transition-transform hover:-translate-y-1">
              {service.serviceFields.icon && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={service.serviceFields.icon.node.sourceUrl}
                  alt={service.serviceFields.icon.node.altText}
                  className="mb-4 h-60 w-full rounded-md bg-[#f2fbfc] object-contain"
                />
              )}
              <h3 className="text-2xl text-center font-semibold text-[#262263]">{service.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
