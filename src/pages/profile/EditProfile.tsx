import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuthStore } from "../../store/authStore";
import AppShell from "../../components/layout/AppShell";
import { useToastStore } from "../../store/toastStore";

export default function EditProfile() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const { showToast } = useToastStore();

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    loadProfile();
  }, [user]);

  async function loadProfile() {
    if (!user) return;
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    if (!data) return;
    setUsername(data.username ?? "");
    setBio(data.bio ?? "");
    setAvatarPreview(data.avatar_url ?? "");
  }

  async function uploadAvatar() {
    if (!avatarFile || !user) return null;
    const fileExt = avatarFile.name.split(".").pop();
    const filePath = `${user.id}.${fileExt}`;
    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatarFile, { cacheControl: "3600", upsert: true });
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);
    return publicUrl;
  }

  async function handleSave() {
    if (!user) return;
    try {
      setLoading(true);
      let avatar_url = avatarPreview;
      if (avatarFile) {
        avatar_url = (await uploadAvatar()) ?? avatarPreview;
      }
      const { error } = await supabase
        .from("profiles")
        .update({ username, bio, avatar_url })
        .eq("id", user.id);
      if (error) throw error;
      navigate("/profile");
    } catch (err) {
      console.error(err);
      showToast("Failed to update profile", "err");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <div className="max-w-lg mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold">Edit Profile</h1>

        <div className="flex justify-center">
          <div className="relative">
            <img
              src={avatarPreview || "https://placehold.co/200x200"}
              alt="Avatar preview"
              className="w-28 h-28 rounded-full object-cover border"
            />
            <input
              type="file"
              accept="image/*"
              className="mt-3"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setAvatarFile(file);
                setAvatarPreview(URL.createObjectURL(file));
              }}
            />
          </div>
        </div>

        <div>
          <label className="block mb-2">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-xl border p-3 bg-transparent"
          />
        </div>

        <div>
          <label className="block mb-2">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full rounded-xl border p-3 bg-transparent"
          />
        </div>

        <button
          disabled={loading}
          onClick={handleSave}
          className="w-full bg-blue-600 text-white rounded-xl py-3"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </AppShell>
  );
}