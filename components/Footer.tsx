const COLUMNS = [
  {
    title: "Company",
    links: ["About us", "Team", "Process", "Blog", "Case studies", "Join us"],
  },
  {
    title: "Technologies",
    links: [".Net", "Android", "Angular", "iOS", "PHP Laravel", "Node.js"],
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
];

export default function Footer() {
  return (
    <footer className="bg-ink px-6 py-16 text-white/60">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        <div>
          <p className="font-display text-lg text-white">YourAgency</p>
          <p className="mt-3 max-w-xs font-body text-sm">
            Build scalable, high-performance software solutions with
            dedicated teams that adapt to your business goals.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="font-mono text-xs uppercase tracking-wide text-white/40">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2">
              {col.links.map((link) => (
                <li key={link} className="font-body text-sm">
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-12 max-w-6xl border-t border-line pt-6 font-mono text-xs text-white/30">
        © YourAgency, {new Date().getFullYear()}
      </p>
    </footer>
  );
}
