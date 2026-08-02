import { getHomepageData } from "@/lib/wordpress";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import { ClientLogos, FinalCta } from "@/components/ClientLogosAndCta";
import Footer from "@/components/Footer";

// Revalidate hourly by default; on-demand revalidation via /api/revalidate
// (wired to a WordPress publish webhook) overrides this for fast updates.
export const revalidate = 3600;

export default async function HomePage() {
  const data = await getHomepageData();
  const { homepageFields } = data.homepageSettings;

  return (
    <>
      <Header />
      <main>
        <Hero
          eyebrow={homepageFields.heroEyebrow}
          heading={homepageFields.heroHeading}
          subtext={homepageFields.heroSubtext}
          ctaLabel={homepageFields.heroCtaLabel}
          ctaLink={homepageFields.heroCtaLink}
        />
        <Stats stats={homepageFields.stats} />
        <Services services={data.allServices.nodes} />
        <CaseStudies caseStudies={data.caseStudies.nodes} />
        <ClientLogos logos={homepageFields.clientLogos} />
        <Testimonials testimonials={data.allTestimonials.nodes} />
        <FinalCta ctaLabel={homepageFields.heroCtaLabel} ctaLink={homepageFields.heroCtaLink} />
      </main>
      <Footer />
    </>
  );
}
