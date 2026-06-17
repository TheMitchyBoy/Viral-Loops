export interface AssemblyBlogPost {
  source_entry_id: number;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  meeting_date: string | null;
  source_url: string | null;
  created_at: string;
}
