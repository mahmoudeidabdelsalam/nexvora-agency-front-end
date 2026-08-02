type Stat = { value: string; label: string };

export default function Stats({ stats }: { stats: Stat[] }) {
  return (
    <section className="border-b border-line bg-ink px-6 py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border-l border-line pl-4">
            <p className="font-mono text-3xl text-signal">{stat.value}</p>
            <p className="mt-1 font-body text-sm text-white/50">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
