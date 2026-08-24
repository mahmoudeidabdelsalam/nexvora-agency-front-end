import Link from "next/link";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/GravityForm";
import Hero from "@/components/shared/Hero";
import { getContactPageData } from "@/lib/wordpress";

function formatEgyptianPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 11 || !digits.startsWith("0")) return value;

  const local = digits.slice(1);
  return `+20 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`;
}

function sanitizeWhatsappLink(link: string | null | undefined) {
  if (!link) return link ?? undefined;

  return link.replace(/https?:\/\/wa\.me\/(\d+)/i, (_, digits) => {
    const normalized = digits.replace(/^0+/, "");
    return `https://wa.me/20${normalized}`;
  });
}

export const metadata = {
  title: "Contact NEXVORA | Let’s Talk About Your Next Project",
  description: "Book a discovery call with NEXVORA to discuss software strategy, digital growth, product engineering, and custom technology delivery.",
};

export default async function ContactPage() {
  const contactPageData = await getContactPageData();
  const fields = contactPageData?.contactPageSettings.contactPageFields;
  const homepageFields = contactPageData?.homepageSettings.homepageFields;

  const { contactHeadline, contactSubText, contactInformation = [], contactMap } = fields ?? {};

  const normalizedContactInformation = (contactInformation ?? []).map((info) => ({
    ...info,
    text: info.text ? formatEgyptianPhone(info.text) : info.text,
    link: sanitizeWhatsappLink(info.link),
  }));

  return (
    <>
      <main className="bg-white mb-30">
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
        <div className="mx-auto mt-16 justify-center items-center max-w-7xl sm:mt-20 lg:mt-24 grid gap-4 lg:gap-8 grid-cols-1 lg:grid-cols-2 contact-section">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-4 px-4 sm:px-6 lg:px-8 lg:pt-8">
            {normalizedContactInformation.map((info, index) => (
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

          <div className="rounded-2xl bg-white p-8 shadow-lg shadow-[#262263]/10 sm:p-10 lg:flex lg:flex-col lg:justify-center mt-20">
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
        ctaLabel={""}
        ctaLink={""}
      />
    </>
  );
}
