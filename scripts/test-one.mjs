import { createClient } from "@supabase/supabase-js";

const id = process.argv[2];
if (!id) {
  console.error("Usage: node --env-file=.env scripts/test-one.mjs <uuid>");
  process.exit(1);
}

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } },
);

const { data, error } = await supabase.functions.invoke("process-material", {
  body: { material_id: id },
});

console.log("response:", JSON.stringify(data, null, 2));
console.log("error:", error);