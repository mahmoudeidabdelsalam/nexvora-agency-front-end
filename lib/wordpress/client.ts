const WP_GRAPHQL_URL = process.env.WORDPRESS_GRAPHQL_URL as string;

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string; [key: string]: unknown }>;
};

/**
 * Fetch helper for WPGraphQL.
 * This function throws on configuration, network or GraphQL errors so the
 * build fails with informative messages instead of silently returning null.
 */
export async function wordpressFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  next?: RequestInit["next"]
): Promise<T> {
  if (!WP_GRAPHQL_URL) {
    throw new Error("WORDPRESS_GRAPHQL_URL is not configured. Set WORDPRESS_GRAPHQL_URL in your environment.");
  }

  try {
    const res = await fetch(WP_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
      next,
    });

    if (!res.ok) {
      const bodyText = await res.text().catch(() => "<unable to read response body>");
      throw new Error(`GraphQL request failed with status ${res.status}: ${bodyText}`);
    }

    const json = (await res.json()) as GraphQLResponse<T>;

    if (json.errors && json.errors.length > 0) {
      // Provide the GraphQL errors verbatim for debugging
      throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
    }

    if (!json.data) {
      throw new Error("GraphQL response contained no data.");
    }

    return json.data;
  } catch (error) {
    // Re-throw with clearer context for build-time failures (e.g. TLS errors)
    if (error instanceof Error) {
      throw new Error(`Failed to fetch from WP GraphQL (${WP_GRAPHQL_URL}): ${error.message}`);
    }
    throw error;
  }
}
