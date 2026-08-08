import { getHomepageData } from "@/lib/wordpress";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Counters from "@/components/Counters";
import { ClientLogos } from "@/components/ClientLogosAndCta";
import Footer from "@/components/Footer";
import BoxAbout from "@/components/BoxAbout";

// Revalidate hourly by default; on-demand revalidation via /api/revalidate
// (wired to a WordPress publish webhook) overrides this for fast updates.
export const revalidate = 3600;

export default async function HomePage() {
  const data = await getHomepageData();
  const { homepageFields } = data.homepageSettings;
  const { headerFields } = data.headerSettings;
  const { aboutpageFields } = data.aboutPageSettings;

  return (
    <>
      <Header
        logoUrl={headerFields.logo?.node.sourceUrl ?? "/logo.webp"}
        menu={headerFields.menu}
        ctaLabel={headerFields.labelButtonRight || "Let’s talk"}
        ctaHref={headerFields.linkButtonRight?.url || "/contact"}
      />
      <main className="relative overflow-hidden pb-12">
        <Hero
          eyebrow={aboutpageFields.aboutTag}
          heading={aboutpageFields.aboutHeadline}
          subtext={aboutpageFields.aboutSubText}
          video={aboutpageFields.aboutVideo}
          ctaLabel={homepageFields.heroCtaLabel}
          ctaLink={homepageFields.heroCtaLink}
          bgimageurl={homepageFields.bgimageurl?.node.sourceUrl}
          globallyHeadline={""}
          globallySubtext={""}
          globallyImage={""}
        />
        <Counters counters={homepageFields.counters} heading={homepageFields.countersHeadline ?? ""} subheading={homepageFields.countersSubText ?? ""} />
        <ClientLogos logos={homepageFields.clientLogos} />
        <BoxAbout boxAbout={aboutpageFields.boxAbout} />
      </main>
      <Footer bgimageurl={homepageFields.bgimageurl?.node.sourceUrl} ctaLabel={homepageFields.heroCtaLabel} ctaLink={homepageFields.heroCtaLink} />
    </>
  );
}
