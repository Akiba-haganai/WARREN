import { createClient } from "@supabase/supabase-js";

export const config = { runtime: "edge" };

const URL_ = process.env.VITE_SUPABASE_URL || "https://wxcyxdiavjrbqdjxqsrl.supabase.co";
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export default async function handler(req: Request) {
  const slug = new URL(req.url).searchParams.get("slug");
  if (!slug) return html(404, notFound());

  const sb = createClient(URL_, KEY, { auth: { persistSession: false } });

  const { data: plan } = await sb
    .from("cram_plans")
    .select("id, subject, exam_date, days_total, generated_at, share_enabled")
    .eq("share_slug", slug)
    .eq("share_enabled", true)
    .single();

  if (!plan) return html(404, notFound());

  const { data: items } = await sb
    .from("cram_plan_items")
    .select("day_offset, position, material:study_materials(title, course_code, paper_type, academic_year)")
    .eq("plan_id", plan.id)
    .order("day_offset", { ascending: true })
    .order("position", { ascending: true });

  const grouped: Record<number, any[]> = {};
  (items ?? []).forEach((it: any) => {
    const m = Array.isArray(it.material) ? it.material[0] : it.material;
    (grouped[it.day_offset] ??= []).push({ ...it, material: m });
  });

  const title = `${plan.subject} — ${plan.days_total}-day cram plan | 515`;
  const description = `Shared cram plan for ${plan.subject}. ${items?.length ?? 0} study items across ${plan.days_total} days.`;

  return html(200, page({ plan, grouped, title, description }));
}

function page({ plan, grouped, title, description }: any) {
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="https://warren-515.vercel.app/cram/${plan.id}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="https://warren-515.vercel.app/cram/${plan.id}">
<meta name="twitter:card" content="summary">
<style>
  body{font-family:system-ui;max-width:640px;margin:0 auto;padding:24px;background:#f8fafc;color:#0f172a}
  h1{font-size:1.75rem;margin:0 0 8px}
  .meta{color:#64748b;margin-bottom:24px;font-size:.9rem}
  .day{margin-bottom:20px}
  .day h2{font-size:.75rem;text-transform:uppercase;letter-spacing:.1em;color:#94a3b8;margin:0 0 8px}
  .item{background:white;border:1px solid #e2e8f0;border-radius:12px;padding:12px;margin-bottom:6px}
  .item p{margin:0;font-size:.9rem;font-weight:600}
  .item small{color:#64748b}
  .cta{display:inline-block;margin-top:24px;padding:12px 20px;background:#1e88e5;color:white;text-decoration:none;border-radius:10px;font-weight:600}
</style></head><body>
<h1>${esc(plan.subject)} — ${plan.days_total}-day cram</h1>
<p class="meta">Exam ${new Date(plan.exam_date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
${Object.entries(grouped).sort(([a],[b]) => Number(a) - Number(b)).map(([day, list]) => `
<div class="day"><h2>Day ${Number(day) + 1}</h2>
${list.map((it: any) => `<div class="item"><p>${esc(it.material?.title ?? "Material")}</p><small>${[it.material?.course_code, it.material?.paper_type].filter(Boolean).join(" · ")}</small></div>`).join("")}
</div>`).join("")}
<a class="cta" href="/login">Open in 515 →</a>
</body></html>`;
}

function notFound() {
  return `<!doctype html><html><head><title>Not found</title></head><body style="font-family:system-ui;padding:48px;text-align:center"><h1>Plan not found</h1><p><a href="/">515</a></p></body></html>`;
}

function html(status: number, body: string) {
  return new Response(body, { status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300, s-maxage=3600" } });
}

function esc(s: string) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
