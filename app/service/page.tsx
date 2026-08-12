import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { getPagesBySlug, getServices } from "@/lib/wordpress";
import Services from "@/components/service/Services";


export default async function ServicesPage() {
  const pages = await getPagesBySlug(["services"]);
  const services = await getServices();
  const page = pages[0];

  return (
    <>
      <main className="bg-[#f7fbfc] px-4 py-4 lg:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0997AA]">Services</p>
          <h1 className="mt-4 text-xl font-semibold text-[#262263] sm:text-5xl">
            {page?.title || "Services"}
          </h1>
          <div className="mt-8 prose max-w-none text-slate-600" dangerouslySetInnerHTML={{ __html: page?.content || "<p>We design and build thoughtful digital products for ambitious teams.</p>" }} />
          <div className="mt-10">
            <Link href="/" className="text-sm font-semibold text-[#0997AA]">← Back home</Link>
          </div>
        </div>
      </main>
      <Services services={services} />
      <Footer />
    </>
  );
}
