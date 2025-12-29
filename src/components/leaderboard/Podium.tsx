"use client";
import { motion } from "framer-motion";
import { Trophy, Crown, Medal } from "lucide-react";

const TOP_3 = [
  { name: "Root_Admin", xp: "45,200", rank: "Odyssey Grandmaster", pos: 1, color: "#ffb423" },
  { name: "NetRunner_99", xp: "38,150", rank: "Network Architect", pos: 2, color: "#7ed957" },
  { name: "Packet_Ghost", xp: "36,800", rank: "Network Architect", pos: 3, color: "#7ed957" },
];

export default function Podium() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-5xl mx-auto">
      {/* 2nd Place */}
      <PodiumSlot pilot={TOP_3[1]} height="h-48" delay={0.2} />
      
      {/* 1st Place */}
      <PodiumSlot pilot={TOP_3[0]} height="h-64" delay={0} isGold />
      
      {/* 3rd Place */}
      <PodiumSlot pilot={TOP_3[2]} height="h-40" delay={0.4} />
    </div>
  );
}

function PodiumSlot({ pilot, height, delay, isGold }: any) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.8 }}
            className="flex flex-col items-center group"
        >
            <div className="mb-6 relative">
                <div className={`w-24 h-24 rounded-full bg-white/5 border-2 flex items-center justify-center relative z-10 
                    ${isGold ? 'border-[#ffb423] shadow-[0_0_30px_rgba(255,180,35,0.3)]' : 'border-white/10'}`}>
                    <span className="font-black text-2xl uppercase font-[family-name:var(--font-outfit)]">{pilot.name[0]}</span>
                </div>
                {isGold && <Crown className="absolute -top-6 left-1/2 -translate-x-1/2 text-[#ffb423] animate-bounce" size={32} />}
            </div>
            
            <div className={`w-full ${height} bg-[#0a101f] border-t-4 rounded-t-3xl p-6 flex flex-col items-center justify-center transition-all group-hover:bg-[#0a101f]/80`}
                 style={{ borderColor: pilot.color }}>
                <p className="font-black text-xl mb-1 text-white uppercase tracking-tighter">{pilot.name}</p>
                <p className="font-mono text-[9px] uppercase font-black tracking-widest mb-4" style={{ color: pilot.color }}>{pilot.rank}</p>
                <div className="bg-white/5 px-4 py-1.5 rounded-full font-mono text-xs font-black text-[#7ed957]">
                    {pilot.xp} XP
                </div>
            </div>
        </motion.div>
    )
}