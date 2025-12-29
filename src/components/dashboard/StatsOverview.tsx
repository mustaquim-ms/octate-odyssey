"use client";
import { Target, Zap, Award, Flame } from "lucide-react";

export default function StatsOverview() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <StatCard icon={<Flame size={20} />} label="Streak" value="12 Days" color="#ffb423" />
      <StatCard icon={<Target size={20} />} label="Accuracy" value="94%" color="#7ed957" />
      <StatCard icon={<Award size={20} />} label="Medals" value="18" color="#ffb423" />
      <StatCard icon={<Zap size={20} />} label="Level" value="24" color="#7ed957" />
    </div>
  );
}

function StatCard({ icon, label, value, color }: any) {
  return (
    <div className="bg-[#0a101f]/60 border border-white/5 p-6 rounded-[24px] flex flex-col items-center justify-center gap-2">
      <div style={{ color }} className="mb-1 opacity-80">{icon}</div>
      <span className="text-[9px] font-mono font-black uppercase text-gray-500 tracking-widest">{label}</span>
      <span className="text-xl font-black text-white">{value}</span>
    </div>
  );
}