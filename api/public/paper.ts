import { createClient } from "@supabase/supabase-js";

export const config = { runtime: "edge" };

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://wxcyxdiavjrbqdjxqsrl.supabase.co";
const ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4Y3l4ZGlhdmpyYnFkanhxc3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNDMxNjQsImV4cCI6MjA5NjkxOTE2NH0.gWOOk4cT6bEjS46vZYMUoAWcbPi_emZBuRzpXICmssw";

export default async function handler(req: Request) {
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return html(404, notFound());

  const sb = createClient(SUPABASE_URL, ANON_KEY);
  const { data: m } = await sb
    .from("study_materials")
    .select("id, title, course_code, paper_type, academic_year, topics, summary, pages, uploader:uploaded_by(username)")
    .eq("id", id)
    .eq("processing_status", "done")
    .single();

  if (!m) return html(404, notFound());

  const pages = (m.pages ?? []) as { page: number; text: string }[];
  const previewText = (pages[0]?.text ?? "").slice(0, 320).trim();
  const uploader = Array.isArray((m as any).uploader) ? (m as any).uploader[0] : (m as any).uploader;
  const uploaderFirstName = uploader?.username?.split(" ")[0] ?? null;

  const title = `${m.title}${m.course_code ? ` — ${m.course_code}` : ""} | 515`;
  const description = m.summary ?? `${m.paper_type ?? "Material"}${m.academic_year ? ` from ${m.academic_year}` : ""} on 515.`;

  return html(200, page({ m, previewText, uploaderFirstName, title, description }));
}

function page({ m, previewText, uploaderFirstName, title, description }: any) {
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="https://wave-515.vercel.app/papers/${m.id}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="https://wave-515.vercel.app/papers/${m.id}">
<meta name="twitter:card" content="summary">
<style>
  *{box-sizing:border-box}
  body{font-family:'Plus Jakarta Sans',system-ui,-apple-system,sans-serif;margin:0;background:#f8fafc;color:#0f172a;line-height:1.55;-webkit-font-smoothing:antialiased}
  .container{max-width:560px;margin:0 auto;padding:20px}
  header{display:flex;align-items:center;justify-content:space-between;padding:16px 0}
  .logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:inherit}
  .logo-mark{width:36px;height:36px;border-radius:14px;background:linear-gradient(135deg,#2563eb,#06b6d4);display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:14px;box-shadow:0 6px 16px rgba(37,99,235,.25)}
  .logo-text{font-weight:800;font-size:18px}
  .signin{font-size:13px;font-weight:600;color:#2563eb;text-decoration:none;padding:8px 14px;border-radius:10px;background:#eff6ff}
  .card{background:white;border:1px solid #e2e8f0;border-radius:20px;padding:22px;margin-top:12px;box-shadow:0 1px 3px rgba(15,23,42,.04)}
  .chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}
  .chip{background:#eff6ff;color:#1d4ed8;padding:4px 10px;border-radius:999px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em}
  .chip-green{background:#ecfdf5;color:#047857}
  h1{font-size:22px;font-weight:800;letter-spacing:-.02em;margin:0 0 10px;line-height:1.25}
  .meta{font-size:13px;color:#64748b;margin:0 0 18px}
  .preview{background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:16px;font-size:13px;color:#475569;line-height:1.65;font-family:ui-monospace,'Menlo',monospace;white-space:pre-wrap;word-break:break-word;position:relative;max-height:180px;overflow:hidden}
  .preview::after{content:'';position:absolute;left:0;right:0;bottom:0;height:60px;background:linear-gradient(to bottom,transparent,#f8fafc)}
  .cta-wrap{margin-top:24px;padding-top:20px;border-top:1px solid #e2e8f0;text-align:center}
  .cta{display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#2563eb,#06b6d4);color:white;text-decoration:none;border-radius:14px;font-weight:700;font-size:15px;box-shadow:0 8px 20px rgba(37,99,235,.3)}
  .cta-sub{font-size:12px;color:#64748b;margin-top:10px}
  .topics{display:flex;flex-wrap:wrap;gap:6px;margin:14px 0}
  .topic{background:#f1f5f9;color:#475569;padding:4px 10px;border-radius:999px;font-size:11px;font-weight:600}
</style></head><body>
<div class="container">
  <header>
    <a href="/" class="logo">
      <div class="logo-mark">515</div>
      <span class="logo-text">515</span>
    </a>
    <a href="/login?next=/papers/${m.id}" class="signin">Sign in</a>
  </header>

  <div class="card">
    <div class="chips">
      ${m.course_code ? `<span class="chip">${esc(m.course_code)}</span>` : ""}
      ${m.paper_type ? `<span class="chip">${esc(m.paper_type)}</span>` : ""}
      ${m.academic_year ? `<span class="chip chip-green">${esc(m.academic_year)}</span>` : ""}
    </div>

    <h1>${esc(m.title)}</h1>

    ${uploaderFirstName ? `<p class="meta">Shared by ${esc(uploaderFirstName)}</p>` : ""}

    ${m.summary ? `<p style="font-size:14px;color:#475569;margin:0 0 16px">${esc(m.summary)}</p>` : ""}

    ${m.topics?.length ? `<div class="topics">${m.topics.slice(0, 8).map((t: string) => `<span class="topic">${esc(t)}</span>`).join("")}</div>` : ""}

    ${previewText ? `<div class="preview">${esc(previewText)}…</div>` : ""}
  </div>

  <div class="cta-wrap">
    <a class="cta" href="/register?next=/papers/${m.id}">Sign up to read this paper →</a>
    <p class="cta-sub">Free. Unlock every paper in seconds.</p>
  </div>
</div>
</body></html>`;
}

function notFound() {
  return `<!doctype html><html><head><meta charset="utf-8"><title>Not found | 515</title><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet"><style>body{font-family:'Plus Jakarta Sans',system-ui;padding:60px 20px;text-align:center;background:#f8fafc;color:#0f172a}h1{font-size:24px;margin:0 0 12px}p{color:#64748b}a{color:#2563eb;text-decoration:none;font-weight:600}</style></head><body><h1>Paper not found</h1><p>It may have been removed. <a href="/">Back to 515</a></p></body></html>`;
}

function html(status: number, body: string) {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300, s-maxage=3600" },
  });
}

function esc(s: string) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
