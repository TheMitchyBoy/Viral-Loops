"use client";

import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { getViral } from "@/lib/viral-engine";
import { Sparkles } from "lucide-react";
import NeighborhoodMap from "./NeighborhoodMap";
import StoryCredits from "./StoryCredits";
import QuestionUnlock from "./QuestionUnlock";
import LiveVoteGate from "./LiveVoteGate";
import AudioDrops from "./AudioDrops";
import ScarcityDropWidget from "./ScarcityDropWidget";
import RecruitmentBar from "./RecruitmentBar";
import BusinessLoop from "./BusinessLoop";
import AlumniLeaderboard from "./AlumniLeaderboard";
import RoleProgress from "./RoleProgress";
import MysterySerialWidget from "./MysterySerialWidget";

export default function ViralLoopsHub() {
  const { profile } = useUser();
  const viral = getViral(profile);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-brand-600" />
          <h1 className="text-3xl font-bold text-stone-900">Viral Loops Hub</h1>
        </div>
        <p className="text-stone-500">
          12 ways Riverside Daily turns local news into community-powered growth. Your role:{" "}
          <strong className="text-stone-800">{viral.role}</strong> · Referral:{" "}
          <code className="text-xs bg-stone-100 px-1.5 py-0.5 rounded">{viral.referralCode}</code>
        </p>
      </div>

      <div className="space-y-8">
        <RecruitmentBar />
        <NeighborhoodMap />
        <RoleProgress />
        <div className="grid gap-8 lg:grid-cols-2">
          <ScarcityDropWidget />
          <AlumniLeaderboard />
        </div>
        <MysterySerialWidget />
        <QuestionUnlock storyId="3" storyTitle="Creek Contamination Investigation" />
        <LiveVoteGate pollId="poll-contamination" />
        <StoryCredits storyId="3" />
        <AudioDrops />
        <BusinessLoop />
      </div>

      <div className="mt-10 text-center bg-stone-100 rounded-xl p-6">
        <p className="text-sm text-stone-600 mb-3">
          All loops connect — follow on Facebook, pick your zone, submit questions, refer neighbors.
        </p>
        <Link href="/" className="text-brand-600 font-medium text-sm hover:underline">
          ← Back to latest news
        </Link>
      </div>
    </div>
  );
}
