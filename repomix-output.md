This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.gitignore
api/cron/cleanup-notifications.ts
eslint.config.js
index.html
package.json
public/_redirects
public/ads.txt
public/favicon.svg
public/icons.svg
README.md
src/App.tsx
src/assets/react.svg
src/assets/vite.svg
src/components/ads/FeedAd.tsx
src/components/comments/CommentSection.tsx
src/components/common/EmptyState.tsx
src/components/common/ErrorState.tsx
src/components/common/index.ts
src/components/common/LecturerBadge.tsx
src/components/common/LoadingSpinner.tsx
src/components/common/PageLoader.tsx
src/components/common/SearchBar.tsx
src/components/common/Toast.tsx
src/components/community/DirectMessageDrawer.tsx
src/components/feed/FeedAd.tsx
src/components/feed/FeedToggle.tsx
src/components/layout/AppShell.tsx
src/components/layout/BottomNavigation.tsx
src/components/layout/MobileNavbar.tsx
src/components/leaderboard/Leaderboard.tsx
src/components/notifications/NotificationBell.tsx
src/components/pwa/InstallBanner.tsx
src/components/ui/PullToRefresh.tsx
src/features/auth/hooks/useAuth.ts
src/features/auth/services/auth.service.ts
src/features/communities/components/CommunityCard.tsx
src/features/communities/components/CommunityGrid.tsx
src/features/communities/components/CommunityMembersDrawer.tsx
src/features/communities/hooks/useCommunities.ts
src/features/communities/hooks/useCommunityMembership.ts
src/features/communities/services/communities.service.ts
src/features/communities/store/communities.store.ts
src/features/events/components/EventDrawer.tsx
src/features/map/components/CampusMap.tsx
src/features/map/components/CategoryFilter.tsx
src/features/map/components/MapToast.tsx
src/features/map/components/MarkerLayer.tsx
src/features/map/components/PinDrawer.tsx
src/features/map/components/PinForm.tsx
src/features/map/components/PinMarker.tsx
src/features/map/components/QuickActions.tsx
src/features/map/components/SearchResults.tsx
src/features/map/components/ZoomControls.tsx
src/features/map/hooks/useCampusMap.ts
src/features/map/hooks/useGeolocation.ts
src/features/map/hooks/useMapFilters.ts
src/features/map/hooks/useMapZoom.ts
src/features/map/hooks/usePinPlacement.ts
src/features/map/services/map.service.ts
src/features/map/store/map.store.ts
src/features/map/utils/categories.tsx
src/features/messages/components/ConversationList.tsx
src/features/messages/components/MessageBubble.tsx
src/features/messages/hooks/useConversations.ts
src/features/messages/hooks/useDirectMessages.ts
src/features/messages/services/messages.service.ts
src/features/notifications/components/NotificationCard.tsx
src/features/notifications/components/NotificationList.tsx
src/features/notifications/hooks/useNotifications.ts
src/features/notifications/services/notifications.service.ts
src/features/notifications/store/notifications.store.ts
src/features/posts/components/CreatePostSheet.tsx
src/features/posts/components/Feed.tsx
src/features/posts/components/FeedItem.tsx
src/features/posts/components/PostCard.tsx
src/features/posts/components/PostCardSkeleton.tsx
src/features/posts/components/VoteButtons.tsx
src/features/posts/hooks/usePosts.ts
src/features/posts/hooks/usePostVote.ts
src/features/posts/hooks/useRealtimePosts.ts
src/features/posts/services/posts.service.ts
src/features/posts/store/posts.store.ts
src/features/profile/components/AccessibilityPanel.tsx
src/features/profile/components/ActivityCard.tsx
src/features/profile/components/LecturerBadge.tsx
src/features/profile/components/ProfileActions.tsx
src/features/profile/components/ProfileHeader.tsx
src/features/profile/components/ProfileInfo.tsx
src/features/profile/components/ProfileItem.tsx
src/features/profile/components/ProfileStats.tsx
src/features/profile/components/RecentActivity.tsx
src/features/profile/components/StatBox.tsx
src/features/profile/hooks/useBlockUser.ts
src/features/profile/hooks/useProfileData.ts
src/features/profile/services/profile.service.ts
src/features/rooms/components/StudyRoom.tsx
src/features/rooms/hooks/useWebRTC.ts
src/features/study/components/FilterChips.tsx
src/features/study/components/GradeEstimator.tsx
src/features/study/components/MaterialCard.tsx
src/features/study/components/MaterialDrawer.tsx
src/features/study/components/RatingStars.tsx
src/features/study/components/ReactionBar.tsx
src/features/study/components/RequestForm.tsx
src/features/study/components/StudyGrid.tsx
src/features/study/components/StudyGroupCard.tsx
src/features/study/components/StudyGroupsSections.tsx
src/features/study/constants.ts
src/features/study/hooks/useContinueLearning.ts
src/features/study/hooks/useCredits.ts
src/features/study/hooks/useLeaderboard.ts
src/features/study/hooks/useMaterialRequests.ts
src/features/study/hooks/usePersonalizedFeed.ts
src/features/study/hooks/useRateMaterial.ts
src/features/study/hooks/useReactions.ts
src/features/study/hooks/useRelatedMaterials.ts
src/features/study/hooks/useStarterPacks.ts
src/features/study/hooks/useStudyActions.ts
src/features/study/hooks/useStudyGroups.ts
src/features/study/hooks/useStudyMaterials.ts
src/features/study/services/study.service.ts
src/features/study/services/studyGroups.service.ts
src/features/study/store/study.store.ts
src/features/study/utils/tiers.ts
src/hooks/usePushNotifications.ts
src/hooks/useUserRole.ts
src/i18n/bemba.json
src/i18n/chinyanja.json
src/i18n/index.ts
src/index.css
src/lib/queryClient.ts
src/lib/supabase.ts
src/main.tsx
src/pages/admin/AdminDashboardPage.tsx
src/pages/admin/CreateAnnouncementPage.tsx
src/pages/admin/CreateCommunityPage.tsx
src/pages/admin/CreateEventPage.tsx
src/pages/admin/GlobalNotificationsPage.tsx
src/pages/admin/ManageAnnouncementsPage.tsx
src/pages/admin/ManageCommunitiesPage.tsx
src/pages/admin/ManageEventsPage.tsx
src/pages/admin/ManageMaterialRequests.tsx
src/pages/admin/ManageStarterPacks.tsx
src/pages/admin/ManageUsers.tsx
src/pages/admin/ReportsPage.tsx
src/pages/admin/UploadMaterialPage.tsx
src/pages/announcements/AnnouncementsPage.tsx
src/pages/auth/LoginPage.tsx
src/pages/auth/RegisterPage.tsx
src/pages/ComingSoonPage.tsx
src/pages/community/CommunityChatPage.tsx
src/pages/community/CommunityPage.tsx
src/pages/community/JoinCommunity.tsx
src/pages/events/EventsPage.tsx
src/pages/home/HomePage.tsx
src/pages/legal/AboutPage.tsx
src/pages/legal/ContactPage.tsx
src/pages/legal/PrivacyPage.tsx
src/pages/legal/TermsPage.tsx
src/pages/map/CampusMapPage.tsx
src/pages/messages/ConversationPage.tsx
src/pages/messages/MessagesPage.tsx
src/pages/moderation/ModerationPage.tsx
src/pages/moderation/ModeratorDashboardPage.tsx
src/pages/notifications/NotificationsPage.tsx
src/pages/passwordManagement/ResetPasswordPage.tsx
src/pages/passwordManagement/UpdatePasswordPage.tsx
src/pages/profile/AchievementsPage.tsx
src/pages/profile/BlockedUSersPage.tsx
src/pages/profile/CampusGroupsPage.tsx
src/pages/profile/EditProfile.tsx
src/pages/profile/MyDiscussionsPage.tsx
src/pages/profile/PrivacySecurityPage.tsx
src/pages/profile/ProfilePage.tsx
src/pages/profile/SavedPostsPage.tsx
src/pages/profile/SettingsPage.tsx
src/pages/QandA/AskSeniorPage.tsx
src/pages/QandA/QuestionDetailPage.tsx
src/pages/rooms/LiveRoomsPage.tsx
src/pages/search/SearchPage.tsx
src/pages/study/StudyPage.tsx
src/pages/study/SubjectPage.tsx
src/passwordManagement/ResetPasswordPage.tsx
src/passwordManagement/UpdatePasswordPage.tsx
src/routes/AppRouter.tsx
src/routes/ProtectedRoute.tsx
src/routes/RoleRoute.tsx
src/services/announcementService.ts
src/services/blockService.ts
src/services/commentImageService.ts
src/services/communityChatService.ts
src/services/eventsService.ts
src/services/liveRoomService.tsx
src/services/postLimitService.ts
src/services/questionService.ts
src/services/reportService.ts
src/services/savedPostsService.ts
src/services/searchService.ts
src/store/accessibility.store.ts
src/store/authStore.ts
src/store/themeStore.ts
src/store/toastStore.ts
src/types/community.ts
src/types/database.types.ts
src/types/map.ts
src/utils/stringSimilarity.ts
src/vite-env.d.ts.ts
supabase/.temp/cli-latest
supabase/.temp/gotrue-version
supabase/.temp/linked-project.json
supabase/.temp/pooler-url
supabase/.temp/postgres-version
supabase/.temp/project-ref
supabase/.temp/rest-version
supabase/.temp/storage-migration
supabase/.temp/storage-version
supabase/functions/send-push/index.ts
tailwind.config.js
TODO.md
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vercel.json
vite.config.ts
```

# Files

## File: .gitignore
````
# Logs
logs
*.log
.env
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

.vercel
.env*
````

## File: api/cron/cleanup-notifications.ts
````typescript
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

export async function GET() {
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY!
  );

  const { error } = await supabase.rpc("cleanup_old_notifications");
  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response("OK", { status: 200 });
}
````

## File: eslint.config.js
````javascript
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      // Disable the most noisy rules that don't affect functionality
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/immutability': 'off',
      'no-empty': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // Keep important rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  }
)
````

## File: index.html
````html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="google-adsense-account" content="ca-pub-2017155922423033" />

    <!-- Theme: apply dark class before paint -->
    <script>
      try {
        if (localStorage.getItem("theme") === "dark") {
          document.documentElement.classList.add("dark");
        }
      } catch (_) {}
    </script>

    <!-- Safe SW crash recovery – runs only once, no loops -->
    <script>
      try {
        if ("serviceWorker" in navigator) {
          var recoveryFlag = localStorage.getItem("warren-needs-recovery");
          if (recoveryFlag === "1") {
            localStorage.removeItem("warren-needs-recovery");
            navigator.serviceWorker.getRegistrations()
              .then(function(regs) {
                return Promise.all(regs.map(function(r) { return r.unregister(); }));
              })
              .then(function() { return caches.keys(); })
              .then(function(keys) {
                return Promise.all(keys.map(function(k) { return caches.delete(k); }));
              })
              .then(function() { window.location.reload(); });
          } else {
            localStorage.setItem("warren-needs-recovery", "1");
          }
        }
      } catch (_) {}
    </script>

    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

    <title>Warren | Campus Social Network</title>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
````

## File: package.json
````json
{
  "name": "warren",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.4.0",
    "@supabase/supabase-js": "^2.108.1",
    "@tailwindcss/vite": "^4.3.1",
    "@tanstack/react-query": "^5.101.2",
    "@vercel/analytics": "^2.0.1",
    "browser-image-compression": "^2.0.2",
    "clsx": "^2.1.1",
    "date-fns": "^4.4.0",
    "i18next": "^26.3.4",
    "idb": "^8.0.3",
    "lucide-react": "^1.18.0",
    "react": "^19.2.6",
    "react-dom": "^19.2.6",
    "react-hook-form": "^7.79.0",
    "react-i18next": "^17.0.8",
    "react-router-dom": "^7.17.0",
    "sonner": "^2.0.7",
    "tailwindcss": "^4.3.1",
    "vite-plugin-pwa": "^1.3.0",
    "workbox-core": "^7.4.1",
    "workbox-precaching": "^7.4.1",
    "zod": "^4.4.3",
    "zustand": "^5.0.14"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/node": "^24.12.3",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "eslint": "^10.3.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.6.0",
    "supabase": "^2.107.0",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.59.2",
    "vite": "^8.0.12"
  }
}
````

## File: public/_redirects
````
/*  /index.html  200
````

## File: public/ads.txt
````
google.com, pub-2017155922423033, DIRECT, f08c47fec0942fa0
````

## File: public/favicon.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="46" fill="none" viewBox="0 0 48 46"><path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" style="fill:#863bff;fill:color(display-p3 .5252 .23 1);fill-opacity:1"/><mask id="a" width="48" height="46" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M25.842 44.938c-.664.844-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.183c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.498 0-3.579-1.842-3.579H1.133c-.92 0-1.456-1.04-.92-1.787L9.91.473c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.578 1.842 3.578h11.377c.943 0 1.473 1.088.89 1.832L25.843 44.94z" style="fill:#000;fill-opacity:1"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#ede6ff" rx="5.508" ry="14.704" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -4.47 31.516)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#ede6ff" rx="10.399" ry="29.851" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -39.328 7.883)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#7e14ff" rx="5.508" ry="30.487" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -25.913 -14.639)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -32.644 -3.334)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -34.34 30.47)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#ede6ff" rx="14.072" ry="22.078" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="rotate(93.35 24.506 48.493)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx=".387" cy="8.972" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(39.51 .387 8.972)"/></g><g filter="url(#k)"><ellipse cx="47.523" cy="-6.092" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 47.523 -6.092)"/></g><g filter="url(#l)"><ellipse cx="41.412" cy="6.333" fill="#47bfff" rx="5.971" ry="9.665" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 41.412 6.333)"/></g><g filter="url(#m)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#n)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#o)"><ellipse cx="35.651" cy="29.907" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 35.651 29.907)"/></g><g filter="url(#p)"><ellipse cx="38.418" cy="32.4" fill="#47bfff" rx="5.971" ry="15.297" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 38.418 32.4)"/></g></g><defs><filter id="b" width="60.045" height="41.654" x="-19.77" y="16.149" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-54.613" y="-7.533" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-49.64" y="2.03" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-45.045" y="20.029" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-43.513" y="21.178" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="15.756" y="-17.901" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-27.636" y="-22.853" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="20.116" y="-38.415" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="24.641" y="-11.323" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="8.244" y="-2.416" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="18.713" y="10.588" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter></defs></svg>
````

## File: public/icons.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="bluesky-icon" viewBox="0 0 16 17">
    <g clip-path="url(#bluesky-clip)"><path fill="#08060d" d="M7.75 7.735c-.693-1.348-2.58-3.86-4.334-5.097-1.68-1.187-2.32-.981-2.74-.79C.188 2.065.1 2.812.1 3.251s.241 3.602.398 4.13c.52 1.744 2.367 2.333 4.07 2.145-2.495.37-4.71 1.278-1.805 4.512 3.196 3.309 4.38-.71 4.987-2.746.608 2.036 1.307 5.91 4.93 2.746 2.72-2.746.747-4.143-1.747-4.512 1.702.189 3.55-.4 4.07-2.145.156-.528.397-3.691.397-4.13s-.088-1.186-.575-1.406c-.42-.19-1.06-.395-2.741.79-1.755 1.24-3.64 3.752-4.334 5.099"/></g>
    <defs><clipPath id="bluesky-clip"><path fill="#fff" d="M.1.85h15.3v15.3H.1z"/></clipPath></defs>
  </symbol>
  <symbol id="discord-icon" viewBox="0 0 20 19">
    <path fill="#08060d" d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
  </symbol>
  <symbol id="documentation-icon" viewBox="0 0 21 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="m15.5 13.333 1.533 1.322c.645.555.967.833.967 1.178s-.322.623-.967 1.179L15.5 18.333m-3.333-5-1.534 1.322c-.644.555-.966.833-.966 1.178s.322.623.966 1.179l1.534 1.321"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M17.167 10.836v-4.32c0-1.41 0-2.117-.224-2.68-.359-.906-1.118-1.621-2.08-1.96-.599-.21-1.349-.21-2.848-.21-2.623 0-3.935 0-4.983.369-1.684.591-3.013 1.842-3.641 3.428C3 6.449 3 7.684 3 10.154v2.122c0 2.558 0 3.838.706 4.726q.306.383.713.671c.76.536 1.79.64 3.581.66"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M3 10a2.78 2.78 0 0 1 2.778-2.778c.555 0 1.209.097 1.748-.047.48-.129.854-.503.982-.982.145-.54.048-1.194.048-1.749a2.78 2.78 0 0 1 2.777-2.777"/>
  </symbol>
  <symbol id="github-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clip-rule="evenodd"/>
  </symbol>
  <symbol id="social-icon" viewBox="0 0 20 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M12.5 6.667a4.167 4.167 0 1 0-8.334 0 4.167 4.167 0 0 0 8.334 0"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M2.5 16.667a5.833 5.833 0 0 1 8.75-5.053m3.837.474.513 1.035c.07.144.257.282.414.309l.93.155c.596.1.736.536.307.965l-.723.73a.64.64 0 0 0-.152.531l.207.903c.164.715-.213.991-.84.618l-.872-.52a.63.63 0 0 0-.577 0l-.872.52c-.624.373-1.003.094-.84-.618l.207-.903a.64.64 0 0 0-.152-.532l-.723-.729c-.426-.43-.289-.864.306-.964l.93-.156a.64.64 0 0 0 .412-.31l.513-1.034c.28-.562.735-.562 1.012 0"/>
  </symbol>
  <symbol id="x-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z" clip-rule="evenodd"/>
  </symbol>
</svg>
````

## File: README.md
````markdown
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
````

## File: src/App.tsx
````typescript
import { useEffect, useRef, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import AppRouter from "./routes/AppRouter";
import { useAuthStore } from "./store/authStore";
import { useThemeStore } from "./store/themeStore";
import { useAccessibilityStore } from "./store/accessibility.store";
import InstallBanner from "./components/pwa/InstallBanner";

export default function App() {
  const initAuth = useAuthStore((s) => s.initialize);
  const initTheme = useThemeStore((s) => s.initTheme);
  const initA11y = useAccessibilityStore((s) => s.init);
  const [ready, setReady] = useState(false);
  const booted = useRef(false);

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    try { localStorage.removeItem("warren-needs-recovery"); } catch (_) {}
    Promise.allSettled([initAuth(), initTheme(), initA11y()]).finally(() => setReady(true));
  }, [initAuth, initTheme, initA11y]);

  if (!ready) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="w-10 h-10 rounded-2xl bg-blue-600 animate-pulse" />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <InstallBanner />
    </QueryClientProvider>
  );
}
````

## File: src/assets/react.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>
````

## File: src/assets/vite.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" width="77" height="47" fill="none" aria-labelledby="vite-logo-title" viewBox="0 0 77 47"><title id="vite-logo-title">Vite</title><style>.parenthesis{fill:#000}@media (prefers-color-scheme:dark){.parenthesis{fill:#fff}}</style><path fill="#9135ff" d="M40.151 45.71c-.663.844-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.493c-.92 0-1.457-1.04-.92-1.788l7.479-10.471c1.07-1.498 0-3.578-1.842-3.578H15.443c-.92 0-1.456-1.04-.92-1.788l9.696-13.576c.213-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.472c-1.07 1.497 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.087.89 1.83L40.153 45.712z"/><mask id="a" width="48" height="47" x="14" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M40.047 45.71c-.663.843-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.389c-.92 0-1.457-1.04-.92-1.788l7.479-10.472c1.07-1.497 0-3.578-1.842-3.578H15.34c-.92 0-1.456-1.04-.92-1.788l9.696-13.575c.213-.297.556-.474.92-.474H53.93c.92 0 1.456 1.04.92 1.788L47.37 13.03c-1.07 1.498 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.088.89 1.831L40.049 45.712z"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#eee6ff" rx="5.508" ry="14.704" transform="rotate(269.814 20.96 11.29)scale(-1 1)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#eee6ff" rx="10.399" ry="29.851" transform="rotate(89.814 -16.902 -8.275)scale(1 -1)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#8900ff" rx="5.508" ry="30.487" transform="rotate(89.814 -19.197 -7.127)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.928 4.177)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.738 5.52)scale(1 -1)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#eee6ff" rx="14.072" ry="22.078" transform="rotate(93.35 31.245 55.578)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx="14.592" cy="9.743" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(39.51 14.592 9.743)"/></g><g filter="url(#k)"><ellipse cx="61.728" cy="-5.321" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 61.728 -5.32)"/></g><g filter="url(#l)"><ellipse cx="55.618" cy="7.104" fill="#00c2ff" rx="5.971" ry="9.665" transform="rotate(37.892 55.618 7.104)"/></g><g filter="url(#m)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#n)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#o)"><ellipse cx="49.857" cy="30.678" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 49.857 30.678)"/></g><g filter="url(#p)"><ellipse cx="52.623" cy="33.171" fill="#00c2ff" rx="5.971" ry="15.297" transform="rotate(37.892 52.623 33.17)"/></g></g><path d="M6.919 0c-9.198 13.166-9.252 33.575 0 46.789h6.215c-9.25-13.214-9.196-33.623 0-46.789zm62.424 0h-6.215c9.198 13.166 9.252 33.575 0 46.789h6.215c9.25-13.214 9.196-33.623 0-46.789" class="parenthesis"/><defs><filter id="b" width="60.045" height="41.654" x="-5.564" y="16.92" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-40.407" y="-6.762" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-35.435" y="2.801" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-30.84" y="20.8" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-29.307" y="21.949" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="29.961" y="-17.13" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-13.43" y="-22.082" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="34.321" y="-37.644" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="38.847" y="-10.552" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="22.45" y="-1.645" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="32.919" y="11.36" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter></defs></svg>
````

## File: src/components/ads/FeedAd.tsx
````typescript
// components/ads/FeedAd.tsx

export default function FeedAd() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        dark:border-slate-800
        bg-white
        dark:bg-slate-900
        p-4
        min-h-[140px]
        flex
        items-center
        justify-center
      "
    >
      <div className="text-center">
        <p className="text-xs opacity-50 uppercase">
          Sponsored
        </p>

        <h3 className="font-semibold mt-2">
          Advertisement
        </h3>

        <p className="text-sm opacity-70 mt-1">
          AdSense ad will appear here
          after approval.
        </p>
      </div>
    </div>
  );
}
````

## File: src/components/comments/CommentSection.tsx
````typescript
import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { supabase } from "../../lib/supabase";
import { useAuthStore } from "../../store/authStore";
import { useUserRole } from "../../hooks/useUserRole";
import { Link } from "react-router-dom";
import {
  Send,
  Trash2,
  ImageIcon,
  ArrowBigUp,
  ArrowBigDown,
  X,
  Loader2,
} from "lucide-react";

interface Props {
  postId: string;
  postOwnerId?: string | null;
  onClose?: () => void;
}

interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string | null;
  image_url: string | null;
  created_at: string;
  profiles?: {
    username?: string;
    avatar_url?: string;
    role?: string;
  };
  upvotes: number;
  downvotes: number;
  userVote: "up" | "down" | null;
}

const MAX_COMMENT_LENGTH = 500;

export default function CommentSection({ postId, postOwnerId, onClose }: Props) {
  const user = useAuthStore((s) => s.user);
  const { role } = useUserRole();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const commentsEndRef = useRef<HTMLDivElement>(null);

  const imagePreview = useMemo(() => {
    if (!imageFile) return null;
    return URL.createObjectURL(imageFile);
  }, [imageFile]);

  const loadComments = useCallback(async () => {
    try {
      const { data: commentsData, error } = await supabase
        .from("comments")
        .select(`*, profiles(username, avatar_url, role)`)
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      const ids = commentsData?.map((c) => c.id) ?? [];
      let votes: any[] = [];
      if (ids.length) {
        const { data } = await supabase
          .from("comment_votes")
          .select("comment_id,user_id,vote_type")
          .in("comment_id", ids);
        votes = data ?? [];
      }

      const mapped: Comment[] = (commentsData ?? []).map((comment) => {
        const commentVotes = votes.filter((v) => v.comment_id === comment.id);
        return {
          ...comment,
          profiles: Array.isArray(comment.profiles)
            ? comment.profiles[0] ?? undefined
            : comment.profiles ?? undefined,
          upvotes: commentVotes.filter((v) => v.vote_type === "up").length,
          downvotes: commentVotes.filter((v) => v.vote_type === "down").length,
          userVote:
            commentVotes.find((v) => v.user_id === user?.id)?.vote_type ?? null,
        } as Comment;
      });

      setComments(mapped);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [postId, user?.id]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  useEffect(() => {
    const channel = supabase
      .channel(`comments-${postId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comments",
          filter: `post_id=eq.${postId}`,
        },
        () => loadComments()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId, loadComments]);

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  async function handleSubmit() {
    if (sending || !user) return;
    if (!content.trim() && !imageFile) return;
    setSending(true);
    setError("");

    try {
      let imageUrl = null;
      if (imageFile) {
        const fileName = `${user.id}/${Date.now()}-${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("comment-images")
          .upload(fileName, imageFile, { upsert: false });
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from("comment-images").getPublicUrl(fileName);
        imageUrl = data.publicUrl;
      }

      const { error: insertError } = await supabase.from("comments").insert({
        post_id: postId,
        user_id: user.id,
        content: content.trim(),
        image_url: imageUrl,
      });

      if (insertError) throw insertError;

      // Build a local comment object for instant UI update
      const newComment: Comment = {
        id: crypto.randomUUID(), // temporary ID – will be replaced when realtime fires
        post_id: postId,
        user_id: user.id,
        content: content.trim(),
        image_url: imageUrl,
        created_at: new Date().toISOString(),
        profiles: {
          username: user.user_metadata?.username || "You",
          avatar_url: user.user_metadata?.avatar_url || null,
          role: "student",
        },
        upvotes: 0,
        downvotes: 0,
        userVote: null,
      };

      setComments((prev) => [...prev, newComment]);
      setContent("");
      setImageFile(null);
    } catch (err: any) {
      setError(err?.message || "Failed to post comment");
    } finally {
      setSending(false);
    }
  }

  async function handleVote(commentId: string, type: "up" | "down") {
    if (!user) return;
    const comment = comments.find((c) => c.id === commentId);
    if (!comment) return;
    const current = comment.userVote;

    setComments((prev) =>
      prev.map((c) => {
        if (c.id !== commentId) return c;
        let up = c.upvotes;
        let down = c.downvotes;
        if (current === "up") up--;
        if (current === "down") down--;
        if (current !== type) {
          if (type === "up") up++;
          if (type === "down") down++;
        }
        return {
          ...c,
          upvotes: up,
          downvotes: down,
          userVote: current === type ? null : type,
        };
      })
    );

    if (current === type) {
      await supabase.from("comment_votes").delete().eq("comment_id", commentId).eq("user_id", user.id);
    } else {
      await supabase.from("comment_votes").upsert({ comment_id: commentId, user_id: user.id, vote_type: type });
    }
  }

  async function handleDelete(id: string) {
    setComments((prev) => prev.filter((c) => c.id !== id));
    await supabase.from("comments").delete().eq("id", id);
  }

  const canDelete = (commentUserId: string) =>
    user?.id === commentUserId || role === "admin" || role === "moderator" || user?.id === postOwnerId;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[80vh]">
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 dark:border-slate-800">
        <h3 className="font-semibold text-sm">Comments</h3>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Close comments"
            title="Close comments"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
        {loading ? (
          <div className="text-center py-4 text-sm text-slate-500">Loading...</div>
        ) : comments.length === 0 ? (
          <div className="text-center py-4 text-sm text-slate-500">No comments yet. Start the discussion!</div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-2 group">
              <Link to={`/profile/${comment.user_id}`} className="shrink-0 mt-0.5">
                {comment.profiles?.avatar_url ? (
                  <img src={comment.profiles.avatar_url} alt="" className="w-6 h-6 rounded-full object-cover" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold text-[10px]">
                    {comment.profiles?.username?.[0]?.toUpperCase() ?? "?"}
                  </div>
                )}
              </Link>

              <div className="flex-1 min-w-0">
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl px-3 py-2">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Link to={`/profile/${comment.user_id}`} className="text-xs font-semibold hover:underline">
                      {comment.profiles?.username ?? "Anonymous"}
                    </Link>
                    <span className="text-[10px] text-slate-400">
                      {new Date(comment.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  {comment.content && <p className="text-xs leading-snug whitespace-pre-wrap">{comment.content}</p>}
                  {comment.image_url && (
                    <img src={comment.image_url} alt="" loading="lazy" className="mt-1 rounded-lg max-h-32 w-full object-cover" />
                  )}
                </div>

                <div className="flex items-center gap-3 mt-0.5 pl-0.5">
                  <button
                    onClick={() => handleVote(comment.id, "up")}
                    className={`flex items-center gap-0.5 text-[10px] ${
                      comment.userVote === "up" ? "text-emerald-500 font-semibold" : "text-slate-400"
                    }`}
                  >
                    <ArrowBigUp size={14} />
                    {comment.upvotes}
                  </button>
                  <button
                    onClick={() => handleVote(comment.id, "down")}
                    className={`flex items-center gap-0.5 text-[10px] ${
                      comment.userVote === "down" ? "text-red-500 font-semibold" : "text-slate-400"
                    }`}
                  >
                    <ArrowBigDown size={14} />
                    {comment.downvotes}
                  </button>
                  {canDelete(comment.user_id) && (
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="ml-auto text-red-400 hover:text-red-600 p-0.5 opacity-0 group-hover:opacity-100 transition"
                      aria-label="Delete comment"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={commentsEndRef} />
      </div>

      {error && <div className="px-3 py-1 text-xs text-red-500">{error}</div>}

      <div className="border-t border-slate-100 dark:border-slate-800 px-3 py-2">
        <div className="flex items-end gap-2">
          <textarea
            rows={1}
            value={content}
            maxLength={MAX_COMMENT_LENGTH}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a comment..."
            className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl px-3 py-2 text-xs resize-none outline-none min-h-[36px] max-h-[80px]"
          />
          <label className="cursor-pointer p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0">
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            />
            <ImageIcon size={16} className="text-slate-500" />
          </label>
          <button
            onClick={handleSubmit}
            disabled={sending || (!content.trim() && !imageFile)}
            className="p-2 bg-blue-600 text-white rounded-full disabled:opacity-50 shrink-0"
            aria-label="Send comment"
          >
            {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
          </button>
        </div>
        {imagePreview && (
          <div className="relative mt-2">
            <img src={imagePreview} alt="" className="h-16 rounded-lg object-cover" />
            <button
              onClick={() => setImageFile(null)}
              className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5"
              aria-label="Remove image"
              title="Remove image"
            >
              <X size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
````

## File: src/components/common/EmptyState.tsx
````typescript
interface Props {
  icon?: string;
  title: string;
  description?: string;
}

export function EmptyState({ icon = "📭", title, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center gap-2">
      <span className="text-4xl">{icon}</span>
      <p className="font-semibold text-slate-500 dark:text-slate-400">{title}</p>
      {description && <p className="text-sm text-slate-400">{description}</p>}
    </div>
  );
}
````

## File: src/components/common/ErrorState.tsx
````typescript
interface Props {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
      <p className="text-red-500 font-medium">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="text-sm text-blue-600 underline">
          Retry
        </button>
      )}
    </div>
  );
}
````

## File: src/components/common/index.ts
````typescript
export { SearchBar } from "./SearchBar";
export { Toast } from "./Toast";
export { EmptyState } from "./EmptyState";
export { ErrorState } from "./ErrorState";
export { LoadingSpinner } from "./LoadingSpinner";
export { PageLoader } from "./PageLoader";
````

## File: src/components/common/LecturerBadge.tsx
````typescript
export function LecturerBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 dark:bg-green-950/40 px-1.5 py-0.5 text-[9px] font-bold uppercase text-green-600 dark:text-green-400">
      🎓 Verified Lecturer
    </span>
  );
}
````

## File: src/components/common/LoadingSpinner.tsx
````typescript
export function LoadingSpinner({ size = 24 }: { size?: number }) {
  return (
    <div className="flex justify-center py-8">
      <div
        className="animate-spin rounded-full border-2 border-slate-300 border-t-blue-600"
        style={{ width: size, height: size }}
      />
    </div>
  );
}
````

## File: src/components/common/PageLoader.tsx
````typescript
export function PageLoader() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="h-8 w-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
    </div>
  );
}
````

## File: src/components/common/SearchBar.tsx
````typescript
import { Search, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, onClear, placeholder = "Search..." }: Props) {
  return (
    <div className="relative mb-3">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {value && (
        <button onClick={onClear} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" aria-label="Clear search">
          <X size={14} />
        </button>
      )}
    </div>
  );
}
````

## File: src/components/common/Toast.tsx
````typescript
import { Check, AlertCircle, X } from "lucide-react";
import { useEffect } from "react";

interface Props {
  message: string;
  type?: "ok" | "err";
  onClose: () => void;
}

export function Toast({ message, type = "ok", onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-2 duration-200 flex items-center gap-2 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-xl ${
        type === "ok" ? "bg-emerald-600" : "bg-red-600"
      }`}
    >
      {type === "ok" ? <Check size={13} /> : <AlertCircle size={13} />}
      {message}
      <button onClick={onClose} className="ml-1" aria-label="Dismiss"><X size={12} /></button>
    </div>
  );
}
````

## File: src/components/community/DirectMessageDrawer.tsx
````typescript
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCommunities, getUserMemberships } from "../../features/communities/services/communities.service";

import { Send, ArrowLeft, Loader2 } from "lucide-react";
import { fetchConversation, sendDirectMessage, type DirectMessageWithProfile } from "../../features/messages/services/messages.service";
import { useAuthStore } from "../../store/authStore";

import { useToastStore } from "../../store/toastStore";
interface Props {
  open: boolean;
  onClose: () => void;
  receiverId: string;
  receiverName: string;
}

export default function DirectMessageDrawer({ open, onClose, receiverId, receiverName }: Props) {
  const user = useAuthStore((s) => s.user);
  const { showToast } = useToastStore();
  const [messages, setMessages] = useState<DirectMessageWithProfile[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUser = useAuthStore((s) => s.user);
  const { data: commonGroups } = useQuery({
    queryKey: ["commonGroups", currentUser?.id, receiverId],
    queryFn: async () => {
      if (!currentUser || !receiverId) return [];
      const [myMemberships, theirMemberships] = await Promise.all([
        getUserMemberships(currentUser.id),
        getUserMemberships(receiverId),
      ]);
      const commonIds = [...myMemberships].filter((id) => theirMemberships.has(id));
      if (commonIds.length === 0) return [];
      const allCommunities = await fetchCommunities();
      return allCommunities.filter((c) => commonIds.includes(c.id) && c.type === "study");
    },
    enabled: !!currentUser && !!receiverId,
  });


  useEffect(() => {
    if (!open || !user) return;
    setLoading(true);
    fetchConversation(user.id, receiverId)
      .then((msgs) => {
        setMessages(msgs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [open, user, receiverId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMsg.trim() || !user) return;
    setSending(true);
    try {
      const msg = await sendDirectMessage(user.id, receiverId, newMsg.trim());
      setMessages((prev) => [...prev, msg]);
      setNewMsg("");
    } catch (err) {
      console.error(err);
      showToast("Failed to send message", "err");
    } finally {
      setSending(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl animate-slide-up flex flex-col"
        style={{ maxHeight: "85vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 min-h-[44px] border-b border-slate-200 dark:border-slate-800">
          <button onClick={onClose} className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Close DM">
            <ArrowLeft size={24} />
          </button>
          <h2 className="font-bold text-lg">{receiverName}</h2>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin" size={24} />
            </div>
          ) : (
            messages.map((msg) => (
              <DirectMessageBubble
                key={msg.id}
                message={msg}
                isMine={msg.sender_id === user?.id}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>


        {commonGroups && commonGroups.length > 0 && (
          <div className="px-4 py-2 bg-blue-50 dark:bg-blue-950/20 border-t border-blue-200 dark:border-blue-800">
            <p className="text-xs font-semibold">
              You're both in <span className="font-bold">{commonGroups[0].name}</span>
            </p>
            <button
              onClick={() => {
                const inviteUrl = `${window.location.origin}/community/${commonGroups[0].id}/join`;
                navigator.clipboard.writeText(inviteUrl);
                alert("Invite link copied!");
              }}
              className="text-xs text-blue-600 underline mt-1"
            >
              Copy invite link
            </button>
          </div>
        )}

        {/* Input */}

        <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="Message..."
            className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-3 min-h-[44px] outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!newMsg.trim() || sending}
            className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center bg-blue-600 text-white rounded-full disabled:opacity-50 transition-all duration-200 motion-safe:active:scale-[0.98] hover:shadow-md"
          >
            {sending ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}

function DirectMessageBubble({ message, isMine }: { message: DirectMessageWithProfile; isMine: boolean }) {
  const senderName = message.profiles?.username ?? "Unknown";

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] ${isMine ? "order-2" : "order-1"}`}>
        {!isMine && (
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 block">
            {senderName}
          </span>
        )}
        <div
          className={`p-3 rounded-2xl text-sm ${
            isMine
              ? "bg-blue-600 text-white rounded-br-md"
              : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-md"
          }`}
        >
          <p>{message.content}</p>
          <div className={`text-[10px] mt-1 ${isMine ? "text-blue-200" : "text-slate-400"}`}>
            {new Date(message.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      </div>
    </div>
  );
}
````

## File: src/components/feed/FeedAd.tsx
````typescript
// src/components/ads/FeedAd.tsx

/**
 * Ad unit for the home feed.
 *
 * Replace the placeholder div with your real AdSense <ins> snippet
 * once your account is approved and you have the ad unit code.
 *
 * Example:
 *   <ins className="adsbygoogle"
 *        style={{ display: "block" }}
 *        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
 *        data-ad-slot="1234567890"
 *        data-ad-format="auto"
 *        data-full-width-responsive="true" />
 *   <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
 */

export default function FeedAd() {
  return (
    <div className="my-4 rounded-2xl overflow-hidden bg-white/70 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/70 p-3 flex items-center justify-center min-h-[100px]">
      <span className="text-xs text-slate-400 dark:text-slate-500 select-none">
        Ad
      </span>
    </div>
  );
}
````

## File: src/components/feed/FeedToggle.tsx
````typescript
// src/components/feed/FeedToggle.tsx
export default function FeedToggle({
  active,
  onChange,
}: {
  active: "hot" | "new" | "takes";
  onChange: (mode: "hot" | "new" | "takes") => void;
}) {
  return (
    <div className="flex bg-slate-200 dark:bg-slate-800 rounded-full p-1 mb-4">
      <button
        onClick={() => onChange("hot")}
        className={`flex-1 text-sm font-medium py-2 rounded-full transition ${
          active === "hot"
            ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600"
            : "text-slate-500"
        }`}
      >
        🔥 Hot
      </button>
      <button
        onClick={() => onChange("new")}
        className={`flex-1 text-sm font-medium py-2 rounded-full transition ${
          active === "new"
            ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600"
            : "text-slate-500"
        }`}
      >
        🕒 New
      </button>
      <button
        onClick={() => onChange("takes")}
        className={`flex-1 text-sm font-medium py-2 rounded-full transition ${
          active === "takes"
            ? "bg-white dark:bg-slate-700 shadow-sm text-purple-600"
            : "text-slate-500"
        }`}
      >
        🎭 Takes
      </button>
    </div>
  );
}
````

## File: src/components/layout/AppShell.tsx
````typescript
import { Suspense, memo } from "react";
import type { ReactNode } from "react";
import MobileNavbar from "./MobileNavbar";
import BottomNavigation from "./BottomNavigation";
import { useToastStore } from "../../store/toastStore";
import { Toast } from "../common/Toast";

interface AppShellProps {
  children: ReactNode;
}

const AppShell = memo(function AppShell({
  children,
}: AppShellProps) {
  const { toast, hideToast } = useToastStore();
  return (
    <div
      className="
        min-h-screen
        bg-blue-50
        dark:bg-slate-950
        text-slate-900
        dark:text-white
        overflow-x-hidden
        flex flex-col
      "
    >
      {/* Fixed top navigation */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <MobileNavbar />
      </header>

      {/* Main content */}
      <main
        className="

          mx-auto
          w-full
          max-w-lg
          px-3
          pt-20
          pb-32
          animate-in
          fade-in
          slide-in-from-bottom-4
          duration-300
          flex-1
        "
      >

        <Suspense
          fallback={
            <div className="flex items-center justify-center py-12">
              <div
                className="
                  h-8
                  w-8
                  rounded-full
                  border-2
                  border-blue-500
                  border-t-transparent
                  animate-spin
                "
              />
            </div>
          }
        >
          {children}
        </Suspense>
      </main>

      {/* Fixed bottom navigation */}
      <footer className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavigation />
      </footer>
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
});

export default AppShell;
````

## File: src/components/layout/BottomNavigation.tsx
````typescript
import { House, BookOpen, MessagesSquare, Megaphone } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function BottomNavigation() {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center gap-1 relative py-1 px-2 min-h-[44px] min-w-[44px] motion-safe:active:scale-[0.98] motion-safe:transition-all duration-200
    ${isActive
      ? "text-blue-600 dark:text-cyan-400 font-semibold scale-110"
      : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
    }`;


  const ActiveDot = () => (
    <span className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-blue-600 dark:bg-cyan-400" />
  );


  const links = [
    { to: "/",             icon: <House size={22} />,          label: "Home"      },
    { to: "/announcements",icon: <Megaphone size={22} />,      label: "Bulletin"  },
    { to: "/study",        icon: <BookOpen size={22} />,       label: "Study"     },
    { to: "/community",    icon: <MessagesSquare size={22} />, label: "Community" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-100 dark:border-slate-900 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2.5 px-2 pb-[max(10px,env(safe-area-inset-bottom))]">

        {links.map(({ to, icon, label }) => (
          <NavLink key={to} to={to} end={to === "/"} className={navClass}>
            {({ isActive }) => (
              <>
                {icon}
                <span className="text-[10px] font-medium">{label}</span>
                {isActive && <ActiveDot />}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
````

## File: src/components/layout/MobileNavbar.tsx
````typescript
import { useEffect, useRef, useState } from "react";
import {
  Moon, Sun, User, LogOut, Shield, ChevronDown, MapPinned, Calendar,
  MessageCircleQuestion, Radio, Search, MessageSquare,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { useThemeStore } from "../../store/themeStore";
import { useAuthStore } from "../../store/authStore";
import { fetchProfile } from "../../features/profile/services/profile.service";
import { useUserRole } from "../../hooks/useUserRole";

import { NotificationBell } from "../notifications/NotificationBell";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { role } = useUserRole();
  const darkMode = useThemeStore((s) => s.theme === "dark");
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    async function loadProfile() {
      if (!user?.id) return;
      try {
        const profile = await fetchProfile(user.id);
        if (profile?.username) setUsername(profile.username);
        if (profile?.avatar_url) setAvatarUrl(profile.avatar_url);
      } catch (error) { console.error(error); }
    }
    loadProfile();
  }, [user?.id]);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = username || "User";
  const showAdminBadge = role === "admin" || role === "moderator";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/85 dark:bg-slate-950/85 border-b border-slate-200 dark:border-slate-800 supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]">
        <div className="h-14 sm:h-16 px-4 flex items-center justify-between max-w-lg mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 min-w-0">
            <div className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black shadow-lg text-sm sm:text-base">
              W
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-black leading-none truncate">WARREN</h1>
              <p className="text-[9px] sm:text-[10px] opacity-60 truncate">Global Student Network</p>
            </div>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <NotificationBell />

            <div ref={menuRef} className="relative">
              <button
                onClick={() => setOpen((v) => !v)}
                className="relative flex items-center gap-1.5 pl-1.5 pr-2 h-10 sm:h-11 min-w-[44px] rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all duration-200 motion-safe:active:scale-[0.98]"
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt={displayName} className="h-6 w-6 sm:h-7 sm:w-7 rounded-full object-cover" />
                ) : (
                  <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <ChevronDown size={14} className="hidden sm:block" />
                {/* Admin/Mod badge on avatar button */}
                {showAdminBadge && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-500 ring-2 ring-white dark:ring-slate-950">
                    <Shield size={8} className="text-white" />
                  </span>
                )}
              </button>

              {open && (
                <div className="absolute right-0 top-12 w-52 sm:w-60 max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                  {/* Profile summary – extra compact */}
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt={displayName} className="h-8 w-8 rounded-full object-cover" />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                          {displayName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-xs font-semibold truncate">{displayName}</p>
                        <p className="text-[10px] opacity-60 capitalize">{role || "student"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Links – ultra compact */}
                  <div className="py-0.5">
                    <DropdownLink to="/profile" icon={<User size={14} />} label="Profile" />
                    <DropdownLink to="/messages" icon={<MessageSquare size={14} />} label="Messages" />
                    <DropdownLink to="/campus-map" icon={<MapPinned size={14} />} label="Campus Map" />
                    <DropdownLink to="/events" icon={<Calendar size={14} />} label="Events" />
                    <DropdownLink to="/search" icon={<Search size={14} />} label="Search" />
                    <DropdownLink to="/ask-senior" icon={<MessageCircleQuestion size={14} />} label="Ask a Senior" />
                    <DropdownLink to="/live" icon={<Radio size={14} />} label="Live Rooms" />

                    {(role === "admin" || role === "moderator") && (
                      <DropdownLink to="/moderator" icon={<Shield size={14} />} label="Mod Dashboard" />
                    )}
                    {role === "admin" && (
                      <DropdownLink to="/admin" icon={<Shield size={14} />} label="Admin Dashboard" />
                    )}
                  </div>

                  {/* Actions – ultra compact */}
                  <div className="border-t border-slate-100 dark:border-slate-800 py-0.5">
                    <button
                      onClick={() => { toggleTheme(); setOpen(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 min-h-[44px] text-xs text-left active:bg-slate-100 dark:active:bg-slate-800 transition-colors duration-200"
                    >
                      {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                      {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                    <button
                      onClick={() => { logout(); setOpen(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 min-h-[44px] text-xs text-left text-red-500 active:bg-red-50 dark:active:bg-red-950/30 transition-colors duration-200"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>

                  {/* Legal links – super subtle */}
                  <div className="border-t border-slate-100 dark:border-slate-800 px-3 py-2 text-center">
                    <Link to="/about" className="text-[10px] text-slate-400 dark:text-slate-500 hover:underline">About</Link>
                    <span className="mx-1.5 text-slate-300 dark:text-slate-600">·</span>
                    <Link to="/privacy" className="text-[10px] text-slate-400 dark:text-slate-500 hover:underline">Privacy</Link>
                    <span className="mx-1.5 text-slate-300 dark:text-slate-600">·</span>
                    <Link to="/terms" className="text-[10px] text-slate-400 dark:text-slate-500 hover:underline">Terms</Link>
                    <span className="mx-1.5 text-slate-300 dark:text-slate-600">·</span>
                    <Link to="/contact" className="text-[10px] text-slate-400 dark:text-slate-500 hover:underline">Contact</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="h-14 sm:h-16" />
    </>
  );
}

/** Tiny helper for dropdown links */
function DropdownLink({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 px-3 py-2 min-h-[44px] text-xs active:bg-slate-100 dark:active:bg-slate-800 transition-colors duration-200"
    >
      {icon}
      {label}
    </Link>
  );
}
````

## File: src/components/leaderboard/Leaderboard.tsx
````typescript
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import type { Database } from "../../types/database.types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function Leaderboard() {
  const [users, setUsers] = useState<Pick<Profile, "username" | "avatar_url" | "karma">[]>([]);

  useEffect(() => {
    supabase.from("profiles").select("username, avatar_url, karma").order("karma", { ascending: false }).limit(10).then(({ data }) => setUsers((data ?? []) as Pick<Profile, "username" | "avatar_url" | "karma">[]));
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4">
      <h3 className="font-bold mb-3">🏆 Weekly Leaderboard</h3>
      {users.map((u, i) => (
        <div key={i} className="flex items-center gap-3 py-2 border-b last:border-0">
          <span className="text-sm font-bold w-6">{i + 1}</span>
          <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">{u.username?.[0]?.toUpperCase()}</div>
          <span className="text-sm">{u.username}</span>
          <span className="ml-auto text-xs font-semibold text-amber-600">{u.karma} ⚡</span>
        </div>
      ))}
    </div>
  );
}
````

## File: src/components/notifications/NotificationBell.tsx
````typescript
import { Bell } from "lucide-react";
import { useNotificationsStore } from "../../features/notifications/store/notifications.store";
import { useNavigate } from "react-router-dom";

export function NotificationBell() {
  const unreadCount = useNotificationsStore((s) => s.unreadCount);
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/notifications")} className="relative p-2" aria-label="Notifications">
      <Bell size={20} />
      {unreadCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </button>
  );
}
````

## File: src/components/pwa/InstallBanner.tsx
````typescript
import { useState, useEffect } from "react";
import { Download, X, Share } from "lucide-react";

/**
 * InstallBanner – shows a floating banner for Android/Desktop,
 * and an iOS instruction modal when on iPhone/iPad.
 *
 * Uses localStorage with a 30‑day dismissal.
 */

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  useEffect(() => {
    // Already installed?
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as any).standalone === true;
    if (standalone) return;

    // Dismissed recently?
    const dismissedAt = localStorage.getItem("pwa-install-dismissed-at");
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    if (dismissedAt && Date.now() - parseInt(dismissedAt) < thirtyDays) return;

    // iOS detection
    const ua = navigator.userAgent;
    const isIPadOS =
      navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    const ios = /iPad|iPhone|iPod/.test(ua) || isIPadOS;

    if (ios) {
      setIsIOS(true);
      const timer = setTimeout(() => setShowBanner(true), 2000);
      return () => clearTimeout(timer);
    }

    // Android / Desktop
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    // Fallback if the event never fires
    const fallback = setTimeout(() => {
      if (!deferredPrompt) setShowBanner(true);
    }, 3000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(fallback);
    };
  }, []);

  const handleInstall = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } else {
      // Fallback: generic install hint
      alert("You can install this app from your browser menu.");
      setShowBanner(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("pwa-install-dismissed-at", String(Date.now()));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Floating Banner */}
      <div className="fixed bottom-24 left-4 right-4 z-50">
        <div className="relative overflow-hidden rounded-3xl border border-blue-100 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 p-4 pr-10 shadow-2xl backdrop-blur-md">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500" />

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black shadow-md shadow-blue-500/20">
                W
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
                  App Available
                </p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Install Warren App
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Add to home screen for native experience
                </p>
              </div>
            </div>

            <button
              onClick={handleInstall}
              className="flex items-center gap-1.5 rounded-2xl bg-blue-600 dark:bg-blue-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-600/20 hover:scale-[1.02] active:scale-95 transition-all duration-200 shrink-0"
            >
              <Download size={13} />
              Install
            </button>
          </div>

          <button
            onClick={handleDismiss}
            className="absolute top-3.5 right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors duration-150"
            aria-label="Dismiss banner"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* iOS Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/40 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setShowIOSModal(false)} />
          <div className="relative w-full max-w-lg rounded-t-[32px] border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 pb-8 shadow-2xl animate-slide-up text-left">
            <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-slate-300 dark:bg-slate-700" />
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                  Install on iPhone / iPad
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Add Warren to your home screen in 3 steps
                </p>
              </div>
              <button
                aria-label="Close"
                onClick={() => setShowIOSModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors duration-150"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 py-2">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-sm font-bold border border-blue-100 dark:border-blue-900/30">1</div>
                <div className="text-sm">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Tap the Share button</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                    Click the share button{" "}
                    <span className="inline-flex p-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      <Share size={12} />
                    </span>{" "}
                    at the bottom of Safari.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-sm font-bold border border-blue-100 dark:border-blue-900/30">2</div>
                <div className="text-sm">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Select "Add to Home Screen"</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Scroll down the share sheet and tap <strong>"Add to Home Screen"</strong>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-sm font-bold border border-blue-100 dark:border-blue-900/30">3</div>
                <div className="text-sm">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Confirm by tapping "Add"</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Tap <strong>"Add"</strong> in the top‑right corner to complete.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-6 w-full rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 py-3 text-sm font-bold text-slate-800 dark:text-slate-200 transition-colors duration-200"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
````

## File: src/components/ui/PullToRefresh.tsx
````typescript
import { useState, useRef, useEffect, useCallback } from "react";

export default function PullToRefresh({
  onRefresh,
  children,
}: {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}) {
  const [refreshing, setRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);
  const pullingRef = useRef(false);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (containerRef.current!.scrollTop > 0) return;
    startYRef.current = e.touches[0].clientY;
    pullingRef.current = true;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!pullingRef.current) return;
    const diff = e.touches[0].clientY - startYRef.current;
    if (diff > 0) {
      setPullDistance(Math.min(diff * 0.5, 80)); // damping
    }
  }, []);

  const handleTouchEnd = useCallback(async () => {
    if (!pullingRef.current) return;
    pullingRef.current = false;
    if (pullDistance > 40) {
      setRefreshing(true);
      await onRefresh();
      setRefreshing(false);
    }
    setPullDistance(0);
  }, [pullDistance, onRefresh]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: true });
    el.addEventListener("touchend", handleTouchEnd);
    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <div ref={containerRef} className="overflow-y-auto h-full">
      <div
        className="flex items-center justify-center transition-transform"
        style={{ height: pullDistance, opacity: pullDistance / 80 }}
      >
        {refreshing ? (
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        ) : (
          <span className="text-sm text-slate-500">↓ Pull to refresh</span>
        )}
      </div>
      {children}
    </div>
  );
}
````

## File: src/features/auth/hooks/useAuth.ts
````typescript
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/authStore";

export function useLogin() {
  const storeLogin = useAuthStore((s) => s.login);
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const result = await storeLogin(email, password);
      if (result.error) throw new Error(result.error);
      return result;
    },
    onError: () => {},
  });
}

export function useRegister() {
  const storeRegister = useAuthStore((s) => s.register);
  return useMutation({
    mutationFn: async ({
      email,
      password,
      username,
    }: {
      email: string;
      password: string;
      username: string;
    }) => {
      const result = await storeRegister(email, password, username);
      if (result.error) throw new Error(result.error);
      return result;
    },
    onError: () => {},
  });
}

export function useLogout() {
  const storeLogout = useAuthStore((s) => s.logout);
  return useMutation({
    mutationFn: async () => {
      await storeLogout();
    },
  });
}
````

## File: src/features/auth/services/auth.service.ts
````typescript
import { supabase } from "../../../lib/supabase";
import type { AuthResponse } from "@supabase/supabase-js";

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signUp(email: string, password: string): Promise<AuthResponse> {
  return supabase.auth.signUp({ email, password });
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

export async function resetPassword(email: string): Promise<void> {
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/update-password`,
  });
}
````

## File: src/features/communities/components/CommunityCard.tsx
````typescript
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Plus, UserX, MessageCircle, Phone } from "lucide-react";
import { useToastStore } from "../../../store/toastStore";
import type { Community } from "../../../types/community";

interface Props {
  community: Community;
  memberCount: number;
  isJoined: boolean;
  isJoining: boolean;
  canManage: boolean;
  onToggleMembership: (id: string) => void;
  onManageMembers: (id: string) => void;
}

function CommunityCard({
  community,
  memberCount,
  isJoined,
  isJoining,
  canManage,
  onToggleMembership,
  onManageMembers,
}: Props) {
  const navigate = useNavigate();
  const { showToast } = useToastStore();

  const handleCardClick = () => {
    if (isJoined) {
      navigate(`/community/${community.id}/chat`);
    } else {
      showToast("Join the community to chat!");
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${community.cover_color} p-5 shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer`}
      title={isJoined ? "Open chat" : "Join to chat"}
    >
      {/* Background icon */}
      <div className="absolute -bottom-4 -right-4 text-6xl opacity-20 select-none pointer-events-none">
        {community.icon}
      </div>

      <div className="relative z-10">
        {/* Header row */}
        <div className="flex items-start justify-between mb-2">
          <div className="text-3xl">
            {community.icon.startsWith("http") ? (
              <img src={community.icon} alt="" className="w-8 h-8 rounded-lg object-cover" />
            ) : (
              community.icon
            )}
          </div>
          <div className="flex items-center gap-1.5">
            {canManage && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onManageMembers(community.id);
                }}
                className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30"
                title="Manage members"
              >
                <UserX size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Name & Description */}
        <h3 className="font-bold text-white text-lg leading-tight mb-1">
          {community.name}
        </h3>
        <p className="text-white/80 text-sm line-clamp-2 mb-3">
          {community.description}
        </p>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-white/90 text-xs font-medium">
            <Users size={14} />
            <span>
              {memberCount} {memberCount === 1 ? "member" : "members"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isJoined ? (
              <>
                <span className="flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  <MessageCircle size={14} />
                  Open Chat
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/community/${community.id}/room`);
                  }}
                  className="flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-white/30"
                  title="Open Study Room"
                >
                  <Phone size={14} />
                  Study Room
                </button>
              </>
            ) : (

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleMembership(community.id);
                }}
                disabled={isJoining}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white text-slate-900 hover:bg-white/90 disabled:opacity-60"
              >
                <Plus size={14} /> Join
              </button>
            )}
          </div>


        </div>
      </div>
    </div>
  );
}

export default memo(CommunityCard);
````

## File: src/features/communities/components/CommunityGrid.tsx
````typescript
import CommunityCard from "./CommunityCard";
import type { Community } from "../../../types/community";

interface Props {
  communities: Community[];
  memberCounts: Record<string, number>;
  userMemberships: Set<string>;
  isJoining: boolean;
  canManage: (community: Community) => boolean;
  onToggleMembership: (communityId: string) => void;
  onManageMembers: (communityId: string) => void;
}

export function CommunityGrid({
  communities,
  memberCounts,
  userMemberships,
  isJoining,
  canManage,
  onToggleMembership,
  onManageMembers,
}: Props) {
  if (communities.length === 0) {
    return (
      <div className="text-center py-12 opacity-60">
        <span className="text-6xl mb-4 block">🏕️</span>
        <p className="font-bold text-xl">No communities found</p>
        <p className="text-sm mt-2">Try changing filters or wait for admins to add them.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {communities.map((community) => (
        <CommunityCard
          key={community.id}
          community={community}
          memberCount={memberCounts[community.id] ?? 0}
          isJoined={userMemberships.has(community.id)}
          isJoining={isJoining}
          canManage={canManage(community)}
          onToggleMembership={() => onToggleMembership(community.id)}
          onManageMembers={onManageMembers}
        />
      ))}
    </div>
  );
}
````

## File: src/features/communities/components/CommunityMembersDrawer.tsx
````typescript
import { useEffect, useState } from "react";
import { X, MessageCircle } from "lucide-react";
import { fetchMembers, kickMember } from "../../../features/communities/services/communities.service";
import { useAuthStore } from "../../../store/authStore";

interface Props {
  communityId: string;
  open: boolean;
  onClose: () => void;
  onMembersChanged?: () => void;
  onDirectMessage?: (userId: string) => void;
}

type Member = {
  user_id: string;
  username: string | null;
  avatar_url: string | null;
};

export default function CommunityMembersDrawer({
  communityId,
  open,
  onClose,
  onMembersChanged,
  onDirectMessage,
}: Props) {
  const user = useAuthStore((s) => s.user);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !communityId) return;
    (async () => {
      setLoading(true);
      try {
        const list = await fetchMembers(communityId);
        setMembers(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [open, communityId]);

  const handleKick = async (userId: string) => {
    if (!confirm("Kick this member?")) return;
    try {
      await kickMember(communityId, userId);
      setMembers((prev) => prev.filter((m) => m.user_id !== userId));
      onMembersChanged?.();
    } catch (err) {
      console.error(err);
      alert("Failed to kick member.");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl p-4 animate-slide-up max-h-[60vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">Members</h2>
          <button onClick={onClose} className="p-2" aria-label="Close members drawer">
            <X size={18} />
          </button>
        </div>

        {loading ? (
          <p className="text-center text-sm opacity-60 py-4">Loading…</p>
        ) : members.length === 0 ? (
          <p className="text-center text-sm opacity-60 py-4">No members</p>
        ) : (
          <div className="overflow-y-auto max-h-[50vh] space-y-2">
            {members.map((m) => (
              <div
                key={m.user_id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {m.avatar_url ? (
                    <img
                      src={m.avatar_url}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {m.username?.[0]?.toUpperCase()}
                    </div>
                  )}
                  <span className="font-medium text-sm truncate">
                    {m.username ?? "Unknown"}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {user?.id !== m.user_id && (
                    <button
                      onClick={() => onDirectMessage?.(m.user_id)}
                      className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg"
                      title="Send direct message"
                      aria-label={`Message ${m.username}`}
                    >
                      <MessageCircle size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => handleKick(m.user_id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg"
                    title="Kick member"
                    aria-label={`Kick ${m.username}`}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
````

## File: src/features/communities/hooks/useCommunities.ts
````typescript
import { useQuery } from "@tanstack/react-query";
import { useCommunitiesStore } from "../store/communities.store";
import {
  fetchCommunities,
  fetchParentSchools,
  getMemberCounts,
  getUserMemberships,
} from "../services/communities.service";
import { useAuthStore } from "../../../store/authStore";

export function useCommunities() {
  const filterType = useCommunitiesStore((s) => s.filterType);
  const selectedParentId = useCommunitiesStore((s) => s.selectedParentId);
  const selectedYear = useCommunitiesStore((s) => s.selectedYear);
  const user = useAuthStore((s) => s.user);

  const communitiesQuery = useQuery({
    queryKey: ["communities", filterType, selectedParentId, selectedYear],
    queryFn: async () => {
      let data = await fetchCommunities(filterType === "all" ? undefined : filterType);
      if (filterType === "educational") {
        data = data.filter((c) => c.parent_id !== null);
        if (selectedParentId) data = data.filter((c) => c.parent_id === selectedParentId);
        if (selectedYear) data = data.filter((c) => c.year === selectedYear);
      } else if (filterType === "social") {
        data = data.filter((c) => c.type === "social");
      } else {
        data = data.filter((c) => c.type === "social" || c.parent_id !== null);
      }
      return data;
    },
  });

  const parentSchoolsQuery = useQuery({
    queryKey: ["parentSchools"],
    queryFn: fetchParentSchools,
    staleTime: Infinity,
  });

  const memberCountsQuery = useQuery({
    queryKey: ["communityMemberCounts", communitiesQuery.data?.map((c) => c.id)],
    queryFn: () => getMemberCounts(communitiesQuery.data?.map((c) => c.id) ?? []),
    enabled: !!communitiesQuery.data && communitiesQuery.data.length > 0,
  });

  const membershipsQuery = useQuery({
    queryKey: ["userMemberships", user?.id],
    queryFn: () => getUserMemberships(user!.id),
    enabled: !!user,
  });

  return {
    communities: communitiesQuery.data ?? [],
    parentSchools: parentSchoolsQuery.data ?? [],
    memberCounts: memberCountsQuery.data ?? {},
    userMemberships: membershipsQuery.data ?? new Set(),
    isLoading: communitiesQuery.isLoading,
    refetch: communitiesQuery.refetch,
  };
}
````

## File: src/features/communities/hooks/useCommunityMembership.ts
````typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinCommunity, leaveCommunity } from "../services/communities.service";

export function useCommunityMembership() {
  const queryClient = useQueryClient();

  const joinMutation = useMutation({
    mutationFn: (communityId: string) => joinCommunity(communityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userMemberships"] });
      queryClient.invalidateQueries({ queryKey: ["communityMemberCounts"] });
    },
  });

  const leaveMutation = useMutation({
    mutationFn: (communityId: string) => leaveCommunity(communityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userMemberships"] });
      queryClient.invalidateQueries({ queryKey: ["communityMemberCounts"] });
    },
  });

  return {
    join: joinMutation.mutate,
    leave: leaveMutation.mutate,
    isJoining: joinMutation.isPending || leaveMutation.isPending,
  };
}
````

## File: src/features/communities/services/communities.service.ts
````typescript
import { supabase } from "../../../lib/supabase";
import type { Database } from "../../../types/database.types";

type Community = Database["public"]["Tables"]["communities"]["Row"];

export async function fetchCommunities(type?: string | null, parentId?: string | null, year?: string | null): Promise<Community[]> {
  let query = supabase.from("communities").select("*").order("created_at", { ascending: false });
  if (type && type !== "all") query = query.eq("type", type);
  if (parentId !== undefined) {
    if (parentId === null) query = query.is("parent_id", null);
    else query = query.eq("parent_id", parentId);
  }
  if (year) query = query.eq("year", year);
  const { data, error } = await query;
  if (error) throw error;
  return data as Community[];
}

export async function fetchParentSchools(): Promise<Community[]> {
  return fetchCommunities("educational", null, undefined);
}

export async function getMemberCounts(communityIds: string[]): Promise<Record<string, number>> {
  if (communityIds.length === 0) return {};
  const { data } = await supabase.from("community_members").select("community_id").in("community_id", communityIds);
  const counts: Record<string, number> = {};
  data?.forEach((m) => {
    counts[m.community_id] = (counts[m.community_id] ?? 0) + 1;
  });
  return counts;
}

export async function getUserMemberships(userId: string): Promise<Set<string>> {
  const { data } = await supabase.from("community_members").select("community_id").eq("user_id", userId);
  return new Set(data?.map((m) => m.community_id) ?? []);
}

export async function joinCommunity(communityId: string): Promise<void> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");
  const { error } = await supabase.from("community_members").insert({ community_id: communityId, user_id: user.id });
  if (error) throw error;
}

export async function leaveCommunity(communityId: string): Promise<void> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");
  const { error } = await supabase
    .from("community_members")
    .delete()
    .eq("community_id", communityId)
    .eq("user_id", user.id);
  if (error) throw error;
}

export async function kickMember(communityId: string, userId: string): Promise<void> {
  const { error } = await supabase.from("community_members").delete().eq("community_id", communityId).eq("user_id", userId);
  if (error) throw error;
}

export async function fetchMembers(communityId: string) {
  const { data, error } = await supabase
    .from("community_members")
    .select("user_id, profiles(username, avatar_url)")
    .eq("community_id", communityId);
  if (error) throw error;
  return (data ?? []).map((m: any) => ({
    user_id: m.user_id,
    username: m.profiles?.username ?? "Unknown",
    avatar_url: m.profiles?.avatar_url ?? null,
  }));
}

export async function createCommunity(
  data: Omit<Community, "id" | "created_by" | "created_at" | "updated_at">
): Promise<Community> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");

  const { data: result, error } = await supabase
    .from("communities")
    .insert({ ...data, created_by: user.id })
    .select()
    .single();
  if (error) throw error;

  // Auto‑join the creator
  const { error: joinError } = await supabase.from("community_members").insert({
    community_id: result.id,
    user_id: user.id,
  });
  if (joinError) console.warn("Could not auto‑join creator", joinError);

  return result as Community;
}

export async function updateCommunity(
  id: string,
  updates: Partial<Omit<Community, "id" | "created_by" | "created_at" | "updated_at">
>): Promise<Community> {
  const { data, error } = await supabase
    .from("communities")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Community;
}

export async function deleteCommunity(id: string): Promise<void> {
  const { error } = await supabase.from("communities").delete().eq("id", id);
  if (error) throw error;
}
````

## File: src/features/communities/store/communities.store.ts
````typescript
import { create } from "zustand";

type FilterType = "all" | "social" | "educational";

interface CommunitiesUIState {
  filterType: FilterType;
  selectedParentId: string | null;
  selectedYear: string | null;
  setFilterType: (t: FilterType) => void;
  setSelectedParentId: (id: string | null) => void;
  setSelectedYear: (year: string | null) => void;
}

export const useCommunitiesStore = create<CommunitiesUIState>((set) => ({
  filterType: "all",
  selectedParentId: null,
  selectedYear: null,
  setFilterType: (t) => set({ filterType: t, selectedParentId: null, selectedYear: null }),
  setSelectedParentId: (id) => set({ selectedParentId: id }),
  setSelectedYear: (year) => set({ selectedYear: year }),
}));
````

## File: src/features/events/components/EventDrawer.tsx
````typescript
import { useEffect, useMemo, useState } from "react";
import { Bell, BellOff, Clock, MapPin, X } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import { getReminderStatus, toggleReminder } from "../../../services/eventsService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";

type Event = {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  community_id: string | null;
  created_by: string;
};

interface Props {
  event: Event | null;
  onClose: () => void;
}

export function EventDrawer({ event, onClose }: Props) {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();
  const [communityName, setCommunityName] = useState<string>("");

  const eventDate = useMemo(() => {
    if (!event?.event_date) return null;
    const d = new Date(event.event_date);
    if (Number.isNaN(d.getTime())) return null;
    return d;
  }, [event?.event_date]);

  // Fetch reminder status
  const { data: isReminded, refetch } = useQuery({
    queryKey: ["eventReminder", event?.id, user?.id],
    queryFn: async () => {
      if (!event || !user) return false;
      return getReminderStatus(event.id, user.id);
    },
    enabled: !!event && !!user,
  });

  // Fetch community name if event has community_id
  useEffect(() => {
    let cancelled = false;

    async function loadCommunity() {
      if (!event?.community_id) return;
      const { data, error } = await supabase
        .from("communities")
        .select("name")
        .eq("id", event.community_id)
        .single();

      if (!cancelled && !error && data?.name) setCommunityName(data.name);
    }

    loadCommunity();
    return () => {
      cancelled = true;
    };
  }, [event?.community_id]);

  const handleToggleReminder = async () => {
    if (!event || !user) return;
    await toggleReminder(event.id, user.id);
    refetch();
    queryClient.invalidateQueries({ queryKey: ["eventReminder"] });
  };

  if (!event) return null;

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40" />
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 rounded-t-[24px] max-h-[70vh] overflow-y-auto border-t border-slate-200 dark:border-slate-700/60 animate-slide-up">
        <div className="w-9 h-1 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mt-3" />

        <div className="flex items-center justify-between px-4 py-3 mt-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Event Details</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm"
            aria-label="Close drawer"
            type="button"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-5 pt-2 pb-10 space-y-4">
          <h3 className="text-xl font-black text-slate-900 dark:text-white leading-snug">{event.title}</h3>

          {event.description && (
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{event.description}</p>
          )}

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Clock size={16} />
              <span>
                {eventDate
                  ? `${eventDate.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })} at ${eventDate.toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`
                  : "—"}
              </span>
            </div>

            {communityName && (
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <MapPin size={16} />
                <span>{communityName}</span>
              </div>
            )}
          </div>

          {user ? (
            <button
              onClick={handleToggleReminder}
              type="button"
              className={`w-full py-3.5 rounded-2xl text-sm font-bold border transition-colors flex items-center justify-center gap-2 ${
                isReminded
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700"
              }`}
            >
              {isReminded ? (
                <>
                  <Bell size={16} /> Reminded
                </>
              ) : (
                <>
                  <BellOff size={16} /> Remind Me
                </>
              )}
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}
````

## File: src/features/map/components/CampusMap.tsx
````typescript
import { useCallback } from "react";
import { useMapStore } from "../store/map.store";
import { useMapZoom } from "../hooks/useMapZoom";
import { usePinPlacement } from "../hooks/usePinPlacement";
import { useMapFilters } from "../hooks/useMapFilters";
import { MarkerLayer } from "./MarkerLayer";
import { ZoomControls } from "./ZoomControls";
import { SearchResults } from "./SearchResults";
import { PinDrawer } from "./PinDrawer";

import { MapToast } from "./MapToast";
import type { MapPin as MapPinType } from "../../../types/map";

interface Props {
  canManage: boolean;
  onEditPin: (pin: MapPinType) => void;
  onDeletePin: (id: string) => void;
  userPosition?: { lat: number; lng: number } | null;
}



export function CampusMap({ canManage, onEditPin, onDeletePin, userPosition }: Props) {
  void userPosition;


  // Direct store reads (we keep these here because they are UI state only)
  const pins = useMapStore((s) => s.pins);
  const activePin = useMapStore((s) => s.activePin);
  const setActivePin = useMapStore((s) => s.setActivePin);
  const query = useMapStore((s) => s.query);
  const loading = useMapStore((s) => s.loading);
  const error = useMapStore((s) => s.error);
  const placingMode = useMapStore((s) => s.placingMode);

  const { scale, offset, containerRef, handlers, resetTransform, setScale } = useMapZoom();
  const { handleMapClick } = usePinPlacement();
  const { filteredPins } = useMapFilters();

  const handlePinClick = useCallback(
    (pin: MapPinType) => setActivePin(activePin?.id === pin.id ? null : pin),
    [activePin, setActivePin]
  );

  const onMapClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (placingMode) {
        handleMapClick(e, containerRef, scale, offset);
      }
    },
    [placingMode, handleMapClick, containerRef, scale, offset]
  );

  return (
    <div className="flex-1 relative overflow-hidden bg-slate-100 dark:bg-slate-900">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/50 dark:bg-slate-950/50">
          <p className="text-sm text-slate-500">Loading map…</p>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      <ZoomControls
        onZoomIn={() => setScale((prev) => Math.min(prev + 0.2, 3))}
        onZoomOut={() => setScale((prev) => Math.max(prev - 0.2, 0.5))}
        onReset={resetTransform}
      />

      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{ touchAction: "none" }}
        {...handlers}
        onClick={onMapClick}
      >
        <div
          className="absolute top-0 left-0 w-full h-full origin-top-left"
          style={{
            transform: `scale(${scale}) translate(${offset.x / scale}px, ${offset.y / scale}px)`,
            transition: placingMode ? "none" : "transform 0.1s ease-out",
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}campus-map.png`}
            alt="Campus map"
            className="w-full h-full object-contain select-none pointer-events-none"
            draggable={false}
          />
          <MarkerLayer
            pins={pins}
            activePin={activePin}
            filteredIds={new Set(filteredPins.map((p) => p.id))}
            onPinClick={handlePinClick}
          />
          {/* userPosition blue dot would require mapping lat/lng -> map pixel coords; pins currently use x_percent/y_percent */}

        </div>
      </div>

      {query && filteredPins.length > 0 && !activePin && (
        <SearchResults results={filteredPins} onSelect={setActivePin} />
      )}

      {activePin && (
        <PinDrawer
          pin={activePin}
          canManage={canManage}
          onClose={() => setActivePin(null)}
          onEdit={onEditPin}
          onDelete={onDeletePin}
        />
      )}

      <MapToast />
    </div>
  );
}
````

## File: src/features/map/components/CategoryFilter.tsx
````typescript
import { useMapStore } from "../store/map.store";
import { CATEGORIES } from "../utils/categories";

export function CategoryFilter() {
  const activeCategories = useMapStore((s) => s.activeCategories);
  const toggleCategory = useMapStore((s) => s.toggleCategory);
  const clearFilters = useMapStore((s) => s.clearFilters);

  return (
    <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
      <button
        onClick={clearFilters}
        className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
          activeCategories.size === 0
            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
        }`}
      >
        All
      </button>
      {CATEGORIES.map((cat) => {
        const active = activeCategories.has(cat.key);
        return (
          <button
            key={cat.key}
            onClick={() => toggleCategory(cat.key)}
            className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
              active ? `${cat.bg} ${cat.border}` : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
            }`}
            style={{ color: active ? cat.color : undefined }}
          >
            {cat.icon}
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
````

## File: src/features/map/components/MapToast.tsx
````typescript
import { Check, AlertCircle } from "lucide-react";
import { useMapStore } from "../store/map.store";

export function MapToast() {
  const toast = useMapStore((s) => s.toast);
  if (!toast) return null;

  return (
    <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-xl z-[60] transition-all duration-300 ${toast.type === "ok" ? "bg-emerald-600" : "bg-red-600"}`}>
      {toast.type === "ok" ? <Check size={13} /> : <AlertCircle size={13} />}
      {toast.message}
    </div>
  );
}
````

## File: src/features/map/components/MarkerLayer.tsx
````typescript
import { PinMarker } from "./PinMarker";
import type { MapPin as MapPinType } from "../../../types/map";

interface Props {
  pins: MapPinType[];
  activePin: MapPinType | null;
  filteredIds: Set<string>;
  onPinClick: (pin: MapPinType) => void;
}

export function MarkerLayer({ pins, activePin, filteredIds, onPinClick }: Props) {
  return (
    <div className="absolute inset-0">
      {pins.map((pin) => (
        <PinMarker
          key={pin.id}
          pin={pin}
          isActive={activePin?.id === pin.id}
          isFiltered={filteredIds.has(pin.id)}
          onClick={() => onPinClick(pin)}
        />
      ))}
    </div>
  );
}
````

## File: src/features/map/components/PinDrawer.tsx
````typescript
import { X, Pencil, Trash2, Camera, Navigation, ExternalLink, Info } from "lucide-react";


import type { MapPin as MapPinType } from "../../../types/map";
import { getCat } from "../utils/categories";
import { useState } from "react";

interface Props {
  pin: MapPinType;
  canManage: boolean;
  onClose: () => void;
  onEdit: (pin: MapPinType) => void;
  onDelete: (id: string) => void;

  walkthroughActive?: boolean;
  onNext?: () => void;
  firstDayRoutePinIds?: string[];
}

export function PinDrawer({ pin, canManage, onClose, onEdit, onDelete }: Props) {
  const cat = getCat(pin.category);
  const [photoIdx, setPhotoIdx] = useState(0);

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl border-t border-slate-200 dark:border-slate-700 transition-transform duration-300 z-40 overflow-y-auto" style={{ maxHeight: "60vh", padding: "20px 16px 32px", transform: "translateY(0)" }}>
      <div className="w-10 h-1 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mb-4" />
      <div className="flex items-center justify-between mb-3">
        <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${cat.bg} ${cat.border}`} style={{ color: cat.color }}>
          {cat.icon} {cat.label}
        </span>
        <div className="flex items-center gap-2">
          {canManage && (
            <>
              <button onClick={() => onEdit(pin)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500" aria-label="Edit location">
                <Pencil size={15} />
              </button>
              <button onClick={() => onDelete(pin.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-500" aria-label="Delete location">
                <Trash2 size={15} />
              </button>
            </>
          )}
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500" aria-label="Close details">
            <X size={16} />
          </button>
        </div>
      </div>
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1 leading-tight">{pin.title}</h2>
      {pin.photos && pin.photos.length > 0 ? (
        <div className="relative rounded-xl overflow-hidden mb-3 bg-slate-100 dark:bg-slate-800" style={{ height: 160 }}>
          <img src={pin.photos[photoIdx]} alt={`${pin.title} photo ${photoIdx + 1}`} className="w-full h-full object-cover" />
          {pin.photos.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
              {pin.photos.map((_, i) => (
                <button key={i} onClick={() => setPhotoIdx(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === photoIdx ? "bg-white scale-125" : "bg-white/50"}`} aria-label={`Photo ${i + 1}`} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-xl bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center gap-1 mb-3" style={{ height: 100 }}>
          <Camera size={22} className="text-slate-300 dark:text-slate-600" />
          <span className="text-xs text-slate-400 dark:text-slate-500">No photos yet</span>
        </div>
      )}
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">{pin.description}</p>
      {pin.floor && (
        <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
          <Navigation size={13} className="mt-0.5 shrink-0" />
          <span>{pin.floor}</span>
        </div>
      )}
      {pin.hours && (
        <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
          <Info size={13} className="mt-0.5 shrink-0" />
          <span>{pin.hours}</span>
        </div>
      )}
      {pin.contact && (
        <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
          <ExternalLink size={13} className="mt-0.5 shrink-0" />
          <a href={`mailto:${pin.contact}`} className="text-blue-600 dark:text-blue-400 underline">{pin.contact}</a>
        </div>
      )}

      {/* Share button + walkthrough CTA hooks are intentionally left to CampusMapPage for now to avoid stale assumptions. */}

    </div>
  );
}
````

## File: src/features/map/components/PinForm.tsx
````typescript
import { useState, useEffect } from "react";
import { X, MapPin } from "lucide-react";
import { CATEGORIES } from "../utils/categories";
import type { PinCategory } from "../../../types/map";

export interface PinFormData {
  title: string;
  description: string;
  category: PinCategory;
  floor: string;
  hours: string;
  contact: string;
  x_percent: number;
  y_percent: number;
  photos: string[];
}

interface Props {
  initial?: Partial<PinFormData>;
  pendingCoords: { x: number; y: number } | null;
  onSave: (data: PinFormData) => void;
  onCancel: () => void;
  onRequestPlace: () => void;
}

export function PinForm({ initial, pendingCoords, onSave, onCancel, onRequestPlace }: Props) {
  const [form, setForm] = useState<PinFormData>({
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    category: initial?.category ?? "general",
    floor: initial?.floor ?? "",
    hours: initial?.hours ?? "",
    contact: initial?.contact ?? "",
    x_percent: initial?.x_percent ?? 50,
    y_percent: initial?.y_percent ?? 50,
    photos: initial?.photos ?? [],
  });

  useEffect(() => {
    if (pendingCoords) {
      setForm((f) => ({ ...f, x_percent: pendingCoords.x, y_percent: pendingCoords.y }));
    }
  }, [pendingCoords]);

  const valid = form.title.trim() && form.description.trim();

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl border-t border-slate-200 dark:border-slate-700 transition-transform duration-300 z-50 overflow-y-auto" style={{ maxHeight: "90vh", padding: "20px 16px 48px", transform: "translateY(0)" }}>
      <div className="w-10 h-1 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mb-4" />
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">
          {initial?.title ? "Edit Location" : "Add New Location"}
        </h3>
        <button onClick={onCancel} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700" aria-label="Close form">
          <X size={16} className="text-slate-500" />
        </button>
      </div>

      {/* Position selector */}
      <div className="mb-3">
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Pin Position</label>
        <button
          onClick={onRequestPlace}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-blue-400 text-left"
        >
          <MapPin size={15} />
          <span className="text-xs">
            Position set ({Math.round(form.x_percent)}%, {Math.round(form.y_percent)}%) — tap to reposition
          </span>
        </button>
      </div>

      {/* Title */}
      <div className="mb-3">
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Location Name *</label>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. Academic Registrar's Office"
        />
      </div>

      {/* Category */}
      <div className="mb-3">
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Category *</label>
        <div className="grid grid-cols-3 gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setForm({ ...form, category: c.key })}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                form.category === c.key
                  ? `${c.bg} ${c.border} font-semibold`
                  : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
              }`}
              style={{ color: form.category === c.key ? c.color : undefined }}
            >
              {c.icon}
              <span className="truncate">{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mb-3">
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Description *</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="What happens here? What should freshers bring? Any tips?"
          rows={3}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {(["floor", "hours", "contact"] as const).map((key) => (
        <div key={key} className="mb-3">
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 capitalize">
            {key === "floor" ? "Floor / Building" : key === "hours" ? "Opening Hours" : "Contact / Email"}
          </label>
          <input
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}

      {/* Photos */}
      <div className="mb-3">
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Photo URLs (comma-separated)</label>
        <input
          value={form.photos.join(", ")}
          onChange={(e) =>
            setForm({ ...form, photos: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })
          }
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-slate-400 mt-1">Add landmark photos so freshers can recognise the building.</p>
      </div>

      <button
        onClick={() => valid && onSave(form)}
        disabled={!valid}
        className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all ${
          valid ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed"
        }`}
      >
        {initial?.title ? "Save Changes" : "Add Location"}
      </button>
    </div>
  );
}
````

## File: src/features/map/components/PinMarker.tsx
````typescript
import { MapPin } from "lucide-react";
import type { MapPin as MapPinType } from "../../../types/map";
import { getCat } from "../utils/categories";

interface Props {
  pin: MapPinType;
  isActive: boolean;
  isFiltered: boolean;
  onClick: () => void;
}

export function PinMarker({ pin, isActive, isFiltered, onClick }: Props) {
  const cat = getCat(pin.category);
  return (
    <button
      onClick={onClick}
      className="absolute group"
      style={{
        left: `${pin.x_percent}%`,
        top: `${pin.y_percent}%`,
        transform: "translate(-50%, -100%)",
        opacity: isFiltered ? 1 : 0.2,
        zIndex: isActive ? 30 : isFiltered ? 20 : 10,
        transition: "opacity 0.25s, transform 0.2s",
        pointerEvents: isFiltered ? "auto" : "none",
      }}
      aria-label={pin.title}
    >
      {isActive && (
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ backgroundColor: cat.color, opacity: 0.3 }}
        />
      )}
      <span className="flex flex-col items-center">
        <span
          className="rounded-full p-1.5 shadow-md border-2 border-white"
          style={{ backgroundColor: cat.color }}
        >
          <MapPin size={13} color="white" fill="white" />
        </span>
        <span className="w-0.5 h-2 rounded-b-full" style={{ backgroundColor: cat.color }} />
      </span>
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-gray-900 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-50">
        {pin.title}
      </span>
    </button>
  );
}
````

## File: src/features/map/components/QuickActions.tsx
````typescript
import { QUICK, getCat } from "../utils/categories";
import { useMapStore } from "../store/map.store";

export function QuickActions() {
  const activeCategories = useMapStore((s) => s.activeCategories);

  const handleQuick = (category: string) => {
    useMapStore.setState({ activeCategories: new Set([category as any]), activePin: null });
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
      {QUICK.map((q) => {
        const cat = getCat(q.category);
        const active = activeCategories.has(q.category) && activeCategories.size === 1;
        return (
          <button
            key={q.label}
            onClick={() => handleQuick(q.category)}
            className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold border transition-all shrink-0 ${
              active ? `${cat.bg} ${cat.border}` : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
            }`}
            style={{ color: active ? cat.color : undefined }}
          >
            {cat.icon}
            {q.label}
          </button>
        );
      })}
    </div>
  );
}
````

## File: src/features/map/components/SearchResults.tsx
````typescript
import type { MapPin as MapPinType } from "../../../types/map";
import { MapPin } from "lucide-react";
import { getCat } from "../utils/categories";
interface Props {
  results: MapPinType[];
  onSelect: (pin: MapPinType) => void;
}

export function SearchResults({ results, onSelect }: Props) {
  return (
    <div className="absolute left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-lg z-30 max-h-52 overflow-y-auto">
      {results.map((p) => {
        const cat = getCat(p.category);
        return (
          <button
            key={p.id}
            onClick={() => onSelect(p)}
            className="w-full flex items-start gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 text-left transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0"
          >
            <span className="mt-0.5 p-1.5 rounded-full shrink-0" style={{ backgroundColor: cat.color + "22" }}>
              <MapPin size={13} style={{ color: cat.color }} />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-white">{p.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{p.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
````

## File: src/features/map/components/ZoomControls.tsx
````typescript
import { Plus, Minus, RotateCcw } from "lucide-react";

interface Props {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function ZoomControls({ onZoomIn, onZoomOut, onReset }: Props) {
  return (
    <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
      <button onClick={onZoomIn} className="w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow flex items-center justify-center" aria-label="Zoom in">
        <Plus size={16} />
      </button>
      <button onClick={onZoomOut} className="w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow flex items-center justify-center" aria-label="Zoom out">
        <Minus size={16} />
      </button>
      <button onClick={onReset} className="w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow flex items-center justify-center text-xs font-bold" aria-label="Reset view">
        <RotateCcw size={14} />
      </button>
    </div>
  );
}
````

## File: src/features/map/hooks/useCampusMap.ts
````typescript
import { useEffect } from "react";
import { useMapStore } from "../store/map.store";
import { useUserRole } from "../../../hooks/useUserRole";

export function useCampusMap() {
  const store = useMapStore();
  const { role, loading: roleLoading } = useUserRole();
  const canManage = role === "admin" || role === "moderator";

  useEffect(() => {
    store.loadPins();
  }, []);

  return {
    pins: store.pins,
    loading: store.loading,
    error: store.error,
    activePin: store.activePin,
    query: store.query,
    activeCategories: store.activeCategories,
    placingMode: store.placingMode,
    pendingCoords: store.pendingCoords,
    showForm: store.showForm,
    editingPin: store.editingPin,
    toast: store.toast,
    canManage,
    roleLoading,
    // Actions
    setActivePin: store.setActivePin,
    setQuery: store.setQuery,
    toggleCategory: store.toggleCategory,
    setActiveCategories: store.setActiveCategories,
    clearFilters: store.clearFilters,
    setPlacingMode: store.setPlacingMode,
    setPendingCoords: store.setPendingCoords,
    openForm: store.openForm,
    closeForm: store.closeForm,
    addPin: store.addPin,
    editPin: store.editPin,
    removePin: store.removePin,
    showToast: store.showToast,
    hideToast: store.hideToast,
    refresh: store.loadPins,
  };
}
````

## File: src/features/map/hooks/useGeolocation.ts
````typescript
import { useEffect, useState } from "react";

interface GeolocationState {
  lat: number | null;
  lng: number | null;
  error: string | null;
}

export function useGeolocation() {
  const [position, setPosition] = useState<GeolocationState>({
    lat: null,
    lng: null,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setPosition((p) => ({ ...p, error: "Geolocation not supported" }));
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          error: null,
        });
      },
      (err) => {
        setPosition((p) => ({ ...p, error: err.message }));
      },
      { enableHighAccuracy: true, maximumAge: 60000, timeout: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return position;
}

/** Haversine distance in meters */
export function getDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371e3;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
````

## File: src/features/map/hooks/useMapFilters.ts
````typescript
import { useMemo } from "react";
import { useMapStore } from "../store/map.store";
import { getCat } from "../utils/categories";

export function useMapFilters() {
  const pins = useMapStore((s) => s.pins);
  const query = useMapStore((s) => s.query);
  const activeCategories = useMapStore((s) => s.activeCategories);

  const filteredPins = useMemo(() => {
    return pins.filter((p) => {
      const matchCat = activeCategories.size === 0 || activeCategories.has(p.category);
      const q = query.toLowerCase();
      const catLabel = getCat(p.category).label.toLowerCase();
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        catLabel.includes(q);
      return matchCat && matchQ;
    });
  }, [pins, query, activeCategories]);

  return { filteredPins };
}
````

## File: src/features/map/hooks/useMapZoom.ts
````typescript
import { useState, useRef, useCallback, useEffect } from "react";

export function useMapZoom() {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const dragStartOffset = useRef({ x: 0, y: 0 });
  const movedDistance = useRef(0);

  const lastTouchDistance = useRef<number | null>(null);
  const pinchStartScale = useRef(1);
  const pinchStartOffset = useRef({ x: 0, y: 0 });
  const pinchCenter = useRef({ x: 0, y: 0 });

  const resetTransform = useCallback(() => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      e.preventDefault();
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const imgX = (mouseX - offset.x) / scale;
      const imgY = (mouseY - offset.y) / scale;
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const newScale = Math.min(Math.max(scale + delta, 0.5), 3);
      const newOffsetX = mouseX - imgX * newScale;
      const newOffsetY = mouseY - imgY * newScale;
      setScale(newScale);
      setOffset({ x: newOffsetX, y: newOffsetY });
    },
    [scale, offset]
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button, a")) return;
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    dragStartOffset.current = { x: offset.x, y: offset.y };
    movedDistance.current = 0;
    e.preventDefault();
  }, [offset]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    movedDistance.current += Math.abs(dx) + Math.abs(dy);
    setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Native touch handlers (attached directly to DOM to avoid passive event warning)
  const touchStartHandler = useCallback((e: TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      isDragging.current = true;
      lastPos.current = { x: touch.clientX, y: touch.clientY };
      dragStartOffset.current = { x: offset.x, y: offset.y };
      movedDistance.current = 0;
    } else if (e.touches.length === 2) {
      isDragging.current = false;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastTouchDistance.current = Math.sqrt(dx * dx + dy * dy);
      pinchStartScale.current = scale;
      pinchStartOffset.current = { x: offset.x, y: offset.y };
      pinchCenter.current = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
      };
    }
  }, [scale, offset]);

  const touchMoveHandler = useCallback((e: TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1 && isDragging.current) {
      const touch = e.touches[0];
      const dx = touch.clientX - lastPos.current.x;
      const dy = touch.clientY - lastPos.current.y;
      lastPos.current = { x: touch.clientX, y: touch.clientY };
      movedDistance.current += Math.abs(dx) + Math.abs(dy);
      setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    } else if (e.touches.length === 2 && lastTouchDistance.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDist = Math.sqrt(dx * dx + dy * dy);
      const scaleFactor = newDist / lastTouchDistance.current;
      const newScale = Math.min(Math.max(pinchStartScale.current * scaleFactor, 0.5), 3);

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const centerX = pinchCenter.current.x - rect.left;
      const centerY = pinchCenter.current.y - rect.top;
      const imgX = (centerX - pinchStartOffset.current.x) / pinchStartScale.current;
      const imgY = (centerY - pinchStartOffset.current.y) / pinchStartScale.current;
      const newOffsetX = centerX - imgX * newScale;
      const newOffsetY = centerY - imgY * newScale;

      setScale(newScale);
      setOffset({ x: newOffsetX, y: newOffsetY });
      lastTouchDistance.current = newDist;
    }
  }, [isDragging, scale, offset]);

  const touchEndHandler = useCallback((e: TouchEvent) => {
    if (e.touches.length === 0) {
      isDragging.current = false;
      lastTouchDistance.current = null;
    } else if (e.touches.length === 1) {
      const touch = e.touches[0];
      isDragging.current = true;
      lastPos.current = { x: touch.clientX, y: touch.clientY };
      dragStartOffset.current = { x: offset.x, y: offset.y };
      movedDistance.current = 0;
      lastTouchDistance.current = null;
    }
  }, [offset]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("touchstart", touchStartHandler, { passive: false });
    container.addEventListener("touchmove", touchMoveHandler, { passive: false });
    container.addEventListener("touchend", touchEndHandler);
    container.addEventListener("touchcancel", touchEndHandler);
    return () => {
      container.removeEventListener("touchstart", touchStartHandler);
      container.removeEventListener("touchmove", touchMoveHandler);
      container.removeEventListener("touchend", touchEndHandler);
      container.removeEventListener("touchcancel", touchEndHandler);
    };
  }, [touchStartHandler, touchMoveHandler, touchEndHandler]);

  const handlers = {
    onWheel: handleWheel,
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseUp,
  };

  return {
    scale,
    offset,
    setScale,
    setOffset,
    containerRef,
    handlers,
    resetTransform,
    movedDistance,
  };
}
````

## File: src/features/map/hooks/usePinPlacement.ts
````typescript
import { useCallback } from "react";
import { useMapStore } from "../store/map.store";

export function usePinPlacement() {
  const setPendingCoords = useMapStore((s) => s.setPendingCoords);
  const openForm = useMapStore((s) => s.openForm);
  const setPlacingMode = useMapStore((s) => s.setPlacingMode);

  const handleMapClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, containerRef: React.RefObject<HTMLDivElement | null>, scale: number, offset: { x: number; y: number }) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const xImg = (e.clientX - rect.left - offset.x) / scale;
      const yImg = (e.clientY - rect.top - offset.y) / scale;
      const xPercent = (xImg / rect.width) * 100;
      const yPercent = (yImg / rect.height) * 100;
      setPendingCoords({ x: xPercent, y: yPercent });
      setPlacingMode(false);
      openForm();
    },
    [setPendingCoords, openForm, setPlacingMode]
  );

  return { handleMapClick };
}
````

## File: src/features/map/services/map.service.ts
````typescript
import { supabase } from "../../../lib/supabase";
import type { MapPin, PinCategory } from "../../../types/map";

export async function fetchAllPins(): Promise<MapPin[]> {
  const { data, error } = await supabase
    .from("map_pins")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as MapPin[];
}

export interface CreateMapPinParams {
  title: string;
  description: string;
  category: PinCategory;
  x_percent: number;
  y_percent: number;
  photos?: string[];
  floor?: string;
  hours?: string;
  contact?: string;
}

export async function createPin(params: CreateMapPinParams): Promise<MapPin> {
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;
  const { data, error } = await supabase
    .from("map_pins")
    .insert({
      title: params.title,
      description: params.description,
      category: params.category,
      x_percent: params.x_percent,
      y_percent: params.y_percent,
      photos: params.photos ?? [],
      floor: params.floor,
      hours: params.hours,
      contact: params.contact,
      created_by: userId,
    })
    .select()
    .single();
  if (error) throw error;
  return data as MapPin;
}

export interface UpdateMapPinParams extends Partial<CreateMapPinParams> {
  id: string;
}

export async function updatePin(params: UpdateMapPinParams): Promise<MapPin> {
  const { id, ...rest } = params;
  const { data, error } = await supabase
    .from("map_pins")
    .update({ ...rest })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as MapPin;
}

export async function deletePin(id: string): Promise<void> {
  const { error } = await supabase.from("map_pins").delete().eq("id", id);
  if (error) throw error;
}
````

## File: src/features/map/store/map.store.ts
````typescript
import { create } from "zustand";
import { fetchAllPins, createPin, updatePin, deletePin, type CreateMapPinParams } from "../services/map.service";
import type { MapPin, PinCategory } from "../../../types/map";

interface MapStore {
  pins: MapPin[];
  loading: boolean;
  error: string | null;
  activePin: MapPin | null;
  query: string;
  activeCategories: Set<PinCategory>;
  placingMode: boolean;
  pendingCoords: { x: number; y: number } | null;
  showForm: boolean;
  editingPin: MapPin | null;
  toast: { message: string; type: "ok" | "err" } | null;

  loadPins: () => Promise<void>;
  addPin: (params: CreateMapPinParams) => Promise<void>;
  editPin: (id: string, params: Partial<CreateMapPinParams>) => Promise<void>;
  removePin: (id: string) => Promise<void>;
  setActivePin: (pin: MapPin | null) => void;
  setQuery: (q: string) => void;
  toggleCategory: (cat: PinCategory) => void;
  setActiveCategories: (cats: Set<PinCategory>) => void;
  clearFilters: () => void;
  setPlacingMode: (v: boolean) => void;
  setPendingCoords: (c: { x: number; y: number } | null) => void;
  openForm: (editPin?: MapPin) => void;
  closeForm: () => void;
  showToast: (message: string, type?: "ok" | "err") => void;
  hideToast: () => void;
}

export const useMapStore = create<MapStore>((set, get) => ({
  pins: [],
  loading: true,
  error: null,
  activePin: null,
  query: "",
  activeCategories: new Set(),
  placingMode: false,
  pendingCoords: null,
  showForm: false,
  editingPin: null,
  toast: null,

  loadPins: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchAllPins();
      set({ pins: data, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to load pins", loading: false });
    }
  },

  addPin: async (params) => {
    const created = await createPin(params);
    set((s) => ({ pins: [created, ...s.pins] }));
  },

  editPin: async (id, params) => {
    const updated = await updatePin({ id, ...params });
    set((s) => ({
      pins: s.pins.map((p) => (p.id === id ? updated : p)),
      activePin: s.activePin?.id === id ? updated : s.activePin,
    }));
  },

  removePin: async (id) => {
    await deletePin(id);
    set((s) => ({
      pins: s.pins.filter((p) => p.id !== id),
      activePin: s.activePin?.id === id ? null : s.activePin,
    }));
  },

  setActivePin: (pin) => set({ activePin: pin }),

  setQuery: (q) => set({ query: q, activeCategories: new Set() }),

  toggleCategory: (cat) => {
    const current = get().activeCategories;
    const next = new Set(current);
    if (next.has(cat)) next.delete(cat);
    else next.add(cat);
    set({ activeCategories: next, activePin: null });
  },

  setActiveCategories: (cats) => set({ activeCategories: cats, activePin: null }),

  clearFilters: () => set({ activeCategories: new Set(), query: "", activePin: null }),

  setPlacingMode: (v) => set({ placingMode: v }),

  setPendingCoords: (coords) => set({ pendingCoords: coords }),

  openForm: (editPin) =>
    set({
      showForm: true,
      editingPin: editPin ?? null,
      activePin: null,
      placingMode: false,   // ensure placing mode is off when opening form directly
    }),

  closeForm: () =>
    set({
      showForm: false,
      editingPin: null,
      pendingCoords: null,
      placingMode: false,
    }),

  showToast: (message, type = "ok") => {
    set({ toast: { message, type } });
    setTimeout(() => set({ toast: null }), 3000);
  },

  hideToast: () => set({ toast: null }),
}));
````

## File: src/features/map/utils/categories.tsx
````typescript
import type { PinCategory } from "../../../types/map";
import { BookOpen, GraduationCap, DollarSign, Users, Heart, BookOpen as BookOpen2, Utensils, Car, Building2 } from "lucide-react";
import React from "react";

export const QUICK = [
  { label: "How to Register", category: "registration" as PinCategory },
  { label: "Pay My Fees", category: "finance" as PinCategory },
  { label: "Get SU Card", category: "student_union" as PinCategory },
  { label: "Find Health Clinic", category: "health" as PinCategory },
  { label: "Library Access", category: "library" as PinCategory },
];

export interface CategoryConfig {
  key: PinCategory;
  label: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  border: string;
}

export const CATEGORIES: CategoryConfig[] = [
  {
    key: "registration",
    label: "Registration",
    icon: <BookOpen size={14} />,
    color: "#1E40AF",
    bg: "bg-blue-100 dark:bg-blue-900/40",
    border: "border-blue-300 dark:border-blue-700",
  },
  {
    key: "academics",
    label: "Academics",
    icon: <GraduationCap size={14} />,
    color: "#7C3AED",
    bg: "bg-purple-100 dark:bg-purple-900/40",
    border: "border-purple-300 dark:border-purple-700",
  },
  {
    key: "finance",
    label: "Finance",
    icon: <DollarSign size={14} />,
    color: "#059669",
    bg: "bg-emerald-100 dark:bg-emerald-900/40",
    border: "border-emerald-300 dark:border-emerald-700",
  },
  {
    key: "student_union",
    label: "Student Union",
    icon: <Users size={14} />,
    color: "#D97706",
    bg: "bg-amber-100 dark:bg-amber-900/40",
    border: "border-amber-300 dark:border-amber-700",
  },
  {
    key: "health",
    label: "Health",
    icon: <Heart size={14} />,
    color: "#DC2626",
    bg: "bg-red-100 dark:bg-red-900/40",
    border: "border-red-300 dark:border-red-700",
  },
  {
    key: "library",
    label: "Library",
    icon: <BookOpen2 size={14} />,
    color: "#0891B2",
    bg: "bg-cyan-100 dark:bg-cyan-900/40",
    border: "border-cyan-300 dark:border-cyan-700",
  },
  {
    key: "dining",
    label: "Dining",
    icon: <Utensils size={14} />,
    color: "#EA580C",
    bg: "bg-orange-100 dark:bg-orange-900/40",
    border: "border-orange-300 dark:border-orange-700",
  },
  {
    key: "transport",
    label: "Transport",
    icon: <Car size={14} />,
    color: "#4B5563",
    bg: "bg-gray-100 dark:bg-gray-800",
    border: "border-gray-300 dark:border-gray-600",
  },
  {
    key: "general",
    label: "General",
    icon: <Building2 size={14} />,
    color: "#6B7280",
    bg: "bg-slate-100 dark:bg-slate-800",
    border: "border-slate-300 dark:border-slate-600",
  },
];

export function getCat(key: PinCategory): CategoryConfig {
  return CATEGORIES.find((c) => c.key === key) ?? CATEGORIES[CATEGORIES.length - 1];
}
````

## File: src/features/messages/components/ConversationList.tsx
````typescript
import type { Conversation } from "../services/messages.service";

interface Props {
  conversations: Conversation[];
  onSelect: (conversation: Conversation) => void;
}

export function ConversationList({ conversations, onSelect }: Props) {
  if (conversations.length === 0) {
    return (
      <div className="text-center py-12 opacity-60">
        <p className="font-semibold">No messages yet</p>
        <p className="text-sm mt-1">Start a conversation from someone's profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {conversations.map((conv) => (
        <button
          key={conv.user_id}
          onClick={() => onSelect(conv)}
          className="w-full flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {conv.username?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm truncate">{conv.username ?? "Unknown"}</p>
              <span className="text-[10px] text-slate-400">
                {new Date(conv.last_message_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-xs text-slate-500 truncate mt-0.5">{conv.last_message}</p>
          </div>
          {conv.unread_count > 0 && (
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
              {conv.unread_count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
````

## File: src/features/messages/components/MessageBubble.tsx
````typescript
interface Props {
  content: string;
  timestamp: string;
  isMine: boolean;
  senderName?: string;
}

export function MessageBubble({ content, timestamp, isMine, senderName }: Props) {
  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
        isMine
          ? "bg-blue-600 text-white rounded-br-md"
          : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-md"
      }`}>
        {!isMine && senderName && (
          <p className="text-[10px] font-semibold mb-1 opacity-70">{senderName}</p>
        )}
        <p>{content}</p>
        <p className={`text-[10px] mt-1 ${isMine ? "text-blue-200" : "text-slate-400"}`}>
          {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  );
}
````

## File: src/features/messages/hooks/useConversations.ts
````typescript
import { useQuery } from "@tanstack/react-query";
import { fetchConversations } from "../services/messages.service";
import { useAuthStore } from "../../../store/authStore";

export function useConversations() {
  const user = useAuthStore((s) => s.user);
  return useQuery({
    queryKey: ["conversations", user?.id],
    queryFn: () => fetchConversations(user!.id),
    enabled: !!user,
  });
}
````

## File: src/features/messages/hooks/useDirectMessages.ts
````typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchConversation, sendDirectMessage } from "../services/messages.service";
import { useAuthStore } from "../../../store/authStore";

export function useDirectMessages(partnerId: string | undefined) {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  const messagesQuery = useQuery({
    queryKey: ["directMessages", user?.id, partnerId],
    queryFn: () => fetchConversation(user!.id, partnerId!),
    enabled: !!user && !!partnerId,
  });

  const sendMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!user || !partnerId) throw new Error("Not authenticated");
      return sendDirectMessage(user.id, partnerId, content);
    },
    onSuccess: (newMsg) => {
      queryClient.setQueryData(["directMessages", user?.id, partnerId], (old: any) => (old ? [...old, newMsg] : [newMsg]));
    },
  });

  return {
    messages: messagesQuery.data ?? [],
    isLoading: messagesQuery.isLoading,
    send: sendMutation.mutate,
    isSending: sendMutation.isPending,
  };
}
````

## File: src/features/messages/services/messages.service.ts
````typescript
import { supabase } from "../../../lib/supabase";

export type Conversation = {
  user_id: string;
  username: string | null;
  avatar_url: string | null;
  last_message: string;
  last_message_at: string;
  unread_count: number;
};

export type DirectMessageWithProfile = {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  profiles: {
    username: string | null;
    avatar_url: string | null;
  } | null;
};

export async function fetchConversations(userId: string): Promise<Conversation[]> {
  // Fetch all direct messages where the user is sender or receiver
  const { data: messages, error } = await supabase
    .from("direct_messages")
    .select("sender_id, receiver_id, content, created_at")
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .order("created_at", { ascending: false });

  if (error) throw error;

  const partnersMap = new Map<string, { lastMessage: string; lastMessageAt: string; unreadCount: number }>();

  for (const msg of messages ?? []) {
    const partnerId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id;
    const existing = partnersMap.get(partnerId);
    if (!existing || new Date(msg.created_at) > new Date(existing.lastMessageAt)) {
      partnersMap.set(partnerId, {
        lastMessage: msg.content,
        lastMessageAt: msg.created_at,
        unreadCount: 0,
      });
    }
  }

  // Get profiles for all partners
  const partnerIds = Array.from(partnersMap.keys());
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, username, avatar_url")
    .in("id", partnerIds);

  const profileMap = new Map(profiles?.map(p => [p.id, p]) ?? []);

  return Array.from(partnersMap.entries()).map(([partnerId, data]) => ({
    user_id: partnerId,
    username: profileMap.get(partnerId)?.username ?? "Unknown",
    avatar_url: profileMap.get(partnerId)?.avatar_url ?? null,
    last_message: data.lastMessage,
    last_message_at: data.lastMessageAt,
    unread_count: data.unreadCount,
  }));
}

export async function fetchConversation(userId: string, partnerId: string): Promise<DirectMessageWithProfile[]> {
  const { data, error } = await supabase
    .from("direct_messages")
    .select("*, profiles:sender_id (username, avatar_url)")
    .or(`and(sender_id.eq.${userId},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${userId})`)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((msg: any) => ({
    ...msg,
    profiles: Array.isArray(msg.profiles) ? msg.profiles[0] ?? null : msg.profiles,
  })) as DirectMessageWithProfile[];
}

export async function sendDirectMessage(senderId: string, receiverId: string, content: string): Promise<DirectMessageWithProfile> {
  const { data, error } = await supabase
    .from("direct_messages")
    .insert({ sender_id: senderId, receiver_id: receiverId, content })
    .select("*, profiles:sender_id (username, avatar_url)")
    .single();
  if (error) throw error;
  return {
    ...data,
    profiles: Array.isArray((data as any).profiles) ? (data as any).profiles[0] ?? null : (data as any).profiles,
  } as DirectMessageWithProfile;
}
````

## File: src/features/notifications/components/NotificationCard.tsx
````typescript
import type { Database } from "../../../types/database.types";

type Notification = Database["public"]["Tables"]["notifications"]["Row"];

interface Props {
  notification: Notification;
  onMarkRead: (id: string) => void;
}

export function NotificationCard({ notification, onMarkRead }: Props) {
  return (
    <div
      className={`p-4 rounded-2xl border ${
        notification.read
          ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
          : "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
      } cursor-pointer`}
      onClick={() => {
        if (!notification.read) onMarkRead(notification.id);
      }}
    >
      <h4 className="font-semibold text-sm">{notification.title}</h4>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{notification.body}</p>
      <p className="text-[10px] text-slate-400 mt-2">
        {new Date(notification.created_at!).toLocaleString()}
      </p>
    </div>
  );
}
````

## File: src/features/notifications/components/NotificationList.tsx
````typescript
import { NotificationCard } from "./NotificationCard";
import type { Database } from "../../../types/database.types";

type Notification = Database["public"]["Tables"]["notifications"]["Row"];

interface Props {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
}

export function NotificationList({ notifications, onMarkRead }: Props) {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-12 opacity-60">
        <p className="font-semibold">No notifications</p>
        <p className="text-sm mt-1">You're all caught up!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {notifications.map((n) => (
        <NotificationCard key={n.id} notification={n} onMarkRead={onMarkRead} />
      ))}
    </div>
  );
}
````

## File: src/features/notifications/hooks/useNotifications.ts
````typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  fetchNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  subscribeToNotifications,
} from "../services/notifications.service";
import { useNotificationsStore } from "../store/notifications.store";
import { useAuthStore } from "../../../store/authStore";
import { supabase } from "../../../lib/supabase";

export function useNotifications() {
  const queryClient = useQueryClient();
  const setUnreadCount = useNotificationsStore((s) => s.setUnreadCount);
  const user = useAuthStore((s) => s.user);
  const userId = user?.id;

  const notificationsQuery = useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => fetchNotifications(userId!),
    enabled: !!userId,
  });

  const unreadCountQuery = useQuery({
    queryKey: ["notifications", userId, "unread"],
    queryFn: () => getUnreadCount(userId!),
    enabled: !!userId,
  });

  useEffect(() => {
    if (unreadCountQuery.data !== undefined) {
      setUnreadCount(unreadCountQuery.data);
    }
  }, [unreadCountQuery.data, setUnreadCount]);

  const markAsReadMutation = useMutation({
    mutationFn: (ids: string[]) => markAsRead(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: () => markAllAsRead(userId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
    },
  });

  useEffect(() => {
    if (!userId) return;
    const channel = subscribeToNotifications(userId, () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
    });
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, queryClient]);

  return {
    notifications: notificationsQuery.data ?? [],
    unreadCount: unreadCountQuery.data ?? 0,
    isLoading: notificationsQuery.isLoading,
    markAsRead: markAsReadMutation.mutate,
    markAllRead: markAllReadMutation.mutate,
  };
}
````

## File: src/features/notifications/services/notifications.service.ts
````typescript
import { supabase } from "../../../lib/supabase";
import type { Database } from "../../../types/database.types";

type Notification = Database["public"]["Tables"]["notifications"]["Row"];

export async function fetchNotifications(userId: string): Promise<Notification[]> {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) throw error;
  return data ?? [];
}

export async function markAsRead(ids: string[]) {
  const { error } = await supabase.from("notifications").update({ read: true }).in("id", ids);
  if (error) throw error;
}

export async function markAllAsRead(userId: string) {
  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("user_id", userId)
    .eq("read", false);
  if (error) throw error;
}

export async function getUnreadCount(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("read", false);
  if (error) throw error;
  return count ?? 0;
}

export async function createNotification(
  userId: string,
  title: string,
  body: string,
  type = "system"
) {
  // Supabase CHECK constraint expects an allowed notification type.
  // If an invalid type is provided, fall back to "system" to avoid insert failures.
  const safeType = (typeof type === "string" && type.length > 0) ? type : "system";

  const { error } = await supabase
    .from("notifications")
    .insert({ user_id: userId, title, body, type: safeType });
  if (error) console.warn("Failed to create notification", error);
}


export function subscribeToNotifications(userId: string, callback: () => void) {
  return supabase
    .channel(`notifications-${userId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "notifications",
        filter: `user_id=eq.${userId}`,
      },
      () => callback()
    )
    .subscribe();
}
````

## File: src/features/notifications/store/notifications.store.ts
````typescript
import { create } from "zustand";

interface NotificationsState {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
}

export const useNotificationsStore = create<NotificationsState>((set) => ({
  unreadCount: 0,
  setUnreadCount: (count) => set({ unreadCount: count }),
}));
````

## File: src/features/posts/components/CreatePostSheet.tsx
````typescript
import { useState, useRef, useEffect } from "react";
import { X, Image as ImageIcon, Send, Clock, Mic, MicOff, Trash2 } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import { createPost } from "../services/posts.service";
import { supabase } from "../../../lib/supabase";
import { useToastStore } from "../../../store/toastStore";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

const POST_LIMIT = 10;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour for normal posts

const ANON_LIMIT = 1;
const ANON_WINDOW_MS = 2 * 60 * 60 * 1000; // 2 hours for anonymous

export default function CreatePostSheet({ open, onClose, onCreated }: Props) {
  const user = useAuthStore((s) => s.user);
  const { showToast } = useToastStore();

  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [voiceBlob, setVoiceBlob] = useState<Blob | null>(null);
  const [voicePreviewUrl, setVoicePreviewUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [remainingPosts, setRemainingPosts] = useState(POST_LIMIT);
  const [remainingAnonPosts, setRemainingAnonPosts] = useState(ANON_LIMIT);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (!user || !open) return;
    const now = Date.now();

    // Normal limit
    const stored = JSON.parse(localStorage.getItem(`post_limit_${user.id}`) || "[]");
    const valid = stored.filter((time: number) => now - time < WINDOW_MS);
    localStorage.setItem(`post_limit_${user.id}`, JSON.stringify(valid));
    setRemainingPosts(POST_LIMIT - valid.length);

    // Anonymous limit
    const anonStored = JSON.parse(localStorage.getItem(`anon_post_limit_${user.id}`) || "[]");
    const anonValid = anonStored.filter((time: number) => now - time < ANON_WINDOW_MS);
    localStorage.setItem(`anon_post_limit_${user.id}`, JSON.stringify(anonValid));
    setRemainingAnonPosts(ANON_LIMIT - anonValid.length);
  }, [user, open]);

  if (!open || !user) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm;codecs=opus" });
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setVoiceBlob(blob);
        setVoicePreviewUrl(URL.createObjectURL(blob));
        // Stop tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      showToast("Microphone access is required to record voice notes", "err");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const removeVoice = () => {
    setVoiceBlob(null);
    setVoicePreviewUrl(null);
  };

  const handleSubmit = async () => {
    if (!content.trim() && !imageFile && !voiceBlob) return;

    const now = Date.now();

    // Check limits
    const key = `post_limit_${user.id}`;
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    const valid = stored.filter((time: number) => now - time < WINDOW_MS);

    if (isAnonymous) {
      const anonKey = `anon_post_limit_${user.id}`;
      const anonStored = JSON.parse(localStorage.getItem(anonKey) || "[]");
      const anonValid = anonStored.filter((time: number) => now - time < ANON_WINDOW_MS);
      if (anonValid.length >= ANON_LIMIT) {
        setError("You can only post 1 anonymous confession every 2 hours.");
        return;
      }
      // Also check normal limit (anonymous posts count towards total)
      if (valid.length >= POST_LIMIT) {
        setError("You have reached the total post limit of 10 per hour.");
        return;
      }
    } else {
      if (valid.length >= POST_LIMIT) {
        setError("You have reached the limit of 10 posts per hour.");
        return;
      }
    }

    setUploading(true);
    setError("");

    try {
      let imageUrl: string | null = null;
      let voiceUrl: string | null = null;

      if (imageFile) {
        // Sanitize file name – remove brackets and other problematic characters
        const safeName = imageFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const filePath = `posts/${user.id}/${Date.now()}_${safeName}`;
        const { error: uploadError } = await supabase.storage
          .from("post-images")
          .upload(filePath, imageFile);

        if (uploadError) throw new Error("Image upload failed");
        const { data: publicUrlData } = supabase.storage
          .from("post-images")
          .getPublicUrl(filePath);
        imageUrl = publicUrlData.publicUrl;
      }

      if (voiceBlob) {
        const filePath = `voice/${user.id}/${Date.now()}.webm`;
        const { error: uploadError } = await supabase.storage
          .from("community-chat-voice")
          .upload(filePath, voiceBlob, { contentType: "audio/webm" });
        if (uploadError) throw new Error("Voice upload failed");
        const { data: publicUrlData } = supabase.storage
          .from("community-chat-voice")
          .getPublicUrl(filePath);
        voiceUrl = publicUrlData.publicUrl;
      }

      await createPost(user.id, content.trim(), imageUrl, voiceUrl, isAnonymous);

      // Update limits
      const updatedValid = [...valid, now];
      localStorage.setItem(key, JSON.stringify(updatedValid));
      setRemainingPosts(POST_LIMIT - updatedValid.length);

      if (isAnonymous) {
        const anonKey = `anon_post_limit_${user.id}`;
        const anonStored = JSON.parse(localStorage.getItem(anonKey) || "[]");
        const updatedAnon = [...anonStored, now];
        localStorage.setItem(anonKey, JSON.stringify(updatedAnon));
        setRemainingAnonPosts(ANON_LIMIT - updatedAnon.length);
      }

      setContent("");
      setImageFile(null);
      setImagePreview(null);
      setIsAnonymous(false);
      setVoiceBlob(null);
      setVoicePreviewUrl(null);

      onCreated();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to create post");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl p-5 animate-slide-up shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Create Post</h2>
          <button aria-label="Close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Limits info */}
        <div className="mb-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 p-3 border border-blue-200 dark:border-blue-800 space-y-1">
          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <Clock size={16} />
            <span className="text-sm font-medium">
              {remainingPosts} / 10 posts remaining this hour
            </span>
          </div>
          {isAnonymous && (
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <Clock size={16} />
              <span className="text-sm font-medium">
                Anonymous: {remainingAnonPosts} / 1 remaining (every 2 hrs)
              </span>
            </div>
          )}
        </div>

        {/* Anonymous toggle */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Post anonymously</span>
          <button
            onClick={() => setIsAnonymous(!isAnonymous)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              isAnonymous ? "bg-purple-600" : "bg-slate-300 dark:bg-slate-600"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                isAnonymous ? "translate-x-6" : ""
              }`}
            />
          </button>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full min-h-[120px] p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Image preview */}
        {imagePreview && (
          <div className="relative mt-3">
            <img src={imagePreview} alt="Preview" className="rounded-xl max-h-48 object-cover" />
            <button
              aria-label="Remove image"
              onClick={removeImage}
              className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Voice recording UI */}
        {voicePreviewUrl ? (
          <div className="mt-3 flex items-center gap-3 bg-slate-100 dark:bg-slate-800 p-3 rounded-xl">
            <audio controls src={voicePreviewUrl} className="flex-1 h-10" />
            <button onClick={removeVoice} className="p-1.5 text-red-500" aria-label="Remove voice">
              <Trash2 size={16} />
            </button>
          </div>
        ) : isRecording ? (
          <div className="mt-3 flex items-center gap-3 bg-red-50 dark:bg-red-950/30 p-3 rounded-xl">
            <span className="text-red-500 animate-pulse">Recording...</span>
            <button onClick={stopRecording} className="ml-auto p-2 bg-red-500 text-white rounded-full">
              <MicOff size={16} />
            </button>
          </div>
        ) : null}

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 text-sm text-blue-600"
            >
              <ImageIcon size={18} />
              Add Image
            </button>
            <input
              ref={fileInputRef}
              aria-label="Add image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {!voiceBlob && (
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`flex items-center gap-2 text-sm ${
                  isRecording ? "text-red-500" : "text-purple-600"
                }`}
              >
                {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                {isRecording ? "Stop" : "Voice"}
              </button>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={uploading || remainingPosts <= 0 || (!content.trim() && !imageFile && !voiceBlob)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-2 rounded-full font-medium disabled:opacity-50"
          >
            {uploading ? (
              "Posting..."
            ) : (
              <>
                <Send size={16} />
                Post
              </>
            )}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      </div>
    </div>
  );
}
````

## File: src/features/posts/components/Feed.tsx
````typescript
import PostCard from "./PostCard";
import PostCardSkeleton from "./PostCardSkeleton";
import type { PostWithProfile } from "../services/posts.service";

interface Props {
  posts: PostWithProfile[];
  isLoading: boolean;
  userVotes: Record<string, "up" | "down" | null>;
  onVote: (postId: string, type: "up" | "down") => void;
  onDelete: (postId: string) => void;
  onCommentClick: (post: PostWithProfile) => void;
  onPostClick: (post: PostWithProfile) => void;
}

export function Feed({ posts, isLoading, userVotes, onVote, onDelete, onCommentClick, onPostClick }: Props) {
  if (isLoading && posts.length === 0) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => <PostCardSkeleton key={i} />)}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-10 opacity-60">
        <p className="font-semibold">No posts yet</p>
        <p className="text-sm">Be the first to start a conversation.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          userVote={userVotes[post.id] ?? null}
          onVote={onVote}
          onDelete={onDelete}
          onCommentClick={() => onCommentClick(post)}
          onPostClick={() => onPostClick(post)}
        />
      ))}
    </div>
  );
}
````

## File: src/features/posts/components/FeedItem.tsx
````typescript
import { MessageCircle, Trash2 } from "lucide-react";
import type { PostWithProfile } from "../services/posts.service";
import { VoteButtons } from "./VoteButtons";

interface Props {
  post: PostWithProfile;
  userVote?: "up" | "down" | null;
  canDelete?: boolean;
  onVote: (type: "up" | "down") => void;
  onDelete: (postId: string) => void;
  onCommentClick: () => void;
  onPostClick: () => void;
}

export function FeedItem({ post, userVote, canDelete, onVote, onDelete, onCommentClick, onPostClick }: Props) {
  const username = post.profiles?.username ?? "Anonymous";
  const avatar = post.profiles?.avatar_url;
  const timeAgo = post.created_at ? new Date(post.created_at).toLocaleDateString() : "";

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex items-start gap-3">
        {avatar ? (
          <img src={avatar} alt={username} className="w-9 h-9 rounded-full object-cover shrink-0" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
            {username[0]?.toUpperCase()}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-sm">{username}</span>
            <span className="text-xs text-slate-400">{timeAgo}</span>
            {post.is_anonymous && <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-1.5 py-0.5 rounded-full">Anon</span>}
          </div>
          <div onClick={onPostClick} className="cursor-pointer">
            <p className="text-sm whitespace-pre-wrap">{post.content}</p>
            {post.image_url && <img src={post.image_url} alt="Post" className="mt-2 rounded-xl max-h-60 w-full object-cover" />}
            {post.voice_url && <audio controls src={post.voice_url} className="mt-2 w-full h-8" />}
          </div>
          <div className="flex items-center gap-4 mt-3">
            <VoteButtons upvotes={post.upvotes ?? 0} downvotes={post.downvotes ?? 0} userVote={userVote} onVote={onVote} />
            <button onClick={onCommentClick} className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600">
              <MessageCircle size={15} />
              <span>{post.comments_count}</span>
            </button>
            {canDelete && (
              <button onClick={() => onDelete(post.id)} className="ml-auto text-red-400 hover:text-red-600">
                <Trash2 size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
````

## File: src/features/posts/components/PostCard.tsx
````typescript
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageCircle,
  Bookmark,
  Trash2,
  Flag,
  Share2,
  ShieldCheck,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { supabase } from "../../../lib/supabase";
import { getTier, TIER_COLORS } from "../../study/utils/tiers";
import { LecturerBadge } from "../../profile/components/LecturerBadge";

import { useUserRole } from "../../../hooks/useUserRole";
import { useAuthStore } from "../../../store/authStore";
import { reportPost } from "../../../services/reportService";
import {
  savePost,
  unsavePost,
  isPostSaved,
} from "../../../services/savedPostsService";
import { useToastStore } from "../../../store/toastStore";

interface Post {
  id: string;
  user_id: string | null;
  content: string | null;
  image_url: string | null;
  voice_url?: string | null;
  is_anonymous?: boolean | null;
  upvotes: number | null;
  downvotes: number | null;
  created_at: string | null;
  profiles: {
    username: string | null;
    avatar_url: string | null;
    role: string | null;
    karma?: number | null;
    is_lecturer?: boolean | null;
  } | null;
  comments_count: number;
}

interface Reaction {
  emoji: string;
  count: number;
  userReacted: boolean;
}

interface Props {
  post: Post;
  userVote: "up" | "down" | null;
  onVote: (id: string, type: "up" | "down") => void;
  onDelete?: (id: string) => void;
  onCommentClick?: () => void;
  onPostClick?: () => void;   // Tapping the content or image opens the post detail
}

export default function PostCard({
  post,
  userVote,
  onVote,
  onDelete,
  onCommentClick,
  onPostClick,
}: Props) {
  const { role } = useUserRole();
  const user = useAuthStore((s) => s.user);
  const { showToast } = useToastStore();
  const isOwner = user?.id === post.user_id;
  const canDelete = isOwner || role === "moderator" || role === "admin";
  const [saved, setSaved] = useState(false);
  const [sharing, setSharing] = useState(false);

  const isAnonymous = post.is_anonymous ?? false;
  const canSeeAuthor = role === "admin" || role === "moderator";

  const displayName = isAnonymous && !canSeeAuthor
    ? "Anonymous 🎭"
    : (post.profiles?.username ?? "Anonymous");
  const displayRole = isAnonymous && !canSeeAuthor
    ? "anonymous"
    : (post.profiles?.role ?? "student");
  const avatarUrl = isAnonymous && !canSeeAuthor
    ? null
    : post.profiles?.avatar_url;

  const [reactions, setReactions] = useState<Reaction[]>([]);

  const fetchReactions = async () => {
    const { data, error } = await supabase
      .from("post_reactions")
      .select("emoji, user_id")
      .eq("post_id", post.id);
    if (error) return;
    const counts: Record<string, { count: number; userReacted: boolean }> = {};
    (data ?? []).forEach((r: any) => {
      if (!counts[r.emoji]) counts[r.emoji] = { count: 0, userReacted: false };
      counts[r.emoji].count++;
      if (r.user_id === user?.id) counts[r.emoji].userReacted = true;
    });
    setReactions(
      Object.entries(counts).map(([emoji, { count, userReacted }]) => ({
        emoji,
        count,
        userReacted,
      }))
    );
  };

  useEffect(() => {
    if (!user) return;
    isPostSaved(user.id, post.id).then(setSaved).catch((err) => { console.error("Failed to check saved status", err); });
    fetchReactions();
  }, [user, post.id]);

  const handleReaction = async (emoji: string) => {
    if (!user) { showToast("Sign in to react", "err"); return; }
    const existing = reactions.find((r) => r.emoji === emoji && r.userReacted);
    if (existing) {
      await supabase
        .from("post_reactions")
        .delete()
        .eq("post_id", post.id)
        .eq("user_id", user.id)
        .eq("emoji", emoji);
    } else {
      await supabase
        .from("post_reactions")
        .insert({ post_id: post.id, user_id: user.id, emoji });
    }
    fetchReactions();
  };

  const handleReport = async () => {
    if (!user) { showToast("Please sign in to report posts.", "err"); return; }
    const reason = prompt("Reason for reporting?");
    if (!reason?.trim()) return;
    try {
      await reportPost(post.id, user.id, reason.trim());
      showToast("Report submitted.");
    } catch (error) {
      console.error(error);
      showToast("Failed to submit report.", "err");
    }
  };

  const handleShare = async () => {
    if (sharing) return;
    const shareUrl = `${window.location.origin}/post/${post.id}`;
    try {
      if (navigator.share) {
        setSharing(true);
        await navigator.share({
          title: "Warren",
          text: post.content ?? undefined,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        showToast("Link copied to clipboard.");
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        console.error(error);
      }
    } finally {
      setSharing(false);
    }
  };

  const handleSaveToggle = async () => {
    if (!user) { showToast("Please sign in to save posts.", "err"); return; }
    try {
      if (saved) {
        await unsavePost(user.id, post.id);
        setSaved(false);
      } else {
        await savePost(user.id, post.id);
        setSaved(true);
      }
    } catch {
      setSaved((prev) => !prev);
    }
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (post.image_url) {
      window.open(post.image_url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-sm transition-all duration-200 ease-in-out hover:shadow-md motion-safe:active:scale-[0.99]">
      {/* ─── Header (not tappable for post detail) ────────────────────────── */}
      <div className="p-2.5 sm:p-3">
        <div className="flex items-start gap-2">
          <Link
            to={isAnonymous && !canSeeAuthor ? "#" : `/profile/${post.user_id}`}
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 mt-0.5"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                loading="lazy"
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
              />
            ) : (
              <div
                className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-sm ${
                  isAnonymous && !canSeeAuthor
                    ? "bg-purple-500 text-white"
                    : "bg-gradient-to-br from-blue-600 to-cyan-500 text-white"
                }`}
              >
                {isAnonymous && !canSeeAuthor ? "?" : displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1">
              <h3 className="font-semibold text-slate-900 dark:text-white truncate max-w-[100px] text-[11px] sm:text-xs">
                {displayName}
              </h3>
              {!isAnonymous && post.profiles?.karma !== undefined && (
                <span style={{ backgroundColor: TIER_COLORS[getTier(post.profiles.karma ?? 0)] }} className="px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white capitalize">
                  {getTier(post.profiles.karma ?? 0)}
                </span>
              )}
              {!isAnonymous && post.profiles?.is_lecturer && <LecturerBadge />}
              {isAnonymous && (
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 dark:bg-purple-950/40 px-1.5 py-0.5 text-[9px] font-bold uppercase text-purple-600 dark:text-purple-400">
                  🎭 Anon
                </span>
              )}
              {isAnonymous && canSeeAuthor && (
                <span className="text-[9px] text-slate-500 dark:text-slate-400">
                  (by {post.profiles?.username ?? "Unknown"})
                </span>
              )}
              {!isAnonymous && displayRole === "admin" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-100 dark:bg-red-950/40 px-1.5 py-0.5 text-[9px] font-bold uppercase text-red-600 dark:text-red-400">
                  <ShieldCheck size={9} /> Admin
                </span>
              )}
              {!isAnonymous && displayRole === "moderator" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-950/40 px-1.5 py-0.5 text-[9px] font-bold uppercase text-amber-600 dark:text-amber-400">
                  <ShieldCheck size={9} /> Mod
                </span>
              )}
            </div>
            <div className="mt-0.5 flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">
              <span>{displayRole}</span>
              <span>·</span>
              <span>
                {post.created_at
                  ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true })
                  : "just now"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-0.5 ml-1">
            <button
              onClick={handleReport}
              aria-label="Report post"
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 min-w-[36px] min-h-[36px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center transition"
            >
              <Flag size={16} />
            </button>
            {canDelete && onDelete && (
              <button
                onClick={() => onDelete(post.id)}
                aria-label="Delete post"
                className="p-1.5 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 min-w-[36px] min-h-[36px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center transition"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Tappable content – opens post detail */}
        <div onClick={onPostClick} className="cursor-pointer">
          {post.content && (
            <p className="mt-1.5 whitespace-pre-wrap break-words text-[11px] sm:text-xs leading-snug text-slate-700 dark:text-slate-200">
              {post.content}
            </p>
          )}
        </div>
      </div>

      {/* Tappable image – opens full screen */}
      {post.image_url && (
        <div className="border-y border-slate-100 dark:border-slate-800 cursor-pointer" onClick={handleImageClick}>
          <img
            src={post.image_url}
            alt="Post attachment"
            loading="lazy"
            className="w-full max-h-[320px] object-cover bg-slate-100 dark:bg-slate-800"
          />
        </div>
      )}

      {/* Voice note */}
      {post.voice_url && (
        <div className="px-2.5 pt-1.5 pb-0.5">
          <audio controls src={post.voice_url} className="w-full h-7" />
        </div>
      )}

      {/* ─── Action bar ────────────────────────────────────────────────────── */}
      <div className="px-1.5 py-1.5 sm:px-2 sm:py-1.5 grid grid-cols-5 gap-1">
        <button
          onClick={() => onVote(post.id, "up")}
          className={`flex items-center justify-center gap-1 rounded-xl py-2 min-h-[44px] text-[11px] transition-all duration-200 motion-safe:active:scale-[0.98] ${
            userVote === "up"
              ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-semibold shadow-sm"
              : "bg-slate-50/80 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 text-slate-600 dark:text-slate-300"
          }`}
          aria-label="Upvote"
        >
          <ArrowBigUp size={16} />
          <span className="font-semibold">{post.upvotes ?? 0}</span>
        </button>

        <button
          onClick={() => onVote(post.id, "down")}
          className={`flex items-center justify-center gap-1 rounded-xl py-2 min-h-[44px] text-[11px] transition-all duration-200 motion-safe:active:scale-[0.98] ${
            userVote === "down"
              ? "bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 font-semibold shadow-sm"
              : "bg-slate-50/80 dark:bg-slate-800/80 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-slate-600 dark:text-slate-300"
          }`}
          aria-label="Downvote"
        >
          <ArrowBigDown size={16} />
          <span className="font-semibold">{post.downvotes ?? 0}</span>
        </button>

        <button
          onClick={onCommentClick}
          className="flex items-center justify-center gap-1 rounded-xl py-2 min-h-[44px] text-[11px] bg-slate-50/80 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:text-blue-600 dark:hover:text-blue-400 text-slate-600 dark:text-slate-300 transition-all duration-200 motion-safe:active:scale-[0.98]"
          aria-label="Comments"
        >
          <MessageCircle size={16} />
          <span className="font-semibold">{post.comments_count ?? 0}</span>
        </button>

        <button
          onClick={handleShare}
          aria-label="Share post"
          disabled={sharing}
          className="flex items-center justify-center rounded-xl py-2 min-h-[44px] text-[11px] bg-slate-50/80 dark:bg-slate-800/80 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 hover:text-cyan-600 dark:hover:text-cyan-400 text-slate-600 dark:text-slate-300 transition-all duration-200 motion-safe:active:scale-[0.98] disabled:opacity-50"
        >
          <Share2 size={16} />
        </button>

        <button
          onClick={handleSaveToggle}
          aria-label={saved ? "Unsave post" : "Save post"}
          className={`flex items-center justify-center rounded-xl py-2 min-h-[44px] text-[11px] transition-all duration-200 motion-safe:active:scale-[0.98] ${
            saved
              ? "bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 shadow-sm"
              : "bg-slate-50/80 dark:bg-slate-800/80 hover:bg-amber-50 dark:hover:bg-amber-950/20 hover:text-amber-600 dark:hover:text-amber-400 text-slate-600 dark:text-slate-300"
          }`}
        >
          <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>

      {/* ─── Quick emoji reactions ──────────────────────────────────────────── */}
      <div className="px-2.5 pb-2 flex items-center gap-1 flex-wrap">
        {["❤️", "😂", "😮", "😢", "😡"].map((emoji) => {
          const reaction = reactions.find((r) => r.emoji === emoji);
          const count = reaction?.count ?? 0;
          const active = reaction?.userReacted ?? false;
          return (
            <button
              key={emoji}
              onClick={() => handleReaction(emoji)}
              className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1 min-h-[36px] min-w-[44px] rounded-full transition-all duration-200 motion-safe:active:scale-[0.98] ${
                active
                  ? "bg-slate-200 dark:bg-slate-700 shadow-sm"
                  : "bg-slate-50/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
              aria-label={`React with ${emoji}`}
            >
              <span className="text-xs">{emoji}</span>
              {count > 0 && <span className="text-slate-500">{count}</span>}
            </button>
          );
        })}
      </div>
    </article>
  );
}
````

## File: src/features/posts/components/PostCardSkeleton.tsx
````typescript
export default function PostCardSkeleton() {
  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/70 dark:border-slate-700/70 rounded-2xl overflow-hidden animate-pulse shadow-sm">
      <div className="p-2.5 sm:p-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-slate-200/80 dark:bg-slate-700/80 shrink-0" />
          <div className="flex-1">
            <div className="h-3 w-24 bg-slate-200/80 dark:bg-slate-700/80 rounded mb-1" />
            <div className="h-2.5 w-14 bg-slate-200/80 dark:bg-slate-700/80 rounded" />
          </div>
        </div>
        <div className="mt-2 space-y-1.5">
          <div className="h-2.5 bg-slate-200/80 dark:bg-slate-700/80 rounded" />
          <div className="h-2.5 bg-slate-200/80 dark:bg-slate-700/80 rounded w-4/5" />
          <div className="h-2.5 bg-slate-200/80 dark:bg-slate-700/80 rounded w-3/5" />
        </div>
      </div>
      <div className="aspect-[16/9] bg-slate-200/80 dark:bg-slate-700/80" />
      <div className="px-1.5 py-1.5 sm:px-2 sm:py-1.5">
        <div className="grid grid-cols-5 gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-9 rounded-xl bg-slate-200/80 dark:bg-slate-700/80" />
          ))}
        </div>
      </div>
      <div className="px-2.5 pb-2 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-7 w-10 rounded-full bg-slate-200/80 dark:bg-slate-700/80" />
        ))}
      </div>
    </div>
  );
}
````

## File: src/features/posts/components/VoteButtons.tsx
````typescript
import { ChevronUp, ChevronDown } from "lucide-react";

interface Props {
  upvotes: number;
  downvotes: number;
  userVote?: "up" | "down" | null;
  onVote: (type: "up" | "down") => void;
}

export function VoteButtons({ upvotes, downvotes, userVote, onVote }: Props) {
  return (
    <div className="flex items-center gap-0.5 text-slate-500 dark:text-slate-400">
      <button
        onClick={() => onVote("up")}
        className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 ${userVote === "up" ? "text-blue-600" : ""}`}
        aria-label="Upvote"
      >
        <ChevronUp size={18} />
      </button>
      <span className="text-xs font-medium tabular-nums w-8 text-center">
        {upvotes - downvotes}
      </span>
      <button
        onClick={() => onVote("down")}
        className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 ${userVote === "down" ? "text-red-500" : ""}`}
        aria-label="Downvote"
      >
        <ChevronDown size={18} />
      </button>
    </div>
  );
}
````

## File: src/features/posts/hooks/usePosts.ts
````typescript
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePostsStore } from "../store/posts.store";
import { fetchPosts, fetchHotPosts, fetchAnonymousPosts } from "../services/posts.service";

import { useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { subscribeToPosts } from "../services/posts.service";

export function usePosts() {
  const sortMode = usePostsStore((s) => s.sortMode);
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["posts", sortMode],
    queryFn: async () => {
      if (sortMode === "hot") return fetchHotPosts(20);
      if (sortMode === "takes") return fetchAnonymousPosts(20);
      const res = await fetchPosts({ limit: 10, sortBy: "new" });
      return res.data;
    },
    staleTime: 1000 * 60,
  });

  // Realtime subscription
  useEffect(() => {
    const channel = subscribeToPosts(() => {
      queryClient.invalidateQueries({ queryKey: ["posts", sortMode] });
    });
    return () => {
      supabase.removeChannel(channel);
    };
  }, [sortMode, queryClient]);

  return {
    posts: postsQuery.data ?? [],
    isLoading: postsQuery.isLoading,
    isError: postsQuery.isError,
    error: postsQuery.error,
    refetch: postsQuery.refetch,
  };
}
````

## File: src/features/posts/hooks/usePostVote.ts
````typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { votePost } from "../services/posts.service";
import { supabase } from "../../../lib/supabase";

export function usePostVote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, type }: { postId: string; type: "up" | "down" }) => {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error("Not authenticated");
      await votePost(postId, user.id, type);
    },
    onMutate: async ({ postId, type }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      // Snapshot previous data
      const previousAll = queryClient.getQueriesData({ queryKey: ["posts"] });
      // Apply optimistic update
      queryClient.setQueriesData({ queryKey: ["posts"] }, (old: any) => {
        if (!old) return old;
        return old.map((p: any) => {
          if (p.id !== postId) return p;
          if (type === "up") return { ...p, upvotes: (p.upvotes ?? 0) + 1 };
          if (type === "down") return { ...p, downvotes: (p.downvotes ?? 0) + 1 };
          return p;
        });
      });
      return { previousAll };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousAll) {
        for (const [queryKey, data] of context.previousAll) {
          queryClient.setQueryData(queryKey, data);
        }
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
````

## File: src/features/posts/hooks/useRealtimePosts.ts
````typescript
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";
import { subscribeToPosts } from "../services/posts.service";

/**
 * Subscribes to post changes (INSERT/UPDATE/DELETE)
 * and invalidates the active posts query so the feed stays fresh.
 * Must be called inside a component that lives as long as the feed is visible.
 */
export function useRealtimePosts() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = subscribeToPosts(() => {
      // Invalidate all queries that start with "posts" so the active
      // sort mode refetches automatically.
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
}
````

## File: src/features/posts/services/posts.service.ts
````typescript
import { supabase } from "../../../lib/supabase";
import type { Database } from "../../../types/database.types";

export type PostWithProfile = Database["public"]["Tables"]["posts"]["Row"] & {
  profiles: {
    username: string | null;
    avatar_url: string | null;
    role: string | null;
  } | null;
  comments_count: number;
} & {
  is_anonymous?: boolean;
  voice_url?: string | null;
};

async function getCommentCounts(postIds: string[]): Promise<Record<string, number>> {
  if (postIds.length === 0) return {};
  const { data } = await supabase.from("comments").select("post_id").in("post_id", postIds);
  const counts: Record<string, number> = {};
  data?.forEach(({ post_id }) => {
    if (post_id) counts[post_id] = (counts[post_id] ?? 0) + 1;
  });
  return counts;
}

function normaliseProfile(raw: any) {
  return Array.isArray(raw.profiles) ? raw.profiles[0] ?? null : raw.profiles ?? null;
}

export async function fetchPosts({
  cursor,
  limit = 10,
  sortBy = "new",
}: { cursor?: string; limit?: number; sortBy?: "hot" | "new" } = {}) {
  let query = supabase
    .from("posts")
    .select("*, profiles(username, avatar_url, role, karma)")
    .limit(limit + 1);

  if (sortBy === "hot") {
    query = query.order("score", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
    if (cursor) query = query.lt("created_at", cursor);
  }

  const { data, error } = await query;
  if (error) throw error;

  const rows = data ?? [];
  const hasMore = rows.length > limit;
  const posts = hasMore ? rows.slice(0, limit) : rows;
  const countMap = await getCommentCounts(posts.map((p) => p.id));

  const enriched = posts.map((post: any) => ({
    ...post,
    profiles: normaliseProfile(post),
    comments_count: countMap[post.id] ?? 0,
  }));

  return {
    data: enriched as PostWithProfile[],
    nextCursor: hasMore && sortBy === "new" ? enriched[enriched.length - 1].created_at : null,
  };
}

export async function fetchHotPosts(limit = 20) {
  const result = await fetchPosts({ limit, sortBy: "hot" });
  return result.data;
}

export async function fetchAnonymousPosts(limit = 20) {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(username, avatar_url, role, karma)")
    .eq("is_anonymous", true)
    .gte("created_at", twentyFourHoursAgo)
    .order("upvotes", { ascending: false })
    .limit(limit);
  if (error) throw error;
  const posts = data ?? [];
  const countMap = await getCommentCounts(posts.map((p) => p.id));
  return posts.map((post: any) => ({
    ...post,
    profiles: normaliseProfile(post),
    comments_count: countMap[post.id] ?? 0,
  })) as PostWithProfile[];
}

export async function createPost(
  userId: string,
  content: string,
  imageUrl?: string | null,
  voiceUrl?: string | null,
  isAnonymous?: boolean
) {
  const { data, error } = await supabase
    .from("posts")
    .insert({
      user_id: userId,
      content,
      image_url: imageUrl ?? null,
      voice_url: voiceUrl ?? null,
      is_anonymous: isAnonymous ?? false,
      upvotes: 0,
      downvotes: 0,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function votePost(postId: string, userId: string, type: "up" | "down") {
  const { data: existing, error: fetchErr } = await supabase
    .from("post_votes")
    .select("id, vote_type")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();
  if (fetchErr) throw fetchErr;

  if (existing?.vote_type === type) {
    await supabase.from("post_votes").delete().eq("id", existing.id);
    await supabase.rpc("decrement_vote", { p_post_id: postId, p_column: type === "up" ? "upvotes" : "downvotes" });
    return;
  }

  if (existing) {
    await supabase.from("post_votes").update({ vote_type: type }).eq("id", existing.id);
    const addCol = type === "up" ? "upvotes" : "downvotes";
    const removeCol = type === "up" ? "downvotes" : "upvotes";
    await supabase.rpc("increment", { table_name: "posts", column_name: addCol, row_id: postId });
    await supabase.rpc("decrement_vote", { p_post_id: postId, p_column: removeCol });
    return;
  }

  await supabase.from("post_votes").insert({ post_id: postId, user_id: userId, vote_type: type });
  const col = type === "up" ? "upvotes" : "downvotes";
  await supabase.rpc("increment", { table_name: "posts", column_name: col, row_id: postId });
}

export async function deletePost(postId: string) {
  const { error } = await supabase.from("posts").delete().eq("id", postId);
  if (error) throw error;
}

export function subscribeToPosts(callback: (payload: any) => void) {
  return supabase
    .channel("posts-live")
    .on("postgres_changes", { event: "*", schema: "public", table: "posts" }, callback)
    .subscribe();
}

export async function fetchAllPostsForModeration() {
  const { data, error } = await supabase
    .from("posts")
    .select("*, profiles(username, avatar_url, role, karma)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((post: any) => ({
    ...post,
    profiles: normaliseProfile(post),
    comments_count: 0,
  })) as PostWithProfile[];
}

export async function fetchAllCommentsForModeration() {
  const { data, error } = await supabase
    .from("comments")
    .select("*, profiles(username, role)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function deleteComment(commentId: string) {
  const { error } = await supabase.from("comments").delete().eq("id", commentId);
  if (error) throw error;
}
````

## File: src/features/posts/store/posts.store.ts
````typescript
import { create } from "zustand";

type SortMode = "hot" | "new" | "takes";

interface PostsUIState {
  sortMode: SortMode;
  setSortMode: (mode: SortMode) => void;
}

export const usePostsStore = create<PostsUIState>((set) => ({
  sortMode: "hot",
  setSortMode: (mode) => set({ sortMode: mode }),
}));
````

## File: src/features/profile/components/AccessibilityPanel.tsx
````typescript
import { useTranslation } from "react-i18next";
import { useThemeStore } from "../../../store/themeStore";
import { useAccessibilityStore } from "../../../store/accessibility.store";
import { Type, Sun, Moon, Languages } from "lucide-react";

export function AccessibilityPanel() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useThemeStore();
  const { fontSize, setFontSize, highContrast, toggleHighContrast } =
    useAccessibilityStore();
  const darkMode = theme === "dark";

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-3">
        <h3 className="text-white font-bold text-sm">
          {t("accessibility title") || "Accessibility"}
        </h3>
      </div>

      <div className="p-4 space-y-5">
        {/* Font Size */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
            <Type size={14} />
            {t("accessibility fontSize") || "Font Size"}
          </p>
          <div className="flex gap-2">
            {(["normal", "large", "x-large"] as const).map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  fontSize === size
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {size === "normal" ? "A" : size === "large" ? "A+" : "A++"}
              </button>
            ))}
          </div>
        </div>

        {/* Dark Mode */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
            {darkMode ? <Moon size={14} /> : <Sun size={14} />}
            {t("accessibility displayMode") || "Display Mode"}
          </p>
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <span>
              {darkMode
                ? t("accessibility darkMode") || "Dark Mode"
                : t("accessibility lightMode") || "Light Mode"}
            </span>
            <span className="text-[10px] text-slate-400">
              {darkMode ? "ON" : "OFF"}
            </span>
          </button>
        </div>

        {/* High Contrast */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            {t("accessibility highContrast") || "High Contrast"}
          </p>
          <button
            onClick={toggleHighContrast}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              highContrast
                ? "bg-yellow-400 text-black shadow-md"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <span>High Contrast</span>
            <span className="text-[10px]">{highContrast ? "ON" : "OFF"}</span>
          </button>
        </div>

        {/* Language */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
            <Languages size={14} />
            {t("accessibility language") || "Language"}
          </p>
          <select
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-400 dark:focus:border-cyan-500 transition-colors"
            aria-label={t("accessibility selectLanguage") || "Select language"}
          >
            <option value="en">English</option>
            <option value="bem">Bemba</option>
            <option value="nya">Chinyanja</option>
          </select>
        </div>
      </div>
    </div>
  );
}
````

## File: src/features/profile/components/ActivityCard.tsx
````typescript
interface Props {
  type: "post" | "comment";
  content: string;
  date: string;
}

export function ActivityCard({ type, content, date }: Props) {
  return (
    <div className="rounded-xl bg-white dark:bg-slate-900 p-3 shadow-sm border border-slate-100 dark:border-slate-800">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
        {type === "post" ? "Posted" : "Commented"}
      </p>
      <p className="text-sm text-slate-700 dark:text-slate-200 line-clamp-2">{content}</p>
      <p className="text-[11px] text-slate-400 mt-1">{new Date(date).toLocaleDateString()}</p>
    </div>
  );
}
````

## File: src/features/profile/components/LecturerBadge.tsx
````typescript
export function LecturerBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 dark:bg-green-950/40 px-1.5 py-0.5 text-[9px] font-bold uppercase text-green-600 dark:text-green-400">
      🎓 Verified Lecturer
    </span>
  );
}
````

## File: src/features/profile/components/ProfileActions.tsx
````typescript
import { useNavigate } from "react-router-dom";
import {
  Bookmark, MessageSquare, Users, Trophy, Lock, Settings,

} from "lucide-react";
import { ProfileItem } from "./ProfileItem";

interface Props {
  isOwn: boolean;
  userId: string | undefined;
}

export function ProfileActions({ isOwn, userId }: Props) {
  const navigate = useNavigate();
  const target = userId ? `/profile/${userId}` : "/profile";

  const links = [
    { icon: <Bookmark size={20} />, label: "Saved Posts", path: "/profile/saved", ownOnly: true },
    { icon: <MessageSquare size={20} />, label: "My Discussions", path: `${target}/discussions` },
    { icon: <Users size={20} />, label: "Campus Groups", path: `${target}/groups` },
    { icon: <Trophy size={20} />, label: "Achievements", path: `${target}/achievements` },
    { icon: <Lock size={20} />, label: "Privacy & Security", path: `${target}/privacy`, ownOnly: true },
    { icon: <Settings size={20} />, label: "Settings", path: "/settings", ownOnly: true },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm">
      {links
        .filter((l) => !l.ownOnly || isOwn)
        .map(({ icon, label, path }) => (
          <ProfileItem key={label} icon={icon} label={label} onClick={() => navigate(path)} />
        ))}
    </div>
  );
}
````

## File: src/features/profile/components/ProfileHeader.tsx
````typescript
import { getTier, TIER_COLORS } from "../../study/utils/tiers";

interface Props {
  avatarUrl: string | null;
  username: string;
  karma?: number;
}

export function ProfileHeader({ avatarUrl, username, karma = 0 }: Props) {
  const tier = getTier(karma);
  return (
    <div className="relative">
      <div className="h-36 rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400" />
      <div className="absolute -bottom-10 left-5">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-4 border-white dark:border-slate-950 bg-white dark:bg-slate-900 shadow-xl flex items-center justify-center">
            {avatarUrl ? (
              <img src={avatarUrl} alt={username} className="h-full w-full rounded-full object-cover" />
            ) : (
              <span className="text-3xl font-bold">{username?.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <span style={{ backgroundColor: TIER_COLORS[tier] }} className="absolute bottom-0 right-0 px-2 py-1 rounded-full text-[10px] font-bold text-white capitalize shadow-md">
            {tier}
          </span>
        </div>
      </div>
    </div>
  );
}
````

## File: src/features/profile/components/ProfileInfo.tsx
````typescript
import { useNavigate } from "react-router-dom";
import {
  Send, UserX, UserPlus, Moon, Bell, BellOff,
} from "lucide-react";
import { usePushNotifications } from "../../../hooks/usePushNotifications";
import { useThemeStore } from "../../../store/themeStore";
import { getTier, TIER_COLORS } from "../../study/utils/tiers";
import { LecturerBadge } from "./LecturerBadge";
import { ProfileItem } from "./ProfileItem";

interface Props {
  profile: {
    username: string | null;
    role: string;
    created_at: string | null;
    bio?: string | null;
    id: string;
    karma?: number;
    is_lecturer?: boolean | null;
  };
  isOwn: boolean;
  blocked: boolean;
  onMessage: () => void;
  onToggleBlock: () => void;
}

export function ProfileInfo({ profile, isOwn, blocked, onMessage, onToggleBlock }: Props) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();
  const { subscribed, requestPermission, unsubscribe } = usePushNotifications();
  const darkMode = theme === "dark";

  return (
    <div className="pt-12">
      <div className="flex items-center gap-2 flex-wrap">
        <h1 className="text-2xl font-bold">{profile.username ?? "Anonymous"}</h1>
        {profile.karma !== undefined && (
          <span style={{ backgroundColor: TIER_COLORS[getTier(profile.karma)] }} className="px-2 py-0.5 rounded-full text-xs font-bold text-white capitalize">
            {getTier(profile.karma)}
          </span>
        )}
        {profile.is_lecturer && <LecturerBadge />}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span
          className={`px-3 py-1 rounded-full text-xs text-white ${
            profile.role === "admin" ? "bg-red-500" : profile.role === "moderator" ? "bg-green-500" : "bg-blue-500"
          }`}
        >
          {profile.role === "admin" ? "🛡 Admin" : profile.role === "moderator" ? "🛠 Moderator" : "🎓 Student"}
        </span>
        <span className="text-sm opacity-70">Member since {new Date(profile.created_at!).getFullYear()}</span>
      </div>
      {profile.bio && <p className="mt-4 text-slate-600 dark:text-slate-300">{profile.bio}</p>}

      {isOwn ? (
        <div className="mt-4 space-y-2">
          <button onClick={() => navigate("/profile/edit")} className="rounded-2xl bg-blue-600 text-white px-4 py-2 text-sm min-h-[44px] w-full font-semibold shadow-sm transition-all duration-200 motion-safe:active:scale-[0.98]">
            Edit Profile
          </button>
          <ProfileItem icon={<Moon size={20} />} label={darkMode ? "Dark Mode ON" : "Dark Mode OFF"} onClick={toggleTheme} />
          <ProfileItem
            icon={subscribed ? <Bell size={20} /> : <BellOff size={20} />}
            label={subscribed ? "Notifications ON" : "Enable Notifications"}
            onClick={subscribed ? unsubscribe : requestPermission}
          />
        </div>
      ) : (
        <div className="mt-4 flex gap-2">
          <button
            onClick={onMessage}
            className="flex-1 rounded-2xl bg-blue-600 text-white px-4 py-2 text-sm flex items-center justify-center gap-2 min-h-[44px] font-semibold shadow-sm transition-all duration-200 motion-safe:active:scale-[0.98]"
          >
            <Send size={20} /> Message
          </button>
          <button
            onClick={onToggleBlock}
            className={`rounded-2xl px-4 py-2 text-sm flex items-center justify-center gap-2 border min-h-[44px] font-semibold transition-all duration-200 motion-safe:active:scale-[0.98] ${
              blocked ? "border-red-500 text-red-500 hover:bg-red-50" : "border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {blocked ? <UserX size={20} /> : <UserPlus size={20} />}
            {blocked ? "Unblock" : "Block"}
          </button>
        </div>
      )}
    </div>
  );
}
````

## File: src/features/profile/components/ProfileItem.tsx
````typescript
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

export function ProfileItem({ icon, label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-5 py-4 min-h-[44px] border-b border-slate-100 dark:border-slate-800 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 motion-safe:active:scale-[0.98]"
    >
      <div className="flex items-center gap-3 font-medium">
        {icon} <span>{label}</span>
      </div>
      <ChevronRight size={20} />
    </button>
  );
}
````

## File: src/features/profile/components/ProfileStats.tsx
````typescript
import { StatBox } from "./StatBox";

interface Props {
  stats: { posts: number; comments: number; karma: number };
}

export function ProfileStats({ stats }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <StatBox label="Posts" value={stats.posts} />
      <StatBox label="Karma" value={stats.karma} />
      <StatBox label="Comments" value={stats.comments} />
    </div>
  );
}
````

## File: src/features/profile/components/RecentActivity.tsx
````typescript
import { useNavigate } from "react-router-dom";
import { ActivityCard } from "./ActivityCard";

interface Props {
  activities: { posts: any[]; comments: any[] };
  userId?: string;
}

export function RecentActivity({ activities, userId }: Props) {
  const navigate = useNavigate();
  const previewPosts = activities.posts.slice(0, 2);
  const previewComments = activities.comments.slice(0, 2);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-lg">Recent Activity</h2>
        {activities.posts.length > 2 || activities.comments.length > 2 ? (
          <button
            onClick={() => navigate(`/profile/${userId}/discussions`)}
            className="text-sm text-blue-600 dark:text-blue-400 font-medium"
          >
            View all
          </button>
        ) : null}
      </div>
      <div className="space-y-2">
        {previewPosts.map((post) => (
          <ActivityCard key={post.id} type="post" content={post.content} date={post.created_at} />
        ))}
        {previewComments.map((comment) => (
          <ActivityCard key={comment.id} type="comment" content={comment.content} date={comment.created_at} />
        ))}
        {previewPosts.length === 0 && previewComments.length === 0 && (
          <p className="text-sm opacity-60">No recent activity</p>
        )}
      </div>
    </div>
  );
}
````

## File: src/features/profile/components/StatBox.tsx
````typescript
interface Props {
  label: string;
  value: number;
}

export function StatBox({ label, value }: Props) {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 p-4 text-center shadow-sm">
      <h2 className="font-bold text-xl">{value}</h2>
      <p className="text-xs opacity-70">{label}</p>
    </div>
  );
}
````

## File: src/features/profile/hooks/useBlockUser.ts
````typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blockUser, unblockUser, isBlocked as checkBlocked } from "../../../services/blockService";
import { useAuthStore } from "../../../store/authStore";

export function useBlockUser(targetUserId: string | undefined) {
  const queryClient = useQueryClient();
  const currentUser = useAuthStore((s) => s.user);
  const isOwn = !targetUserId || targetUserId === currentUser?.id;

  const blockedQuery = useQuery({
    queryKey: ["blocked", targetUserId],
    queryFn: () => checkBlocked(targetUserId!),
    enabled: !!targetUserId && !isOwn,
  });

  const blockMutation = useMutation({
    mutationFn: () => blockUser(targetUserId!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blocked", targetUserId] }),
  });

  const unblockMutation = useMutation({
    mutationFn: () => unblockUser(targetUserId!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blocked", targetUserId] }),
  });

  return {
    blocked: blockedQuery.data ?? false,
    toggleBlock: () => (blockedQuery.data ? unblockMutation.mutate() : blockMutation.mutate()),
    isToggling: blockMutation.isPending || unblockMutation.isPending,
  };
}
````

## File: src/features/profile/hooks/useProfileData.ts
````typescript
import { useQuery } from "@tanstack/react-query";
import { fetchProfile, fetchUserStats, fetchRecentActivity } from "../services/profile.service";

export function useProfileData(userId: string | undefined) {
  const profileQuery = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => fetchProfile(userId!),
    enabled: !!userId,
  });

  const statsQuery = useQuery({
    queryKey: ["profileStats", userId],
    queryFn: () => fetchUserStats(userId!),
    enabled: !!userId,
  });

  const activityQuery = useQuery({
    queryKey: ["profileActivity", userId],
    queryFn: () => fetchRecentActivity(userId!),
    enabled: !!userId,
  });

  return {
    profile: profileQuery.data ?? null,
    isLoading: profileQuery.isLoading,
    error: profileQuery.error,
    stats: statsQuery.data ?? { posts: 0, comments: 0, karma: 0 },
    activities: activityQuery.data ?? { posts: [], comments: [] },
    refetch: () => {
      profileQuery.refetch();
      statsQuery.refetch();
      activityQuery.refetch();
    },
  };
}
````

## File: src/features/profile/services/profile.service.ts
````typescript
import { supabase } from "../../../lib/supabase";
import type { Database } from "../../../types/database.types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
}

export async function fetchUserStats(userId: string) {
  const { count: postCount } = await supabase
    .from("posts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  const { count: commentCount } = await supabase
    .from("comments")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  const { data: upvotes } = await supabase
    .from("posts")
    .select("upvotes")
    .eq("user_id", userId);
  const totalUpvotes = upvotes?.reduce((sum, p) => sum + (p.upvotes ?? 0), 0) ?? 0;

  return {
    posts: postCount ?? 0,
    comments: commentCount ?? 0,
    karma: totalUpvotes,
  };
}

export async function fetchRecentActivity(userId: string) {
  const { data: posts } = await supabase
    .from("posts")
    .select("id, content, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: comments } = await supabase
    .from("comments")
    .select("id, content, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(5);

  return { posts: posts ?? [], comments: comments ?? [] };
}
````

## File: src/features/rooms/components/StudyRoom.tsx
````typescript
import { useParams, useNavigate } from "react-router-dom";
import AppShell from "../../../components/layout/AppShell";
import { useWebRTC } from "../hooks/useWebRTC";
import { Mic, MicOff, PhoneOff, Phone, Users, ArrowLeft } from "lucide-react";

export default function StudyRoom() {
  const { id: roomId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { isJoined, participants, isMuted, joinRoom, leaveRoom, toggleMute } =
    useWebRTC(roomId!);

  return (
    <AppShell>
      <div className="p-4">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">Real-Time Study Rooms</h1>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Users size={18} />
            <h2 className="font-semibold">Participants ({participants.length})</h2>
          </div>
          {participants.length === 0 && (
            <p className="text-sm text-slate-500">No one else is here yet.</p>
          )}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          {!isJoined ? (
            <button
              onClick={joinRoom}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
            >
              <Phone size={20} />
              Join Room
            </button>
          ) : (
            <>
              <button
                onClick={toggleMute}
                className={`p-4 rounded-full ${
                  isMuted
                    ? "bg-red-100 dark:bg-red-900/30 text-red-600"
                    : "bg-blue-100 dark:bg-blue-900/30 text-blue-600"
                }`}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
              </button>
              <button
                onClick={leaveRoom}
                className="p-4 rounded-full bg-red-600 text-white"
                aria-label="Leave room"
              >
                <PhoneOff size={24} />
              </button>
            </>
          )}
        </div>
      </div>
    </AppShell>
  );
}
````

## File: src/features/rooms/hooks/useWebRTC.ts
````typescript
import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "../../../lib/supabase";


const ICE_SERVERS: RTCConfiguration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

type SignalType = "offer" | "answer" | "ice-candidate";

type WebRTCSdpPayload = {
  sdp: string | null;
};

type IceCandidatePayload = RTCIceCandidateInit;

type WeRTCSignalRow = {
  sender_id: string;
  type: SignalType;
  payload: WebRTCSdpPayload | IceCandidatePayload;
};

export function useWebRTC(roomId: string) {
  const [isJoined, setIsJoined] = useState(false);
  const [participants, setParticipants] = useState<string[]>([]);
  const [isMuted, setIsMuted] = useState(false);

  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localStream = useRef<MediaStream | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);
  const userIdRef = useRef<string | null>(null);

  // Get current user id
  useEffect(() => {
    supabase.auth.getUser().then(({ data }: any) => {
      userIdRef.current = data.user?.id ?? null;
    });
  }, []);

  // Start local media
  const startLocalStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      localStream.current = stream;
      return stream;
    } catch (err) {
      console.warn("Microphone access denied or not available.");
      return null;
    }
  }, []);


  const createPeerConnection = useCallback(() => {
    const pc = new RTCPeerConnection(ICE_SERVERS);
    peerConnection.current = pc;

    // Add local tracks
    localStream.current?.getTracks().forEach((track) => {
      pc.addTrack(track, localStream.current!);
    });

    // Handle remote stream
    pc.ontrack = (event) => {
      if (!remoteAudioRef.current) {
        remoteAudioRef.current = new Audio();
        remoteAudioRef.current.autoplay = true;
        document.body.appendChild(remoteAudioRef.current);
      }
      remoteAudioRef.current.srcObject = event.streams[0];
    };

    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (!event.candidate) return;
      if (!userIdRef.current) return;

      (supabase as any).from("webrtc_signals").insert({
        room_id: roomId,
        sender_id: userIdRef.current,
        receiver_id: undefined,
        type: "ice-candidate",
        payload: event.candidate.toJSON(),
      });
    };

    return pc;
  }, [roomId]);

  const sendOffer = useCallback(async () => {
    const pc = createPeerConnection();

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    if (!userIdRef.current) return;

    await (supabase as any).from("webrtc_signals").insert({
      room_id: roomId,
      sender_id: userIdRef.current,
      receiver_id: null,
      type: "offer",
      payload: { sdp: offer.sdp },
    });
  }, [createPeerConnection, roomId]);

  const handleSignal = useCallback(
    async (signal: WeRTCSignalRow) => {
      if (!userIdRef.current) return;
      if (signal.sender_id === userIdRef.current) return;

      const pc = peerConnection.current ?? createPeerConnection();

      if (signal.type === "offer") {
        const payload = signal.payload as WebRTCSdpPayload;
        if (!payload.sdp) return;
        await pc.setRemoteDescription({ type: "offer", sdp: payload.sdp } as RTCSessionDescriptionInit);

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        await (supabase as any)
          .from("webrtc_signals")
          .insert({
            room_id: roomId,
            sender_id: userIdRef.current,
            receiver_id: undefined,
            type: "answer",
            payload: { sdp: answer.sdp },
          });
      } else if (signal.type === "answer") {
        const payload = signal.payload as WebRTCSdpPayload;
        if (!payload.sdp) return;
        await pc.setRemoteDescription({ type: "answer", sdp: payload.sdp } as RTCSessionDescriptionInit);
      } else if (signal.type === "ice-candidate") {
        const payload = signal.payload as IceCandidatePayload;
        await pc.addIceCandidate(new RTCIceCandidate(payload));
      }
    },
    [createPeerConnection, roomId]
  );

  const joinRoom = useCallback(async () => {
    const stream = await startLocalStream();
    if (!stream) {
      alert("Microphone not available. Please check your device settings.");
      return;
    }

    await sendOffer();
    setIsJoined(true);
    if (userIdRef.current) setParticipants([userIdRef.current]);
  }, [startLocalStream, sendOffer]);

  const leaveRoom = useCallback(() => {

    peerConnection.current?.close();
    localStream.current?.getTracks().forEach((t) => t.stop());
    if (remoteAudioRef.current?.srcObject) {
      remoteAudioRef.current.srcObject = null;
    }
    remoteAudioRef.current?.remove();

    peerConnection.current = null;
    localStream.current = null;
    remoteAudioRef.current = null;

    setIsJoined(false);
    setParticipants([]);
  }, []);

  const toggleMute = useCallback(() => {
    if (!localStream.current) return;
    localStream.current.getAudioTracks().forEach((t) => (t.enabled = isMuted));
    setIsMuted((prev) => !prev);
  }, [isMuted]);

  // Realtime subscription for signals
  useEffect(() => {
    const userId = userIdRef.current;
    if (!roomId || !userId) return;

    const channel = supabase
      .channel(`webrtc-${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "webrtc_signals",
          filter: `room_id=eq.${roomId}`,
        },
    (payload: any) => {
          // Cast payload.new to our runtime shape; TS Supabase typing won't include this table.
          handleSignal(payload.new as WeRTCSignalRow);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, handleSignal]);

  return { isJoined, participants, isMuted, joinRoom, leaveRoom, toggleMute };
}
````

## File: src/features/study/components/FilterChips.tsx
````typescript
export { SearchBar } from "../../../components/common/SearchBar";
export { EmptyState } from "../../../components/common/EmptyState"; // if needed

export function ChipScroll({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{children}</div>;
}

export function Chip({ active, accent, onClick, children }: { active: boolean; accent?: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={active && accent ? { background: accent, color: "#fff", borderColor: accent, boxShadow: `0 0 10px ${accent}55` } : undefined}
      className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 whitespace-nowrap ${
        active && !accent ? "bg-blue-600 dark:bg-cyan-500 text-white border-blue-600 dark:border-cyan-500" : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700"
      }`}
    >
      {children}
    </button>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 px-0.5">{children}</p>;
}
````

## File: src/features/study/components/GradeEstimator.tsx
````typescript
export function GradeEstimator() {
  return (
    <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950/30 dark:to-pink-950/30 rounded-2xl text-center">
      <p className="text-sm font-semibold">📊 Predicted GPA</p>
      <p className="text-3xl font-bold text-purple-600">Keep contributing!</p>
      <p className="text-xs text-slate-500">More karma unlocks your estimate</p>
    </div>
  );
}
````

## File: src/features/study/components/MaterialCard.tsx
````typescript
import type { StudyMaterial } from "../services/study.service";
import { TYPE_META } from "../constants";

interface Props {
  material: StudyMaterial;
  saved: boolean;
  subjectColor: string;
  onToggleSave: (materialId: string, saved: boolean) => void;
  onOpen: (material: StudyMaterial) => void;
}

export function MaterialCard({ material, saved, subjectColor, onToggleSave, onOpen }: Props) {
  const meta = TYPE_META[material.material_type] ?? TYPE_META["resource"];
  const timeAgo = new Date(material.created_at).toLocaleDateString();

  return (
    <div
      onClick={() => onOpen(material)}
      style={{ borderLeftColor: subjectColor }}
      className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 border-l-[3px] rounded-2xl p-4 cursor-pointer active:scale-[0.99] transition-transform duration-100"
    >
      <div className="flex items-center justify-between mb-2">
        <span
          style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.border}33` }}
          className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full"
        >
          {meta.icon} {meta.label}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleSave(material.id, saved); }}
          className="text-lg leading-none p-0.5"
          aria-label={saved ? "Unsave" : "Save"}
        >
          {saved ? "🔖" : "🏷️"}
        </button>
      </div>
      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug mb-1 line-clamp-2">{material.title}</h3>
      {material.description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-2 line-clamp-2">{material.description}</p>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span style={{ background: `${subjectColor}18`, color: subjectColor }} className="text-[11px] font-bold px-2 py-0.5 rounded-full">{material.subject}</span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 rounded-full px-2 py-0.5">{material.year_group}</span>
        </div>
        <span className="text-[11px] text-slate-400">{material.download_count > 0 && `⬇ ${material.download_count} · `}{timeAgo}</span>
      </div>
    </div>
  );
}
````

## File: src/features/study/components/MaterialDrawer.tsx
````typescript
import { useEffect, useRef, useState } from "react";
import { Flag, Upload } from "lucide-react";
import type { StudyMaterial } from "../services/study.service";
import { MaterialCard } from "./MaterialCard";
import { useAuthStore } from "../../../store/authStore";
import { reportMaterial } from "../../../services/reportService";
import { uploadNewVersion } from "../services/study.service";
import { supabase } from "../../../lib/supabase";

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
````

## File: src/features/study/components/RatingStars.tsx
````typescript
interface Props {
  rating: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export function RatingStars({ rating, interactive = false, onChange }: Props) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          disabled={!interactive}
          onClick={() => onChange?.(star)}
          className={`text-lg ${star <= rating ? "text-yellow-500" : "text-slate-300 dark:text-slate-600"} ${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
````

## File: src/features/study/components/ReactionBar.tsx
````typescript
const EMOJIS = ["❤️", "🙏", "🔥", "💡", "🎉"];

interface Props {
  reactions: { emoji: string; user_id: string }[];
  currentUserId?: string;
  onToggle: (emoji: string) => void;
}

export function ReactionBar({ reactions, currentUserId, onToggle }: Props) {
  const counts = EMOJIS.map((emoji) => ({
    emoji,
    count: reactions.filter((r) => r.emoji === emoji).length,
    active: reactions.some((r) => r.emoji === emoji && r.user_id === currentUserId),
  }));

  return (
    <div className="flex gap-2 mt-3">
      {counts.map(({ emoji, count, active }) => (
        <button
          key={emoji}
          onClick={() => onToggle(emoji)}
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm ${active ? "bg-blue-100 dark:bg-blue-900/30" : "bg-slate-100 dark:bg-slate-800"}`}
        >
          <span>{emoji}</span>
          <span className="text-xs">{count}</span>
        </button>
      ))}
    </div>
  );
}
````

## File: src/features/study/components/RequestForm.tsx
````typescript
import { useState } from "react";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useToastStore } from "../../../store/toastStore";

interface Props {
  onSubmit: (data: { title: string; description?: string; subject?: string }) => Promise<void>;
}

export function RequestForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { showToast } = useToastStore();

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Please enter what you're looking for.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await onSubmit({ title: title.trim(), description: description.trim(), subject: subject.trim() });
      setTitle("");
      setDescription("");
      setSubject("");
      setSuccess(true);
      showToast("Request submitted successfully!", "ok");
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      const message = err?.message || "Something went wrong. Please try again.";
      setError(message);
      showToast(message, "err");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700/70 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3">
        <h3 className="text-white font-bold text-sm flex items-center gap-2">
          <Send size={14} />
          Request a Material
        </h3>
      </div>

      <div className="p-4 space-y-3">
        {/* Success banner */}
        {success && (
          <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl px-3 py-2 text-xs text-emerald-700 dark:text-emerald-400">
            <CheckCircle size={14} />
            Your request has been posted. Someone will upload it soon!
          </div>
        )}

        {/* Title */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 block">
            What do you need? *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setError(""); }}
            placeholder="e.g. Past paper for CSC 201, thermodynamics notes…"
            maxLength={150}
            className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-400 dark:focus:border-cyan-500 transition-colors"
          />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-slate-400">{title.length}/150</span>
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 block">
            Subject (optional)
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Mathematics, Physics…"
            className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-400 dark:focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 block">
            Description (optional)
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Any additional details…"
            className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-400 dark:focus:border-cyan-500 transition-colors resize-none"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
            <AlertCircle size={12} />
            {error}
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={loading || !title.trim()}
          className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Submitting…
            </>
          ) : (
            <>
              <Send size={16} />
              Send Request
            </>
          )}
        </button>
      </div>
    </div>
  );
}
````

## File: src/features/study/components/StudyGrid.tsx
````typescript
import { MaterialCard } from "./MaterialCard";
import type { StudyMaterial } from "../services/study.service";

interface Props {
  materials: StudyMaterial[];
  savedIds: Set<string>;
  subjectColorMap: Record<string, string>;
  onToggleSave: (materialId: string, saved: boolean) => void;
  onOpen: (material: StudyMaterial) => void;
}

export function StudyGrid({ materials, savedIds, subjectColorMap, onToggleSave, onOpen }: Props) {
  if (materials.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
        <span className="text-5xl">📚</span>
        <p className="text-base font-bold text-slate-500">No materials found</p>
      </div>
    );
  }

  const uniqueMaterials = Array.from(new Map(materials.map((m) => [m.id, m])).values());

  return (
    <div className="flex flex-col gap-2.5">
      {uniqueMaterials.map((m) => (
        <MaterialCard
          key={m.id}
          material={m}
          saved={savedIds.has(m.id)}
          subjectColor={subjectColorMap[m.subject] ?? "#6366F1"}
          onToggleSave={onToggleSave}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}
````

## File: src/features/study/components/StudyGroupCard.tsx
````typescript
import type { Community } from "../../../types/community";

interface Props {
  group: Community;
  isMember: boolean;
  canDelete: boolean;
  onJoin: () => void;
  onLeave: () => void;
  onChat: () => void;
  onDelete: () => void;
}

export function StudyGroupCard({
  group,
  isMember,
  canDelete,
  onJoin,
  onLeave,
  onChat,
  onDelete,
}: Props) {
  return (
    <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] active:scale-[0.985] transition-all duration-200 motion-safe:active:scale-[0.985]">


      <h3 className="font-semibold">{group.name}</h3>
      {/* Course used to be a dedicated column in study_groups; community stores it in name/description for now. */}
      <p className="text-xs text-slate-500">
        {group.description ? group.description : group.year ? `Year: ${group.year}` : ""}
      </p>
      {group.description && <p className="text-xs mt-1">{group.description}</p>}
      <div className="flex gap-2 mt-2">
        {isMember ? (
          <>
            <button onClick={onChat} className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full">
              Chat
            </button>
            <button onClick={onLeave} className="text-xs border px-3 py-1 rounded-full">
              Leave
            </button>
          </>
        ) : (
          <button onClick={onJoin} className="text-xs bg-green-600 text-white px-3 py-1 rounded-full">
            Join
          </button>
        )}
      </div>

      {canDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-xs text-red-500 mt-2 hover:underline"
        >
          Delete Group
        </button>
      )}
    </div>
  );
}
````

## File: src/features/study/components/StudyGroupsSections.tsx
````typescript
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudyGroupCard } from "./StudyGroupCard";
import { useStudyGroups } from "../hooks/useStudyGroups";
import { useToastStore } from "../../../store/toastStore";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "../../../store/authStore";
import type { Community } from "../../../types/community";

export function StudyGroupsSection() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { groups, isLoading, createGroup, join, leave, deleteGroup } = useStudyGroups();
  const { showToast } = useToastStore();

  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [groupCourse, setGroupCourse] = useState("");
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (!name.trim() || !groupCourse.trim()) {
      showToast("Please fill in the group name and course.", "err");
      return;
    }
    setCreating(true);
    try {
      await createGroup({
        name: name.trim(),
        course: groupCourse.trim(),
        description: desc.trim(),
      });
      setName("");
      setDesc("");
      setGroupCourse("");
      setShowCreate(false);
      showToast("Study group created! Invite your classmates.", "ok");
    } catch (err: any) {
      const message = err?.message || "Failed to create study group. Try again.";
      showToast(message, "err");
    } finally {
      setCreating(false);
    }
  };

  const isMember = (_groupId: string) => true; // placeholder – will be updated with real membership check later

  const currentUserId = user?.id;
  const isAdmin = user?.role === "admin";
  const canDelete = (group: Community) => {
    return !!currentUserId && (group.created_by === currentUserId || isAdmin);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold">📚 Study Groups</h2>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="text-sm text-blue-600 font-semibold"
        >
          {showCreate ? "Cancel" : "+ New"}
        </button>
      </div>

      {showCreate && (
        <div className="mb-4 space-y-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border">
          <input
            placeholder="Group name (e.g., Physics 101)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-xl text-sm bg-slate-50 dark:bg-slate-800"
          />
          <input
            placeholder="Course (e.g., PHY 101)"
            value={groupCourse}
            onChange={(e) => setGroupCourse(e.target.value)}
            className="w-full p-3 border rounded-xl text-sm bg-slate-50 dark:bg-slate-800"
          />
          <textarea
            placeholder="Description (optional)"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full p-3 border rounded-xl text-sm bg-slate-50 dark:bg-slate-800 resize-none"
            rows={2}
          />
          <button
            onClick={handleCreate}
            disabled={creating}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {creating ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Creating...
              </>
            ) : (
              "Create Group"
            )}
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-24 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse"
            />
          ))}
        </div>
      ) : groups.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-6">
          No study groups yet. Create one to get started!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {groups.map((group) => (
            <StudyGroupCard
              key={group.id}
              group={group}
              isMember={isMember(group.id)}
              canDelete={canDelete(group)}
              onJoin={() => join(group.id)}
              onLeave={() => leave(group.id)}
              onChat={() => navigate(`/community/${group.id}/chat`)}
              onDelete={() => deleteGroup(group.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
````

## File: src/features/study/constants.ts
````typescript
export const YEAR_GROUPS = ["All", "Year 1", "Year 2", "Year 3", "Year 4", "Postgrad"];

export const MATERIAL_TYPES = [
  { value: "All",        label: "All",         icon: "📚" },
  { value: "notes",      label: "Notes",       icon: "📝" },
  { value: "slides",     label: "Slides",      icon: "🖼️" },
  { value: "past_paper", label: "Past Papers", icon: "📄" },
  { value: "assignment", label: "Assignments", icon: "✏️" },
  { value: "resource",   label: "Resources",   icon: "🔗" },
  { value: "video",      label: "Videos",      icon: "🎬" },
];

export const TYPE_META: Record<string, { color: string; bg: string; border: string; icon: string; label: string }> = {
  notes:      { color: "#818CF8", bg: "rgba(99,102,241,0.15)",  border: "#6366F1", icon: "📝", label: "Notes"      },
  slides:     { color: "#34D399", bg: "rgba(52,211,153,0.15)",  border: "#10B981", icon: "🖼️", label: "Slides"     },
  past_paper: { color: "#F59E0B", bg: "rgba(245,158,11,0.15)", border: "#F59E0B", icon: "📄", label: "Past Paper" },
  assignment: { color: "#F87171", bg: "rgba(248,113,113,0.15)",border: "#EF4444", icon: "✏️", label: "Assignment" },
  resource:   { color: "#60A5FA", bg: "rgba(96,165,250,0.15)", border: "#3B82F6", icon: "🔗", label: "Resource"   },
  video:      { color: "#C084FC", bg: "rgba(192,132,252,0.15)",border: "#A855F7", icon: "🎬", label: "Video"      },
};

export const SUBJECT_COLORS = [
  "#6366F1","#10B981","#F59E0B","#EF4444","#3B82F6",
  "#A855F7","#EC4899","#14B8A6","#F97316","#06B6D4",
];
````

## File: src/features/study/hooks/useContinueLearning.ts
````typescript
import { useQuery } from "@tanstack/react-query";
import { fetchRecentlyViewed } from "../services/study.service";
import { useAuthStore } from "../../../store/authStore";

export function useContinueLearning() {
  const user = useAuthStore((s) => s.user);
  return useQuery({
    queryKey: ["continueLearning", user?.id],
    queryFn: () => fetchRecentlyViewed(user!.id),
    enabled: !!user,
  });
}
````

## File: src/features/study/hooks/useCredits.ts
````typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";
import { spendCredits, fetchUnlockedMaterialIds } from "../services/study.service";
import { useAuthStore } from "../../../store/authStore";

export function useCredits() {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  const creditsQuery = useQuery({
    queryKey: ["userCredits", user?.id],
    queryFn: async () => {
      if (!user) return 0;
      const { data } = await supabase
        .from("profiles")
        .select("credits")
        .eq("id", user.id)
        .single();
      return data?.credits ?? 0;
    },
    enabled: !!user,
  });

  const unlockedQuery = useQuery({
    queryKey: ["unlockedMaterials", user?.id],
    queryFn: () => fetchUnlockedMaterialIds(user!.id),
    enabled: !!user,
  });

  const unlockMutation = useMutation({
    mutationFn: (materialId: string) => spendCredits(user!.id, materialId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userCredits", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["unlockedMaterials", user?.id] });
    },
  });

  return {
    credits: creditsQuery.data ?? 0,
    unlockedMaterialIds: new Set(unlockedQuery.data ?? []),
    unlockMaterial: unlockMutation.mutate,
  };
}
````

## File: src/features/study/hooks/useLeaderboard.ts
````typescript
import { useQuery } from "@tanstack/react-query";
import { fetchLeaderboard } from "../services/study.service";

export function useLeaderboard() {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => fetchLeaderboard(20),
    staleTime: 5 * 60 * 1000,
  });
}
````

## File: src/features/study/hooks/useMaterialRequests.ts
````typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createMaterialRequest, fetchMaterialRequests } from "../services/study.service";
import { useAuthStore } from "../../../store/authStore";

export function useMaterialRequests() {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  const requestsQuery = useQuery({
    queryKey: ["materialRequests"],
    queryFn: fetchMaterialRequests,
  });

  const createMutation = useMutation({
    mutationFn: (data: { title: string; description?: string; subject?: string }) =>
      createMaterialRequest(user!.id, data.title, data.description, data.subject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materialRequests"] });
    },
  });

  return {
    requests: requestsQuery.data ?? [],
    createRequest: createMutation.mutateAsync,
  };
}
````

## File: src/features/study/hooks/usePersonalizedFeed.ts
````typescript
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/authStore";
import {
  fetchRecentlyViewed,
  fetchStudyMaterials,
  fetchTrendingMaterials,
} from "../services/study.service";
import { fetchSavedMaterialIds } from "../services/study.service";

export function usePersonalizedFeed() {
  const user = useAuthStore((s) => s.user);
  const userId = user?.id;

  // 1. Get recently viewed and saved subjects
  const { data: recentSubjects } = useQuery({
    queryKey: ["personalizedSubjects", userId],
    queryFn: async () => {
      if (!userId) return [];
      const [recent, saved] = await Promise.all([
        fetchRecentlyViewed(userId, 10),
        fetchSavedMaterialIds(userId),
      ]);
      // Extract unique subjects
      const subjects = new Set<string>();
      recent.forEach((m) => subjects.add(m.subject));
      if (saved.length > 0) {
        // For saved, we need to fetch actual materials to get subjects; skip for simplicity
        // We'll just use recent subjects for now
      }
      return Array.from(subjects);
    },
    enabled: !!userId,
  });

  // 2. Fetch materials for those subjects + trending as fallback
  const { data: personalizedMaterials } = useQuery({
    queryKey: ["personalizedMaterials", recentSubjects],
    queryFn: async () => {
      if (!recentSubjects || recentSubjects.length === 0) {
        // No history, return trending
        return fetchTrendingMaterials(10);
      }
      // Fetch materials from those subjects, limited to 10
      const materials: any[] = [];
      for (const subject of recentSubjects.slice(0, 3)) {
        const res = await fetchStudyMaterials({ subject });
        materials.push(...res.slice(0, 4));
        if (materials.length >= 10) break;
      }
      if (materials.length < 10) {
        const trending = await fetchTrendingMaterials(10 - materials.length);
        materials.push(...trending);
      }
      return materials.slice(0, 10);
    },
    enabled: !!userId,
  });

  return {
    personalizedMaterials: personalizedMaterials ?? [],
    isLoading: !personalizedMaterials,
  };
}
````

## File: src/features/study/hooks/useRateMaterial.ts
````typescript
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { rateMaterial, fetchAverageRating, fetchMaterialRating } from "../services/study.service";
import { useAuthStore } from "../../../store/authStore";

export function useRateMaterial(materialId: string) {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  const ratingQuery = useQuery({
    queryKey: ["materialRating", materialId],
    queryFn: () => fetchAverageRating(materialId),
  });

  const reviewsQuery = useQuery({
    queryKey: ["materialReviews", materialId],
    queryFn: () => fetchMaterialRating(materialId),
  });

  const rateMutation = useMutation({
    mutationFn: async ({ rating, review }: { rating: number; review?: string }) => {
      if (!user) throw new Error("Not authenticated");
      await rateMaterial(user.id, materialId, rating, review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materialRating", materialId] });
      queryClient.invalidateQueries({ queryKey: ["materialReviews", materialId] });
    },
  });

  return {
    averageRating: ratingQuery.data ?? 0,
    reviews: reviewsQuery.data ?? [],
    rate: rateMutation.mutate,
  };
}
````

## File: src/features/study/hooks/useReactions.ts
````typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleReaction, fetchReactions } from "../services/study.service";
import { useAuthStore } from "../../../store/authStore";

export function useReactions(materialId: string) {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  const reactionsQuery = useQuery({
    queryKey: ["materialReactions", materialId],
    queryFn: () => fetchReactions(materialId),
  });

  const toggleMutation = useMutation({
    mutationFn: (emoji: string) => toggleReaction(user!.id, materialId, emoji),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materialReactions", materialId] });
    },
  });

  return {
    reactions: reactionsQuery.data ?? [],
    toggle: (emoji: string) => toggleMutation.mutate(emoji),
  };
}
````

## File: src/features/study/hooks/useRelatedMaterials.ts
````typescript
import { useQuery } from "@tanstack/react-query";
import { fetchRelatedMaterials } from "../services/study.service";
import type { StudyMaterial } from "../services/study.service";

export function useRelatedMaterials(material: StudyMaterial | null) {
  return useQuery({
    queryKey: ["relatedMaterials", material?.id],
    queryFn: () => fetchRelatedMaterials(material!),
    enabled: !!material,
  });
}
````

## File: src/features/study/hooks/useStarterPacks.ts
````typescript
import { useQuery } from "@tanstack/react-query";
import { fetchStarterPacks, fetchStarterPackMaterials, type StarterPack } from "../services/study.service";

export function useStarterPacks() {
  const packsQuery = useQuery({ queryKey: ["starterPacks"], queryFn: fetchStarterPacks });

  const packMaterialsQueries = useQuery({
    queryKey: ["starterPackMaterials", packsQuery.data],
    queryFn: async () => {
      if (!packsQuery.data) return [];
      const all = await Promise.all(packsQuery.data.map((p: StarterPack) => fetchStarterPackMaterials(p)));
      return all;
    },
    enabled: !!packsQuery.data,
  });

  return {
    packs: packsQuery.data ?? [],
    packMaterials: packMaterialsQueries.data ?? [],
    isLoading: packsQuery.isLoading,
  };
}
````

## File: src/features/study/hooks/useStudyActions.ts
````typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveMaterial, unsaveMaterial, incrementDownloadCount } from "../services/study.service";
import { useAuthStore } from "../../../store/authStore";

export function useStudyActions() {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  const toggleSaveMutation = useMutation({
    mutationFn: async ({ materialId, saved }: { materialId: string; saved: boolean }) => {
      if (!user) throw new Error("Not authenticated");
      if (saved) await unsaveMaterial(user.id, materialId);
      else await saveMaterial(user.id, materialId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedMaterials"] });
    },
  });

  const downloadMutation = useMutation({
    mutationFn: async (material: { id: string; file_url?: string | null; external_url?: string | null }) => {
      await incrementDownloadCount(material.id);
      const url = material.file_url ?? material.external_url;
      if (url) window.open(url, "_blank", "noopener,noreferrer");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studyMaterials"] });
    },
  });

  return {
    toggleSave: toggleSaveMutation.mutate,
    download: downloadMutation.mutate,
  };
}
````

## File: src/features/study/hooks/useStudyGroups.ts
````typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCommunities,
  createCommunity,
  joinCommunity,
  leaveCommunity,
  deleteCommunity,
} from "../../communities/services/communities.service";
import { useAuthStore } from "../../../store/authStore";
import { useToastStore } from "../../../store/toastStore";
import type { Community } from "../../../types/community";

type CreateStudyGroupInput = {
  name: string;
  course: string;
  description?: string;
  isPrivate?: boolean;
};

export function useStudyGroups(course?: string) {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const { showToast } = useToastStore();

  const groupsQuery = useQuery({
    queryKey: ["studyGroups", course],
    queryFn: async () => {
      const all = await fetchCommunities("study");
      if (!course) return all;
      return all.filter(
        (c) =>
          c.name.includes(course) ||
          c.description?.includes(course) ||
          c.year === null
      );
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: CreateStudyGroupInput) =>
      createCommunity({
        // supabase insert typing sometimes lags behind schema; keep runtime fields only
        name: `${data.name} - ${data.course}`,
        description: data.description ?? "",
        type: "study",
        year: null,
        cover_color: "#93c5fd",
        icon: "📚",
        parent_id: null,
        archived: false,
      } as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studyGroups"] });
      showToast("Study group created!", "ok");
    },
    onError: (err: any) => {
      showToast(err?.message || "Failed to create study group", "err");
    },
  });

  const joinMutation = useMutation({
    mutationFn: (communityId: string) => joinCommunity(communityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studyGroups"] });
      showToast("You joined the group!", "ok");
    },
    onError: (err: any) => {
      showToast(err?.message || "Failed to join group", "err");
    },
  });

  const leaveMutation = useMutation({
    mutationFn: (communityId: string) => leaveCommunity(communityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studyGroups"] });
      showToast("You left the group.", "ok");
    },
    onError: (err: any) => {
      showToast(err?.message || "Failed to leave group", "err");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (communityId: string) => deleteCommunity(communityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studyGroups"] });
      showToast("Study group deleted.", "ok");
    },
    onError: (err: any) => {
      showToast(err?.message || "Failed to delete group", "err");
    },
  });

  return {
    groups: (groupsQuery.data ?? []) as Community[],
    isLoading: groupsQuery.isLoading,
    createGroup: async (data: CreateStudyGroupInput) => {
      if (!user) throw new Error("Not authenticated");
      return createMutation.mutateAsync(data);
    },
    join: (communityId: string) => {
      if (!user) throw new Error("Not authenticated");
      joinMutation.mutate(communityId);
    },
    leave: (communityId: string) => {
      if (!user) throw new Error("Not authenticated");
      leaveMutation.mutate(communityId);
    },
    deleteGroup: (communityId: string) => {
      if (!user) throw new Error("Not authenticated");
      if (!confirm("Delete this study group? This cannot be undone.")) return;
      deleteMutation.mutate(communityId);
    },
  };
}
````

## File: src/features/study/hooks/useStudyMaterials.ts
````typescript
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useStudyStore } from "../store/study.store";
import { fetchStudyMaterials, fetchSubjects, fetchSavedMaterialIds, fetchTrendingMaterials } from "../services/study.service";
import { useAuthStore } from "../../../store/authStore";
import type { StudyFilters } from "../services/study.service";

const PAGE_SIZE = 10;

export function useStudyMaterials() {
  const { search, yearFilter, typeFilter, subjectFilter, programmeFilter } = useStudyStore();
  const user = useAuthStore((s) => s.user);

  const filters: StudyFilters = {
    search: search || undefined,
    year_group: yearFilter !== "All" ? yearFilter : undefined,
    material_type: typeFilter !== "All" ? typeFilter : undefined,
    subject: subjectFilter !== "All" ? subjectFilter : undefined,
    programme: programmeFilter !== "All" ? programmeFilter : undefined,
  };

  const materialsQuery = useInfiniteQuery({
    queryKey: ["studyMaterials", filters],
    queryFn: async ({ pageParam = 0 }) => {
      const all = await fetchStudyMaterials(filters);
      const start = pageParam * PAGE_SIZE;
      return {
        data: all.slice(start, start + PAGE_SIZE),
        nextCursor: all.length > start + PAGE_SIZE ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });

  const subjectsQuery = useQuery({
    queryKey: ["studySubjects"],
    queryFn: fetchSubjects,
    staleTime: Infinity,
  });

  const savedIdsQuery = useQuery({
    queryKey: ["savedMaterials", user?.id],
    queryFn: () => fetchSavedMaterialIds(user!.id),
    enabled: !!user,
  });

  return {
    materials: materialsQuery.data?.pages.flatMap((p) => p.data) ?? [],
    subjects: subjectsQuery.data ?? [],
    savedIds: new Set(savedIdsQuery.data ?? []),
    isLoading: materialsQuery.isLoading,
    isFetchingNextPage: materialsQuery.isFetchingNextPage,
    hasNextPage: !!materialsQuery.hasNextPage,
    fetchNextPage: materialsQuery.fetchNextPage,
    isError: materialsQuery.isError,
    error: materialsQuery.error,
    refetch: materialsQuery.refetch,
  };
}

export function useTrendingMaterials() {
  return useInfiniteQuery({
    queryKey: ["trendingMaterials"],
    queryFn: async ({ pageParam = 0 }) => {
      const all = await fetchTrendingMaterials(20);
      const start = pageParam * PAGE_SIZE;
      return {
        data: all.slice(start, start + PAGE_SIZE),
        nextCursor: all.length > start + PAGE_SIZE ? pageParam + 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });
}
````

## File: src/features/study/services/study.service.ts
````typescript
import { supabase } from "../../../lib/supabase";
import type { Database } from "../../../types/database.types";

export type StudyMaterial = Database["public"]["Tables"]["study_materials"]["Row"] & {
  uploader_username?: string | null;
  uploader_avatar?: string | null;
};

export type StudyFilters = {
  search?: string;
  year_group?: string;
  subject?: string;
  material_type?: string;
  programme?: string;
};

export type StarterPack = Database["public"]["Tables"]["starter_packs"]["Row"];

// ─── Helper ──────────────────────────────────────────────────────────────
function normalizeMaterial(item: any): StudyMaterial {
  return {
    ...item,
    uploader_username: item.profiles?.username ?? null,
    uploader_avatar: item.profiles?.avatar_url ?? null,
  };
}

// ─── Core fetch ──────────────────────────────────────────────────────────
export async function fetchStudyMaterials(filters: StudyFilters = {}): Promise<StudyMaterial[]> {
  let query = supabase
    .from("study_materials")
    .select(`*, profiles:uploaded_by (username, avatar_url)`)
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });

  if (filters.search) {
    const keywords = filters.search.trim().split(/\s+/);
    keywords.forEach((word) => {
      query = query.or(
        `title.ilike.%${word}%,description.ilike.%${word}%,subject.ilike.%${word}%,tags.cs.{${word}}`
      );
    });
  }

  if (filters.year_group && filters.year_group !== "All") {
    query = query.or(`year_group.eq.${filters.year_group},year_group.eq.All Years`);
  }
  if (filters.subject && filters.subject !== "All") {
    query = query.eq("subject", filters.subject);
  }
  if (filters.material_type && filters.material_type !== "All") {
    query = query.eq("material_type", filters.material_type);
  }
  if (filters.programme && filters.programme !== "All") {
  query = query.eq("programme", filters.programme);
}

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(normalizeMaterial);
}

// ─── Related materials ────────────────────────────────────────────────────
export async function fetchRelatedMaterials(material: StudyMaterial, limit = 5): Promise<StudyMaterial[]> {
  const { data, error } = await supabase
    .from("study_materials")
    .select(`*, profiles:uploaded_by (username, avatar_url)`)
    .eq("subject", material.subject)
    .neq("id", material.id)
    .limit(limit)
    .order("download_count", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(normalizeMaterial);
}

// ─── Trending ─────────────────────────────────────────────────────────────
export async function fetchTrendingMaterials(limit = 10): Promise<StudyMaterial[]> {
  const { data, error } = await supabase
    .from("study_materials")
    .select(`*, profiles:uploaded_by (username, avatar_url)`)
    .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    .order("trending_score", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []).map(normalizeMaterial);
}

// ─── Subjects ─────────────────────────────────────────────────────────────
export async function fetchSubjects(): Promise<string[]> {
  const { data, error } = await supabase.from("study_materials").select("subject").order("subject");
  if (error) throw error;
  return [...new Set((data ?? []).map((d) => d.subject))];
}

// ─── Save / Unsave ────────────────────────────────────────────────────────
export async function saveMaterial(userId: string, materialId: string) {
  const { error } = await supabase.from("saved_materials").insert({ user_id: userId, material_id: materialId });
  if (error) throw error;
}

export async function unsaveMaterial(userId: string, materialId: string) {
  const { error } = await supabase.from("saved_materials").delete().eq("user_id", userId).eq("material_id", materialId);
  if (error) throw error;
}

export async function fetchSavedMaterialIds(userId: string): Promise<string[]> {
  const { data, error } = await supabase.from("saved_materials").select("material_id").eq("user_id", userId);
  if (error) throw error;
  return (data ?? []).map((d) => d.material_id);
}

// ─── Ratings ─────────────────────────────────────────────────────────────
export async function rateMaterial(userId: string, materialId: string, rating: number, review?: string) {
  const { error } = await supabase.from("material_ratings").upsert({
    user_id: userId,
    material_id: materialId,
    rating,
    review,
  });
  if (error) throw error;
}

export async function fetchAverageRating(materialId: string): Promise<number> {
  const { data, error } = await supabase
    .from("material_ratings")
    .select("rating")
    .eq("material_id", materialId);
  if (error || !data?.length) return 0;
  return data.reduce((sum, r) => sum + r.rating, 0) / data.length;
}

// ─── Reactions ────────────────────────────────────────────────────────────
export async function toggleReaction(userId: string, materialId: string, emoji: string) {
  const { data: existing } = await supabase
    .from("material_reactions")
    .select("id")
    .eq("user_id", userId)
    .eq("material_id", materialId)
    .eq("emoji", emoji)
    .maybeSingle();
  if (existing) {
    await supabase.from("material_reactions").delete().eq("id", existing.id);
  } else {
    await supabase.from("material_reactions").insert({ user_id: userId, material_id: materialId, emoji });
  }
}

export async function fetchReactions(materialId: string) {
  const { data, error } = await supabase.from("material_reactions").select("emoji, user_id").eq("material_id", materialId);
  if (error) return [];
  return data;
}

// ─── Material views ───────────────────────────────────────────────────────
export async function recordMaterialView(userId: string, materialId: string) {
  try {
    const { error } = await supabase.from("material_views").insert({
      user_id: userId,
      material_id: materialId,
      viewed_at: new Date().toISOString(),
    });
    if (error) throw error;
  } catch (error: any) {
    if (error?.code === "23505") return;
    console.warn("Failed to record view", error);
  }
}


export async function fetchRecentlyViewed(userId: string, limit = 6): Promise<StudyMaterial[]> {
  const { data, error } = await supabase
    .from("material_views")
    .select(`material:material_id(*, profiles:uploaded_by (username, avatar_url))`)
    .eq("user_id", userId)
    .order("viewed_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []).map((v) => ({
    ...(v as any).material,
    uploader_username: (v as any).material.profiles?.username ?? null,
    uploader_avatar: (v as any).material.profiles?.avatar_url ?? null,
  }));
}

// ─── Starter packs ───────────────────────────────────────────────────────
export async function fetchStarterPacks(): Promise<StarterPack[]> {
  const { data, error } = await supabase.from("starter_packs").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data as StarterPack[];
}

export async function fetchStarterPackMaterials(pack: StarterPack): Promise<StudyMaterial[]> {
  if (!pack.material_ids?.length) return [];
  const { data, error } = await supabase
    .from("study_materials")
    .select(`*, profiles:uploaded_by (username, avatar_url)`)
    .in("id", pack.material_ids);
  if (error) throw error;
  return (data ?? []).map(normalizeMaterial);
}

// ─── Credits / Premium ───────────────────────────────────────────────────
export async function awardCredits(userId: string, amount: number) {
  // Call the increment function multiple times for the amount, or create a custom RPC
  // For simplicity, we'll assume the RPC increments by 1 each time – loop
  for (let i = 0; i < amount; i++) {
    await supabase.rpc("increment", { table_name: "profiles", column_name: "credits", row_id: userId });
  }
}

export async function spendCredits(userId: string, materialId: string): Promise<boolean> {
  const { data: profile } = await supabase.from("profiles").select("credits").eq("id", userId).single();
  const { data: material } = await supabase.from("study_materials").select("premium_cost").eq("id", materialId).single();
  if (!profile || !material || (profile.credits ?? 0) < (material.premium_cost ?? 0)) return false;

  await supabase.rpc("decrement_vote", { p_post_id: materialId, p_column: "credits" });
  await supabase.from("unlocked_materials").insert({ user_id: userId, material_id: materialId });
  return true;
}

export async function fetchUnlockedMaterialIds(userId: string): Promise<string[]> {
  const { data } = await supabase.from("unlocked_materials").select("material_id").eq("user_id", userId);
  return (data ?? []).map((d) => d.material_id);
}

// ─── Versioning ──────────────────────────────────────────────────────────
export async function uploadNewVersion(materialId: string, fileUrl: string) {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");

  const { data: versions } = await supabase
    .from("material_versions")
    .select("version_number")
    .eq("material_id", materialId)
    .order("version_number", { ascending: false })
    .limit(1);

  const nextVersion = (versions?.[0]?.version_number ?? 0) + 1;
  await supabase.from("material_versions").insert({
    material_id: materialId,
    file_url: fileUrl,
    version_number: nextVersion,
    uploaded_by: user.id,
  });
}
// ─── Leaderboard ─────────────────────────────────────────────────────────
export async function fetchLeaderboard(limit = 20) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, avatar_url, karma")
    .order("karma", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

// ─── Material Requests ────────────────────────────────────────────────────
export async function createMaterialRequest(userId: string, title: string, description?: string, subject?: string) {
  const { error } = await supabase.from("material_requests").insert({
    user_id: userId,
    title,
    description: description ?? null,
    subject: subject ?? null,
  });
  if (error) throw error;
}

export async function fetchMaterialRequests() {
  const { data, error } = await supabase
    .from("material_requests")
    .select("*, profiles:user_id (username)")
    .order("created_at", { ascending: false })
    .limit(20);
  if (error) throw error;
  return data ?? [];
}

// ─── Material Rating (reviews list) ───────────────────────────────────────
export async function fetchMaterialRating(materialId: string) {
  const { data, error } = await supabase
    .from("material_ratings")
    .select("rating, review, user_id, created_at, profiles:user_id (username)")
    .eq("material_id", materialId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

// ─── Upload Study Material (admin) ────────────────────────────────────────
export async function awardKarma(userId: string, amount: number, _reason?: string) {
  // Compatibility shim. If your DB has an increment RPC, use it.
  // Otherwise, this function will effectively no-op.
  try {
    for (let i = 0; i < amount; i++) {
      await supabase.rpc("increment", {
        table_name: "profiles",
        column_name: "karma",
        row_id: userId,
      });
    }
  } catch {
    // no-op
  }
}

export async function uploadStudyMaterial(
  material: Omit<StudyMaterial, "id" | "created_at" | "download_count" | "uploader_username" | "uploader_avatar">
) {
  const { data, error } = await supabase
    .from("study_materials")
    .insert(material)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ─── Increment download count ─────────────────────────────────────────────
export async function incrementDownloadCount(id: string) {
  await supabase.rpc("increment", { table_name: "study_materials", column_name: "download_count", row_id: id });
}
````

## File: src/features/study/services/studyGroups.service.ts
````typescript
// NOTE: Study groups have been unified into the community system.
// This module is intentionally left as a stub to avoid breaking any legacy imports.
// New code should use `src/features/communities/services/communities.service.ts`.

export async function fetchStudyGroups(): Promise<any[]> {
  return [];
}

export async function createStudyGroup(): Promise<any> {
  throw new Error("StudyGroup tables removed; use communities for study groups.");
}

export async function joinStudyGroup(): Promise<void> {
  throw new Error("StudyGroup tables removed; use communities for study groups.");
}

export async function leaveStudyGroup(): Promise<void> {
  throw new Error("StudyGroup tables removed; use communities for study groups.");
}

export async function fetchGroupMembers(): Promise<any[]> {
  return [];
}
````

## File: src/features/study/store/study.store.ts
````typescript
import { create } from "zustand";

interface StudyUIState {
  search: string;
  yearFilter: string;
  typeFilter: string;
  subjectFilter: string;
  programmeFilter: string;
  setSearch: (v: string) => void;
  setYearFilter: (v: string) => void;
  setTypeFilter: (v: string) => void;
  setSubjectFilter: (v: string) => void;
  setProgrammeFilter: (v: string) => void;
}

export const useStudyStore = create<StudyUIState>((set) => ({
  search: "",
  yearFilter: "All",
  typeFilter: "All",
  subjectFilter: "All",
  programmeFilter: "All",
  setSearch: (search) => set({ search }),
  setYearFilter: (yearFilter) => set({ yearFilter }),
  setTypeFilter: (typeFilter) => set({ typeFilter }),
  setSubjectFilter: (subjectFilter) => set({ subjectFilter }),
  setProgrammeFilter: (programmeFilter) => set({ programmeFilter }),
}));
````

## File: src/features/study/utils/tiers.ts
````typescript
export type Tier = "bronze" | "silver" | "gold" | "platinum";

export function getTier(karma: number): Tier {
  if (karma >= 1000) return "platinum";
  if (karma >= 500) return "gold";
  if (karma >= 100) return "silver";
  return "bronze";
}

export const TIER_COLORS: Record<Tier, string> = {
  bronze: "#CD7F32",
  silver: "#A8A9AD",
  gold: "#FFD700",
  platinum: "#E5E4E2",
};
````

## File: src/hooks/usePushNotifications.ts
````typescript
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";
import { useToastStore } from "../store/toastStore";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function usePushNotifications() {
  const user = useAuthStore((s) => s.user);
  const { showToast } = useToastStore();
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [subscribed, setSubscribed] = useState(false);

  const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;

  useEffect(() => {
    if (!user) return;
    setPermission(Notification.permission);
    if (Notification.permission === "granted") {
      checkExistingSubscription();
    }
  }, [user]);

  const checkExistingSubscription = async () => {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      setSubscribed(true);
    }
  };

  const requestPermission = async () => {
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === "granted") {
      await subscribe();
    }
    return result;
  };

  const subscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;

      let subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
        });
      }

      const parsed = subscription.toJSON();
      if (!parsed.keys?.p256dh || !parsed.keys?.auth) {
        throw new Error("Invalid subscription keys");
      }

      // Store in Supabase
      const { error } = await supabase.from("push_subscriptions").upsert(
        {
          user_id: user!.id,
          endpoint: parsed.endpoint!,
          p256dh: parsed.keys.p256dh,
          auth: parsed.keys.auth,
        },
        { onConflict: "endpoint" }
      );

      if (error) throw error;
      setSubscribed(true);
    } catch (err) {
      showToast("Failed to enable push notifications", "err");
      throw err;
    }
  };

  const unsubscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
        await supabase
          .from("push_subscriptions")
          .delete()
          .eq("endpoint", subscription.endpoint);
        setSubscribed(false);
      }
    } catch (err) {
      console.error("Unsubscribe failed:", err);
    }
  };

  return { permission, subscribed, requestPermission, unsubscribe };
}
````

## File: src/hooks/useUserRole.ts
````typescript
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { fetchProfile } from "../features/profile/services/profile.service";


export function useUserRole() {
  const user = useAuthStore((s) => s.user);

  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadRole() {
      if (!user) {
        if (mounted) {
          setRole(null);
          setLoading(false);
        }
        return;
      }

      try {
        const profile = await fetchProfile(user.id);

        if (mounted) {
          setRole(profile?.role ?? "student");
        }
      } catch {
        if (mounted) {
          setRole("student");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadRole();

    return () => {
      mounted = false;
    };
  }, [user]);

  return {
    role,
    loading,
  };
}
````

## File: src/i18n/bemba.json
````json
{
  "home": "Icalo",
  "study": "Ifya kusambilila",
  "profile": "Profile",
  "messages": "Amashiwi",
  "notifications": "Ama notice",
  "logout": "Tumpa",
  "search": "Fwaya",
  "save": "Bika",
  "cancel": "Leka",
  "darkMode": "Cisisi",
  "lightMode": "Umusenge",
  "highContrast": "Ifi fya buli bwamba"
}
````

## File: src/i18n/chinyanja.json
````json
{
  "home": "Nyumba",
  "study": "Maphunziro",
  "profile": "Mbiri",
  "messages": "Mauthenga",
  "notifications": "Zidziwitso",
  "logout": "Tuluka",
  "search": "Fufuzani",
  "save": "Sungani",
  "cancel": "Lekani",
  "darkMode": "Mdima",
  "lightMode": "Kuwala",
  "highContrast": "Kusiyana kwakukulu"
}
````

## File: src/i18n/index.ts
````typescript
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import bemba from "./bemba.json";
import chinyanja from "./chinyanja.json";

i18n.use(initReactI18next).init({
  resources: {
    bem: { translation: bemba },
    nya: { translation: chinyanja },
  },
  lng: "en", // default English
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
````

## File: src/index.css
````css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --font-sans: "Plus Jakarta Sans", "Outfit", system-ui, -apple-system, sans-serif;
  --font-display: "Outfit", system-ui, -apple-system, sans-serif;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}

@keyframes bounce-subtle {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-4px);
  }
}

html {
  scroll-behavior: smooth;
  color-scheme: light;
}

html.dark {
  color-scheme: dark;
}

html,
body,
#root {
  min-height: 100%;
  width: 100%;
}

body {
  margin: 0;
  font-family: var(--font-sans);
  background-color: white;
  color: rgb(15 23 42);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

html.dark body {
  background-color: rgb(2 6 23);
  color: rgb(248 250 252);
}

input,
textarea,
select {
  color: inherit;
}

input::placeholder,
textarea::placeholder {
  color: rgb(148 163 184);
}

html.dark input::placeholder,
html.dark textarea::placeholder {
  color: rgb(100 116 139);
}

.animate-slide-up {
  animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.animate-bounce-subtle {
  animation: bounce-subtle 3s ease-in-out infinite;
}

.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

html.dark .glass {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

:root {
  --radius-sm: 0.75rem;
  --radius-md: 1rem;
  --radius-lg: 1.5rem;
  --radius-xl: 2rem;
  --shadow-card: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-card-hover: 0 10px 25px rgba(0,0,0,0.08);
  --shadow-button: 0 4px 12px rgba(37,99,235,0.25);
}

/* Font size adjustments */
.text-large { font-size: 1.125rem; }
.text-x-large { font-size: 1.25rem; }


/* High contrast mode */
.high-contrast {
  --tw-bg-opacity: 1;
  background-color: black !important;
  color: white !important;
}
.high-contrast * {
  border-color: white !important;
  color: white !important;
  background-color: black !important;
}
.high-contrast a, .high-contrast button {
  color: yellow !important;
}
.high-contrast input, .high-contrast select, .high-contrast textarea {
  background-color: black !important;
  border-color: white !important;
  color: white !important;
}
````

## File: src/lib/queryClient.ts
````typescript
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,          // 2 minutes before data is considered stale
      gcTime: 1000 * 60 * 10,            // keep in cache for 10 minutes (previously cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
````

## File: src/lib/supabase.ts
````typescript
// src/lib/supabase.ts

import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },

    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  }
);
````

## File: src/main.tsx
````typescript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

// ── Capture install prompt as early as possible ─────────────────────────
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  (window as any).deferredPrompt = e;
});

// ── PWA update handling ──────────────────────────────────────────────────
window.addEventListener("pwa:update-available", () => {
  const shouldUpdate = window.confirm(
    "A new version of Warren is available. Update now?"
  );
  if (shouldUpdate) window.location.reload();
});

const container = document.getElementById("root");
if (!container) throw new Error("[Warren] Root element not found.");

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </StrictMode>
);
````

## File: src/pages/admin/AdminDashboardPage.tsx
````typescript
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Archive,
  Flag,
  Megaphone,
  PlusCircle,
  Shield,
  Upload,
  Users,
  Calendar,
  Send,
  FileText,
} from "lucide-react";

import AppShell from "../../components/layout/AppShell";

const tiles = [
  {
    to: "/admin/announcements/new",
    icon: PlusCircle,
    label: "Create Announcement",
    desc: "Post a new bulletin to all students",
    color: "text-blue-600 dark:text-cyan-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    to: "/admin/announcements",
    icon: Megaphone,
    label: "Manage Announcements",
    desc: "Edit or remove existing bulletins",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-900/20",
  },
  {
    to: "/admin/upload-material",
    icon: Upload,
    label: "Upload Study Material",
    desc: "Add notes, slides or past papers",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    to: "/admin/material-requests",
    icon: FileText,
    label: "Material Requests",
    desc: "View and manage student requests",
    color: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-900/20",
  },
  {
    to: "/admin/events",
    icon: Calendar,
    label: "Manage Events",
    desc: "Create and manage campus events",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
  },
  {
    to: "/admin/global-notifications",
    icon: Send,
    label: "Global Notification",
    desc: "Send a push to all students",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    to: "/moderation",
    icon: Shield,
    label: "Moderation Tools",
    desc: "Review flagged posts and comments",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    to: "/admin/reports",
    icon: Flag,
    label: "Reports",
    desc: "View community reports",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/20",
  },
  {
    to: "/admin/communities",
    icon: Users,
    label: "Communities",
    desc: "Manage student communities",
    color: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-50 dark:bg-pink-900/20",
  },
  {
    to: "#",
    icon: Archive,
    label: "Archive Inactive Groups",
    desc: "Archive study groups inactive for 30+ days",
    color: "text-gray-600 dark:text-gray-400",
    bg: "bg-gray-50 dark:bg-gray-900/20",
    action: true,
  },
];


import { supabase } from "../../lib/supabase";


export default function AdminDashboardPage() {
  const [archiving, setArchiving] = useState(false);

  const handleArchive = async () => {
    if (
      !confirm(
        "Archive study groups that have been inactive for 30+ days? Members will be notified."
      )
    )
      return;
    setArchiving(true);
    try {
      const { error } = await supabase.rpc("archive_inactive_communities");
      if (error) throw error;
      alert("Archival complete. Inactive groups have been archived.");
    } catch (err: any) {
      alert("Failed to archive groups: " + err.message);
    } finally {
      setArchiving(false);
    }
  };

  return (
    <AppShell>
      {/* Page title */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Admin
        </h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          Manage Warren
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {tiles.map(({ to, icon: Icon, label, desc, color, bg, action }) =>
          action ? (
            <button
              key={label}
              onClick={handleArchive}
              disabled={archiving}
              className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 active:scale-[0.98] transition-transform duration-100 [-webkit-tap-highlight-color:transparent] text-left"
            >
              <div
                className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}
              >
                <Icon size={18} className={color} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {label}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                  {desc}
                </p>
              </div>
              <span className="ml-auto text-slate-300 dark:text-slate-600 text-lg shrink-0">
                ›
              </span>
            </button>
          ) : (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 active:scale-[0.98] transition-transform duration-100 [-webkit-tap-highlight-color:transparent]"
            >
              <div
                className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}
              >
                <Icon size={18} className={color} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {label}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                  {desc}
                </p>
              </div>
              <span className="ml-auto text-slate-300 dark:text-slate-600 text-lg shrink-0">
                ›
              </span>
            </Link>
          )
        )}
      </div>
    </AppShell>
  );
}
````

## File: src/pages/admin/CreateAnnouncementPage.tsx
````typescript
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { createAnnouncement } from "../../services/announcementService";
import { supabase } from "../../lib/supabase";
import { useToastStore } from "../../store/toastStore";

export default function CreateAnnouncementPage() {
  const navigate =
    useNavigate();
  const { showToast } = useToastStore();

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [category, setCategory] =
    useState("general");

  const [
    imageFile,
    setImageFile,
  ] = useState<File | null>(
    null
  );

  const [
    documentFile,
    setDocumentFile,
  ] = useState<File | null>(
    null
  );

  const [loading, setLoading] =
    useState(false);

  async function uploadFile(
  file: File,
  bucket: "announcement-images" | "announcement-documents",
  folder: string
) {
  const filePath = `${folder}/${Date.now()}_${file.name}`;

  const { error } =
    await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        upsert: true,
      });

  if (error) {
    throw error;
  }

  const { data } =
    supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

  return data.publicUrl;
}

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!title.trim()) {
      showToast("Title is required", "err");
      return;
    }

    if (!content.trim()) {
      showToast("Content required", "err");
      return;
    }

    try {
      setLoading(true);

      let imageUrl:
        | string
        | null = null;

      let documentUrl:
        | string
        | null = null;

      if (imageFile) {
  imageUrl =
    await uploadFile(
      imageFile,
      "announcement-images",
      "images"
    );
}

if (documentFile) {
  documentUrl =
    await uploadFile(
      documentFile,
      "announcement-documents",
      "documents"
    );
}

      await createAnnouncement(
        title.trim(),
        content.trim(),
        imageUrl,
        documentUrl,
        category,
        
      );

      navigate(
        "/announcements"
      );
    } catch (err: any) {
      console.error(err);

      showToast(
        err?.message ??
          "Failed to create announcement", "err"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <div className="p-4 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          New Announcement
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >
          <input
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            placeholder="Title"
            className="w-full p-3 rounded-2xl border"
          />

          <select
          aria-label="category"
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className="w-full p-3 rounded-2xl border"
          >
            <option value="general">
              General
            </option>
            <option value="academic">
              Academic
            </option>
            <option value="events">
              Events
            </option>
            <option value="sports">
              Sports
            </option>
            <option value="emergency">
              Emergency
            </option>
          </select>

          <textarea
            rows={8}
            value={content}
            onChange={(e) =>
              setContent(
                e.target.value
              )
            }
            placeholder="Announcement..."
            className="w-full p-3 rounded-2xl border"
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Announcement Image
            </label>

            <input
              aria-label="image"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImageFile(
                  e.target
                    .files?.[0] ??
                    null
                )
              }
            />

            {imageFile && (
              <p className="text-xs text-green-600">
                Selected:{" "}
                {imageFile.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Attachment
            </label>

            <input
              aria-label="file"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                setDocumentFile(
                  e.target
                    .files?.[0] ??
                    null
                )
              }
            />

            {documentFile && (
              <p className="text-xs text-green-600">
                Selected:{" "}
                {
                  documentFile.name
                }
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-2xl disabled:opacity-50"
          >
            {loading
              ? "Publishing..."
              : "Publish Announcement"}
          </button>
        </form>
      </div>
    </AppShell>
  );
}
````

## File: src/pages/admin/CreateCommunityPage.tsx
````typescript
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { createCommunity, updateCommunity, fetchCommunities } from "../../features/communities/services/communities.service";
import type { Community, CommunityType } from "../../types/community";
const PASTEL_COLORS = [
  "from-pink-200 to-rose-200",
  "from-blue-200 to-cyan-200",
  "from-emerald-200 to-teal-200",
  "from-violet-200 to-purple-200",
  "from-orange-200 to-amber-200",
  "from-indigo-200 to-blue-200",
  "from-red-200 to-pink-200",
];

export default function CreateCommunityPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("👥");
  const [coverColor, setCoverColor] = useState(PASTEL_COLORS[0]);
  const [type, setType] = useState<CommunityType>("social");
  const [parentId, setParentId] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const [parents, setParents] = useState<Community[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCommunities("educational", null).then(setParents);
    if (isEdit && id) {
      fetchCommunities().then(all => {
        const comm = all.find(c => c.id === id);
        if (comm) {
          setName(comm.name);
          setDescription(comm.description);
          setIcon(comm.icon);
          setCoverColor(comm.cover_color);
          setType(comm.type as CommunityType);
          setParentId(comm.parent_id);
          setYear(comm.year);
        } else navigate("/admin/communities");
      });
    }
  }, [id, isEdit, navigate]);

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    setError("");
    try {
      const payload = {
        name: name.trim(),
        description,
        icon,
        cover_color: coverColor,
        type,
        parent_id: parentId,
        year: type === "educational" ? year : null,
      };
      if (isEdit && id) {
        await updateCommunity(id, payload);
      } else {
        await createCommunity(payload as any);
      }
      navigate("/admin/communities");
    } catch (err: any) {
      setError(err.message || "Failed to save community");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppShell>
      <div className="px-4 pb-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {isEdit ? "Edit Community" : "Create Community"}
        </h1>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Type *</label>
            <div className="flex gap-2">
              {["social", "educational"].map(t => (
                <button
                  key={t}
                  onClick={() => setType(t as CommunityType)}
                  className={`flex-1 py-2 rounded-xl border text-sm font-medium capitalize ${
                    type === t
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {type === "educational" && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Parent School</label>
                <select
                  value={parentId ?? ""}
                  onChange={e => setParentId(e.target.value || null)}
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800"
                >
                  <option value="">None (this is a school itself)</option>
                  {parents.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-1">
                  Choose a parent if this is a subgroup (e.g., 1st Year within a school)
                </p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Year (optional)</label>
                <select
                  value={year ?? ""}
                  onChange={e => setYear(e.target.value || null)}
                  className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-800"
                >
                  <option value="">None</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                  <option value="all">All Chat</option>
                </select>
              </div>
            </>
          )}

          {/* Other fields */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Name *</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 rounded-xl border" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={2} className="w-full px-3 py-2 rounded-xl border" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Icon (emoji or image URL)</label>
            <input value={icon} onChange={e => setIcon(e.target.value)} className="w-full px-3 py-2 rounded-xl border" />
            <p className="text-xs text-slate-400 mt-1">Use an emoji or paste an image URL</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">Cover gradient</label>
            <div className="flex flex-wrap gap-2">
              {PASTEL_COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => setCoverColor(color)}
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} border-2 ${
                    coverColor === color ? "border-slate-900 dark:border-white" : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || !name.trim()}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold disabled:opacity-50"
          >
            {saving ? "Saving..." : isEdit ? "Update" : "Create"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    </AppShell>
  );
}
````

## File: src/pages/admin/CreateEventPage.tsx
````typescript
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { createEvent, updateEvent, fetchEvents } from "../../services/eventsService";
import { supabase } from "../../lib/supabase";
import type { Database } from "../../types/database.types";



type EventInsert = Database["public"]["Tables"]["events"]["Insert"];

export default function CreateEventPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [communityId, setCommunityId] = useState<string | null>(null);
  const [notifyAll, setNotifyAll] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    (async () => {
      const events = await fetchEvents();
      const event = events.find((e) => e.id === id);
      if (event) {
        setTitle(event.title);
        setDescription(event.description ?? "");
        setEventDate(new Date(event.event_date).toISOString().slice(0, 16));
        setCommunityId(event.community_id ?? null);
      } else {
        navigate("/admin/events");
      }
    })();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !eventDate) return;
    setSaving(true);
    setError("");

    try {
      const payload: EventInsert = {
        title: title.trim(),
        description: description.trim() || null,
        event_date: new Date(eventDate).toISOString(),
        community_id: communityId,
        created_by: "", // will be set by the service
      };

      if (isEdit && id) {
        await updateEvent(id, payload);
      } else {
        await createEvent(payload);
      }

      // Optional global notification
      if (notifyAll) {
        await supabase.from("global_notifications").insert({
          title: `📅 New Event: ${title.trim()}`,
          body: description.trim() || "Check the Events page for details.",
          data: { type: "event", event_date: new Date(eventDate).toISOString() },
        });
      }

      // Notify community members
      if (communityId) {
        const { data: members } = await supabase
          .from("community_members")
          .select("user_id")
          .eq("community_id", communityId);

        if (members) {
          for (const m of members) {
            await supabase.from("notifications").insert({
              user_id: m.user_id,
              title: "New event in your community",
              body: `"${title.trim()}" is happening on ${new Date(eventDate).toLocaleDateString()}.`,
              data: { type: "event" },
              type: "event",
            });
          }
        }
      }

      navigate("/admin/events");

    } catch (err: any) {
      setError(err.message || "Failed to save event");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppShell>
      <div className="px-4 pb-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {isEdit ? "Edit Event" : "Create Event"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1" htmlFor="event-title">
              Title *
            </label>
            <input
              id="event-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Exam Registration Deadline"
              className="w-full px-3 py-2 rounded-xl border"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Event Date & Time *
            </label>
            <input
              type="datetime-local"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="More details about the event..."
              rows={3}
              className="w-full px-3 py-2 rounded-xl border resize-none"
            />
          </div>

          {/* Notify all users */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Send notification to all users</span>
            <button
              type="button"
              onClick={() => setNotifyAll(!notifyAll)}
              title="Send notification to all users"
              aria-label="Send notification to all users"
              className={`relative w-12 h-6 rounded-full transition-colors ${
                notifyAll ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  notifyAll ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>

          <button
            type="submit"
            disabled={saving || !title.trim() || !eventDate}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold disabled:opacity-50"
          >
            {saving ? "Saving..." : isEdit ? "Update Event" : "Create Event"}
          </button>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      </div>
    </AppShell>
  );
}
````

## File: src/pages/admin/GlobalNotificationsPage.tsx
````typescript
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { supabase } from "../../lib/supabase";

export default function GlobalNotificationsPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!title.trim()) return;
    setSending(true);
    setError("");
    try {
      const { error } = await supabase.from("global_notifications").insert({
        title: title.trim(),
        body: body.trim() || null,
        data: { type: "update" }, // you can customize the data
      });
      if (error) throw error;
      navigate("/admin");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to send notification.");
    } finally {
      setSending(false);
    }
  };

  return (
    <AppShell>
      <div className="px-4 pb-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Send Global Notification</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 🚀 New Features Released!"
              className="w-full px-3 py-2 rounded-xl border"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Details about the update..."
              rows={3}
              className="w-full px-3 py-2 rounded-xl border resize-none"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={sending || !title.trim()}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send to All Users"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    </AppShell>
  );
}
````

## File: src/pages/admin/ManageAnnouncementsPage.tsx
````typescript
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, Trash2 } from "lucide-react";
import AppShell from "../../components/layout/AppShell";
import { fetchAnnouncements, deleteAnnouncement } from "../../services/announcementService";

const CATEGORY_META: Record<string, { label: string; color: string; bg: string }> = {
  general:   { label: "General",   color: "text-slate-600 dark:text-slate-400",   bg: "bg-slate-100 dark:bg-slate-700/60"   },
  academic:  { label: "Academic",  color: "text-blue-600 dark:text-blue-400",     bg: "bg-blue-50 dark:bg-blue-900/20"      },
  events:    { label: "Events",    color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-900/20"  },
  sports:    { label: "Sports",    color: "text-emerald-600 dark:text-emerald-400",bg: "bg-emerald-50 dark:bg-emerald-900/20"},
  emergency: { label: "Emergency", color: "text-red-600 dark:text-red-400",       bg: "bg-red-50 dark:bg-red-900/20"        },
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86400000);
  if (d < 1) return "Today";
  if (d === 1) return "Yesterday";
  return `${d}d ago`;
}

export default function ManageAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchAnnouncements()
      .then(setAnnouncements)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this announcement?")) return;
    setDeletingId(id);
    try {
      await deleteAnnouncement(id);
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <AppShell>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Announcements</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            {loading ? "Loading…" : `${announcements.length} bulletin${announcements.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <Link
          to="/admin/announcements/new"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 dark:bg-cyan-500 text-white text-xs font-bold"
        >
          <PlusCircle size={14} />
          New
        </Link>
      </div>

      {/* Skeletons */}
      {loading && (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4 animate-pulse">
              <div className="h-4 w-24 bg-slate-100 dark:bg-slate-700 rounded-full mb-3" />
              <div className="h-5 w-3/4 bg-slate-100 dark:bg-slate-700 rounded mb-2" />
              <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && announcements.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <span className="text-5xl">📢</span>
          <p className="text-base font-bold text-slate-500 dark:text-slate-400">No announcements yet</p>
          <Link to="/admin/announcements/new" className="text-sm text-blue-600 dark:text-cyan-400 font-semibold">
            Create the first one →
          </Link>
        </div>
      )}

      {/* List */}
      <div className="flex flex-col gap-3">
        {announcements.map((a) => {
          const meta = CATEGORY_META[a.category] ?? CATEGORY_META["general"];
          return (
            <div
              key={a.id}
              className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}>
                      {meta.label}
                    </span>
                    {a.created_at && (
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">
                        {timeAgo(a.created_at)}
                      </span>
                    )}
                    {a.pinned && (
                      <span className="text-[11px] text-amber-600 dark:text-amber-400">📌</span>
                    )}
                  </div>
                  <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug mb-1 line-clamp-1">
                    {a.title}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {a.content}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(a.id)}
                  disabled={deletingId === a.id}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 disabled:opacity-40"
                  aria-label="Delete announcement"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
````

## File: src/pages/admin/ManageCommunitiesPage.tsx
````typescript
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { fetchCommunities, deleteCommunity } from "../../features/communities/services/communities.service";
import type { Community } from "../../types/community";
import { Pencil, Trash2 } from "lucide-react";


export default function ManageCommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCommunities();
  }, []);

  const loadCommunities = async () => {
    try {
      setLoading(true);
      const data = await fetchCommunities();
      setCommunities(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this community? This cannot be undone.")) return;
    try {
      await deleteCommunity(id);
      setCommunities((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Communities
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage all communities
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/communities/new")}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold"
          >
            + New
          </button>
        </div>

        {loading ? (
          <p className="opacity-60">Loading...</p>
        ) : communities.length === 0 ? (
          <p className="opacity-60">No communities yet.</p>
        ) : (
          <div className="space-y-3">
            {communities.map((community) => (
              <div
                key={community.id}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border"
              >
                <div className="text-3xl">{community.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{community.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {community.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/communities/edit/${community.id}`)}
                    className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(community.id)}
                    className="p-2 rounded-xl hover:bg-red-50 text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
````

## File: src/pages/admin/ManageEventsPage.tsx
````typescript
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { fetchEvents, deleteEvent } from "../../services/eventsService";
import type { Database } from "../../types/database.types";
import { Pencil, Trash2, Plus } from "lucide-react";
import { format } from "date-fns";

type Event = Database["public"]["Tables"]["events"]["Row"];

export default function ManageEventsPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    await deleteEvent(id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Events</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {loading ? "Loading…" : `${events.length} event${events.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/events/new")}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-sm"
          >
            <Plus size={14} /> New Event
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <p className="text-center opacity-60 py-10">No events yet.</p>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4 flex justify-between items-start"
              >
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100">{event.title}</h3>
                  {event.description && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{event.description}</p>
                  )}
                  <p className="text-xs text-slate-400 mt-2">
                    {format(new Date(event.event_date), "PPp")}
                  </p>
                </div>
                <div className="flex gap-2 ml-3 shrink-0">
                  <button
                    onClick={() => navigate(`/admin/events/edit/${event.id}`)}
                    className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                    aria-label="Edit event"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg"
                    aria-label="Delete event"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
````

## File: src/pages/admin/ManageMaterialRequests.tsx
````typescript
import { useEffect, useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import AppShell from "../../components/layout/AppShell";
import { supabase } from "../../lib/supabase";
import { useUserRole } from "../../hooks/useUserRole";

interface MaterialRequest {
  id: string;
  title: string;
  description: string | null;
  subject: string | null;
  created_at: string | null;
  user_id: string;
  profiles: {
    username: string | null;
  } | null;
}

export default function ManageMaterialRequests() {
  const { role } = useUserRole();
  const [requests, setRequests] = useState<MaterialRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== "admin" && role !== "moderator") {
      setLoading(false);
      return;
    }
    fetchRequests();
  }, [role]);

  async function fetchRequests() {
    try {
      const { data, error } = await supabase
        .from("material_requests")
        .select("*, profiles:user_id (username)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setRequests(data as MaterialRequest[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this request?")) return;
    await supabase.from("material_requests").delete().eq("id", id);
    setRequests((prev) => prev.filter((r) => r.id !== id));
  }

  if (role !== "admin" && role !== "moderator") {
    return (
      <AppShell>
        <div className="p-6 text-center">
          <AlertTriangle size={48} className="mx-auto text-yellow-500 mb-4" />
          <h1 className="text-xl font-bold">Access Denied</h1>
          <p className="opacity-70 mt-2">Only moderators and admins can view this page.</p>
        </div>
      </AppShell>
    );
  }

  if (loading) return <AppShell><div className="p-4">Loading requests...</div></AppShell>;

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-4">Material Requests</h1>
        {requests.length === 0 ? (
          <p className="text-center opacity-60">No requests yet.</p>
        ) : (
          <div className="space-y-3">
            {requests.map((req) => (
              <div key={req.id} className="bg-white dark:bg-slate-900 rounded-2xl p-4 border">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{req.title}</h3>
                    {req.subject && <p className="text-xs text-slate-500">{req.subject}</p>}
                    {req.description && <p className="text-xs text-slate-400 mt-1">{req.description}</p>}
                    <p className="text-xs text-slate-400 mt-1">
                      Requested by {req.profiles?.username ?? "Unknown"} · {req.created_at ? new Date(req.created_at).toLocaleDateString() : ""}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(req.id)}
                    className="text-red-400 hover:text-red-600 ml-3 shrink-0"
                    aria-label="Delete request"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
````

## File: src/pages/admin/ManageStarterPacks.tsx
````typescript
import { useQuery } from "@tanstack/react-query";
import { fetchStarterPacks, fetchStarterPackMaterials, type StarterPack } from "../../features/study/services/study.service";


export default function ManageStarterPacks() {
  const packsQuery = useQuery({ queryKey: ["starterPacks"], queryFn: fetchStarterPacks });

  const packMaterialsQueries = useQuery({
    queryKey: ["starterPackMaterials", packsQuery.data],
    queryFn: async () => {
      if (!packsQuery.data) return [];
      const all = await Promise.all(packsQuery.data.map((p: StarterPack) => fetchStarterPackMaterials(p)));
      return all;
    },
    enabled: !!packsQuery.data,
  });

  return {
    packs: packsQuery.data ?? [],
    packMaterials: packMaterialsQueries.data ?? [],
    isLoading: packsQuery.isLoading,
  };
}
````

## File: src/pages/admin/ManageUsers.tsx
````typescript
import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { supabase } from "../../lib/supabase";
import { useUserRole } from "../../hooks/useUserRole";
import { AlertTriangle, GraduationCap } from "lucide-react";

interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  role: "student" | "moderator" | "admin";
  is_lecturer: boolean | null;
  karma: number;
  created_at: string | null;
}

export default function ManageUsers() {
  const { role } = useUserRole();
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== "admin") {
      setLoading(false);
      return;
    }
    fetchUsers();
  }, [role]);

  async function fetchUsers() {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setUsers(data as Profile[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateRole(userId: string, newRole: Profile["role"]) {
    await supabase.from("profiles").update({ role: newRole }).eq("id", userId);
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
  }

  async function toggleLecturer(userId: string, current: boolean | null) {
    const newValue = !current;
    await supabase.from("profiles").update({ is_lecturer: newValue }).eq("id", userId);
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, is_lecturer: newValue } : u))
    );
  }

  if (role !== "admin") {
    return (
      <AppShell>
        <div className="p-6 text-center">
          <AlertTriangle size={48} className="mx-auto text-yellow-500 mb-4" />
          <h1 className="text-xl font-bold">Access Denied</h1>
          <p className="opacity-70 mt-2">Only admins can view this page.</p>
        </div>
      </AppShell>
    );
  }

  if (loading)
    return (
      <AppShell>
        <div className="p-4 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-16 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse"
            />
          ))}
        </div>
      </AppShell>
    );

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-4 border flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold">
                  {user.username?.[0]?.toUpperCase() ?? "?"}
                </div>
                <div>
                  <p className="font-semibold text-sm">{user.username ?? "Unknown"}</p>
                  <p className="text-xs text-slate-500">{user.karma} karma</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <select
                  aria-label="Select role"
                  value={user.role}
                  onChange={(e) => updateRole(user.id, e.target.value as Profile["role"])}
                  className="text-xs border rounded-lg px-2 py-1 bg-white dark:bg-slate-800"
                >
                  <option value="student">Student</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  onClick={() => toggleLecturer(user.id, user.is_lecturer)}
                  className={`p-1.5 rounded-lg ${
                    user.is_lecturer
                      ? "bg-green-100 dark:bg-green-900/30 text-green-600"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                  }`}
                  aria-label="Toggle lecturer status"
                >
                  <GraduationCap size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
````

## File: src/pages/admin/ReportsPage.tsx
````typescript
import { useEffect, useState } from "react";
import { Flag, MessageCircle } from "lucide-react";
import AppShell from "../../components/layout/AppShell";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";

interface Report {
  id: string;
  post_id: string | null;      // nullable in DB
  reporter_id: string;
  reason: string;
  created_at: string | null;
  material_id?: string | null;
}

interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
}

interface PostContent {
  id: string;
  content: string | null;
  user_id: string | null;      // nullable in DB
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function ReportsPage() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [reporters, setReporters] = useState<Record<string, Profile>>({});
  const [posts, setPosts] = useState<Record<string, PostContent>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const { data, error } = await supabase
          .from("reports")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error(error);
          setLoading(false);
          return;
        }

        const reportsList = data ?? [];
        setReports(reportsList as Report[]);

        // Collect unique reporter IDs
        const reporterIds = [...new Set(reportsList.map((r) => r.reporter_id))];
        // Collect unique post IDs, filter out nulls
        const postIds = [...new Set(reportsList.map((r) => r.post_id).filter((id): id is string => id !== null))];

        if (reporterIds.length > 0) {
          const { data: users } = await supabase
            .from("profiles")
            .select("id, username, avatar_url")
            .in("id", reporterIds);
          const map: Record<string, Profile> = {};
          (users ?? []).forEach((u) => {
            map[u.id] = u;
          });
          setReporters(map);
        }

        if (postIds.length > 0) {
          const { data: postsData } = await supabase
            .from("posts")
            .select("id, content, user_id")
            .in("id", postIds);
          const map: Record<string, PostContent> = {};
          (postsData ?? []).forEach((p) => {
            map[p.id] = p as PostContent;
          });
          setPosts(map);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  const handleMessageReporter = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          Reports
        </h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
          {loading ? "Loading…" : `${reports.length} report${reports.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {loading && (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4 animate-pulse"
            >
              <div className="h-4 w-32 bg-slate-100 dark:bg-slate-700 rounded mb-3" />
              <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded mb-2" />
              <div className="h-3 w-3/4 bg-slate-100 dark:bg-slate-700 rounded" />
            </div>
          ))}
        </div>
      )}

      {!loading && reports.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <span className="text-5xl">✅</span>
          <p className="text-base font-bold text-slate-500 dark:text-slate-400">No reports</p>
          <p className="text-sm text-slate-400 dark:text-slate-500">The community looks clean.</p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {reports.map((report) => {
          const reporter = reporters[report.reporter_id];
          const post = report.post_id ? posts[report.post_id] : null;

          return (
            <div
              key={report.id}
              className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                    <Flag size={12} className="text-red-500" />
                  </div>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    {report.reason}
                  </span>
                </div>
                {report.created_at && (
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    {timeAgo(report.created_at)}
                  </span>
                )}
              </div>

              {reporter && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center text-[10px] font-bold">
                    {reporter.username?.[0]?.toUpperCase() ?? "?"}
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    Reported by {reporter.username ?? "Anonymous"}
                  </span>
                  <button
                    onClick={() => handleMessageReporter(report.reporter_id)}
                    className="ml-auto p-1 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg"
                    title="Message reporter"
                    aria-label="Message reporter"
                  >
                    <MessageCircle size={14} />
                  </button>
                </div>
              )}

              {post?.content && (
                <div className="bg-slate-50 dark:bg-slate-700/40 rounded-xl px-3 py-2 mt-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {post.content}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
````

## File: src/pages/admin/UploadMaterialPage.tsx
````typescript
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
import AppShell from "../../components/layout/AppShell";
import { uploadStudyMaterial, awardKarma } from "../../features/study/services/study.service";
import { useAuthStore } from "../../store/authStore";
import { supabase } from "../../lib/supabase";
import { compressImage } from "../../services/commentImageService";
import { createNotification } from "../../features/notifications/services/notifications.service";

const YEAR_GROUPS = [
  "All Years",
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
  "Postgraduate",
] as const;

const MATERIAL_TYPES = [
  { value: "notes", label: "Notes", icon: "📝" },
  { value: "slides", label: "Slides", icon: "🖼️" },
  { value: "past_paper", label: "Past Paper", icon: "📄" },
  { value: "assignment", label: "Assignment", icon: "✏️" },
  { value: "resource", label: "Resource", icon: "🔗" },
  { value: "video", label: "Video", icon: "🎬" },
] as const;

type MaterialType = (typeof MATERIAL_TYPES)[number]["value"];

/** Initial form state with all fields required by the StudyMaterial Insert type */
const initialForm = {
  title: "",
  description: "",
  subject: "",
  year_group: "All Years" as string,
  material_type: "notes" as MaterialType,
  external_url: "",
  tags: "",
  is_pinned: false,
  is_premium: false,
  premium_cost: 0,
  trending_score: 0,
  programme: "",
};

export default function UploadMaterialPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  async function handleSubmit() {
    if (!user) return;
    if (!form.title.trim()) return setError("Title is required.");
    if (!form.subject.trim()) return setError("Subject is required.");
    if (files.length === 0 && !form.external_url.trim()) return setError("Provide a file or an external URL.");

    setLoading(true);
    setError("");

    try {
      // Duplicate check using Dice coefficient
      const existingTitles = await supabase.from("study_materials").select("title");
      if (existingTitles.error) throw existingTitles.error;
      const { diceCoefficient } = await import("../../utils/stringSimilarity");
      const duplicate = existingTitles.data?.some((m) => diceCoefficient(form.title, m.title) > 0.7);
      if (duplicate && !confirm("A similar material already exists. Upload anyway?")) {
        setLoading(false);
        return;
      }

      let file_url: string | null = null;

      if (files.length > 0) {
        const file = files[0];
        const compressed = await compressImage(file);
        const filePath = `posts/${user.id}/${Date.now()}_${compressed.name}`;
        const { error: uploadErr } = await supabase.storage
          .from("post-images")
          .upload(filePath, compressed);
        if (uploadErr) throw uploadErr;
        const { data } = supabase.storage.from("post-images").getPublicUrl(filePath);
        file_url = data.publicUrl;
      }

      // The uploadStudyMaterial function expects all non‑null fields of StudyMaterial Insert
      await uploadStudyMaterial({
        title: form.title.trim(),
        description: form.description.trim() || null,
        subject: form.subject.trim(),
        programme: form.programme.trim() || null,
        year_group: form.year_group,
        material_type: form.material_type,
        file_url,
        external_url: form.external_url.trim() || null,
        thumbnail_url: null,
        uploaded_by: user.id,
        tags: form.tags
          .split(",")
          .map((t) => t.trim().toLowerCase())
          .filter(Boolean),
        is_pinned: form.is_pinned,
        is_premium: form.is_premium,
        premium_cost: form.premium_cost,
        trending_score: form.trending_score,
      });

      // Award karma independently of notification success.
      awardKarma(user.id, 5, "Uploaded a study material").catch(() => {});


      // Notify users who requested this subject
      try {
        const { data: matchingRequests } = await supabase
          .from("material_requests")
          .select("user_id, title")
          .eq("subject", form.subject.trim());

        if (matchingRequests) {
          for (const req of matchingRequests) {
            await createNotification(
              req.user_id,
              "Material uploaded for your request",
              `"${form.title}" was uploaded for subject "${form.subject}".`,
              "study"
            ).catch(() => {});
          }
        }
      } catch (err) {
        // Never block upload/karma on notification failures.
        console.warn("Failed to notify matching requesters", err);
      }

      navigate("/study");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Something went wrong. Try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      {/* Page header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Upload Material</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500">Add a resource for students</p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {/* ── Material type ── */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Type</p>
          <div className="grid grid-cols-3 gap-2">
            {MATERIAL_TYPES.map(({ value, label, icon }) => {
              const active = form.material_type === value;
              return (
                <button
                  key={value}
                  onClick={() => set("material_type", value)}
                  className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl border text-xs font-semibold transition-all duration-150
                    ${active
                      ? "border-blue-500 dark:border-cyan-500 bg-blue-50 dark:bg-cyan-900/20 text-blue-700 dark:text-cyan-400"
                      : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 text-slate-500 dark:text-slate-400"
                    }`}
                >
                  <span className="text-xl">{icon}</span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Title ── */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-2">Title *</label>
          <input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. Intro to Thermodynamics — Week 3 Notes"
            className="w-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-400 dark:focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* ── Subject ── */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-2">Subject *</label>
          <input
            value={form.subject}
            onChange={(e) => set("subject", e.target.value)}
            placeholder="e.g. Physics, Mathematics, Computer Science"
            className="w-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-400 dark:focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* ── Programme ── */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-2">
            Programme / Course
          </label>
          <input
            value={form.programme}
            onChange={(e) => set("programme", e.target.value)}
            placeholder="e.g. Computer Science, Geology"
            className="w-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-400 dark:focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* ── Year group ── */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Year Group</p>
          <div className="flex flex-wrap gap-2">
            {YEAR_GROUPS.map((y) => (
              <button
                key={y}
                onClick={() => set("year_group", y)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150
                  ${form.year_group === y
                    ? "bg-blue-600 dark:bg-cyan-500 border-blue-600 dark:border-cyan-500 text-white"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                  }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {/* ── Description ── */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-2">Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Brief description of what this material covers…"
            className="w-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-400 dark:focus:border-cyan-500 transition-colors resize-none"
          />
        </div>

        {/* ── File upload ── */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Upload File</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.ppt,.pptx"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-3 bg-white dark:bg-slate-800/60 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-4 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
              <Upload size={14} className="text-slate-400 dark:text-slate-500" />
            </div>
            <span className={`text-sm ${files.length > 0 ? "text-blue-600 dark:text-cyan-400 font-medium" : "text-slate-400 dark:text-slate-500"}`}>
              {files.length > 0 ? `${files.length} file(s) selected` : "Tap to choose files"}
            </span>
          </label>
          {files.length > 0 && (
            <button onClick={() => setFiles([])} className="mt-1.5 text-xs text-red-500 dark:text-red-400 font-medium px-1">
              Remove files
            </button>
          )}
        </div>

        {/* ── External URL ── */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-2">Or External URL</label>
          <input
            value={form.external_url}
            onChange={(e) => set("external_url", e.target.value)}
            placeholder="https://drive.google.com/…"
            className="w-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-400 dark:focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* ── Tags ── */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-2">
            Tags <span className="normal-case font-normal">(comma separated)</span>
          </label>
          <input
            value={form.tags}
            onChange={(e) => set("tags", e.target.value)}
            placeholder="midterm, chapter-3, optics"
            className="w-full bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-blue-400 dark:focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* ── Pin toggle ── */}
        <div className="flex items-center justify-between bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 rounded-2xl px-4 py-3.5">
          <div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Pin this material</p>
            <p className="text-xs text-slate-400 dark:text-slate-500">Pinned materials appear at the top</p>
          </div>
          <button
            onClick={() => set("is_pinned", !form.is_pinned)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${
              form.is_pinned ? "bg-blue-600 dark:bg-cyan-500" : "bg-slate-200 dark:bg-slate-700"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                form.is_pinned ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* ── Premium & Credits (optional) ── */}
        <div className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 rounded-2xl px-4 py-3.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Premium Content</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">Require credits to unlock</p>
            </div>
            <button
              onClick={() => set("is_premium", !form.is_premium)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${
                form.is_premium ? "bg-amber-500" : "bg-slate-200 dark:bg-slate-700"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                  form.is_premium ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
          {form.is_premium && (
            <div className="mt-3">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">Credit Cost</label>
              <input
                type="number"
                min={0}
                value={form.premium_cost}
                onChange={(e) => set("premium_cost", Number(e.target.value) || 0)}
                className="w-24 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white outline-none"
              />
            </div>
          )}
        </div>

        {/* ── Error ── */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-2xl px-4 py-3 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* ── Submit ── */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 bg-blue-600 dark:bg-cyan-500 text-white text-sm font-bold rounded-2xl shadow-lg shadow-blue-500/20 dark:shadow-cyan-500/20 disabled:opacity-60 transition-opacity"
        >
          {loading ? "Uploading…" : "Publish Material"}
        </button>
      </div>
    </AppShell>
  );
}
````

## File: src/pages/announcements/AnnouncementsPage.tsx
````typescript
import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { fetchAnnouncements } from "../../services/announcementService";
import { supabase } from "../../lib/supabase";

interface Announcement {
  id: string;
  title: string | null;
  content: string | null;
  image_url?: string | null;
  document_url?: string | null;
  category?: string | null;
  pinned?: boolean | null;
  created_at: string | null;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] =
    useState<Announcement[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  async function loadAnnouncements() {
    try {
      const data = await fetchAnnouncements();

      setAnnouncements(
        data as Announcement[]
      );

      setError("");
    } catch (err: any) {
      setError(
        err.message ||
          "Failed to load announcements"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAnnouncements();

    const channel = supabase
      .channel("announcements-feed")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "announcements",
        },
        () => {
          loadAnnouncements();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <AppShell>
      <div className="px-4 pb-24">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            📢 Bulletin Board
          </h1>

          <p className="text-sm opacity-70 mt-1">
            Campus announcements,
            opportunities, events and
            important notices.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="
                  h-40
                  rounded-3xl
                  bg-slate-200
                  dark:bg-slate-800
                  animate-pulse
                "
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div
            className="
              bg-red-50
              dark:bg-red-950/20
              border
              border-red-200
              dark:border-red-900
              text-red-600
              rounded-2xl
              p-4
            "
          >
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          announcements.length === 0 && (
            <div
              className="
                text-center
                py-20
              "
            >
              <div className="text-5xl mb-3">
                📭
              </div>

              <p className="opacity-60">
                No announcements yet.
              </p>
            </div>
          )}

        {/* Announcements */}
        <div className="space-y-5">
          {announcements.map((a) => (
            <article
              key={a.id}
              className="
                overflow-hidden
                bg-white
                dark:bg-slate-900
                rounded-3xl
                shadow-sm
                border
                border-slate-100
                dark:border-slate-800
              "
            >
              {/* Banner Image */}
              {a.image_url && (
                <img
                  src={a.image_url}
                  alt={a.title ?? ""}
                  className="
                    w-full
                    h-56
                    object-cover
                  "
                />
              )}

              <div className="p-5">

                {/* Top Tags */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">

                  {a.pinned && (
                    <span
                      className="
                        bg-red-100
                        text-red-600
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                      "
                    >
                      📌 Pinned
                    </span>
                  )}

                  {a.category && (
                    <span
                      className="
                        bg-blue-100
                        text-blue-600
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        capitalize
                      "
                    >
                      {a.category}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2
                  className="
                    text-xl
                    font-bold
                    mb-2
                  "
                >
                  {a.title ??
                    "Untitled Announcement"}
                </h2>

                {/* Content */}
                <p
                  className="
                    text-sm
                    opacity-80
                    whitespace-pre-wrap
                  "
                >
                  {a.content}
                </p>

                {/* Attachment */}
                {a.document_url && (
                  <a
                    href={a.document_url}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      mt-4
                      px-4
                      py-2
                      rounded-xl
                      bg-blue-50
                      dark:bg-blue-950/30
                      text-blue-600
                      font-medium
                    "
                  >
                    📄 Download Attachment
                  </a>
                )}

                {/* Footer */}
                <div
                  className="
                    mt-4
                    pt-4
                    border-t
                    border-slate-100
                    dark:border-slate-800
                    flex
                    justify-between
                    items-center
                  "
                >
                  <span
                    className="
                      text-xs
                      opacity-50
                    "
                  >
                    Warren Admin
                  </span>

                  <span
                    className="
                      text-xs
                      opacity-50
                    "
                  >
                    {a.created_at
                      ? new Date(
                          a.created_at
                        ).toLocaleDateString()
                      : ""}
                  </span>
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </AppShell>
  );
}
````

## File: src/pages/auth/LoginPage.tsx
````typescript
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useLogin } from "../../features/auth/hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const errorMessage =
    loginMutation.error instanceof Error ? loginMutation.error.message : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email: email.trim(), password },
      {
        onSuccess: () => navigate("/"),
      }
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-100 via-white to-blue-50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center px-4">
      {/* decorative blobs unchanged */}
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="absolute top-1/2 -right-40 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="w-full max-w-md z-10">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl border border-white/20 dark:border-slate-800/50">
          {/* Logo unchanged */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-6 h-20 w-20 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <span className="text-3xl font-black text-white">W</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Warren
            </h1>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Connect with students, share ideas and stay updated with campus life.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-950/70 px-4 py-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-950/70 px-4 py-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <div className="text-right mt-2">
                  <Link to="/reset-password" className="text-sm text-blue-600">
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl px-4 py-3">
                {errorMessage}
              </div>
            )}

            <button
              disabled={loginMutation.isPending}
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 font-semibold shadow-lg active:scale-[0.98] transition"
            >
              {loginMutation.isPending ? (
                "Signing In..."
              ) : (
                <span className="flex justify-center items-center gap-2">
                  <LogIn size={18} />
                  Sign In
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                Join students from campuses around the world
              </p>
            </div>
            <Link to="/register" className="text-blue-600 font-medium">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
````

## File: src/pages/auth/RegisterPage.tsx
````typescript
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useRegister } from "../../features/auth/hooks/useAuth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const errorMessage =
    registerMutation.error instanceof Error ? registerMutation.error.message : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().length < 3) return;
    if (password.length < 6) return;
    registerMutation.mutate(
      { email: email.trim().toLowerCase(), password, username: username.trim() },
      { onSuccess: () => navigate("/") }
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-100 via-white to-blue-50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center px-4">
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="absolute top-1/2 -right-40 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="w-full max-w-md z-10">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl border border-white/20 dark:border-slate-800/50">
          <div className="text-center mb-8">
            <div className="mx-auto mb-6 h-20 w-20 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <span className="text-3xl font-black text-white">W</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Join Warren
            </h1>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Create your account to connect with students worldwide.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-70">
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                autoComplete="username"
                required
                className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-950/70 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-70">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-950/70 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-70">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                autoComplete="new-password"
                required
                minLength={6}
                className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-950/70 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
              />
            </div>

            {errorMessage && (
              <div className="rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                {errorMessage}
              </div>
            )}

            <button
              disabled={registerMutation.isPending}
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 font-semibold shadow-lg hover:shadow-xl active:scale-[0.98] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {registerMutation.isPending ? (
                "Creating Account..."
              ) : (
                <span className="flex justify-center items-center gap-2">
                  <UserPlus size={18} />
                  Create Account
                </span>
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link
              to="/login"
              className="text-blue-600 dark:text-cyan-400 font-medium hover:underline"
            >
              Already have an account? Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
````

## File: src/pages/ComingSoonPage.tsx
````typescript
import AppShell from "../components/layout/AppShell";
import { Rocket } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export default function ComingSoonPage({
  title,
  description,
}: Props) {
  return (
    <AppShell>
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white mb-6">
            <Rocket size={36} />
          </div>

          <h1 className="text-3xl font-bold">
            {title}
          </h1>

          <p className="mt-4 text-slate-600 dark:text-slate-400">
            {description}
          </p>

          <div className="mt-6 inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-950/40 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300">
            Coming Soon 🚀
          </div>
        </div>
      </div>
    </AppShell>
  );
}
````

## File: src/pages/community/CommunityChatPage.tsx
````typescript
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { useAuthStore } from "../../store/authStore";
import {
  fetchMessages,
  sendTextMessage,
  sendImageMessage,
  sendGifMessage,
  uploadChatImage,
  subscribeToMessages,
  type CommunityMessageWithProfile,
} from "../../services/communityChatService";
import { ArrowLeft, Send, Image as ImageIcon, Loader2, Link } from "lucide-react";

import DirectMessageDrawer from "../../components/community/DirectMessageDrawer";
import { useToastStore } from "../../store/toastStore";

export default function CommunityChatPage() {
  const { id: communityId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user = useAuthStore((s) => s.user);
  const { showToast } = useToastStore();
  const [messages, setMessages] = useState<CommunityMessageWithProfile[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<ReturnType<typeof subscribeToMessages> | null>(null);

  const dmUserIdFromParam = searchParams.get("dm");
  const [directMessageUser, setDirectMessageUser] = useState<{
    id: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    if (dmUserIdFromParam && communityId) {
      navigate(`/community/${communityId}/chat`, { replace: true });
      setDirectMessageUser({ id: dmUserIdFromParam, name: "User" });
    }
  }, [dmUserIdFromParam, communityId, navigate]);

  useEffect(() => {
    if (!communityId || !user) return;
    fetchMessages(communityId)
      .then((msgs) => {
        setMessages(msgs);
        setLoading(false);
      })
      .catch(console.error);
  }, [communityId, user]);

  useEffect(() => {
    if (!communityId) return;
    channelRef.current = subscribeToMessages(communityId, (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });
    return () => {
      channelRef.current?.unsubscribe();
    };
  }, [communityId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMsg.trim() || !user || !communityId) return;
    setSending(true);
    try {
      if (
        /^https?:\/\/\S+\.(gif|webp)(\?.*)?$/i.test(newMsg.trim()) &&
        (newMsg.includes("giphy") || newMsg.includes("tenor"))
      ) {
        await sendGifMessage(communityId, user.id, newMsg.trim());
      } else {
        await sendTextMessage(communityId, user.id, newMsg.trim());
      }
      setNewMsg("");
    } catch (err) {
      console.error(err);
      showToast("Failed to send message", "err");
    } finally {
      setSending(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || !communityId) return;
    setSending(true);
    try {
      const imageUrl = await uploadChatImage(file, user.id);
      await sendImageMessage(communityId, user.id, imageUrl);
    } catch (err) {
      console.error(err);
      showToast("Failed to upload image", "err");
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const openDirectMessage = (userId: string, username: string) => {
    setDirectMessageUser({ id: userId, name: username });
  };

  const handleCopyInvite = () => {
    const inviteUrl = `${window.location.origin}/community/${communityId}/join`;
    navigator.clipboard.writeText(inviteUrl);
    alert("Invite link copied! Share it with your friends.");
  };

  if (!communityId) return null;


  return (
    <AppShell>
      <div className="flex flex-col h-full" style={{ minHeight: "100dvh" }}>
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-10">
          <button onClick={() => navigate(-1)} className="p-1" aria-label="Go back">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold text-lg flex-1">Chat</h1>
          <button onClick={handleCopyInvite} className="p-1" aria-label="Copy invite link">
            <Link size={20} />
          </button>
        </div>


        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {loading && (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin" size={24} />
            </div>
          )}
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isMine={msg.user_id === user?.id}
              onDirectMessage={openDirectMessage}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center gap-2">
          <label className="p-2 cursor-pointer" aria-label="Upload image">
            <ImageIcon size={20} />
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
          <textarea
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2 resize-none outline-none"
            aria-label="Message input"
          />
          <button
            onClick={handleSend}
            disabled={!newMsg.trim() || sending}
            className="p-2 bg-blue-600 text-white rounded-full disabled:opacity-50"
            aria-label="Send message"
          >
            {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>

      {/* Direct Message Drawer */}
      {directMessageUser && (
        <DirectMessageDrawer
          open={!!directMessageUser}
          onClose={() => setDirectMessageUser(null)}
          receiverId={directMessageUser.id}
          receiverName={directMessageUser.name}
        />
      )}
    </AppShell>
  );
}

// ── Message Bubble ────────────────────────────────────────────────────────────
function MessageBubble({
  message,
  isMine,
  onDirectMessage,
}: {
  message: CommunityMessageWithProfile;
  isMine: boolean;
  onDirectMessage: (userId: string, username: string) => void;
}) {
  const username = message.profiles?.username ?? "Anonymous";
  const avatar = message.profiles?.avatar_url;

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] ${isMine ? "order-2" : "order-1"}`}>
        {!isMine && (
          <div className="flex items-center gap-2 mb-1">
            {avatar ? (
              <img src={avatar} className="w-5 h-5 rounded-full object-cover" alt={username} />
            ) : (
              <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
                {username[0]?.toUpperCase()}
              </div>
            )}
            <button
              onClick={() => onDirectMessage(message.user_id, username)}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              aria-label={`Message ${username}`}
            >
              {username}
            </button>
          </div>
        )}
        <div
          className={`p-3 rounded-2xl text-sm ${
            isMine
              ? "bg-blue-600 text-white rounded-br-md"
              : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-md"
          }`}
        >
          {message.type === "text" && <p>{message.content}</p>}
          {message.type === "image" && message.image_url && (
            <img src={message.image_url} alt="Shared" className="rounded-lg max-h-60 w-full object-cover" />
          )}
          {message.type === "gif" && message.image_url && (
            <img src={message.image_url} alt="GIF" className="rounded-lg max-h-60 w-full object-cover" />
          )}
          {message.type === "sticker" && message.sticker_url && (
            <img src={message.sticker_url} alt="Sticker" className="w-24 h-24 object-contain" />
          )}
          {message.type === "voice" && message.voice_url && (
            <audio controls className="max-w-full mt-1">
              <source src={message.voice_url} />
            </audio>
          )}
          <div className={`text-[10px] mt-1 ${isMine ? "text-blue-200" : "text-slate-400"}`}>
            {new Date(message.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
````

## File: src/pages/community/CommunityPage.tsx
````typescript
import { useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { useCommunitiesStore } from "../../features/communities/store/communities.store";
import { useCommunities } from "../../features/communities/hooks/useCommunities";
import { useCommunityMembership } from "../../features/communities/hooks/useCommunityMembership";
import { CommunityGrid } from "../../features/communities/components/CommunityGrid";
import CommunityMembersDrawer from "../../features/communities/components/CommunityMembersDrawer";
import { useAuthStore } from "../../store/authStore";
import { useUserRole } from "../../hooks/useUserRole";
import { useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "../../store/toastStore";
import type { Community } from "../../types/community";


type FilterType = "all" | "social" | "educational";



export default function CommunityPage() {
  const user = useAuthStore((s) => s.user);
  const { role } = useUserRole();
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  const filterType = useCommunitiesStore((s) => s.filterType);
  const setFilterType = useCommunitiesStore((s) => s.setFilterType);
  const selectedParentId = useCommunitiesStore((s) => s.selectedParentId);
  const setSelectedParentId = useCommunitiesStore((s) => s.setSelectedParentId);
  const selectedYear = useCommunitiesStore((s) => s.selectedYear);
  const setSelectedYear = useCommunitiesStore((s) => s.setSelectedYear);

  const { communities, parentSchools, memberCounts, userMemberships, isLoading } = useCommunities();
  const { join, leave, isJoining } = useCommunityMembership();

  const [manageCommunityId, setManageCommunityId] = useState<string | null>(null);

  const canManage = (community: Community) => {
    if (!user) return false;
    return user.id === community.created_by || role === "admin" || role === "moderator";
  };

  const toggleMembership = (communityId: string) => {
    if (!user) return showToast("Please sign in", "err");
    if (userMemberships.has(communityId)) leave(communityId);
    else join(communityId);
  };

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-4">Communities</h1>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
          {(["all", "social", "educational"] as FilterType[]).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`min-h-[44px] px-5 py-2.5 rounded-full text-sm font-semibold capitalize border ${
                filterType === t
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500"
              }`}
            >
              {t === "all" ? "All" : t}
            </button>
          ))}
        </div>

        {/* If you need a community detail view inside this page, wire the Room tab here. */}

        {/* Educational filters */}
        {filterType === "educational" && (
          <div className="flex gap-2 mb-4 flex-wrap">
            <select
              title="Select school"
              value={selectedParentId ?? ""}
              onChange={(e) => setSelectedParentId(e.target.value || null)}

              className="min-h-[44px] px-4 py-2.5 rounded-2xl border text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            >
              <option value="">All Schools</option>
              {parentSchools.map((school) => (
                <option key={school.id} value={school.id}>{school.name}</option>
              ))}
            </select>
            <select
              title="Select year"
              value={selectedYear ?? ""}
              onChange={(e) => setSelectedYear(e.target.value || null)}

              className="min-h-[44px] px-4 py-2.5 rounded-2xl border text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            >
              <option value="">All Years</option>
              <option value="1st">1st Year</option>
              <option value="2nd">2nd Year</option>
              <option value="3rd">3rd Year</option>
              <option value="4th">4th Year</option>
              <option value="all">All Chat</option>
            </select>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-40 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <CommunityGrid
            communities={communities}
            memberCounts={memberCounts}
            userMemberships={userMemberships}
            isJoining={isJoining}
            canManage={canManage}
            onToggleMembership={toggleMembership}
            onManageMembers={setManageCommunityId}
          />
        )}

        {manageCommunityId && (
          <CommunityMembersDrawer
            communityId={manageCommunityId}
            open={!!manageCommunityId}
            onClose={() => setManageCommunityId(null)}
            onMembersChanged={() => {
              queryClient.invalidateQueries({ queryKey: ["communityMemberCounts"] });
            }}
          />
        )}
      </div>
    </AppShell>
  );
}
````

## File: src/pages/community/JoinCommunity.tsx
````typescript
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { joinCommunity } from "../../features/communities/services/communities.service";
import { useAuthStore } from "../../store/authStore";
import { Loader2 } from "lucide-react";

export default function JoinCommunity() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id || !user) return;
    joinCommunity(id)
      .then(() => navigate(`/community/${id}/chat`, { replace: true }))
      .catch(() => setError("Failed to join group. It may be private."));
  }, [id, user, navigate]);

  if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;
  return (
    <div className="flex justify-center py-12">
      <Loader2 className="animate-spin" size={24} />
    </div>
  );
}
````

## File: src/pages/events/EventsPage.tsx
````typescript
import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { fetchEvents, toggleReminder, getReminderStatus } from "../../services/eventsService";
import { fetchCommunities } from "../../features/communities/services/communities.service";
import { useAuthStore } from "../../store/authStore";
import type { Database } from "../../types/database.types";
import { Clock, Bell, BellOff } from "lucide-react";
import { format } from "date-fns";
// ... rest unchanged;

type Event = Database["public"]["Tables"]["events"]["Row"];
type Community = Database["public"]["Tables"]["communities"]["Row"];

export default function EventsPage() {
  const user = useAuthStore((s) => s.user);
  const [events, setEvents] = useState<Event[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [reminders, setReminders] = useState<Record<string, boolean>>({});
  const [communityFilter, setCommunityFilter] = useState<string>("all");

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fetchCommunities().then(setCommunities).catch(console.error);
  }, []);

  useEffect(() => {
    if (!user || events.length === 0) return;
    const loadReminders = async () => {
      const status: Record<string, boolean> = {};
      await Promise.all(
        events.map(async (event) => {
          status[event.id] = await getReminderStatus(event.id, user.id);
        })
      );
      setReminders(status);
    };
    loadReminders();
  }, [user, events]);

  const handleToggleReminder = async (eventId: string) => {
    if (!user) return;
    const nowReminded = await toggleReminder(eventId, user.id);
    setReminders((prev) => ({ ...prev, [eventId]: nowReminded }));
  };

  const filteredEvents = communityFilter === "all"
    ? events
    : events.filter((e) => e.community_id === communityFilter);

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            📅 Campus Events
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            Upcoming deadlines and events
          </p>
        </div>

        {/* Community filter */}
        {communities.length > 0 && (
          <div className="mb-4">
            <select
              value={communityFilter}
              onChange={(e) => setCommunityFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border text-sm bg-white dark:bg-slate-800"
            >
              <option value="all">All Communities</option>
              {communities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12 opacity-60">
            <span className="text-5xl mb-3 block">📭</span>
            <p className="font-semibold">No upcoming events</p>
            <p className="text-sm mt-1">Check back soon or check your community pages.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-4"
              >
                <h3 className="font-bold text-slate-800 dark:text-slate-100">{event.title}</h3>
                {event.description && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{event.description}</p>
                )}
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {format(new Date(event.event_date), "PPp")}
                  </span>
                  {event.community_id && (
                    <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                      {communities.find((c) => c.id === event.community_id)?.name ?? "Community"}
                    </span>
                  )}
                </div>
                <div className="flex justify-end mt-3">
                  {user && (
                    <button
                      onClick={() => handleToggleReminder(event.id)}
                      className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full transition ${
                        reminders[event.id]
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {reminders[event.id] ? <Bell size={12} /> : <BellOff size={12} />}
                      {reminders[event.id] ? "Reminded" : "Remind me"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
````

## File: src/pages/home/HomePage.tsx
````typescript
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import AppShell from "../../components/layout/AppShell";
import { usePosts } from "../../features/posts/hooks/usePosts";
import { usePostVote } from "../../features/posts/hooks/usePostVote";
import { deletePost } from "../../features/posts/services/posts.service";
import { usePostsStore } from "../../features/posts/store/posts.store";
import { Feed } from "../../features/posts/components/Feed";
import CreatePostSheet from "../../features/posts/components/CreatePostSheet";
import CommentSection from "../../components/comments/CommentSection";
import FeedToggle from "../../components/feed/FeedToggle";
import { Plus } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export default function HomePage() {
  const currentUser = useAuthStore((s) => s.user);
  const sortMode = usePostsStore((s) => s.sortMode);
  const setSortMode = usePostsStore((s) => s.setSortMode);
  const { posts, isLoading, isError, error, refetch } = usePosts();
  const voteMutation = usePostVote();

  const [openSheet, setOpenSheet] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [activeCommentPostOwner, setActiveCommentPostOwner] = useState<string | null>(null);

  const activePost = activeCommentPostId ? posts.find((p) => p.id === activeCommentPostId) ?? null : null;

  const handleVote = (postId: string, type: "up" | "down") => {
    voteMutation.mutate({ postId, type });
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("Delete this post?")) return;
    await deletePost(postId);
    refetch();
  };

  const currentUserId = currentUser?.id;
  const { data: userVotes = {} } = useQuery({
    queryKey: ["userVotes", currentUserId, posts.map(p => p.id)],
    queryFn: async () => {
      if (!currentUserId || posts.length === 0) return {};
      const { data } = await supabase
        .from("post_votes")
        .select("post_id, vote_type")
        .eq("user_id", currentUserId)
        .in("post_id", posts.map(p => p.id));
      const votes: Record<string, "up" | "down" | null> = {};
      (data ?? []).forEach(v => { votes[v.post_id] = v.vote_type as "up" | "down"; });
      return votes;
    },
    enabled: !!currentUserId && posts.length > 0,
  });

  return (
    <>
      <AppShell>
        <div className="px-4 pb-28">
          <div className="sticky top-0 z-20 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl pt-4 pb-3 mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Home Feed</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Live campus conversations</p>
            <div className="mt-4 rounded-2xl border border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-slate-900 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">📜 Community Guidelines</p>
                  <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-1">Users are limited to 10 posts per hour to keep the feed high‑quality.</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">10</p>
                  <p className="text-xs text-blue-600/70 dark:text-blue-400/70">posts/hr</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <FeedToggle active={sortMode} onChange={setSortMode} />
            </div>
          </div>

          {isError && <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-4">{error?.message}</div>}

          <Feed
            posts={posts}
            isLoading={isLoading}
            userVotes={userVotes}
            onVote={handleVote}
            onDelete={handleDelete}
            onCommentClick={(post) => {
              setActiveCommentPostId(post.id);
              setActiveCommentPostOwner(post.user_id);
            }}
            onPostClick={(post) => {
              setActiveCommentPostId(post.id);
              setActiveCommentPostOwner(post.user_id);
            }}
          />
        </div>
      </AppShell>

      {/* FAB */}
      <button
        onClick={() => setOpenSheet(true)}
        className="fixed bottom-24 right-5 z-40 min-h-[56px] min-w-[56px] px-5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all duration-200 motion-safe:active:scale-95 hover:shadow-xl"
      >
        <Plus size={24} />
        <span className="font-semibold text-base hidden sm:inline">Post</span>
      </button>

      <CreatePostSheet open={openSheet} onClose={() => setOpenSheet(false)} onCreated={() => { setOpenSheet(false); refetch(); }} />

      {activeCommentPostId && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm" onClick={() => { setActiveCommentPostId(null); setActiveCommentPostOwner(null); }}>
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl p-4 animate-slide-up max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="overflow-y-auto max-h-[75vh]">
              {activePost && (
                <div className="mb-4">
                  <p className="text-sm whitespace-pre-wrap">{activePost.content}</p>
                  {activePost.image_url && <img src={activePost.image_url} alt="Post" className="w-full max-h-60 object-cover rounded-xl mt-3" />}
                  {activePost.voice_url && <audio controls src={activePost.voice_url} className="w-full mt-2 h-8" />}
                </div>
              )}
              <CommentSection postId={activeCommentPostId} postOwnerId={activeCommentPostOwner} onClose={() => { setActiveCommentPostId(null); setActiveCommentPostOwner(null); }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
````

## File: src/pages/legal/AboutPage.tsx
````typescript
import AppShell from "../../components/layout/AppShell";

export default function AboutPage() {
  return (
    <AppShell>
      <div className="px-4 pb-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">About Warren</h1>
        <div className="prose prose-sm dark:prose-invert space-y-4">
          <p>
            Warren is a student‑only social network designed to help freshers connect,
            share resources, and navigate campus life. Built with privacy and simplicity
            in mind, Warren brings together communities, study materials, campus maps,
            and real‑time chat.
          </p>
          <p>
            Our mission is to make every student feel at home from day one. Whether you're
            looking for your school's past papers, a study group, or just a friendly
            conversation, Warren has you covered.
          </p>
          <p>
            Warren is developed and maintained by a dedicated team of students and alumni.
            We believe that education should be collaborative, not competitive.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
````

## File: src/pages/legal/ContactPage.tsx
````typescript
import AppShell from "../../components/layout/AppShell";
import { Mail, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <AppShell>
      <div className="px-4 pb-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
        <div className="space-y-4">
          <p className="text-sm opacity-70">
            Have a question, suggestion, or need help? Reach out to us via email or
            through the app's messaging system.
          </p>
          <a
            href="mailto:support@warren.app"
            className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border"
          >
            <Mail size={20} />
            <span className="text-sm font-medium">support@warren.app</span>
          </a>
          <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border">
            <MessageCircle size={20} />
            <span className="text-sm font-medium">Use the in‑app Messages tab</span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
````

## File: src/pages/legal/PrivacyPage.tsx
````typescript
import AppShell from "../../components/layout/AppShell";

export default function PrivacyPage() {
  return (
    <AppShell>
      <div className="px-4 pb-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <div className="prose prose-sm dark:prose-invert space-y-4">
          <p><strong>Last updated:</strong> {new Date().getFullYear()}-01-01</p>
          <p>
            Warren ("we", "our", "us") is committed to protecting your privacy.
            This Privacy Policy explains how your personal information is collected,
            used, and disclosed by Warren.
          </p>
          <h3>Information We Collect</h3>
          <p>
            We collect information you provide directly to us, such as when you
            create an account, post content, or communicate with other users.
            This may include your email address, username, and profile information.
          </p>
          <h3>How We Use Your Information</h3>
          <p>
            We use your information to operate, maintain, and improve our services,
            to communicate with you, and to personalise your experience.
          </p>
          <h3>Third‑Party Services</h3>
          <p>
            Warren uses Google AdSense to display advertisements. AdSense may use
            cookies to serve ads based on your prior visits to our website or other
            websites. You can opt out of personalised advertising by visiting
            Google's Ads Settings.
          </p>
          <h3>Contact</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact us
            at support@warren.app.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
````

## File: src/pages/legal/TermsPage.tsx
````typescript
import AppShell from "../../components/layout/AppShell";

export default function TermsPage() {
  return (
    <AppShell>
      <div className="px-4 pb-8 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
        <div className="prose prose-sm dark:prose-invert space-y-4">
          <p><strong>Last updated:</strong> {new Date().getFullYear()}-01-01</p>
          <p>
            By accessing or using Warren, you agree to be bound by these Terms
            of Service. If you do not agree, please do not use the service.
          </p>
          <h3>Acceptable Use</h3>
          <p>
            You agree not to post content that is illegal, abusive, harassing,
            defamatory, or otherwise objectionable. We reserve the right to
            remove any content and terminate accounts at our sole discretion.
          </p>
          <h3>Intellectual Property</h3>
          <p>
            All content and materials available on Warren are protected by
            applicable intellectual property laws. You may not reproduce,
            distribute, or create derivative works without permission.
          </p>
          <h3>Termination</h3>
          <p>
            We may suspend or terminate your access to Warren at any time,
            without prior notice, for any reason.
          </p>
          <h3>Contact</h3>
          <p>
            For questions about these Terms, contact support@warren.app.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
````

## File: src/pages/map/CampusMapPage.tsx
````typescript
import { useEffect } from "react";
import { Search, X, Plus } from "lucide-react";

import { useSearchParams } from "react-router-dom";

import AppShell from "../../components/layout/AppShell";
import { useCampusMap } from "../../features/map/hooks/useCampusMap";
import { CampusMap } from "../../features/map/components/CampusMap";
import { PinForm } from "../../features/map/components/PinForm";
import { QuickActions } from "../../features/map/components/QuickActions";
import { CategoryFilter } from "../../features/map/components/CategoryFilter";
import type { PinFormData } from "../../features/map/components/PinForm";
import type { MapPin } from "../../types/map";
import { useGeolocation } from "../../features/map/hooks/useGeolocation";

const FIRST_DAY_PIN_IDS = [
  "b1a2c3d4-e5f6-7890-abcd-ef1234567890",
  "c2b3d4e5-f6a7-8901-bcde-f12345678901",
  "d3c4e5f6-a7b8-9012-cdef-123456789012",
  "e4d5f6a7-b8c9-0123-defa-234567890123",
  "f5e6a7b8-c9d0-1234-efab-345678901234",
] as const;
// Used by the first-day walkthrough (planned). Keep it referenced to satisfy TS/noUnusedLocals.
void FIRST_DAY_PIN_IDS;




export default function CampusMapPage() {
  const {
    query,
    setQuery,
    openForm,
    closeForm,
    addPin,
    editPin,
    removePin,
    showToast,
    canManage,
    editingPin,
    pendingCoords,
    showForm,
    setPlacingMode,
    pins,
    setActivePin,
  } = useCampusMap();


  const [searchParams] = useSearchParams();
  const geo = useGeolocation();

  // Deep link: open pin from URL ?pin=<id>
  useEffect(() => {
    const pinId = searchParams.get("pin");
    if (!pinId) return;
    const pin = pins.find((p) => p.id === pinId);
    if (pin) setActivePin(pin);
  }, [searchParams, pins, setActivePin]);

  // When the user finishes placing a pin, the store will have pendingCoords and showForm = true

  // (usePinPlacement calls openForm() which sets showForm true). So no extra useEffect needed.

  const handleSave = async (data: PinFormData) => {
    try {
      if (editingPin) {
        await editPin(editingPin.id, data);
        showToast("Location updated", "ok");
      } else {
        await addPin(data);
        showToast("Location added", "ok");
      }
      closeForm();
    } catch {
      showToast("Failed to save location", "err");
    }
  };

  const handleRequestPlace = () => {
    // Enter placing mode: close form, enable map click
    closeForm(); // hide form
    setPlacingMode(true); // map will now interpret clicks as placement
  };

  const handleEdit = (pin: MapPin) => {
    openForm(pin);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this location from the map?")) return;
    try {
      await removePin(id);
      showToast("Location removed", "ok");
    } catch {
      showToast("Failed to delete location", "err");
    }
  };

  return (
    <AppShell>
      <div className="flex flex-col h-full relative" style={{ minHeight: "100dvh" }}>
        {/* Header */}
        {/* Walkthrough / sharing / suggestions UI are shown on top of the map drawer */}

        <div className="px-4 pt-4 pb-2 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 z-20">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Campus Map</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Find any office or service on campus</p>
            </div>
            {canManage && (
              <button
                onClick={() => openForm()}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-sm transition-all"
              >
                <Plus size={14} />
                Add Location
              </button>
            )}
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a place, office, or service…"
              className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" aria-label="Clear search">
                <X size={14} />
              </button>
            )}
          </div>

          <QuickActions />
        </div>

        {/* Category filters */}
        <div className="px-4 py-2 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
          <CategoryFilter />
        </div>

        {/* Map */}
        <CampusMap
          canManage={canManage}
          onEditPin={handleEdit}
          onDeletePin={handleDelete}
          userPosition={geo.lat && geo.lng ? { lat: geo.lat, lng: geo.lng } : null}
        />


        {/* PinForm drawer */}
        {showForm && (
          <PinForm
            initial={
              editingPin
                ? {
                    title: editingPin.title,
                    description: editingPin.description,
                    category: editingPin.category,
                    floor: editingPin.floor ?? "",
                    hours: editingPin.hours ?? "",
                    contact: editingPin.contact ?? "",
                    x_percent: editingPin.x_percent,
                    y_percent: editingPin.y_percent,
                    photos: editingPin.photos ?? [],
                  }
                : undefined
            }
            pendingCoords={pendingCoords}
            onSave={handleSave}
            onCancel={closeForm}
            onRequestPlace={handleRequestPlace}
          />
        )}
      </div>
    </AppShell>
  );
}
````

## File: src/pages/messages/ConversationPage.tsx
````typescript
import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { useDirectMessages } from "../../features/messages/hooks/useDirectMessages";
import { MessageBubble } from "../../features/messages/components/MessageBubble";
import { useAuthStore } from "../../store/authStore";
import { ArrowLeft, Send, Loader2 } from "lucide-react";

export default function ConversationPage() {
  const { partnerId } = useParams<{ partnerId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const partnerName = (location.state as any)?.username ?? "User";
  const currentUser = useAuthStore((s) => s.user);

  const { messages, isLoading, send, isSending } = useDirectMessages(partnerId);
  const [content, setContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!content.trim()) return;
    send(content.trim());
    setContent("");
  };

  return (
    <AppShell>
      <div className="flex flex-col h-full" style={{ minHeight: "100dvh" }}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-10">
          <button onClick={() => navigate("/messages")} className="p-1" aria-label="Back">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold text-lg">{partnerName}</h1>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {isLoading && <div className="flex justify-center py-8"><Loader2 className="animate-spin" size={24} /></div>}
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              content={msg.content}
              timestamp={msg.created_at}
              isMine={msg.sender_id === currentUser?.id}
              senderName={msg.profiles?.username ?? undefined}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center gap-2">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2 outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!content.trim() || isSending}
            className="p-2 bg-blue-600 text-white rounded-full disabled:opacity-50"
            aria-label="Send message"
          >
            {isSending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </AppShell>
  );
}
````

## File: src/pages/messages/MessagesPage.tsx
````typescript
import { useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { useConversations } from "../../features/messages/hooks/useConversations";
import { ConversationList } from "../../features/messages/components/ConversationList";

export default function MessagesPage() {
  const navigate = useNavigate();
  const { data: conversations = [], isLoading } = useConversations();

  const handleSelect = (conv: any) => {
    navigate(`/messages/${conv.user_id}`, { state: { username: conv.username ?? "Unknown" } });
  };

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        {isLoading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <div key={i} className="h-20 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />)}
          </div>
        ) : (
          <ConversationList conversations={conversations} onSelect={handleSelect} />
        )}
      </div>
    </AppShell>
  );
}
````

## File: src/pages/moderation/ModerationPage.tsx
````typescript
import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { useUserRole } from "../../hooks/useUserRole";
import {
  fetchAllPostsForModeration,
  fetchAllCommentsForModeration,
  deletePost,
  deleteComment,
} from "../../features/posts/services/posts.service";
import type { PostWithProfile } from "../../features/posts/services/posts.service";
import { Trash2, AlertTriangle } from "lucide-react";

export default function ModerationPage() {
  const { role } = useUserRole();
  const [posts, setPosts] = useState<PostWithProfile[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"posts" | "comments">("posts");

  // Always call hooks – never early‑return before them
  const loadData = async () => {
    setLoading(true);
    const [p, c] = await Promise.all([
      fetchAllPostsForModeration(),
      fetchAllCommentsForModeration(),
    ]);
    setPosts(p);
    setComments(c);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeletePost = async (id: string) => {
    if (!confirm("Delete this post permanently?")) return;

    const deleted = posts.find((p) => p.id === id);
    await deletePost(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));

    if (deleted?.user_id) {
      try {
        const { createNotification } = await import(
          "../../features/notifications/services/notifications.service"
        );
        await createNotification(
          deleted.user_id,
          "Your post was removed",
          `A moderator removed your post: "${deleted.content?.slice(0, 50)}…"`,
          "moderation"
        );
      } catch (err) {
        // Notifications should never break moderation actions.
        console.warn("Failed to notify post author", err);
      }
    }
  };

  const handleDeleteComment = async (id: string) => {
    if (!confirm("Delete this comment permanently?")) return;

    const deleted = comments.find((c) => c.id === id);
    await deleteComment(id);
    setComments((prev) => prev.filter((c) => c.id !== id));

    if (deleted?.user_id) {
      try {
        const { createNotification } = await import(
          "../../features/notifications/services/notifications.service"
        );
        await createNotification(
          deleted.user_id,
          "Your comment was removed",
          `A moderator removed your comment: "${deleted.content?.slice(0, 50)}…"`,
          "moderation"
        );
      } catch (err) {
        console.warn("Failed to notify comment author", err);
      }
    }
  };

  // Only after all hooks, render the appropriate UI
  if (role !== "admin" && role !== "moderator") {
    return (
      <AppShell>
        <div className="p-6 text-center">
          <AlertTriangle size={48} className="mx-auto text-yellow-500 mb-4" />
          <h1 className="text-xl font-bold">Access Denied</h1>
          <p className="opacity-70 mt-2">Only moderators and admins can view this page.</p>
        </div>
      </AppShell>
    );
  }

  if (loading) return (
    <AppShell>
      <div className="p-4 space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-20 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
        ))}
      </div>
    </AppShell>
  );

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-4">Moderation</h1>

        <div className="flex bg-slate-200 dark:bg-slate-800 rounded-full p-1 mb-4">
          <button
            onClick={() => setTab("posts")}
            className={`flex-1 text-sm font-medium py-2 rounded-full transition ${
              tab === "posts" ? "bg-white dark:bg-slate-700 shadow-sm" : "text-slate-500"
            }`}
          >
            Posts ({posts.length})
          </button>
          <button
            onClick={() => setTab("comments")}
            className={`flex-1 text-sm font-medium py-2 rounded-full transition ${
              tab === "comments" ? "bg-white dark:bg-slate-700 shadow-sm" : "text-slate-500"
            }`}
          >
            Comments ({comments.length})
          </button>
        </div>

        {tab === "posts" && (
          <div className="space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-slate-900 rounded-2xl p-4 flex justify-between items-start">
                <div>
                  <p className="font-medium text-sm">{post.profiles?.username ?? "Anonymous"}</p>
                  <p className="text-xs opacity-70 line-clamp-2">{post.content}</p>
                </div>
                <button
                  aria-label="Delete post"
                  onClick={() => handleDeletePost(post.id)}
                  className="text-red-400 hover:text-red-600 ml-3 shrink-0"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            {posts.length === 0 && <p className="text-center opacity-60">No posts.</p>}
          </div>
        )}

        {tab === "comments" && (
          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white dark:bg-slate-900 rounded-2xl p-4 flex justify-between items-start">
                <div>
                  <p className="font-medium text-sm">{comment.profiles?.username ?? "Anonymous"}</p>
                  <p className="text-xs opacity-70">{comment.content}</p>
                </div>
                <button
                  aria-label="Delete comment"
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-red-400 hover:text-red-600 ml-3 shrink-0"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            {comments.length === 0 && <p className="text-center opacity-60">No comments.</p>}
          </div>
        )}
      </div>
    </AppShell>
  );
}
````

## File: src/pages/moderation/ModeratorDashboardPage.tsx
````typescript
import { Link } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { Shield, MapPin, Users, Upload, Flag, Calendar } from "lucide-react";

const tiles = [
  {
    to: "/moderation",
    icon: Shield,
    label: "Review Content",
    desc: "Moderate flagged posts & comments",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    to: "/admin/communities/new",
    icon: Users,
    label: "Create Community",
    desc: "Add a new group for students",
    color: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-50 dark:bg-pink-900/20",
  },
  {
    to: "/admin/events",
    icon: Calendar,
    label: "Manage Events",
    desc: "Create and manage campus events",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
  },
  {
    to: "/campus-map",
    icon: MapPin,
    label: "Update Map Pins",
    desc: "Add or edit campus locations",
    color: "text-blue-600 dark:text-cyan-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    to: "/admin/upload-material",
    icon: Upload,
    label: "Upload Study Material",
    desc: "Add notes, slides, past papers",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    to: "/admin/reports",
    icon: Flag,
    label: "View Reports",
    desc: "Review community reports",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/20",
  },
];

export default function ModeratorDashboardPage() {
  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-6">Moderator Dashboard</h1>

        <div className="flex flex-col gap-3">
          {tiles.map(({ to, icon: Icon, label, desc, color, bg }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 active:scale-[0.98] transition-transform"
            >
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                <Icon size={18} className={color} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold">{label}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{desc}</p>
              </div>
              <span className="ml-auto text-slate-300 dark:text-slate-600 text-lg shrink-0">›</span>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
````

## File: src/pages/notifications/NotificationsPage.tsx
````typescript
import AppShell from "../../components/layout/AppShell";
import { useNotifications } from "../../features/notifications/hooks/useNotifications";
import { NotificationList } from "../../features/notifications/components/NotificationList";

import { useQueryClient } from "@tanstack/react-query";
import PullToRefresh from "../../components/ui/PullToRefresh";

export default function NotificationsPage() {
  const queryClient = useQueryClient();

  const { notifications, isLoading, markAsRead, markAllRead } = useNotifications();

  const handleRefresh = () =>
    queryClient.invalidateQueries({ queryKey: ["notifications"] });

  return (
    <AppShell>
      <PullToRefresh onRefresh={handleRefresh}>
        <div className="px-4 pb-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Notifications</h1>
            {notifications.some((n) => !n.read) && (
              <button
                onClick={() => markAllRead()}
                className="text-sm text-blue-600 font-medium"
              >
                Mark all as read
              </button>
            )}
          </div>
          {isLoading ? (
            <div className="space-y-2">
              {[1,2,3].map(i => <div key={i} className="h-20 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />)}
            </div>
          ) : (
            <NotificationList
              notifications={notifications}
              onMarkRead={(id) => markAsRead([id])}
            />
          )}
        </div>
      </PullToRefresh>
    </AppShell>
  );
}
````

## File: src/pages/passwordManagement/ResetPasswordPage.tsx
````typescript
import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function ResetPasswordPage() {
  const [email, setEmail] =
    useState("");

  const [sent, setSent] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const {
        error: resetError,
      } =
        await supabase.auth.resetPasswordForEmail(
          email.trim(),
          {
            redirectTo: `${window.location.origin}/update-password`,
          }
        );

      if (resetError) {
        throw resetError;
      }

      setSent(true);
    } catch (err: any) {
      setError(
        err?.message ??
          "Failed to send reset email."
      );
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-blue-100 via-white to-blue-50 dark:from-slate-950 dark:to-slate-900">
        <div className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl border border-white/20 dark:border-slate-800/50 text-center">
          <div className="text-5xl mb-4">
            📧
          </div>

          <h1 className="text-2xl font-bold mb-2">
            Check your email
          </h1>

          <p className="text-sm opacity-70">
            We've sent a password reset
            link to
          </p>

          <p className="font-semibold mt-2">
            {email}
          </p>

          <Link
            to="/login"
            className="inline-block mt-6 text-blue-600 font-medium hover:underline"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-blue-100 via-white to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <div className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl border border-white/20 dark:border-slate-800/50">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 h-16 w-16 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
            <span className="text-2xl font-black text-white">
              W
            </span>
          </div>

          <h1 className="text-3xl font-bold">
            Reset Password
          </h1>

          <p className="mt-2 text-sm opacity-70">
            Enter your email and we'll
            send you a reset link.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            placeholder="you@example.com"
            required
            className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-950/70 px-4 py-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
          />

          {error && (
            <div className="text-sm text-red-500">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 font-semibold shadow-lg active:scale-[0.98] transition disabled:opacity-50"
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
````

## File: src/pages/passwordManagement/UpdatePasswordPage.tsx
````typescript
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function UpdatePasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password.trim().length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);

      const {
        error: updateError,
      } = await supabase.auth.updateUser({
        password: password.trim(),
      });

      if (updateError) {
        throw updateError;
      }

      setSuccess(
        "Password updated successfully."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err: any) {
      setError(
        err?.message ??
          "Failed to update password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-blue-100 via-white to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <div className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl border border-white/20 dark:border-slate-800/50">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 h-16 w-16 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
            <span className="text-2xl font-black text-white">
              W
            </span>
          </div>

          <h1 className="text-3xl font-bold">
            Update Password
          </h1>

          <p className="mt-2 text-sm opacity-70">
            Enter your new password.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            placeholder="New password"
            required
            minLength={6}
            className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-950/70 px-4 py-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
          />

          {error && (
            <div className="text-sm text-red-500">
              {error}
            </div>
          )}

          {success && (
            <div className="text-sm text-green-600">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 font-semibold shadow-lg active:scale-[0.98] transition disabled:opacity-50"
          >
            {loading
              ? "Updating..."
              : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
````

## File: src/pages/profile/AchievementsPage.tsx
````typescript
import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { supabase } from "../../lib/supabase";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { Trophy } from "lucide-react";

export default function AchievementsPage() {
  const { userId } = useParams<{ userId?: string }>();
  const currentUser = useAuthStore((s) => s.user);
  const targetUserId = userId || currentUser?.id;

  const [karma, setKarma] = useState(0);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    if (!targetUserId) return;

    // fetch total karma from profiles
    supabase
      .from("profiles")
      .select("karma")
      .eq("id", targetUserId)
      .single()
      .then(({ data }) => {
        if (data) setKarma(data.karma);
      });

    // fetch karma events
    supabase
      .from("karma_events")
      .select("*")
      .eq("user_id", targetUserId)
      .order("created_at", { ascending: false })
      .limit(30)
      .then(({ data }) => setEvents(data ?? []));
  }, [targetUserId]);

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-2">Achievements</h1>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center mb-6">
          <Trophy size={40} className="mx-auto text-yellow-500 mb-2" />
          <p className="text-3xl font-black">{karma} ⚡</p>
          <p className="text-sm opacity-60">Total Karma</p>
        </div>
        <h2 className="font-bold mb-3">Karma History</h2>
        <div className="space-y-2">
          {events.map((e) => (
            <div
              key={e.id}
              className="bg-white dark:bg-slate-900 rounded-xl p-3 flex justify-between"
            >
              <div>
                <p className="text-sm font-medium capitalize">{e.reason.replace(/_/g, " ")}</p>
                <p className="text-xs opacity-60">{new Date(e.created_at).toLocaleDateString()}</p>
              </div>
              <span className="font-bold text-sm text-green-600">+{e.amount}</span>
            </div>
          ))}
          {events.length === 0 && <p className="text-sm opacity-60">No karma events yet.</p>}
        </div>
      </div>
    </AppShell>
  );
}
````

## File: src/pages/profile/BlockedUSersPage.tsx
````typescript
import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { getBlockedUsers, unblockUser } from "../../services/blockService";
import { supabase } from "../../lib/supabase";
import { X } from "lucide-react";

export default function BlockedUsersPage() {
  const [blocked, setBlocked] = useState<any[]>([]);

  useEffect(() => {
    getBlockedUsers().then(async (ids) => {
      if (ids.length === 0) return;
      const { data } = await supabase
        .from("profiles")
        .select("id, username, avatar_url")
        .in("id", ids);
      setBlocked(data ?? []);
    });
  }, []);

  const handleUnblock = async (userId: string) => {
    await unblockUser(userId);
    setBlocked((prev) => prev.filter((b) => b.id !== userId));
  };

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-4">Blocked Users</h1>
        {blocked.length === 0 ? (
          <p className="text-center opacity-60 py-10">No blocked users.</p>
        ) : (
          <div className="space-y-2">
            {blocked.map((user) => (
              <div key={user.id} className="flex items-center justify-between bg-white dark:bg-slate-900 rounded-xl p-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                    {user.username?.[0]?.toUpperCase() ?? "?"}
                  </div>
                  <span className="font-medium text-sm">{user.username}</span>
                </div>
                <button
                  onClick={() => handleUnblock(user.id)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
````

## File: src/pages/profile/CampusGroupsPage.tsx
````typescript
import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { getUserMemberships, fetchCommunities } from "../../features/communities/services/communities.service";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { Users } from "lucide-react";

export default function CampusGroupsPage() {
  const { userId } = useParams<{ userId?: string }>();
  const currentUser = useAuthStore((s) => s.user);
  const targetUserId = userId || currentUser?.id;

  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!targetUserId) return;

    getUserMemberships(targetUserId).then(async (ids) => {
      if (ids.size === 0) return setLoading(false);
      const all = await fetchCommunities();
      setGroups(all.filter((c) => ids.has(c.id)));
      setLoading(false);
    });
  }, [targetUserId]);

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-4">Campus Groups</h1>
        {loading ? (
          <p className="opacity-60">Loading...</p>
        ) : groups.length === 0 ? (
          <div className="text-center py-12 opacity-60">
            <Users size={48} className="mx-auto mb-3 opacity-30" />
            <p>No groups joined yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {groups.map((g) => (
              <div key={g.id} className="bg-white dark:bg-slate-900 rounded-xl p-4 flex items-center gap-3">
                <div className="text-2xl">{g.icon}</div>
                <div>
                  <p className="font-semibold">{g.name}</p>
                  <p className="text-xs opacity-60">{g.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
````

## File: src/pages/profile/EditProfile.tsx
````typescript
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
````

## File: src/pages/profile/MyDiscussionsPage.tsx
````typescript
import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { fetchRecentActivity } from "../../features/profile/services/profile.service";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { MessageSquare } from "lucide-react";

export default function MyDiscussionsPage() {
  const { userId } = useParams<{ userId?: string }>();
  const currentUser = useAuthStore((s) => s.user);
  const targetUserId = userId || currentUser?.id;

  const [activities, setActivities] = useState<{ posts: any[]; comments: any[] }>({ posts: [], comments: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!targetUserId) return;
    fetchRecentActivity(targetUserId).then(setActivities).finally(() => setLoading(false));
  }, [targetUserId]);

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-4">Discussions</h1>
        {loading ? (
          <p className="opacity-60">Loading...</p>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="font-semibold mb-2 flex items-center gap-2">
                <MessageSquare size={16} /> Posts
              </h2>
              {activities.posts.map((p) => (
                <div key={p.id} className="bg-white dark:bg-slate-900 rounded-xl p-3 mb-2">
                  <p className="text-sm">{p.content}</p>
                  <p className="text-xs opacity-60 mt-1">{new Date(p.created_at).toLocaleDateString()}</p>
                </div>
              ))}
              {activities.posts.length === 0 && <p className="text-sm opacity-60">No posts.</p>}
            </div>
            <div>
              <h2 className="font-semibold mb-2 flex items-center gap-2">
                <MessageSquare size={16} /> Comments
              </h2>
              {activities.comments.map((c) => (
                <div key={c.id} className="bg-white dark:bg-slate-900 rounded-xl p-3 mb-2">
                  <p className="text-sm">{c.content}</p>
                  <p className="text-xs opacity-60 mt-1">{new Date(c.created_at).toLocaleDateString()}</p>
                </div>
              ))}
              {activities.comments.length === 0 && <p className="text-sm opacity-60">No comments.</p>}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
````

## File: src/pages/profile/PrivacySecurityPage.tsx
````typescript
import AppShell from "../../components/layout/AppShell";
import { ShieldCheck } from "lucide-react";

export default function PrivacySecurityPage() {
  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-4">Privacy & Security</h1>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 text-center">
          <ShieldCheck size={40} className="mx-auto text-green-500 mb-3" />
          <p className="font-semibold">Your account is secure</p>
          <p className="text-sm opacity-70 mt-1">
            We use Supabase Auth with Row Level Security. Only you and authorised admins can see your data.
            You can delete your account by contacting support.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
````

## File: src/pages/profile/ProfilePage.tsx
````typescript
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { useAuthStore } from "../../store/authStore";
import { useProfileData } from "../../features/profile/hooks/useProfileData";
import { useBlockUser } from "../../features/profile/hooks/useBlockUser";
import { ProfileHeader } from "../../features/profile/components/ProfileHeader";
import { ProfileInfo } from "../../features/profile/components/ProfileInfo";
import { ProfileStats } from "../../features/profile/components/ProfileStats";
import { ProfileActions } from "../../features/profile/components/ProfileActions";
import { RecentActivity } from "../../features/profile/components/RecentActivity";
import DirectMessageDrawer from "../../components/community/DirectMessageDrawer";
import PostCardSkeleton from "../../features/posts/components/PostCardSkeleton";
import PullToRefresh from "../../components/ui/PullToRefresh";

export default function ProfilePage() {
  const { userId } = useParams<{ userId?: string }>();
  const currentUser = useAuthStore((s) => s.user);
  const targetUserId = userId || currentUser?.id;
  const isOwn = !userId || userId === currentUser?.id;

  const { profile, isLoading, error, stats, activities, refetch } = useProfileData(targetUserId);
  const handleRefresh = async () => {
    await Promise.resolve(refetch());
  };
  const { blocked, toggleBlock } = useBlockUser(isOwn ? undefined : targetUserId);

  const [dmOpen, setDmOpen] = useState(false);
  const [dmReceiver, setDmReceiver] = useState<{ id: string; name: string } | null>(null);

  // When profile loads, set DM receiver for the "Message" button
  useEffect(() => {
    if (profile && !isOwn) {
      setDmReceiver({ id: profile.id, name: profile.username ?? "User" });
    }
  }, [profile, isOwn]);

  const handleMessage = () => {
    setDmOpen(true);
  };

  if (isLoading) return (
    <AppShell>
      <div className="p-4 space-y-4">
        {[...Array(3)].map((_, i) => <PostCardSkeleton key={i} />)}
      </div>
    </AppShell>
  );
  if (error) return <AppShell><div className="p-4 text-red-500">Error loading profile</div></AppShell>;
  if (!profile) return <AppShell><div className="p-4">Profile not found.</div></AppShell>;

  return (
    <AppShell>
      <PullToRefresh onRefresh={handleRefresh}>
        <div className="px-4 pb-8 space-y-6">
          <ProfileHeader
            avatarUrl={profile.avatar_url}
            username={profile.username ?? "?"}
            karma={profile.karma}
          />
          <ProfileInfo
            profile={profile}
            isOwn={isOwn}
            blocked={blocked}
            onMessage={handleMessage}
            onToggleBlock={toggleBlock}
          />
          <ProfileStats stats={stats} />
          <ProfileActions isOwn={isOwn} userId={targetUserId} />
          <RecentActivity activities={activities} userId={targetUserId} />

          {dmReceiver && (
            <DirectMessageDrawer
              open={dmOpen}
              onClose={() => setDmOpen(false)}
              receiverId={dmReceiver.id}
              receiverName={dmReceiver.name}
            />
          )}
        </div>
      </PullToRefresh>
    </AppShell>
  );
}
````

## File: src/pages/profile/SavedPostsPage.tsx
````typescript
import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { useAuthStore } from "../../store/authStore";
import { getSavedPosts } from "../../services/savedPostsService";
import { usePostVote } from "../../features/posts/hooks/usePostVote";
import PostCard from "../../features/posts/components/PostCard";
import { Bookmark } from "lucide-react";

export default function SavedPostsPage() {
  const user = useAuthStore((s) => s.user);
  const { mutate: vote } = usePostVote();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getSavedPosts(user.id)
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const handleUnsave = (postId: string) => {
    setPosts((prev) => prev.filter((item) => item.posts.id !== postId));
  };

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-2">Saved Posts</h1>
        <p className="text-sm opacity-70 mb-6">Your bookmarked posts</p>

        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="text-center py-12">
            <Bookmark size={48} className="mx-auto opacity-30 mb-3" />
            <p className="opacity-60">No saved posts yet</p>
            <p className="text-sm opacity-50 mt-1">Bookmark posts to save them for later</p>
          </div>
        )}

        <div className="space-y-4">
          {posts.map((item) => (
            <PostCard
              key={item.posts.id}
              post={{
                ...item.posts,
                comments_count: 0,
              }}
              userVote={null}
              onVote={(postId, type) => vote({ postId, type })}
              onDelete={() => handleUnsave(item.posts.id)}
            />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
````

## File: src/pages/profile/SettingsPage.tsx
````typescript
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import {
  User,
  Moon,
  Bell,
  Lock,
  Shield,
  LogOut,
  ChevronRight,
  Download,
  CheckCircle,
} from "lucide-react";
import { AccessibilityPanel } from "../../features/profile/components/AccessibilityPanel";
import { useThemeStore } from "../../store/themeStore";
import { useAuthStore } from "../../store/authStore";
import { usePushNotifications } from "../../hooks/usePushNotifications";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();
  const { subscribed, requestPermission, unsubscribe } = usePushNotifications();
  const logout = useAuthStore((s) => s.logout);
  const darkMode = theme === "dark";

  // PWA install state
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already running in standalone mode
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }
    // Get deferred prompt if already stored
    if ((window as any).deferredPrompt) {
      setDeferredPrompt((window as any).deferredPrompt);
    }
    // Listen for future prompts
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      (window as any).deferredPrompt = e;
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      // Fallback for iOS or unsupported browsers
      alert(
        "To install this app on your iPhone, tap the Share button and then 'Add to Home Screen'."
      );
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setIsInstalled(true);
    }
  };

  const items = [
    {
      icon: isInstalled ? (
        <CheckCircle size={20} className="text-green-500" />
      ) : (
        <Download size={20} className="text-blue-500" />
      ),
      label: isInstalled ? "App Installed" : "Install App",
      onClick: handleInstall,
      disabled: isInstalled,
    },
    {
      icon: <User size={20} />,
      label: "Edit Profile",
      onClick: () => navigate("/profile/edit"),
    },
    {
      icon: <Moon size={20} />,
      label: darkMode ? "Dark Mode ON" : "Dark Mode OFF",
      onClick: toggleTheme,
    },
    {
      icon: <Bell size={20} />,
      label: subscribed ? "Notifications ON" : "Enable Notifications",
      onClick: subscribed ? unsubscribe : requestPermission,
    },
    {
      icon: <Lock size={20} />,
      label: "Privacy & Security",
      onClick: () => navigate("/profile/privacy"),
    },
    {
      icon: <Shield size={20} />,
      label: "Blocked Users",
      onClick: () => navigate("/profile/blocked"),
    },
    {
      icon: <LogOut size={20} />,
      label: "Logout",
      onClick: () => {
        logout();
        navigate("/login");
      },
      danger: true,
    },
  ];

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm">
          {items.map(({ icon, label, onClick, danger, disabled }) => (
            <button
              key={label}
              onClick={onClick}
              disabled={disabled}
              className={`w-full flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800 ${
                danger ? "text-red-500" : ""
              } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="flex items-center gap-3">
                {icon}
                <span>{label}</span>
              </div>
              {!disabled && <ChevronRight size={18} />}
            </button>
          ))}
        </div>
        <div className="mt-6">
          <AccessibilityPanel />
        </div>
      </div>
    </AppShell>
  );
}
````

## File: src/pages/QandA/AskSeniorPage.tsx
````typescript
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { fetchQuestions, askQuestion } from "../../services/questionService";
import type { Question } from "../../services/questionService";
import { Plus, MessageCircle } from "lucide-react";

export default function AskSeniorPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAsk, setShowAsk] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    fetchQuestions().then((q) => { setQuestions(q); setLoading(false); });
  }, []);

  const handleAsk = async () => {
    if (!title.trim()) return;
    await askQuestion(title, body);
    setShowAsk(false);
    setTitle("");
    setBody("");
    const updated = await fetchQuestions();
    setQuestions(updated);
  };

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black">Ask a Senior</h1>
            <p className="text-xs text-slate-500 mt-0.5">Get advice from experienced students</p>
          </div>
          <button onClick={() => setShowAsk(true)} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5">
            <Plus size={16} /> Ask
          </button>
        </div>

        {showAsk && (
          <div className="mb-6 p-4 bg-white dark:bg-slate-900 rounded-2xl border">
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Question title..." className="w-full p-2 rounded-xl border mb-2" />
            <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="More details (optional)..." rows={3} className="w-full p-2 rounded-xl border mb-3 resize-none" />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowAsk(false)} className="px-4 py-2 rounded-xl border">Cancel</button>
              <button onClick={handleAsk} className="px-4 py-2 bg-blue-600 text-white rounded-xl">Post Question</button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-24 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />)}</div>
        ) : questions.length === 0 ? (
          <div className="text-center py-12 opacity-60">No questions yet. Be the first to ask!</div>
        ) : (
          <div className="space-y-3">
            {questions.map((q) => (
              <button key={q.id} onClick={() => navigate(`/ask-senior/${q.id}`)} className="w-full text-left bg-white dark:bg-slate-900 rounded-2xl p-4 border">
                <h3 className="font-semibold">{q.title}</h3>
                {q.body && <p className="text-sm text-slate-500 mt-1 line-clamp-2">{q.body}</p>}
                <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
                  <span>{q.author?.username ?? "Anonymous"}</span>
                  <span className="flex items-center gap-1"><MessageCircle size={12} />{q.answers_count ?? 0}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
````

## File: src/pages/QandA/QuestionDetailPage.tsx
````typescript
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { fetchAnswers, submitAnswer, voteAnswer, acceptAnswer } from "../../services/questionService";
import { useAuthStore } from "../../store/authStore";
import type { Answer } from "../../services/questionService";
import { ArrowBigUp, ArrowBigDown, Check, Send } from "lucide-react";

export default function QuestionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const user = useAuthStore((s) => s.user);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchAnswers(id, user?.id).then((a) => { setAnswers(a); setLoading(false); });
  }, [id, user?.id]);

  const handleSubmit = async () => {
    if (!content.trim() || !id) return;
    await submitAnswer(id, content);
    setContent("");
    const updated = await fetchAnswers(id, user?.id);
    setAnswers(updated);
  };

  const handleVote = async (answerId: string, type: "up" | "down") => {
    await voteAnswer(answerId, type);
    const updated = await fetchAnswers(id!, user?.id);
    setAnswers(updated);
  };

  const handleAccept = async (answerId: string) => {
    if (!id) return;
    await acceptAnswer(answerId, id);
    const updated = await fetchAnswers(id, user?.id);
    setAnswers(updated);
  };

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-6">Answers</h1>

        {loading ? (
          <div className="space-y-3">{[1,2].map(i => <div key={i} className="h-20 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />)}</div>
        ) : answers.length === 0 ? (
          <div className="text-center py-12 opacity-60">No answers yet. Be the first to answer!</div>
        ) : (
          <div className="space-y-4">
            {answers.map((answer) => (
              <div key={answer.id} className={`bg-white dark:bg-slate-900 rounded-2xl p-4 border ${answer.is_accepted ? "border-green-500" : ""}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-sm">{answer.author?.username ?? "Anonymous"}</span>
                  {answer.author?.is_senior && <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-600 px-2 py-0.5 rounded-full">Senior</span>}
                  {answer.is_accepted && <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 px-2 py-0.5 rounded-full">Accepted</span>}
                </div>
                <p className="text-sm">{answer.content}</p>
                <div className="flex items-center gap-4 mt-3">
                  <button onClick={() => handleVote(answer.id, "up")} className={`flex items-center gap-1 text-xs ${answer.userVote === "up" ? "text-emerald-500" : ""}`}>
                    <ArrowBigUp size={16} /> {answer.upvotes}
                  </button>
                  <button onClick={() => handleVote(answer.id, "down")} className={`flex items-center gap-1 text-xs ${answer.userVote === "down" ? "text-red-500" : ""}`}>
                    <ArrowBigDown size={16} /> {answer.downvotes}
                  </button>
                  {!answer.is_accepted && (
                    <button onClick={() => handleAccept(answer.id)} className="text-xs text-green-500 flex items-center gap-1">
                      <Check size={14} /> Accept
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex gap-2">
          <input value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your answer..." className="flex-1 p-3 rounded-xl border" />
          <button onClick={handleSubmit} disabled={!content.trim()} className="bg-blue-600 text-white px-4 py-2 rounded-xl"><Send size={16} /></button>
        </div>
      </div>
    </AppShell>
  );
}
````

## File: src/pages/rooms/LiveRoomsPage.tsx
````typescript
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { fetchActiveRooms, fetchRoomMessages, sendRoomMessage, subscribeToRoomMessages, type LiveRoomMessage } from "../../services/liveRoomService";
import { useAuthStore } from "../../store/authStore";
import { Send, Clock, Loader2 } from "lucide-react";

export function LiveRoomsList() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    fetchActiveRooms().then(setRooms);
  }, []);

  return (
    <AppShell>
      <div className="px-4 pb-8">
        <h1 className="text-2xl font-bold mb-6">Live Rooms</h1>
        {rooms.length === 0 ? (
          <div className="text-center py-12 opacity-60">No active live rooms right now.</div>
        ) : (
          <div className="space-y-3">
            {rooms.map((room) => (
              <button key={room.id} onClick={() => navigate(`/live/${room.id}`)} className="w-full text-left bg-white dark:bg-slate-900 rounded-2xl p-4 border">
                <h3 className="font-semibold">{room.topic}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  <Clock size={12} className="inline mr-1" />
                  Expires {new Date(room.expires_at).toLocaleTimeString()}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}

export function LiveRoomChat() {
  const { id } = useParams<{ id: string }>();
  const user = useAuthStore((s) => s.user);
  const [messages, setMessages] = useState<LiveRoomMessage[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<any>(null);

  useEffect(() => {
    if (!id) return;
    fetchRoomMessages(id).then((m) => { setMessages(m); setLoading(false); });
    channelRef.current = subscribeToRoomMessages(id, (msg) => setMessages((prev) => [...prev, msg]));
    return () => { channelRef.current?.unsubscribe(); };
  }, [id]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = async () => {
    if (!content.trim() || !id) return;
    await sendRoomMessage(id, content);
    setContent("");
  };

  return (
    <AppShell>
      <div className="flex flex-col h-full" style={{ minHeight: "100dvh" }}>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {loading ? <Loader2 className="animate-spin mx-auto" /> : messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.user_id === user?.id ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.user_id === user?.id ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800"}`}>
                <p className="text-xs font-semibold mb-1">{msg.profiles?.username ?? "Anonymous"}</p>
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-3 border-t flex gap-2">
          <input value={content} onChange={(e) => setContent(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="Type..." className="flex-1 p-2 rounded-xl border" />
          <button onClick={handleSend} className="bg-blue-600 text-white p-2 rounded-full"><Send size={16} /></button>
        </div>
      </div>
    </AppShell>
  );
}
````

## File: src/pages/search/SearchPage.tsx
````typescript
import { useEffect, useState } from "react";
import AppShell from "../../components/layout/AppShell";
import { Search } from "lucide-react";
import {
  searchPosts,
  searchUsers,
} from "../../services/searchService";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const [posts, setPosts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query.trim()) {
        setPosts([]);
        setUsers([]);
        return;
      }

      const [postResults, userResults] =
        await Promise.all([
          searchPosts(query),
          searchUsers(query),
        ]);

      setPosts(postResults);
      setUsers(userResults);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <AppShell>
      <div className="p-4">

        <div className="relative mb-6">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2"
          />

          <input
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            placeholder="Search posts or users..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border"
          />
        </div>

        {users.length > 0 && (
          <>
            <h2 className="font-bold mb-3">
              Users
            </h2>

            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-4 mb-2"
              >
                <p className="font-semibold">
                  {user.username}
                </p>

                <p className="text-sm opacity-70">
                  {user.role}
                </p>
              </div>
            ))}
          </>
        )}

        {posts.length > 0 && (
          <>
            <h2 className="font-bold mt-6 mb-3">
              Posts
            </h2>

            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-4 mb-2"
              >
                <p>{post.content}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </AppShell>
  );
}
````

## File: src/pages/study/StudyPage.tsx
````typescript
import { useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Calendar, TrendingUp, Clock, Package } from "lucide-react";
import AppShell from "../../components/layout/AppShell";
import { useStudyStore } from "../../features/study/store/study.store";
import {
  useStudyMaterials,
  useTrendingMaterials,
} from "../../features/study/hooks/useStudyMaterials";
import { useStudyActions } from "../../features/study/hooks/useStudyActions";
import { useContinueLearning } from "../../features/study/hooks/useContinueLearning";
import { useStarterPacks } from "../../features/study/hooks/useStarterPacks";
import { useRelatedMaterials } from "../../features/study/hooks/useRelatedMaterials";
import { usePersonalizedFeed } from "../../features/study/hooks/usePersonalizedFeed";
import { StudyGrid } from "../../features/study/components/StudyGrid";
import { MaterialDrawer } from "../../features/study/components/MaterialDrawer";
import { GradeEstimator } from "../../features/study/components/GradeEstimator";
import PostCardSkeleton from "../../features/posts/components/PostCardSkeleton";
import { EmptyState } from "../../components/common/EmptyState";

import {
  SearchBar,
  ChipScroll,
  Chip,
  SectionLabel,
} from "../../features/study/components/FilterChips";
import {
  TYPE_META,
  SUBJECT_COLORS,
  MATERIAL_TYPES,
  YEAR_GROUPS,
} from "../../features/study/constants";
import { recordMaterialView } from "../../features/study/services/study.service";
import { useAuthStore } from "../../store/authStore";
import { useMaterialRequests } from "../../features/study/hooks/useMaterialRequests";
import { useLeaderboard } from "../../features/study/hooks/useLeaderboard";
import { RequestForm } from "../../features/study/components/RequestForm";
import type { StudyMaterial } from "../../features/study/services/study.service";
import { StudyGroupsSection } from "../../features/study/components/StudyGroupsSections";

export default function StudyPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  // Study store (all values at once)
  const {
    search,
    setSearch,
    yearFilter,
    setYearFilter,
    typeFilter,
    setTypeFilter,
    programmeFilter,
    setProgrammeFilter,
  } = useStudyStore();

  // Data hooks
  const { materials, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useStudyMaterials();
  const { data: trendingPages } = useTrendingMaterials();
  const trending = trendingPages?.pages.flatMap((p) => p.data) ?? [];
  const { data: continueLearning } = useContinueLearning();
  const { packs, packMaterials } = useStarterPacks();
  const { toggleSave } = useStudyActions();
  const { personalizedMaterials } = usePersonalizedFeed();
  const { requests, createRequest } = useMaterialRequests();
  const { data: leaderboard } = useLeaderboard();

  const [selected, setSelected] = useState<StudyMaterial | null>(null);
  const { data: related = [] } = useRelatedMaterials(selected);
  const [showExamBank, setShowExamBank] = useState(false);

  const subjectColorMap = Object.fromEntries(
    trending.concat(materials).map((m) => [m.subject, SUBJECT_COLORS[0]])
  );

  const programmeOptions = useMemo(() => {
    const programmes = new Set<string>();
    materials.forEach((m) => {
      const programme = (m as any).programme as string | null | undefined;
      if (programme) programmes.add(programme);
    });
    return ["All", ...Array.from(programmes).sort()];
  }, [materials]);

  const handleToggleSave = (materialId: string, saved: boolean) =>
    toggleSave({ materialId, saved });

  const handleOpen = (material: StudyMaterial) => {
    setSelected(material);
    if (user) recordMaterialView(user.id, material.id);
  };

  // Infinite scroll observer
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();
      if (!node || !hasNextPage || isFetchingNextPage) return;
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      });
      observerRef.current.observe(node);
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  return (
    <AppShell>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shrink-0">
                <BookOpen size={15} className="text-white" />
              </div>
              <h1 className="text-2xl font-black tracking-tight">Study</h1>
            </div>
            <p className="text-xs text-slate-400 mt-1 ml-10">
              Lecturer materials & resources
            </p>
          </div>
          <button
            onClick={() => navigate("/events")}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
          >
            <Calendar size={12} /> Events
          </button>
        </div>

        {/* Search */}
        <SearchBar
          value={search}
          onChange={setSearch}
          onClear={() => setSearch("")}
        />

        {/* Exam Question Bank toggle */}
        <button
          onClick={() => setShowExamBank(!showExamBank)}
          className="flex items-center gap-2 text-sm font-semibold bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 px-4 py-2 rounded-full mb-4"
        >
          📝 Exam Question Bank
        </button>
        {showExamBank && (
          <StudyGrid
            materials={materials.filter((m) => m.material_type === "past_paper")}
            savedIds={new Set()}
            subjectColorMap={{}}
            onToggleSave={handleToggleSave}
            onOpen={handleOpen}
          />
        )}

        {/* Personalized feed */}
        {personalizedMaterials.length > 0 && (
          <>
            <h2 className="text-lg font-bold mt-4 mb-2">✨ For You</h2>
            <StudyGrid
              materials={personalizedMaterials}
              savedIds={new Set()}
              subjectColorMap={subjectColorMap}
              onToggleSave={handleToggleSave}
              onOpen={handleOpen}
            />
          </>
        )}

        {/* Grade Estimator */}
        <GradeEstimator />

        {/* Material Requests */}
        <div className="mb-6">
          <RequestForm onSubmit={createRequest} />
          {requests.length > 0 && (
            <div className="mt-3 space-y-2">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="p-2 bg-white dark:bg-slate-900 rounded-xl border text-sm"
                >
                  <span className="font-medium">{req.title}</span> –{" "}
                  <span className="text-slate-500">
                    {req.profiles?.username}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Leaderboard */}
        {leaderboard && leaderboard.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">🏆 Top Contributors</h2>
            <div className="flex gap-2 overflow-x-auto">
              {leaderboard.slice(0, 10).map((u) => (
                <div key={u.id} className="text-center shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold mx-auto">
                    {u.avatar_url ? (
                      <img
                        src={u.avatar_url}
                        alt={u.username ?? ""}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      u.username?.[0]?.toUpperCase()
                    )}
                  </div>
                  <p className="text-xs mt-1">{u.username}</p>
                  <p className="text-[10px] text-slate-500">{u.karma} pts</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <ChipScroll>
          {MATERIAL_TYPES.map(({ value, label, icon }) => {
            const active = value === typeFilter;
            const meta = TYPE_META[value];
            return (
              <Chip
                key={value}
                active={active}
                accent={active && meta ? meta.color : undefined}
                onClick={() => setTypeFilter(value)}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </Chip>
            );
          })}
        </ChipScroll>

        <SectionLabel>Year Group</SectionLabel>
        <ChipScroll>
          {YEAR_GROUPS.map((y) => (
            <Chip
              key={y}
              active={y === yearFilter}
              onClick={() => setYearFilter(y)}
            >
              {y}
            </Chip>
          ))}
        </ChipScroll>

        {/* Programme filter */}
        {programmeOptions.length > 1 && (
          <>
            <SectionLabel>Programme</SectionLabel>
            <ChipScroll>
              {programmeOptions.map((p) => (
                <Chip
                  key={p}
                  active={p === programmeFilter}
                  onClick={() => setProgrammeFilter(p)}
                >
                  {p}
                </Chip>
              ))}
            </ChipScroll>
          </>
        )}

        {/* Continue Learning */}
        {continueLearning && continueLearning.length > 0 && (
          <>
            <h2 className="text-lg font-bold mt-6 mb-2 flex items-center gap-1">
              <Clock size={18} /> Continue Learning
            </h2>
            <StudyGrid
              materials={continueLearning.slice(0, 5)}
              savedIds={new Set()}
              subjectColorMap={subjectColorMap}
              onToggleSave={handleToggleSave}
              onOpen={handleOpen}
            />
          </>
        )}

        {/* Starter Packs */}
        {packs.length > 0 && (
          <>
            <h2 className="text-lg font-bold mt-6 mb-2 flex items-center gap-1">
              <Package size={18} /> Starter Packs
            </h2>
            {packs.map((pack, index) => (
              <div key={pack.id} className="mb-4">
                <h3 className="font-semibold text-sm mb-2">{pack.name}</h3>
                <StudyGrid
                  materials={packMaterials[index] ?? []}
                  savedIds={new Set()}
                  subjectColorMap={subjectColorMap}
                  onToggleSave={handleToggleSave}
                  onOpen={handleOpen}
                />
              </div>
            ))}
          </>
        )}

        {/* Trending */}
        {trending.length > 0 && (
          <>
            <h2 className="text-lg font-bold mt-6 mb-2 flex items-center gap-1">
              <TrendingUp size={18} /> Trending This Week
            </h2>
            <StudyGrid
              materials={trending.slice(0, 5)}
              savedIds={new Set()}
              subjectColorMap={subjectColorMap}
              onToggleSave={handleToggleSave}
              onOpen={handleOpen}
            />
          </>
        )}

        <StudyGroupsSection />

        {/* All Materials */}
        <h2 className="text-lg font-bold mt-6 mb-2">All Materials</h2>
        {isLoading ? (
          <div className="flex flex-col gap-2.5">
            {[...Array(4)].map((_, i) => <PostCardSkeleton key={i} />)}
          </div>
        ) : (
          <StudyGrid
            materials={materials}
            savedIds={new Set()}
            subjectColorMap={subjectColorMap}
            onToggleSave={handleToggleSave}
            onOpen={handleOpen}
          />
        )}
        {materials.length === 0 && !isLoading && (
          <EmptyState icon="📚" title="No materials found" description="Try adjusting your filters." />
        )}

        {hasNextPage && <div ref={loadMoreRef} className="h-10" />}
        {isFetchingNextPage && (
          <p className="text-center text-sm">Loading more...</p>
        )}

        {/* Drawer */}
        {selected && (
          <MaterialDrawer
            material={selected}
            saved={false}
            subjectColor={subjectColorMap[selected.subject] ?? "#6366F1"}
            meta={TYPE_META[selected.material_type] ?? TYPE_META.resource}
            onToggleSave={handleToggleSave}
            onOpen={handleOpen}
            onClose={() => setSelected(null)}
            relatedMaterials={related}

          />
        )}
      </div>
      
      <a
  href="mailto:chilengawarren307@gmail.com?subject=Support%20for%20Warren"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-1 text-xs text-pink-600 dark:text-pink-400 hover:underline px-4 pb-4"
>
  ☕ Buy me a coffee
</a>
    </AppShell>
  );
}
````

## File: src/pages/study/SubjectPage.tsx
````typescript
import { useParams } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { useStudyMaterials } from "../../features/study/hooks/useStudyMaterials";
import { StudyGrid } from "../../features/study/components/StudyGrid";
import { useStudyActions } from "../../features/study/hooks/useStudyActions";
import PostCardSkeleton from "../../features/posts/components/PostCardSkeleton";

import { useStudyStore } from "../../features/study/store/study.store";

import { useEffect, useMemo } from "react";
import { SUBJECT_COLORS } from "../../features/study/constants";


export default function SubjectPage() {
  const { subject } = useParams<{ subject: string }>();
  const setSubjectFilter = useStudyStore((s) => s.setSubjectFilter);
  const { materials, isLoading } = useStudyMaterials(); // will use the store's subject filter
  const { toggleSave } = useStudyActions();

  const subjectColorMap = useMemo(
    () => Object.fromEntries(materials.map((m) => [m.subject, SUBJECT_COLORS[0]])),
    [materials]
  );

  useEffect(() => {
    if (subject) setSubjectFilter(subject);
    return () => setSubjectFilter("All");
  }, [subject, setSubjectFilter]);

  return (
    <AppShell>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{subject}</h1>
        {isLoading ? (
          <div className="flex flex-col gap-2.5">
            {[...Array(3)].map((_, i) => <PostCardSkeleton key={i} />)}
          </div>
        ) : (
          <StudyGrid
            materials={materials}
            savedIds={new Set()}
            subjectColorMap={subjectColorMap}
            onToggleSave={(id, saved) => toggleSave({ materialId: id, saved })}

            onOpen={() => {}}
          />
        )}
      </div>
    </AppShell>
  );
}
````

## File: src/passwordManagement/ResetPasswordPage.tsx
````typescript
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo:
            window.location.origin +
            "/update-password",
        }
      );

    setLoading(false);

    if (!error) {
      setSent(true);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleReset}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6"
      >
        <h1 className="text-2xl font-bold mb-4">
          Reset Password
        </h1>

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Email"
          required
          className="w-full border rounded-xl p-3"
        />

        <button
          disabled={loading}
          className="w-full mt-4 bg-blue-600 text-white rounded-xl py-3"
        >
          {loading
            ? "Sending..."
            : "Send Reset Link"}
        </button>

        {sent && (
          <p className="mt-3 text-green-600">
            Check your email.
          </p>
        )}
      </form>
    </div>
  );
}
````

## File: src/passwordManagement/UpdatePasswordPage.tsx
````typescript
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function UpdatePasswordPage() {
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase.auth.updateUser({
        password,
      });

    setLoading(false);

    if (!error) {
      navigate("/login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6"
      >
        <h1 className="text-2xl font-bold mb-4">
          New Password
        </h1>

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          required
          placeholder="New password"
          className="w-full border rounded-xl p-3"
        />

        <button
          disabled={loading}
          className="w-full mt-4 bg-blue-600 text-white rounded-xl py-3"
        >
          {loading
            ? "Updating..."
            : "Update Password"}
        </button>
      </form>
    </div>
  );
}
````

## File: src/routes/AppRouter.tsx
````typescript
import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { PageLoader } from "../components/common/PageLoader";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import { useAuthStore } from "../store/authStore";

// Static/legal pages (eager loaded because they're tiny)
import AboutPage from "../pages/legal/AboutPage";
import ContactPage from "../pages/legal/ContactPage";
import PrivacyPage from "../pages/legal/PrivacyPage";
import TermsPage from "../pages/legal/TermsPage";

// Auth pages (eager loaded)
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ResetPasswordPage from "../passwordManagement/ResetPasswordPage";
import UpdatePasswordPage from "../passwordManagement/UpdatePasswordPage";

// Lazy loaded main pages
const ManageMaterialRequests = lazy(() => import("../pages/admin/ManageMaterialRequests"));
const SubjectPage = lazy(() => import("../pages/study/SubjectPage"));
const HomePage = lazy(() => import("../pages/home/HomePage"));
const SearchPage = lazy(() => import("../pages/search/SearchPage"));
const AnnouncementsPage = lazy(() => import("../pages/announcements/AnnouncementsPage"));
const CommunityPage = lazy(() => import("../pages/community/CommunityPage"));
const CommunityChatPage = lazy(() => import("../pages/community/CommunityChatPage"));
const JoinCommunity = lazy(() => import("../pages/community/JoinCommunity"));

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
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/update-password" element={<UpdatePasswordPage />} />

      {/* Main */}
      <Route path="/study/subject/:subject" element={<Protected><Suspense fallback={<PageLoader />}><SubjectPage /></Suspense></Protected>} />
      <Route path="/" element={<Protected><Suspense fallback={<PageLoader />}><HomePage /></Suspense></Protected>} />
      <Route path="/search" element={<Protected><Suspense fallback={<PageLoader />}><SearchPage /></Suspense></Protected>} />
      <Route path="/announcements" element={<Protected><Suspense fallback={<PageLoader />}><AnnouncementsPage /></Suspense></Protected>} />
      <Route path="/community" element={<Protected><Suspense fallback={<PageLoader />}><CommunityPage /></Suspense></Protected>} />
      <Route path="/community/:id/chat" element={<Protected><Suspense fallback={<PageLoader />}><CommunityChatPage /></Suspense></Protected>} />
      <Route path="/community/:id/room" element={<Protected><Suspense fallback={<PageLoader />}><StudyRoom /></Suspense></Protected>} />

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

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
````

## File: src/routes/ProtectedRoute.tsx
````typescript
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  // IMPORTANT: block rendering until auth is known
  if (loading || loading === undefined) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // Only redirect AFTER auth is confirmed resolved
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <>{children}</>;
}
````

## File: src/routes/RoleRoute.tsx
````typescript
import { Navigate } from "react-router-dom";
import { useUserRole } from "../hooks/useUserRole";

interface Props {
  allowedRoles: string[];
  children: React.ReactNode;
}

export default function RoleRoute({
  allowedRoles,
  children,
}: Props) {
  const { role, loading } =
    useUserRole();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!role) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Admin inherits moderator permissions
  const hasAccess = allowedRoles.includes(role) || (role === "admin" && allowedRoles.includes("moderator"));

  if (!hasAccess) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return <>{children}</>;
}
````

## File: src/services/announcementService.ts
````typescript
import { supabase } from "../lib/supabase";
import type { Database } from "../types/database.types";

export type Announcement =
  Database["public"]["Tables"]["announcements"]["Row"];

export async function fetchAnnouncements() {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data ?? [];
}

export async function createAnnouncement(
  title: string,
  content: string,
  imageUrl?: string | null,
  documentUrl?: string | null,
  category = "general"
) {
  const { error } = await supabase
    .from("announcements")
    .insert({
      title,
      content,
      image_url: imageUrl,
      document_url: documentUrl,
      category,
    });

  if (error) throw error;
}

export async function deleteAnnouncement(
  id: string
) {
  const { error } = await supabase
    .from("announcements")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
````

## File: src/services/blockService.ts
````typescript
import { supabase } from "../lib/supabase";

export async function blockUser(blockedId: string): Promise<void> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("blocked_users")
    .insert({ blocker_id: user.id, blocked_id: blockedId });
  if (error && error.code !== "23505") throw error; // ignore duplicate
}

export async function unblockUser(blockedId: string): Promise<void> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("blocked_users")
    .delete()
    .eq("blocker_id", user.id)
    .eq("blocked_id", blockedId);
  if (error) throw error;
}

export async function isBlocked(blockedId: string): Promise<boolean> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return false;

  const { data } = await supabase
    .from("blocked_users")
    .select("id")
    .eq("blocker_id", user.id)
    .eq("blocked_id", blockedId)
    .maybeSingle();
  return !!data;
}

export async function getBlockedUsers(): Promise<string[]> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return [];

  const { data } = await supabase
    .from("blocked_users")
    .select("blocked_id")
    .eq("blocker_id", user.id);
  return (data ?? []).map((b) => b.blocked_id);
}
````

## File: src/services/commentImageService.ts
````typescript
import { supabase } from "../lib/supabase";

export async function uploadCommentImage(
  file: File,
  userId: string
) {
  const ext =
    file.name.split(".").pop();

  const path =
    `${userId}/${crypto.randomUUID()}.${ext}`;

  const { error } =
    await supabase.storage
      .from("comment-images")
      .upload(path, file);

  if (error) throw error;

  const { data } =
    supabase.storage
      .from("comment-images")
      .getPublicUrl(path);

  return data.publicUrl;
}

// Lightweight passthrough image compressor (no-op) used by UploadMaterialPage.
export async function compressImage(file: File): Promise<File> {
  return file;
}
````

## File: src/services/communityChatService.ts
````typescript
import { supabase } from "../lib/supabase";
import type { Database } from "../types/database.types";

type CommunityMessage = Database["public"]["Tables"]["community_messages"]["Row"];
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export type CommunityMessageWithProfile = CommunityMessage & {
  profiles: Pick<Profile, "username" | "avatar_url"> | null;
};

// Fetch messages with profile info
export async function fetchMessages(
  communityId: string,
  limit = 50
): Promise<CommunityMessageWithProfile[]> {
  const { data, error } = await supabase
    .from("community_messages")
    .select("*, profiles:user_id (username, avatar_url)")
    .eq("community_id", communityId)
    .order("created_at", { ascending: true })
    .limit(limit);
  if (error) throw error;

  return (data ?? []).map((msg: any) => ({
    ...msg,
    profiles: Array.isArray(msg.profiles) ? msg.profiles[0] ?? null : msg.profiles,
  })) as CommunityMessageWithProfile[];
}

// Send text message
export async function sendTextMessage(
  communityId: string,
  userId: string,
  content: string
): Promise<CommunityMessageWithProfile> {
  const { data, error } = await supabase
    .from("community_messages")
    .insert({ community_id: communityId, user_id: userId, content, type: "text" })
    .select("*, profiles:user_id (username, avatar_url)")
    .single();
  if (error) throw error;
  return {
    ...data,
    profiles: Array.isArray((data as any).profiles) ? (data as any).profiles[0] ?? null : (data as any).profiles,
  } as CommunityMessageWithProfile;
}

// Send image message (after upload)
export async function sendImageMessage(
  communityId: string,
  userId: string,
  imageUrl: string
): Promise<CommunityMessageWithProfile> {
  const { data, error } = await supabase
    .from("community_messages")
    .insert({ community_id: communityId, user_id: userId, type: "image", image_url: imageUrl })
    .select("*, profiles:user_id (username, avatar_url)")
    .single();
  if (error) throw error;
  return {
    ...data,
    profiles: Array.isArray((data as any).profiles) ? (data as any).profiles[0] ?? null : (data as any).profiles,
  } as CommunityMessageWithProfile;
}

// Send GIF (external URL)
export async function sendGifMessage(
  communityId: string,
  userId: string,
  gifUrl: string
): Promise<CommunityMessageWithProfile> {
  const { data, error } = await supabase
    .from("community_messages")
    .insert({ community_id: communityId, user_id: userId, type: "gif", image_url: gifUrl })
    .select("*, profiles:user_id (username, avatar_url)")
    .single();
  if (error) throw error;
  return {
    ...data,
    profiles: Array.isArray((data as any).profiles) ? (data as any).profiles[0] ?? null : (data as any).profiles,
  } as CommunityMessageWithProfile;
}

// Image compression helper
async function compressImage(file: File): Promise<File> {
  const imageCompression = (await import("browser-image-compression")).default;
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1280,
    useWebWorker: true,
    fileType: "image/webp" as const,
  };
  return imageCompression(file, options);
}

// Upload image to storage and return public URL
export async function uploadChatImage(file: File, userId: string): Promise<string> {
  const compressed = await compressImage(file);
  const filePath = `${userId}/${Date.now()}_${compressed.name}`;
  const { error } = await supabase.storage
    .from("community-chat-images")
    .upload(filePath, compressed);
  if (error) throw error;
  const { data } = supabase.storage.from("community-chat-images").getPublicUrl(filePath);
  return data.publicUrl;
}

// Real-time subscription
export function subscribeToMessages(
  communityId: string,
  callback: (msg: CommunityMessageWithProfile) => void
) {
  return supabase
    .channel(`community_messages:${communityId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "community_messages",
        filter: `community_id=eq.${communityId}`,
      },
      async (payload) => {
        const { data } = await supabase
          .from("community_messages")
          .select("*, profiles:user_id (username, avatar_url)")
          .eq("id", payload.new.id)
          .single();
        if (data) {
          callback({
            ...data,
            profiles: Array.isArray((data as any).profiles) ? (data as any).profiles[0] ?? null : (data as any).profiles,
          } as CommunityMessageWithProfile);
        }
      }
    )
    .subscribe();
}

// Delete message (optional)
export async function deleteMessage(messageId: string): Promise<void> {
  const { error } = await supabase.from("community_messages").delete().eq("id", messageId);
  if (error) throw error;
}
````

## File: src/services/eventsService.ts
````typescript
import { supabase } from "../lib/supabase";
import type { Database } from "../types/database.types";

type Event = Database["public"]["Tables"]["events"]["Row"];
type EventInsert = Database["public"]["Tables"]["events"]["Insert"];
type EventUpdate = Database["public"]["Tables"]["events"]["Update"];

export async function fetchEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });
  if (error) throw error;
  return data as Event[];
}

export async function createEvent(event: EventInsert): Promise<Event> {
  const { data, error } = await supabase
    .from("events")
    .insert(event)
    .select()
    .single();
  if (error) throw error;
  return data as Event;
}

export async function updateEvent(id: string, updates: EventUpdate): Promise<Event> {
  const { data, error } = await supabase
    .from("events")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Event;
}

export async function deleteEvent(id: string): Promise<void> {
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw error;
}

export async function toggleReminder(eventId: string, userId: string): Promise<boolean> {
  const { data: existing } = await supabase
    .from("event_reminders")
    .select("id")
    .eq("event_id", eventId)
    .eq("user_id", userId)
    .maybeSingle();

  if (existing) {
    await supabase.from("event_reminders").delete().eq("id", existing.id);
    return false; // now not reminded
  } else {
    await supabase.from("event_reminders").insert({ event_id: eventId, user_id: userId });
    return true; // now reminded
  }
}

export async function getReminderStatus(eventId: string, userId: string): Promise<boolean> {
  const { data } = await supabase
    .from("event_reminders")
    .select("id")
    .eq("event_id", eventId)
    .eq("user_id", userId)
    .maybeSingle();
  return !!data;
}
````

## File: src/services/liveRoomService.tsx
````typescript
import { supabase } from "../lib/supabase";

export type LiveRoom = {
  id: string;
  topic: string;
  community_id: string | null;
  created_by: string;
  expires_at: string;
  created_at: string;
};

export type LiveRoomMessage = {
  id: string;
  room_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles?: { username: string | null; avatar_url: string | null } | null;
};

export async function fetchActiveRooms(): Promise<LiveRoom[]> {
  const { data, error } = await supabase
    .from("live_rooms")
    .select("*")
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as LiveRoom[];
}

export async function createRoom(topic: string, durationMinutes: number, communityId?: string): Promise<LiveRoom> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");

  const expiresAt = new Date(Date.now() + durationMinutes * 60000).toISOString();
  const { data, error } = await supabase
    .from("live_rooms")
    .insert({ topic, community_id: communityId || null, created_by: user.id, expires_at: expiresAt })
    .select()
    .single();
  if (error) throw error;
  return data as LiveRoom;
}

export async function fetchRoomMessages(roomId: string): Promise<LiveRoomMessage[]> {
  const { data, error } = await supabase
    .from("live_room_messages")
    .select("*, profiles:user_id (username, avatar_url)")
    .eq("room_id", roomId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((m: any) => ({
    ...m,
    profiles: Array.isArray(m.profiles) ? m.profiles[0] ?? null : m.profiles,
  }));
}

export async function sendRoomMessage(roomId: string, content: string): Promise<LiveRoomMessage> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("live_room_messages")
    .insert({ room_id: roomId, user_id: user.id, content })
    .select("*, profiles:user_id (username, avatar_url)")
    .single();
  if (error) throw error;
  return { ...data, profiles: Array.isArray((data as any).profiles) ? (data as any).profiles[0] ?? null : (data as any).profiles };
}

export function subscribeToRoomMessages(roomId: string, callback: (msg: LiveRoomMessage) => void) {
  return supabase
    .channel(`live_room:${roomId}`)
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "live_room_messages", filter: `room_id=eq.${roomId}` },
      async (payload) => {
        const { data } = await supabase.from("live_room_messages").select("*, profiles:user_id (username, avatar_url)").eq("id", payload.new.id).single();
        if (data) callback({ ...data, profiles: Array.isArray((data as any).profiles) ? (data as any).profiles[0] ?? null : (data as any).profiles });
      }
    )
    .subscribe();
}
````

## File: src/services/postLimitService.ts
````typescript
import { supabase } from "../lib/supabase";

export const MAX_POSTS_PER_HOUR = 10;

export async function getPostLimitStatus(userId: string) {
  const oneHourAgo = new Date(
    Date.now() - 60 * 60 * 1000
  ).toISOString();

  const { count, error } = await supabase
    .from("posts")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", userId)
    .gte("created_at", oneHourAgo);

  if (error) throw error;

  const used = count ?? 0;

  return {
    used,
    remaining: Math.max(
      0,
      MAX_POSTS_PER_HOUR - used
    ),
    canPost: used < MAX_POSTS_PER_HOUR,
  };
}
````

## File: src/services/questionService.ts
````typescript
import { supabase } from "../lib/supabase";

export type Question = {
  id: string;
  title: string;
  body: string | null;
  community_id: string | null;
  author_id: string;
  created_at: string;
  author?: { username: string | null; avatar_url: string | null };
  answers_count?: number;
};

export type Answer = {
  id: string;
  question_id: string;
  author_id: string;
  content: string;
  upvotes: number;
  downvotes: number;
  is_accepted: boolean;
  created_at: string;
  author?: { username: string | null; avatar_url: string | null; is_senior?: boolean };
  userVote?: "up" | "down" | null;
};

export async function fetchQuestions(communityId?: string): Promise<Question[]> {
  let query = supabase
    .from("questions")
    .select("*, author:profiles!questions_author_id_fkey (username, avatar_url)")
    .order("created_at", { ascending: false });

  if (communityId) query = query.eq("community_id", communityId);

  const { data, error } = await query;
  if (error) throw error;

  const ids = data?.map((q) => q.id) ?? [];
  const answerCounts = await getAnswerCounts(ids);

  return (data ?? []).map((q: any) => ({
    ...q,
    author: q.author ?? null,
    answers_count: answerCounts[q.id] ?? 0,
  }));
}

async function getAnswerCounts(questionIds: string[]): Promise<Record<string, number>> {
  if (questionIds.length === 0) return {};
  const { data } = await supabase.from("answers").select("question_id").in("question_id", questionIds);
  const counts: Record<string, number> = {};
  data?.forEach((a) => { counts[a.question_id] = (counts[a.question_id] ?? 0) + 1; });
  return counts;
}

export async function askQuestion(title: string, body: string, communityId?: string): Promise<Question> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("questions")
    .insert({ title, body: body || null, community_id: communityId || null, author_id: user.id })
    .select("*, author:profiles!questions_author_id_fkey (username, avatar_url)")
    .single();
  if (error) throw error;
  return { ...data, author: (data as any).author ?? null, answers_count: 0 };
}

export async function fetchAnswers(questionId: string, userId?: string): Promise<Answer[]> {
  const { data: answers, error } = await supabase
    .from("answers")
    .select("*, author:profiles!answers_author_id_fkey (username, avatar_url, is_senior)")
    .eq("question_id", questionId)
    .order("upvotes", { ascending: false });

  if (error) throw error;

  if (userId && answers?.length) {
    const { data: votes } = await supabase
      .from("answer_votes")
      .select("answer_id, vote_type")
      .eq("user_id", userId)
      .in("answer_id", answers.map((a) => a.id));

    const voteMap: Record<string, "up" | "down"> = {};
    votes?.forEach((v) => { voteMap[v.answer_id] = v.vote_type as "up" | "down"; });

    return (answers ?? []).map((a: any) => ({
      ...a,
      author: a.author ?? null,
      userVote: voteMap[a.id] ?? null,
    }));
  }

  return (answers ?? []).map((a: any) => ({
    ...a,
    author: a.author ?? null,
    userVote: null,
  }));
}

export async function submitAnswer(questionId: string, content: string): Promise<Answer> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("answers")
    .insert({ question_id: questionId, author_id: user.id, content })
    .select("*, author:profiles!answers_author_id_fkey (username, avatar_url, is_senior)")
    .single();
  if (error) throw error;
  return { ...data, author: (data as any).author ?? null, userVote: null };
}

export async function voteAnswer(answerId: string, type: "up" | "down"): Promise<void> {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) throw new Error("Not authenticated");

  const { data: existing } = await supabase
    .from("answer_votes")
    .select("id, vote_type")
    .eq("answer_id", answerId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing?.vote_type === type) {
    await supabase.from("answer_votes").delete().eq("id", existing.id);
    await supabase.rpc("decrement_vote", { p_post_id: answerId, p_column: type === "up" ? "upvotes" : "downvotes" });
  } else if (existing) {
    await supabase.from("answer_votes").update({ vote_type: type }).eq("id", existing.id);
    await supabase.rpc("increment", { table_name: "answers", column_name: type === "up" ? "upvotes" : "downvotes", row_id: answerId });
    await supabase.rpc("decrement_vote", { p_post_id: answerId, p_column: type === "up" ? "downvotes" : "upvotes" });
  } else {
    await supabase.from("answer_votes").insert({ answer_id: answerId, user_id: user.id, vote_type: type });
    await supabase.rpc("increment", { table_name: "answers", column_name: type === "up" ? "upvotes" : "downvotes", row_id: answerId });
  }
}

export async function acceptAnswer(answerId: string, questionId: string): Promise<void> {
  await supabase.from("answers").update({ is_accepted: false }).eq("question_id", questionId);
  await supabase.from("answers").update({ is_accepted: true }).eq("id", answerId);
}
````

## File: src/services/reportService.ts
````typescript
import { supabase } from "../lib/supabase";

export async function reportPost(postId: string, reporterId: string, reason: string) {
  const { error } = await supabase.from("reports").insert({
    post_id: postId,
    reporter_id: reporterId,
    reason,
  });
  if (error) throw error;
}

export async function reportMaterial(materialId: string, reporterId: string, reason: string) {
  const { error } = await supabase.from("reports").insert({
    material_id: materialId,
    reporter_id: reporterId,
    reason,
  });
  if (error) throw error;
}
````

## File: src/services/savedPostsService.ts
````typescript
import { supabase } from "../lib/supabase";

export async function savePost(
  userId: string,
  postId: string
) {
  const { error } = await supabase
    .from("saved_posts")
    .insert({
      user_id: userId,
      post_id: postId,
    });

  if (error) throw error;
}

export async function unsavePost(
  userId: string,
  postId: string
) {
  const { error } = await supabase
    .from("saved_posts")
    .delete()
    .eq("user_id", userId)
    .eq("post_id", postId);

  if (error) throw error;
}

export async function isPostSaved(
  userId: string,
  postId: string
) {
  const { data } = await supabase
    .from("saved_posts")
    .select("id")
    .eq("user_id", userId)
    .eq("post_id", postId)
    .maybeSingle();

  return !!data;
}

export async function getSavedPosts(
  userId: string
) {
  const { data, error } =
    await supabase
      .from("saved_posts")
      .select(`
        post_id,
        posts (
          *,
          profiles (
            username,
            avatar_url,
            role
          )
        )
      `)
      .eq("user_id", userId);

  if (error) throw error;

  return data ?? [];
}
````

## File: src/services/searchService.ts
````typescript
import { supabase } from "../lib/supabase";

export async function searchPosts(query: string) {
  if (!query.trim()) return [];

  const { data, error } = await supabase
    .from("posts")
    .select(`
      *,
      profiles (
        username,
        avatar_url,
        role
      )
    `)
    .ilike("content", `%${query}%`)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) throw error;

  return data ?? [];
}

export async function searchUsers(query: string) {
  if (!query.trim()) return [];

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .ilike("username", `%${query}%`)
    .limit(25);

  if (error) throw error;

  return data ?? [];
}
````

## File: src/store/accessibility.store.ts
````typescript
import { create } from "zustand";

type FontSize = "normal" | "large" | "x-large";

interface AccessibilityState {
  fontSize: FontSize;
  highContrast: boolean;
  setFontSize: (size: FontSize) => void;
  toggleHighContrast: () => void;
  init: () => void;
}

export const useAccessibilityStore = create<AccessibilityState>((set, get) => ({
  fontSize: "normal",
  highContrast: false,

  setFontSize: (size) => {
    const root = document.documentElement;
    root.classList.remove("text-large", "text-x-large");
    if (size !== "normal") root.classList.add(`text-${size}`);
    localStorage.setItem("fontSize", size);
    set({ fontSize: size });
  },

  toggleHighContrast: () => {
    const next = !get().highContrast;
    const root = document.documentElement;
    if (next) root.classList.add("high-contrast");
    else root.classList.remove("high-contrast");
    localStorage.setItem("highContrast", String(next));
    set({ highContrast: next });
  },

  init: () => {
    const savedFont = localStorage.getItem("fontSize") as FontSize | null;
    const savedContrast = localStorage.getItem("highContrast") === "true";
    if (savedFont) {
      const root = document.documentElement;
      if (savedFont !== "normal") root.classList.add(`text-${savedFont}`);
      set({ fontSize: savedFont });
    }
    if (savedContrast) {
      document.documentElement.classList.add("high-contrast");
      set({ highContrast: true });
    }
  },
}));
````

## File: src/store/authStore.ts
````typescript
import { create } from "zustand";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface AuthState {
  user: User | null;
  loading: boolean;
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (email: string, password: string, username: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

let authSubscription: { data: { subscription: { unsubscribe: () => void } } } | null = null;

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  initialize: async () => {
    try {
      set({ loading: true });
      authSubscription?.data?.subscription?.unsubscribe();
      authSubscription = null;

      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        console.warn("[AuthStore] No valid session.");
        set({ user: null, loading: false });
        return;
      }

      set({ user: session.user ?? null, loading: false });

      authSubscription = supabase.auth.onAuthStateChange((_event, session) => {
        set({ user: session?.user ?? null, loading: false });
      });
    } catch (err) {
      console.error("[AuthStore] initialize error:", err);
      set({ user: null, loading: false });
    }
  },

  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      // Map Supabase error codes to user‑friendly messages
      const message =
        error.message === "Invalid login credentials"
          ? "Invalid email or password."
          : error.message || "Login failed. Please try again.";
      return { error: message };
    }
    // Immediately set the user so ProtectedRoute doesn't bounce the user back
    set({ user: data.user ?? null });
    return {};
  },

  register: async (email, password, username) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      const message =
        error.message === "User already registered"
          ? "An account with this email already exists."
          : error.message || "Registration failed. Please try again.";
      return { error: message };
    }

    const user = data.user;
    if (!user) return { error: "Failed to create account." };

    // Create profile
    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({ id: user.id, username: username.trim(), role: "student" });
    if (profileError) {
      return { error: "Account created but failed to save profile. Contact support." };
    }

    // Welcome notification (optional)
    const { error: notifError } = await supabase.from("notifications").insert({
      user_id: user.id,
      type: "welcome",
      title: "🎉 Welcome to Warren!",
      body: "Connect with students, share ideas, and stay updated with campus life.",
    });
    if (notifError) console.warn("[AuthStore] Welcome notification error:", notifError);

    // Immediately set the user
    set({ user });
    return {};
  },

  logout: async () => {
    try {
      await supabase.auth.signOut();
    } finally {
      authSubscription?.data?.subscription?.unsubscribe();
      authSubscription = null;
      set({ user: null, loading: false });
    }
  },
}));
````

## File: src/store/themeStore.ts
````typescript
import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeState>(
  (set, get) => ({
    theme: "light",

    setTheme: (theme) => {
      const html =
        document.documentElement;

      if (theme === "dark") {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }

      localStorage.setItem(
        "theme",
        theme
      );

      set({ theme });
    },

    toggleTheme: () => {
      const current =
        get().theme;

      get().setTheme(
        current === "dark"
          ? "light"
          : "dark"
      );
    },

    initTheme: () => {
      const savedTheme =
        localStorage.getItem(
          "theme"
        ) as Theme | null;

      const prefersDark =
        window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;

      const theme =
        savedTheme ??
        (prefersDark
          ? "dark"
          : "light");

      const html =
        document.documentElement;

      if (theme === "dark") {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }

      set({ theme });
    },
  })
);
````

## File: src/store/toastStore.ts
````typescript
import { create } from "zustand";

interface Toast {
  message: string;
  type: "ok" | "err";
}

interface ToastStore {
  toast: Toast | null;
  showToast: (message: string, type?: "ok" | "err") => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toast: null,
  showToast: (message, type = "ok") => {
    set({ toast: { message, type } });
    setTimeout(() => set({ toast: null }), 3000);
  },
  hideToast: () => set({ toast: null }),
}));
````

## File: src/types/community.ts
````typescript
import type { Database } from "./database.types";

export type Community = Database["public"]["Tables"]["communities"]["Row"];
export type CommunityMember = Database["public"]["Tables"]["community_members"]["Row"];
export type CommunityType = "social" | "educational";
````

## File: src/types/database.types.ts
````typescript
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          category: string | null
          content: string | null
          created_at: string | null
          created_by: string | null
          document_url: string | null
          id: string
          image_url: string | null
          pinned: boolean | null
          title: string | null
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          document_url?: string | null
          id?: string
          image_url?: string | null
          pinned?: boolean | null
          title?: string | null
        }
        Update: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          created_by?: string | null
          document_url?: string | null
          id?: string
          image_url?: string | null
          pinned?: boolean | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "announcements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      answer_votes: {
        Row: {
          answer_id: string
          created_at: string
          id: string
          user_id: string
          vote_type: string
        }
        Insert: {
          answer_id: string
          created_at?: string
          id?: string
          user_id: string
          vote_type: string
        }
        Update: {
          answer_id?: string
          created_at?: string
          id?: string
          user_id?: string
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "answer_votes_answer_id_fkey"
            columns: ["answer_id"]
            isOneToOne: false
            referencedRelation: "answers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answer_votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      answers: {
        Row: {
          author_id: string
          content: string
          created_at: string
          downvotes: number
          id: string
          is_accepted: boolean
          question_id: string
          updated_at: string
          upvotes: number
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          downvotes?: number
          id?: string
          is_accepted?: boolean
          question_id: string
          updated_at?: string
          upvotes?: number
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          downvotes?: number
          id?: string
          is_accepted?: boolean
          question_id?: string
          updated_at?: string
          upvotes?: number
        }
        Relationships: [
          {
            foreignKeyName: "answers_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      blocked_users: {
        Row: {
          blocked_id: string
          blocker_id: string
          created_at: string
          id: string
        }
        Insert: {
          blocked_id: string
          blocker_id: string
          created_at?: string
          id?: string
        }
        Update: {
          blocked_id?: string
          blocker_id?: string
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blocked_users_blocked_id_fkey"
            columns: ["blocked_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blocked_users_blocker_id_fkey"
            columns: ["blocker_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comment_votes: {
        Row: {
          comment_id: string
          created_at: string | null
          id: string
          user_id: string
          vote_type: string
        }
        Insert: {
          comment_id: string
          created_at?: string | null
          id?: string
          user_id: string
          vote_type: string
        }
        Update: {
          comment_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_votes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string | null
          created_at: string | null
          downvotes: number | null
          gif_url: string | null
          id: string
          image_url: string | null
          post_id: string | null
          upvotes: number | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          downvotes?: number | null
          gif_url?: string | null
          id?: string
          image_url?: string | null
          post_id?: string | null
          upvotes?: number | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          downvotes?: number | null
          gif_url?: string | null
          id?: string
          image_url?: string | null
          post_id?: string | null
          upvotes?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      communities: {
        Row: {
          archived: boolean | null
          cover_color: string
          created_at: string
          created_by: string | null
          description: string
          icon: string
          id: string
          name: string
          parent_id: string | null
          type: string
          updated_at: string
          year: string | null
        }
        Insert: {
          archived?: boolean | null
          cover_color?: string
          created_at?: string
          created_by?: string | null
          description?: string
          icon?: string
          id?: string
          name: string
          parent_id?: string | null
          type?: string
          updated_at?: string
          year?: string | null
        }
        Update: {
          archived?: boolean | null
          cover_color?: string
          created_at?: string
          created_by?: string | null
          description?: string
          icon?: string
          id?: string
          name?: string
          parent_id?: string | null
          type?: string
          updated_at?: string
          year?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "communities_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "communities_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      community_members: {
        Row: {
          community_id: string
          joined_at: string
          user_id: string
        }
        Insert: {
          community_id: string
          joined_at?: string
          user_id: string
        }
        Update: {
          community_id?: string
          joined_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_members_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      community_messages: {
        Row: {
          community_id: string
          content: string | null
          created_at: string
          expires_at: string | null
          file_url: string | null
          id: string
          image_url: string | null
          sticker_url: string | null
          type: string
          updated_at: string
          user_id: string
          voice_url: string | null
        }
        Insert: {
          community_id: string
          content?: string | null
          created_at?: string
          expires_at?: string | null
          file_url?: string | null
          id?: string
          image_url?: string | null
          sticker_url?: string | null
          type?: string
          updated_at?: string
          user_id: string
          voice_url?: string | null
        }
        Update: {
          community_id?: string
          content?: string | null
          created_at?: string
          expires_at?: string | null
          file_url?: string | null
          id?: string
          image_url?: string | null
          sticker_url?: string | null
          type?: string
          updated_at?: string
          user_id?: string
          voice_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_messages_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      direct_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "direct_messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "direct_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      event_reminders: {
        Row: {
          created_at: string
          event_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_reminders_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_reminders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          community_id: string | null
          created_at: string
          created_by: string
          description: string | null
          event_date: string
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          community_id?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          event_date: string
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          community_id?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          event_date?: string
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      global_notifications: {
        Row: {
          body: string | null
          created_at: string
          data: Json | null
          id: string
          title: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          data?: Json | null
          id?: string
          title: string
        }
        Update: {
          body?: string | null
          created_at?: string
          data?: Json | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      karma_events: {
        Row: {
          amount: number
          created_at: string
          id: string
          reason: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          reason: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          reason?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "karma_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      live_room_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          room_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          room_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_room_messages_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "live_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "live_room_messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      live_rooms: {
        Row: {
          community_id: string | null
          created_at: string
          created_by: string
          expires_at: string
          id: string
          topic: string
        }
        Insert: {
          community_id?: string | null
          created_at?: string
          created_by: string
          expires_at: string
          id?: string
          topic: string
        }
        Update: {
          community_id?: string | null
          created_at?: string
          created_by?: string
          expires_at?: string
          id?: string
          topic?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_rooms_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "live_rooms_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      map_pin_suggestions: {
        Row: {
          category: string | null
          contact: string | null
          created_at: string | null
          description: string | null
          hours: string | null
          id: string
          location_description: string | null
          suggested_by: string | null
          title: string
        }
        Insert: {
          category?: string | null
          contact?: string | null
          created_at?: string | null
          description?: string | null
          hours?: string | null
          id?: string
          location_description?: string | null
          suggested_by?: string | null
          title: string
        }
        Update: {
          category?: string | null
          contact?: string | null
          created_at?: string | null
          description?: string | null
          hours?: string | null
          id?: string
          location_description?: string | null
          suggested_by?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "map_pin_suggestions_suggested_by_fkey"
            columns: ["suggested_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      map_pins: {
        Row: {
          category: Database["public"]["Enums"]["pin_category"]
          contact: string | null
          created_at: string | null
          created_by: string | null
          description: string
          floor: string | null
          hours: string | null
          id: string
          photos: string[] | null
          title: string
          x_percent: number
          y_percent: number
        }
        Insert: {
          category?: Database["public"]["Enums"]["pin_category"]
          contact?: string | null
          created_at?: string | null
          created_by?: string | null
          description: string
          floor?: string | null
          hours?: string | null
          id?: string
          photos?: string[] | null
          title: string
          x_percent: number
          y_percent: number
        }
        Update: {
          category?: Database["public"]["Enums"]["pin_category"]
          contact?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string
          floor?: string | null
          hours?: string | null
          id?: string
          photos?: string[] | null
          title?: string
          x_percent?: number
          y_percent?: number
        }
        Relationships: [
          {
            foreignKeyName: "map_pins_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      material_ratings: {
        Row: {
          created_at: string | null
          id: string
          material_id: string
          rating: number
          review: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          material_id: string
          rating: number
          review?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          material_id?: string
          rating?: number
          review?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "material_ratings_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "study_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_ratings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      material_reactions: {
        Row: {
          created_at: string | null
          emoji: string
          id: string
          material_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          emoji: string
          id?: string
          material_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          emoji?: string
          id?: string
          material_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "material_reactions_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "study_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      material_requests: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          subject: string | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          subject?: string | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          subject?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "material_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      material_versions: {
        Row: {
          created_at: string | null
          file_url: string | null
          id: string
          material_id: string | null
          uploaded_by: string | null
          version_number: number
        }
        Insert: {
          created_at?: string | null
          file_url?: string | null
          id?: string
          material_id?: string | null
          uploaded_by?: string | null
          version_number: number
        }
        Update: {
          created_at?: string | null
          file_url?: string | null
          id?: string
          material_id?: string | null
          uploaded_by?: string | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "material_versions_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "study_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_versions_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      material_views: {
        Row: {
          id: string
          material_id: string
          user_id: string
          viewed_at: string | null
        }
        Insert: {
          id?: string
          material_id: string
          user_id: string
          viewed_at?: string | null
        }
        Update: {
          id?: string
          material_id?: string
          user_id?: string
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "material_views_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "study_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string | null
          data: Json | null
          id: string
          read: boolean | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          read?: boolean | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string | null
          data?: Json | null
          id?: string
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_reactions: {
        Row: {
          created_at: string
          emoji: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          emoji: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          emoji?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_votes: {
        Row: {
          created_at: string | null
          id: string
          post_id: string
          user_id: string
          vote_type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
          vote_type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_votes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string | null
          created_at: string | null
          downvotes: number | null
          id: string
          image_url: string | null
          is_anonymous: boolean | null
          score: number | null
          upvotes: number | null
          user_id: string | null
          voice_url: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          downvotes?: number | null
          id?: string
          image_url?: string | null
          is_anonymous?: boolean | null
          score?: number | null
          upvotes?: number | null
          user_id?: string | null
          voice_url?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          downvotes?: number | null
          id?: string
          image_url?: string | null
          is_anonymous?: boolean | null
          score?: number | null
          upvotes?: number | null
          user_id?: string | null
          voice_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          credits: number | null
          id: string
          is_lecturer: boolean | null
          is_senior: boolean
          karma: number
          role: Database["public"]["Enums"]["app_role"]
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          credits?: number | null
          id: string
          is_lecturer?: boolean | null
          is_senior?: boolean
          karma?: number
          role?: Database["public"]["Enums"]["app_role"]
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          credits?: number | null
          id?: string
          is_lecturer?: boolean | null
          is_senior?: boolean
          karma?: number
          role?: Database["public"]["Enums"]["app_role"]
          username?: string | null
        }
        Relationships: []
      }
      push_subscriptions: {
        Row: {
          auth: string
          created_at: string | null
          endpoint: string
          id: string
          p256dh: string
          user_id: string
        }
        Insert: {
          auth: string
          created_at?: string | null
          endpoint: string
          id?: string
          p256dh: string
          user_id: string
        }
        Update: {
          auth?: string
          created_at?: string | null
          endpoint?: string
          id?: string
          p256dh?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "push_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          author_id: string
          body: string | null
          community_id: string | null
          created_at: string
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          body?: string | null
          community_id?: string | null
          created_at?: string
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          body?: string | null
          community_id?: string | null
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "questions_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_limits: {
        Row: {
          action_type: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          action_type: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          action_type?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string | null
          id: string
          material_id: string | null
          post_id: string | null
          reason: string
          reporter_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          material_id?: string | null
          post_id?: string | null
          reason: string
          reporter_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          material_id?: string | null
          post_id?: string | null
          reason?: string
          reporter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "study_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_materials: {
        Row: {
          created_at: string
          id: string
          material_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          material_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          material_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_materials_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "study_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_materials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_posts: {
        Row: {
          created_at: string | null
          id: string
          post_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_posts_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      starter_packs: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          material_ids: string[]
          name: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          material_ids?: string[]
          name: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          material_ids?: string[]
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "starter_packs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      study_materials: {
        Row: {
          created_at: string
          description: string | null
          download_count: number
          external_url: string | null
          file_url: string | null
          id: string
          is_pinned: boolean
          is_premium: boolean | null
          material_type: string
          premium_cost: number | null
          programme: string | null
          subject: string
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          trending_score: number | null
          uploaded_by: string
          year_group: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          download_count?: number
          external_url?: string | null
          file_url?: string | null
          id?: string
          is_pinned?: boolean
          is_premium?: boolean | null
          material_type?: string
          premium_cost?: number | null
          programme?: string | null
          subject: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          trending_score?: number | null
          uploaded_by: string
          year_group?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          download_count?: number
          external_url?: string | null
          file_url?: string | null
          id?: string
          is_pinned?: boolean
          is_premium?: boolean | null
          material_type?: string
          premium_cost?: number | null
          programme?: string | null
          subject?: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          trending_score?: number | null
          uploaded_by?: string
          year_group?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_materials_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      unlocked_materials: {
        Row: {
          material_id: string
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          material_id: string
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          material_id?: string
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "unlocked_materials_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "study_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unlocked_materials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      webrtc_signals: {
        Row: {
          created_at: string | null
          id: string
          payload: Json
          receiver_id: string | null
          room_id: string
          sender_id: string
          type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          payload: Json
          receiver_id?: string | null
          room_id: string
          sender_id: string
          type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          payload?: Json
          receiver_id?: string | null
          room_id?: string
          sender_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "webrtc_signals_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      archive_inactive_communities: { Args: never; Returns: undefined }
      can_create_post: { Args: { p_user_id: string }; Returns: boolean }
      cleanup_old_notifications: { Args: never; Returns: undefined }
      decrement_vote: {
        Args: { p_column: string; p_post_id: string }
        Returns: undefined
      }
      get_my_role: {
        Args: never
        Returns: Database["public"]["Enums"]["app_role"]
      }
      increment: {
        Args: { column_name: string; row_id: string; table_name: string }
        Returns: undefined
      }
      post_hot_score: {
        Args: { created_at: string; downvotes: number; upvotes: number }
        Returns: number
      }
      recalculate_trending_scores: { Args: never; Returns: undefined }
    }
    Enums: {
      app_role: "admin" | "moderator" | "student"
      pin_category:
        | "registration"
        | "academics"
        | "finance"
        | "student_union"
        | "health"
        | "library"
        | "dining"
        | "transport"
        | "general"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "student"],
      pin_category: [
        "registration",
        "academics",
        "finance",
        "student_union",
        "health",
        "library",
        "dining",
        "transport",
        "general",
      ],
    },
  },
} as const
````

## File: src/types/map.ts
````typescript
import type { Database } from "./database.types";

export type MapPin = Database["public"]["Tables"]["map_pins"]["Row"];
export type PinCategory = Database["public"]["Enums"]["pin_category"];
````

## File: src/utils/stringSimilarity.ts
````typescript
export function diceCoefficient(a: string, b: string): number {
  const bigrams = (s: string) => {
    const map = new Map<string, number>();
    for (let i = 0; i < s.length - 1; i++) {
      const bigram = s.substring(i, i + 2).toLowerCase();
      map.set(bigram, (map.get(bigram) || 0) + 1);
    }
    return map;
  };

  const aBigrams = bigrams(a);
  const bBigrams = bigrams(b);
  let intersection = 0;
  for (const [bigram, count] of aBigrams) {
    intersection += Math.min(count, bBigrams.get(bigram) || 0);
  }
  const total = a.length + b.length - 2;
  return total > 0 ? (2 * intersection) / total : 0;
}
````

## File: src/vite-env.d.ts.ts
````typescript
/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
````

## File: supabase/.temp/cli-latest
````
v2.107.0
````

## File: supabase/.temp/gotrue-version
````
v2.192.0
````

## File: supabase/.temp/linked-project.json
````json
{"ref":"wxcyxdiavjrbqdjxqsrl","name":"warren","organization_id":"nwuzlncmcnnefdnbbkcp","organization_slug":"nwuzlncmcnnefdnbbkcp"}
````

## File: supabase/.temp/pooler-url
````
postgresql://postgres.wxcyxdiavjrbqdjxqsrl@aws-1-eu-central-1.pooler.supabase.com:5432/postgres
````

## File: supabase/.temp/postgres-version
````
17.6.1.127
````

## File: supabase/.temp/project-ref
````
wxcyxdiavjrbqdjxqsrl
````

## File: supabase/.temp/rest-version
````
v14.5
````

## File: supabase/.temp/storage-migration
````
optimize-existing-functions-again
````

## File: supabase/.temp/storage-version
````
v1.61.10
````

## File: supabase/functions/send-push/index.ts
````typescript
// supabase/functions/send-push/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const vapidSubject = "mailto:admin@warren.app";
const vapidPublicKey = Deno.env.get("VITE_VAPID_PUBLIC_KEY")!;
const vapidPrivateKey = Deno.env.get("VAPID_PRIVATE_KEY")!;

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

serve(async (req: Request) => {
  const { notification_id } = await req.json();

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Fetch the notification
  const { data: notification, error: notifError } = await supabase
    .from("notifications")
    .select("*")
    .eq("id", notification_id)
    .single();

  if (notifError || !notification) {
    return new Response(JSON.stringify({ error: "Notification not found" }), { status: 404 });
  }

  // Fetch push subscriptions for this user
  const { data: subscriptions, error: subError } = await supabase
    .from("push_subscriptions")
    .select("*")
    .eq("user_id", notification.user_id);

  if (subError || !subscriptions?.length) {
    return new Response(JSON.stringify({ skipped: "No subscriptions" }), { status: 200 });
  }

  const payload = JSON.stringify({
    title: notification.title,
    body: notification.body ?? "",
    icon: "/pwa-192.png",
    badge: "/pwa-192.png",
    data: notification.data ?? {},
    requireInteraction: true,
  });

  const results = await Promise.allSettled(
    subscriptions.map(async (sub) => {
      const subscription = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.p256dh,
          auth: sub.auth,
        },
      };

      const encodedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
      const encodedVapidPrivateKey = urlBase64ToUint8Array(vapidPrivateKey);

      const vapidHeader = await crypto.subtle.importKey(
        "raw",
        encodedVapidPrivateKey,
        { name: "ECDSA", namedCurve: "P-256" },
        true,
        ["sign"]
      );

      const aud = new URL(sub.endpoint).origin;
      const jwtHeader = { alg: "ES256", typ: "JWT" };
      const jwtPayload = {
        sub: vapidSubject,
        aud,
        exp: Math.floor(Date.now() / 1000) + 86400,
      };

      const encoder = new TextEncoder();
      const jwtToken =
        btoa(JSON.stringify(jwtHeader)) +
        "." +
        btoa(JSON.stringify(jwtPayload));

      const signature = await crypto.subtle.sign(
        { name: "ECDSA", hash: "SHA-256" },
        vapidHeader,
        encoder.encode(jwtToken)
      );

      const signatureBase64 = btoa(
        String.fromCharCode(...new Uint8Array(signature))
      )
        .replace(/\+/g, "-")
        .replace(/\//g, "_");

      const authorizationHeader = `vapid t=${jwtToken}.${signatureBase64}, k=${vapidPublicKey}`;

      const res = await fetch(sub.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          "Authorization": authorizationHeader,
          "Content-Encoding": "aes128gcm",
        },
        body: payload,
      });

      if (!res.ok) {
        // If subscription is gone, remove it
        if (res.status === 410 || res.status === 404) {
          await supabase
            .from("push_subscriptions")
            .delete()
            .eq("endpoint", sub.endpoint);
        }
        throw new Error(`Push failed: ${res.status}`);
      }

      return res.status;
    })
  );

  return new Response(JSON.stringify({ success: true, results }), { status: 200 });
});
````

## File: tailwind.config.js
````javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {},
  },

  plugins: [],
};
````

## File: TODO.md
````markdown
# TODO - Campus Map improvements

## Plan items
- [x] Add Supabase table + RLS policies (done via SQL)
- [x] Add geolocation hook + Haversine helper (`useGeolocation`, `getDistance`)
- [x] Update map component props to accept `userPosition` (kept unused for now; pins use `x_percent/y_percent`)
- [ ] Update `PinDrawer` with:
  - [ ] Walkthrough “Next Stop” / “Finish Walkthrough”
  - [ ] Share button (copy/share deep link `/campus-map?pin=<id>`)
  - [ ] Open/Closed indicator derived from `pin.hours`
- [ ] Update `CampusMapPage` with:
  - [ ] Deep link handling `?pin=<id>` opens drawer
  - [ ] First Day Route walkthrough button + steps for the 5 UUID pins
  - [ ] Missing place suggestion link + modal
  - [ ] On submit insert into `map_pin_suggestions`

## Potential build note
- `npm run build` failed earlier due to Windows EPERM emptying `dist/` while locked. If it happens again, close any process using `dist/` and retry.

## Notes
- Lint currently fails due to existing errors in `supabase/functions/send-push/index.ts` (unrelated to map changes).
````

## File: tsconfig.app.json
````json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",

    "target": "es2023",
    "lib": ["ES2023", "DOM", "DOM.Iterable", "WebWorker"],

    "module": "esnext",
    "moduleResolution": "bundler",

    "types": [
      "vite/client",
      "vite-plugin-pwa/client"
    ],

    "skipLibCheck": true,
    "noEmit": true,

    "jsx": "react-jsx",

    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",

    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
````

## File: tsconfig.json
````json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
````

## File: tsconfig.node.json
````json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "module": "esnext",
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
````

## File: vercel.json
````json
{
  "rewrites": [
    { "source": "/((?!.well-known).*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/",
      "headers": [
        { "key": "Cache-Control", "value": "no-cache, no-store, must-revalidate" }
      ]
    },
    {
      "source": "/manifest.webmanifest",
      "headers": [
        { "key": "Cache-Control", "value": "no-cache, no-store, must-revalidate" }
      ]
    }
  ],
  "crons": [
    {
      "path": "/api/cron/cleanup-notifications",
      "schedule": "0 3 * * *"
    }
  ]
}
````

## File: vite.config.ts
````typescript
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const buildId = env.VERCEL_GIT_COMMIT_SHA || env.VITE_APP_BUILD_ID || "dev";

  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: "autoUpdate",
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true,
          navigateFallback: "/index.html",
          runtimeCaching: [
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
              handler: "CacheFirst",
              options: { cacheName: "images", expiration: { maxEntries: 50 } },
            },
            {
              // Cache your own JS/CSS/HTML (app shell)
              urlPattern: ({ url }: { url: URL }) => url.origin === self.location.origin,
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "app-shell",
                expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 },
              },
            },
          ],
        },
        manifest: {
          name: "Warren Connect",
          short_name: "Warren",
          description: "Connect with students, buy/sell, find housing.",
          theme_color: "#1E40AF",
          background_color: "#1E40AF",
          display: "standalone",
          start_url: `/?v=${buildId}`,
          scope: "/",
          icons: [
            { src: "/pwa-192.png", sizes: "192x192", type: "image/png" },
            { src: "/pwa-512.png", sizes: "512x512", type: "image/png" },
          ],
        },
      }),
    ],
  };
});
````
