import Footer from "@/components/layout/Footer";
import { getPagesBySlug, getServices, getSiteSettings } from "@/lib/wordpress";
import Services from "@/components/service/Services";


export default async function ServicesPage() {
  const pages = await getPagesBySlug(["services"]);
  const services = await getServices();
  const siteSettings = await getSiteSettings();
  const homepageFields = siteSettings?.homepageSettings.homepageFields;
  const page = pages[0];

  return (
    <>
      <main className="bg-white px-4 py-4 lg:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0997AA]">{page?.title || "Services"}</h1>
          <p className="mt-2 mb-8 text-xl font-semibold text-[#262263] sm:text-3xl" dangerouslySetInnerHTML={{ __html: page?.content || "We design and build thoughtful digital products for ambitious teams." }} />
        </div>
        <Services services={services} />
      </main>
      <Footer
        ctaLabel="Let’s talk"
        ctaLink="/contact-us"
        bgimageurl={homepageFields?.bgimageurl?.node.sourceUrl}
      />
    </>
  );
}
