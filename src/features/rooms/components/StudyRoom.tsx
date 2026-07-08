import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppShell from "../../../components/layout/AppShell";
import { useWebRTC } from "../hooks/useWebRTC";

import { ArrowLeft, Mic, MicOff, PhoneOff, Phone, Users, Volume2, Loader2 } from "lucide-react";
import { supabase } from "../../../lib/supabase";

function formatDuration(totalSeconds: number) {
  const mm = Math.floor(totalSeconds / 60);
  const ss = totalSeconds % 60;
  return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

export default function StudyRoom() {
  const { id: roomId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    isJoined,
    participants,
    isMuted,
    joinRoom,
    leaveRoom,
    toggleMute,
    micError,
    isSpeakerOn,
    toggleSpeaker,
  } = useWebRTC(roomId!);

  const [communityName, setCommunityName] = useState<string>("Study Room");
  const [callDuration, setCallDuration] = useState(0);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }: any) => {
      setCurrentUserId(data.user?.id ?? null);
    });
  }, []);

  // Fetch community name (same pattern as CommunityChatPage)
  useEffect(() => {
    if (!roomId) return;
    import("../../communities/services/communities.service").then(async (mod) => {
      const all = await mod.fetchCommunities();
      const found = all.find((c) => c.id === roomId);
      if (found?.name) setCommunityName(found.name);
    });
  }, [roomId]);

  useEffect(() => {
    if (!isJoined) return;
    const interval = window.setInterval(() => {
      setCallDuration((d) => d + 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isJoined]);

  useEffect(() => {
    if (!isJoined) setCallDuration(0);
  }, [isJoined]);

  const participantInitials = useMemo(() => {
    return (id: string) => {
      if (currentUserId && id === currentUserId) return "You";
      return id
        .split(/[^a-zA-Z0-9]/)
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase())
        .join("");
    };
  }, [currentUserId]);

  const subtitle = useMemo(() => {
    const count = participants.length;
    if (!isJoined) return `${count} participant(s) inside`;
    return count === 0 ? "Connecting..." : `${count} participant(s) inside`;
  }, [participants.length, isJoined]);

  return (
    <AppShell>
      <div className="h-dvh flex flex-col">
        {/* Top */}
        <div className="shrink-0 p-4">
          <div className="flex items-center justify-between gap-3 mb-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>

            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <Users size={18} className="opacity-90" />
              <span className="text-sm font-semibold">{participants.length} inside</span>
            </div>
          </div>

          {isJoined ? (
            <div className="flex items-center justify-between">
              <h1 className="text-base font-bold truncate">{communityName}</h1>
              <div className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold">
                {formatDuration(callDuration)}
              </div>
            </div>
          ) : (
            <div className="hidden" />
          )}
        </div>

        {/* Main */}
        <div className="flex-1 overflow-y-auto px-4">
          {!isJoined ? (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mb-6 shadow-lg">
                <Phone size={36} className="text-white" />
              </div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">{communityName}</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>

              <button
                onClick={joinRoom}
                className="mt-8 px-8 py-4 bg-green-600 text-white rounded-full font-bold shadow-lg active:scale-95 transition-transform min-h-[48px] min-w-[120px]"
              >
                Join Room
              </button>

              {micError && (
                <div className="mt-4 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm text-center w-full rounded-xl">
                  Microphone access is required. Please allow mic permission in your browser settings.
                </div>
              )}
            </div>
          ) : (
            <>
              {micError && (
                <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm text-center w-full rounded-xl mb-4">
                  Microphone access is required. Please allow mic permission in your browser settings.
                </div>
              )}

              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Participants</h2>
                <span className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</span>
              </div>

              {participants.length === 0 ? (
                <div className="flex flex-wrap gap-3 justify-center mb-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 w-12">
                      <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
                      <div className="w-10 h-2 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-3 justify-center mb-6">
                  {participants.map((userId) => {
                    const isYou = currentUserId && userId === currentUserId;
                    return (
                      <div key={userId} className="flex flex-col items-center gap-1 min-w-[72px]">
                        <div
                          className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold text-lg shadow"
                          aria-label={isYou ? "You" : "Participant"}
                        >
                          {isYou ? "You" : participantInitials(userId) || userId.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[60px]">
                          {isYou ? "You" : "Participant"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex items-center justify-center py-8">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <Loader2 className="animate-spin" size={18} />
                  <span className="text-sm">Connected. Your voice room is live.</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Bottom call controls (mobile-first) */}
        {isJoined && (
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-around py-3 px-4 max-w-lg mx-auto">
              <button
                onClick={toggleMute}
                className={`w-[48px] h-[48px] flex items-center justify-center rounded-full active:scale-95 transition-transform ${
                  isMuted
                    ? "bg-red-100 dark:bg-red-900/30 text-red-600"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200"
                }`}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
              </button>

              <button
                onClick={leaveRoom}
                className="w-[56px] h-[56px] flex items-center justify-center rounded-full bg-red-600 text-white shadow-lg active:scale-95 transition-transform"
                aria-label="Leave room"
              >
                <PhoneOff size={24} />
              </button>

              <button
                onClick={toggleSpeaker}
                className={`w-[48px] h-[48px] flex items-center justify-center rounded-full active:scale-95 transition-transform ${
                  isSpeakerOn
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200"
                }`}
                aria-label="Toggle speaker"
              >
                <Volume2 size={22} />
              </button>
            </div>
            <div className="h-[env(safe-area-inset-bottom)]" />
          </div>
        )}
      </div>
    </AppShell>
  );
}

