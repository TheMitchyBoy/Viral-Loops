"use client";

import { useUser } from "@/context/UserContext";
import { AUDIO_DROPS } from "@/lib/viral/data";
import { Mic, Phone, Lock } from "lucide-react";

export default function AudioDrops() {
  const { profile } = useUser();
  const verified = profile.followedFacebook && profile.facebookUserId;

  return (
    <section className="bg-stone-900 text-white rounded-xl p-6">
      <div className="flex items-center gap-2 mb-2">
        <Mic className="w-5 h-5 text-brand-400" />
        <h2 className="text-lg font-bold">Voicemail Drops</h2>
      </div>
      <p className="text-sm text-stone-400 mb-5">
        Reporter voicemails — what we couldn&apos;t print. Forward the number to a neighbor who should hear it.
      </p>
      <div className="space-y-4">
        {AUDIO_DROPS.map((drop) => (
          <div key={drop.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-sm">{drop.title}</h3>
              <span className="text-xs text-stone-500">{drop.duration}</span>
            </div>
            <p className="text-xs text-stone-400 mb-3">{drop.description}</p>
            {verified ? (
              <>
                <p className="text-sm text-stone-300 italic mb-2">&ldquo;{drop.transcript}&rdquo;</p>
                <div className="flex items-center gap-2 text-brand-400 text-xs">
                  <Phone className="w-3 h-3" />
                  Forward: {drop.voicemailNumber}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 text-stone-500 text-xs">
                <Lock className="w-3 h-3" /> Verify Facebook follow to listen
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
