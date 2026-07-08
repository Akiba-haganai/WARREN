# TODO

## StudyRoom mobile-first UX upgrades
- [x] Update `src/features/rooms/components/StudyRoom.tsx`:
- [x] Pre-join screen: community name + participant count + CTA
- [x] Participant avatars (initials) and skeletons
  - [x] Fixed bottom bar call controls (48x48 touch targets, active:scale-95)
  - [x] Call duration timer (mm:ss)
  - [x] Friendly mic error fallback UI
  - [x] Dark mode compatibility
- [ ] Optionally update `src/features/rooms/hooks/useWebRTC.ts` (minimal API additions only):
  - [ ] Expose `micError` state (typed/normalized)
  - [ ] Add `isSpeakerOn` + `toggleSpeaker` placeholder (UI state only)
- [ ] Validate TypeScript build

