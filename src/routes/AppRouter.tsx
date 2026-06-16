import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import HomePage from "../pages/home/HomePage";

import ProfilePage from "../pages/profile/ProfilePage";
import EditProfile from "../pages/profile/EditProfile";
import SavedPostsPage from "../pages/profile/SavedPostsPage";

import AnnouncementsPage from "../pages/announcements/AnnouncementsPage";

import ModerationPage from "../pages/moderation/ModerationPage";
import ModeratorDashboardPage from "../pages/moderation/ModeratorDashboardPage";

import SearchPage from "../pages/search/SearchPage";

import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import ReportsPage from "../pages/admin/ReportsPage";
import CreateAnnouncementPage from "../pages/admin/CreateAnnouncementPage";
import ManageAnnouncementsPage from "../pages/admin/ManageAnnouncementsPage";

import ResetPasswordPage from "../passwordManagement/ResetPasswordPage";
import UpdatePasswordPage from "../passwordManagement/UpdatePasswordPage";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ---------- Public ---------- */}

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/reset-password"
          element={<ResetPasswordPage />}
        />

        <Route
          path="/update-password"
          element={<UpdatePasswordPage />}
        />

        {/* ---------- Main App ---------- */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/saved"
          element={
            <ProtectedRoute>
              <SavedPostsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/announcements"
          element={
            <ProtectedRoute>
              <AnnouncementsPage />
            </ProtectedRoute>
          }
        />

        {/* ---------- Moderator ---------- */}

        <Route
          path="/moderator"
          element={
            <ProtectedRoute>
              <RoleRoute
                allowedRoles={[
                  "moderator",
                  "admin",
                ]}
              >
                <ModeratorDashboardPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/moderation"
          element={
            <ProtectedRoute>
              <RoleRoute
                allowedRoles={[
                  "moderator",
                  "admin",
                ]}
              >
                <ModerationPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/moderation-tools"
          element={
            <ProtectedRoute>
              <RoleRoute
                allowedRoles={[
                  "moderator",
                  "admin",
                ]}
              >
                <ModerationPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* ---------- Admin ---------- */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleRoute
                allowedRoles={[
                  "admin",
                ]}
              >
                <AdminDashboardPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute>
              <RoleRoute
                allowedRoles={[
                  "admin",
                ]}
              >
                <ReportsPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/announcements"
          element={
            <ProtectedRoute>
              <RoleRoute
                allowedRoles={[
                  "admin",
                ]}
              >
                <ManageAnnouncementsPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/announcements/new"
          element={
            <ProtectedRoute>
              <RoleRoute
                allowedRoles={[
                  "admin",
                ]}
              >
                <CreateAnnouncementPage />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* ---------- Fallback ---------- */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
