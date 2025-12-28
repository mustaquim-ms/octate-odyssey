"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const layers = [
  { id: 7, name: "Application", color: "#ffb423", desc: "Network processes to applications." },
  { id: 6, name: "Presentation", color: "#7ed957", desc: "Data representation and encryption." },
  { id: 5, name: "Session", color: "#ffb423", desc: "Interhost communication." },
  { id: 4, name: "Transport", color: "#7ed957", desc: "End-to-end connections and reliability." },
  { id: 3, name: "Network", color: "#ffb423", desc: "Path determination and IP (Logical Addressing)." },
  { id: 2, name: "Data Link", color: "#7ed957", desc: "Physical addressing (MAC & LLC)." },
  { id: 1, name: "Physical", color: "#ffb423", desc: "Media, signal, and binary transmission." },
];

export default function OSIStack() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto mt-40 px-6">
      <h2 className="text-center text-4xl font-[family-name:var(--font-outfit)] font-black uppercase mb-12">The OSI Foundation</h2>
      <div className="flex flex-col gap-2">
        {layers.map((layer) => (
          <div key={layer.id} className="relative">
            <motion.button
              onMouseEnter={() => setActive(layer.id)}
              className="w-full p-4 border border-white/10 rounded-lg flex justify-between items-center transition-all cursor-pointer overflow-hidden"
              style={{ 
                backgroundColor: active === layer.id ? `${layer.color}11` : "rgba(255,255,255,0.02)",
                borderColor: active === layer.id ? layer.color : "rgba(255,255,255,0.1)"
              }}
            >
              <span className="font-mono text-xs opacity-40">LAYER 0{layer.id}</span>
              <span className="font-[family-name:var(--font-outfit)] font-bold uppercase tracking-widest" style={{ color: active === layer.id ? layer.color : "white" }}>
                {layer.name}
              </span>
              <div className="h-1 w-12 bg-white/10 rounded-full overflow-hidden">
                {active === layer.id && <motion.div layoutId="bar" className="h-full" style={{ backgroundColor: layer.color }} />}
              </div>
            </motion.button>
            
            <AnimatePresence>
              {active === layer.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-white/[0.02] border-x border-b border-white/10 rounded-b-lg overflow-hidden"
                >
                  <p className="p-6 text-sm font-mono text-gray-400 italic">
                    <span className="text-[#7ed957] mr-2 font-bold">{">"}</span>
                    {layer.desc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}