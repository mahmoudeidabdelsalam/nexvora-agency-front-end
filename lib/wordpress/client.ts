const WP_GRAPHQL_URL = process.env.WORDPRESS_GRAPHQL_URL as string;

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string; [key: string]: unknown }>;
};

export async function wordpressFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  next?: RequestInit["next"]
): Promise<T | null> {
  if (!WP_GRAPHQL_URL) {
    console.error("WORDPRESS_GRAPHQL_URL is not configured.");
    return null;
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
      console.error(`GraphQL request failed with status ${res.status}`);
      return null;
    }

    const json = (await res.json()) as GraphQLResponse<T>;

    console.log("GraphQL response:", json);

    if (json.errors) {
      console.error("GraphQL errors:", json.errors);
      return null;
    }

    return json.data ?? null;
  } catch (error) {
    console.error("GraphQL fetch error:", error);
    return null;
  }
}
