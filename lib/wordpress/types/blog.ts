import type { ImageNode } from "./common";

export type BlogPostCategory = {
  name: string;
  slug: string;
};

export type BlogPostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  date?: string | null;
  categories?: {
    nodes?: BlogPostCategory[] | null;
  } | null;
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
  uri?: string | null;
};

export type BlogPostDetail = BlogPostSummary & {
  content: string;
};

export type Testimonial = {
  testimonialFields: {
    quote: string;
    authorName: string;
    authorRole: string;
    authorCompany: string;
    avatar?: ImageNode | null;
  };
};
