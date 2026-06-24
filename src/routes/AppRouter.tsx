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
import CommunityChatPage from "../pages/community/CommunityChatPage";
import CampusMapPage from "../pages/map/Map";
import StudyPage from "../pages/study/StudyPage";
import NotificationsPage from "../pages/notifications/NotificationsPage";
import EventsPage from "../pages/events/EventsPage";

// ── Ask a Senior ─────────────────────────────────────────────────────────────
import AskSeniorPage from "../pages/QandA/AskSeniorPage";
import QuestionDetailPage from "../pages/QandA/QuestionDetailPage";

// ── Live Rooms ───────────────────────────────────────────────────────────────
import { LiveRoomsList, LiveRoomChat } from "../pages/rooms/LiveRoomsPage";

// ── Messages ──────────────────────────────────────────────────────────────────
import MessagesPage from "../pages/messages/MessagesPage";
import ConversationPage from "../pages/messages/ConversationPage";

// ── Profile ───────────────────────────────────────────────────────────────────
import ProfilePage from "../pages/profile/ProfilePage";
import EditProfile from "../pages/profile/EditProfile";
import SavedPostsPage from "../pages/profile/SavedPostsPage";

// ── Profile sub‑pages ────────────────────────────────────────────────────────
import AchievementsPage from "../pages/profile/AchievementsPage";
import PrivacySecurityPage from "../pages/profile/PrivacySecurityPage";
import MyDiscussionsPage from "../pages/profile/MyDiscussionsPage";
import CampusGroupsPage from "../pages/profile/CampusGroupsPage";

// ── Settings & Blocked Users ─────────────────────────────────────────────────
import SettingsPage from "../pages/profile/SettingsPage";
import BlockedUsersPage from "../pages/profile/BlockedUSersPage";

// ── Moderator ─────────────────────────────────────────────────────────────────
import ModeratorDashboardPage from "../pages/moderation/ModeratorDashboardPage";
import ModerationPage from "../pages/moderation/ModerationPage";

// ── Admin ─────────────────────────────────────────────────────────────────────
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import ReportsPage from "../pages/admin/ReportsPage";
import CreateAnnouncementPage from "../pages/admin/CreateAnnouncementPage";
import ManageAnnouncementsPage from "../pages/admin/ManageAnnouncementsPage";
import UploadMaterialPage from "../pages/admin/UploadMaterialPage";
import CreateCommunityPage from "../pages/admin/CreateCommunityPage";
import ManageCommunitiesPage from "../pages/admin/ManageCommunitiesPage";
import GlobalNotificationsPage from "../pages/admin/GlobalNotificationsPage";
// ── Events
import CreateEventPage from "../pages/admin/CreateEventPage";
import ManageEventsPage from "../pages/admin/ManageEventsPage";

// ── Guards ────────────────────────────────────────────────────────────────────
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Protected({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

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
        <Route path="/community/:id/chat" element={<Protected><CommunityChatPage /></Protected>} />
        <Route path="/campus-map"   element={<Protected><CampusMapPage /></Protected>} />
        <Route path="/study"        element={<Protected><StudyPage /></Protected>} />
        <Route path="/notifications" element={<Protected><NotificationsPage /></Protected>} />
        <Route path="/events"       element={<Protected><EventsPage /></Protected>} />

        {/* ── Messages ────────────────────────────────────────────────────── */}
        <Route path="/messages"              element={<Protected><MessagesPage /></Protected>} />
        <Route path="/messages/:partnerId"   element={<Protected><ConversationPage /></Protected>} />

        {/* ── Ask a Senior ────────────────────────────────────────────────── */}
        <Route path="/ask-senior"       element={<Protected><AskSeniorPage /></Protected>} />
        <Route path="/ask-senior/:id"   element={<Protected><QuestionDetailPage /></Protected>} />

        {/* ── Live Rooms ──────────────────────────────────────────────────── */}
        <Route path="/live"            element={<Protected><LiveRoomsList /></Protected>} />
        <Route path="/live/:id"        element={<Protected><LiveRoomChat /></Protected>} />

        {/* ── Settings ────────────────────────────────────────────────────── */}
        <Route path="/settings" element={<Protected><SettingsPage /></Protected>} />
        <Route path="/profile/blocked" element={<Protected><BlockedUsersPage /></Protected>} />

        {/* ── Profile ─────────────────────────────────────────────────────── */}
        <Route path="/profile"         element={<Protected><ProfilePage /></Protected>} />
        <Route path="/profile/:userId" element={<Protected><ProfilePage /></Protected>} />
        <Route path="/profile/edit"    element={<Protected><EditProfile /></Protected>} />
        <Route path="/profile/saved"   element={<Protected><SavedPostsPage /></Protected>} />

        {/* ── Profile sub‑pages (own) ──────────────────────────────────────── */}
        <Route path="/profile/achievements"  element={<Protected><AchievementsPage /></Protected>} />
        <Route path="/profile/privacy"       element={<Protected><PrivacySecurityPage /></Protected>} />
        <Route path="/profile/discussions"   element={<Protected><MyDiscussionsPage /></Protected>} />
        <Route path="/profile/groups"        element={<Protected><CampusGroupsPage /></Protected>} />

        {/* ── Profile sub‑pages (viewing another user) ─────────────────────── */}
        <Route path="/profile/:userId/achievements" element={<Protected><AchievementsPage /></Protected>} />
        <Route path="/profile/:userId/privacy"      element={<Protected><PrivacySecurityPage /></Protected>} />
        <Route path="/profile/:userId/discussions"  element={<Protected><MyDiscussionsPage /></Protected>} />
        <Route path="/profile/:userId/groups"       element={<Protected><CampusGroupsPage /></Protected>} />

        {/* ── Moderator ───────────────────────────────────────────────────── */}
        <Route path="/moderator"  element={<RoleProtected allowedRoles={[...MOD_ROLES]}><ModeratorDashboardPage /></RoleProtected>} />
        <Route path="/moderation" element={<RoleProtected allowedRoles={[...MOD_ROLES]}><ModerationPage /></RoleProtected>} />

        {/* ── Admin ───────────────────────────────────────────────────────── */}
        <Route path="/admin"                    element={<RoleProtected allowedRoles={[...ADMIN_ROLES]}><AdminDashboardPage /></RoleProtected>} />
        <Route path="/admin/reports"            element={<RoleProtected allowedRoles={[...MOD_ROLES]}><ReportsPage /></RoleProtected>} />
        <Route path="/admin/announcements"      element={<RoleProtected allowedRoles={[...ADMIN_ROLES]}><ManageAnnouncementsPage /></RoleProtected>} />
        <Route path="/admin/announcements/new"  element={<RoleProtected allowedRoles={[...ADMIN_ROLES]}><CreateAnnouncementPage /></RoleProtected>} />
        <Route path="/admin/upload-material"    element={<RoleProtected allowedRoles={[...MOD_ROLES]}><UploadMaterialPage /></RoleProtected>} />

        {/* ── Admin: Community Management ──────────────────────────────────── */}
        <Route path="/admin/communities"         element={<RoleProtected allowedRoles={[...ADMIN_ROLES]}><ManageCommunitiesPage /></RoleProtected>} />
        <Route path="/admin/communities/new"     element={<RoleProtected allowedRoles={[...MOD_ROLES]}><CreateCommunityPage /></RoleProtected>} />
        <Route path="/admin/communities/edit/:id" element={<RoleProtected allowedRoles={[...ADMIN_ROLES]}><CreateCommunityPage /></RoleProtected>} />

        {/* ── Admin: Global Notifications ──────────────────────────────────── */}
        <Route path="/admin/global-notifications" element={<RoleProtected allowedRoles={[...ADMIN_ROLES]}><GlobalNotificationsPage /></RoleProtected>} />

        {/* ── Admin: Events ────────────────────────────────────────────────── */}
        <Route path="/admin/events"         element={<RoleProtected allowedRoles={[...MOD_ROLES]}><ManageEventsPage /></RoleProtected>} />
        <Route path="/admin/events/new"     element={<RoleProtected allowedRoles={[...MOD_ROLES]}><CreateEventPage /></RoleProtected>} />
        <Route path="/admin/events/edit/:id" element={<RoleProtected allowedRoles={[...MOD_ROLES]}><CreateEventPage /></RoleProtected>} />

        {/* ── Fallback ────────────────────────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
