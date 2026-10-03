// api/public/sitemap.ts
// Dynamic sitemap generator
import { createClient } from "@supabase/supabase-js";

export const config = { runtime: "edge" };

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://wxcyxdiavjrbqdjxqsrl.supabase.co";
const ANON_KEY     = process.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4Y3l4ZGlhdmpyYnFkanhxc3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDMxNjQsImV4cCI6MjA5NjkxOTE2NH0.gWOOk4cT6bEjS46vZYMUoAWcbPi_emZBuRzpXICmssw";
const BASE_URL     = "https://warren-515.vercel.app";

export default async function handler(req: Request) {
  const supabase = createClient(SUPABASE_URL, ANON_KEY);

  // Call the sitemap RPC or fallback to direct query
  let entries: { path: string; lastmod: string }[] = [];
  const { data: rpcData, error } = await (supabase.rpc as any)("list_public_sitemap");

  if (!error && rpcData) {
    entries = rpcData;
  } else {
    // Fallback: direct query
    const { data: materials } = await supabase
      .from("study_materials")
      .select("id, course_code, subject, created_at")
      .eq("processing_status", "done")
      .limit(500);

    const subjects = new Set<string>();
    for (const m of materials || []) {
      const code = m.course_code || m.subject;
      if (code && !subjects.has(code)) {
        subjects.add(code);
        entries.push({
          path: `/subjects/${encodeURIComponent(code)}`,
          lastmod: new Date().toISOString().split("T")[0],
        });
      }
      entries.push({
        path: `/papers/${m.id}`,
        lastmod: (m.created_at ? new Date(m.created_at) : new Date()).toISOString().split("T")[0],
      });
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/study</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  ${entries
    .map(
      (e) => `
  <url>
    <loc>${BASE_URL}${e.path}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
