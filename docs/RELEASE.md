# Reviewed production release

Archistory keeps `dynamicParams = false` for building and architect pages because production verification showed that switching these routes to on-demand generation changed missing-record responses from HTTP 404 to HTTP 200. Database changes therefore require a reviewed production build.

## Required GitHub configuration

Create a GitHub Actions environment named `production` and add one environment secret:

- `VERCEL_TOKEN`: a Vercel token allowed to deploy the linked `architect-history-next` project.

The Vercel organization and project IDs are non-secret identifiers and are recorded in the workflow.

## Release contract

After a reviewed database write that changes public buildings, architects, images, taxonomy, or graduation data, run the GitHub Actions workflow **Reviewed production release** with a short reason.

The workflow is also callable through the `archistory-reviewed-data` repository-dispatch event for future automation.

The release is blocked unless all of these pass:

1. Production environment variables are pulled from Vercel.
2. `npm run quality:gate` passes.
3. The complete unit and production E2E suite passes.
4. `vercel build --prod` succeeds.
5. The exact prebuilt artifact is deployed to production.
6. `https://archistory.app/zh` returns 200 and a known-missing building route returns 404.

Do not run raw `vercel --prod` after reviewed data writes. The workflow is the release boundary because it preserves test evidence and post-deploy route verification.

## Current limitation

The workflow file alone cannot create the GitHub `VERCEL_TOKEN` secret. Until that secret is configured, local authenticated Vercel CLI deployment remains available, but it is not the audited release path.
