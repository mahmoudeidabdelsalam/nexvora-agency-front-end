import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { getHeaderData } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "NEXVORA",
  description: "NEXVORA IS A TECHNOLOGY SOLUTIONS COMPANY BASED IN EGYPT, DELIVERING INNOVATIVE SOFTWARE SOLUTIONS, SAAS PRODUCTS, IT INFRASTRUCTURE SERVICES, DIGITAL MARKETING, ADVERTISING, PROFESSIONAL CONSULTATIONS, AND TRAINING TO CLIENTS WORLDWIDE.",
  icons: {
    icon: [
      { rel: "shortcut icon", url: "/favicon/favicon.ico" },
      { rel: "icon", url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { rel: "icon", url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { rel: "apple-touch-icon", url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  other: {
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "/favicon/favicon-96x96.png",
    "theme-color": "#ffffff",
  },
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerData = await getHeaderData();
  const headerFields = headerData?.headerFields ?? {
    logo: null,
    menu: [],
    labelButtonRight: "Let’s talk",
    linkButtonRight: { url: "/contact" },
  };

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header
          logoUrl={headerFields.logo?.node.sourceUrl ?? "/logo.webp"}
          menu={headerFields.menu}
          ctaLabel={headerFields.labelButtonRight || "Let’s talk"}
          ctaHref={headerFields.linkButtonRight?.url || "/contact"}
        />
        {children}
      </body>
    </html>
  );
}
