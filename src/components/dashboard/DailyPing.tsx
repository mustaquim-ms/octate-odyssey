"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

export default function DailyPing() {
  const [mounted, setMounted] = useState(false);

  // 1. Signal that we are on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Generate the random data only when the component is mounted
  // This prevents the server and client from having different values
  const days = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: 70 }).map(() => Math.floor(Math.random() * 4));
  }, [mounted]);

  // 3. Render a placeholder skeleton while the server is rendering
  if (!mounted) {
    return (
      <div className="bg-[#0a101f]/60 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl col-span-1 lg:col-span-3 h-[200px] animate-pulse">
         <div className="w-48 h-6 bg-white/5 rounded mb-6" />
         <div className="flex flex-wrap gap-2 opacity-20">
            {Array.from({ length: 70 }).map((_, i) => (
               <div key={i} className="w-3 h-3 rounded-sm bg-white/10" />
            ))}
         </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a101f]/60 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl col-span-1 lg:col-span-3">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-[family-name:var(--font-outfit)] text-xl font-black uppercase text-[#7ed957]">Daily Protocol Pings</h3>
        <span className="font-mono text-[10px] text-gray-500 uppercase font-bold tracking-widest">Yearly Activity Log</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {days.map((level, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.005 }}
            className="w-3 h-3 rounded-sm relative group"
            style={{ 
              backgroundColor: level === 0 ? '#ffffff05' : 
                               level === 1 ? '#7ed95722' : 
                               level === 2 ? '#7ed95766' : '#7ed957' 
            }}
          >
            {/* Tooltip on hover */}
            <div className="absolute bottom-full mb-2 hidden group-hover:block z-50">
                <div className="bg-black border border-white/10 px-2 py-1 rounded text-[8px] whitespace-nowrap text-white">
                    Cycle {i}: {level * 250} XP Gained
                </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 flex items-center gap-4 text-[10px] font-mono text-gray-600 font-bold uppercase">
        <span>Offline</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-[#ffffff05] rounded-sm" />
          <div className="w-2 h-2 bg-[#7ed95722] rounded-sm" />
          <div className="w-2 h-2 bg-[#7ed95766] rounded-sm" />
          <div className="w-2 h-2 bg-[#7ed957] rounded-sm" />
        </div>
        <span>Fully Synced</span>
      </div>
    </div>
  );
}