"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";

interface StatusItemProps {
  label: string;
  value: string;
  targetNumber?: number;
}

export default function StatusItem({ label, value, targetNumber }: StatusItemProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());
  const [isTextVisible, setIsTextVisible] = useState(false);

  useEffect(() => {
    if (targetNumber) {
      const controls = animate(count, targetNumber, { duration: 2, ease: "easeOut" });
      return controls.stop;
    } else {
      // For text values like "Stable" or "Master", we show them with a flicker
      setTimeout(() => setIsTextVisible(true), 500);
    }
  }, [targetNumber, count]);

  return (
    <div className="flex flex-col items-center p-4 group">
      <span className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-black mb-2 transition-colors group-hover:text-[#ffb423]">
        {label}
      </span>
      
      <div className="font-[family-name:var(--font-space)] font-black text-2xl md:text-3xl text-white flex items-center gap-2">
        {targetNumber ? (
          <motion.span className="text-[#7ed957] drop-shadow-[0_0_10px_#7ed95744]">
            {rounded}
          </motion.span>
        ) : (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={isTextVisible ? { opacity: 1 } : {}}
            className="text-[#7ed957] drop-shadow-[0_0_10px_#7ed95744]"
          >
            {value}
          </motion.span>
        )}
        
        {/* Subtle scanning bar inside the stat */}
        <div className="w-1 h-6 bg-[#7ed957]/20 relative overflow-hidden hidden md:block">
          <motion.div 
            animate={{ y: [-24, 24] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#7ed957]"
          />
        </div>
      </div>
    </div>
  );
}