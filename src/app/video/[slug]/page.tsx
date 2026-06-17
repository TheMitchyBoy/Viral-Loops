import { notFound } from "next/navigation";
import { getNewsBySlug, getVideoSlugs, getBonusForContent } from "@/lib/posts";
import VideoClient from "./VideoClient";

export async function generateStaticParams() {
  const slugs = await getVideoSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function VideoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const video = await getNewsBySlug(slug);
  if (!video || video.type !== "video") notFound();

  const bonuses = await getBonusForContent(video.id);
  return <VideoClient video={video} bonuses={bonuses} />;
}
