export const PAGE_BY_SLUG_QUERY = /* GraphQL */ `
query PageBySlug($slug: String!) {
  pageBy(uri: $slug) {
    slug
    title
    content
  }
}
`;

export const PAGES_BY_SLUG_QUERY = /* GraphQL */ `
query PagesBySlug($slugs: [String!]) {
  pages(where: { slugIn: $slugs }) {
    nodes {
      slug
      title
      content
    }
  }
}
`;

// Fetch list of all pages (uris). Used for static generation of catch-all pages.
export const PAGES_LIST_QUERY = /* GraphQL */ `
query PagesList($first: Int = 10000) {
  pages(first: $first) {
    nodes {
      uri
      slug
    }
  }
}
`;
