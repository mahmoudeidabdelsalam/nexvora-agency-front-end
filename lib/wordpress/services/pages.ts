import { wordpressFetch } from "../client";
import { PAGE_BY_SLUG_QUERY, PAGES_BY_SLUG_QUERY } from "../queries/pages";
import type { WpPage } from "../types/page";

export async function getPageBySlug(slug: string): Promise<WpPage | null> {
  const data = await wordpressFetch<{ pageBy: WpPage }>(PAGE_BY_SLUG_QUERY, { slug }, {
    revalidate: 3600,
  });

  return data?.pageBy ?? null;
}

export async function getPagesBySlug(slugs: string[]): Promise<WpPage[]> {
  if (slugs.length === 0) {
    return [];
  }

  const data = await wordpressFetch<{ pages: { nodes: WpPage[] } }>(PAGES_BY_SLUG_QUERY, { slugs }, {
    revalidate: 3600,
  });

  return data?.pages?.nodes ?? [];
}
