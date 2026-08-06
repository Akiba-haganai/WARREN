export interface GradientPreset {
  id: string;
  name: string;
  gradientClass: string;
  previewBg: string;
}

export const COMMUNITY_GRADIENTS: GradientPreset[] = [
  {
    id: "oceanic-depth",
    name: "Oceanic Depth",
    gradientClass: "from-blue-600 via-cyan-600 to-teal-500",
    previewBg: "bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500",
  },
  {
    id: "sunset-blaze",
    name: "Sunset Blaze",
    gradientClass: "from-rose-500 via-purple-600 to-indigo-700",
    previewBg: "bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-700",
  },
  {
    id: "cyber-violet",
    name: "Cyber Violet",
    gradientClass: "from-violet-600 via-purple-600 to-pink-600",
    previewBg: "bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600",
  },
  {
    id: "emerald-aurora",
    name: "Emerald Aurora",
    gradientClass: "from-emerald-600 via-teal-600 to-cyan-700",
    previewBg: "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700",
  },
  {
    id: "solar-flare",
    name: "Solar Flare",
    gradientClass: "from-amber-500 via-orange-600 to-red-600",
    previewBg: "bg-gradient-to-r from-amber-500 via-orange-600 to-red-600",
  },
  {
    id: "midnight-blue",
    name: "Midnight Blue",
    gradientClass: "from-indigo-700 via-blue-700 to-cyan-600",
    previewBg: "bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-600",
  },
  {
    id: "neon-crimson",
    name: "Neon Crimson",
    gradientClass: "from-red-600 via-rose-600 to-pink-600",
    previewBg: "bg-gradient-to-r from-red-600 via-rose-600 to-pink-600",
  },
  {
    id: "electric-forest",
    name: "Electric Forest",
    gradientClass: "from-teal-600 via-emerald-600 to-lime-600",
    previewBg: "bg-gradient-to-r from-teal-600 via-emerald-600 to-lime-600",
  },
];

/**
 * Normalizes stored cover_color strings into sharp, vibrant Tailwind gradient classes.
 * Handles hex codes, missing colors, legacy pastels, and standard Tailwind gradient strings.
 */
export function getCommunityGradient(coverColor?: string | null, seedKey: string = "default"): string {
  if (!coverColor) {
    return getDeterministicGradient(seedKey);
  }

  const trimmed = coverColor.trim();

  // If it's a hex code, missing, or old washed-out 200-level pastel, upgrade to a vibrant 3-color preset
  if (trimmed.startsWith("#") || trimmed.includes("-200") || !trimmed.startsWith("from-")) {
    return getDeterministicGradient(seedKey + trimmed);
  }

  return trimmed;
}

/**
 * Deterministically pick a gradient preset based on a string seed (e.g. community ID or name).
 */
export function getDeterministicGradient(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % COMMUNITY_GRADIENTS.length;
  return COMMUNITY_GRADIENTS[index].gradientClass;
}
