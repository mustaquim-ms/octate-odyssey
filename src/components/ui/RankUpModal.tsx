"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Zap, X } from "lucide-react";

interface RankUpModalProps {
  rankName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function RankUpModal({ rankName, isOpen, onClose }: RankUpModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-[#020617]/95 backdrop-blur-xl">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0, rotateX: 45 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 1.2, opacity: 0 }}
            className="relative text-center max-w-lg w-full"
          >
            {/* Background Light Explosion */}
            <div className="absolute inset-0 bg-[#7ed957] blur-[120px] opacity-10 animate-pulse" />
            
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="relative z-10 mb-8 inline-block p-10 rounded-full bg-white/5 border-2 border-[#7ed957] shadow-[0_0_50px_rgba(126,217,87,0.2)]"
            >
              <Trophy size={100} className="text-[#ffb423] drop-shadow-[0_0_15px_rgba(255,180,35,0.5)]" />
            </motion.div>

            <h2 className="font-mono text-[10px] font-black uppercase tracking-[1em] text-[#7ed957] mb-4">Rank Promoted</h2>
            <h1 className="font-[family-name:var(--font-outfit)] text-6xl font-[900] uppercase text-white tracking-tighter mb-10 leading-none">
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
              className="w-full py-6 bg-[#7ed957] text-black font-black uppercase font-mono text-xs rounded-2xl hover:bg-[#ffb423] transition-all cursor-pointer shadow-[0_20px_40px_rgba(126,217,87,0.2)]"
            >
              Accept Promotion & Sync
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}