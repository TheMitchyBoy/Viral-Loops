import { notFound } from "next/navigation";
import { getNewsBySlug, NEWS_ITEMS } from "@/lib/data";
import VideoClient from "./VideoClient";

export function generateStaticParams() {
  return NEWS_ITEMS.filter((n) => n.type === "video").map((n) => ({ slug: n.slug }));
}

export default async function VideoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const video = getNewsBySlug(slug);
  if (!video || video.type !== "video") notFound();
  return <VideoClient video={video} />;
}
