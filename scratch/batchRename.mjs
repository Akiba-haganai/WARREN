import fs from "fs";
import path from "path";

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== "node_modules" && file !== ".git" && file !== "dist") {
        results = results.concat(walk(fullPath));
      }
    } else {
      if (/\.(tsx?|json)$/.test(file)) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const files = walk("src");
files.push("index.html");
files.push("README.md");

const replacements = [
  [/Warren Connect/g, "515"],
  [/WARREN/g, "515"],
  [/Warren/g, "515"],
  [/Wave —/g, "515 —"],
  [/Wave \|/g, "515 |"],
  [/Wave"/g, '515"'],
  [/"Wave"/g, '"515"']
];

for (const f of files) {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, "utf8");
    let changed = false;
    for (const [pattern, rep] of replacements) {
      if (pattern.test(content)) {
        content = content.replace(pattern, rep);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(f, content, "utf8");
      console.log("Updated", f);
    }
  }
}
console.log("Done batch replacement.");
