import { wordpressFetch } from "../client";
import { SERVICE_BY_SLUG_QUERY, SERVICES_QUERY } from "../queries/service";
import type { Service, ServiceListItem } from "../types/service";

export async function getServices(): Promise<ServiceListItem[]> {
  const data = await wordpressFetch<{ allServices: { nodes: ServiceListItem[] } }>(SERVICES_QUERY, undefined, {
    revalidate: 3600,
  });

  return data?.allServices?.nodes ?? [];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const data = await wordpressFetch<{ service: Service }>(SERVICE_BY_SLUG_QUERY, { slug }, {
    revalidate: 3600,
  });

  return data?.service ?? null;
}
