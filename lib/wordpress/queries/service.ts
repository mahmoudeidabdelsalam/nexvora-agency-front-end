export const SERVICES_QUERY = /* GraphQL */ `
query Services {
  allServices {
    nodes {
      slug
      title
      serviceFields {
        icon { node { sourceUrl altText } }
      }
    }
  }
}
`;

export const SERVICE_BY_SLUG_QUERY = /* GraphQL */ `
query ServiceBySlug($slug: ID!) {
  service(id: $slug, idType: SLUG) {
    slug
    title
    content
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
    serviceFields {
      summary
      icon { node { sourceUrl altText } }
      projects {
        projectsHeadline
        projectsSubText
        projectsImage { node { sourceUrl } }
        projectsBgColor
        projectsLink
        projectsTextColor
      }
    }
  }
}
`;
