const UNSPLASH = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?w=1200&h=675&fit=crop&q=80`;

/** Fallback when no keyword or category match is found. */
const DEFAULT_IMAGE = UNSPLASH("photo-1504711434969-e33886168f5c");

const CATEGORY_IMAGES: Record<string, string> = {
  Politics: UNSPLASH("photo-1475721027880-dc378b9a3148"),
  Investigation: UNSPLASH("photo-1450101499163-c8848c66ca85"),
  Community: UNSPLASH("photo-1449824913935-59a10b8d2000"),
  Maritime: UNSPLASH("photo-1544551763-46a013bb70d5"),
  Education: UNSPLASH("photo-1580582932707-520aedcedb25"),
  Events: UNSPLASH("photo-1492684223066-81342ee5ff30"),
  Food: UNSPLASH("photo-1517248135467-4c7edcad34c4"),
};

/** Rotating pool for borough assembly stories without a specific keyword match. */
const ASSEMBLY_POOL = [
  UNSPLASH("photo-1529107386315-e1a2cc48a620"), // civic meeting
  UNSPLASH("photo-1577969453183-4a15a4e004ba"), // government building
  UNSPLASH("photo-1541872701993-7cac978a46ad"), // gavel / public business
  UNSPLASH("photo-1551836022-d5d88e3078e2"), // conference table
  UNSPLASH("photo-1506905925346-21bda4d32df4"), // mountains / Alaska landscape
  UNSPLASH("photo-1518684079-3c830dcef090"), // coastal mountains
  UNSPLASH("photo-1475721027880-dc378b9a3148"), // capitol dome
  UNSPLASH("photo-1486406146926-c627a92ad1ab"), // city skyline / municipal
];

/** Keyword → image themes matched against title, excerpt, tags, and slug. */
const THEME_IMAGES: { keywords: string[]; image: string }[] = [
  {
    keywords: ["budget", "funding", "fiscal", "allocate", "appropriation", "tax", "revenue", "debt"],
    image: UNSPLASH("photo-1554224155-8d04cb21cd42"),
  },
  {
    keywords: ["school", "education", "student", "renovation", "classroom", "teacher"],
    image: UNSPLASH("photo-1580582932707-520aedcedb25"),
  },
  {
    keywords: ["harbor", "dock", "port", "maritime", "ferry", "cruise", "waterfront", "moorage"],
    image: UNSPLASH("photo-1544551763-46a013bb70d5"),
  },
  {
    keywords: ["diesel", "spill", "remediation", "environment", "contamination", "pollution", "cleanup"],
    image: UNSPLASH("photo-1621451536790-893c12fd12da"),
  },
  {
    keywords: ["infrastructure", "capital", "construction", "road", "bridge", "utility", "sewer", "water system"],
    image: UNSPLASH("photo-1503387762-592deb58ef4e"),
  },
  {
    keywords: ["tidelands", "shore", "coastal", "wetlands", "beach", "tide"],
    image: UNSPLASH("photo-1505142468610-359e7d316be0"),
  },
  {
    keywords: ["health", "hospital", "healthcare", "peacehealth", "medical", "clinic"],
    image: UNSPLASH("photo-1519494026892-80bbd2d6fd0d"),
  },
  {
    keywords: ["police", "safety", "fire", "emergency", "public safety", "law enforcement"],
    image: UNSPLASH("photo-1451187580459-43490279c0fa"),
  },
  {
    keywords: ["housing", "zoning", "land use", "property", "rent", "development"],
    image: UNSPLASH("photo-1480079018762-a89a41b4a08c"),
  },
  {
    keywords: ["park", "recreation", "trail", "community center", "library"],
    image: UNSPLASH("photo-1449824913935-59a10b8d2000"),
  },
  {
    keywords: ["investigation", "records", "foia", "dossier", "transparency"],
    image: UNSPLASH("photo-1450101499163-c8848c66ca85"),
  },
  {
    keywords: ["cruise", "tourism", "visitor", "downtown", "season"],
    image: UNSPLASH("photo-1548574505-4c54d1c4f0c5"),
  },
  {
    keywords: ["assembly", "borough", "resolution", "ordinance", "meeting", "amendment"],
    image: UNSPLASH("photo-1529107386315-e1a2cc48a620"),
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

  for (const theme of THEME_IMAGES) {
    if (theme.keywords.some((keyword) => haystack.includes(keyword))) {
      return theme.image;
    }
  }

  const key = input.slug ?? input.title ?? input.category;
  const isAssembly =
    input.tags?.includes("assembly") ||
    haystack.includes("assembly") ||
    haystack.includes("borough");

  if (isAssembly || input.category === "Politics") {
    return ASSEMBLY_POOL[hashString(key) % ASSEMBLY_POOL.length];
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
