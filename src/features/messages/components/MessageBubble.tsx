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