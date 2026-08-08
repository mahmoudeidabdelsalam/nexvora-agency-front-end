const WP_GRAPHQL_URL = process.env.WORDPRESS_GRAPHQL_URL as string; // e.g. https://cms.yourclient.com/graphql

export type allServices = {
  title: string;
  serviceFields: {
    summary: string;
    icon: { node: { sourceUrl: string; altText: string } } | null;
  };
};

export type Service = allServices;

export type caseStudies = {
  title: string;
  caseStudyFields: {
    clientName: string;
    excerpt: string;
    thumbnail: { node: { sourceUrl: string; altText: string } } | null;
    linkUrl: string;
  };
};

export type CaseStudy = caseStudies;

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
  uri?: string | null;
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
  allServices: { nodes: allServices[] };
  caseStudies: { nodes: caseStudies[] };
  allTestimonials: { nodes: allTestimonials[] };
  homepageSettings: HomepageSettings;
  aboutPageSettings: AboutPageSettings;
  headerSettings: HeaderSettings;
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
      uri
    }
  }
}
`;

const FALLBACK_DATA: HomepageData = {
  allServices: {
    nodes: [
      {
        title: "Product strategy",
        serviceFields: {
          summary: "Turn complex ideas into focused roadmaps and launch-ready product plans.",
          icon: null,
        },
      },
      {
        title: "Web & mobile engineering",
        serviceFields: {
          summary: "Build fast, reliable applications that scale with your users and operations.",
          icon: null,
        },
      },
      {
        title: "Design systems",
        serviceFields: {
          summary: "Create polished interfaces and reusable experiences that feel consistent everywhere.",
          icon: null,
        },
      },
      {
        title: "Growth & innovation",
        serviceFields: {
          summary: "Launch AI-enabled experiences and modern digital products with measurable impact.",
          icon: null,
        },
      },
    ],
  },
  caseStudies: {
    nodes: [
      {
        title: "Customer-first platform refresh",
        caseStudyFields: {
          clientName: "ScaleLab",
          excerpt: "We redesigned a product experience and helped accelerate onboarding and retention.",
          thumbnail: null,
          linkUrl: "#",
        },
      },
      {
        title: "Operational automation suite",
        caseStudyFields: {
          clientName: "Northstar",
          excerpt: "A custom workflow platform enabled faster execution across teams and regions.",
          thumbnail: null,
          linkUrl: "#",
        },
      },
      {
        title: "AI-powered content experience",
        caseStudyFields: {
          clientName: "Brightline",
          excerpt: "We delivered an intelligent content engine with speed, clarity, and flexibility.",
          thumbnail: null,
          linkUrl: "#",
        },
      },
    ],
  },
  allTestimonials: {
    nodes: [
      {
        testimonialFields: {
          quote: "They brought structure, speed, and thoughtful execution to every milestone.",
          authorName: "Mina Hassan",
          authorRole: "Founder",
          authorCompany: "Northstar Labs",
          avatar: null,
        },
      },
    ],
  },
  homepageSettings: {
    homepageFields: {
      heroEyebrow: "Digital product studio",
      heroHeading: "We create modern digital experiences that move brands forward.",
      heroSubtext: "From strategy to launch, we help ambitious teams craft fast, scalable, and beautifully designed products.",
      heroCtaLabel: "Book a discovery call",
      heroCtaLink: "/contact",
      bgimageurl: undefined,
      globallyHeadline: "Trusted by product teams scaling with confidence",
      globallySubtext: "We blend strategy, building, and long-term support into one collaborative partnership.",
      globallyImage: undefined,
      expertiseHeadline: "Our expertise",
      expertiseSubText: "We help ambitious teams craft fast, scalable, and beautifully designed products.",
      teamHeadline: "Our team",
      teamSubText: "We are a team of product designers, engineers, and strategists who love building digital products.",
      solutions: [
        { icon: { node: { sourceUrl: "" } }, valuee: "Product strategy" },
        { icon: { node: { sourceUrl: "" } }, valuee: "Web & mobile engineering" },
        { icon: { node: { sourceUrl: "" } }, valuee: "Design systems" },
        { icon: { node: { sourceUrl: "" } }, valuee: "Growth & innovation" },
      ],
      ourExpertise: [
        { image: { node: { sourceUrl: "" } }, label: "13+ Years of product delivery" },
        { image: { node: { sourceUrl: "" } }, label: "150+ Projects launched" },
        { image: { node: { sourceUrl: "" } }, label: "98% Client retention" },
        { image: { node: { sourceUrl: "" } }, label: "24/7   Support coverage" },
      ],
      coreHeadline: "Our core values",
      coreSubText: "We are a team of product designers, engineers, and strategists who love building digital products.",
      coreImageLeft: undefined,
      coreValues: [
        { icon: { node: { sourceUrl: "" } }, valuee: "Collaboration", text: "We work closely with our clients and each other to achieve the best results." },
        { icon: { node: { sourceUrl: "" } }, valuee: "Innovation", text: "We constantly seek new ways to improve and innovate." },
        { icon: { node: { sourceUrl: "" } }, valuee: "Integrity", text: "We act with honesty and transparency in all our interactions." },
        { icon: { node: { sourceUrl: "" } }, valuee: "Excellence", text: "We strive for the highest quality in everything we do." },
      ],
      countersHeadline: "Our impact in numbers",
      countersSubText: "We are a team of product designers, engineers, and strategists who love building digital products.",
      counters: [
        { text: "Years of product delivery", valuee: "13+" },
        { text: "Projects launched", valuee: "150+" },
        { text: "Client retention", valuee: "98%" },
        { text: "Support coverage", valuee: "24/7" },
      ],
      projects: [
        { projectsHeadline: "Project 1", projectsSubText: "Description of project 1", projectsImage: { node: { sourceUrl: "" } }, projectsBgColor: "#FFFFFF", projectsLink: "/project-1", projectsTextColor: "#000000" },
        { projectsHeadline: "Project 2", projectsSubText: "Description of project 2", projectsImage: { node: { sourceUrl: "" } }, projectsBgColor: "#FFFFFF", projectsLink: "/project-2", projectsTextColor: "#000000" },
        { projectsHeadline: "Project 3", projectsSubText: "Description of project 3", projectsImage: { node: { sourceUrl: "" } }, projectsBgColor: "#FFFFFF", projectsLink: "/project-3", projectsTextColor: "#000000" },
      ],
      clientLogos: []
    },
  },
  aboutPageSettings: {
    aboutpageFields: {
      aboutTag: "About Us",
      aboutHeadline: "About Us",
      aboutSubText: "We are a team of product designers, engineers, and strategists who love building digital products.",
      aboutVideo: "",
      boxAbout: [
        { boxHeadline: "Box 1", boxSubText: "Description of box 1", boxImage: { node: { sourceUrl: "" } }, boxBgColor: "#FFFFFF", boxTextColor: "#000000" },
        { boxHeadline: "Box 2", boxSubText: "Description of box 2", boxImage: { node: { sourceUrl: "" } }, boxBgColor: "#FFFFFF", boxTextColor: "#000000" },
        { boxHeadline: "Box 3", boxSubText: "Description of box 3", boxImage: { node: { sourceUrl: "" } }, boxBgColor: "#FFFFFF", boxTextColor: "#000000" },
      ],
    },
  },
  headerSettings: {
    headerFields: {
      logo: null,
      menu: [
        {
          label: "Services",
          link: { url: "/services" },
          submenu: [
            { label: "Product strategy", link: { url: "/services" } },
            { label: "Web & mobile", link: { url: "/services" } },
          ],
        },
        {
          label: "Blog",
          link: { url: "/blog" },
          submenu: [
            { label: "Product insights", link: { url: "/blog" } },
            { label: "Delivery stories", link: { url: "/blog" } },
          ],
        },
        { label: "About", link: { url: "/about" } },
      ],
      labelButtonRight: "Let’s talk",
      linkButtonRight: { url: "/contact" },
    },
  },
};

export async function getHomepageData(): Promise<HomepageData> {
  if (!WP_GRAPHQL_URL) {
    return FALLBACK_DATA;
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
      return FALLBACK_DATA;
    }

    const json = await res.json();

    if (json.errors) {
      console.error(json.errors);
      return FALLBACK_DATA;
    }

    return json.data as HomepageData;
  } catch {
    return FALLBACK_DATA;
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
