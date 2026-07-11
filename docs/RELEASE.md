# Reviewed production release

Archistory keeps `dynamicParams = false` for building and architect pages because production verification showed that switching these routes to on-demand generation changed missing-record responses from HTTP 404 to HTTP 200. Database changes therefore require a reviewed production build.

## Required GitHub configuration

Create a GitHub Actions environment named `production` and add these repository or environment secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Release contract

After a reviewed database write that changes public buildings, architects, images, taxonomy, or graduation data, run the GitHub Actions workflow **Reviewed production release** with a short reason.

The workflow is also callable through the `archistory-reviewed-data` repository-dispatch event for future automation.

The release is blocked unless all of these pass:

1. The reviewed Cloudflare and Supabase configuration is supplied from encrypted GitHub Secrets.
2. `npm run quality:gate` passes.
3. The complete unit and production E2E suite passes.
4. OpenNext builds the Cloudflare Worker successfully.
5. Wrangler deploys the verified Worker to the production routes.
6. `https://archistory.app/zh` returns 200 and a known-missing building route returns 404.

Do not run raw production deploy commands after reviewed data writes. The workflow is the release boundary because it preserves test evidence and post-deploy route verification.

## Verified activation

The first complete Cloudflare production release passed on 2026-07-12. The clean GitHub runner installed Playwright Chromium, passed the publication gate, 12 unit tests and 17 production E2E tests, deployed the Worker, and confirmed the live home route returns 200 while a known-missing building route returns 404.
