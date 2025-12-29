"use client";
import { User, Target } from "lucide-react";

export default function UserRankCard() {
  return (
    <div className="bg-[#0a101f] border border-[#7ed95733] p-8 rounded-[32px] relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <Target size={120} />
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ffb423] to-[#7ed957] flex items-center justify-center text-black">
            <User size={24} />
        </div>
        <div>
            <p className="text-[10px] font-mono text-gray-500 font-bold uppercase">Your Standing</p>
            <p className="font-[family-name:var(--font-outfit)] text-2xl font-black text-white">#412</p>
        </div>
      </div>

      <div className="space-y-4 border-t border-white/5 pt-6">
        <div className="flex justify-between font-mono text-[10px] font-black uppercase">
            <span className="text-gray-500">Next Rank at</span>
            <span className="text-[#ffb423]">#400</span>
        </div>
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-[#7ed957] w-[65%]" />
        </div>
        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest leading-relaxed">
            Boost your accuracy in Subnet Speedruns to climb faster.
        </p>
      </div>
    </div>
  );
}