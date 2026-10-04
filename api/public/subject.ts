import { createClient } from "@supabase/supabase-js";

export const config = { runtime: "edge" };

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://wxcyxdiavjrbqdjxqsrl.supabase.co";
const ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY!;

export default async function handler(req: Request) {
  const code = (new URL(req.url).searchParams.get("code") ?? "").toUpperCase().trim();
  if (!code || code.length > 20) return html(404, notFound());

  const sb = createClient(SUPABASE_URL, ANON_KEY);
  const { data: materials } = await sb
    .from("study_materials")
    .select("id, title, paper_type, academic_year, topics, summary, download_count")
    .eq("course_code", code)
    .eq("processing_status", "done")
    .order("created_at", { ascending: false })
    .limit(50);

  if (!materials || materials.length === 0) return html(404, notFound(code));

  const exams = materials.filter((m) => m.paper_type === "exam" || m.paper_type === "test");
  const notes = materials.filter((m) => m.paper_type === "notes");
  const allTopics = Array.from(new Set(materials.flatMap((m) => m.topics ?? []))).slice(0, 12);

  const title = `${code} past papers & notes | 515`;
  const description = `${materials.length} ${code} materials — ${exams.length} papers, ${notes.length} notes. Free for Zambian university students.`;

  return html(200, page({ code, materials, exams, notes, allTopics, title, description }));
}

function page({ code, materials, exams, notes, allTopics, title, description }: any) {
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="https://warren-515.vercel.app/subjects/${code}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="https://warren-515.vercel.app/subjects/${code}">
<meta name="twitter:card" content="summary">
<style>
  *{box-sizing:border-box}
  body{font-family:'Plus Jakarta Sans',system-ui,-apple-system,sans-serif;margin:0;background:#f8fafc;color:#0f172a;line-height:1.5;-webkit-font-smoothing:antialiased}
  .container{max-width:560px;margin:0 auto;padding:20px}
  header{display:flex;align-items:center;justify-content:space-between;padding:16px 0}
  .logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:inherit}
  .logo-mark{width:36px;height:36px;border-radius:14px;background:linear-gradient(135deg,#2563eb,#06b6d4);display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:14px;box-shadow:0 6px 16px rgba(37,99,235,.25)}
  .logo-text{font-weight:800;font-size:18px;letter-spacing:-.02em}
  .signin{font-size:13px;font-weight:600;color:#2563eb;text-decoration:none;padding:8px 14px;border-radius:10px;background:#eff6ff}
  .hero{padding:8px 0 20px}
  h1{font-size:32px;font-weight:800;letter-spacing:-.03em;margin:0 0 6px;line-height:1.15}
  .sub{color:#64748b;font-size:14px;margin:0}
  .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:20px 0}
  .stat{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:14px;text-align:center}
  .stat-n{font-size:24px;font-weight:800;color:#0f172a;line-height:1}
  .stat-l{font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:.06em;font-weight:600;margin-top:6px}
  .tags{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 24px}
  .tag{background:#eff6ff;color:#1d4ed8;padding:5px 11px;border-radius:999px;font-size:12px;font-weight:600}
  h2{font-size:15px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:.08em;margin:24px 0 10px}
  .item{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:14px 16px;margin-bottom:8px;display:flex;align-items:center;gap:12px;text-decoration:none;color:inherit;transition:box-shadow .15s,border-color .15s}
  .item:hover{border-color:#93c5fd;box-shadow:0 4px 12px rgba(37,99,235,.08)}
  .badge{width:40px;height:40px;border-radius:12px;background:#eff6ff;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
  .item-body{flex:1;min-width:0}
  .item-title{font-weight:700;font-size:14px;margin:0 0 2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .item-meta{font-size:12px;color:#64748b;margin:0}
  .lock{color:#94a3b8;flex-shrink:0}
  .cta-wrap{margin-top:28px;padding-top:24px;border-top:1px solid #e2e8f0;text-align:center}
  .cta{display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#2563eb,#06b6d4);color:white;text-decoration:none;border-radius:14px;font-weight:700;font-size:15px;box-shadow:0 8px 20px rgba(37,99,235,.3)}
  .cta-sub{font-size:12px;color:#64748b;margin-top:10px}
</style></head><body>
<div class="container">
  <header>
    <a href="/" class="logo">
      <div class="logo-mark">515</div>
      <span class="logo-text">515</span>
    </a>
    <a href="/login?next=/subjects/${code}" class="signin">Sign in</a>
  </header>

  <div class="hero">
    <h1>${code}</h1>
    <p class="sub">Past papers, notes, and community solutions</p>
  </div>

  <div class="stats">
    <div class="stat"><div class="stat-n">${materials.length}</div><div class="stat-l">Total</div></div>
    <div class="stat"><div class="stat-n">${exams.length}</div><div class="stat-l">Papers</div></div>
    <div class="stat"><div class="stat-n">${notes.length}</div><div class="stat-l">Notes</div></div>
  </div>

  ${allTopics.length ? `<div class="tags">${allTopics.map((t: string) => `<span class="tag">${esc(t)}</span>`).join("")}</div>` : ""}

  <h2>Recent materials</h2>
  ${materials.slice(0, 8).map((m: any) => `
    <a class="item" href="/login?next=/papers/${m.id}">
      <div class="badge">${emojiFor(m.paper_type)}</div>
      <div class="item-body">
        <p class="item-title">${esc(m.title)}</p>
        <p class="item-meta">${[m.paper_type, m.academic_year].filter(Boolean).join(" · ")}</p>
      </div>
      <span class="lock">🔒</span>
    </a>
  `).join("")}

  <div class="cta-wrap">
    <a class="cta" href="/register?next=/subjects/${code}">Sign up to unlock →</a>
    <p class="cta-sub">Free. One tap with Google.</p>
  </div>
</div>
</body></html>`;
}

function emojiFor(type: string | null): string {
  if (type === "exam") return "📄";
  if (type === "test") return "📝";
  if (type === "notes") return "📘";
  if (type === "solutions") return "✅";
  return "📁";
}

function notFound(code?: string) {
  return `<!doctype html><html><head><meta charset="utf-8"><title>Not found | 515</title><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet"><style>body{font-family:'Plus Jakarta Sans',system-ui;padding:60px 20px;text-align:center;background:#f8fafc;color:#0f172a}h1{font-size:24px;margin:0 0 12px}p{color:#64748b}a{color:#2563eb;text-decoration:none;font-weight:600}</style></head><body><h1>No materials yet for ${esc(code ?? "this course")}</h1><p>Check back soon, or <a href="/login">sign in</a> to request it.</p></body></html>`;
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
