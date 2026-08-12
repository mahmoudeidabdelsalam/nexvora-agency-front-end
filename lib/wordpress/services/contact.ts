import { wordpressFetch } from "../client";
import { CONTACT_QUERY } from "../queries/contact";
import type { ContactPageData } from "../types/contact";

export async function getContactPageData(): Promise<ContactPageData | null> {
  return await wordpressFetch<ContactPageData>(CONTACT_QUERY, undefined, {
    revalidate: 3600,
  });
}
