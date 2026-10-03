import { createClient } from "@supabase/supabase-js";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";
import { createCanvas, DOMMatrix, ImageData, Path2D } from "@napi-rs/canvas";

// Polyfill globals BEFORE pdfjs touches them
globalThis.DOMMatrix = DOMMatrix;
globalThis.ImageData = ImageData;
globalThis.Path2D = Path2D;

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } },
);

const { data: rows } = await supabase
  .from("study_materials")
  .select("id, title, original_file_path")
  .eq("processing_status", "failed")
  .not("original_file_path", "is", null);

console.log(`Found ${rows.length} rows to preprocess\n`);

for (const [i, row] of rows.entries()) {
  const prefix = `[${i + 1}/${rows.length}]`;
  try {
    const { data: blob, error } = await supabase.storage
      .from("study-materials")
      .download(row.original_file_path);
    if (error) throw error;

    const pdfBytes = new Uint8Array(await blob.arrayBuffer());

    // Load with pdfjs directly
    const doc = await pdfjs.getDocument({
      data: pdfBytes,
      useSystemFonts: true,
      disableFontFace: true, // avoid font rendering issues in Node
    }).promise;

    const numPages = doc.numPages;

    for (let p = 1; p <= numPages; p++) {
      const page = await doc.getPage(p);
      const viewport = page.getViewport({ scale: 2.0 });

      const canvas = createCanvas(viewport.width, viewport.height);
      const ctx = canvas.getContext("2d");

      // pdfjs render expects canvasContext + viewport
      await page.render({
        canvasContext: ctx,
        viewport,
        canvasFactory: null, // pdfjs won't try to make its own canvas
      }).promise;

      const png = canvas.toBuffer("image/png");
      const path = `${row.id}/pages/page-${String(p).padStart(3, "0")}.png`;

      await supabase.storage
        .from("study-materials")
        .upload(path, png, { contentType: "image/png", upsert: true });

      if (p % 5 === 0) console.log(`  ${prefix} rendered page ${p}/${numPages}`);
    }

    console.log(`${prefix} ✓ rendered ${numPages} pages — ${row.title}`);

    await supabase
      .from("study_materials")
      .update({ processing_status: "pending", processing_error: null })
      .eq("id", row.id);

    await supabase.functions.invoke("process-material", {
      body: { material_id: row.id },
    });
  } catch (err) {
    console.error(`${prefix} ✗ ${row.title} — ${err.message}`);
  }
  await new Promise((r) => setTimeout(r, 8000));
}

console.log("\nDone.");