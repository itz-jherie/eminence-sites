import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://xistudio.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Eminence Gorbarn — Branding & Graphics Portfolio",
    template: "%s | Eminence Branding",
  },
  description:
    "Branding and graphics portfolio by Eminence Gorbarn — visual identities, brand systems and graphic design.",
  keywords: [
    "Eminence Branding",
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
  authors: [{ name: "Eminence Branding", url: siteUrl }],
  creator: "Eminence Branding",
  publisher: "Eminence Branding",
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
    siteName: "Eminence Branding",
    title: "Eminence Gorbarn — Branding & Graphics Portfolio",
    description:
      "Branding and graphics portfolio by Eminence Gorbarn — visual identities, brand systems and graphic design.",
    images: [
      {
        url: `${siteUrl}/assets/about-team.webp`,
        width: 1200,
        height: 630,
        alt: "Eminence Gorbarn — Branding & Graphics Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eminence Gorbarn — Branding & Graphics Portfolio",
    description:
      "Branding and graphics portfolio by Eminence Gorbarn — visual identities, brand systems and graphic design.",
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
    name: "Eminence Branding",
    alternateName: "XI Creative Studio",
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    image: `${siteUrl}/assets/about-team.webp`,
    description:
      "Branding and graphics portfolio by Eminence Gorbarn — visual identities, brand systems and graphic design.",
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
      name: "Eminence Branding Core Services",
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
    name: "Eminence Branding",
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
