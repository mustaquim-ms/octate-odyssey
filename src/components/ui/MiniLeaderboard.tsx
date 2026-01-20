"use client";
import { motion } from "framer-motion";
import { Trophy, Medal, Target } from "lucide-react";

const topNavigators = [
  { name: "NetRunner_01", rank: "Titan", xp: "12,450", color: "#ffb423" },
  { name: "Subnet_Samurai", rank: "Master", xp: "10,200", color: "#7ed957" },
  { name: "Packet_Ghost", rank: "Expert", xp: "9,850", color: "#7ed957" },
];

export default function MiniLeaderboard() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-32 p-1 border border-white/5 bg-white/[0.02] rounded-3xl backdrop-blur-md">
      <div className="p-8 border-b border-white/5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Trophy className="text-[#ffb423]" size={24} />
          <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-black uppercase">Top Flight Navigators</h3>
        </div>
        <span className="font-mono text-[10px] text-[#7ed957] font-bold tracking-[0.3em] uppercase animate-pulse">Live Sync Active</span>
      </div>
      
      <div className="divide-y divide-white/5">
        {topNavigators.map((Navigator, i) => (
          <div key={i} className="flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-6">
              <span className="font-mono text-gray-500 font-bold">0{i + 1}</span>
              <div>
                <p className="font-bold text-lg text-white">{Navigator.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: Navigator.color }}>{Navigator.rank} Tier</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono font-bold text-[#7ed957]">{Navigator.xp} XP</p>
              <p className="text-[9px] text-gray-600 uppercase font-bold tracking-tighter">Total Score</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}