# abdirahman.net - Personal Portfolio Website

<div align="center">

# Abdirahman Ahmed (Maano)

**Full-Stack Developer & Entrepreneur**

Personal portfolio website showcasing projects in healthcare technology, financial services APIs, fintech, and cultural preservation.

[![Next.js](https://img.shields.io/badge/Next.js-13.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-18.2-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Contentlayer](https://img.shields.io/badge/Contentlayer-0.3-000000?style=for-the-badge)](https://www.contentlayer.dev/)
[![Netlify](https://img.shields.io/badge/Netlify-Ready-00C7B7?style=for-the-badge&logo=netlify)](https://netlify.com/)

[🌐 Live Website](https://abdirahman.net) • [📧 Email](mailto:hello@abdirahman.net) • [💼 GitHub](https://github.com/AbdirahmanNomad) • [🐦 Twitter](https://x.com/abdirahmaanone)

</div>

## About

This is the personal portfolio website of **Abdirahman Ahmed** (also known as **Maano**), a full-stack developer and entrepreneur originally from Somalia, based in Sweden. The website showcases projects across healthcare technology, financial services, fintech, media, and cultural preservation.

Abdirahman Ahmed specializes in building APIs, developing healthcare technology solutions, creating fintech platforms, and preserving Somali culture through educational content. With a background in Cybersecurity, media production, and full-stack development, he creates solutions that benefit businesses and diaspora communities.

## Key Projects

### Healthcare Technology

#### DNA Analysis System - Professional DNA Genomics Suite
Advanced DNA analysis platform analyzing **609,424+ genetic variants** across 23 chromosomes. Features include:
- **32 Disease Risk Scores** (Polygenic Risk Scores)
- **19 Drug Response Profiles** (Pharmacogenomics with FDA/CPIC guidelines)
- **15+ Nutrient Metabolism Insights** (Personalized nutrition)
- **Lab Results Integration** with ML predictions (XGBoost, Bayesian, LSTM)
- **90-Day Health Forecasts** with confidence intervals
- **Comprehensive PDF Reports** (50-100 pages with actionable insights)

### Financial Services APIs (Published on RapidAPI)

#### IBAN & SWIFT Validator API
- Validates bank accounts for **51,000+ banks** across **204 countries**
- ISO 13616 compliant validation
- Bulk processing (1,000 IBANs), CSV upload (10,000 rows)
- Fraud detection and risk scoring
- Perfect for fintech and payment processing applications

#### Email Validator API
- Comprehensive email validation with format, domain, MX records verification
- Disposable email detection
- Role-based email detection
- Risk scoring and deliverability confidence

#### Somalia Phone Number API
- Complete coverage of **ALL 10 Somali telecom operators**
- Landline regions support
- Carrier lookup (MCC/MNC)
- CSV export functionality

#### Nordic Phone Number Generator & Validator API
- Supports all **8 Nordic countries** (Sweden, Norway, Denmark, Finland, Iceland, Greenland, Faroe Islands, Åland Islands)
- **395+ cities** covered
- Powered by Google's libphonenumber

### Companies & Platforms

#### TransferGalaxy (Co-founder)
Digital money transfer service based in Sweden helping immigrants send money home affordably. Co-founded with four other partners, handling advertising, marketing, financial institution partnerships, compliance, and secure payment processing.

#### WhatsReplay
Interactive historical events viewer exploring "what happened on this day in history" with filtering by themes (Wars & Conflicts, Discoveries & Science, Politics & Government, Arts & Culture, etc.).

### Geographic & Infrastructure APIs

#### Somali Geography & Governance API
First open-source geographic API for Somalia mapping **36 regions**, **148 districts**, **26,046+ roads**, **23 airports**, **8 ports**, and postal codes. Comprehensive administrative boundaries, transport infrastructure, and location services with GeoJSON support. All data filtered to Somalia bounding box for accuracy.

### Security & Digital Identity

#### Warya Security Suite
Comprehensive security testing framework with **77 total tools** (**43 scanners + 30 utilities + 4 advanced modules**). **120 powerful scripts** covering web applications, mobile apps (APK/IPA), and password security. **36 built-in scanners** plus **7 external integrations**. Includes custom algorithms and AI integration for advanced security analysis. **Private/local project** for authorized security testing and research - not publicly available due to its powerful capabilities.

#### Somali Digital ID Readiness Toolkit
Open-source toolkit for validating and simulating Somali National ID data with **privacy-preserving signed tokens**. JSON Schema validation, **Ed25519 cryptographic signing**, multilingual support (English/Somali), and **offline-first architecture** for low-connectivity environments. Accelerates digital ID adoption in Somalia.

### Travel & Automation

#### FlyMind - AI-Powered Flight Analytics Suite
Intelligent flight data platform combining **AI-driven search**, real-time Google Flights scraping, **price analytics**, and automation tools. Features **multi-city search** (2-5 segments), **price alerts**, **flight comparison**, and **n8n workflow integration** with Streamlit interface. All 12 features tested and verified (100% pass rate).

### Cultural Preservation

#### Somali Children's Books
Published on Amazon to help diaspora children learn Somali language and history. Books like "Dhegdheer - Cannibal of the Desert with Long Ears" and "Cigaal Shidaad - Shadow Scare" preserve Somali folklore and cultural heritage.

## Technologies & Skills

### Development
- **Frontend:** Next.js 13, React 18, TypeScript, Tailwind CSS
- **Backend:** Node.js, Next.js API Routes, Serverless Functions
- **Database:** Upstash Redis (optional, for analytics)
- **Content Management:** Contentlayer, MDX
- **Deployment:** Netlify, Vercel

### Specializations
- Full-stack web development
- API development and integration
- Healthcare technology (DNA analysis, pharmacogenomics)
- Financial services (bank validation, payment processing)
- Media production and marketing
- Fintech innovation
- Information Technology
- Cybersecurity

## Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **pnpm** (recommended) or npm package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/AbdirahmanNomad/abdirahman.net.git
cd abdirahman.net

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

### Build for Production

```bash
pnpm build
pnpm start
```

## Deployment

### Netlify (Recommended)

The project includes `netlify.toml` with optimized settings:

1. Connect your GitHub repository to [Netlify](https://netlify.com)
2. Netlify will auto-detect Next.js and use the configuration
3. Deploy automatically on every push to main branch

### Vercel

Deploy with Vercel CLI:

```bash
vercel
```

Or connect through the [Vercel dashboard](https://vercel.com) for automatic deployments.

## Features

- ✨ **Modern Next.js 13** - App Router architecture for optimal performance
- 🎨 **Beautiful UI** - Tailwind CSS with custom animations and particle effects
- 📝 **MDX Content** - Easy content management with Contentlayer for projects
- 🔄 **Dynamic Projects** - Featured projects rotate daily for variety
- 🤖 **SEO Optimized** - Complete metadata, robots.txt, and ai.txt for search engines and AI systems
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- ⚡ **Performance** - Optimized for fast page loads and Core Web Vitals
- 🔒 **Security** - Security headers configured (HSTS, CSP, XSS protection)
- 🌐 **Accessibility** - Built with accessibility best practices

## Tech Stack

- **Framework:** Next.js 13.5 with App Router
- **Language:** TypeScript 5.2
- **Styling:** Tailwind CSS 3.3 with custom design system
- **Content:** Contentlayer 0.3 (MDX-based)
- **Fonts:** Cal Sans (local), Inter (Google Fonts)
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Analytics:** Beam Analytics (optional, privacy-focused)

## Project Structure

```
abdirahman.net/
├── app/                      # Next.js App Router
│   ├── about/               # About/Resume page
│   ├── contact/             # Contact page with social links
│   ├── projects/            # Projects listing and detail pages
│   │   ├── [slug]/         # Dynamic project pages
│   │   └── page.tsx        # Projects listing with rotation
│   ├── components/          # Reusable React components
│   │   ├── analytics.tsx   # Optional analytics
│   │   ├── card.tsx        # Card component with hover effects
│   │   ├── mdx.tsx         # MDX content renderer
│   │   ├── nav.tsx         # Navigation component
│   │   └── particles.tsx   # Particle animation background
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Homepage
├── content/                  # MDX content files
│   └── projects/            # Project markdown files
│       ├── dna-analysis-system.mdx
│       ├── iban-swift-validator.mdx
│       ├── email-validator-api.mdx
│       └── ... (8 total projects)
├── public/                   # Static assets
│   ├── ai.txt              # AI crawler information
│   ├── robots.txt          # Search engine instructions
│   ├── favicon.png
│   └── fonts/              # Custom fonts
├── pages/                    # API routes
│   └── api/
│       └── incr.ts         # Page view tracking (optional)
├── util/                     # Utility functions
│   ├── redis.ts            # Redis client helper
│   └── mouse.ts            # Mouse position utility
├── netlify.toml             # Netlify deployment configuration
├── next.config.mjs          # Next.js configuration with security headers
└── tailwind.config.js       # Tailwind CSS configuration
```

## SEO & AI Optimization

This website is optimized for both search engines and AI systems:

- **Comprehensive Metadata** - Open Graph, Twitter Cards, and standard meta tags
- **robots.txt** - Search engine crawler instructions
- **ai.txt** - Structured information for AI systems and language models
- **Semantic HTML** - Proper heading hierarchy and semantic elements
- **Performance** - Optimized images, code splitting, and fast loading times
- **Accessibility** - ARIA labels, keyboard navigation, screen reader support

## Contact & Social Links

- **Website:** [abdirahman.net](https://abdirahman.net)
- **Email:** [hello@abdirahman.net](mailto:hello@abdirahman.net)
- **GitHub:** [@AbdirahmanNomad](https://github.com/AbdirahmanNomad)
- **Twitter:** [@abdirahmaanone](https://x.com/abdirahmaanone)
- **Facebook:** [facebook.com/abdirahmanone](https://www.facebook.com/abdirahmanone/)
- **Instagram:** [@abdirahmanone](https://instagram.com/abdirahmanone)

## Background

Abdirahman Ahmed (Maano) is a Somali Swedish professional with expertise in:
- **Media Production & Marketing**
- **Fintech Innovation** - Digital money transfer services
- **Full-Stack Development** - Next.js, React, TypeScript
- **Healthcare Technology** - DNA analysis, pharmacogenomics, personalized medicine
- **API Development** - Financial services, validation APIs
- **Cultural Preservation** - Somali language and heritage education

Originally from Somalia, based in Sweden. Fluent in Somali, English, and Swedish. Holds a degree in Cybersecurity. Passionate about creating solutions that benefit businesses and diaspora communities while preserving Somali culture.

## License

This project is private and proprietary. All rights reserved.

---

**Built with ❤️ by Abdirahman Ahmed (Maano)**

For inquiries about projects, collaborations, or API access, please contact through the website or email above.
