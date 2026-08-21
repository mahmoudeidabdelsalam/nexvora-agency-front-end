import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { getBlogPosts, getSiteSettings } from "@/lib/wordpress";


export default async function BlogPage() {
  const posts = await getBlogPosts();
  const siteSettings = await getSiteSettings();
  const homepageFields = siteSettings?.homepageSettings.homepageFields;

  return (
    <>
      <main className="bg-white px-4 py-4 lg:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0997AA]">Blog</h1>
          <p className="mt-4 text-xl font-semibold text-[#262263] sm:text-3xl">Insights and product stories</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.slug} className="rounded-md border border-[#262263]/10 bg-[#f7fbfc] p-2 shadow-sm">
                <img className="h-70 w-full object-cover mb-5" src={post?.featuredImage?.node?.sourceUrl } alt={post.title} />
                <Link href={`/blog/${post.slug}`} className="text-xl font-semibold text-[#262263]">{post.title}</Link>
                <div
                  className="mt-3 text-sm leading-7 text-slate-600"
                  dangerouslySetInnerHTML={{
                   __html: post.excerpt || "",
                  }}
                />
                <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex text-sm font-semibold text-[#0997AA]">
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
      <Footer
        ctaLabel="Let’s talk"
        ctaLink="/contact-us"
        bgimageurl={homepageFields?.bgimageurl?.node.sourceUrl}
      />
    </>
  );
}
