import type { ImageNode } from "./common";
import type { Testimonial } from "./blog";

export type HomepageFields = {
  heroEyebrow: string;
  heroHeading: string;
  heroSubtext: string;
  heroCtaLabel: string;
  heroCtaLink: string;
  bgimageurl?: ImageNode;
  globallyHeadline?: string;
  globallySubtext?: string;
  globallyImage?: ImageNode;
  expertiseHeadline?: string;
  expertiseSubText?: string;
  solutions: { icon: ImageNode; valuee: string }[];
  teamHeadline?: string;
  teamSubText?: string;
  coreHeadline?: string;
  coreSubText?: string;
  coreImageLeft?: ImageNode;
  coreValues: { icon: ImageNode; valuee: string; text?: string }[];
  countersHeadline?: string;
  countersSubText?: string;
  counters: { text: string; valuee: string }[];
  projects: {
    projectsHeadline: string;
    projectsSubText: string;
    projectsImage: ImageNode;
    projectsBgColor: string;
    projectsLink: string;
    projectsTextColor: string;
  }[];
  clientLogos: { name: string; logo: ImageNode }[];
};

export type HomepageSettings = {
  homepageFields: HomepageFields;
};

export type HomepageData = {
  allTestimonials: { nodes: Testimonial[] };
  homepageSettings: HomepageSettings;
};
