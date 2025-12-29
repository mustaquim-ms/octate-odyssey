"use client";
import { CheckCircle2, Lock, Star } from "lucide-react";

const ranks = [
  { name: "Novice", status: "completed", date: "Dec 01" },
  { name: "Packet Sniffer", status: "completed", date: "Dec 15" },
  { name: "Subnet Samurai", status: "active", date: "Current" },
  { name: "Network Architect", status: "locked", date: "Locked" },
  { name: "Odyssey Grandmaster", status: "locked", date: "Locked" },
];

export default function RankTimeline() {
  return (
    <div className="bg-[#0a101f]/60 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl">
      <h3 className="font-[family-name:var(--font-outfit)] text-xl font-black uppercase mb-8 text-[#ffb423]">Promotion Track</h3>
      <div className="space-y-8 relative">
        {/* The Vertical Line */}
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-white/5" />

        {ranks.map((rank, i) => (
          <div key={i} className="flex items-center gap-6 relative z-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
              ${rank.status === 'completed' ? 'bg-[#7ed957] border-[#7ed957] text-black' : 
                rank.status === 'active' ? 'bg-[#0a101f] border-[#ffb423] text-[#ffb423] animate-pulse' : 
                'bg-[#0a101f] border-white/10 text-gray-700'}`}
            >
              {rank.status === 'completed' ? <CheckCircle2 size={16} /> : 
               rank.status === 'active' ? <Star size={16} /> : <Lock size={16} />}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-bold ${rank.status === 'locked' ? 'text-gray-600' : 'text-white'}`}>
                {rank.name}
              </p>
              <p className="font-mono text-[9px] uppercase font-black text-gray-500 tracking-widest">{rank.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}