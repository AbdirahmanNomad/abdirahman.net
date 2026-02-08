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

**If Redis (view counts) doesn’t work:**

1. **Use runtime env, not build** — Do **not** check “Build Variable” for `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`. They must be available when the app runs, not during Docker build.
2. **Exact names** — Use exactly `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` (no typos, no spaces).
3. **Redeploy or restart** — After adding or changing env vars, **Redeploy** the app (or **Restart** the container) so the new env is loaded.
4. **Verify** — Open `https://your-domain/api/redis-check`. You should see `{"redis":"configured","hasUrl":true,"hasToken":true}`. If you see `"not_configured"`, the container doesn’t have the vars; fix the names and redeploy.

## 3. Domain and HTTPS

- In Coolify, set **Domain** to your domain (e.g. `abdirahman.net`).
- Coolify can get a TLS certificate (e.g. Let’s Encrypt) for the app.
- Point your DNS for that domain to the Coolify server (A or CNAME as Coolify instructs).

## 4. Deploy

- Click **Deploy**. Coolify will build the image from the Dockerfile and run the container.
- **Redeploy** when you push to `main` (if auto-deploy is enabled) or trigger a new deploy manually.

## 5. Auto-deploy on git push (webhook)

So Coolify deploys automatically when you push to GitHub:

**In Coolify**

1. Open your application → **Advanced** (or **Settings**).
2. Turn on **Auto Deploy** (or **Deploy on push**).
3. Set a **Webhook secret** (e.g. a random string from a password generator) and save.
4. Copy the **Webhook URL** Coolify shows (e.g. `https://your-coolify.server/api/webhooks/...`).

**In GitHub**

1. Repo **AbdirahmanNomad/abdirahman.net** → **Settings** → **Webhooks** → **Add webhook**.
2. **Payload URL:** paste the Coolify webhook URL.
3. **Content type:** `application/json`.
4. **Secret:** the same webhook secret you set in Coolify.
5. **Which events:** choose **Just the push event** (or “Let me select” → **Pushes**).
6. Leave **Active** checked → **Add webhook**.

After this, every push to the branch Coolify watches (e.g. `main`) will trigger a new deploy. No need to click Deploy manually.

## 6. After moving from Netlify

- Update DNS so the domain points to your Coolify server instead of Netlify.
- Optionally remove or pause the Netlify site so traffic goes only to Coolify.
- Keep the same env values (especially Upstash Redis) so view counts and APIs behave the same.

## Build / run summary

- **Build**: Docker build using repo `Dockerfile` (Node 20, pnpm, `pnpm build`, standalone output).
- **Run**: `node server.js` on port 3000 inside the container.
- **Port**: Expose **3000** in Coolify for this service.
