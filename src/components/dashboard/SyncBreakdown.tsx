"use client";

const systems = [
  { name: "Foundations", sync: 100, color: "#7ed957" },
  { name: "Building Networks", sync: 45, color: "#ffb423" },
  { name: "Advanced Mastery", sync: 0, color: "#475569" },
];

export default function SyncBreakdown() {
  return (
    <div className="bg-[#0a101f]/60 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl">
      <h3 className="font-[family-name:var(--font-outfit)] text-xl font-black uppercase mb-8 text-white">System Sync</h3>
      <div className="space-y-6">
        {systems.map((s, i) => (
          <div key={i}>
            <div className="flex justify-between font-mono text-[10px] uppercase font-black mb-2 tracking-widest">
              <span className="text-gray-400">{s.name}</span>
              <span style={{ color: s.color }}>{s.sync}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-1000" 
                style={{ width: `${s.sync}%`, backgroundColor: s.color, boxShadow: `0 0 10px ${s.color}44` }} 
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-[9px] font-mono text-gray-600 uppercase font-bold text-center leading-relaxed">
        Total Odyssey Synchronization: <span className="text-[#7ed957]">48.3%</span>
      </p>
    </div>
  );
}