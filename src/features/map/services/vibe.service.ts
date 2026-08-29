import { supabase } from "../../../lib/supabase";

export type NoiseLevel = "quiet" | "chatty" | "loud";
export type CrowdLevel = "empty" | "moderate" | "packed";

export type VibeSummary = {
  noise_level: NoiseLevel;
  crowd_level: CrowdLevel;
  report_count: number;
};

const ACTIVE_WINDOW_MINUTES = 90;

function mode<T extends string>(values: T[]): T {
  const counts = new Map<T, number>();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  let best = values[0];
  let bestCount = 0;
  for (const [v, c] of counts) {
    if (c > bestCount) {
      best = v;
      bestCount = c;
    }
  }
  return best;
}

// Aggregates all reports still inside the 90-minute window into a single
// majority-vote summary. Plain SELECT with a timestamp filter — no
// realtime channel, no polling beyond whatever React Query does on its own.
export async function fetchActiveVibe(pinId: string): Promise<VibeSummary | null> {
  const cutoff = new Date(Date.now() - ACTIVE_WINDOW_MINUTES * 60 * 1000).toISOString();
  const { data, error } = await supabase
    .from("pin_vibe_reports")
    .select("noise_level, crowd_level")
    .eq("pin_id", pinId)
    .gte("reported_at", cutoff);
  if (error) throw error;
  if (!data?.length) return null;

  return {
    noise_level: mode(data.map((d) => d.noise_level as NoiseLevel)),
    crowd_level: mode(data.map((d) => d.crowd_level as CrowdLevel)),
    report_count: data.length,
  };
}

export async function fetchMyVibeReport(pinId: string, userId: string) {
  const { data, error } = await supabase
    .from("pin_vibe_reports")
    .select("noise_level, crowd_level, reported_at")
    .eq("pin_id", pinId)
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

// Upsert on (pin_id, user_id) — the same person reporting again just
// refreshes their own row/timestamp instead of adding a duplicate.
export async function reportVibe(userId: string, pinId: string, noiseLevel: NoiseLevel, crowdLevel: CrowdLevel) {
  const { error } = await supabase.from("pin_vibe_reports").upsert(
    {
      pin_id: pinId,
      user_id: userId,
      noise_level: noiseLevel,
      crowd_level: crowdLevel,
      reported_at: new Date().toISOString(),
    },
    { onConflict: "pin_id,user_id" }
  );
  if (error) throw error;
}
