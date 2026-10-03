import { supabase } from "../../../lib/supabase";

export interface CramPlan {
  id: string;
  user_id: string;
  subject: string;
  course_key: string | null;
  exam_date: string;
  days_total: number | null;
  generated_at: string | null;
  share_slug: string | null;
  share_enabled: boolean | null;
  status: string | null;
}

export interface CramItem {
  id: string;
  plan_id: string | null;
  day_offset: number;
  material_id: string | null;
  position: number | null;
  material?: {
    id: string;
    title: string;
    course_code: string | null;
    paper_type: string | null;
    academic_year: string | null;
    subject: string;
    material_type: string;
  } | null;
  completed?: boolean;
}

export async function fetchUserPlans(userId: string): Promise<CramPlan[]> {
  const { data, error } = await supabase
    .from("cram_plans")
    .select("*")
    .eq("user_id", userId)
    .order("generated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as CramPlan[];
}

export async function fetchPlanItems(
  planId: string,
  userId: string,
): Promise<CramItem[]> {
  const { data: items, error } = await supabase
    .from("cram_plan_items")
    .select(
      "id, plan_id, day_offset, material_id, position, material:study_materials(id, title, course_code, paper_type, academic_year, subject, material_type)",
    )
    .eq("plan_id", planId)
    .order("day_offset", { ascending: true })
    .order("position", { ascending: true });
  if (error) throw error;

  const ids = (items ?? []).map((i: any) => i.id);
  let completedIds = new Set<string>();
  if (ids.length > 0) {
    const { data: prog } = await supabase
      .from("cram_plan_progress")
      .select("item_id")
      .eq("user_id", userId)
      .in("item_id", ids);
    completedIds = new Set((prog ?? []).map((p) => p.item_id));
  }

  return (items ?? []).map((i: any) => ({
    ...i,
    material: Array.isArray(i.material) ? i.material[0] ?? null : i.material,
    completed: completedIds.has(i.id),
  })) as CramItem[];
}

export async function toggleItemCompleted(
  itemId: string,
  userId: string,
  completed: boolean,
) {
  if (completed) {
    await supabase
      .from("cram_plan_progress")
      .insert({ item_id: itemId, user_id: userId });
  } else {
    await supabase
      .from("cram_plan_progress")
      .delete()
      .eq("item_id", itemId)
      .eq("user_id", userId);
  }
}

export async function generatePlan(
  userId: string,
  courseKey: string,
  examDate: string,
): Promise<string> {
  const examMs = new Date(examDate).getTime();
  const daysTotal = Math.max(1, Math.ceil((examMs - Date.now()) / 86400000));

  const { data: materials, error } = await supabase
    .from("study_materials")
    .select("id, title, material_type, paper_type")
    .eq("processing_status", "done")
    .or(`course_code.eq.${courseKey},subject.eq.${courseKey}`)
    .order("trending_score", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .limit(30);

  if (error) throw error;
  if (!materials || materials.length === 0) {
    throw new Error(`No materials found for ${courseKey}`);
  }

  const notes = materials.filter(
    (m) => m.paper_type === "notes" || m.material_type === "notes",
  );
  const papers = materials.filter(
    (m) => m.paper_type === "exam" || m.paper_type === "test",
  );
  const solutions = materials.filter((m) => m.paper_type === "solutions");

  const items: { day_offset: number; material_id: string; position: number }[] = [];
  let pos = 0;

  if (daysTotal === 1) {
    [...notes.slice(0, 2), ...papers.slice(0, 1), ...solutions.slice(0, 1)].forEach(
      (m) => items.push({ day_offset: 0, material_id: m.id, position: pos++ }),
    );
  } else if (daysTotal === 2) {
    notes.slice(0, 3).forEach((m) =>
      items.push({ day_offset: 0, material_id: m.id, position: pos++ }),
    );
    papers.slice(0, 1).forEach((m) =>
      items.push({ day_offset: 1, material_id: m.id, position: pos++ }),
    );
    solutions.slice(0, 1).forEach((m) =>
      items.push({ day_offset: 1, material_id: m.id, position: pos++ }),
    );
  } else {
    const studyDays = daysTotal - 2;
    const pool = notes.length > 0 ? notes : materials;
    const perDay = Math.max(1, Math.ceil(pool.length / studyDays));
    let idx = 0;
    for (let d = 0; d < studyDays; d++) {
      for (let k = 0; k < perDay && idx < pool.length; k++, idx++) {
        items.push({ day_offset: d, material_id: pool[idx].id, position: pos++ });
      }
    }
    papers.slice(0, 2).forEach((m) =>
      items.push({ day_offset: daysTotal - 2, material_id: m.id, position: pos++ }),
    );
    const reviewSource = solutions.length > 0 ? solutions : notes.slice(0, 2);
    reviewSource.slice(0, 2).forEach((m) =>
      items.push({ day_offset: daysTotal - 1, material_id: m.id, position: pos++ }),
    );
  }

  const { data: plan, error: planErr } = await supabase
    .from("cram_plans")
    .insert({
      user_id: userId,
      subject: courseKey,
      course_key: courseKey,
      exam_date: examDate,
      days_total: daysTotal,
      generated_at: new Date().toISOString(),
      status: "active",
    })
    .select("id")
    .single();

  if (planErr || !plan) throw planErr ?? new Error("plan insert failed");

  const rows = items.map((it) => ({
    plan_id: plan.id,
    day_offset: it.day_offset,
    material_id: it.material_id,
    position: it.position,
  }));

  const { error: itemsErr } = await supabase.from("cram_plan_items").insert(rows);
  if (itemsErr) throw itemsErr;

  return plan.id;
}
