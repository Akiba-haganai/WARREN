// components/ads/FeedAd.tsx

export default function FeedAd() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        dark:border-slate-800
        bg-white
        dark:bg-slate-900
        p-4
        min-h-[140px]
        flex
        items-center
        justify-center
      "
    >
      <div className="text-center">
        <p className="text-xs opacity-50 uppercase">
          Sponsored
        </p>

        <h3 className="font-semibold mt-2">
          Advertisement
        </h3>

        <p className="text-sm opacity-70 mt-1">
          AdSense ad will appear here
          after approval.
        </p>
      </div>
    </div>
  );
}