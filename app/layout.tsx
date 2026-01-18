import "../global.css";
import { Inter } from "@next/font/google";
import LocalFont from "@next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "Abdirahman Ahmed - Full-Stack Developer & Entrepreneur",
    template: "%s | Abdirahman Ahmed",
  },
  description: "Abdirahman Ahmed (Maano) - Full-stack developer and entrepreneur originally from Somalia, based in Sweden. Creator of DNA Analysis System (609,424+ genetic variants), IBAN & SWIFT Validator for 51,000+ banks, TransferGalaxy money transfer service, and Somali children's books. Expert in healthcare technology, fintech APIs, and cultural preservation.",
  keywords: [
    "Abdirahman Ahmed",
    "Maano",
    "Somali Swedish developer",
    "full-stack developer Sweden",
    "DNA analysis system",
    "pharmacogenomics",
    "IBAN SWIFT validator API",
    "fintech API developer",
    "TransferGalaxy",
    "Somali diaspora",
    "Next.js developer",
    "TypeScript developer",
    "healthcare technology",
    "phone number API",
    "email validator API",
  ],
  authors: [{ name: "Abdirahman Ahmed", url: "https://abdirahman.net" }],
  creator: "Abdirahman Ahmed",
  publisher: "Abdirahman Ahmed",
  openGraph: {
    title: "Abdirahman Ahmed - Full-Stack Developer, API Creator, Entrepreneur",
    description:
      "Abdirahman Ahmed (Maano) - Full-stack developer and entrepreneur originally from Somalia, based in Sweden. Creator of DNA Analysis System, IBAN & SWIFT Validator for 51,000+ banks, TransferGalaxy money transfer service, and Somali children's books.",
    url: "https://abdirahman.net",
    siteName: "Abdirahman Ahmed",
    locale: "en-US",
    type: "website",
    images: [
      {
        url: "https://abdirahman.net/og.png",
        width: 1920,
        height: 1080,
        alt: "Abdirahman Ahmed - Portfolio",
      },
    ],
  },
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
  twitter: {
    card: "summary_large_image",
    title: "Abdirahman Ahmed - Full-Stack Developer & Entrepreneur",
    description: "Full-stack developer and entrepreneur originally from Somalia, based in Sweden. DNA Analysis System, IBAN & SWIFT Validator, TransferGalaxy.",
    creator: "@abdirahmanone",
  },
  alternates: {
    canonical: "https://abdirahman.net",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Abdirahman Ahmed",
    alternateName: "Maano",
    url: "https://abdirahman.net",
    image: "https://abdirahman.net/og.png",
    sameAs: [
      "https://github.com/AbdirahmanNomad",
      "https://twitter.com/abdirahmanone",
      "https://www.facebook.com/abdirahmanone/",
      "https://instagram.com/abdirahmanone",
    ],
    jobTitle: "Full-Stack Developer & Entrepreneur",
    worksFor: {
      "@type": "Organization",
      name: "TransferGalaxy",
    },
    knowsAbout: [
      "Full-Stack Development",
      "API Development",
      "Healthcare Technology",
      "Fintech",
      "DNA Analysis",
      "Pharmacogenomics",
      "Cybersecurity",
      "Media Production",
      "Cultural Preservation",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "SE",
    },
    email: "hello@abdirahman.net",
  };

  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <Analytics />
        <Script
          id="schema-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        {children}
      </body>
    </html>
  );
}
