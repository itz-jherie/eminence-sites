import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://xistudio.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Eminence Gorbarn — Product Design Portfolio",
    template: "%s | Eminence Product",
  },
  description:
    "Product design portfolio by Eminence Gorbarn — digital products, UI/UX and design systems.",
  keywords: [
    "Eminence Product",
    "Digital Design Agency",
    "Creative Agency",
    "Brand Identity Studio",
    "Kinetic Motion Design",
    "Digital Product Engineering",
    "3D Visual Experiences",
    "UI UX Design Practice",
    "Creative Direction",
    "WebGL Development",
    "Design Systems Architecture",
    "Commercial Animation",
    "Next.js CMS Agency",
    "Design Agency Lagos",
    "Design Agency London",
    "Design Agency New York",
  ],
  authors: [{ name: "Eminence Product", url: siteUrl }],
  creator: "Eminence Product",
  publisher: "Eminence Product",
  category: "Design & Creative Technology Agency",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Eminence Product",
    title: "Eminence Gorbarn — Product Design Portfolio",
    description:
      "Product design portfolio by Eminence Gorbarn — digital products, UI/UX and design systems.",
    images: [
      {
        url: `${siteUrl}/assets/about-team.webp`,
        width: 1200,
        height: 630,
        alt: "Eminence Gorbarn — Product Design Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eminence Gorbarn — Product Design Portfolio",
    description:
      "Product design portfolio by Eminence Gorbarn — digital products, UI/UX and design systems.",
    images: [`${siteUrl}/assets/about-team.webp`],
    creator: "@xistudio",
    site: "@xistudio",
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: "Eminence Product",
    alternateName: "XI Creative Studio",
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    image: `${siteUrl}/assets/about-team.webp`,
    description:
      "Product design portfolio by Eminence Gorbarn — digital products, UI/UX and design systems.",
    priceRange: "$$$$",
    sameAs: [
      "https://instagram.com/xistudio",
      "https://x.com/xistudio",
      "https://linkedin.com/company/xistudio",
    ],
    knowsAbout: [
      "Brand Identity & Positioning",
      "Kinetic Motion Design Systems",
      "Digital Product Engineering",
      "UI/UX Architecture",
      "3D Visual Experiences",
      "Creative Direction",
      "WebGL Interactive Websites",
      "Next.js CMS Solutions",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Eminence Product Core Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Brand Identity & Strategy",
            description: "Visual identity systems, brand guidelines, typography, and verbal positioning.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Kinetic Motion & 3D Visuals",
            description: "Commercial motion graphics, launch films, and 3D product animations.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Digital Product Design & Engineering",
            description: "High-fidelity UI/UX design, design systems, and modern web application development.",
          },
        },
      ],
    },
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Eminence Product",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/projects?tab={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
