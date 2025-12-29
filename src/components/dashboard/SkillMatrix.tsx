"use client";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, RadarProps } from "recharts";

const data = [
  { subject: 'Binary', A: 120, fullMark: 150 },
  { subject: 'IP Routing', A: 98, fullMark: 150 },
  { subject: 'Security', A: 86, fullMark: 150 },
  { subject: 'Cloud', A: 99, fullMark: 150 },
  { subject: 'Switching', A: 85, fullMark: 150 },
  { subject: 'Troubleshoot', A: 65, fullMark: 150 },
];

export default function SkillMatrix() {
  return (
    <div className="bg-[#0a101f]/60 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl h-[400px]">
      <h3 className="font-[family-name:var(--font-outfit)] text-xl font-black uppercase mb-6 text-[#ffb423]">Skill Synchronization</h3>
      <ResponsiveContainer width="100%" height="85%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#ffffff10" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
          <Radar
            name="Pilot"
            dataKey="A"
            stroke="#7ed957"
            fill="#7ed957"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}