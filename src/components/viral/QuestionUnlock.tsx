"use client";

import { useState } from "react";
import { useUser, useViral } from "@/context/UserContext";
import { QUESTION_UNLOCK_THRESHOLD } from "@/lib/viral/data";
import { isQuestionGateOpen } from "@/lib/viral/engine";
import { MessageCircle, Check } from "lucide-react";

interface QuestionUnlockProps {
  storyId: string;
  storyTitle: string;
}

export default function QuestionUnlock({ storyId, storyTitle }: QuestionUnlockProps) {
  const { submitLocalQuestion } = useUser();
  const { community } = useViral();
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const count = community.questions.filter((q) => q.storyId === storyId).length;
  const open = isQuestionGateOpen(community);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    submitLocalQuestion(storyId, text.trim());
    setSubmitted(true);
    setText("");
  };

  return (
    <section className="card p-5 my-6">
      <div className="flex items-center gap-2 mb-2">
        <MessageCircle className="w-5 h-5 text-cyan-400" />
        <h3 className="font-display font-bold">Question-Driven Unlock</h3>
      </div>
      <p className="text-sm text-zinc-400 mb-3">
        What should we investigate about &ldquo;{storyTitle}&rdquo;? Submit questions — full report unlocks at {QUESTION_UNLOCK_THRESHOLD} community questions.
      </p>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 bg-white/[0.06] rounded-full h-2">
          <div
            className="bg-gradient-to-r from-cyan-400 to-cyan-600 h-2 rounded-full transition-all"
            style={{ width: `${Math.min(100, (count / QUESTION_UNLOCK_THRESHOLD) * 100)}%` }}
          />
        </div>
        <span className="text-xs font-medium text-zinc-500 tabular-nums">{count}/{QUESTION_UNLOCK_THRESHOLD}</span>
        {open && <Check className="w-4 h-4 text-emerald-400" />}
      </div>
      {submitted && <p className="text-sm text-emerald-400 mb-3">Question submitted — thanks for shaping this story!</p>}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What do you want to know?"
          className="input-modern flex-1"
        />
        <button type="submit" className="btn-primary !px-4 !py-2 text-sm">
          Submit
        </button>
      </form>
      {community.questions.filter((q) => q.storyId === storyId).length > 0 && (
        <ul className="mt-4 space-y-2">
          {community.questions
            .filter((q) => q.storyId === storyId)
            .slice(-3)
            .map((q) => (
              <li key={q.id} className="text-xs text-zinc-500 glass rounded-lg p-2.5">
                &ldquo;{q.text}&rdquo; — {q.userName}
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}
