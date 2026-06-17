const CATEGORY_IMAGES: Record<string, string> = {
  Politics:
    "https://images.unsplash.com/photo-1475721027880-dc378b9a3148?w=1200&h=675&fit=crop",
  Investigation:
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=675&fit=crop",
  Community:
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=675&fit=crop",
  Maritime:
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=675&fit=crop",
  Education:
    "https://images.unsplash.com/photo-1580582932707-520aedcedb25?w=1200&h=675&fit=crop",
  Events:
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=675&fit=crop",
  Food:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=675&fit=crop",
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=675&fit=crop";

export function resolvePostImage(imageUrl: string | null | undefined, category: string): string {
  if (imageUrl?.trim()) return imageUrl;
  return CATEGORY_IMAGES[category] ?? DEFAULT_IMAGE;
}
