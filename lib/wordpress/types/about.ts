import type { ImageNode } from "./common";
import type { HomepageSettings } from "./homepage";

export type AboutPageFields = {
  aboutTag: string;
  aboutHeadline: string;
  aboutSubText: string;
  aboutVideo?: string;
  boxAbout: {
    boxHeadline: string;
    boxSubText: string;
    boxImage: ImageNode;
    boxBgColor: string;
    boxTextColor: string;
  }[];
};

export type AboutPageData = {
  aboutPageSettings: {
    aboutpageFields: AboutPageFields;
  };
  homepageSettings: Pick<HomepageSettings, "homepageFields">;
};
