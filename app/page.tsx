import { getHomepageData, getServices } from "@/lib/wordpress";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Team from "@/components/Team";
import Counters from "@/components/Counters";
import Testimonials from "@/components/Testimonials";
import { ClientLogos } from "@/components/ClientLogosAndCta";
import Footer from "@/components/Footer";
import CoreValues from "@/components/CoreValues";
import Projects from "@/components/Projects";

// Revalidate hourly by default; on-demand revalidation via /api/revalidate
// (wired to a WordPress publish webhook) overrides this for fast updates.
export const revalidate = 3600;

export default async function HomePage() {
  const data = await getHomepageData();
  const services = await getServices();
  const { homepageFields } = data.homepageSettings;
  const { headerFields } = data.headerSettings;
  return (
    <>
      <Header
        logoUrl={headerFields.logo?.node.sourceUrl ?? "/logo.webp"}
        menu={headerFields.menu}
        ctaLabel={headerFields.labelButtonRight || "Let’s talk"}
        ctaHref={headerFields.linkButtonRight?.url || "/contact"}
      />
      <main>
        <Hero
          eyebrow={homepageFields.heroEyebrow}
          heading={homepageFields.heroHeading}
          subtext={homepageFields.heroSubtext}
          ctaLabel={homepageFields.heroCtaLabel}
          ctaLink={homepageFields.heroCtaLink}
          bgimageurl={homepageFields.bgimageurl?.node.sourceUrl}
          globallyHeadline={homepageFields.globallyHeadline}
          globallySubtext={homepageFields.globallySubtext}
          globallyImage={homepageFields.globallyImage?.node.sourceUrl}
        />
        <Stats stats={services} heading={homepageFields.expertiseHeadline ?? ""} subheading={homepageFields.expertiseSubText ?? ""} />
        <Team solutions={homepageFields.solutions} heading={homepageFields.teamHeadline ?? ""} subheading={homepageFields.teamSubText ?? ""} />
        <CoreValues coreValues={homepageFields.coreValues} heading={homepageFields.coreHeadline ?? ""} subheading={homepageFields.coreSubText ?? ""} image={homepageFields.coreImageLeft ?? { node: { sourceUrl: "" } }} />
        <Counters counters={homepageFields.counters} heading={homepageFields.countersHeadline ?? ""} subheading={homepageFields.countersSubText ?? ""} />
        <Projects projects={homepageFields.projects} widthCol="2" />
        <ClientLogos logos={homepageFields.clientLogos} />
        <Testimonials testimonials={data.allTestimonials.nodes} />
      </main>
      <Footer bgimageurl={homepageFields.bgimageurl?.node.sourceUrl} ctaLabel={homepageFields.heroCtaLabel} ctaLink={homepageFields.heroCtaLink} />
    </>
  );
}
