/**
 * Post cover images — real Ketchikan / Southeast Alaska photos where possible.
 * Wikimedia Commons (CC BY-SA / public domain) + Unsplash Alaska fallbacks.
 */

const UNSPLASH = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?w=1200&h=675&fit=crop&q=80`;

/** Authentic Ketchikan, Alaska (Wikimedia Commons). */
export const KETCHIKAN_IMAGES = {
  /** Creek Street boardwalk & historic waterfront */
  creekStreet:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Ketchikan%2C_AK_-_Creek_Street_including_Dolly%27s_House.jpg/1280px-Ketchikan%2C_AK_-_Creek_Street_including_Dolly%27s_House.jpg",
  creekStreetBoardwalk:
    "https://upload.wikimedia.org/wikipedia/commons/f/f0/Ketchikan%2C_AK_-_Creek_Street_3.jpg",
  creekStreetTotemView:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Ketchikan_Creek_Street_%288110050250%29.jpg/1280px-Ketchikan_Creek_Street_%288110050250%29.jpg",
  downtownTowardsCreekStreet:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Ketchikan%2C_Alaska_towards_Creek_Street.jpg/1280px-Ketchikan%2C_Alaska_towards_Creek_Street.jpg",
  /** Totem poles — Ketchikan cultural landmark */
  totemChiefJohnson:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Chief_Johnson_totem_pole_replica_in_Ketchikan%2C_Alaska.jpg/1280px-Chief_Johnson_totem_pole_replica_in_Ketchikan%2C_Alaska.jpg",
  totemHistoric:
    "https://upload.wikimedia.org/wikipedia/commons/0/06/Chief_Johnson_totem_pole_between_buildings%2C_Ketchikan%2C_Alaska%2C_1929_or_1930_%28AL%2BCA_7192%29.jpg",
  /** Harbor & working waterfront */
  harborFishingBoats:
    "https://upload.wikimedia.org/wikipedia/commons/0/06/Fishing_boats_in_a_harbor%2C_Ketchikan%2C_Alaska%2C_circa_1929-1930_%28AL%2BCA_7241%29.jpg",
  harborWaterfront:
    "https://upload.wikimedia.org/wikipedia/commons/0/0d/Watefront_and_harbor%2C_Ketchikan%2C_July_4%2C_1914_%28AL%2BCA_1138%29.jpg",
  bayWithBoats:
    "https://upload.wikimedia.org/wikipedia/commons/e/ea/Bay_with_boats%2C_Ketchikan%2C_Alaska%2C_1929_or_1930_%28AL%2BCA_7190%29.jpg",
  boatingHarbor:
    "https://upload.wikimedia.org/wikipedia/commons/7/75/20240321-FS-LD-BoatingKetchikan-0002_%2854090118252%29.jpg",
  /** Deer Mountain & downtown */
  deerMountainSkyline:
    "https://upload.wikimedia.org/wikipedia/commons/2/29/Buildings_and_Deer_Mountain%2C_Ketchikan%2C_Alaska%2C_May_20%2C_1930_%28AL%2BCA_7230%29.jpg",
  /** Salmon industry */
  salmonCannery:
    "https://upload.wikimedia.org/wikipedia/commons/0/0e/Alaska_Pacific_Salmon_Cannery_through_trees%2C_Ketchikan%2C_Alaska%2C_1929_or_1930_%28AL%2BCA_7195%29.jpg",
} as const;

/** Southeast Alaska atmosphere (Unsplash) — used when no Ketchikan file fits. */
const ALASKA_UNSPLASH = {
  mistyMountains: UNSPLASH("photo-1506905925346-21bda4d32df4"),
  coastalPeaks: UNSPLASH("photo-1518684079-3c830dcef090"),
  temperateRainforest: UNSPLASH("photo-1441974231531-c6227db76b6e"),
  fishingVessel: UNSPLASH("photo-1516528387618-afa90b13e000"),
  harborBoats: UNSPLASH("photo-1544551763-46a013bb70d5"),
  mountainLake: UNSPLASH("photo-1464822759023-fed622ff2c3b"),
} as const;

const DEFAULT_IMAGE = KETCHIKAN_IMAGES.downtownTowardsCreekStreet;

const CATEGORY_IMAGES: Record<string, string> = {
  Politics: KETCHIKAN_IMAGES.deerMountainSkyline,
  Investigation: ALASKA_UNSPLASH.mistyMountains,
  Community: KETCHIKAN_IMAGES.creekStreetBoardwalk,
  Maritime: KETCHIKAN_IMAGES.harborFishingBoats,
  Education: ALASKA_UNSPLASH.coastalPeaks,
  Events: KETCHIKAN_IMAGES.creekStreetTotemView,
  Food: KETCHIKAN_IMAGES.salmonCannery,
};

/** Rotating Ketchikan scenes for borough assembly coverage. */
const ASSEMBLY_POOL = [
  KETCHIKAN_IMAGES.downtownTowardsCreekStreet,
  KETCHIKAN_IMAGES.creekStreet,
  KETCHIKAN_IMAGES.harborFishingBoats,
  KETCHIKAN_IMAGES.deerMountainSkyline,
  KETCHIKAN_IMAGES.totemChiefJohnson,
  KETCHIKAN_IMAGES.creekStreetTotemView,
  KETCHIKAN_IMAGES.boatingHarbor,
  KETCHIKAN_IMAGES.creekStreetBoardwalk,
  KETCHIKAN_IMAGES.harborWaterfront,
  KETCHIKAN_IMAGES.bayWithBoats,
];

/** Topic keywords → Ketchikan-first image (most specific themes first). */
const THEME_IMAGES: { keywords: string[]; image: string }[] = [
  {
    keywords: ["diesel", "spill", "remediation", "contamination", "pollution", "cleanup"],
    image: KETCHIKAN_IMAGES.boatingHarbor,
  },
  {
    keywords: ["salmon", "cannery", "fish", "fishing", "commercial fisher"],
    image: KETCHIKAN_IMAGES.salmonCannery,
  },
  {
    keywords: ["harbor", "dock", "port", "maritime", "ferry", "moorage", "pier", "wharf"],
    image: KETCHIKAN_IMAGES.harborFishingBoats,
  },
  {
    keywords: ["cruise", "tourism", "visitor", "downtown", "creek street"],
    image: KETCHIKAN_IMAGES.creekStreetTotemView,
  },
  {
    keywords: ["tidelands", "shore", "coastal", "wetlands", "waterfront", "tide", "beach"],
    image: KETCHIKAN_IMAGES.bayWithBoats,
  },
  {
    keywords: ["school", "education", "student", "renovation", "classroom", "teacher"],
    image: ALASKA_UNSPLASH.coastalPeaks,
  },
  {
    keywords: ["budget", "funding", "fiscal", "allocate", "appropriation", "tax", "revenue", "debt", "levy"],
    image: KETCHIKAN_IMAGES.deerMountainSkyline,
  },
  {
    keywords: ["infrastructure", "capital", "construction", "road", "bridge", "utility", "sewer", "water system"],
    image: KETCHIKAN_IMAGES.deerMountainSkyline,
  },
  {
    keywords: ["health", "hospital", "healthcare", "peacehealth", "medical", "clinic"],
    image: ALASKA_UNSPLASH.coastalPeaks,
  },
  {
    keywords: ["police", "safety", "fire", "emergency", "public safety", "law enforcement"],
    image: KETCHIKAN_IMAGES.downtownTowardsCreekStreet,
  },
  {
    keywords: ["housing", "zoning", "land use", "property", "rent", "development"],
    image: KETCHIKAN_IMAGES.creekStreetBoardwalk,
  },
  {
    keywords: ["park", "recreation", "trail", "community center", "library", "totem"],
    image: KETCHIKAN_IMAGES.totemChiefJohnson,
  },
  {
    keywords: ["investigation", "records", "foia", "dossier", "transparency"],
    image: ALASKA_UNSPLASH.mistyMountains,
  },
  {
    keywords: ["environment", "forest", "wildlife", "conservation", "climate"],
    image: ALASKA_UNSPLASH.temperateRainforest,
  },
  {
    keywords: ["assembly", "borough", "resolution", "ordinance", "meeting", "amendment", "ketchikan gateway"],
    image: KETCHIKAN_IMAGES.deerMountainSkyline,
  },
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function buildHaystack(title?: string, tags?: string[], slug?: string, excerpt?: string): string {
  return [title, excerpt, tags?.join(" "), slug?.replace(/-/g, " ")].filter(Boolean).join(" ").toLowerCase();
}

function pickFromPool(pool: string[], key: string): string {
  return pool[hashString(key) % pool.length];
}

export interface ThemedImageInput {
  imageUrl?: string | null;
  category: string;
  title?: string;
  excerpt?: string;
  tags?: string[];
  slug?: string;
}

export function resolveThemedPostImage(input: ThemedImageInput): string {
  if (input.imageUrl?.trim()) return input.imageUrl.trim();

  const haystack = buildHaystack(input.title, input.tags, input.slug, input.excerpt);
  const key = input.slug ?? input.title ?? input.category;

  for (const theme of THEME_IMAGES) {
    if (theme.keywords.some((keyword) => haystack.includes(keyword))) {
      return theme.image;
    }
  }

  const isAssembly =
    input.tags?.includes("assembly") ||
    haystack.includes("assembly") ||
    haystack.includes("borough") ||
    haystack.includes("ketchikan");

  if (isAssembly || input.category === "Politics") {
    return pickFromPool(ASSEMBLY_POOL, key);
  }

  if (input.category === "Maritime") {
    return pickFromPool(
      [KETCHIKAN_IMAGES.harborFishingBoats, KETCHIKAN_IMAGES.boatingHarbor, KETCHIKAN_IMAGES.bayWithBoats],
      key,
    );
  }

  if (input.category === "Community") {
    return pickFromPool(
      [KETCHIKAN_IMAGES.creekStreet, KETCHIKAN_IMAGES.creekStreetBoardwalk, KETCHIKAN_IMAGES.totemChiefJohnson],
      key,
    );
  }

  return CATEGORY_IMAGES[input.category] ?? DEFAULT_IMAGE;
}

/** @deprecated Use resolveThemedPostImage for title-aware images. */
export function resolvePostImage(
  imageUrl: string | null | undefined,
  category: string,
  title?: string,
  slug?: string,
): string {
  return resolveThemedPostImage({ imageUrl, category, title, slug });
}
