"use client";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

const logs = [
  { event: "Exam Passed: IPv4 Basics", time: "2h ago", status: "success" },
  { event: "Mission Initialized: Subnetting II", time: "5h ago", status: "process" },
  { event: "Exam Failed: OSPF Mastery", time: "1d ago", status: "fail" },
  { event: "New Badge: Binary Alpha", time: "2d ago", status: "success" },
];

export default function RecentActivity() {
  return (
    <div className="bg-[#0a101f]/60 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl">
      <h3 className="font-[family-name:var(--font-outfit)] text-xl font-black uppercase mb-8 text-white tracking-tighter">System Log</h3>
      <div className="space-y-6">
        {logs.map((log, i) => (
          <div key={i} className="flex items-start gap-4 group">
            <div className="mt-1">
              {log.status === 'success' && <CheckCircle2 size={16} className="text-[#7ed957]" />}
              {log.status === 'fail' && <XCircle size={16} className="text-[#ffb423]" />}
              {log.status === 'process' && <Clock size={16} className="text-gray-500" />}
            </div>
            <div className="flex-1">
               <p className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors">{log.event}</p>
               <p className="font-mono text-[9px] uppercase font-black text-gray-600 mt-1">{log.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}