const res = await fetch("https://wxcyxdiavjrbqdjxqsrl.supabase.co/functions/v1/process-material", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4Y3l4ZGlhdmpyYnFkanhxc3JsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTM0MzE2NCwiZXhwIjoyMDk2OTE5MTY0fQ.IbFe4nx7N_Nflgh1_UI5GXzYnqiuHebsGFsSAT6md_Q"
  },
  body: JSON.stringify({ material_id: "50f6a4c5-06f7-420b-b36e-dd4a9b3224f6" })
});
console.log(res.status, await res.text());
