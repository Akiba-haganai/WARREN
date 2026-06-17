export default function PostCardSkeleton() {
  return (
    <div
      className="
        bg-white
        dark:bg-slate-900
        border
        border-slate-200
        dark:border-slate-800
        rounded-3xl
        overflow-hidden
        animate-pulse
        shadow-sm
      "
    >
      <div className="p-5">
        <div className="flex items-center gap-3">
          <div
            className="
              h-11
              w-11
              rounded-full
              bg-slate-200
              dark:bg-slate-800
              shrink-0
            "
          />

          <div className="flex-1">
            <div
              className="
                h-4
                w-32
                rounded
                bg-slate-200
                dark:bg-slate-800
                mb-2
              "
            />

            <div
              className="
                h-3
                w-20
                rounded
                bg-slate-200
                dark:bg-slate-800
              "
            />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div
            className="
              h-4
              rounded
              bg-slate-200
              dark:bg-slate-800
            "
          />

          <div
            className="
              h-4
              rounded
              bg-slate-200
              dark:bg-slate-800
            "
          />

          <div
            className="
              h-4
              w-3/4
              rounded
              bg-slate-200
              dark:bg-slate-800
            "
          />
        </div>
      </div>

      <div
        className="
          aspect-[4/3]
          bg-slate-200
          dark:bg-slate-800
        "
      />

      <div className="p-4">
        <div className="grid grid-cols-5 gap-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="
                h-11
                rounded-2xl
                bg-slate-200
                dark:bg-slate-800
              "
            />
          ))}
        </div>
      </div>
    </div>
  );
}