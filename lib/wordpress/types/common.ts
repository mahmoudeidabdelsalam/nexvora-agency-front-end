export type ImageNode = {
  node: {
    sourceUrl: string;
    altText?: string | null;
    mediaDetails?: {
      width?: number;
      height?: number;
    };
  };
};

export type MenuLink = {
  url: string;
};

export type HeaderMenuItem = {
  label: string;
  link: MenuLink;
  submenu?: { label: string; link: MenuLink }[];
};
