import type { HeaderMenuItem, ImageNode } from "./common";

export type HeaderFields = {
  logo: ImageNode | null;
  menu: HeaderMenuItem[];
  labelButtonRight: string;
  linkButtonRight: { url: string };
};

export type HeaderSettings = {
  headerFields: HeaderFields;
};
