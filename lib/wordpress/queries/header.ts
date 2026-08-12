export const HEADER_QUERY = /* GraphQL */ `
query Header {
  headerSettings {
    headerFields {
      logo { node { sourceUrl } }
      menu {
        label
        link { url }
        submenu { label link { url } }
      }
      labelButtonRight
      linkButtonRight { url }
    }
  }
}
`;
