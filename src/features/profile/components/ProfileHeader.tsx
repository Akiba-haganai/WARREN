interface Props {
  avatarUrl: string | null;
  username: string;
}

export function ProfileHeader({ avatarUrl, username }: Props) {
  return (
    <div className="relative">
      <div className="h-36 rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400" />
      <div className="absolute -bottom-10 left-5">
        <div className="h-24 w-24 rounded-full border-4 border-white dark:border-slate-950 bg-white dark:bg-slate-900 shadow-xl flex items-center justify-center">
          {avatarUrl ? (
            <img src={avatarUrl} alt={username} className="h-full w-full rounded-full object-cover" />
          ) : (
            <span className="text-3xl font-bold">{username?.charAt(0).toUpperCase()}</span>
          )}
        </div>
      </div>
    </div>
  );
}