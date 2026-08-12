import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { getPageBySlug, getSiteSettings } from "@/lib/wordpress";

import { getAllPages } from "@/lib/wordpress/services/pages";

export async function generateStaticParams() {
  // Fetch all page URIs from WordPress and convert them to the catch-all param form.
  // WordPress URIs come with a leading slash ("/about"), convert to an array: ["about"].
  const uris = await getAllPages();

  return uris.map((uri) => {
    const trimmed = uri.replace(/^\/+|\/+$/g, "");
    const slugArr = trimmed === "" ? [] : trimmed.split("/");
    return { slug: slugArr };
  });
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.join("/") ?? "";
  const normalizedSlug = slug ? `/${slug}` : "/";
  const page = await getPageBySlug(normalizedSlug);
  const siteSettings = await getSiteSettings();
  const homepageFields = siteSettings?.homepageSettings.homepageFields;

  return (
    <>
      <main className="bg-[#f7fbfc] px-4 py-4 lg:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0997AA]">Page</p>
          <h1 className="mt-4 text-xl font-semibold text-[#262263] sm:text-5xl">
            {page?.title || "Page"}
          </h1>
          <div className="mt-8 prose max-w-none text-slate-600" dangerouslySetInnerHTML={{ __html: page?.content || "<p>This page is rendered from WordPress content.</p>" }} />
          <div className="mt-10">
            <Link href="/" className="text-sm font-semibold text-[#0997AA]">← Back home</Link>
          </div>
        </div>
      </main>
      <Footer
        bgimageurl={homepageFields?.bgimageurl?.node.sourceUrl}
        ctaLabel={homepageFields?.heroCtaLabel ?? ""}
        ctaLink={homepageFields?.heroCtaLink ?? ""}
      />
    </>
  );
}
