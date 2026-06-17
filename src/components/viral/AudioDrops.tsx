"use client";

import { useUser } from "@/context/UserContext";
import { AUDIO_DROPS } from "@/lib/viral/data";
import { Mic, Phone, Lock } from "lucide-react";

export default function AudioDrops() {
  const { profile } = useUser();
  const verified = profile.followedFacebook && profile.facebookUserId;

  return (
    <section className="card-solid p-6 ring-1 ring-cyan-500/10">
      <div className="flex items-center gap-2 mb-2">
        <Mic className="w-5 h-5 text-cyan-400" />
        <h2 className="font-display font-bold text-lg">Voicemail Drops</h2>
      </div>
      <p className="text-sm text-zinc-500 mb-5">
        Reporter voicemails — what we couldn&apos;t print. Forward the number to a neighbor who should hear it.
      </p>
      <div className="space-y-4">
        {AUDIO_DROPS.map((drop) => (
          <div key={drop.id} className="glass rounded-xl p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-sm text-zinc-200">{drop.title}</h3>
              <span className="text-xs text-zinc-600">{drop.duration}</span>
            </div>
            <p className="text-xs text-zinc-500 mb-3">{drop.description}</p>
            {verified ? (
              <>
                <p className="text-sm text-zinc-300 italic mb-2">&ldquo;{drop.transcript}&rdquo;</p>
                <div className="flex items-center gap-2 text-cyan-400 text-xs">
                  <Phone className="w-3 h-3" />
                  Forward: {drop.voicemailNumber}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 text-zinc-600 text-xs">
                <Lock className="w-3 h-3" /> Verify Facebook follow to listen
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
