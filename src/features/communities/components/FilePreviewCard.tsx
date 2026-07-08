interface Props {
  url: string;
  name: string;
}

export function FilePreviewCard({ url, name }: Props) {
  const ext = name.split(".").pop()?.toLowerCase();
  const icon =
    ext === "pdf" ? "📕" :
    ext === "doc" || ext === "docx" ? "📄" :
    ext === "ppt" || ext === "pptx" ? "📊" :
    "📁";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-800 rounded-xl"
    >
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-xs font-medium truncate max-w-[200px]">{name}</p>
        <p className="text-[10px] text-blue-600">Download</p>
      </div>
    </a>
  );
}