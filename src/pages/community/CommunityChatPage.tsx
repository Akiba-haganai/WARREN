import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AppShell from "../../components/layout/AppShell";
import { useAuthStore } from "../../store/authStore";
import { useUserRole } from "../../hooks/useUserRole";
import {
  fetchMessages,
  sendTextMessage,
  sendImageMessage,
  uploadChatImage,
  subscribeToMessages,
  markMessagesAsRead,
  notifyMentions,
  createPoll,
  fetchPoll,
  type CommunityMessageWithProfile,
} from "../../services/communityChatService";
import { useToastStore } from "../../store/toastStore";
import { ChatHeader } from "../../features/communities/components/ChatHeader";
import { ChatMessages } from "../../features/communities/components/ChatMessages";
import { ChatInput } from "../../features/communities/components/ChatInput";
import { ShareMaterialModal } from "../../features/communities/components/ShareMaterialModal";
import { CreatePollForm } from "../../features/communities/components/CreatePollForm";
import { MentionsDropdown } from "../../features/communities/components/MentionsDropdown";
import { supabase } from "../../lib/supabase";
import type { StudyMaterial } from "../../features/study/services/study.service";

export default function CommunityChatPage() {
  const { id: communityId } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const { role } = useUserRole();
  const { showToast } = useToastStore();

  const [messages, setMessages] = useState<CommunityMessageWithProfile[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [showShareMaterial, setShowShareMaterial] = useState(false);
  const [showPollForm, setShowPollForm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAnnouncementsOnly, setShowAnnouncementsOnly] = useState(false);
  const [isAnnouncement, setIsAnnouncement] = useState(false);
  const [replyingTo, setReplyingTo] = useState<{ id: string; username: string } | null>(null);
  const [mentionQuery, setMentionQuery] = useState<string | null>(null);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const channelRef = useRef<ReturnType<typeof subscribeToMessages> | null>(null);

  // Fix #4: fetch just the community name — one row, not the entire table.
  const { data: communityNameData } = useQuery({
    queryKey: ["communityName", communityId],
    queryFn: async () => {
      const { data } = await supabase
        .from("communities")
        .select("name")
        .eq("id", communityId!)
        .single();
      return data?.name ?? "Chat";
    },
    enabled: !!communityId,
    staleTime: Infinity, // community names don't change during a session
  });
  const communityName = communityNameData ?? "Chat";

  // Fetch messages
  useEffect(() => {
    if (!communityId || !user) return;
    setLoading(true);
    fetchMessages(communityId)
      .then((msgs) => { setMessages(msgs); setLoading(false); })
      .catch(console.error);
  }, [communityId, user]);

  // Realtime subscription
  useEffect(() => {
    if (!communityId) return;
    channelRef.current = subscribeToMessages(communityId, (newMsg) => {
      setMessages((prev) => {
        const existsIndex = prev.findIndex((m) => m.id === newMsg.id);
        if (existsIndex >= 0) {
          const next = [...prev];
          next[existsIndex] = { ...newMsg, status: "sent" } as any;
          return next;
        }
        return [...prev, { ...newMsg, status: "sent" } as any];
      });
    });
    return () => { channelRef.current?.unsubscribe(); };
  }, [communityId]);

  // Mark as read
  useEffect(() => {
    if (!communityId || !user || messages.length === 0) return;
    markMessagesAsRead(communityId, user.id);
  }, [communityId, user, messages]);

  // Fix #8: only re-fetch read receipts when the user or community changes,
  // NOT on every incoming message. Previously `messages` was in the dep array,
  // causing a Supabase round-trip every time realtime pushed a new message.
  useEffect(() => {
    if (!user || !communityId) return;
    supabase
      .from("message_reads")
      .select("message_id")
      .eq("user_id", user.id)
      .then(({ data }) => setReadIds(new Set((data ?? []).map((r) => r.message_id))));
  }, [user?.id, communityId]);

  // Handlers
  const handleSend = async () => {
    if (!newMsg.trim() || !user || !communityId) return;
    setSending(true);
    
    const content = newMsg.trim();
    const tempId = crypto.randomUUID();
    
    const optimisticMsg: CommunityMessageWithProfile & { status: "pending" } = {
      id: tempId,
      community_id: communityId,
      user_id: user.id,
      content,
      type: "text",
      parent_id: replyingTo?.id ?? null,
      is_announcement: isAnnouncement,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      profiles: {
        username: user.user_metadata?.username ?? "You",
        avatar_url: user.user_metadata?.avatar_url ?? null,
        role: role as any,
      },
      status: "pending",
    } as any;
    
    setMessages(prev => [...prev, optimisticMsg]);
    setNewMsg("");
    setReplyingTo(null);
    setIsAnnouncement(false);

    try {
      await notifyMentions(user.id, content);
      await sendTextMessage(
        communityId, 
        user.id, 
        content, 
        optimisticMsg.parent_id || undefined, 
        optimisticMsg.is_announcement || false, 
        "text", 
        tempId
      );
      
      setMessages(prev => {
        const next = [...prev];
        const idx = next.findIndex(m => m.id === tempId);
        if (idx >= 0) next[idx] = { ...next[idx], status: "sent" } as any;
        return next;
      });
    } catch (err) {
      console.error(err);
      setMessages(prev => {
        const next = [...prev];
        const idx = next.findIndex(m => m.id === tempId);
        if (idx >= 0) next[idx] = { ...next[idx], status: "error" } as any;
        return next;
      });
      showToast("Failed to send message", "err");
    } finally {
      setSending(false);
    }
  };

  const handleRetry = async (messageId: string) => {
    const msgToRetry = messages.find(m => m.id === messageId);
    if (!msgToRetry || !user || !communityId) return;
    
    setMessages(prev => {
      const next = [...prev];
      const idx = next.findIndex(m => m.id === messageId);
      if (idx >= 0) next[idx] = { ...next[idx], status: "pending" } as any;
      return next;
    });

    try {
      await sendTextMessage(
        communityId, 
        user.id, 
        msgToRetry.content || "", 
        msgToRetry.parent_id || undefined, 
        msgToRetry.is_announcement || false, 
        "text", 
        messageId
      );
      setMessages(prev => {
        const next = [...prev];
        const idx = next.findIndex(m => m.id === messageId);
        if (idx >= 0) next[idx] = { ...next[idx], status: "sent" } as any;
        return next;
      });
    } catch (err) {
      console.error(err);
      setMessages(prev => {
        const next = [...prev];
        const idx = next.findIndex(m => m.id === messageId);
        if (idx >= 0) next[idx] = { ...next[idx], status: "error" } as any;
        return next;
      });
      showToast("Failed to retry message", "err");
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

  const handleShareMaterial = (material: StudyMaterial) => {
    const text = `📚 ${material.title} — /study`;
    if (!communityId || !user) return;
    sendTextMessage(communityId, user.id, text);
  };

  const handleCreatePoll = async (question: string, options: string[]) => {
    const poll = await createPoll(communityId!, question, options);
    if (poll) {
      // sendTextMessage supports optional arguments; pass poll.id only if defined by the service signature.
      // Send as poll message: message.type should be "poll" and poll id in content
      await sendTextMessage(communityId!, user!.id, poll.id as any, undefined, false, "poll");

      

    }
  };

  const exportChat = async () => {
    const allMessages = await fetchMessages(communityId!, 1000);
    const text = allMessages.map((m) => `[${new Date(m.created_at).toLocaleTimeString()}] ${m.profiles?.username ?? "Unknown"}: ${m.content}`).join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `chat-${communityId}.txt`; a.click();
  };

  const filteredMessages = searchTerm
    ? messages.filter((m) => m.content?.toLowerCase().includes(searchTerm.toLowerCase()) || m.profiles?.username?.toLowerCase().includes(searchTerm.toLowerCase()))
    : messages;
  const displayedMessages = showAnnouncementsOnly
    ? filteredMessages.filter((m) => (m as any).is_announcement)
    : filteredMessages;

  const handleInputChange = (val: string) => {
    setNewMsg(val);
    // Simple mention detection
    const cursor = val.length;
    const textBeforeCursor = val.slice(0, cursor);
    const match = textBeforeCursor.match(/@(\w*)$/);
    setMentionQuery(match ? match[1] : null);
  };

  const insertMention = (userId: string) => {
    const before = newMsg.slice(0, newMsg.lastIndexOf("@"));
    setNewMsg(before + `<@${userId}> `);
  };

  if (!communityId) return null;

  return (
    <AppShell hideTopNav hideBottomNav>
    <div className="h-dvh flex flex-col">
      <div className="shrink-0">
        <ChatHeader
          communityName={communityName}
          onBack={() => navigate(-1)}
          onToggleSearch={() => setShowSearch(!showSearch)}
          onExport={exportChat}
          onToggleAnnouncements={() => setShowAnnouncementsOnly(!showAnnouncementsOnly)}
          showAnnouncementsOnly={showAnnouncementsOnly}
          onCopyInvite={() => {
            navigator.clipboard.writeText(`${window.location.origin}/community/${communityId}/join`);
            showToast("Invite link copied!", "ok");
          }}
          onVoiceRoom={() => navigate(`/community/${communityId}/room`)}
          onSchedule={() => navigate(`/admin/events/new?community_id=${communityId}`)}
        />
      </div>

      {showSearch && (
        <div className="shrink-0 px-3 pb-2 max-w-lg mx-auto w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search messages..."
            className="w-full px-3 py-1.5 text-sm rounded-xl border bg-slate-50 dark:bg-slate-800"
          />
        </div>
      )}

      {/* Messages list */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-2 space-y-2 max-w-lg mx-auto w-full">
        <ChatMessages
          messages={displayedMessages}
          loading={loading}
          currentUserId={user?.id}
          readIds={readIds}
          onReply={(id) => {
            const parent = messages.find((m) => m.id === id);
            if (parent) setReplyingTo({ id, username: parent.profiles?.username || "User" });
          }}
          onFetchPoll={fetchPoll}
          onRetry={handleRetry}
        />
      </div>

      {/* Composer */}
      <div className="shrink-0 pb-[env(safe-area-inset-bottom)]">
        <ChatInput
          value={newMsg}
          onChange={handleInputChange}
          onSend={handleSend}
          sending={sending}
          onShareMaterial={() => setShowShareMaterial(true)}
          onImageUpload={handleImageUpload}
          onPoll={() => setShowPollForm(true)}
          replyingTo={replyingTo}
          onCancelReply={() => setReplyingTo(null)}
          mentionDropdown={
            mentionQuery !== null ? (
              <MentionsDropdown
                communityId={communityId!}
                query={mentionQuery}
                onSelect={(userId) => insertMention(userId)}
                onClose={() => setMentionQuery(null)}
              />
            ) : null
          }
          isAnnouncement={isAnnouncement}
          onToggleAnnouncement={() => setIsAnnouncement(!isAnnouncement)}
          // Fix #3: use profile-level role from useUserRole() hook.
          // Previously used user?.role which is always "authenticated" (Supabase
          // auth token role), so admins could never post announcements.
          canAnnounce={role === "admin" || role === "moderator"}
        />
      </div>

      <ShareMaterialModal
        open={showShareMaterial}
        onClose={() => setShowShareMaterial(false)}
        onSelect={handleShareMaterial}
      />
      <CreatePollForm
        open={showPollForm}
        onClose={() => setShowPollForm(false)}
        onSubmit={handleCreatePoll}
      />
    </div>
  </AppShell>
);
}