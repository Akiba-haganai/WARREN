/**
 * Campus Community Seeder
 * ─────────────────────
 * Creates all school parent communities and their year-group sub-communities.
 *
 * Run with:
 *   node scripts/seed-cbu-communities.mjs
 *
 * Requires: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY in .env (or set SERVICE_ROLE_KEY for bypass)
 * NOTE: Must be run while logged-in as an admin user, or with a service-role key.
 */

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from project root
const envPath = join(__dirname, "../.env");
const envContent = readFileSync(envPath, "utf-8");
const envVars = Object.fromEntries(
  envContent.split("\n").filter(l => l.includes("=")).map(l => l.split("=").map(s => s.trim()))
);

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || envVars["VITE_SUPABASE_URL"];
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || envVars["VITE_SUPABASE_ANON_KEY"];
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌ Missing VITE_SUPABASE_URL or SUPABASE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── School Definitions ─────────────────────────────────────────────────────

const SCHOOLS = [
  {
    name: "School of Natural Resources",
    shortName: "SNR",
    description: "Agriculture, environmental science, forestry, and natural resource management.",
    icon: "🌿",
    cover_color: "from-emerald-600 via-teal-600 to-cyan-700",
    departments: ["Agriculture", "Forestry", "Environmental Science", "Wildlife Management"],
  },
  {
    name: "School of Engineering",
    shortName: "SOE",
    description: "Civil, mechanical, electrical, and chemical engineering programs.",
    icon: "⚙️",
    cover_color: "from-slate-600 via-blue-700 to-indigo-800",
    departments: ["Civil Engineering", "Mechanical Engineering", "Electrical Engineering", "Chemical Engineering"],
  },
  {
    name: "School of Business",
    shortName: "SOB",
    description: "Accounting, finance, marketing, management, and entrepreneurship.",
    icon: "💼",
    cover_color: "from-amber-500 via-orange-600 to-red-600",
    departments: ["Accounting", "Finance", "Marketing", "Management Studies", "Entrepreneurship"],
  },
  {
    name: "School of Humanities and Social Sciences",
    shortName: "SHSS",
    description: "Languages, literature, philosophy, sociology, and social sciences.",
    icon: "📖",
    cover_color: "from-violet-600 via-purple-600 to-pink-600",
    departments: ["English Literature", "Philosophy", "Sociology", "History", "Media Studies"],
  },
  {
    name: "School of Law",
    shortName: "SOL",
    description: "Legal studies, criminal law, commercial law, and jurisprudence.",
    icon: "⚖️",
    cover_color: "from-blue-800 via-indigo-700 to-violet-700",
    departments: ["Criminal Law", "Commercial Law", "Constitutional Law", "International Law"],
  },
  {
    name: "School of Mines and Natural Sciences",
    shortName: "SMNS",
    description: "Mining engineering, geology, chemistry, mathematics, and physics.",
    icon: "⛏️",
    cover_color: "from-stone-600 via-amber-700 to-yellow-700",
    departments: ["Mining Engineering", "Geology", "Chemistry", "Mathematics", "Physics"],
  },
  {
    name: "School of Medicine",
    shortName: "SOM",
    description: "Medicine, nursing, public health, and biomedical sciences.",
    icon: "🏥",
    cover_color: "from-red-600 via-rose-600 to-pink-600",
    departments: ["Medicine & Surgery", "Nursing", "Public Health", "Biomedical Sciences", "Pharmacy"],
  },
  {
    name: "School of ICT",
    shortName: "SICT",
    description: "Computer science, information systems, software engineering, and cybersecurity.",
    icon: "💻",
    cover_color: "from-blue-600 via-cyan-600 to-teal-500",
    departments: ["Computer Science", "Information Systems", "Software Engineering", "Cybersecurity", "Data Science"],
  },
];

const YEARS = ["Year 1", "Year 2", "Year 3", "Year 4", "Postgrad"];

// Year-group colors
const YEAR_COLORS = {
  "Year 1": "from-emerald-500 via-teal-500 to-cyan-600",
  "Year 2": "from-blue-500 via-indigo-500 to-violet-600",
  "Year 3": "from-violet-600 via-purple-600 to-fuchsia-600",
  "Year 4": "from-amber-500 via-orange-500 to-red-600",
  "Postgrad": "from-slate-600 via-slate-700 to-gray-800",
};

// ─── Helpers ────────────────────────────────────────────────────────────────────

async function createCommunity(payload, userId) {
  const { data, error } = await supabase
    .from("communities")
    .insert({ ...payload, created_by: userId })
    .select()
    .single();

  if (error) {
    // Gracefully handle duplicate name errors – just skip
    if (error.code === "23505") {
      console.log(`  ⚠️  Already exists: "${payload.name}" — skipping.`);
      const { data: existing } = await supabase
        .from("communities")
        .select()
        .eq("name", payload.name)
        .single();
      return existing;
    }
    throw error;
  }

  return data;
}

async function autoJoin(communityId, userId) {
  await supabase
    .from("community_members")
    .upsert({ community_id: communityId, user_id: userId }, { onConflict: "community_id,user_id" });
}

// ─── Main Seeder ────────────────────────────────────────────────────────────────

async function seed() {
  console.log("🎓 Campus Community Seeder Starting...\n");

  // Auth
  let userId;
  if (ADMIN_EMAIL && ADMIN_PASSWORD) {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });
    if (authError) throw authError;
    userId = authData.user.id;
    console.log(`✅ Signed in as ${ADMIN_EMAIL} (${userId})\n`);
  } else {
    const { data } = await supabase.auth.getUser();
    userId = data?.user?.id;
    if (!userId) {
      console.error("❌ Not authenticated. Pass ADMIN_EMAIL + ADMIN_PASSWORD env vars.");
      process.exit(1);
    }
    console.log(`✅ Using existing session: ${userId}\n`);
  }

  let schoolsCreated = 0;
  let subCommunitiesCreated = 0;

  for (const school of SCHOOLS) {
    console.log(`\n🏫 Creating: ${school.name} (${school.shortName})`);

    // 1. Create the parent school community (type: educational, no parent_id)
    const parent = await createCommunity(
      {
        name: school.name,
        description: school.description,
        icon: school.icon,
        cover_color: school.cover_color,
        type: "educational",
        parent_id: null,
        year: null,
        archived: false,
      },
      userId
    );

    await autoJoin(parent.id, userId);
    schoolsCreated++;
    console.log(`  ✅ Parent school created: ${parent.name} [${parent.id}]`);

    // 2. Create year-group sub-communities
    for (const year of YEARS) {
      const sub = await createCommunity(
        {
          name: `${school.shortName} – ${year}`,
          description: `${year} students of the ${school.name}. Share notes, ask questions, and collaborate.`,
          icon: school.icon,
          cover_color: YEAR_COLORS[year],
          type: "educational",
          parent_id: parent.id,
          year: year,
          archived: false,
        },
        userId
      );

      await autoJoin(sub.id, userId);
      subCommunitiesCreated++;
      console.log(`     ↳ ${year}: ${sub.name} [${sub.id}]`);
    }

    // 3. Create department-level sub-communities
    for (const dept of school.departments) {
      const sub = await createCommunity(
        {
          name: `${dept} – ${school.shortName}`,
          description: `${dept} students and staff of the ${school.name}.`,
          icon: school.icon,
          cover_color: school.cover_color,
          type: "educational",
          parent_id: parent.id,
          year: null,
          archived: false,
        },
        userId
      );

      await autoJoin(sub.id, userId);
      subCommunitiesCreated++;
      console.log(`     ↳ Dept: ${dept}`);
    }
  }

  // 4. General social community
  console.log("\n🏠 Creating General Communities...");
  const general = await createCommunity(
    {
      name: "Campus General",
      description: "The main campus-wide community for all university students. Campus news, events, and general chat.",
      icon: "🎓",
      cover_color: "from-indigo-700 via-blue-700 to-cyan-600",
      type: "social",
      parent_id: null,
      year: null,
      archived: false,
    },
    userId
  );
  await autoJoin(general.id, userId);
  console.log(`  ✅ Created: ${general.name} [${general.id}]`);

  const offTopic = await createCommunity(
    {
      name: "Campus Off-Topic & Fun",
      description: "Memes, fun, campus life, hostel talk, and everything non-academic for students.",
      icon: "🎉",
      cover_color: "from-rose-500 via-purple-600 to-indigo-700",
      type: "social",
      parent_id: null,
      year: null,
      archived: false,
    },
    userId
  );
  await autoJoin(offTopic.id, userId);
  console.log(`  ✅ Created: ${offTopic.name} [${offTopic.id}]`);

  console.log("\n─────────────────────────────────────────────────────");
  console.log(`✅ Done! Created ${schoolsCreated} schools + ${subCommunitiesCreated} sub-communities`);
  console.log("─────────────────────────────────────────────────────\n");
}

seed().catch((err) => {
  console.error("\n❌ Seeder failed:", err.message);
  process.exit(1);
});
