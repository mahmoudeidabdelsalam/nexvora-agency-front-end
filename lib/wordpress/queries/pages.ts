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
