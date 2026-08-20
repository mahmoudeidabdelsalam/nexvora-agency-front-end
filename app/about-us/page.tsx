import { getAboutPageData } from "@/lib/wordpress";
import Hero from "@/components/shared/Hero";
import Counters from "@/components/home/Counters";
import { ClientLogos } from "@/components/home/ClientLogos";
import Footer from "@/components/layout/Footer";
import BoxAbout from "@/components/about/BoxAbout";


export default async function AboutPage() {
  const data = await getAboutPageData();
  const aboutpageFields = data?.aboutPageSettings.aboutpageFields;
  const homepageFields = data?.homepageSettings.homepageFields;

  return (
    <>
      <main className="relative overflow-hidden pb-12">
        <Hero
          eyebrow={aboutpageFields?.aboutTag ?? ""}
          heading={aboutpageFields?.aboutHeadline ?? ""}
          subtext={aboutpageFields?.aboutSubText ?? ""}
          video={aboutpageFields?.aboutVideo}
          ctaLabel={homepageFields?.heroCtaLabel ?? ""}
          ctaLink={homepageFields?.heroCtaLink ?? ""}
          bgimageurl={homepageFields?.bgimageurl?.node.sourceUrl}
        />
        <Counters counters={homepageFields?.counters ?? []} heading={homepageFields?.countersHeadline ?? ""} subheading={homepageFields?.countersSubText ?? ""} />
        <ClientLogos logos={homepageFields?.clientLogos ?? []} />
        <BoxAbout boxAbout={aboutpageFields?.boxAbout ?? []} />
      </main>
      <Footer bgimageurl={homepageFields?.bgimageurl?.node.sourceUrl} ctaLabel={homepageFields?.heroCtaLabel ?? ""} ctaLink={homepageFields?.heroCtaLink ?? ""} />
    </>
  );
}
