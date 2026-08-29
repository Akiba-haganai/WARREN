import { useEffect, useRef, useState } from "react";
import { Flag, Upload } from "lucide-react";
import type { StudyMaterial } from "../services/study.service";
import { MaterialCard } from "./MaterialCard";
import { useAuthStore } from "../../../store/authStore";
import { reportMaterial } from "../../../services/reportService";
import { uploadNewVersion } from "../services/study.service";
import { supabase } from "../../../lib/supabase";
import { SolutionsList } from "./SolutionsList";

interface Props {
  material: StudyMaterial;
  saved: boolean;
  savedIds?: Set<string>;
  relatedMaterials?: StudyMaterial[];
  subjectColor: string;
  meta: { color: string; bg: string; border: string; icon: string; label: string };
  onToggleSave: (materialId: string, saved: boolean) => void;
  onOpen?: (material: StudyMaterial) => void;
  onClose: () => void;
}

export function MaterialDrawer({
  material,
  saved,
  savedIds,
  relatedMaterials,
  subjectColor,
  meta,
  onToggleSave,
  onOpen,
  onClose,
}: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const user = useAuthStore((s) => s.user);
  const versionInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleReport = async () => {
    if (!user) return;
    const reason = prompt("Reason for reporting this material?");
    if (!reason?.trim()) return;
    try {
      await reportMaterial(material.id, user.id, reason.trim());
      alert("Report submitted. Thank you.");
    } catch (e) {
      console.error(e);
      alert("Failed to submit report.");
    }
  };

  const handleUploadNewVersion = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    try {
      const filePath = `posts/${user.id}/versions/${Date.now()}_${file.name}`;
      const { error: uploadErr } = await supabase.storage
        .from("post-images")   // ✅ correct bucket
        .upload(filePath, file);
      if (uploadErr) throw uploadErr;
      const { data } = supabase.storage.from("post-images").getPublicUrl(filePath);
      await uploadNewVersion(material.id, data.publicUrl);
      alert("New version uploaded successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to upload new version.");
    } finally {
      setUploading(false);
      if (versionInputRef.current) versionInputRef.current.value = "";
    }
  };

  return (
    <>
      {/* Chrome/Safari/Edge scrollbar styles */}
      <style>{`
        .material-drawer-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .material-drawer-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .material-drawer-scroll::-webkit-scrollbar-thumb {
          background-color: #94a3b8;
          border-radius: 20px;
        }
      `}</style>

      <div onClick={onClose} className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40" />

      <div
        className="material-drawer-scroll fixed bottom-[70px] left-0 right-0 z-50 bg-white dark:bg-slate-900 rounded-t-[24px] max-h-[65vh] overflow-y-auto border-t border-slate-200 dark:border-slate-700/60 animate-slide-up"
        style={{

          scrollbarWidth: "thin",
          scrollbarColor: "#94a3b8 transparent",
        }}
      >
        <div className="w-9 h-1 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mt-3" />
        <div
          style={{ background: `${subjectColor}18`, borderBottom: `1px solid ${subjectColor}33` }}
          className="flex items-center justify-between px-4 py-3 mt-2"
        >
          <span
            style={{ background: meta.bg, color: meta.color }}
            className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full"
          >
            {meta.icon} {meta.label}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReport}
              className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500"
              aria-label="Report material"
            >
              <Flag size={15} />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm"
              aria-label="Close drawer"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="px-5 pt-4 pb-10">

          <h2 className="text-xl font-black text-slate-900 dark:text-white leading-snug mb-3">
            {material.title}
          </h2>

          {material.description && (
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {material.description}
            </p>
          )}

          {(material.file_url || material.external_url) && (
            <button
              onClick={() => {
                const url = material.file_url || material.external_url;
                if (url) window.open(url, "_blank", "noopener,noreferrer");
              }}
              className="w-full py-3.5 rounded-2xl text-sm font-bold border border-blue-200 bg-gradient-to-r from-blue-600 to-cyan-500 text-white transition-colors"
              aria-label="View document"
            >
              📄 View Document
            </button>
          )}

          <button
            onClick={() => onToggleSave(material.id, saved)}
            style={saved ? { borderColor: "#F59E0B", color: "#F59E0B" } : undefined}
            className="w-full py-3.5 rounded-2xl text-sm font-bold border transition-colors"
            aria-label={saved ? "Unsave material" : "Save material for later"}
          >
            {saved ? "🔖  Saved" : "🏷️  Save for later"}
          </button>

          {/* Upload New Version – visible only to original uploader */}
          {user?.id === material.uploaded_by && (
            <>
              <input
                ref={versionInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx,image/*"
                className="hidden"
                aria-label="Select new version file"
                onChange={handleUploadNewVersion}
              />
              <button
                onClick={() => versionInputRef.current?.click()}
                disabled={uploading}
                className="w-full py-3.5 mt-2 rounded-2xl text-sm font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Upload size={14} />
                {uploading ? "Uploading…" : "Upload New Version"}
              </button>
            </>
          )}

          {/* Solutions List */}
          <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800">
            <SolutionsList materialId={material.id} />
          </div>

          {/* Related Materials */}
          {relatedMaterials && relatedMaterials.length > 0 && (
            <div className="mt-5">
              <h3 className="text-sm font-bold mb-3">Related Materials</h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {relatedMaterials.map((m) => (
                  <div key={m.id} className="min-w-[200px] flex-shrink-0">
                    <MaterialCard
                      material={m}
                      saved={!!savedIds?.has(m.id)}
                      subjectColor={subjectColor}
                      onToggleSave={onToggleSave}
                      onOpen={(mat) => onOpen?.(mat)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}