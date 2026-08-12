import { getHomepageData, getServices } from "@/lib/wordpress";
import Hero from "@/components/shared/Hero";
import Stats from "@/components/home/Stats";
import Team from "@/components/home/Team";
import Counters from "@/components/home/Counters";
import Testimonials from "@/components/home/Testimonials";
import { ClientLogos } from "@/components/home/ClientLogos";
import Footer from "@/components/layout/Footer";
import CoreValues from "@/components/home/CoreValues";
import Projects from "@/components/home/Projects";

// Revalidate hourly by default; on-demand revalidation via /api/revalidate
// (wired to a WordPress publish webhook) overrides this for fast updates.
export const revalidate = 3600;

export default async function HomePage() {
  const data = await getHomepageData();
  const services = await getServices();
  const homepageFields = data?.homepageSettings?.homepageFields ?? {
    heroEyebrow: "",
    heroHeading: "",
    heroSubtext: "",
    heroCtaLabel: "",
    heroCtaLink: "",
    bgimageurl: undefined,
    globallyHeadline: "",
    globallySubtext: "",
    globallyImage: undefined,
    expertiseHeadline: "",
    expertiseSubText: "",
    solutions: [],
    teamHeadline: "",
    teamSubText: "",
    coreHeadline: "",
    coreSubText: "",
    coreImageLeft: undefined,
    coreValues: [],
    countersHeadline: "",
    countersSubText: "",
    counters: [],
    projects: [],
    clientLogos: [],
  };
  const testimonials = data?.allTestimonials?.nodes ?? [];
  return (
    <>
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
        <Testimonials testimonials={testimonials} />
      </main>
      <Footer bgimageurl={homepageFields.bgimageurl?.node.sourceUrl} ctaLabel={homepageFields.heroCtaLabel} ctaLink={homepageFields.heroCtaLink} />
    </>
  );
}
