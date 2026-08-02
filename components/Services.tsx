import type { Service } from "@/lib/wordpress";

export default function Services({ services }: { services: Service[] }) {
  return (
    <section className="bg-panel px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-2xl font-display text-3xl text-ink md:text-4xl">
          Expert software builders delivering enterprise-grade solutions
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div key={service.title} className="bg-panel p-6">
              {service.serviceFields.icon && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={service.serviceFields.icon.node.sourceUrl}
                  alt={service.serviceFields.icon.node.altText}
                  className="mb-4 h-8 w-8"
                />
              )}
              <h3 className="font-display text-lg text-ink">{service.title}</h3>
              <p className="mt-2 font-body text-sm text-ink/60">
                {service.serviceFields.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
