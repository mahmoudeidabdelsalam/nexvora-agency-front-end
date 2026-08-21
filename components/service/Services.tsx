import Link from "next/link";
import type { ServiceListItem } from "@/lib/wordpress";
import ScrollReveal from "../shared/ScrollReveal";

export default function Services({ services }: { services: ServiceListItem[] }) {
  return (
    <section id="services" className="bg-[#f7fbfc] px-4 py-4 lg:py-14 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 xl:grid-cols-3">
          {services.map((service, index) => (
            <ScrollReveal key={index} animation="fadeInLeft" delay={index * 120}>
              <Link 
                className="rounded-md border flex flex-col h-full items-center gap-4 border-white/10 bg-black/20 hover:bg-white px-5 py-3 backdrop-blur opacity-90 transition-opacity hover:opacity-100"
                href={`/service/${service.slug}`}
              >
                {service?.serviceFields?.icon?.node?.sourceUrl && (
                  <img
                    src={service?.serviceFields?.icon?.node?.sourceUrl}
                    alt={service?.serviceFields?.icon?.node?.altText ?? ""}
                    className="h-22 w-22 object-contain"
                  />
                )}
                <h2 className="m-0 font-semibold text-lg text-[#262263] text-center">{service.title}</h2>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-10">
          <Link href="/" className="text-sm font-semibold text-[#0997AA]">← Back home</Link>
        </div>
      </div>
    </section>
  );
}
