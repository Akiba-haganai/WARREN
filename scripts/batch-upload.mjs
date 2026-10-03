// scripts/batch-upload.mjs
//
// Usage:
//   node scripts/batch-upload.mjs <folder> \
//     --subject "Computer Science" \
//     --programme "Computer Science" \
//     --year "Year 2" \
//     --uploader <uuid>
//
// Extracts nothing itself — it uploads files, creates rows, and invokes
// process-material for each. The Edge Function does the heavy lifting.

import { createClient } from "@supabase/supabase-js";
import { readdir, readFile } from "fs/promises";
import { join, extname, basename } from "path";
import { config } from "dotenv";

config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY; // must be service role to bypass RLS
const UPLOADER_ID  = process.env.SEED_UPLOADER_ID;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

// ── Parse args ─────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const folder = args[0];
if (!folder) {
  console.error("Usage: node batch-upload.mjs <folder> [--subject X] [--programme Y] [--year Z]");
  process.exit(1);
}

function flag(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}

const opts = {
  subject:   flag("subject",   "General"),
  programme: flag("programme", null),
  year:      flag("year",      "All Years"),
  uploader:  flag("uploader",  UPLOADER_ID),
};

if (!opts.uploader) {
  console.error("Need --uploader <uuid> or SEED_UPLOADER_ID env var");
  process.exit(1);
}

const ALLOWED_EXT = new Set([".pdf", ".png", ".jpg", ".jpeg", ".webp", ".heic", ".pptx", ".docx"]);

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

// ── Collect files ──────────────────────────────────────────────────────────
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (ALLOWED_EXT.has(extname(e.name).toLowerCase())) out.push(full);
  }
  return out;
}

const files = await walk(folder);
console.log(`Found ${files.length} files in ${folder}`);
console.log(`Subject: ${opts.subject}  Year: ${opts.year}  Uploader: ${opts.uploader}\n`);

let ok = 0, failed = 0;

for (const [idx, filePath] of files.entries()) {
  const name = basename(filePath);
  const ext  = extname(filePath).toLowerCase();
  const prefix = `[${idx + 1}/${files.length}]`;

  try {
    // 1. Read file
    const buffer = await readFile(filePath);

    // 2. Generate ID first
    const materialId = crypto.randomUUID();
    const storagePath = `${materialId}/original${ext}`;
    const contentType = mimeFor(ext);

    // 3. Upload file
    const { error: uploadErr } = await supabase.storage
      .from("study-materials")
      .upload(storagePath, buffer, { contentType, upsert: false });

    if (uploadErr) throw uploadErr;

    const { data: publicUrlData } = supabase.storage
      .from("study-materials")
      .getPublicUrl(storagePath);

    // 4. Create row
    const { data: created, error: insertErr } = await supabase
      .from("study_materials")
      .insert({
        id: materialId,
        title: basename(name, ext).replace(/[_-]+/g, " ").trim(),
        subject: opts.subject,
        programme: opts.programme,
        year_group: opts.year,
        material_type: "notes", // function will overwrite via paper_type
        file_url: publicUrlData.publicUrl,
        original_file_path: storagePath,
        uploaded_by: opts.uploader,
        submitted_by: opts.uploader,
        status: "approved",
        processing_status: "pending",
      })
      .select("id")
      .single();

    if (insertErr || !created) throw insertErr ?? new Error("insert returned nothing");

    // 5. Invoke processing
    const { error: fnErr } = await supabase.functions.invoke("process-material", {
      body: { material_id: materialId },
    });
    if (fnErr) console.warn(`  ${prefix} process-material warn: ${fnErr.message}`);

    ok++;
    console.log(`${prefix} ✓ ${name}`);
  } catch (err) {
    failed++;
    console.error(`${prefix} ✗ ${name} — ${err.message}`);
  }
}

console.log(`\nDone. ${ok} uploaded, ${failed} failed.`);

function mimeFor(ext) {
  return {
    ".pdf":  "application/pdf",
    ".png":  "image/png",
    ".jpg":  "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".heic": "image/heic",
    ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  }[ext] ?? "application/octet-stream";
}
