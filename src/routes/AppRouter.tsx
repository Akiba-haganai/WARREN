import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ── Auth ──────────────────────────────────────────────────────────────────────
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ResetPasswordPage from "../passwordManagement/ResetPasswordPage";
import UpdatePasswordPage from "../passwordManagement/UpdatePasswordPage";

// ── Main ──────────────────────────────────────────────────────────────────────
import HomePage from "../pages/home/HomePage";
import SearchPage from "../pages/search/SearchPage";
import AnnouncementsPage from "../pages/announcements/AnnouncementsPage";
import CommunityPage from "../pages/community/CommunityPage";
import CampusMapPage from "../pages/map/Map";
import StudyPage from "../pages/study/StudyPage";

// ── Profile ───────────────────────────────────────────────────────────────────
import ProfilePage from "../pages/profile/ProfilePage";
import EditProfile from "../pages/profile/EditProfile";
import SavedPostsPage from "../pages/profile/SavedPostsPage";

// ── Moderator ─────────────────────────────────────────────────────────────────
import ModeratorDashboardPage from "../pages/moderation/ModeratorDashboardPage";
import ModerationPage from "../pages/moderation/ModerationPage";

// ── Admin ─────────────────────────────────────────────────────────────────────
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import ReportsPage from "../pages/admin/ReportsPage";
import CreateAnnouncementPage from "../pages/admin/CreateAnnouncementPage";
import ManageAnnouncementsPage from "../pages/admin/ManageAnnouncementsPage";
import UploadMaterialPage from "../pages/admin/UploadMaterialPage";
// ── NEW: Community management
import CreateCommunityPage from "../pages/admin/CreateCommunityPage";
import ManageCommunitiesPage from "../pages/admin/ManageCommunitiesPage";

// ── Guards ────────────────────────────────────────────────────────────────────
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Wrap a page in <ProtectedRoute> */
function Protected({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

/** Wrap a page in <ProtectedRoute> + <RoleRoute> */
function RoleProtected({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <RoleRoute allowedRoles={allowedRoles}>{children}</RoleRoute>
    </ProtectedRoute>
  );
}

const MOD_ROLES = ["moderator", "admin"] as const;
const ADMIN_ROLES = ["admin"] as const;

// ─── Router ───────────────────────────────────────────────────────────────────

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Public ──────────────────────────────────────────────────────── */}
        <Route path="/login"           element={<LoginPage />} />
        <Route path="/register"        element={<RegisterPage />} />
        <Route path="/reset-password"  element={<ResetPasswordPage />} />
        <Route path="/update-password" element={<UpdatePasswordPage />} />

        {/* ── Main ────────────────────────────────────────────────────────── */}
        <Route path="/"             element={<Protected><HomePage /></Protected>} />
        <Route path="/search"       element={<Protected><SearchPage /></Protected>} />
        <Route path="/announcements"element={<Protected><AnnouncementsPage /></Protected>} />
        <Route path="/community"    element={<Protected><CommunityPage /></Protected>} />
        <Route path="/campus-map"   element={<Protected><CampusMapPage /></Protected>} />
        <Route path="/study"        element={<Protected><StudyPage /></Protected>} />

        {/* ── Profile ─────────────────────────────────────────────────────── */}
        <Route path="/profile"       element={<Protected><ProfilePage /></Protected>} />
        <Route path="/profile/edit"  element={<Protected><EditProfile /></Protected>} />
        <Route path="/profile/saved" element={<Protected><SavedPostsPage /></Protected>} />

        {/* ── Moderator ───────────────────────────────────────────────────── */}
        <Route path="/moderator"  element={<RoleProtected allowedRoles={[...MOD_ROLES]}><ModeratorDashboardPage /></RoleProtected>} />
        <Route path="/moderation" element={<RoleProtected allowedRoles={[...MOD_ROLES]}><ModerationPage /></RoleProtected>} />

        {/* ── Admin ───────────────────────────────────────────────────────── */}
        <Route path="/admin"                    element={<RoleProtected allowedRoles={[...ADMIN_ROLES]}><AdminDashboardPage /></RoleProtected>} />
        <Route path="/admin/reports"            element={<RoleProtected allowedRoles={[...ADMIN_ROLES]}><ReportsPage /></RoleProtected>} />
        <Route path="/admin/announcements"      element={<RoleProtected allowedRoles={[...ADMIN_ROLES]}><ManageAnnouncementsPage /></RoleProtected>} />
        <Route path="/admin/announcements/new"  element={<RoleProtected allowedRoles={[...ADMIN_ROLES]}><CreateAnnouncementPage /></RoleProtected>} />
        <Route path="/admin/upload-material"    element={<RoleProtected allowedRoles={[...MOD_ROLES]}><UploadMaterialPage /></RoleProtected>} />

        {/* ── Admin: Community Management ──────────────────────────────────── */}
        <Route path="/admin/communities"         element={<RoleProtected allowedRoles={[...ADMIN_ROLES]}><ManageCommunitiesPage /></RoleProtected>} />
        <Route path="/admin/communities/new"     element={<RoleProtected allowedRoles={[...ADMIN_ROLES]}><CreateCommunityPage /></RoleProtected>} />
        <Route path="/admin/communities/edit/:id" element={<RoleProtected allowedRoles={[...ADMIN_ROLES]}><CreateCommunityPage /></RoleProtected>} />

        {/* ── Fallback ────────────────────────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}