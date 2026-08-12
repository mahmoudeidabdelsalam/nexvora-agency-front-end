export const CONTACT_QUERY = /* GraphQL */ `
query Contact {
  contactPageSettings {
    contactPageFields {
      contactHeadline
      contactSubText
      contactInformation {
        icon { node { sourceUrl } }
        text
        link
      }
      contactMap
    }
  }
  homepageSettings {
    homepageFields {
      heroCtaLabel
      heroCtaLink
      bgimageurl { node { sourceUrl } }
    }
  }
}
`;
