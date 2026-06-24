// src/components/ads/FeedAd.tsx

/**
 * Ad unit for the home feed.
 *
 * Replace the placeholder div with your real AdSense <ins> snippet
 * once your account is approved and you have the ad unit code.
 *
 * Example:
 *   <ins className="adsbygoogle"
 *        style={{ display: "block" }}
 *        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
 *        data-ad-slot="1234567890"
 *        data-ad-format="auto"
 *        data-full-width-responsive="true" />
 *   <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
 */

export default function FeedAd() {
  return (
    <div className="my-4 rounded-2xl overflow-hidden bg-white/70 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/70 p-3 flex items-center justify-center min-h-[100px]">
      <span className="text-xs text-slate-400 dark:text-slate-500 select-none">
        Ad
      </span>
    </div>
  );
}