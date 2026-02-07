# Bing & Google Webmaster Tips – This Site

Quick checklist and how this site is set up for **search engines** and **AI discovery**.

---

## 1. Verify your site

- **Bing:** [Bing Webmaster Tools](https://www.bing.com/webmasters) – add and verify `https://abdirahman.net`.
- **Google:** [Google Search Console](https://search.google.com/search-console) – add and verify the property.

---

## 2. IndexNow (instant indexing – Bing, Yandex, etc.)

This repo supports **IndexNow** so Bing (and other supported engines) can be notified when content changes.

**Setup:**

1. Generate a key: [Bing IndexNow](https://www.bing.com/indexnow/getstarted) → Generate.
2. Add to env (e.g. Netlify / `.env`):
   ```bash
   INDEXNOW_KEY=your-32-char-hex-key
   ```
3. Create a file in `public/` named `{your-key}.txt` containing only the key (same value as `INDEXNOW_KEY`).  
   Example: if key is `a1b2c3d4e5f6...`, create `public/a1b2c3d4e5f6....txt` with that key as the file content.
4. Deploy. The key file must be reachable at `https://abdirahman.net/{key}.txt`.

**Usage:**

- **Submit all site URLs (e.g. after deploy):**  
  `GET https://abdirahman.net/api/indexnow`  
  Or call from a deploy hook / cron.
- **Submit specific URLs:**  
  `POST https://abdirahman.net/api/indexnow`  
  Body: `{ "urls": ["https://abdirahman.net/blog/my-post", "https://abdirahman.net/projects/my-project"] }`  
  (Requires `INDEXNOW_KEY` set; optional auth is up to you.)

---

## 3. Exact-match keywords (Bing)

Bing weighs **exact-match keywords** in titles, meta descriptions, headings, and URLs.

This site:

- Uses clear **titles** and **meta descriptions** with your name, role, and main topics (e.g. “Full-stack developer”, “Abdirahman Ahmed”, “Somalia”, “Sweden”, “DNA Analysis”, “IBAN”, “TransferGalaxy”, “cultural preservation”).
- Uses **semantic headings** (H1/H2) and **clean URLs** (`/blog/...`, `/projects/...`, `/about`, `/faq`, `/contact`).
- Keep **titles and descriptions** aligned with the terms you want to rank for (e.g. “Full-Stack Developer”, “API”, “Fintech”, “Healthcare”, “Somali”).

---

## 4. Sitemaps

- **URL:** `https://abdirahman.net/sitemap.xml`
- **Included:** Home, About, Contact, FAQ, Projects, Blog, all project and blog post URLs.
- **lastmod:** Uses real content dates for blog and projects; static pages use generation time.
- **Submit:** In Bing Webmaster Tools and Google Search Console, add the sitemap URL and re-submit after big content changes.

---

## 5. High-quality content & structure

- **In-depth, original content** on blog and project pages.
- **Clear structure:** H1 → H2 → sections; breadcrumbs; internal links (e.g. Blog ↔ Projects ↔ About).
- **Direct answers** in key pages (About, FAQ) so Bing can match queries to your expertise.

---

## 6. Schema markup (JSON-LD)

Used to help **Bing and Google** understand the page and enable rich results:

- **Person** (with `@id`, `sameAs`, jobTitle, knowsAbout) – site-wide.
- **WebSite** (with SearchAction, mainEntity → Person).
- **ProfilePage** – homepage / profile.
- **BlogPosting** – each blog post (headline, author, datePublished, mainEntityOfPage).
- **SoftwareApplication** – each project (name, description, author, mainEntityOfPage).
- **BreadcrumbList** – blog, projects, about, contact, FAQ.
- **FAQPage** – FAQ page.
- **Organization** – e.g. TransferGalaxy where relevant.

All implemented in **JSON-LD** in the app (layout, blog, projects, breadcrumb, FAQ).

---

## 7. Site scan & crawl errors

- Use **Bing Webmaster Tools → Site Scan** and **Google Search Console → Coverage / Pages** to fix:
  - Broken links
  - Missing or duplicate meta descriptions
  - Redirect or crawl errors  
- This site uses **canonical URLs** on important pages to reduce duplicate-content issues.

---

## 8. Social signals

Bing considers **social presence**. This site and your `ai.txt` / `llms.txt` reference:

- Twitter/X, GitHub, Facebook, Instagram, Hugging Face.  
Keep these linked and consistent (same handle/name) across the site and profiles.

---

## 9. User engagement

- **CTR from search:** Clear, accurate **titles and meta descriptions** (25–160 chars) to improve clicks.
- **On-page:** Fast load, readable content, internal links, and clear CTAs (e.g. Contact, Projects) support engagement.

---

## 10. Search performance reports

- **Bing:** “Search Performance” in Webmaster Tools – see queries, impressions, clicks.
- **Google:** “Performance” in Search Console – same.
- Use these to refine **titles**, **descriptions**, and **content** for the keywords that matter to you.

---

## AI discoverability (extra)

- **`/ai.txt`** and **`/llms.txt`** with identity, projects, contact, permissions.
- **`<link rel="ai-policy">`** and **`<link rel="llms-policy">`** in layout.
- **robots.txt** allows major AI crawlers and points to ai.txt / llms.txt.
- **Structured data** (Person, projects, blog) gives crawlers a clear, machine-readable view of you and your work.

---

## Quick reference

| Tip                    | This site |
|------------------------|-----------|
| Bing/Google verified   | You add in each tool |
| IndexNow               | `/api/indexnow` + key file in `public/` |
| Exact-match keywords   | Titles, meta, headings, URLs |
| Sitemap                | `/sitemap.xml`, submit in both tools |
| Schema (JSON-LD)       | Person, WebSite, BlogPosting, SoftwareApplication, BreadcrumbList, FAQPage |
| Canonicals             | Set on main pages |
| Meta description length| 25–160 chars |
| AI discovery           | ai.txt, llms.txt, links in head, schema |
