import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
config();
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const res = await supabase.rpc('exec_sql', { sql: `alter table study_materials
  drop constraint if exists study_materials_metadata_source_check;

alter table study_materials
  add constraint study_materials_metadata_source_check
  check (metadata_source in ('groq', 'gemini', 'fallback', null));`});
console.log('done', res);
