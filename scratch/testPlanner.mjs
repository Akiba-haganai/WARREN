import { createClient } from "@supabase/supabase-js";
const supabase = createClient('https://wxcyxdiavjrbqdjxqsrl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4Y3l4ZGlhdmpyYnFkanhxc3JsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTM0MzE2NCwiZXhwIjoyMDk2OTE5MTY0fQ.IbFe4nx7N_Nflgh1_UI5GXzYnqiuHebsGFsSAT6md_Q');

async function test() {
  const userId = '1b4ad2d6-c40a-44de-b87c-7ed4f0a21ee2';
  
  // Actually let's use the code from cram.service.ts to generate a plan.
  const courseKey = 'CS 220';
  const examDate = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);
  const examMs = new Date(examDate).getTime();
  const daysTotal = Math.max(1, Math.ceil((examMs - Date.now()) / 86400000));

  console.log("Generating plan for CS 220, exam date:", examDate, "days:", daysTotal);

  const { data: materials, error } = await supabase
    .from("study_materials")
    .select("id, title, material_type, paper_type")
    .eq("processing_status", "done")
    .or(`course_code.eq.${courseKey},subject.eq.${courseKey}`)
    .order("trending_score", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .limit(30);

  if (error || !materials || materials.length === 0) {
    console.log("No materials found:", error);
    return;
  }

  const notes = materials.filter((m) => m.paper_type === "notes" || m.material_type === "notes");
  const papers = materials.filter((m) => m.paper_type === "exam" || m.paper_type === "test");
  const solutions = materials.filter((m) => m.paper_type === "solutions");

  const items = [];
  let pos = 0;
  const studyDays = daysTotal - 2;
  const pool = notes.length > 0 ? notes : materials;
  const perDay = Math.max(1, Math.ceil(pool.length / studyDays));
  let idx = 0;
  for (let d = 0; d < studyDays; d++) {
    for (let k = 0; k < perDay && idx < pool.length; k++, idx++) {
      items.push({ day_offset: d, material_id: pool[idx].id, position: pos++ });
    }
  }
  papers.slice(0, 2).forEach((m) => items.push({ day_offset: daysTotal - 2, material_id: m.id, position: pos++ }));
  const reviewSource = solutions.length > 0 ? solutions : notes.slice(0, 2);
  reviewSource.slice(0, 2).forEach((m) => items.push({ day_offset: daysTotal - 1, material_id: m.id, position: pos++ }));

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

  if (planErr) {
    console.log("Plan insert error:", planErr);
    return;
  }
  console.log("Plan generated successfully:", plan.id);

  const rows = items.map((it) => ({
    plan_id: plan.id,
    day_offset: it.day_offset,
    material_id: it.material_id,
    position: it.position,
  }));
  const { error: itemsErr } = await supabase.from("cram_plan_items").insert(rows).select("id");
  if (itemsErr) {
    console.log("Items insert error:", itemsErr);
    return;
  }
  
  // Test checkboxes
  const { data: fetchedItems } = await supabase.from("cram_plan_items").select("id").eq("plan_id", plan.id);
  console.log(`Generated ${fetchedItems.length} items.`);

  if (fetchedItems.length > 0) {
    const itemToToggle = fetchedItems[0].id;
    const { error: toggleErr } = await supabase.from("cram_plan_progress").insert({ item_id: itemToToggle, user_id: userId });
    console.log("Toggled item 1:", toggleErr ? toggleErr : "Success");
    
    // Check if it persists
    const { data: prog } = await supabase.from("cram_plan_progress").select("*").eq("item_id", itemToToggle);
    console.log("Progress persists:", prog.length > 0);
  }
}
test();
