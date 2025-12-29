"use client";
import { motion, useAnimation } from "framer-motion";
import { Router, Server, Globe, Laptop, Send } from "lucide-react";

export default function NetSim() {
  const controls = useAnimation();

  const triggerPing = async () => {
    await controls.start({ left: "45%", transition: { duration: 1 } });
    await controls.start({ left: "80%", transition: { duration: 1 } });
    await controls.start({ scale: 1.5, opacity: 0 });
    controls.set({ left: "10%", scale: 1, opacity: 1 });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-20">
      <div className="relative w-full max-w-3xl h-32 flex justify-between items-center px-10">
        {/* Background Line */}
        <div className="absolute top-1/2 left-10 right-10 h-px bg-white/10 -translate-y-1/2" />
        
        {/* Packet Dot */}
        <motion.div 
          animate={controls}
          initial={{ left: "10%" }}
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#7ed957] rounded-full shadow-[0_0_20px_#7ed957] z-20"
        />

        <SimNode icon={<Laptop />} label="Workstation" color="#ffb423" />
        <SimNode icon={<Router />} label="Gateway" color="#7ed957" />
        <SimNode icon={<Globe />} label="Public Web" color="#ffb423" />
      </div>

      <button 
        onClick={triggerPing}
        className="flex items-center gap-3 px-12 py-5 bg-[#7ed957] text-black font-black uppercase text-xs rounded-xl hover:bg-[#ffb423] transition-all"
      >
        <Send size={16} /> Trace Packet Path
      </button>
    </div>
  );
}

function SimNode({ icon, label, color }: any) {
    return (
        <div className="flex flex-col items-center gap-3 relative z-10 bg-[#020617] p-4 rounded-2xl border border-white/5">
            <div style={{ color }}>{icon}</div>
            <span className="font-mono text-[9px] font-black uppercase text-gray-500">{label}</span>
        </div>
    )
}