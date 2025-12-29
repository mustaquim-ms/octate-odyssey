"use client";
import { useState, useMemo } from "react";
import { calculateSubnet } from "@/lib/networkUtils";
import { motion } from "framer-motion";

export default function IPAnalyzer() {
  const [ip, setIp] = useState("192.168.1.1");
  const [cidr, setCidr] = useState(24);

  // Compute results live
  const results = useMemo(() => calculateSubnet(ip, cidr), [ip, cidr]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 h-full py-4">
      {/* LEFT: INPUTS & STATS */}
      <div className="space-y-8">
        <div className="bg-[#0a101f] p-8 rounded-[32px] border border-white/10 shadow-inner">
          <label className="block font-mono text-[10px] text-gray-500 uppercase mb-4 font-black tracking-[0.2em]">
            Target Address Configuration
          </label>
          <div className="flex items-center gap-4">
            <input 
              value={ip} 
              onChange={(e) => setIp(e.target.value)}
              placeholder="e.g. 10.0.0.1"
              className="flex-1 bg-black/40 border border-[#7ed95733] p-5 rounded-2xl font-mono text-xl text-[#7ed957] outline-none focus:border-[#7ed957] transition-all shadow-lg"
            />
            <div className="w-28 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-bold">/</span>
                <input 
                  type="number" 
                  min="0" max="32"
                  value={cidr} 
                  onChange={(e) => setCidr(Number(e.target.value))}
                  className="w-full bg-black/40 border border-[#ffb42333] p-5 pl-8 rounded-2xl font-mono text-xl text-[#ffb423] outline-none focus:border-[#ffb423] transition-all shadow-lg"
                />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
            <ResultBox label="Network ID" val={results?.network} color="#7ed957" />
            <ResultBox label="Broadcast" val={results?.broadcast} color="#ffb423" />
            <ResultBox label="Subnet Mask" val={results?.mask} color="#7ed957" />
            <ResultBox label="Usable Hosts" val={results?.hosts} color="#ffb423" />
        </div>
      </div>

      {/* RIGHT: BINARY MAP VISUALIZER */}
      <div className="bg-[#0a101f] rounded-[40px] border border-white/5 p-10 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7ed95733] to-transparent" />
        
        <h4 className="font-mono text-[10px] text-gray-500 uppercase mb-8 font-black tracking-[0.4em] text-center">
          Binary Infrastructure Map
        </h4>

        {/* Binary Grid grouped by octets */}
        <div className="grid grid-cols-4 gap-6 flex-1 items-center">
            {[0, 1, 2, 3].map((octetIdx) => (
                <div key={octetIdx} className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                        {Array.from({ length: 8 }).map((_, bitIdx) => {
                            const absoluteBit = (octetIdx * 8) + bitIdx;
                            const isNetworkBit = absoluteBit < cidr;
                            return (
                                <motion.div 
                                    key={bitIdx}
                                    initial={false}
                                    animate={{ 
                                        backgroundColor: isNetworkBit ? "#7ed957" : "#1e293b",
                                        scale: isNetworkBit ? 1 : 0.9,
                                        boxShadow: isNetworkBit ? "0 0 15px rgba(126,217,87,0.4)" : "none"
                                    }}
                                    className="h-8 rounded-md border border-white/5"
                                />
                            );
                        })}
                    </div>
                    <p className="text-center font-mono text-[9px] text-gray-600 font-bold">OCTET {octetIdx + 1}</p>
                </div>
            ))}
        </div>

        <div className="mt-10 p-6 bg-white/[0.02] border border-white/5 rounded-2xl text-center">
            <p className="font-mono text-[10px] text-gray-500 uppercase font-black leading-relaxed">
                <span className="text-[#7ed957]">{cidr} Network Bits</span> — <span className="text-gray-400">{32 - cidr} Host Bits</span>
            </p>
        </div>
      </div>
    </div>
  );
}

function ResultBox({ label, val, color }: any) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/[0.03] p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all group"
        >
            <p className="text-[10px] font-mono text-gray-500 uppercase font-black mb-2 tracking-widest group-hover:text-white transition-colors">{label}</p>
            <p className="font-mono text-lg font-black truncate" style={{ color: val ? color : "#ef4444" }}>
                {val || 'Invalid IP'}
            </p>
        </motion.div>
    )
}