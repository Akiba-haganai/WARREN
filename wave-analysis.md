# Wave — Full App & Ecosystem Analysis
*(Source Document for NotebookLM / Gemini Audio & Video Overview Generation)*

---

> ### Ecosystem Primer Context
> **Wave** is one of three sibling applications within **The Warren** ecosystem, created by the same development team and sharing a unified master brand mark—a chat-bubble ring enclosing a compass needle and chalice/pivot stand.
> 
> * **PLAWZA** (Teal, `#00897B`): *Find places. Find opportunities.* (Marketplace, accommodation, businesses).
> * **WAVE** (Blue, `#1E88E5`): *Connect. Learn. Interact.* (Social, academic study hub, peer Q&A, communities, live study rooms).
> * **WEAVE** (Orange, `#FF6D00`): *Stories. Culture. What's happening.* (Blogs, podcasts, trends, campus culture).

---

## 1. Overview

**Wave** is an all-in-one digital campus portal and academic social engine designed specifically for university students. It seamlessly unifies peer-to-peer academic support, past exam paper repositories, real-time cohort community chats, lecturer Ask-Me-Anything (AMA) sessions, live virtual study rooms, direct messaging, campus event tracking, and interactive campus navigation into a single Progressive Web Application (PWA). Operating under a strict zero-dollar budget model, Wave delivers a premium, native-app feel with dark mode support, offline access, and zero-spam identity proof password security.

---

## 2. Purpose & Problem It Solves

Before Wave existed, campus academic life and student communication were fragmented across chaotic WhatsApp groups, unreliable file-sharing links, physical notice boards, and scattered Google Drive folders. 

* **Fragmented Course Materials**: Past exam papers and lecture slides were buried in dead group chats or passed around informally, leaving lower-year students without structured study resources.
* **Intimidating Peer Guidance**: Freshers and junior students hesitated to reach out to senior students or lecturers for guidance, lacking an organized, low-friction platform for academic mentorship.
* **Campus Disconnection**: Students frequently missed critical academic announcements, departmental events, or campus location changes due to noise on generic social media platforms.
* **Zero-Dollar Security & Rate Limits**: On free cloud tiers (such as Supabase free tier), generic email reset links are easily exhausted by bot spammers (capped at 2 emails/hour). Wave solves this by introducing a **Proof-of-Ownership Identity Quiz**, ensuring legitimate students recover accounts without burning free cloud quotas.

---

## 3. Target Audience

Wave is engineered for a multi-tiered campus ecosystem:

* **Undergraduate & Postgraduate Students**: University students seeking course study materials, exam countdown tools, and cohort communities.
* **Junior Students & Freshers**: First- and second-year students requiring academic orientation, senior advice, and campus building navigation.
* **Senior Students & Student Leaders**: Upper-year students offering guidance, answering questions in the *Ask a Senior* hub, and earning karma badges.
* **Lecturers & Academic Staff**: Educators hosting scheduled Ask-Me-Anything (AMA) sessions to clarify coursework and interact with cohorts directly.
* **Campus Administrators & Department Moderators**: Staff managing official bulletin announcements, verifying study materials, and moderating community reports.

---

## 4. Core Features & Functionality

### A. Academic Support & Study Vault
* **Study Material Vault (`/study`, `/study/subject/:subject`)**: Departmental repository allowing students to filter, search, bookmark, and download past exam papers, lecture notes, and revision slides.
* **Material Upload & Request Management (`/admin/upload-material`, `/admin/material-requests`)**: Students can request specific course papers, while moderators verify uploads, tag subjects, and attach downloadable files.
* **Ask a Senior Q&A (`/ask-senior`, `/ask-senior/:id`)**: Structured peer Q&A platform where students post questions tagged by subject/topic. Senior students provide verified answers, with upvoting and response counts.

### B. Cohort Communities & Communication
* **Cohort Communities & Chat Rooms (`/community`, `/community/:id/chat`)**: Dedicated group hubs for academic departments, class cohorts, and campus societies featuring real-time chat, member lists, and study room entry.
* **Lecturer AMAs (`/community/:id/ama`, `/community/:id/ama/:sessionId`)**: Live Ask-Me-Anything sessions scheduled by faculty. Students submit questions, upvote top queries, and follow lecturer replies in real time.
* **Direct Messaging (`/messages`, `/messages/:partnerId`)**: Private, one-on-one real-time conversation threads between student peers.

### C. Real-Time Collaboration & Events
* **Live Study Rooms (`/live`, `/live/:id`, `/community/:id/room`)**: Virtual rooms equipped with chat, focus timers, and participant lists for synchronous group study sessions.
* **Campus Events & Exam Countdown (`/events`, `ExamCountdown.tsx`)**: Campus event calendar with event categorization, participation triggers, and an embedded countdown widget keeping students aware of upcoming test dates.
* **Interactive Campus Map (`/campus-map`)**: Visual map interface featuring custom pin categories (lecture halls, libraries, dining centers, administration) to help students navigate campus grounds.

### D. Security, PWA & Admin Controls
* **$0 Proof-of-Ownership Password Recovery (`/forgot-password`)**: A 3-step security wizard (`get_password_recovery_challenge` & `verify_password_recovery_challenge` RPCs). Evaluates 3 dynamic questions based on database activity (joined communities, saved subjects, account creation date). Queues verified requests for 1-click admin approval via a Resend API Edge Function (`admin-approve-password-reset`).
* **Mobile-First PWA (`InstallBanner.tsx`, `OnboardingCarousel.tsx`)**: Full Progressive Web App featuring offline caching, swipe gesture onboarding, and safe-area inset navigation.
* **Moderation & Control Center (`/admin`, `/moderation`)**: Comprehensive administrative suite with live notification badges for pending reports, material requests, and password reset approvals.

---

## 5. Key User Flows

### Flow 1: Finding & Downloading Past Exam Papers
1. Student lands on home screen and taps the **Study** icon on the bottom navigation bar.
2. Selects their department (e.g., *Computer Science*) and specific course code.
3. Filters by material type (*Past Papers*) and views verified uploads.
4. Bookmarks the paper to their profile for offline reference or downloads the document directly.

### Flow 2: Participating in a Lecturer AMA Session
1. Student opens their department community hub (`/community/cs-dept`).
2. Taps the **Lecturer AMAs** tab and sees an upcoming live session: *"CS201 Data Structures Q&A with Dr. Banda"*.
3. Submits a question (*"Will B-Trees be covered in the midterm?"*) or upvotes high-priority questions asked by classmates.
4. Follows live answers as the lecturer marks questions as answered during the scheduled session.

### Flow 3: Requesting & Approving a Password Reset ($0 Security)
1. User locks themselves out and taps **Forgot Password?** on the login page.
2. Enters their registered email and answers a 3-question identity quiz generated from their account history.
3. Upon achieving a score $\ge 2/3$, the system queues the request as `verified_pending_admin`.
4. An admin opens the Admin Dashboard, sees `Resets (1)` badge, verifies `Score: 3/3`, and clicks **Approve**, triggering a single Resend API email with a secure reset link.

---

## 6. Tech Stack Summary

* **Frontend Framework**: React 19, TypeScript, Vite.
* **Styling & Aesthetics**: Tailwind CSS v4, Lucide React Icons (`lucide-react`), Sonner (toasts).
* **State Management & Caching**: TanStack React Query (`@tanstack/react-query`), Zustand.
* **Backend & Database**: Supabase (`@supabase/supabase-js`) for Postgres DB, Auth, Realtime WebSocket subscriptions, and Row-Level Security (RLS).
* **Email & Serverless Functions**: Supabase Edge Functions (Deno runtime) paired with Resend API for transactional emails.
* **PWA Engine**: `vite-plugin-pwa`, Workbox (`workbox-core`, `workbox-precaching`), IndexedDB (`idb`).

---

## 7. Brand Identity & Voice

* **Brand Palette**:
  * `--wave-primary`: `#1E88E5` (Vibrant Wave Blue)
  * `--wave-primary-dark`: `#0D3B66` (Deep Navy)
  * `--wave-accent-needle`: `#FF6D00` (Compass Amber)
  * `--wave-mark-fill`: `#FFFFFF` (Pure White)
* **Tagline**: *Connect. Learn. Interact.*
* **Tone & Personality**: Energetic, academic, supportive, and accessible. Wave balances academic productivity with vibrant campus social life.
* **Master Mark DNA**: Utilizes the shared Warren compass-and-chat-bubble geometry, distinguished by its signature bright blue hue (`#1E88E5`).

---

## 8. Position in the Warren Ecosystem

Within The Warren suite, Wave functions as the **Academic & Social Core**:

```
                  ┌───────────────────────────────┐
                  │    THE WARREN ECOSYSTEM       │
                  └──────────────┬────────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
 ┌───────▼───────┐       ┌───────▼───────┐       ┌───────▼───────┐
 │    PLAWZA     │       │     WAVE      │       │     WEAVE     │
 │  (Teal/Commerce)      │  (Blue/Academic)      │(Orange/Culture)│
 │ Places, Housing,      │ Connect, Learn,       │ Stories, News,│
 │ Marketplace           │ Interact, AMAs        │ Podcasts, Blog│
 └───────────────┘       └───────────────┘       └───────────────┘
```

* **Wave vs. Plawza**: Plawza handles physical transactions (finding apartments, buying textbooks, local business listings). Wave handles intellectual and social interactions (discussing course content, chatting in cohort rooms, joining study sessions).
* **Wave vs. Weave**: Weave handles broadcasting campus culture, editorial blogs, and podcasts. Wave handles daily student communication, direct messaging, and exam preparation.

---

## 9. Unique Value Proposition

> **"Wave is the only university portal that merges departmental study paper vaults, live lecturer Q&As, and cohort chat rooms into a single zero-latency PWA built specifically for African student life."**

---

## 10. Sample Use-Case Stories

### Story 1: Chileshe's First Week on Campus
*Chileshe, a first-year Mining Engineering student, feels overwhelmed navigating the expansive campus. He opens Wave, taps the **Campus Map**, and gets turn-by-turn room coordinates to his chemistry lab. Later that night, he joins the **Mining Eng '28** cohort chat room to discover recommended textbooks.*

### Story 2: Mutinta's Midterm Panic
*Two days before her Computer Science exam, Mutinta opens Wave's **Study Vault**, filters by her subject code, and downloads three years of verified past papers. When she gets stuck on a recursion algorithm, she posts in **Ask a Senior** and receives an annotated solution from a 4th-year student within 20 minutes.*

### Story 3: Dr. Kasonde's Virtual AMA
*Dr. Kasonde, a Senior Physics Lecturer, wants to hold revision office hours without booking an overcrowded hall. He schedules a 45-minute **Lecturer AMA** on Wave. Over 150 students tune in, upvoting the toughest exam questions for Dr. Kasonde to address sequentially.*

---

## 11. Talking Points & FAQ for Hosts / Interviewers

1. **Q: What is Wave in one sentence?**  
   *A: Wave is the academic and social hub of The Warren ecosystem, giving university students instant access to study materials, senior advice, live study rooms, and cohort chats.*

2. **Q: How does Wave fit into The Warren app suite?**  
   *A: While Plawza handles campus marketplace/housing and Weave handles student media/blogs, Wave is the daily operational engine where students study, message, and interact.*

3. **Q: What problem does Wave solve for freshers?**  
   *A: Freshers often struggle with campus navigation and finding course past papers. Wave provides an interactive campus map and a centralized study material vault on day one.*

4. **Q: How do Lecturer AMAs work?**  
   *A: Faculty members schedule dedicated Q&A windows. Students submit questions and upvote peer queries so lecturers can address the most pressing doubts first.*

5. **Q: What is the "Ask a Senior" feature?**  
   *A: It's an internal mentorship forum where junior students post academic or career questions, and upper-year seniors answer to earn karma and community badges.*

6. **Q: Does Wave require downloading an app from the Google Play or Apple App Store?**  
   *A: No, Wave is a Progressive Web App (PWA). Students can add it directly to their home screen from any web browser with 1 tap.*

7. **Q: How does Wave handle offline or slow campus Wi-Fi?**  
   *A: Wave utilizes Workbox precaching and Service Workers to store cached past papers and basic UI assets locally.*

8. **Q: What is the $0 Proof-of-Ownership password recovery system?**  
   *A: To prevent cloud email quota exhaustion, Wave asks locked-out users 3 dynamic questions about their account activity. Verified requests are queued for 1-click admin approval via Resend API.*

9. **Q: Can students form private group study rooms?**  
   *A: Yes, Wave features Live Study Rooms equipped with group chat and focus timers for synchronous study sessions.*

10. **Q: How are study materials moderated?**  
    *A: Student uploads go through a verification queue where moderators check document legibility, correct subject tags, and staff verification flags before public publishing.*

11. **Q: What is the color identity of Wave?**  
    *A: Wave's brand color is Vibrant Blue (`#1E88E5`), representing clarity, intellect, and connection, paired with the shared Warren compass logo.*

12. **Q: How does Wave keep students informed about test dates?**  
    *A: Wave embeds an Exam Countdown widget right on the main community dashboard, giving live day-by-day readouts for upcoming department tests.*

---

## 12. Suggested Podcast / Content Angles

1. **"Ending the Past Paper Scramble: How Wave Centralizes University Revision"**  
   *Pitch: A deep dive into how Wave replaced messy Google Drive folders with a verified departmental study vault.*

2. **"Democratizing Mentorship: Inside Wave's 'Ask a Senior' Hub"**  
   *Pitch: Exploring how lower-year students get instant academic advice from senior mentors without social friction.*

3. **"Lecturers Go Live: The Rise of Virtual Campus AMAs"**  
   *Pitch: How faculty members use Wave to host structured office hours for 100+ students simultaneously.*

4. **"Zero-Dollar Engineering: Building a High-Scale Campus App Without Cloud Bills"**  
   *Pitch: An insider look at how Wave built proof-of-ownership security and PWA caching to run under free-tier limits.*

5. **"The Warren Ecosystem Explained: Three Apps, One Campus Identity"**  
   *Pitch: How Plawza (Teal), Wave (Blue), and Weave (Orange) divide and conquer campus life.*
