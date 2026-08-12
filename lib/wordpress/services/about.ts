import { wordpressFetch } from "../client";
import { ABOUT_QUERY } from "../queries/about";
import type { AboutPageData } from "../types/about";

export async function getAboutPageData(): Promise<AboutPageData | null> {
  return await wordpressFetch<AboutPageData>(ABOUT_QUERY, undefined, {
    revalidate: 3600,
  });
}
