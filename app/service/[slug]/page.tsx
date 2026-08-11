import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getHomepageData, getServiceBySlug } from "@/lib/wordpress";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects"

export const revalidate = 3600;

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = await getServiceBySlug(resolvedParams.slug);
  const data = await getHomepageData();
  const { headerFields } = data.headerSettings;
  const { homepageFields } = data.homepageSettings;

  return (
    <>
      <Header
        logoUrl={headerFields.logo?.node.sourceUrl ?? "/logo.webp"}
        menu={headerFields.menu}
        ctaLabel={headerFields.labelButtonRight || "Let’s talk"}
        ctaHref={headerFields.linkButtonRight?.url || "/contact"}
      />
      <main className="bg-white">
        <Hero
          eyebrow={"SERVICE"}
          heading={service?.title || ""}
          subtext={service?.serviceFields?.summary  || ""}
          video={""}
          ctaLabel={"Let’s talk"}
          ctaLink={"/contact-us"}
          bgimageurl={homepageFields.bgimageurl?.node.sourceUrl}
          globallyHeadline={""}
          globallySubtext={""}
          globallyImage={""}
          contactMap={""}
          imageFeatured={service?.featuredImage?.node?.sourceUrl ?? ""}
        />
        <div className="mx-auto max-w-7xl">
          <div className="mt-8 bg-white/10 px-6 lg:px-8 relative" dangerouslySetInnerHTML={{ __html: service?.content || "<p>This service is coming soon.</p>" }} />
          <Projects projects={service?.serviceFields?.projects ?? []} widthCol="1" />
          <div className="mt-10">
            <Link href="/" className="text-sm font-semibold text-[#0997AA]">← Back to home</Link>
          </div>
        </div>
      </main>
      <Footer 
        bgimageurl={homepageFields.bgimageurl?.node.sourceUrl} 
        ctaLabel={"Let’s talk"}
        ctaLink={"/contact-us"}
      />
    </>
  );
}
