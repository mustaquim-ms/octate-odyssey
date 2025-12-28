"use client";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { ShieldCheck, Zap, Target, Award } from "lucide-react";

const statsData = [
  { subject: 'Foundations', A: 80, fullMark: 100 },
  { subject: 'Subnetting', A: 95, fullMark: 100 },
  { subject: 'Routing', A: 70, fullMark: 100 },
  { subject: 'Security', A: 50, fullMark: 100 },
  { subject: 'Wireless', A: 40, fullMark: 100 },
  { subject: 'Protocols', A: 85, fullMark: 100 },
];

export default function LearningHeader() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 bg-white/[0.02] border border-white/5 rounded-[40px] p-10 backdrop-blur-xl">
      
      {/* Spider Graph */}
      <div className="h-[300px] flex flex-col items-center">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-4">Skill Matrix Sync</h3>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={statsData}>
            <PolarGrid stroke="#ffffff10" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
            <Radar name="Pilot" dataKey="A" stroke="#7ed957" fill="#7ed957" fillOpacity={0.3} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Rank Status */}
      <div className="flex flex-col justify-center lg:border-x border-white/5 px-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-[#7ed95711] rounded-2xl border border-[#7ed95733]">
            <Target className="text-[#7ed957]" size={32} />
          </div>
          <div>
            <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Current Rank</p>
            <h4 className="font-[family-name:var(--font-outfit)] text-3xl font-black text-white uppercase">Subnet Samurai</h4>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest font-bold">
            <span>Level 24</span>
            <span className="text-[#7ed957]">2,450 / 3,000 XP</span>
          </div>
          <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#7ed957] to-[#ffb423] w-[75%] shadow-[0_0_15px_#7ed95744]" />
          </div>
        </div>
      </div>

      {/* Daily Challenges / Quick Stats */}
      <div className="flex flex-col justify-center gap-6">
        <StatRow icon={<Zap size={16}/>} label="Streak" value="12 Days" color="#ffb423" />
        <StatRow icon={<ShieldCheck size={16}/>} label="Accuracy" value="94.2%" color="#7ed957" />
        <StatRow icon={<Award size={16}/>} label="Badges" value="18 Earned" color="#ffb423" />
      </div>
    </div>
  );
}

function StatRow({ icon, label, value, color }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
      <div className="flex items-center gap-3">
        <span style={{ color }}>{icon}</span>
        <span className="font-mono text-[10px] uppercase font-bold text-gray-500">{label}</span>
      </div>
      <span className="font-mono font-bold text-white">{value}</span>
    </div>
  );
}

<div className="mt-10 pt-10 border-t border-white/5">
  <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-6">Earned Commendations</h4>
  <div className="flex gap-4">
    {[1, 2, 3, 4, 5].map(i => (
      <div key={i} className={`w-12 h-12 rounded-full border flex items-center justify-center ${i < 4 ? 'border-[#ffb423] bg-[#ffb42311] text-[#ffb423]' : 'border-white/5 bg-white/5 text-gray-800'}`}>
        <Award size={20} />
      </div>
    ))}
    <div className="flex items-center font-mono text-[10px] text-gray-600 font-bold ml-4 uppercase">
      +13 Locked
    </div>
  </div>
</div>