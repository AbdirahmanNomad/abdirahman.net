# Deploy abdirahman.net on Coolify

Steps to run this repo on your own Coolify server instead of Netlify.

## 1. Add the app in Coolify

- **Project** → **+ Add Resource** → **Application**.
- **Source**: Connect your GitHub (or Git URL) → `AbdirahmanNomad/abdirahman.net`, branch `main`.
- **Build Pack**: **Dockerfile** (use the repo’s `Dockerfile`).
- **Port**: **3000** (Next.js default).
- **Start command**: leave empty when using the Dockerfile (it runs `node server.js`).

## 2. Environment variables

In Coolify → your application → **Environment Variables**, add what you had on Netlify (and any extras):

| Variable | Required | Notes |
|----------|----------|--------|
| `UPSTASH_REDIS_REST_URL` | Yes (for view counts) | From Upstash dashboard |
| `UPSTASH_REDIS_REST_TOKEN` | Yes (for view counts) | From Upstash dashboard |
| `INDEXNOW_KEY` | No | Same as on Netlify if you use IndexNow |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Google Analytics |
| `NEXT_PUBLIC_BEAM_TOKEN` | No | Beam analytics (optional) |

The app works without Redis; the view-count API will skip counting if Redis env vars are missing.

## 3. Domain and HTTPS

- In Coolify, set **Domain** to your domain (e.g. `abdirahman.net`).
- Coolify can get a TLS certificate (e.g. Let’s Encrypt) for the app.
- Point your DNS for that domain to the Coolify server (A or CNAME as Coolify instructs).

## 4. Deploy

- Click **Deploy**. Coolify will build the image from the Dockerfile and run the container.
- **Redeploy** when you push to `main` (if auto-deploy is enabled) or trigger a new deploy manually.

## 5. After moving from Netlify

- Update DNS so the domain points to your Coolify server instead of Netlify.
- Optionally remove or pause the Netlify site so traffic goes only to Coolify.
- Keep the same env values (especially Upstash Redis) so view counts and APIs behave the same.

## Build / run summary

- **Build**: Docker build using repo `Dockerfile` (Node 20, pnpm, `pnpm build`, standalone output).
- **Run**: `node server.js` on port 3000 inside the container.
- **Port**: Expose **3000** in Coolify for this service.
