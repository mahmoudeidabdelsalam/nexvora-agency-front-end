import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getHomepageData, getPageBySlug } from "@/lib/wordpress";

export const revalidate = 3600;

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.join("/") ?? "";
  const normalizedSlug = slug ? `/${slug}` : "/";
  const data = await getHomepageData();
  const page = await getPageBySlug(normalizedSlug);
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
      <Footer />
    </>
  );
}
