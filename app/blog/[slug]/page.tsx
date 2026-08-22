import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { getBlogPostBySlug, getBlogPosts, getSiteSettings } from "@/lib/wordpress";
import Hero from "@/components/shared/Hero";

const formatPostDate = (date?: string | null) => {
  if (!date) return "Date unavailable";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

export async function generateStaticParams() {
  // Generate params for every published blog post so static export includes them
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug);
  const siteSettings = await getSiteSettings();
  const homepageFields = siteSettings?.homepageSettings.homepageFields;
  const categories = post?.categories?.nodes ?? [];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nexvora.com";
  const shareUrl = `${baseUrl}/blog/${resolvedParams.slug}`;

  return (
    <>
      <main className="bg-white">
        <Hero
          eyebrow="BLOG"
          heading={post?.title ?? ""}
          subtext=""
          video=""
          ctaLabel=""
          ctaLink=""
          bgimageurl={homepageFields?.bgimageurl?.node.sourceUrl}
          contactMap=""
          imageFeatured={post?.featuredImage?.node?.sourceUrl ?? ""}
        />
        <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="font-medium text-[#262263]">{formatPostDate(post?.date)}</span>
            {categories.length > 0 && (
              <>
                <span>•</span>
                <div className="flex flex-wrap items-center gap-2">
                  {categories.map((category) => (
                    <span key={category.slug} className="rounded-full border border-[#0997AA]/20 bg-[#0997AA]/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#0997AA]">
                      {category.name}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Share</span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#262263]/10 bg-white px-4 py-2 text-sm font-medium text-[#262263] transition hover:border-[#0997AA] hover:text-[#0997AA]"
            >
              Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post?.title ?? "")}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#262263]/10 bg-white px-4 py-2 text-sm font-medium text-[#262263] transition hover:border-[#0997AA] hover:text-[#0997AA]"
            >
              X
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#262263]/10 bg-white px-4 py-2 text-sm font-medium text-[#262263] transition hover:border-[#0997AA] hover:text-[#0997AA]"
            >
              LinkedIn
            </a>
          </div>

          <div className="prose max-w-none text-slate-600 content-single" dangerouslySetInnerHTML={{ __html: post?.content ?? "<p>This page is rendered from WordPress content.</p>" }} />
          <div className="mt-10">
            <Link href="/blog" className="text-sm font-semibold text-[#0997AA]">← Back to blog</Link>
          </div>
        </div>
      </main>
      <Footer
        bgimageurl={homepageFields?.bgimageurl?.node.sourceUrl}
        ctaLabel="Let’s talk"
        ctaLink="/contact-us"
      />
    </>
  );
}
