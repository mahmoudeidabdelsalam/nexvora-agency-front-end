import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { getServiceBySlug, getServices, getSiteSettings } from "@/lib/wordpress";
import Hero from "@/components/shared/Hero";
import Projects from "@/components/home/Projects";

export async function generateStaticParams() {
  // Generate params for every service to statically render service detail pages
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = await getServiceBySlug(resolvedParams.slug);
  const siteSettings = await getSiteSettings();
  const homepageFields = siteSettings?.homepageSettings.homepageFields;

  return (
    <>
      <main className="bg-white">
        <Hero
          eyebrow="SERVICE"
          heading={service?.title ?? ""}
          subtext={service?.serviceFields?.summary ?? ""}
          video=""
          ctaLabel="Let’s talk"
          ctaLink="/contact-us"
          bgimageurl={homepageFields?.bgimageurl?.node.sourceUrl}
          contactMap=""
          imageFeatured={service?.featuredImage?.node?.sourceUrl ?? ""}
        />
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="mt-8 bg-white/10 relative mb-8" dangerouslySetInnerHTML={{ __html: service?.serviceFields?.codeHtml ?? "<p>This service is coming soon.</p>" }} />
        </div>
        <div className="mx-auto max-w-7xl">
          <Projects projects={service?.serviceFields?.projects ?? []} widthCol="1" />
          <div className="mt-10">
            <Link href="/" className="text-sm font-semibold text-[#0997AA]">← Back to home</Link>
          </div>
        </div>
      </main>
      <Footer
        bgimageurl={homepageFields?.bgimageurl?.node.sourceUrl}
        ctaLabel="Let’s talk"
        ctaLink="/contact-us"
      />
    </>
  );
}
