"use client";
import { Activity, Globe, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";

const GLOBAL_DATA = [
  { label: "Active Pilots", val: "1,204", icon: <Globe size={14} />, color: "#7ed957" },
  { label: "Packets Routed", val: "4.2M", icon: <Zap size={14} />, color: "#ffb423" },
  { label: "Avg. Accuracy", val: "88.4%", icon: <Target size={14} />, color: "#7ed957" },
];

export default function SeasonStats() {
  return (
    <div className="bg-[#0a101f]/60 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-8">
        <Activity className="text-[#7ed957]" size={20} />
        <h3 className="font-[family-name:var(--font-outfit)] text-xl font-black uppercase text-white">Season 04 Intel</h3>
      </div>

      <div className="space-y-6">
        {GLOBAL_DATA.map((stat, i) => (
          <div key={i} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-white transition-colors">
                {stat.icon}
              </div>
              <span className="text-[10px] font-mono font-black uppercase text-gray-500 tracking-widest">{stat.label}</span>
            </div>
            <span className="font-mono font-black text-white text-lg tracking-tighter" style={{ color: stat.color }}>
              {stat.val}
            </span>
          </div>
        ))}
      </div>

      {/* Seasonal Meta Info */}
      <div className="mt-10 pt-8 border-t border-white/5">
        <p className="text-[9px] font-mono text-gray-600 font-bold uppercase tracking-[0.3em] mb-4 text-center">Current Meta Focus</p>
        <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 bg-[#ffb42311] border border-[#ffb42333] text-[#ffb423] text-[8px] font-black uppercase rounded-full">IPv6 Transit</span>
            <span className="px-3 py-1 bg-[#7ed95711] border border-[#7ed95733] text-[#7ed957] text-[8px] font-black uppercase rounded-full">BGP Peering</span>
        </div>
      </div>
      
      {/* Decorative Progress Bar */}
      <div className="mt-8 relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
         <motion.div 
           initial={{ width: "0%" }}
           animate={{ width: "65%" }}
           transition={{ duration: 2, ease: "circOut" }}
           className="h-full bg-gradient-to-r from-[#ffb423] to-[#7ed957] shadow-[0_0_10px_#7ed957]"
         />
      </div>
      <p className="text-center text-[8px] font-mono text-gray-600 mt-2 font-bold uppercase tracking-widest">Season completion: 65%</p>
    </div>
  );
}