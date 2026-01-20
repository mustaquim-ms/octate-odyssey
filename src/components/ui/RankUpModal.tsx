"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Zap } from "lucide-react";

export default function RankUpModal({ rankName, isOpen, onClose }: any) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            className="relative text-center"
          >
            {/* Background Light Explosion */}
            <div className="absolute inset-0 bg-[#7ed957] blur-[150px] opacity-20 animate-pulse" />
            
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="relative z-10 mb-8 inline-block p-10 rounded-full bg-white/5 border-2 border-[#7ed957] shadow-[0_0_50px_#7ed95733]"
            >
              <Trophy size={100} className="text-[#ffb423]" />
            </motion.div>

            <h2 className="font-[family-name:var(--font-outfit)] text-[10px] font-black uppercase tracking-[1em] text-[#7ed957] mb-4">Rank Promoted</h2>
            <h1 className="font-[family-name:var(--font-outfit)] text-7xl font-[900] uppercase text-white tracking-tighter mb-10">
                {rankName}
            </h1>

            <div className="flex justify-center gap-10 mb-12 font-mono text-[10px] font-black uppercase tracking-widest text-gray-500">
                <div className="flex flex-col items-center gap-2">
                    <Zap className="text-[#ffb423]" size={16} />
                    <span>+1000 XP</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Star className="text-[#7ed957]" size={16} />
                    <span>New Badge</span>
                </div>
            </div>

            <button 
              onClick={onClose}
              className="px-16 py-6 bg-white text-black font-black uppercase font-mono text-xs rounded-xl hover:bg-[#7ed957] transition-all cursor-pointer shadow-2xl"
            >
              Accept Promotion
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}http://172.16.40.123:8000