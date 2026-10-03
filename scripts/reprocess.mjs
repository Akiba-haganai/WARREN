// scripts/reprocess.mjs
// Re-invokes process-material on every row that isn't fully done.
// Rate-limited to avoid slamming the Gemini free tier.
//
// Usage:
//   node scripts/reprocess.mjs            # only failed + pending
//   node scripts/reprocess.mjs --all      # everything, including done rows

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://wxcyxdiavjrbqdjxqsrl.supabase.co";
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4Y3l4ZGlhdmpyYnFkanhxc3JsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTM0MzE2NCwiZXhwIjoyMDk2OTE5MTY0fQ.IbFe4nx7N_Nflgh1_UI5GXzYnqiuHebsGFsSAT6md_Q";
const DELAY_MS     = 4200; // 4.2s delay ensures ~14 requests per minute, cleanly avoiding the 15 RPM free tier quota

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const all = process.argv.includes("--all");

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

let query = supabase
  .from("study_materials")
  .select("id, title, processing_status, original_file_path, file_url")
  .order("created_at", { ascending: true });

if (!all) {
  query = query.or("processing_status.in.(pending,failed),topics.eq.{}");
}

const { data: rows, error } = await query;
if (error) {
  console.error(error);
  process.exit(1);
}

console.log(`Found ${rows.length} rows to process.\n`);

let ok = 0, failed = 0;

for (const [i, row] of rows.entries()) {
  const prefix = `[${i + 1}/${rows.length}]`;

  // Skip rows with no file at all (external URL only)
  if (!row.original_file_path && !row.file_url) {
    console.log(`${prefix} ⊘ skip (no file) — ${row.title}`);
    continue;
  }

  try {
    const { error: fnErr } = await supabase.functions.invoke("process-material", {
      body: { material_id: row.id },
    });
    if (fnErr) throw fnErr;
    ok++;
    console.log(`${prefix} ✓ ${row.title}`);
  } catch (err) {
    failed++;
    console.error(`${prefix} ✗ ${row.title} — ${err.message}`);
  }

  await new Promise((r) => setTimeout(r, 8000));
}

console.log(`\nDone. ${ok} reprocessed, ${failed} failed.`);
