export const SITE_SETTINGS_QUERY = /* GraphQL */ `
query SiteSettings {
  homepageSettings {
    homepageFields {
      heroCtaLabel
      heroCtaLink
      bgimageurl { node { sourceUrl } }
    }
  }
}
`;
