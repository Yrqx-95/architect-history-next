#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const issues = readJson("src/content/graduation/issues.json");
const sites = readJson("src/content/graduation/site-types.json");
const cases = readJson("src/content/graduation/cases.json");
const imageManifest = readOptionalJson("content/graduation_image_manifest.json") || [];
const imageRetryQueue = readOptionalJson("content/graduation_image_retry_queue.json") || [];

const siteIds = new Set(sites.map((item) => item.id));
const caseIds = new Set(cases.map((item) => item.id));
const referencedSiteIds = new Set(issues.flatMap((issue) => issue.recommended_site_types));
const referencedCaseIds = new Set(issues.flatMap((issue) => issue.reference_case_ids));
const caseById = new Map(cases.map((item) => [item.id, item]));
const placeholderImage = "/images/graduation/case-placeholder.svg";
const localImageCases = cases.filter((item) => item.image_url?.startsWith("/images/graduation/cases/"));
const remoteImageCases = cases.filter((item) => /^https?:\/\//.test(item.image_url || ""));
const placeholderCases = cases.filter((item) => item.image_url === placeholderImage);
const publishedCases = cases.filter((item) => item.status === "published");
const publishedLocalImageCases = publishedCases.filter((item) => item.image_url?.startsWith("/images/graduation/cases/"));
const publishedRemoteImageCases = publishedCases.filter((item) => /^https?:\/\//.test(item.image_url || ""));
const publishedPlaceholderCases = publishedCases.filter((item) => item.image_url === placeholderImage);
const publishedCasesMissingImageSource = publishedCases.filter((item) => !item.image_source_url || !item.image_license || !item.image_credit);
const draftCasesWithImageAndSource = cases.filter((item) =>
  item.status === "draft" &&
  item.source_url &&
  item.image_url &&
  item.image_url !== placeholderImage &&
  item.image_source_url &&
  item.image_license &&
    item.image_credit
);
const publishedIssueCaseReadiness = issues
  .filter((issue) => issue.status === "published")
  .map((issue) => {
    const referencedCases = issue.reference_case_ids.map((caseId) => caseById.get(caseId)).filter(Boolean);
    const publishedRefs = referencedCases.filter((item) => item.status === "published");
    const draftRefs = referencedCases.filter((item) => item.status === "draft");
    return {
      issue,
      publishedRefs,
      draftRefs,
    };
  });
const publishedIssuesWithoutPublishedCase = publishedIssueCaseReadiness.filter((item) => item.publishedRefs.length === 0);
const publishedIssuesWithDraftCaseRefs = publishedIssueCaseReadiness.filter((item) => item.draftRefs.length > 0);
const manifestMissingLocalFiles = imageManifest
  .filter((item) => item.localPath && !fs.existsSync(path.join(root, "public", item.localPath)))
  .map((item) => item.id);
const manifestLocalPaths = new Set(imageManifest.map((item) => item.localPath).filter(Boolean));
const localCaseImagePaths = new Set(localImageCases.map((item) => item.image_url));
const localImageCasesMissingFiles = localImageCases
  .filter((item) => !fs.existsSync(path.join(root, "public", item.image_url)))
  .map((item) => item.id);
const localCaseImagesMissingFromManifest = localImageCases
  .filter((item) => !manifestLocalPaths.has(item.image_url))
  .map((item) => item.id);
const manifestEntriesUnusedByCases = imageManifest
  .filter((item) => item.localPath && !localCaseImagePaths.has(item.localPath))
  .map((item) => item.id);
const problems = [];

for (const issue of issues) {
  for (const siteId of issue.recommended_site_types) {
    if (!siteIds.has(siteId)) {
      problems.push(`${issue.id} references missing site ${siteId}`);
    }
  }
  for (const caseId of issue.reference_case_ids) {
    if (!caseIds.has(caseId)) {
      problems.push(`${issue.id} references missing case ${caseId}`);
    }
  }
  for (const noteId of Object.keys(issue.case_relation_notes || {})) {
    if (!issue.reference_case_ids.includes(noteId)) {
      problems.push(`${issue.id} has relation note for unreferenced case ${noteId}`);
    }
  }
  for (const keyword of findDuplicates(issue.keywords)) {
    problems.push(`${issue.id} has duplicate keyword ${keyword}`);
  }
}

for (const site of sites) {
  for (const keyword of findDuplicates(site.keywords)) {
    problems.push(`${site.id} has duplicate keyword ${keyword}`);
  }
}

for (const item of cases) {
  for (const keyword of findDuplicates(item.keywords)) {
    problems.push(`${item.id} has duplicate keyword ${keyword}`);
  }
}

const report = [
  "# Graduation Content QA",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  "## Counts",
  "",
  "| Dataset | Current | V1 target | Progress | Published | Draft |",
  "|---|---:|---:|---:|---:|---:|",
  row("Issues", issues.length, 100, issues),
  row("Site types", sites.length, "30-50", sites),
  row("Cases", cases.length, 100, cases),
  "",
  "## Integrity",
  "",
  `- Missing or inconsistent references: ${problems.length}`,
  `- Unreferenced site types: ${sites.filter((site) => !referencedSiteIds.has(site.id)).length}`,
  `- Unreferenced cases: ${cases.filter((item) => !referencedCaseIds.has(item.id)).length}`,
  "",
  problems.length > 0 ? problems.map((problem) => `- ${problem}`).join("\n") : "- No relationship or duplicate-keyword problems found.",
  "",
  "## Source And Image Status",
  "",
  `- Issues with source URLs: ${issues.filter((issue) => issue.source_urls.length > 0).length}/${issues.length}`,
  `- Cases with source URL: ${cases.filter((item) => item.source_url).length}/${cases.length}`,
  `- Cases using local case images: ${localImageCases.length}/${cases.length}`,
  `- Cases using remote images: ${remoteImageCases.length}/${cases.length}`,
  `- Cases using placeholder image: ${placeholderCases.length}/${cases.length}`,
  `- Cases with explicit image source URL: ${cases.filter((item) => item.image_source_url).length}/${cases.length}`,
  `- Graduation image manifest entries: ${imageManifest.length}`,
  `- Graduation image retry queue entries: ${imageRetryQueue.length}`,
  `- Local case image files missing from public folder: ${localImageCasesMissingFiles.length}`,
  `- Local case images missing from manifest: ${localCaseImagesMissingFromManifest.length}`,
  `- Manifest entries not used by current case data: ${manifestEntriesUnusedByCases.length}`,
  `- Manifest entries missing local files: ${manifestMissingLocalFiles.length}`,
  "",
  localImageCasesMissingFiles.length > 0 ? `Broken local case image references: ${localImageCasesMissingFiles.join(", ")}` : "Broken local case image references: none",
  localCaseImagesMissingFromManifest.length > 0 ? `Local case images missing from manifest: ${localCaseImagesMissingFromManifest.join(", ")}` : "Local case images missing from manifest: none",
  manifestEntriesUnusedByCases.length > 0 ? `Manifest entries not used by current cases: ${manifestEntriesUnusedByCases.join(", ")}` : "Manifest entries not used by current cases: none",
  manifestMissingLocalFiles.length > 0 ? `Remaining manifest retry queue: ${manifestMissingLocalFiles.join(", ")}` : "Remaining manifest retry queue: none",
  imageRetryQueue.length > 0 ? `Dedicated retry queue: ${imageRetryQueue.map((item) => item.id).join(", ")}` : "Dedicated retry queue: none",
  "",
  "## Published Readiness",
  "",
  `- Published cases: ${publishedCases.length}`,
  `- Published cases using local images: ${publishedLocalImageCases.length}/${publishedCases.length}`,
  `- Published cases using remote images: ${publishedRemoteImageCases.length}/${publishedCases.length}`,
  `- Published cases using placeholder images: ${publishedPlaceholderCases.length}/${publishedCases.length}`,
  `- Published cases missing image source/license/credit: ${publishedCasesMissingImageSource.length}`,
  `- Draft cases with source-safe non-placeholder images: ${draftCasesWithImageAndSource.length}`,
  "",
  publishedPlaceholderCases.length > 0 ? `Published placeholder cases: ${formatIds(publishedPlaceholderCases)}` : "Published placeholder cases: none",
  publishedCasesMissingImageSource.length > 0 ? `Published cases missing image metadata: ${formatIds(publishedCasesMissingImageSource)}` : "Published cases missing image metadata: none",
  draftCasesWithImageAndSource.length > 0 ? `Draft source-safe image candidates: ${formatIds(draftCasesWithImageAndSource)}` : "Draft source-safe image candidates: none",
  "",
  "## Public Relationship Readiness",
  "",
  `- Published issues: ${publishedIssueCaseReadiness.length}`,
  `- Published issues with at least one published related case: ${publishedIssueCaseReadiness.filter((item) => item.publishedRefs.length > 0).length}/${publishedIssueCaseReadiness.length}`,
  `- Published issues with no published related case: ${publishedIssuesWithoutPublishedCase.length}`,
  `- Published issues still referencing draft cases: ${publishedIssuesWithDraftCaseRefs.length}`,
  "",
  publishedIssuesWithoutPublishedCase.length > 0
    ? `Published issues with no published related case: ${publishedIssuesWithoutPublishedCase.map((item) => item.issue.id).join(", ")}`
    : "Published issues with no published related case: none",
  publishedIssuesWithDraftCaseRefs.length > 0
    ? [
        "Published issue draft-case references:",
        ...publishedIssuesWithDraftCaseRefs.map((item) => `- ${item.issue.id}: ${formatIds(item.draftRefs)}`),
      ].join("\n")
    : "Published issue draft-case references: none",
  "",
  "## Next Recommendation",
  "",
  `- ${nextRecommendation()}`,
  "",
].join("\n");

writeText("docs/GRADUATION_CONTENT_QA.md", report);
console.log(`Graduation content QA: ${issues.length} issues, ${sites.length} site types, ${cases.length} cases`);
console.log(`Problems: ${problems.length}`);
if (problems.length > 0) {
  process.exitCode = 1;
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function readOptionalJson(relativePath) {
  try {
    return readJson(relativePath);
  } catch {
    return null;
  }
}

function writeText(relativePath, content) {
  const filePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function row(label, current, target, items) {
  const published = items.filter((item) => item.status === "published").length;
  const draft = items.filter((item) => item.status === "draft").length;
  const numericTarget = typeof target === "number" ? target : 30;
  const progress = Math.min(100, Math.round((current / numericTarget) * 100));
  return `| ${label} | ${current} | ${target} | ${progress}% | ${published} | ${draft} |`;
}

function findDuplicates(items) {
  const seen = new Set();
  const duplicates = new Set();
  for (const item of items) {
    if (seen.has(item)) {
      duplicates.add(item);
    }
    seen.add(item);
  }
  return Array.from(duplicates);
}

function formatIds(items) {
  return items.map((item) => item.id).join(", ");
}

function nextRecommendation() {
  const publishedIssues = issues.filter((item) => item.status === "published").length;
  const publishedSites = sites.filter((item) => item.status === "published").length;

  if (publishedPlaceholderCases.length > 0) {
    return `Review published placeholder cases (${formatIds(publishedPlaceholderCases)}) before more image downloads; either find safe images, demote them to draft, or replace them with stronger draft candidates.`;
  }
  if (publishedIssuesWithoutPublishedCase.length > 0) {
    return `Promote or replace related cases for published issues with no public-ready examples (${publishedIssuesWithoutPublishedCase.map((item) => item.issue.id).join(", ")}).`;
  }
  if (publishedIssuesWithDraftCaseRefs.length > 0) {
    return `Continue relationship cleanup for ${publishedIssuesWithDraftCaseRefs.length} published issues that still reference draft cases; keep only source-safe published examples on the public surface.`;
  }
  if (localImageCasesMissingFiles.length > 0) {
    return `Fix broken local case image references before visual QA: ${localImageCasesMissingFiles.slice(0, 5).join(", ")}.`;
  }
  if (localCaseImagesMissingFromManifest.length > 0) {
    return `Sync image manifest coverage for local case images not yet tracked there: ${localCaseImagesMissingFromManifest.slice(0, 5).join(", ")}.`;
  }
  if (manifestMissingLocalFiles.length > 0) {
    return `Fix current manifest entries missing local files before more image work: ${manifestMissingLocalFiles.slice(0, 5).join(", ")}.`;
  }
  if (imageRetryQueue.length > 0) {
    return `Retry queued remote Commons images only when expanding image coverage; use the retry queue in slow 1-2 item batches, starting with ${imageRetryQueue.slice(0, 2).map((item) => item.id).join(" and ")}.`;
  }
  if (issues.length >= 60 && sites.length >= 30 && cases.length >= 60 && publishedIssues >= 30 && publishedSites >= 20 && placeholderCases.length > 0) {
    return "Improve high-value case records before publishing more cases: add safe image sources where possible, then promote only image-safe/source-strong cases.";
  }
  if (issues.length >= 60 && sites.length >= 30 && cases.length >= 60) {
    return "Pause content expansion and run a draft review pass. Promote only source-strong records to `published`, then continue toward 70/35/70.";
  }
  return "Continue source-backed content expansion to 60 issues, 30 site types, and 60 cases, then run a draft review pass before promoting more records to `published`.";
}
