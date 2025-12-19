# Deploying the Cloudflare Worker

This repository contains a Cloudflare Worker at `workers/discord-worker.js` and a `wrangler.toml` that points to it.

Steps to deploy locally or in CI

1. Get your Cloudflare Account ID
   - Go to the Cloudflare dashboard → Overview for the account you want to use. Copy the "Account ID" value.

2. Option A — Add account_id to `wrangler.toml`
   - Edit `wrangler.toml` and replace `YOUR_CLOUDFLARE_ACCOUNT_ID` with your Account ID.

3. Option B — Authenticate instead of adding account_id
   - Run `npx wrangler login` locally to authenticate the user that has access to the account. CI can use an API token (see below).

4. Create an API token for CI (recommended)
   - In Cloudflare, go to My Profile → API Tokens → Create Token
   - Use the "Edit Cloudflare Workers" template or create a custom token with these permissions:
     - Account: Workers Scripts — Edit
     - (Optional) Account: Workers KV Storage — Read/Write (if you use KV)
     - (Optional) Account: R2 Storage — Read/Write (if you use R2)
   - For the token's Zone Resources selections choose the appropriate account (All zones) or specific zones as needed.
   - Copy the token and set it in your CI environment as the secret `CF_API_TOKEN`.

5. Deploy with Wrangler
   - Locally (after `wrangler login` or after setting `wrangler.toml.account_id`):
     ```bash
     npx wrangler deploy
     ```
   - In CI using token (example):
     - Ensure `CF_API_TOKEN` is set in the environment.
     - Run `npx wrangler deploy`.

Troubleshooting
- "Missing entry-point to Worker script" — Ensure `wrangler.toml` `main` points to the existing file `workers/discord-worker.js` (already set).
- "insufficient scope / 403" — Recreate the API token with the Worker edit scope and confirm the token is used in CI.
- "account not found" — Verify `account_id` in `wrangler.toml` matches the Account ID from the Cloudflare dashboard.

If you want, I can:
- Commit the updated `wrangler.toml` and `DEPLOY.md` now (I already will in this request).
- Or, if you prefer, provide the account ID and I will replace the placeholder with the real one and commit.
