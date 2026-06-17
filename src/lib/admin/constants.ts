export const POST_CATEGORIES = [
  "Politics",
  "Investigation",
  "Community",
  "Maritime",
  "Education",
  "Events",
] as const;

export function isAssemblyPostId(id: string): boolean {
  return id.startsWith("assembly-");
}
