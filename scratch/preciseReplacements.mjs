import fs from "fs";

function replaceInFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, "utf8");
  for (const [find, rep] of replacements) {
    content = content.replaceAll(find, rep);
  }
  fs.writeFileSync(filePath, content, "utf8");
}

// 1. MobileNavbar.tsx
replaceInFile("src/components/layout/MobileNavbar.tsx", [
  ['>Wave<', '>515<']
]);

// 2. InstallBanner.tsx
replaceInFile("src/components/pwa/InstallBanner.tsx", [
  ['Install Wave', 'Install 515'],
  ['Add Wave to your home screen', 'Add 515 to your home screen']
]);

// 3. UpdatePrompt.tsx
replaceInFile("src/components/pwa/UpdatePrompt.tsx", [
  ['[Wave PWA]', '[515 PWA]']
]);

// 4. main.tsx
replaceInFile("src/main.tsx", [
  ['wave-chunk-error-strikes', '515-chunk-error-strikes'],
  ['[Wave]', '[515]']
]);

// 5. LoginPage.tsx
replaceInFile("src/pages/auth/LoginPage.tsx", [
  ['>Wave</h1>', '>515</h1>'],
  ['Wave', '515']
]);

// 6. RegisterPage.tsx
replaceInFile("src/pages/auth/RegisterPage.tsx", [
  ['Join Wave', 'Join 515'],
  ['Wave', '515']
]);

// 7. AboutPage.tsx
replaceInFile("src/pages/legal/AboutPage.tsx", [
  ['About Wave', 'About 515'],
  ['Wave is a student‑only social network designed to help freshers connect,', '515 is designed to help students: Find the paper. Understand it. Plan the cram.'],
  ['Wave brings together communities, study materials, campus maps,', '515 brings together past papers, revision notes, and cram planning,'],
  ['Wave has you covered.', '515 has you covered.'],
  ['Wave is developed', '515 is developed'],
  ['Wave is an independent', '515 is an independent'],
  ['Wave', '515']
]);

// 8. ContactPage.tsx
replaceInFile("src/pages/legal/ContactPage.tsx", [
  ['support@warren.app', 'support@515.app'],
  ['Warren', '515'],
  ['Wave', '515']
]);

// 9. PrivacyPage.tsx
replaceInFile("src/pages/legal/PrivacyPage.tsx", [
  ['support@warren.app', 'support@515.app'],
  ['Wave', '515']
]);

// 10. TermsPage.tsx
replaceInFile("src/pages/legal/TermsPage.tsx", [
  ['support@warren.app', 'support@515.app'],
  ['Wave', '515']
]);

// 11. index.html
replaceInFile("index.html", [
  ['wave-sw-hard-reset', '515-sw-hard-reset'],
  ['https://wave-515.vercel.app', 'https://515.vercel.app']
]);

// 12. CramPlanView.tsx & robots.txt & cram.ts
replaceInFile("src/features/cram/components/CramPlanView.tsx", [
  ['https://wave-515.vercel.app', 'https://515.vercel.app']
]);
replaceInFile("api/public/cram.ts", [
  ['https://wave-515.vercel.app', 'https://515.vercel.app']
]);
replaceInFile("public/robots.txt", [
  ['https://wave-515.vercel.app', 'https://515.vercel.app']
]);

console.log("Completed manual replacements.");
