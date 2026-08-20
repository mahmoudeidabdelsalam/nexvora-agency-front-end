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
    links: ["Android", "iOS", "PHP Laravel", "Node.js"],
  },
  {
    title: "Services",
    links: [
      "Web Development",
      "Mobile App Development",
      "Web Design",
      "Software Testing",
    ],
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
    </div>
  );
}
