import fs from "fs";
import path from "path";

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== "node_modules" && file !== ".git" && file !== "dist") {
        results = results.concat(walk(fullPath));
      }
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

const targets = [...walk("src"), ...walk("public"), "index.html"];
const matches = [];

for (const f of targets) {
  try {
    const text = fs.readFileSync(f, "utf8");
    const lines = text.split("\n");
    lines.forEach((line, idx) => {
      if (/\b(Wave|Warren)\b/i.test(line)) {
        // filter out things like waveform, layout, or benign variable names if any
        if (/Wave|Warren/i.test(line)) {
          matches.push({ file: f, line: idx + 1, text: line.trim() });
        }
      }
    });
  } catch (e) {}
}

console.log("Total matches:", matches.length);
matches.slice(0, 50).forEach(m => console.log(`${m.file}:${m.line}: ${m.text}`));
