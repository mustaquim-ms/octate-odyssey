"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Cpu } from "lucide-react";

export default function QuickSubnetCalc() {
  const [mask, setMask] = useState(24);

  const calculateHosts = (m: number) => Math.pow(2, 32 - m) - 2;

  return (
    <div className="w-full bg-[#0a101f] border border-[#7ed95733] rounded-[40px] p-10 md:p-16 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 p-10 opacity-5">
        <Cpu size={150} />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-[#7ed957] font-mono text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Experimental Module</span>
          <h2 className="font-[family-name:var(--font-outfit)] text-4xl font-black uppercase mb-6 leading-tight">Quick Subnet <span className="text-[#ffb423]">Parser</span></h2>
          <p className="text-gray-500 font-mono text-xs uppercase mb-10 leading-relaxed font-bold">
            Live calculation of usable hosts and binary structures based on CIDR prefix.
          </p>
          
          <div className="flex flex-col gap-6">
            <span className="font-mono text-[10px] text-gray-500 uppercase font-black">Select Prefix: /{mask}</span>
            <input 
                type="range" min="8" max="32" value={mask} 
                onChange={(e) => setMask(parseInt(e.target.value))}
                className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#7ed957]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
            <ResultCard label="Usable Hosts" val={calculateHosts(mask).toLocaleString()} color="#7ed957" />
            <ResultCard label="Subnet Mask" val={`255.255.255.${mask === 24 ? '0' : '...'}`} color="#ffb423" />
            <div className="col-span-2 bg-white/5 border border-white/10 p-8 rounded-3xl text-center">
                <p className="text-[9px] font-mono text-gray-500 uppercase font-black mb-4 tracking-widest">Binary Representation</p>
                <div className="font-mono text-lg font-black text-[#7ed957] tracking-[0.2em] break-all">
                    {Array(mask).fill(1).join("").padEnd(32, "0").match(/.{1,8}/g)?.join(".")}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

function ResultCard({ label, val, color }: any) {
    return (
        <div className="bg-white/5 border border-white/5 p-6 rounded-3xl">
            <p className="text-[9px] font-mono text-gray-600 uppercase font-black mb-2 tracking-widest">{label}</p>
            <p className="text-3xl font-black font-mono text-white" style={{ color }}>{val}</p>
        </div>
    )
}