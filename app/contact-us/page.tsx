import Link from "next/link";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/GravityForm";
import Hero from "@/components/shared/Hero";
import { getContactPageData } from "@/lib/wordpress";

export default async function ContactPage() {
  const contactPageData = await getContactPageData();
  const fields = contactPageData?.contactPageSettings.contactPageFields;
  const homepageFields = contactPageData?.homepageSettings.homepageFields;

  const { contactHeadline, contactSubText, contactInformation = [], contactMap } = fields ?? {};

  return (
    <>
      <main className="bg-white">
        <Hero
          eyebrow="CONTACT"
          heading={contactHeadline ?? ""}
          subtext={contactSubText ?? ""}
          video=""
          ctaLabel=""
          ctaLink=""
          bgimageurl={homepageFields?.bgimageurl?.node.sourceUrl}
          contactMap={contactMap ?? ""}
        />
        <div className="mx-auto mt-16 justify-center items-center max-w-7xl sm:mt-20 lg:mt-24 grid gap-4 lg:gap-8 grid-cols-1 lg:grid-cols-2 lg:gap-4 lg:gap-16 stats-section">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-4 px-4 sm:px-6 lg:px-8 lg:pt-8">
            {contactInformation.map((info, index) => (
              <div key={index} className="relative">
                <dt className="flex gap-4 items-center font-semibold text-gray-900">
                  {info.icon?.node?.sourceUrl && (
                    <img src={info.icon.node.sourceUrl} alt="" className="p-4 h-20 w-20 bg-[#0b97ab] text-gray-600 rounded-md" />
                  )}

                  {info.link ? (
                    <Link href={info.link} className="text-[#262263] hover:text-[#0b97ab] text-xl">
                      {info.text}
                    </Link>
                  ) : (
                    <span className="text-[#262263] hover:text-[#0b97ab] text-xl">{info.text}</span>
                  )}
                </dt>
              </div>
            ))}
          </dl>

          <div className="rounded-2xl bg-white p-8 shadow-lg shadow-[#262263]/10 sm:p-10 lg:flex lg:flex-col lg:justify-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Get in touch</h2>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Fill out the form and we will get back to you as soon as possible.
            </p>
            <div className="mt-10">
              <ContactForm formId="1" />
            </div>
          </div>
        </div>
      </main>
      <Footer
        bgimageurl={homepageFields?.bgimageurl?.node.sourceUrl}
        ctaLabel={homepageFields?.heroCtaLabel ?? ""}
        ctaLink={homepageFields?.heroCtaLink ?? ""}
      />
    </>
  );
}
