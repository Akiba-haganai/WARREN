import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppShell from "../../components/layout/AppShell";
import { useAuthStore } from "../../store/authStore";
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
  const [communityName, setCommunityName] = useState("Chat");

  const channelRef = useRef<ReturnType<typeof subscribeToMessages> | null>(null);

  // Fetch community name
  useEffect(() => {
    if (!communityId) return;
    import("../../features/communities/services/communities.service").then(({ fetchCommunities }) => {
      fetchCommunities().then((all) => {
        const found = all.find((c) => c.id === communityId);
        if (found) setCommunityName(found.name);
      });
    });
  }, [communityId]);

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
      setMessages((prev) => [...prev, newMsg]);
    });
    return () => { channelRef.current?.unsubscribe(); };
  }, [communityId]);

  // Mark as read
  useEffect(() => {
    if (!communityId || !user || messages.length === 0) return;
    markMessagesAsRead(communityId, user.id);
  }, [communityId, user, messages]);

  // Read receipts
  useEffect(() => {
    if (!user) return;
    supabase
      .from("message_reads")
      .select("message_id")
      .eq("user_id", user.id)
      .then(({ data }) => setReadIds(new Set((data ?? []).map((r) => r.message_id))));
  }, [user, messages]);

  // Handlers
  const handleSend = async () => {
    if (!newMsg.trim() || !user || !communityId) return;
    setSending(true);
    try {
      await notifyMentions(user.id, newMsg.trim());
      await sendTextMessage(communityId, user.id, newMsg.trim(), replyingTo?.id, isAnnouncement);
      setNewMsg("");
      setReplyingTo(null);
      setIsAnnouncement(false);
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
          canAnnounce={user?.role === "admin" || user?.role === "moderator"}
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