"use client";
import { motion } from "framer-motion";
import { Router, Server, Globe, Laptop } from "lucide-react";

export default function NetworkPulse() {
  return (
    <div className="w-full max-w-md mx-auto mt-20 flex justify-between items-center relative p-10 bg-white/[0.02] rounded-full border border-white/5 shadow-inner">
      <Node icon={<Globe size={20} />} color="#ffb423" label="Cloud" />
      <div className="flex-1 h-[1px] bg-gradient-to-r from-[#ffb423] to-[#7ed957] relative">
         <motion.div 
           animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
           transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
           className="absolute top-[-2px] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"
         />
      </div>
      <Node icon={<Router size={20} />} color="#7ed957" label="Gateway" />
      <div className="flex-1 h-[1px] bg-gradient-to-r from-[#7ed957] to-[#ffb423] relative">
         <motion.div 
           animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
           transition={{ repeat: Infinity, duration: 2, delay: 1, ease: "linear" }}
           className="absolute top-[-2px] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"
         />
      </div>
      <Node icon={<Laptop size={20} />} color="#ffb423" label="Client" />
    </div>
  );
}

function Node({ icon, color, label }: { icon: any, color: string, label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="p-4 rounded-xl border border-white/10 bg-black shadow-lg" style={{ color }}>
        {icon}
      </div>
      <span className="text-[9px] font-mono uppercase font-bold text-gray-500 tracking-tighter">{label}</span>
    </div>
  );
}