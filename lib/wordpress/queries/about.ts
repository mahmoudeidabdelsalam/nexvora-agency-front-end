export const ABOUT_QUERY = /* GraphQL */ `
query About {
  aboutPageSettings {
    aboutpageFields {
      aboutTag
      aboutHeadline
      aboutSubText
      aboutVideo
      boxAbout {
        boxHeadline
        boxSubText
        boxImage { node { sourceUrl } }
        boxBgColor
        boxTextColor
      }
    }
  }
  homepageSettings {
    homepageFields {
      heroCtaLabel
      heroCtaLink
      bgimageurl { node { sourceUrl } }
      countersHeadline
      countersSubText
      counters { text valuee }
      clientLogos { name logo { node { sourceUrl } } }
    }
  }
}
`;
