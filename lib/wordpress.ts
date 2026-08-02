const WP_GRAPHQL_URL = process.env.WORDPRESS_GRAPHQL_URL as string; // e.g. https://cms.yourclient.com/graphql

export type allServices = {
  title: string;
  serviceFields: {
    summary: string;
    icon: { node: { sourceUrl: string; altText: string } } | null;
  };
};

export type caseStudies = {
  title: string;
  caseStudyFields: {
    clientName: string;
    excerpt: string;
    thumbnail: { node: { sourceUrl: string; altText: string } } | null;
    linkUrl: string;
  };
};

export type allTestimonials = {
  testimonialFields: {
    quote: string;
    authorName: string;
    authorRole: string;
    authorCompany: string;
    avatar: { node: { sourceUrl: string } } | null;
  };
};

export type HomepageSettings = {
  homepageFields: {
    heroEyebrow: string;
    heroHeading: string;
    heroSubtext: string;
    heroCtaLabel: string;
    heroCtaLink: string;
    stats: { value: string; label: string }[];
    clientLogos: { name: string; logo: { node: { sourceUrl: string } } }[];
  };
};

export type HomepageData = {
  allServices: { nodes: allServices[] };
  caseStudies: { nodes: caseStudies[] };
  allTestimonials: { nodes: allTestimonials[] };
  homepageSettings: HomepageSettings;
};

const HOMEPAGE_QUERY = /* GraphQL */ `
query {
  allServices(first: 10) {
    nodes {
      title
      serviceFields {
        summary
        icon { node { sourceUrl altText } }
      }
    }
  }
  caseStudies(first: 6) {
    nodes {
      title
      caseStudyFields {
        clientName
        excerpt
        thumbnail { node { sourceUrl altText } }
        linkUrl
      }
    }
  }
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
      stats { value label }
      clientLogos { name logo { node { sourceUrl } } }
    }
  }
}
`;

export async function getHomepageData(): Promise<HomepageData> {
  const res = await fetch(WP_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: HOMEPAGE_QUERY }),
    // Tag-based ISR: revalidated on-demand via /api/revalidate
    next: { tags: ["homepage"], revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`WPGraphQL request failed: ${res.status}`);
  }

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("WPGraphQL returned errors — check field names against your ACF setup.");
  }

  return json.data as HomepageData;
}
