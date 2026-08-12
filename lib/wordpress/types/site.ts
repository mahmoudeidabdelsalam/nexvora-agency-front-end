import type { ImageNode } from "./common";

export type SiteSettings = {
  homepageSettings: {
    homepageFields: {
      bgimageurl?: ImageNode;
      heroCtaLabel: string;
      heroCtaLink: string;
    };
  };
};
