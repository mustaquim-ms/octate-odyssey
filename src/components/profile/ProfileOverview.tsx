"use client";
import { useEffect, useState } from "react";
import { Trophy, Star, Target, Activity, Award } from "lucide-react";
import { supabase } from "@/lib/supabase"; 

export default function ProfileOverview() {
  const [NavigatorName, setNavigatorName] = useState("Navigator");
  const [NavigatorHandle, setNavigatorHandle] = useState("unknown_entity");

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem("Navigator_name");
    const savedHandle = localStorage.getItem("Navigator_handle");
    if (savedName) setNavigatorName(savedName);
    if (savedHandle) setNavigatorHandle(savedHandle);
  }, []);

  return (
    <div className="space-y-8">
      {/* 1. Header Bio Card */}
      <div className="bg-[#0a101f] border border-white/5 p-10 rounded-[40px] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
            <Trophy size={180} />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
            <div className="w-32 h-32 rounded-full border-4 border-[#7ed957] p-1 shadow-[0_0_30px_rgba(126,217,87,0.2)]">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#ffb423] to-[#7ed957] flex items-center justify-center text-black text-4xl font-black uppercase">
                    {NavigatorName[0]}
                </div>
            </div>
            <div className="text-center md:text-left">
                <h2 className="font-[family-name:var(--font-outfit)] text-5xl font-black uppercase tracking-tighter text-white">
                  Navigator_{NavigatorName}
                </h2>
                <p className="font-mono text-[#7ed957] font-bold uppercase tracking-widest mt-1">
                  Status: Active Registry — @{NavigatorHandle}
                </p>
                <p className="text-gray-500 text-sm mt-4 max-w-lg leading-relaxed font-mono uppercase">
                  Authenticated user profile for the Octate Odyssey Matrix. Currently specializing in high-speed packet processing and secure network architectures.
                </p>
            </div>
        </div>
      </div>

      {/* 2. Rank Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricBox label="Global Ranking" val="#412" sub="Top 5% of Navigators" color="#ffb423" />
        <MetricBox label="Mission Success" val="94.2%" sub="High Accuracy" color="#7ed957" />
        <MetricBox label="Certificates" val="08" sub="Verified Awards" color="#ffb423" />
      </div>

      {/* 3. Medal Showcase */}
      <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[40px]">
         <h3 className="font-[family-name:var(--font-outfit)] text-xl font-black uppercase mb-8 text-white">Top Commendations</h3>
         <div className="flex flex-wrap gap-6">
            {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-4 bg-black/40 border border-white/5 p-4 rounded-2xl pr-8 hover:border-[#7ed95733] transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-[#7ed95711] flex items-center justify-center text-[#7ed957] group-hover:scale-110 transition-transform">
                        <Award size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-white uppercase tracking-tight">
                          {i === 1 ? "Packet Master" : i === 2 ? "Subnet King" : "OSI Architect"}
                        </p>
                        <p className="font-mono text-[9px] text-gray-500 font-bold uppercase">SYNC: DEC 2025</p>
                    </div>
                </div>
            ))}
         </div>
      </div>
    </div>
  );
}

function MetricBox({ label, val, sub, color }: any) {
    return (
        <div className="bg-white/[0.03] border border-white/5 p-8 rounded-[32px] text-center group hover:bg-white/[0.05] transition-all">
            <p className="font-mono text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">{label}</p>
            <p className="text-4xl font-black font-[family-name:var(--font-outfit)] mb-1" style={{ color }}>{val}</p>
            <p className="text-[9px] font-mono text-gray-600 font-bold uppercase tracking-tighter">{sub}</p>
        </div>
    )
}