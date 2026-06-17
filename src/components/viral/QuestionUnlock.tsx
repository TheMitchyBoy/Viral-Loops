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
    <section className="bg-white border border-stone-200 rounded-xl p-5 my-6">
      <div className="flex items-center gap-2 mb-2">
        <MessageCircle className="w-5 h-5 text-brand-600" />
        <h3 className="font-bold text-stone-900">Question-Driven Unlock</h3>
      </div>
      <p className="text-sm text-stone-600 mb-3">
        What should we investigate about &ldquo;{storyTitle}&rdquo;? Submit questions — full report unlocks at {QUESTION_UNLOCK_THRESHOLD} community questions.
      </p>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 bg-stone-100 rounded-full h-2">
          <div
            className="bg-brand-500 h-2 rounded-full"
            style={{ width: `${Math.min(100, (count / QUESTION_UNLOCK_THRESHOLD) * 100)}%` }}
          />
        </div>
        <span className="text-xs font-medium text-stone-500">{count}/{QUESTION_UNLOCK_THRESHOLD}</span>
        {open && <Check className="w-4 h-4 text-emerald-600" />}
      </div>
      {submitted && <p className="text-sm text-emerald-600 mb-3">Question submitted — thanks for shaping this story!</p>}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What do you want to know?"
          className="flex-1 border border-stone-200 rounded-lg px-3 py-2 text-sm"
        />
        <button type="submit" className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700">
          Submit
        </button>
      </form>
      {community.questions.filter((q) => q.storyId === storyId).length > 0 && (
        <ul className="mt-4 space-y-2">
          {community.questions
            .filter((q) => q.storyId === storyId)
            .slice(-3)
            .map((q) => (
              <li key={q.id} className="text-xs text-stone-500 bg-stone-50 rounded-lg p-2">
                &ldquo;{q.text}&rdquo; — {q.userName}
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}
