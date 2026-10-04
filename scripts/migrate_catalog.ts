import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing Supabase credentials in environment variables.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function migrate() {
  console.log("🚀 Starting Library Reference Model Migration...");

  try {
    // 1. Ensure a default University (CBU)
    console.log("Creating default University...");
    const { data: uni, error: uniError } = await supabase
      .from("universities")
      .upsert({ code: "CBU", name: "Copperbelt University", country: "ZM" }, { onConflict: "id" })
      .select()
      .single();
    if (uniError) throw uniError;
    const uniId = uni.id;

    // 2. Ensure default Campus
    console.log("Creating default Campus...");
    const { data: campus, error: campusError } = await supabase
      .from("campuses")
      .upsert({ university_id: uniId, code: "CBU-MAIN", name: "Main Campus" }, { onConflict: "id" })
      .select()
      .single();
    if (campusError) throw campusError;

    // 3. Setup default Schools / Faculties based on distinct programmes in study_materials
    // For simplicity, we'll map them or create a default "General School" and "General Dept"
    console.log("Setting up default School and Department...");
    const { data: school, error: schoolErr } = await supabase
      .from("schools")
      .upsert({ university_id: uniId, code: "GEN", name: "General Faculty" }, { onConflict: "id" })
      .select()
      .single();
    if (schoolErr) throw schoolErr;

    const { data: dept, error: deptErr } = await supabase
      .from("departments")
      .upsert({ school_id: school.id, code: "GEN-DEPT", name: "General Department" }, { onConflict: "id" })
      .select()
      .single();
    if (deptErr) throw deptErr;

    // 4. Fetch all existing materials
    console.log("Fetching legacy study_materials...");
    const { data: legacyMaterials, error: legacyErr } = await supabase
      .from("study_materials")
      .select("*");
    
    if (legacyErr) throw legacyErr;

    console.log(`Found ${legacyMaterials.length} legacy materials. Processing...`);

    let successCount = 0;

    for (const item of legacyMaterials) {
      try {
        // A. Setup Programme & Curriculum Version
        const progCode = item.programme ? item.programme.substring(0, 10).toUpperCase() : "GENERAL";
        const { data: prog } = await supabase
          .from("programmes")
          .upsert({ department_id: dept.id, code: progCode, name: item.programme || "General Programme", award_type: "BSc" }, { onConflict: "id" })
          .select()
          .single();

        const cvVersion = item.academic_year || "2024/2025";
        const { data: cv } = await supabase
          .from("curriculum_versions")
          .upsert({
             programme_id: prog.id,
             version: cvVersion,
             academic_year_start: parseInt(cvVersion.split("/")[0]) || 2024,
             academic_year_end: parseInt(cvVersion.split("/")[1]) || 2025,
          }, { onConflict: "id" })
          .select()
          .single();

        // B. Setup Course
        const cCode = item.course_code || item.subject.substring(0, 8).toUpperCase().replace(/\s/g, "");
        const { data: course } = await supabase
          .from("courses")
          .upsert({ course_code: cCode, name: item.subject }, { onConflict: "course_code" })
          .select()
          .single();

        // C. Link Course to Curriculum
        await supabase
          .from("curriculum_courses")
          .upsert({
            curriculum_version_id: cv.id,
            course_id: course.id,
            year_of_study: parseInt(item.year_group?.replace(/\D/g, '')) || 1,
            semester: 1
          }, { onConflict: "curriculum_version_id,course_id" });

        // D. Create Material
        const { data: material } = await supabase
          .from("materials")
          .upsert({
            id: item.id, // KEEP the same UUID so old links don't break!
            title: item.title,
            description: item.description,
            material_type: item.material_type || "notes",
            thumbnail_url: item.thumbnail_url,
            file_url: item.file_url,
            uploaded_by: item.uploaded_by,
            status: item.is_hidden ? "archived" : "published",
            created_at: item.created_at
          }, { onConflict: "id" })
          .select()
          .single();

        // E. Create Course-Material Link
        await supabase
          .from("course_materials")
          .upsert({
            course_id: course.id,
            material_id: material.id,
            curriculum_version_id: cv.id,
            relationship_type: item.material_type === "Past Paper" ? "past_paper" : "recommended"
          }, { onConflict: "course_id,material_id,curriculum_version_id" });

        // F. Add Past Paper Metadata if applicable
        if (item.material_type === "Past Paper" && item.paper_type) {
          await supabase
            .from("past_paper_metadata")
            .upsert({
              material_id: material.id,
              exam_period: item.paper_type,
              academic_year: item.academic_year || "Unknown"
            }, { onConflict: "material_id" });
        }

        successCount++;
        if (successCount % 10 === 0) {
          console.log(`...processed ${successCount}/${legacyMaterials.length}`);
        }

      } catch (err) {
        console.error(`Failed processing item ${item.id}:`, err);
      }
    }

    console.log(`✅ Migration complete! Successfully ported ${successCount} items to the Library Reference Model.`);
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

migrate();
