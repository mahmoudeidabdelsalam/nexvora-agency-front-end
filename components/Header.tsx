const NAV_LINKS = [
  { label: "Company", href: "/company/about-us" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="font-display text-lg tracking-tight text-white">
          <span className="text-signal">&bull;</span> YourAgency
        </a>
        <nav className="hidden gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="/contact"
          className="rounded-full border border-signal px-5 py-2 font-body text-sm text-signal transition-colors hover:bg-signal hover:text-ink"
        >
          Let's talk
        </a>
      </div>
    </header>
  );
}
