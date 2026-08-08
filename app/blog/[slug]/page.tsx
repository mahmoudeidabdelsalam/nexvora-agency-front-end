import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getHomepageData, getBlogPosts } from "@/lib/wordpress";

export const revalidate = 3600;

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const posts = await getBlogPosts();
  const post = posts.find((item) => item.slug === resolvedParams.slug);
  const data = await getHomepageData();
  const { headerFields } = data.headerSettings;

  return (
    <>
      <Header
        logoUrl={headerFields.logo?.node.sourceUrl ?? "/logo.webp"}
        menu={headerFields.menu}
        ctaLabel={headerFields.labelButtonRight || "Let’s talk"}
        ctaHref={headerFields.linkButtonRight?.url || "/contact"}
      />
      <main className="bg-[#f7fbfc] px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0997AA]">Blog</p>
          <h1 className="mt-4 text-xl font-semibold text-[#262263] sm:text-5xl">{post?.title || "Article"}</h1>
          <div className="mt-8 prose max-w-none text-slate-600" dangerouslySetInnerHTML={{ __html: post?.content || "<p>This preview article is shown from WordPress content.</p>" }} />
          <div className="mt-10">
            <Link href="/blog" className="text-sm font-semibold text-[#0997AA]">← Back to blog</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
