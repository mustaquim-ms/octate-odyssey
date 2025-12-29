"use client";
import { Award, Shield, Cpu, Zap, Globe } from "lucide-react";

const badges = [
  { name: "Binary Alpha", icon: <Zap size={20} />, color: "#ffb423", unlocked: true },
  { name: "OSI Architect", icon: <Cpu size={20} />, color: "#7ed957", unlocked: true },
  { name: "Packet Sniffer", icon: <Globe size={20} />, color: "#7ed957", unlocked: true },
  { name: "Security Titan", icon: <Shield size={20} />, color: "#ffb423", unlocked: false },
];

export default function AchievementCase() {
  return (
    <div className="bg-[#0a101f]/60 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl">
      <h3 className="font-[family-name:var(--font-outfit)] text-xl font-black uppercase mb-8 text-white">Accomplishments</h3>
      <div className="grid grid-cols-2 gap-4">
        {badges.map((badge, i) => (
          <div 
            key={i} 
            className={`p-6 rounded-2xl border flex flex-col items-center gap-3 transition-all ${
              badge.unlocked ? 'bg-white/5 border-white/10 opacity-100' : 'bg-black/20 border-white/5 opacity-30 grayscale'
            }`}
          >
            <div className="p-3 rounded-full" style={{ backgroundColor: badge.unlocked ? `${badge.color}22` : '#333', color: badge.unlocked ? badge.color : '#666' }}>
               {badge.icon}
            </div>
            <span className="font-mono text-[9px] font-black uppercase tracking-tighter text-center">{badge.name}</span>
          </div>
        ))}
      </div>
      <button className="w-full mt-8 py-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl font-mono text-[10px] font-black uppercase tracking-widest text-gray-400 transition-all cursor-pointer">
        View Full Gallery
      </button>
    </div>
  );
}