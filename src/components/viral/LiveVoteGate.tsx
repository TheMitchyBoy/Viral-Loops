"use client";

import { useUser, useViral } from "@/context/UserContext";
import { LIVE_POLLS } from "@/lib/viral/data";
import { getViral } from "@/lib/viral-engine";
import { Vote } from "lucide-react";

interface LiveVoteGateProps {
  pollId: string;
}

export default function LiveVoteGate({ pollId }: LiveVoteGateProps) {
  const { profile, vote } = useUser();
  const { community } = useViral();
  const viral = getViral(profile);
  const poll = LIVE_POLLS.find((p) => p.id === pollId);
  if (!poll) return null;

  const votes = community.pollVotes[pollId] ?? {};
  const total = Object.values(votes).reduce((s, n) => s + n, 0);
  const userVote = viral.votesCast[pollId];
  const verified = profile.followedFacebook && profile.facebookUserId;

  return (
    <section className="card border-purple-500/20 bg-purple-500/[0.06] p-5 my-6">
      <div className="flex items-center gap-2 mb-2">
        <Vote className="w-5 h-5 text-purple-400" />
        <h3 className="font-display font-bold">Live Vote Gate</h3>
      </div>
      <p className="text-sm font-medium text-zinc-200 mb-1">{poll.question}</p>
      <p className="text-xs text-zinc-500 mb-4">Verified followers vote — results shape what we publish next.</p>

      {!verified ? (
        <p className="text-sm text-purple-300">Verify your Facebook follow to cast your vote.</p>
      ) : userVote ? (
        <p className="text-sm text-emerald-400 mb-3">Vote recorded. Results below:</p>
      ) : (
        <div className="space-y-2 mb-4">
          {poll.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => vote(pollId, opt.id)}
              className="w-full text-left glass rounded-xl px-4 py-2.5 text-sm text-zinc-300 hover:bg-purple-500/10 hover:border-purple-500/30 transition-colors"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-2">
        {poll.options.map((opt) => {
          const count = votes[opt.id] ?? 0;
          const pct = total > 0 ? (count / total) * 100 : 0;
          return (
            <div key={opt.id}>
              <div className="flex justify-between text-xs mb-0.5 text-zinc-400">
                <span>{opt.label}</span>
                <span className="tabular-nums">{count} votes ({pct.toFixed(0)}%)</span>
              </div>
              <div className="w-full bg-white/[0.06] rounded-full h-1.5">
                <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
