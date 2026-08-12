import { wordpressFetch } from "../client";
import { PAGE_BY_SLUG_QUERY, PAGES_BY_SLUG_QUERY, PAGES_LIST_QUERY } from "../queries/pages";
import type { WpPage } from "../types/page";

export async function getPageBySlug(slug: string): Promise<WpPage | null> {
  const data = await wordpressFetch<{ pageBy: WpPage }>(PAGE_BY_SLUG_QUERY, { slug });

  return data?.pageBy ?? null;
}

export async function getPagesBySlug(slugs: string[]): Promise<WpPage[]> {
  if (slugs.length === 0) {
    return [];
  }

  // Fetch a large page list and filter client-side because the installed
  // WPGraphQL schema does not support `slugIn` on the pages(where: ...) arg.
  const data = await wordpressFetch<{ pages: { nodes: WpPage[] } }>(PAGES_BY_SLUG_QUERY, { first: 10000 });

  const nodes = data?.pages?.nodes ?? [];
  const lookup = new Set(slugs);
  return nodes.filter((n) => lookup.has(n.slug));
}

/**
 * Fetch all pages URIs from WordPress. Returns an array of uri strings (e.g. "/", "/about", "/services/web-design").
 * This is used to statically generate the catch-all pages during build.
 */
export async function getAllPages(): Promise<string[]> {
  const data = await wordpressFetch<{ pages: { nodes: { uri: string }[] } }>(PAGES_LIST_QUERY, { first: 10000 });

  const nodes = data?.pages?.nodes ?? [];
  return nodes.map((n) => n.uri || "");
}
