"use client";

import Link from "next/link";
import { INVESTIGATION_POST_ID } from "@/lib/constants";
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
    <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="mb-10">
        <p className="label-caps text-cyan-400/70 mb-2">Platform</p>
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-7 h-7 text-cyan-400" />
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Viral Loops Hub</h1>
        </div>
        <p className="text-zinc-500">
          Your role: <span className="text-cyan-400 font-medium capitalize">{viral.role}</span>
          {" · "}
          Referral: <code className="text-xs glass px-2 py-0.5 rounded-lg text-zinc-400">{viral.referralCode}</code>
        </p>
      </div>

      <div className="space-y-6">
        <RecruitmentBar />
        <NeighborhoodMap />
        <RoleProgress />
        <div className="grid gap-6 lg:grid-cols-2">
          <ScarcityDropWidget />
          <AlumniLeaderboard />
        </div>
        <MysterySerialWidget />
        <QuestionUnlock storyId={INVESTIGATION_POST_ID} storyTitle="PeaceHealth in Ketchikan: A Community Dossier" />
        <LiveVoteGate pollId="poll-contamination" />
        <StoryCredits storyId={INVESTIGATION_POST_ID} />
        <AudioDrops />
        <BusinessLoop />
      </div>

      <div className="mt-12 text-center card p-6">
        <p className="text-sm text-zinc-500 mb-4">
          All loops connect — follow on Facebook, pick your zone, submit questions, refer neighbors.
        </p>
        <Link href="/" className="text-cyan-400 font-medium text-sm hover:text-cyan-300 transition-colors">
          ← Back to latest news
        </Link>
      </div>
    </div>
  );
}
