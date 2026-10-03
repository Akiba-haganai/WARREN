const jwt = 'eyJhbGciOiJFUzI1NiIsImtpZCI6IjBmODIzNzgyLTdkNmQtNGY5Yy04NThiLTFjNWI4MmJjODQ2ZSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3d4Y3l4ZGlhdmpyYnFkanhxc3JsLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJiNjkxMTc1MS1hZjViLTRhNmYtODA3OS01MDJmOGJmYmI2MDQiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzkwOTkwNTEzLCJpYXQiOjE3OTA5ODY5MTMsImVtYWlsIjoidGVzdF9hc2tAZXhhbXBsZS5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsIjoidGVzdF9hc2tAZXhhbXBsZS5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJzdWIiOiJiNjkxMTc1MS1hZjViLTRhNmYtODA3OS01MDJmOGJmYmI2MDQifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTc5MDk4NjkxM31dLCJzZXNzaW9uX2lkIjoiZTZkNjEyM2MtM2QwMi00ZGZhLWE0NGMtMjE2MTdhZDU2ZWNiIiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.fiKLo1mRYMEXPhGue-v98FrqnNA9haDy_ACjf-jrBFMEQucF7LtK9bmaKgwivk9uLQb935FWQp4upCRx0DOCZQ';

async function testMode(mode, question, material_id) {
  const res = await fetch("https://wxcyxdiavjrbqdjxqsrl.supabase.co/functions/v1/ask-paper", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + jwt
    },
    body: JSON.stringify({ mode, question, material_id })
  });
  console.log(`\n=== TEST: ${mode} | Q: ${question} ===`);
  console.log("Status:", res.status);
  console.log("Response:", await res.text());
}

async function run() {
  const res = await fetch("https://wxcyxdiavjrbqdjxqsrl.supabase.co/functions/v1/ask-paper", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + jwt
    },
    body: JSON.stringify({ mode: "find", question: "pipelining" })
  });
  const data = await res.json();
  console.log("=== FIND MODE ===");
  console.log("Results count:", data.results?.length);
  if (data.results?.length > 0) {
    const matId = data.results[0].id;
    await testMode("explain", "explain what pipelining is", matId);
    await testMode("explain", "who is the president of Zambia", matId);
  }
}
run();
