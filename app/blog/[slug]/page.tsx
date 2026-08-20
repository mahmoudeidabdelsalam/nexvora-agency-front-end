import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { getBlogPostBySlug, getBlogPosts, getSiteSettings } from "@/lib/wordpress";
import Hero from "@/components/shared/Hero";

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
        <div className="mx-auto max-w-4xl">
          <div className="mt-8 prose max-w-none text-slate-600" dangerouslySetInnerHTML={{ __html: post?.content ?? "<p>This page is rendered from WordPress content.</p>" }} />
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
