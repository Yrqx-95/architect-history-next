#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import Ajv from "ajv";

const root = process.cwd();
const mode = process.argv.includes("--from-json") ? "from-json" : "to-json";

const datasets = [
  {
    name: "issues",
    csvPath: "content/issues.csv",
    jsonPath: "src/content/graduation/issues.json",
    publicCsvPath: "public/data/graduation/issues.csv",
    publicJsonPath: "public/data/graduation/issues.json",
    schemaPath: "schemas/issue.schema.json",
    headers: [
      "id",
      "title",
      "title_ja",
      "title_en",
      "summary",
      "summary_ja",
      "summary_en",
      "keywords",
      "keywords_ja",
      "keywords_en",
      "recommended_site_types",
      "recommended_building_types",
      "recommended_building_types_ja",
      "recommended_building_types_en",
      "reference_case_ids",
      "case_relation_notes",
      "case_relation_notes_ja",
      "case_relation_notes_en",
      "source_urls",
      "status",
      "updated_at",
    ],
    fromRow: (row) => omitEmpty({
      id: row.id,
      title: row.title,
      ...optionalText("title_ja", row.title_ja),
      ...optionalText("title_en", row.title_en),
      summary: row.summary,
      ...optionalText("summary_ja", row.summary_ja),
      ...optionalText("summary_en", row.summary_en),
      keywords: splitList(row.keywords),
      ...optionalList("keywords_ja", row.keywords_ja),
      ...optionalList("keywords_en", row.keywords_en),
      recommended_site_types: splitList(row.recommended_site_types),
      recommended_building_types: splitList(row.recommended_building_types),
      ...optionalList("recommended_building_types_ja", row.recommended_building_types_ja),
      ...optionalList("recommended_building_types_en", row.recommended_building_types_en),
      reference_case_ids: splitList(row.reference_case_ids),
      case_relation_notes: parseRelationNotes(row.case_relation_notes),
      ...optionalRelationNotes("case_relation_notes_ja", row.case_relation_notes_ja),
      ...optionalRelationNotes("case_relation_notes_en", row.case_relation_notes_en),
      source_urls: splitList(row.source_urls),
      status: row.status,
      updated_at: row.updated_at,
    }),
    toRow: (item) => ({
      id: item.id,
      title: item.title,
      title_ja: item.title_ja ?? "",
      title_en: item.title_en ?? "",
      summary: item.summary,
      summary_ja: item.summary_ja ?? "",
      summary_en: item.summary_en ?? "",
      keywords: joinList(item.keywords),
      keywords_ja: joinList(item.keywords_ja),
      keywords_en: joinList(item.keywords_en),
      recommended_site_types: joinList(item.recommended_site_types),
      recommended_building_types: joinList(item.recommended_building_types),
      recommended_building_types_ja: joinList(item.recommended_building_types_ja),
      recommended_building_types_en: joinList(item.recommended_building_types_en),
      reference_case_ids: joinList(item.reference_case_ids),
      case_relation_notes: formatRelationNotes(item.case_relation_notes),
      case_relation_notes_ja: formatRelationNotes(item.case_relation_notes_ja),
      case_relation_notes_en: formatRelationNotes(item.case_relation_notes_en),
      source_urls: joinList(item.source_urls),
      status: item.status,
      updated_at: item.updated_at ?? "",
    }),
  },
  {
    name: "site_types",
    csvPath: "content/site_types.csv",
    jsonPath: "src/content/graduation/site-types.json",
    publicCsvPath: "public/data/graduation/site_types.csv",
    publicJsonPath: "public/data/graduation/site_types.json",
    schemaPath: "schemas/site_type.schema.json",
    headers: [
      "id",
      "name",
      "name_ja",
      "name_en",
      "address_example",
      "address_example_ja",
      "address_example_en",
      "fit_reason",
      "fit_reason_ja",
      "fit_reason_en",
      "map_url",
      "keywords",
      "keywords_ja",
      "keywords_en",
      "candidate_locations_json",
      "status",
    ],
    fromRow: (row) => ({
      id: row.id,
      name: row.name,
      ...optionalText("name_ja", row.name_ja),
      ...optionalText("name_en", row.name_en),
      address_example: row.address_example,
      ...optionalText("address_example_ja", row.address_example_ja),
      ...optionalText("address_example_en", row.address_example_en),
      fit_reason: row.fit_reason,
      ...optionalText("fit_reason_ja", row.fit_reason_ja),
      ...optionalText("fit_reason_en", row.fit_reason_en),
      map_url: row.map_url,
      keywords: splitList(row.keywords),
      ...optionalList("keywords_ja", row.keywords_ja),
      ...optionalList("keywords_en", row.keywords_en),
      ...optionalJsonArray("candidate_locations", row.candidate_locations_json),
      status: row.status,
    }),
    toRow: (item) => ({
      id: item.id,
      name: item.name,
      name_ja: item.name_ja ?? "",
      name_en: item.name_en ?? "",
      address_example: item.address_example,
      address_example_ja: item.address_example_ja ?? "",
      address_example_en: item.address_example_en ?? "",
      fit_reason: item.fit_reason,
      fit_reason_ja: item.fit_reason_ja ?? "",
      fit_reason_en: item.fit_reason_en ?? "",
      map_url: item.map_url ?? "",
      keywords: joinList(item.keywords),
      keywords_ja: joinList(item.keywords_ja),
      keywords_en: joinList(item.keywords_en),
      candidate_locations_json: formatJsonArray(item.candidate_locations),
      status: item.status,
    }),
  },
  {
    name: "cases",
    csvPath: "content/cases.csv",
    jsonPath: "src/content/graduation/cases.json",
    publicCsvPath: "public/data/graduation/cases.csv",
    publicJsonPath: "public/data/graduation/cases.json",
    schemaPath: "schemas/case.schema.json",
    headers: [
      "id",
      "name",
      "name_ja",
      "name_en",
      "location",
      "location_ja",
      "location_en",
      "image_url",
      "image_source_url",
      "image_license",
      "image_credit",
      "image_note",
      "plan_url",
      "section_url",
      "concept",
      "concept_ja",
      "concept_en",
      "keywords",
      "keywords_ja",
      "keywords_en",
      "source_url",
      "year",
      "architect",
      "status",
    ],
    fromRow: (row) => ({
      id: row.id,
      name: row.name,
      ...optionalText("name_ja", row.name_ja),
      ...optionalText("name_en", row.name_en),
      location: row.location,
      ...optionalText("location_ja", row.location_ja),
      ...optionalText("location_en", row.location_en),
      image_url: row.image_url,
      ...optionalText("image_source_url", row.image_source_url),
      ...optionalText("image_license", row.image_license),
      ...optionalText("image_credit", row.image_credit),
      ...optionalText("image_note", row.image_note),
      plan_url: row.plan_url,
      section_url: row.section_url,
      concept: row.concept,
      ...optionalText("concept_ja", row.concept_ja),
      ...optionalText("concept_en", row.concept_en),
      keywords: splitList(row.keywords),
      ...optionalList("keywords_ja", row.keywords_ja),
      ...optionalList("keywords_en", row.keywords_en),
      source_url: row.source_url,
      year: parseYear(row.year),
      architect: row.architect,
      status: row.status,
    }),
    toRow: (item) => ({
      id: item.id,
      name: item.name,
      name_ja: item.name_ja ?? "",
      name_en: item.name_en ?? "",
      location: item.location,
      location_ja: item.location_ja ?? "",
      location_en: item.location_en ?? "",
      image_url: item.image_url,
      image_source_url: item.image_source_url ?? "",
      image_license: item.image_license ?? "",
      image_credit: item.image_credit ?? "",
      image_note: item.image_note ?? "",
      plan_url: item.plan_url ?? "",
      section_url: item.section_url ?? "",
      concept: item.concept,
      concept_ja: item.concept_ja ?? "",
      concept_en: item.concept_en ?? "",
      keywords: joinList(item.keywords),
      keywords_ja: joinList(item.keywords_ja),
      keywords_en: joinList(item.keywords_en),
      source_url: item.source_url,
      year: item.year ?? "",
      architect: item.architect ?? "",
      status: item.status,
    }),
  },
];

if (mode === "from-json") {
  for (const dataset of datasets) {
    const items = readJson(dataset.jsonPath);
    const rows = items.map(dataset.toRow);
    writeIfChanged(dataset.csvPath, stringifyCsv(dataset.headers, rows));
    writePublicExports(dataset, items);
    console.log(`Wrote ${dataset.csvPath} from ${dataset.jsonPath}: ${rows.length} rows`);
  }
} else {
  const ajv = new Ajv({ allErrors: true, schemaId: "auto", format: false });
  for (const dataset of datasets) {
    const csv = readText(dataset.csvPath);
    const rows = parseCsv(csv);
    assertHeaders(dataset, rows.headers);
    const items = rows.records.map(dataset.fromRow);
    validateItems(ajv, dataset, items);
    writeIfChanged(dataset.jsonPath, `${JSON.stringify(items, null, 2)}\n`);
    writePublicExports(dataset, items);
    console.log(`Built ${dataset.jsonPath} from ${dataset.csvPath}: ${items.length} rows`);
  }
}

function absolute(relativePath) {
  return path.join(root, relativePath);
}

function readText(relativePath) {
  return fs.readFileSync(absolute(relativePath), "utf8").replace(/^\uFEFF/, "");
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath));
}

function writeIfChanged(relativePath, content) {
  const filePath = absolute(relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  if (fs.existsSync(filePath) && fs.readFileSync(filePath, "utf8") === content) {
    return;
  }
  fs.writeFileSync(filePath, content);
}

// Small RFC 4180-style parser for this local content workflow.
function parseCsv(input) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        cell += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") {
      cell += char;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  const [headers, ...body] = rows.filter((candidate) => candidate.some((value) => value !== ""));
  if (!headers) {
    throw new Error("CSV file is empty");
  }

  return {
    headers,
    records: body.map((values, index) => {
      if (values.length !== headers.length) {
        throw new Error(`CSV row ${index + 2} has ${values.length} cells, expected ${headers.length}`);
      }
      return Object.fromEntries(headers.map((header, headerIndex) => [header, values[headerIndex]]));
    }),
  };
}

function stringifyCsv(headers, rows) {
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((header) => escapeCsv(row[header] ?? "")).join(","));
  }
  return `${lines.join("\n")}\n`;
}

function escapeCsv(value) {
  const text = String(value);
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function assertHeaders(dataset, actualHeaders) {
  const expected = dataset.headers.join(",");
  const actual = actualHeaders.join(",");
  if (actual !== expected) {
    throw new Error(`${dataset.csvPath} header mismatch.\nExpected: ${expected}\nActual:   ${actual}`);
  }
}

function validateItems(ajv, dataset, items) {
  const schema = readJson(dataset.schemaPath);
  const validate = ajv.compile(schema);
  const failures = [];
  items.forEach((item, index) => {
    if (!validate(item)) {
      failures.push({ row: index + 2, id: item.id, errors: validate.errors });
    }
  });
  if (failures.length > 0) {
    console.dir(failures.slice(0, 10), { depth: null });
    throw new Error(`${dataset.name} failed schema validation: ${failures.length}/${items.length}`);
  }
}

function writePublicExports(dataset, items) {
  writeIfChanged(dataset.publicJsonPath, `${JSON.stringify(items, null, 2)}\n`);
  writeIfChanged(dataset.publicCsvPath, stringifyCsv(dataset.headers, items.map(dataset.toRow)));
}

function splitList(value) {
  if (!value) {
    return [];
  }
  return value.split("|").map((item) => item.trim()).filter(Boolean);
}

function joinList(value) {
  return Array.isArray(value) ? value.join("|") : "";
}

function parseRelationNotes(value) {
  const notes = {};
  for (const part of splitList(value)) {
    const divider = part.indexOf("::");
    if (divider === -1) {
      throw new Error(`Invalid relation note "${part}". Use CASE-001::note text`);
    }
    const caseId = part.slice(0, divider).trim();
    const note = part.slice(divider + 2).trim();
    if (caseId && note) {
      notes[caseId] = note;
    }
  }
  return Object.keys(notes).length > 0 ? notes : undefined;
}

function formatRelationNotes(notes) {
  if (!notes) {
    return "";
  }
  return Object.entries(notes).map(([caseId, note]) => `${caseId}::${note}`).join("|");
}

function parseYear(value) {
  if (!value) {
    return null;
  }
  const year = Number(value);
  if (!Number.isInteger(year)) {
    throw new Error(`Invalid year "${value}"`);
  }
  return year;
}

function optionalText(key, value) {
  return value ? { [key]: value } : {};
}

function optionalList(key, value) {
  const items = splitList(value);
  return items.length > 0 ? { [key]: items } : {};
}

function optionalRelationNotes(key, value) {
  const notes = parseRelationNotes(value);
  return notes ? { [key]: notes } : {};
}

function optionalJsonArray(key, value) {
  if (!value) {
    return {};
  }
  const parsed = JSON.parse(value);
  if (!Array.isArray(parsed)) {
    throw new Error(`${key} must be a JSON array`);
  }
  return parsed.length > 0 ? { [key]: parsed } : {};
}

function formatJsonArray(value) {
  return Array.isArray(value) && value.length > 0 ? JSON.stringify(value) : "";
}

function omitEmpty(input) {
  return Object.fromEntries(
    Object.entries(input).filter(([, value]) => {
      if (value === undefined) {
        return false;
      }
      if (typeof value === "string" && value === "") {
        return false;
      }
      return true;
    }),
  );
}
