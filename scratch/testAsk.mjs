import { createClient } from "@supabase/supabase-js";
const supabase = createClient('https://wxcyxdiavjrbqdjxqsrl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4Y3l4ZGlhdmpyYnFkanhxc3JsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTM0MzE2NCwiZXhwIjoyMDk2OTE5MTY0fQ.IbFe4nx7N_Nflgh1_UI5GXzYnqiuHebsGFsSAT6md_Q');

async function test() {
  const { data: authData, error: authErr } = await supabase.auth.signUp({
    email: 'test_ask@example.com',
    password: 'password123'
  });
  if (authErr) {
    const { data: signInData, error: signInErr } = await supabase.auth.signInWithPassword({
        email: 'test_ask@example.com',
        password: 'password123'
    });
    console.log("JWT:", signInData.session?.access_token);
  } else {
    console.log("JWT:", authData.session?.access_token);
  }
}
test();
