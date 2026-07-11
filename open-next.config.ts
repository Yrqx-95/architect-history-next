import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
	// The archive is generated as SSG and does not use runtime revalidation.
	// Ship the build-time route cache with Workers Static Assets so every
	// generated architect, building, and graduation route is available.
	incrementalCache: staticAssetsIncrementalCache,
	enableCacheInterception: true,
});
