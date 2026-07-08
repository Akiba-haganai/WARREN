import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import type { CommunityMessageWithProfile } from "../../../services/communityChatService";

interface Props {
  messages: CommunityMessageWithProfile[];
  loading: boolean;
  currentUserId?: string;
  readIds: Set<string>;
  onReply: (msgId: string) => void;
  onFetchPoll: (pollId: string) => Promise<any>;
  emptyText?: string;
}

export function ChatMessages({
  messages,
  loading,
  currentUserId,
  readIds,
  onReply,
  onFetchPoll,
  emptyText = "No messages yet",
}: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-16 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
        ))}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <span className="text-4xl mb-3">💬</span>
        <p className="font-semibold text-slate-500">{emptyText}</p>
        <p className="text-xs text-slate-400">Start the conversation!</p>
      </div>
    );
  }

  return (
    <>
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          isMine={msg.user_id === currentUserId}
          readIds={readIds}
          onReply={onReply}
          onFetchPoll={onFetchPoll}
        />
      ))}
      <div ref={messagesEndRef} />
    </>
  );
}