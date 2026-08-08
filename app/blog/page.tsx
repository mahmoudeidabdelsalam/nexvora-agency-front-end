import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getHomepageData, getBlogPosts } from "@/lib/wordpress";

export const revalidate = 3600;

export default async function BlogPage() {
  const data = await getHomepageData();
  const posts = await getBlogPosts();
  const { headerFields } = data.headerSettings;

  return (
    <>
      <Header
        logoUrl={headerFields.logo?.node.sourceUrl ?? "/logo.webp"}
        menu={headerFields.menu}
        ctaLabel={headerFields.labelButtonRight || "Let’s talk"}
        ctaHref={headerFields.linkButtonRight?.url || "/contact"}
      />
      <main className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0997AA]">Blog</p>
          <h1 className="mt-4 text-xl font-semibold text-[#262263] sm:text-5xl">Insights and product stories</h1>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.slug} className="rounded-md border border-[#262263]/10 bg-[#f7fbfc] p-7 shadow-sm">
                <h2 className="text-xl font-semibold text-[#262263]">{post.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{post.excerpt || "Read more about modern product delivery and digital growth."}</p>
                <Link href={post.uri || `/blog/${post.slug}`} className="mt-5 inline-flex text-sm font-semibold text-[#0997AA]">
                  Read article →
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/" className="text-sm font-semibold text-[#0997AA]">← Back home</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
