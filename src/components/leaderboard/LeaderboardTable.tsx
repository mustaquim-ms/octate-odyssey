"use client";
import { Globe, ShieldCheck, Zap } from "lucide-react";
import { supabase } from "@/lib/supabase"; 

const DATA = [
    { rank: 4, name: "Subnet_God", tier: "Samurai", xp: "32,400", country: "USA", change: "up" },
    { rank: 5, name: "Cisco_Kid", tier: "Samurai", xp: "31,900", country: "UK", change: "down" },
    { rank: 6, name: "VLAN_Viper", tier: "Expert", xp: "28,500", country: "GER", change: "none" },
    { rank: 7, name: "Ping_Master", tier: "Expert", xp: "27,200", country: "BD", change: "up" },
    { rank: 8, name: "Packet_Sniffer", tier: "Expert", xp: "25,000", country: "CAN", change: "up" },
];

export default function LeaderboardTable() {
  return (
    <div className="bg-[#0a101f]/60 border border-white/5 rounded-[40px] overflow-hidden backdrop-blur-xl">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/5 bg-white/[0.02]">
            <th className="p-8 font-mono text-[10px] uppercase font-black text-gray-500 tracking-[0.4em]">Rank</th>
            <th className="p-8 font-mono text-[10px] uppercase font-black text-gray-500 tracking-[0.4em]">Navigator</th>
            <th className="p-8 font-mono text-[10px] uppercase font-black text-gray-500 tracking-[0.4em]">Tier</th>
            <th className="p-8 font-mono text-[10px] uppercase font-black text-gray-500 tracking-[0.4em]">Region</th>
            <th className="p-8 font-mono text-[10px] uppercase font-black text-gray-500 tracking-[0.4em] text-right">XP Sync</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 font-mono">
          {DATA.map((p, i) => (
            <tr key={i} className="hover:bg-white/[0.01] transition-colors group">
              <td className="px-8 py-6 text-gray-500 font-black">#0{p.rank}</td>
              <td className="px-8 py-6">
                 <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] group-hover:border-[#7ed957] transition-all">{p.name[0]}</div>
                    <span className="font-bold text-white group-hover:text-[#7ed957] transition-colors">{p.name}</span>
                 </div>
              </td>
              <td className="px-8 py-6">
                <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border
                    ${p.tier === 'Samurai' ? 'border-[#ffb42333] text-[#ffb423] bg-[#ffb42305]' : 'border-[#7ed95733] text-[#7ed957] bg-[#7ed95705]'}`}>
                    {p.tier}
                </span>
              </td>
              <td className="px-8 py-6 text-[10px] text-gray-500 font-bold uppercase tracking-widest">{p.country}</td>
              <td className="px-8 py-6 text-right font-black text-white group-hover:text-[#7ed957]">{p.xp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}