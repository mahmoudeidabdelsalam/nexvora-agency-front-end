export const BLOG_POSTS_QUERY = /* GraphQL */ `
query BlogPosts {
  posts(first: 10000) {
    nodes {
      slug
      title
      excerpt
      date
      categories {
        nodes {
          name
          slug
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      uri
    }
  }
}
`;

export const BLOG_POST_BY_SLUG_QUERY = /* GraphQL */ `
query BlogPostBySlug($slug: ID!) {
  post(id: $slug, idType: SLUG) {
    slug
    title
    content
    date
    categories {
      nodes {
        name
        slug
      }
    }
    featuredImage {
      node {
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
    }
  }
}
`;
