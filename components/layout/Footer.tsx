import Link from "next/link";
import ScrollReveal from "../shared/ScrollReveal";

type FooterLink = {
  label: string;
  url: string;
};

const COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "Home", url: "/" },
      { label: "About us", url: "/about-us" },
      { label: "Blog", url: "/blog" },
      { label: "Contact", url: "/contact-us" },
    ] satisfies FooterLink[],
  },
  {
    title: "Technologies",
    links: [
      { label: "Android & iOS", url: "/service/mobile-applications/#mad-showcase" },
      { label: "CMS & PHP", url: "/service/web-development/#mad-showcase" },
      { label: "Figma & Illustrator", url: "/service/brand-identity-graphic-design/#wd-showcase" },
      { label: "SSL & Monitoring", url: "/service/cybersecurity-recovery-service/#st-showcase" }
    ] satisfies FooterLink[],
  },
  {
    title: "Services",
    links: [
      { label: "Mobile Applications", url: "/service/mobile-applications/" },
      { label: "Web design & Development", url: "/service/web-development/" },
      { label: "Brand Identity & Graphic Design", url: "/service/brand-identity-graphic-design/" },
      { label: "Cybersecurity & Recovery Service", url: "/service/cybersecurity-recovery-service" }
    ] satisfies FooterLink[],
  },
] as const;

type FooterProps = {
  bgimageurl?: string;
  ctaLabel?: string;
  ctaLink?: string;
};


export default function Footer({ bgimageurl, ctaLabel, ctaLink }: FooterProps) {
  return (
    <div className="relative overflow-hidden">
      {bgimageurl && (
        <div
          className="absolute inset-0 bg-cover bg-top-right bg-no-repeat"
          style={{ backgroundImage: `url(${bgimageurl})` }}
        />
      )}
      {ctaLink && (
        <section className="text-[#262263] px-4 py-4 lg:py-24 text-center lg:px-8 relative">
          <div className="mx-auto max-w-3xl relative z-2">
            <ScrollReveal animation="fadeInUp">
              <h2 className="text-3xl font-semibold sm:text-xl">Ready to start your next project?</h2>
            </ScrollReveal>
            <ScrollReveal animation="fadeInUp" delay={120}>
              <p className="mt-4 text-lg text-[#262263]/80">Bring your idea to life with a team that blends strategy, design, and engineering.</p>
            </ScrollReveal>
            
            <ScrollReveal animation="fadeInUp" delay={240}>
              <a
                href={ctaLink}
                className="mt-8 inline-block rounded-md bg-[#262263] px-8 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                {ctaLabel}
              </a>
            </ScrollReveal>
            
          </div>
        </section>
      )}
      <footer className="px-6 py-18 text-[#262263] lg:px-8 relative z-2">
        <div className="mx-auto grid max-w-7xl gap-4 lg:gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-4 lg:gap-3">
              <img src="/logo.svg" alt="NEXVORA logo" className="h-14 w-auto" />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-7 text-[#262263]">
              INNOVATION, QUALITY, AND EXCEPTIONAL CUSTOMER SERVICE.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div className="hidden lg:flex flex-col" key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#262263]/40">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[#262263]">
                {col.links.map((link) => {
                  const item = typeof link === "string" ? { label: link, url: "#" } : link;

                  return (
                    <li key={item.label}>
                      <Link href={item.url} className="transition-colors hover:text-[#0997AA]">
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-7xl border-t border-[#262263]/40 pt-6 text-xs text-[#262263]/60 relative z-2">
        copyright reserved © NEXVORA, {new Date().getFullYear()}
        </p>
      </footer>
      
      <a href="https://wa.me/201150773787" target="_blank" className="whatsapp" aria-label="Chat on WhatsApp">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path fill="#fff" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.8-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
          </svg>
      </a>
    </div>
  );
}
