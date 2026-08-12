import type { ImageNode } from "./common";

export type ContactInformation = {
  icon?: ImageNode | null;
  text: string;
  link?: string | null;
};

export type ContactPageFields = {
  contactHeadline: string;
  contactSubText: string;
  contactInformation: ContactInformation[];
  contactMap?: string | null;
};

export type ContactPageData = {
  contactPageSettings: {
    contactPageFields: ContactPageFields;
  };
  homepageSettings: {
    homepageFields: {
      bgimageurl?: ImageNode;
      heroCtaLabel: string;
      heroCtaLink: string;
    };
  };
};
