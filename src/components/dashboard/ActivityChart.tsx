"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: 'Mon', xp: 400 },
  { day: 'Tue', xp: 300 },
  { day: 'Wed', xp: 900 },
  { day: 'Thu', xp: 200 },
  { day: 'Fri', xp: 700 },
  { day: 'Sat', xp: 1100 },
  { day: 'Sun', xp: 800 },
];

export default function ActivityChart() {
  return (
    <div className="bg-[#0a101f]/60 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl h-[350px]">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-[family-name:var(--font-outfit)] text-xl font-black uppercase text-[#7ed957]">XP Accumulation</h3>
        <span className="font-mono text-[10px] text-gray-500 uppercase font-bold">Past 7 Cycles</span>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7ed957" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#7ed957" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 12}} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0a101f', borderColor: '#ffffff10', borderRadius: '12px' }}
            itemStyle={{ color: '#7ed957' }}
          />
          <Area type="monotone" dataKey="xp" stroke="#7ed957" fillOpacity={1} fill="url(#colorXp)" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}