import { wordpressFetch } from "../client";
import { HOMEPAGE_QUERY } from "../queries/homepage";
import type { HomepageData } from "../types/homepage";

export async function getHomepageData(): Promise<HomepageData | null> {
  return await wordpressFetch<HomepageData>(HOMEPAGE_QUERY, undefined, {
    tags: ["homepage"],
    revalidate: 3600,
  });
}
