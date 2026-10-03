import { readFileSync, writeFileSync } from 'fs';
let text = readFileSync('supabase/functions/process-material/index.ts', 'utf-8');
text = text.replace('const VISION_BATCH_SIZE = 3;', `const VISION_BATCH_SIZE = 2;

async function fetchGroqWithBackoff(url: string, init: RequestInit, maxRetries = 3): Promise<Response> {
  let lastRes: Response | null = null;
  for (let i = 0; i < maxRetries; i++) {
    const res = await fetch(url, init);
    if (res.status !== 429) return res;
    // Groq sends Retry-After for RPM, or we use exponential for TPM
    const retryAfter = res.headers.get("retry-after");
    const wait = retryAfter
      ? Math.min(parseInt(retryAfter) * 1000, 20000)
      : Math.min(Math.pow(2, i) * 3000 + Math.random() * 1000, 20000);
    console.warn(\`[groq] 429 — waiting \${Math.round(wait)}ms (attempt \${i + 1}/\${maxRetries})\`);
    await new Promise((r) => setTimeout(r, wait));
    lastRes = res;
  }
  return lastRes!;
}`);
text = text.replaceAll('const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {', 'const res = await fetchGroqWithBackoff("https://api.groq.com/openai/v1/chat/completions", {');
writeFileSync('supabase/functions/process-material/index.ts', text);
console.log('patched index.ts');

let reprocess = readFileSync('scripts/reprocess.mjs', 'utf-8');
reprocess = reprocess.replace('  } catch (err) {\n    console.error(`✗ ${row.title} — ${err.message}`);\n  }\n}', '  } catch (err) {\n    console.error(`✗ ${row.title} — ${err.message}`);\n  }\n  await new Promise((r) => setTimeout(r, 8000));\n}');
writeFileSync('scripts/reprocess.mjs', reprocess);
console.log('patched reprocess.mjs');

let preprocess = readFileSync('scripts/preprocess-scans.mjs', 'utf-8');
preprocess = preprocess.replace('  } catch (err) {\n    console.error(`${prefix} ✗ ${row.title} — ${err.message}`);\n  }\n}', '  } catch (err) {\n    console.error(`${prefix} ✗ ${row.title} — ${err.message}`);\n  }\n  await new Promise((r) => setTimeout(r, 8000));\n}');
writeFileSync('scripts/preprocess-scans.mjs', preprocess);
console.log('patched preprocess-scans.mjs');
