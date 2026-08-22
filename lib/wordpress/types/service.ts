import type { ImageNode } from "./common";

export type ServiceListItem = {
  slug: string;
  title: string;
  serviceFields: {
    icon?: ImageNode | null;
  };
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
  } | null;
  serviceFields: {
    summary?: string;
    icon?: ImageNode | null;
    codeHtml?: string;
    projects: {
      projectsHeadline: string;
      projectsSubText: string;
      projectsImage: ImageNode;
      projectsBgColor: string;
      projectsLink: string;
      projectsTextColor: string;
    }[];
  };
};
