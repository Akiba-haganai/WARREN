export type Tier = "bronze" | "silver" | "gold" | "platinum";

export function getTier(karma: number): Tier {
  if (karma >= 1000) return "platinum";
  if (karma >= 500) return "gold";
  if (karma >= 100) return "silver";
  return "bronze";
}

export const TIER_COLORS: Record<Tier, string> = {
  bronze: "#CD7F32",
  silver: "#A8A9AD",
  gold: "#FFD700",
  platinum: "#E5E4E2",
};