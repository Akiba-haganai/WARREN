import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { PageLoader } from "../components/common/PageLoader";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import { useAuthStore } from "../store/authStore";

// Eagerly loaded landing page (critical path - avoids route waterfall)
import HomePage from "../pages/home/HomePage";

// Lazy loaded legal pages
const AboutPage = lazy(() => import("../pages/legal/AboutPage"));
const ContactPage = lazy(() => import("../pages/legal/ContactPage"));
const PrivacyPage = lazy(() => import("../pages/legal/PrivacyPage"));
const TermsPage = lazy(() => import("../pages/legal/TermsPage"));

// Lazy loaded auth pages
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("../pages/auth/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("../passwordManagement/ResetPasswordPage"));
const UpdatePasswordPage = lazy(() => import("../passwordManagement/UpdatePasswordPage"));

// Lazy loaded main pages
const ManageMaterialRequests = lazy(() => import("../pages/admin/ManageMaterialRequests"));
const SubjectPage = lazy(() => import("../pages/study/SubjectPage"));
const SearchPage = lazy(() => import("../pages/search/SearchPage"));
const AnnouncementsPage = lazy(() => import("../pages/announcements/AnnouncementsPage"));
const CommunityPage = lazy(() => import("../pages/community/CommunityPage"));
const CommunityChatPage = lazy(() => import("../pages/community/CommunityChatPage"));
const JoinCommunity = lazy(() => import("../features/communities/components/JoinCommunity"));

const CampusMapPage = lazy(() => import("../pages/map/CampusMapPage"));
const StudyPage = lazy(() => import("../pages/study/StudyPage"));
const NotificationsPage = lazy(() => import("../pages/notifications/NotificationsPage"));
const EventsPage = lazy(() => import("../pages/events/EventsPage"));
const MessagesPage = lazy(() => import("../pages/messages/MessagesPage"));
const ConversationPage = lazy(() => import("../pages/messages/ConversationPage"));
const AskSeniorPage = lazy(() => import("../pages/QandA/AskSeniorPage"));
const QuestionDetailPage = lazy(() => import("../pages/QandA/QuestionDetailPage"));
const LiveRoomsList = lazy(() => import("../pages/rooms/LiveRoomsPage").then(m => ({ default: m.LiveRoomsList })));
const LiveRoomChat = lazy(() => import("../pages/rooms/LiveRoomsPage").then(m => ({ default: m.LiveRoomChat })));
const StudyRoom = lazy(() => import("../features/rooms/components/StudyRoom"));
const AMAsPage = lazy(() => import("../pages/community/AMAsPage"));
const AMASessionPage = lazy(() => import("../pages/community/AMASessionPage"));

const ProfilePage = lazy(() => import("../pages/profile/ProfilePage"));
const EditProfile = lazy(() => import("../pages/profile/EditProfile"));
const SavedPostsPage = lazy(() => import("../pages/profile/SavedPostsPage"));
const AchievementsPage = lazy(() => import("../pages/profile/AchievementsPage"));
const PrivacySecurityPage = lazy(() => import("../pages/profile/PrivacySecurityPage"));
const MyDiscussionsPage = lazy(() => import("../pages/profile/MyDiscussionsPage"));
const CampusGroupsPage = lazy(() => import("../pages/profile/CampusGroupsPage"));
const SettingsPage = lazy(() => import("../pages/profile/SettingsPage"));
const BlockedUsersPage = lazy(() => import("../pages/profile/BlockedUSersPage"));
const ModeratorDashboardPage = lazy(() => import("../pages/moderation/ModeratorDashboardPage"));
const ModerationPage = lazy(() => import("../pages/moderation/ModerationPage"));
const AdminDashboardPage = lazy(() => import("../pages/admin/AdminDashboardPage"));
const ReportsPage = lazy(() => import("../pages/admin/ReportsPage"));
const CreateAnnouncementPage = lazy(() => import("../pages/admin/CreateAnnouncementPage"));
const ManageAnnouncementsPage = lazy(() => import("../pages/admin/ManageAnnouncementsPage"));
const UploadMaterialPage = lazy(() => import("../pages/admin/UploadMaterialPage"));
const CreateCommunityPage = lazy(() => import("../pages/admin/CreateCommunityPage"));
const ManageCommunitiesPage = lazy(() => import("../pages/admin/ManageCommunitiesPage"));
const GlobalNotificationsPage = lazy(() => import("../pages/admin/GlobalNotificationsPage"));
const CreateEventPage = lazy(() => import("../pages/admin/CreateEventPage"));
const ManageEventsPage = lazy(() => import("../pages/admin/ManageEventsPage"));
const CreateAMAPage = lazy(() => import("../pages/admin/CreateAMAPage"));

// Helper components
function Protected({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

function RoleProtected({ allowedRoles, children }: { allowedRoles: string[]; children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <RoleRoute allowedRoles={allowedRoles}>{children}</RoleRoute>
    </ProtectedRoute>
  );
}

const MOD_ROLES = ["moderator", "admin"];
const ADMIN_ROLES = ["admin"];

export default function AppRouter() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  // Save the current path on every navigation
  useEffect(() => {
    localStorage.setItem("lastPath", location.pathname);
  }, [location]);

  // On first authenticated mount, restore the last visited page
  useEffect(() => {
    if (user) {
      const lastPath = localStorage.getItem("lastPath");
      if (lastPath && lastPath !== "/login" && lastPath !== "/register") {
        navigate(lastPath, { replace: true });
      }
    }
  }, [user]); // run only when user changes from null to object

  return (
    <Routes>
      {/* Legal */}
      <Route path="/about" element={<Suspense fallback={<PageLoader />}><AboutPage /></Suspense>} />
      <Route path="/contact" element={<Suspense fallback={<PageLoader />}><ContactPage /></Suspense>} />
      <Route path="/privacy" element={<Suspense fallback={<PageLoader />}><PrivacyPage /></Suspense>} />
      <Route path="/terms" element={<Suspense fallback={<PageLoader />}><TermsPage /></Suspense>} />

      {/* Auth */}
      <Route path="/login" element={<Suspense fallback={<PageLoader />}><LoginPage /></Suspense>} />
      <Route path="/register" element={<Suspense fallback={<PageLoader />}><RegisterPage /></Suspense>} />
      <Route path="/forgot-password" element={<Suspense fallback={<PageLoader />}><ForgotPasswordPage /></Suspense>} />
      <Route path="/reset-password" element={<Suspense fallback={<PageLoader />}><ResetPasswordPage /></Suspense>} />
      <Route path="/update-password" element={<Suspense fallback={<PageLoader />}><UpdatePasswordPage /></Suspense>} />

      {/* Main */}
      <Route path="/study/subject/:subject" element={<Protected><Suspense fallback={<PageLoader />}><SubjectPage /></Suspense></Protected>} />
      <Route path="/" element={<Protected><HomePage /></Protected>} />
      <Route path="/search" element={<Protected><Suspense fallback={<PageLoader />}><SearchPage /></Suspense></Protected>} />
      <Route path="/announcements" element={<Protected><Suspense fallback={<PageLoader />}><AnnouncementsPage /></Suspense></Protected>} />
      <Route path="/community" element={<Protected><Suspense fallback={<PageLoader />}><CommunityPage /></Suspense></Protected>} />
      <Route path="/community/:id/chat" element={<Protected><Suspense fallback={<PageLoader />}><CommunityChatPage /></Suspense></Protected>} />
      <Route path="/community/:id/room" element={<Protected><Suspense fallback={<PageLoader />}><StudyRoom /></Suspense></Protected>} />
      <Route path="/community/:id/ama" element={<Protected><Suspense fallback={<PageLoader />}><AMAsPage /></Suspense></Protected>} />
      <Route path="/community/:communityId/ama/:sessionId" element={<Protected><Suspense fallback={<PageLoader />}><AMASessionPage /></Suspense></Protected>} />

      <Route path="/community/:id/join" element={<Suspense fallback={<PageLoader />}><JoinCommunity /></Suspense>} />


      <Route path="/campus-map" element={<Protected><Suspense fallback={<PageLoader />}><CampusMapPage /></Suspense></Protected>} />
      <Route path="/study" element={<Protected><Suspense fallback={<PageLoader />}><StudyPage /></Suspense></Protected>} />
      <Route path="/notifications" element={<Protected><Suspense fallback={<PageLoader />}><NotificationsPage /></Suspense></Protected>} />
      <Route path="/events" element={<Protected><Suspense fallback={<PageLoader />}><EventsPage /></Suspense></Protected>} />

      {/* Messages */}
      <Route path="/messages" element={<Protected><Suspense fallback={<PageLoader />}><MessagesPage /></Suspense></Protected>} />
      <Route path="/messages/:partnerId" element={<Protected><Suspense fallback={<PageLoader />}><ConversationPage /></Suspense></Protected>} />

      {/* Ask a Senior */}
      <Route path="/ask-senior" element={<Protected><Suspense fallback={<PageLoader />}><AskSeniorPage /></Suspense></Protected>} />
      <Route path="/ask-senior/:id" element={<Protected><Suspense fallback={<PageLoader />}><QuestionDetailPage /></Suspense></Protected>} />

      {/* Live Rooms */}
      <Route path="/live" element={<Protected><Suspense fallback={<PageLoader />}><LiveRoomsList /></Suspense></Protected>} />
      <Route path="/live/:id" element={<Protected><Suspense fallback={<PageLoader />}><LiveRoomChat /></Suspense></Protected>} />

      {/* Settings / Blocked */}
      <Route path="/settings" element={<Protected><Suspense fallback={<PageLoader />}><SettingsPage /></Suspense></Protected>} />
      <Route path="/profile/blocked" element={<Protected><Suspense fallback={<PageLoader />}><BlockedUsersPage /></Suspense></Protected>} />

      {/* Profile */}
      <Route path="/profile" element={<Protected><Suspense fallback={<PageLoader />}><ProfilePage /></Suspense></Protected>} />
      <Route path="/profile/:userId" element={<Protected><Suspense fallback={<PageLoader />}><ProfilePage /></Suspense></Protected>} />
      <Route path="/profile/edit" element={<Protected><Suspense fallback={<PageLoader />}><EditProfile /></Suspense></Protected>} />
      <Route path="/profile/saved" element={<Protected><Suspense fallback={<PageLoader />}><SavedPostsPage /></Suspense></Protected>} />

      {/* Profile sub-pages */}
      <Route path="/profile/achievements" element={<Protected><Suspense fallback={<PageLoader />}><AchievementsPage /></Suspense></Protected>} />
      <Route path="/profile/privacy" element={<Protected><Suspense fallback={<PageLoader />}><PrivacySecurityPage /></Suspense></Protected>} />
      <Route path="/profile/discussions" element={<Protected><Suspense fallback={<PageLoader />}><MyDiscussionsPage /></Suspense></Protected>} />
      <Route path="/profile/groups" element={<Protected><Suspense fallback={<PageLoader />}><CampusGroupsPage /></Suspense></Protected>} />
      <Route path="/profile/:userId/achievements" element={<Protected><Suspense fallback={<PageLoader />}><AchievementsPage /></Suspense></Protected>} />
      <Route path="/profile/:userId/privacy" element={<Protected><Suspense fallback={<PageLoader />}><PrivacySecurityPage /></Suspense></Protected>} />
      <Route path="/profile/:userId/discussions" element={<Protected><Suspense fallback={<PageLoader />}><MyDiscussionsPage /></Suspense></Protected>} />
      <Route path="/profile/:userId/groups" element={<Protected><Suspense fallback={<PageLoader />}><CampusGroupsPage /></Suspense></Protected>} />

      {/* Moderator */}
      <Route path="/moderator" element={<RoleProtected allowedRoles={MOD_ROLES}><Suspense fallback={<PageLoader />}><ModeratorDashboardPage /></Suspense></RoleProtected>} />
      <Route path="/moderation" element={<RoleProtected allowedRoles={MOD_ROLES}><Suspense fallback={<PageLoader />}><ModerationPage /></Suspense></RoleProtected>} />

      {/* Admin */}
      <Route path="/admin" element={<RoleProtected allowedRoles={ADMIN_ROLES}><Suspense fallback={<PageLoader />}><AdminDashboardPage /></Suspense></RoleProtected>} />
      <Route path="/admin/reports" element={<RoleProtected allowedRoles={MOD_ROLES}><Suspense fallback={<PageLoader />}><ReportsPage /></Suspense></RoleProtected>} />
      <Route path="/admin/announcements" element={<RoleProtected allowedRoles={ADMIN_ROLES}><Suspense fallback={<PageLoader />}><ManageAnnouncementsPage /></Suspense></RoleProtected>} />
      <Route path="/admin/announcements/new" element={<RoleProtected allowedRoles={ADMIN_ROLES}><Suspense fallback={<PageLoader />}><CreateAnnouncementPage /></Suspense></RoleProtected>} />
      <Route path="/admin/upload-material" element={<RoleProtected allowedRoles={MOD_ROLES}><Suspense fallback={<PageLoader />}><UploadMaterialPage /></Suspense></RoleProtected>} />
      <Route path="/admin/communities" element={<RoleProtected allowedRoles={ADMIN_ROLES}><Suspense fallback={<PageLoader />}><ManageCommunitiesPage /></Suspense></RoleProtected>} />
      <Route path="/admin/communities/new" element={<RoleProtected allowedRoles={MOD_ROLES}><Suspense fallback={<PageLoader />}><CreateCommunityPage /></Suspense></RoleProtected>} />
      <Route path="/admin/communities/edit/:id" element={<RoleProtected allowedRoles={ADMIN_ROLES}><Suspense fallback={<PageLoader />}><CreateCommunityPage /></Suspense></RoleProtected>} />
      <Route path="/admin/global-notifications" element={<RoleProtected allowedRoles={ADMIN_ROLES}><Suspense fallback={<PageLoader />}><GlobalNotificationsPage /></Suspense></RoleProtected>} />
      <Route path="/admin/material-requests" element={<RoleProtected allowedRoles={MOD_ROLES}><Suspense fallback={<PageLoader />}><ManageMaterialRequests /></Suspense></RoleProtected>} />
      <Route path="/admin/events" element={<RoleProtected allowedRoles={MOD_ROLES}><Suspense fallback={<PageLoader />}><ManageEventsPage /></Suspense></RoleProtected>} />
      <Route path="/admin/events/new" element={<RoleProtected allowedRoles={MOD_ROLES}><Suspense fallback={<PageLoader />}><CreateEventPage /></Suspense></RoleProtected>} />
      <Route path="/admin/events/edit/:id" element={<RoleProtected allowedRoles={MOD_ROLES}><Suspense fallback={<PageLoader />}><CreateEventPage /></Suspense></RoleProtected>} />
      <Route path="/admin/create-ama" element={<RoleProtected allowedRoles={ADMIN_ROLES}><Suspense fallback={<PageLoader />}><CreateAMAPage /></Suspense></RoleProtected>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}