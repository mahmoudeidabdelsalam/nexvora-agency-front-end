import { wordpressFetch } from "../client";
import { HEADER_QUERY } from "../queries/header";
import type { HeaderSettings } from "../types/header";

export async function getHeaderData(): Promise<HeaderSettings | null> {
  const data = await wordpressFetch<{ headerSettings: HeaderSettings }>(HEADER_QUERY, undefined, {
    tags: ["header"],
    revalidate: 3600,
  });

  return data?.headerSettings ?? null;
}
