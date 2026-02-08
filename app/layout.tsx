import "../global.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Metadata } from "next";
import { Footer } from "./components/footer";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://abdirahman.net"),
  title: {
    default: "Abdirahman Ahmed - Full-Stack Developer & Entrepreneur",
    template: "%s | Abdirahman Ahmed",
  },
  description: "Abdirahman Ahmed (Maano) - Full-stack developer and entrepreneur from Somalia, based in Sweden. DNA Analysis System, IBAN Validator, TransferGalaxy, fintech APIs, and cultural preservation.",
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
    title: "Abdirahman Ahmed - Full-Stack Developer & Entrepreneur",
    description:
      "Abdirahman Ahmed (Maano) - Full-stack developer and entrepreneur from Somalia, based in Sweden. DNA Analysis System, IBAN Validator, TransferGalaxy, fintech APIs, cultural preservation.",
    url: "https://abdirahman.net",
    siteName: "Abdirahman Ahmed",
    locale: "en-US",
    type: "website",
    images: [
      {
        url: "https://abdirahman.net/og.png?v=2",
        width: 1200,
        height: 628,
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
    description: "Full-stack developer and entrepreneur from Somalia, based in Sweden. DNA Analysis System, IBAN Validator, TransferGalaxy, fintech APIs, cultural preservation.",
    creator: "@abdirahmaanone",
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

const calSans = localFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Person Schema - Enhanced with more properties (for search + AI discovery)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://abdirahman.net#person",
    name: "Abdirahman Ahmed",
    alternateName: "Maano",
    url: "https://abdirahman.net",
    image: "https://abdirahman.net/og.png?v=2",
    sameAs: [
      "https://github.com/AbdirahmanNomad",
      "https://x.com/abdirahmaanone",
      "https://huggingface.co/AbdirahmanNomad",
      "https://www.facebook.com/abdirahmanone/",
      "https://instagram.com/abdirahmanone",
    ],
    jobTitle: "Full-Stack Developer & Entrepreneur",
    nationality: {
      "@type": "Country",
      name: "Somalia",
    },
    birthPlace: {
      "@type": "Place",
      name: "Somalia",
    },
    worksFor: {
      "@type": "Organization",
      name: "TransferGalaxy",
      url: "https://transfergalaxy.com",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Cybersecurity Degree Program",
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
      "Next.js",
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "SE",
      addressRegion: "Sweden",
    },
    email: "hello@abdirahman.net",
    description: "Full-stack developer and entrepreneur from Somalia, based in Sweden. DNA Analysis System, IBAN Validator, TransferGalaxy, fintech APIs, cultural preservation.",
  };

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Abdirahman Ahmed - Portfolio",
    url: "https://abdirahman.net",
    description: "Abdirahman Ahmed (Maano) - Full-stack developer, API creator, entrepreneur from Somalia, based in Sweden.",
    author: {
      "@type": "Person",
      name: "Abdirahman Ahmed",
      alternateName: "Maano",
      url: "https://abdirahman.net",
    },
    publisher: {
      "@type": "Person",
      name: "Abdirahman Ahmed",
      alternateName: "Maano",
    },
    inLanguage: ["en", "so"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://abdirahman.net/projects?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    mainEntity: {
      "@type": "Person",
      "@id": "https://abdirahman.net#person",
      name: "Abdirahman Ahmed",
      alternateName: "Maano",
    },
  };

  // ProfilePage Schema - Official profile page
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Abdirahman Ahmed - Official Profile",
    url: "https://abdirahman.net",
    mainEntity: {
      "@type": "Person",
      "@id": "https://abdirahman.net#person",
      name: "Abdirahman Ahmed",
      alternateName: "Maano",
      url: "https://abdirahman.net",
      image: "https://abdirahman.net/og.png?v=2",
      jobTitle: "Full-Stack Developer & Entrepreneur",
      description: "Full-stack developer and entrepreneur from Somalia, based in Sweden. DNA Analysis System, IBAN Validator, TransferGalaxy, fintech APIs, cultural preservation.",
      sameAs: [
        "https://github.com/AbdirahmanNomad",
        "https://x.com/abdirahmaanone",
        "https://www.facebook.com/abdirahmanone/",
        "https://instagram.com/abdirahmanone",
      ],
    },
    about: {
      "@type": "Thing",
      name: "Full-Stack Development, API Development, Healthcare Technology, Fintech, Security Testing, Cultural Preservation",
    },
  };

  // Organization schema (TransferGalaxy - worksFor in Person)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TransferGalaxy",
    url: "https://transfergalaxy.com",
    description: "Digital money transfer service based in Sweden.",
  };

  const schemas = [personSchema, websiteSchema, profilePageSchema, organizationSchema];

  return (
    <html lang="en" className={[inter.variable, calSans.variable, "bg-black"].join(" ")}>
      <head>
        {/* Google Tag Manager - as high in head as possible */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5CRFM98F');`}
        </Script>
        <link rel="preconnect" href="https://abdirahman.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://abdirahman.net" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preload" href="/fonts/CalSans-SemiBold.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="ai-policy" href="/ai.txt" />
        <link rel="llms-policy" href="/llms.txt" />
        {/* GA4 only via GTM: use Google Tag in GTM with ID G-13576961859 – no direct gtag script */}
        {/* Microsoft Clarity - load after page interactive to avoid blocking */}
        <Script id="clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vdibkeh8dv");
          `}
        </Script>
        <Script
          id="schema-structured-data"
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        />
      </head>
      <body
        className={`bg-black flex flex-col min-h-screen ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
          }`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5CRFM98F"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
