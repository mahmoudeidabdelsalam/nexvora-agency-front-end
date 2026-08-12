import { wordpressFetch } from "../client";
import { SITE_SETTINGS_QUERY } from "../queries/site";
import type { SiteSettings } from "../types/site";

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return await wordpressFetch<SiteSettings>(SITE_SETTINGS_QUERY, undefined, {
    revalidate: 3600,
  });
}
