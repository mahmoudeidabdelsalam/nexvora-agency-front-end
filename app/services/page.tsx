import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getHomepageData, getPagesBySlug } from "@/lib/wordpress";

export const revalidate = 3600;

export default async function ServicesPage() {
  const data = await getHomepageData();
  const pages = await getPagesBySlug(["services"]);
  const page = pages[0];
  const { headerFields } = data.headerSettings;

  return (
    <>
      <Header
        logoUrl={headerFields.logo?.node.sourceUrl ?? "/logo.webp"}
        menu={headerFields.menu}
        ctaLabel={headerFields.labelButtonRight || "Let’s talk"}
        ctaHref={headerFields.linkButtonRight?.url || "/contact"}
      />
      <main className="bg-[#f7fbfc] px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0997AA]">Services</p>
          <h1 className="mt-4 text-xl font-semibold text-[#262263] sm:text-5xl">
            {page?.title || "Services"}
          </h1>
          <div className="mt-8 prose max-w-none text-slate-600" dangerouslySetInnerHTML={{ __html: page?.content || "<p>We design and build thoughtful digital products for ambitious teams.</p>" }} />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {data.allServices.nodes.map((service) => (
              <div key={service.title} className="rounded-md border border-[#262263]/10 bg-white p-7 shadow-sm">
                <h2 className="text-xl font-semibold text-[#262263]">{service.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{service.serviceFields.summary}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/" className="text-sm font-semibold text-[#0997AA]">← Back home</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
