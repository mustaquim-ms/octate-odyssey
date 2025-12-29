"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { 
  Target, Zap, Shield, Trophy, Clock, ChevronRight, 
  Star, AlertTriangle, Filter, Award, Activity, 
  Lock, CheckCircle, Flame
} from "lucide-react";

// DATA: Mission Definitions
const ALL_MISSIONS = [
  { id: 1, type: "daily", category: "Math", title: "Ping Specialist", task: "Complete 3 Subnet Speedruns with 90% accuracy", xp: 250, progress: 66, color: "#7ed957", difficulty: "Easy", tags: ["Solo", "Speed"] },
  { id: 2, type: "daily", category: "Binary", title: "Binary Interceptor", task: "Convert 20 binary strings in Binary Blitz", xp: 150, progress: 30, color: "#ffb423", difficulty: "Medium", tags: ["Focus"] },
  { id: 3, type: "weekly", category: "Design", title: "Architect's Challenge", task: "Complete the entire 'Building Networks' course", xp: 1200, progress: 45, color: "#7ed957", difficulty: "Hard", medal: "Bronze Cog", tags: ["Logic", "Design"] },
  { id: 4, type: "weekly", category: "Security", title: "The Firewall Wall", task: "Pass the Network Security exam with 100% score", xp: 800, progress: 0, color: "#ffb423", difficulty: "Elite", medal: "Shield Badge", tags: ["Security"] },
  { id: 5, type: "career", category: "Hardware", title: "Cable Master", task: "Perform 50 perfect crimps in Cable Chaos", xp: 2000, progress: 10, color: "#ff4d4d", difficulty: "Expert", tags: ["Physical"] },
];

export default function MissionsPage() {
  const [filter, setFilter] = useState("all");

  const filteredMissions = ALL_MISSIONS.filter(m => 
    filter === "all" ? true : m.type === filter
  );

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-[#7ed957] selection:text-black">
      {/* Background HUD Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(126,217,87,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(126,217,87,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <Navbar />

      <section className="max-w-[1600px] mx-auto px-10 pt-40 pb-20 relative z-10">
        
        {/* 1. TACTICAL HUD HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16 items-center">
            <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#ff4d4d] animate-pulse shadow-[0_0_10px_#ff4d4d]" />
                    <span className="font-mono text-[10px] text-[#ff4d4d] font-black uppercase tracking-[0.5em]">Sector status: Unstable</span>
                </div>
                <h1 className="font-[family-name:var(--font-outfit)] text-7xl font-black uppercase tracking-tighter leading-none">
                  MISSION <span className="text-[#ffb423]">HUB</span>
                </h1>
                <p className="text-gray-500 font-mono text-xs mt-4 uppercase tracking-widest max-w-md">
                    Execute designated protocols to strengthen the global network mesh.
                </p>
            </div>

            {/* THREAT LEVEL INDICATOR */}
            <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Global Threat Level</span>
                    <AlertTriangle size={14} className="text-[#ffb423]" />
                </div>
                <div className="flex gap-1 h-2 mb-3">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className={`flex-1 rounded-full ${i < 4 ? 'bg-[#ff4d4d]' : 'bg-white/5'}`} />
                    ))}
                </div>
                <p className="font-mono text-[11px] font-bold text-[#ff4d4d] uppercase">Level 4: High Congestion</p>
            </div>

            {/* OPERATOR STATS */}
            <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl backdrop-blur-md flex justify-around">
                <HUDStat label="Medals" val="12" color="#ffb423" />
                <div className="w-px h-full bg-white/5" />
                <HUDStat label="Streak" val="8D" color="#7ed957" />
            </div>
        </div>

        {/* 2. MISSION FILTER BAR */}
        <div className="flex flex-wrap items-center gap-4 mb-12 bg-white/5 p-2 rounded-2xl w-fit border border-white/5">
            {['all', 'daily', 'weekly', 'career'].map((type) => (
                <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-8 py-3 rounded-xl font-mono text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer
                        ${filter === type ? 'bg-[#7ed957] text-black shadow-lg shadow-[#7ed95722]' : 'text-gray-500 hover:text-white'}`}
                >
                    {type}
                </button>
            ))}
        </div>

        {/* 3. MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT: MISSION LIST */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
                {filteredMissions.map(m => (
                    <motion.div 
                        key={m.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="group relative bg-[#0a101f]/60 border border-white/5 p-8 rounded-[32px] overflow-hidden hover:border-[#7ed957]/30 transition-all cursor-pointer"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                            {/* Mission Icon Box */}
                            <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-[#7ed95755] transition-colors">
                                <Target size={32} className={m.progress === 100 ? "text-[#7ed957]" : "text-gray-500"} />
                            </div>

                            {/* Info Section */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-3">
                                    <span className="px-3 py-1 bg-white/5 rounded-full text-[8px] font-black uppercase tracking-widest text-[#ffb423] border border-[#ffb42322]">{m.difficulty}</span>
                                    {m.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[8px] font-black uppercase tracking-widest text-gray-500 border border-white/5">#{tag}</span>
                                    ))}
                                </div>
                                <h4 className="font-[family-name:var(--font-outfit)] text-2xl font-black text-white group-hover:text-[#7ed957] transition-colors uppercase leading-none">{m.title}</h4>
                                <p className="text-gray-500 font-mono text-[10px] mt-2 font-bold uppercase tracking-tight opacity-70">{m.task}</p>
                            </div>

                            {/* Progress & XP */}
                            <div className="w-full md:w-48">
                                <div className="flex justify-between mb-2 font-mono text-[10px] font-black">
                                    <span className="text-[#7ed957]">+{m.xp} XP</span>
                                    <span className="text-gray-500">{m.progress}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${m.progress}%` }}
                                        className="h-full bg-gradient-to-r from-[#7ed957] to-[#ffb423]" 
                                    />
                                </div>
                            </div>

                            <ChevronRight size={20} className="text-gray-700 group-hover:text-[#7ed957] transition-all group-hover:translate-x-2" />
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
          </div>

          {/* RIGHT: TACTICAL SIDEBAR */}
          <div className="space-y-8">
            
            {/* MEDAL CABINET */}
            <div className="bg-[#0a101f]/80 border border-white/5 p-8 rounded-[40px] backdrop-blur-xl shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                    <Award className="text-[#ffb423]" size={20} />
                    <h3 className="font-[family-name:var(--font-outfit)] text-xl font-black uppercase tracking-tighter text-white">Medal Cabinet</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className={`aspect-square rounded-2xl border flex items-center justify-center transition-all cursor-help hover:scale-110
                            ${i < 4 ? 'bg-[#ffb42311] border-[#ffb42333] text-[#ffb423]' : 'bg-white/5 border-white/5 text-gray-800'}`}>
                            <Trophy size={20} />
                        </div>
                    ))}
                </div>
                <button className="w-full mt-8 py-4 font-mono text-[9px] font-black uppercase text-gray-500 hover:text-[#ffb423] transition-colors tracking-[0.3em]">
                    View all 48 achievements
                </button>
            </div>

            {/* LIVE FEED */}
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[40px]">
                <div className="flex items-center gap-3 mb-8">
                    <Activity className="text-[#7ed957]" size={20} />
                    <h3 className="font-[family-name:var(--font-outfit)] text-xl font-black uppercase tracking-tighter text-white">Ops Stream</h3>
                </div>
                <div className="space-y-6">
                    <FeedItem user="Pilot_Exo" action="Completed Subnet Run" time="2m ago" />
                    <FeedItem user="Net_Ghost" action="Unlocked Layer 3 Badge" time="5m ago" />
                    <FeedItem user="Root_Admin" action="Achieved 10D Streak" time="12m ago" />
                </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// SUB-COMPONENTS
function HUDStat({ label, val, color }: any) {
    return (
        <div className="text-center">
            <p className="text-[9px] text-gray-500 font-black uppercase mb-1 tracking-widest">{label}</p>
            <p className="font-mono text-2xl font-black" style={{ color }}>{val}</p>
        </div>
    )
}

function FeedItem({ user, action, time }: any) {
    return (
        <div className="flex flex-col border-l border-white/10 pl-4 relative">
            <div className="absolute left-[-4px] top-0 w-2 h-2 bg-[#7ed957] rounded-full shadow-[0_0_8px_#7ed957]" />
            <p className="text-[11px] font-bold text-gray-300"><span className="text-[#7ed957]">{user}</span> {action}</p>
            <span className="text-[9px] font-mono text-gray-600 uppercase mt-1">{time}</span>
        </div>
    )
}