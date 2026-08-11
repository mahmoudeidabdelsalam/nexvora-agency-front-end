const WP_GRAPHQL_URL = process.env.WORDPRESS_GRAPHQL_URL as string; // e.g. https://cms.yourclient.com/graphql

export type allServices = {
  title: string;
  slug: string;
  serviceFields: {
    summary: string;
    icon: { node: { sourceUrl: string; altText: string } } | null;
  };
};

export type Services = allServices;

// export type caseStudies = {
//   title: string;
//   caseStudyFields: {
//     clientName: string;
//     excerpt: string;
//     thumbnail: { node: { sourceUrl: string; altText: string } } | null;
//     linkUrl: string;
//   };
// };

// export type CaseStudy = caseStudies;

export type allTestimonials = {
  testimonialFields: {
    quote: string;
    authorName: string;
    authorRole: string;
    authorCompany: string;
    avatar: { node: { sourceUrl: string } } | null;
  };
};

export type Testimonial = allTestimonials;

export type HomepageSettings = {
  homepageFields: {
    heroEyebrow: string;
    heroHeading: string;
    heroSubtext: string;
    heroCtaLabel: string;
    heroCtaLink: string;
    bgimageurl?: { node: { sourceUrl: string } };

    globallyHeadline: string;
    globallySubtext: string;
    globallyImage?: { node: { sourceUrl: string } };

    expertiseHeadline?: string;
    expertiseSubText?: string;
    ourExpertise: { image: { node: { sourceUrl: string } }; label: string }[];

    teamHeadline?: string;
    teamSubText?: string;
    solutions: { icon: { node: { sourceUrl: string } }; valuee: string }[];

    coreHeadline?: string;
    coreSubText?: string;
    coreImageLeft?: { node: { sourceUrl: string } };
    coreValues: { icon: { node: { sourceUrl: string } }; valuee: string; text?: string }[];

    countersHeadline?: string;
    countersSubText?: string;
    counters: { text: string; valuee: string }[];

    projects: { projectsHeadline: string; projectsSubText: string; projectsImage: { node: { sourceUrl: string } }; projectsBgColor: string, projectsLink: string, projectsTextColor: string }[];

    clientLogos: { name: string; logo: { node: { sourceUrl: string } } }[];
  };
};

export type AboutPageSettings = {
  aboutpageFields: {
    aboutTag: string;
    aboutHeadline: string;
    aboutSubText: string;
    aboutVideo?: string;
    boxAbout: { boxHeadline: string; boxSubText: string; boxImage: { node: { sourceUrl: string } }; boxBgColor: string, boxTextColor: string }[];
  };
};

export type ContactInformation = {
  icon?: {
    node?: {
      sourceUrl?: string;
    } | null;
  } | null;
  text: string;
  link?: string | null;
};

export type ContactPageSettings = {
  contactPageFields: {
    contactHeadline: string;
    contactSubText: string;
    contactInformation: ContactInformation[];
    contactMap?: string | null;
  };
};

export type WpPage = {
  slug: string;
  title: string;
  content: string;
  uri?: string | null;
};

export type WpPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: {
    node?: {
      sourceUrl?: string;
      altText?: string;
      mediaDetails?: {
        width?: number;
        height?: number;
      };
    };
  };
  uri?: string | null;
};

export type Service = {
  slug: string;
  title: string;
  content: string;
  featuredImage?: {
    node?: {
      sourceUrl?: string;
      altText?: string;
      mediaDetails?: {
        width?: number;
        height?: number;
      };
    };
  };
  serviceFields: {
    summary?: string;
    icon?: { node: { sourceUrl: string; altText: string } } | null;
    projects: { projectsHeadline: string; projectsSubText: string; projectsImage: { node: { sourceUrl: string } }; projectsBgColor: string, projectsLink: string, projectsTextColor: string }[];
  };
};

export type HeaderSettings = {
  headerFields: {
    logo: { node: { sourceUrl: string } } | null;
    menu: {
      label: string;
      link: { url: string };
      submenu?: { label: string; link: { url: string } }[];
    }[];
    labelButtonRight: string;
    linkButtonRight: { url: string };
  };
};

export type HomepageData = {
  allTestimonials: { nodes: allTestimonials[] };
  homepageSettings: HomepageSettings;
  aboutPageSettings: AboutPageSettings;
  headerSettings: HeaderSettings;
};

const HOMEPAGE_QUERY = /* GraphQL */ `
query {
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
      ourExpertise { image { node { sourceUrl } } label }
      expertiseHeadline
      expertiseSubText
      solutions { icon { node { sourceUrl } } valuee }
      teamHeadline
      teamSubText
      coreHeadline
      coreSubText
      coreImageLeft { node { sourceUrl } }
      coreValues  { icon { node { sourceUrl } } valuee text }
      bgimageurl { node { sourceUrl } }
      countersHeadline
      countersSubText
      counters { text valuee }
      globallyHeadline
      globallySubtext
      globallyImage { node { sourceUrl } }
      projects { projectsHeadline projectsSubText projectsImage { node { sourceUrl } } projectsBgColor, projectsLink, projectsTextColor }
      clientLogos { name logo { node { sourceUrl } } }
    }
  }
  aboutPageSettings {
    aboutpageFields {
      aboutTag
      aboutHeadline
      aboutSubText
      aboutVideo
      boxAbout { boxHeadline boxSubText boxImage { node { sourceUrl } } boxBgColor boxTextColor }
    }
  }
  headerSettings {
    headerFields {
      logo { node { sourceUrl }}
      menu { label link { url } submenu { label link { url } } }
      labelButtonRight
      linkButtonRight { url }
    }
  }
}
`;

const PAGE_BY_SLUG_QUERY = /* GraphQL */ `
query PageBySlug($slug: String!) {
  pageBy(uri: $slug) {
    slug
    title
    content
    uri
  }
}
`;

const PAGES_BY_SLUG_QUERY = /* GraphQL */ `
query PagesBySlug($slugs: [String!]) {
  pages(where: { slugIn: $slugs }) {
    nodes {
      slug
      title
      content
      uri
    }
  }
}
`;

const BLOG_POSTS_QUERY = /* GraphQL */ `
query BlogPosts {
  posts(first: 10) {
    nodes {
      slug
      title
      excerpt
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
      uri
    }
  }
}
`;

const SERVICES_QUERY = /* GraphQL */ `
query {
  allServices {
    nodes {
      slug
      title
      serviceFields {
        summary
        icon { node { sourceUrl altText } }
      }
    }
  }
}
`;

const SERVICE_BY_SLUG_QUERY = /* GraphQL */ `
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
      projects { projectsHeadline projectsSubText projectsImage { node { sourceUrl } } projectsBgColor, projectsLink, projectsTextColor }
    }
  }
}
`;

const CONTACT_PAGE_QUERY = /* GraphQL */ `
query ContactPage {
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
}
`;  

export async function getHomepageData(): Promise<any> {
  if (!WP_GRAPHQL_URL) {
    return null;
  }

  try {
    const res = await fetch(WP_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: HOMEPAGE_QUERY }),
      // Tag-based ISR: revalidated on-demand via /api/revalidate
      next: { tags: ["homepage"], revalidate: 3600 },
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();

    if (json.errors) {
      console.error(json.errors);
      return null;
    }

    return json.data as HomepageData;
  } catch {
    return null;
  }
}

export async function getContactPageData(): Promise<ContactPageSettings | null> {
  if (!WP_GRAPHQL_URL) {
    return null;
  }

  try {
    const res = await fetch(WP_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: CONTACT_PAGE_QUERY,
      }),
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();

    if (
      json.errors ||
      !json.data?.contactPageSettings
    ) {
      return null;
    }

    return json.data.contactPageSettings as ContactPageSettings;
  } catch {
    return null;
  }
}

export async function getPageBySlug(slug: string): Promise<WpPage | null> {
  if (!WP_GRAPHQL_URL) {
    return null;
  }

  try {
    const res = await fetch(WP_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: PAGE_BY_SLUG_QUERY, variables: { slug } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();

    if (json.errors || !json.data?.pageBy) {
      return null;
    }

    return json.data.pageBy as WpPage;
  } catch {
    return null;
  }
}

export async function getPagesBySlug(slugs: string[]): Promise<WpPage[]> {
  if (!WP_GRAPHQL_URL || slugs.length === 0) {
    return [];
  }

  try {
    const res = await fetch(WP_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: PAGES_BY_SLUG_QUERY, variables: { slugs } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return [];
    }

    const json = await res.json();

    if (json.errors || !json.data?.pages?.nodes) {
      return [];
    }

    return json.data.pages.nodes as WpPage[];
  } catch {
    return [];
  }
}

export async function getBlogPosts(): Promise<WpPost[]> {
  if (!WP_GRAPHQL_URL) {
    return [
      {
        slug: "building-ambitious-digital-products",
        title: "Building ambitious digital products",
        excerpt: "A practical guide for creating thoughtful, scalable products with a modern delivery team.",
        content: "<p>Start with a clear product narrative and build around the outcomes your users care about most.</p>",
        uri: "/blog/building-ambitious-digital-products",
      },
    ];
  }

  try {
    const res = await fetch(WP_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: BLOG_POSTS_QUERY }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return [];
    }

    const json = await res.json();

    if (json.errors || !json.data?.posts?.nodes) {
      return [];
    }

    return json.data.posts.nodes as WpPost[];
  } catch {
    return [];
  }
}

export async function getServices(): Promise<Services[]> {
  if (!WP_GRAPHQL_URL) {
    return [];
  }

  try {
    const res = await fetch(WP_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: SERVICES_QUERY }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return [];
    }

    const json = await res.json();

    console.log(json);
    

    if (json.errors || !json.data?.allServices?.nodes) {
      return [];
    }

    return json.data.allServices.nodes as Services[];
    
  } catch {
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (!WP_GRAPHQL_URL) {
    return null;
  }

  try {
    const res = await fetch(WP_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: SERVICE_BY_SLUG_QUERY, variables: { slug } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();

    if (json.errors || !json.data?.service) {
      return null;
    }

    return json.data.service as Service;
  } catch {
    return null;
  }
}
