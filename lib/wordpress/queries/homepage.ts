export const HOMEPAGE_QUERY = /* GraphQL */ `
query Homepage {
  allTestimonials(first: 10) {
    nodes {
      testimonialFields {
        quote
        authorName
        authorRole
        authorCompany
        avatar { node { sourceUrl } }
      }
    }
  }
  homepageSettings {
    homepageFields {
      heroEyebrow
      heroHeading
      heroSubtext
      heroCtaLabel
      heroCtaLink
      bgimageurl { node { sourceUrl } }
      expertiseHeadline
      expertiseSubText
      solutions { icon { node { sourceUrl } } valuee }
      teamHeadline
      teamSubText
      coreHeadline
      coreSubText
      coreImageLeft { node { sourceUrl } }
      coreValues { icon { node { sourceUrl } } valuee text }
      countersHeadline
      countersSubText
      counters { text valuee }
      projects { projectsHeadline projectsSubText projectsImage { node { sourceUrl } } projectsBgColor projectsLink projectsTextColor }
      clientLogos { name logo { node { sourceUrl } } }
    }
  }
}
`;
