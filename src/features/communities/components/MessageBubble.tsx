import { useState, useEffect } from "react";
import { FilePreviewCard } from "./FilePreviewCard";
import { PollCard } from "./PollCard";
import type { CommunityMessageWithProfile } from "../../../services/communityChatService";

interface Props {
  message: (CommunityMessageWithProfile & { is_announcement?: boolean; file_name?: string; poll_id?: string | null })
  isMine: boolean;
  readIds?: Set<string>;
  onReply?: (msgId: string) => void;
  onFetchPoll: (pollId: string) => Promise<any>;
}

export function MessageBubble({ message, isMine, readIds, onReply, onFetchPoll }: Props) {
  const username = message.profiles?.username ?? "Anonymous";
  const avatar = message.profiles?.avatar_url;
  const role = message.profiles?.role;
  const time = new Date(message.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Poll message
  if (message.type === "poll" && message.poll_id) {
    return <PollMessage pollId={message.poll_id} onFetchPoll={onFetchPoll} />;
  }

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"} mb-2`}>
      <div className={`max-w-[80%] ${isMine ? "order-2" : "order-1"}`}>
        {!isMine && (
          <div className="flex items-center gap-1 mb-0.5">
            {avatar ? (
              <img src={avatar} className="w-5 h-5 rounded-full object-cover" alt={username} />
            ) : (
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center text-[10px] font-bold">
                {username[0]?.toUpperCase()}
              </div>
            )}
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{username}</span>
            {role && role !== "student" && (
              <span className="text-[10px] px-1 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700">{role}</span>
            )}
          </div>
        )}
        <div
          className={`p-2.5 rounded-2xl text-sm ${
            isMine
              ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-br-md"
              : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-md"
          }`}
        >
          {message.parent_id && (
            <div className="text-xs italic opacity-70 mb-1">In reply to a message</div>
          )}
          {message.type === "text" && <p>{message.content}</p>}
          {message.type === "image" && message.image_url && (
            <img src={message.image_url} alt="Shared" className="rounded-lg max-h-48 w-full object-cover" />
          )}
          {message.type === "gif" && message.image_url && (
            <img src={message.image_url} alt="GIF" className="rounded-lg max-h-48 w-full object-cover" />
          )}
          {message.type === "file" && message.file_url && (
            <FilePreviewCard url={message.file_url} name={message.file_name || "file"} />
          )}
          {message.type === "voice" && message.voice_url && (
            <audio controls className="max-w-full mt-1"><source src={message.voice_url} /></audio>
          )}
          <div className={`text-[10px] mt-1 ${isMine ? "text-blue-200" : "text-slate-400"}`}>
            {time}
            {isMine && readIds?.has(message.id) && <span className="ml-1">✓ Seen</span>}
          </div>
        </div>
        {!isMine && onReply && (
          <button onClick={() => onReply(message.id)} className="text-[10px] text-blue-600 ml-1 mt-0.5">Reply</button>
        )}
      </div>
    </div>
  );
}

// Poll message inline component
function PollMessage({ pollId, onFetchPoll }: { pollId: string; onFetchPoll: (pollId: string) => Promise<any> }) {
  const [pollData, setPollData] = useState<any>(null);
  useEffect(() => { onFetchPoll(pollId).then(setPollData); }, [pollId, onFetchPoll]);
  if (!pollData) return null;
  return <PollCard poll={pollData} />;
}