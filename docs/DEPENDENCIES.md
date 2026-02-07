# Dependencies & Security

## Auto-update: **Yes, it’s good**

- **`pnpm deps:check`** – Run `pnpm audit` + `pnpm outdated` to see issues and outdated packages.
- **`pnpm deps:update`** – Update dependencies (within your version ranges).
- **Dependabot** – In `.github/dependabot.yml`. Opens weekly PRs to bump npm (and GitHub Actions) deps. Merge when you want.

You don’t have to remember to update manually; Dependabot will suggest updates.

---

## Why Next.js 14 and not 15/16?

**Next.js 15 and 16 fix the high “HTTP request deserialization” advisory**, but upgrading breaks the build.

This project uses **Contentlayer** (see below). With Next 15 or 16, the build fails with:

`TypeError: Cannot read properties of undefined (reading 'ReactCurrentDispatcher')`

So the choice is:

- **Next 14.2.35** – Build works, but `pnpm audit` still reports:
  - 1 **high** (Next.js deserialization – fixed in Next 15.0.8+)
  - 1 **moderate** (esbuild, from Contentlayer – dev/build only)
- **Next 15/16** – Advisories fixed, but the app doesn’t build.

We stay on **Next 14** until the stack (Contentlayer or an alternative) works with Next 15+.

---

## What is Contentlayer?

**Contentlayer** is what turns your **content files into pages**.

- **Your content:** `content/blog/*.mdx` and `content/projects/*.mdx`
- **Config:** `contentlayer.config.js` (defines Post and Project types, slugs, etc.)
- **Integration:** `next-contentlayer` in `next.config.mjs` (`withContentlayer`)
- **Usage:** `contentlayer/generated` → `allPosts`, `allProjects` used in `app/blog/` and `app/projects/`

So:

- **Blog** at `/blog` and `/blog/[slug]` comes from `content/blog/*.mdx`.
- **Projects** at `/projects` and `/projects/[slug]` comes from `content/projects/*.mdx`.

Without Contentlayer (or a replacement), you’d need a new way to read those MDX files and generate those routes. That’s why we’re on Next 14 for now.

---

## Current audit status (Next 14)

After `pnpm audit`:

- **High:** Next.js (needs Next 15+ to fix; blocked by Contentlayer).
- **Moderate:** esbuild (pulled in by Contentlayer; dev/build only, not production runtime).

When you’re ready to move off Contentlayer (e.g. to Next’s built-in MDX or another CMS), you can upgrade to Next 15+ and clear the high finding.
