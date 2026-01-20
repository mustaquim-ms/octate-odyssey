"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { 
  Zap, Binary, Trophy, Activity, 
  History, Cable, Route, ChevronRight, 
  Lock, Play, Clock, CheckCircle2 
} from "lucide-react";
import { useAuthGuard } from "@/hooks/useAuthGuard";

const GAMES = [
  {
    title: "Subnet Speedrun",
    slug: "subnet-speedrun",
    desc: "Calculate Network IDs and Broadcasts against a 60s clock.",
    icon: <Zap size={32} />,
    color: "#7ed957",
    xp: "500 XP",
    difficulty: "Elite"
  },
  {
    title: "Binary Blitz",
    slug: "binary-blitz",
    desc: "Intercept falling bits and convert them before the buffer fills.",
    icon: <Binary size={32} />,
    color: "#ffb423",
    xp: "350 XP",
    difficulty: "Combat"
  },
  {
    title: "Packet Route",
    slug: "packet-route",
    desc: "Route packets to the correct gateway based on destination IPs.",
    icon: <Route size={32} />,
    color: "#00d4ff",
    xp: "450 XP",
    difficulty: "Tactical"
  },
  {
    title: "Cable Chaos",
    slug: "cable-chaos",
    desc: "Arrange TIA/EIA-568B color codes to build a perfect patch cable.",
    icon: <Cable size={32} />,
    color: "#ff4d4d",
    xp: "300 XP",
    difficulty: "Technical"
  }
];

const RECENT_SIMULATIONS = [
  { name: "Subnet Speedrun", score: "1,200", time: "2h ago", status: "success" },
  { name: "Binary Blitz", score: "850", time: "5h ago", status: "success" },
  { name: "Packet Route", score: "---", time: "1d ago", status: "failed" },
];

export default function GamesPage() {
  const { checkAuth } = useAuthGuard();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLoggedIn(localStorage.getItem("pilot_session") === "active");
  }, []);

  const handleStartMission = (slug: string) => {
    checkAuth(() => {
      router.push(`/games/${slug}`);
    });
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-[#7ed957] selection:text-black">
      {/* Visual background elements */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#7ed95705_0%,transparent_50%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(126,217,87,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(126,217,87,0.01)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      
      <Navbar />

      <section className="max-w-[1600px] mx-auto px-10 pt-44 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* --- LEFT: GAME SELECTION GRID --- */}
          <div className="lg:col-span-3">
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#7ed957] animate-pulse" />
                <span className="text-[#7ed957] font-mono text-[10px] font-black uppercase tracking-[0.6em]">Neural Simulation Active</span>
              </div>
              <h1 className="font-[family-name:var(--font-outfit)] text-6xl font-black uppercase tracking-tighter leading-none">
                THE <span className="text-[#ffb423]">CHAMBER</span>
              </h1>
              <p className="text-gray-500 font-mono text-xs uppercase mt-4 tracking-widest opacity-70">Sharpen reflexes through high-fidelity network combat.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {GAMES.map((game, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }} 
                  className="bg-[#0a101f]/60 backdrop-blur-xl border border-white/5 p-10 rounded-[40px] relative overflow-hidden group cursor-default"
                >
                  {/* Decorative Background Decal */}
                  <div className="absolute -bottom-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700">
                    {game.icon}
                  </div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-10">
                      <div 
                        className="p-5 bg-white/5 rounded-[20px] transition-all duration-500 group-hover:scale-110" 
                        style={{ color: game.color, boxShadow: `0 0 20px ${game.color}22` }}
                      >
                        {game.icon}
                      </div>
                      <div className="text-right font-mono text-[9px] font-black uppercase tracking-widest text-gray-600">
                        Difficulty: <span style={{ color: game.color }}>{game.difficulty}</span>
                      </div>
                    </div>

                    <h3 className="font-[family-name:var(--font-outfit)] text-3xl font-black uppercase mb-4 text-white group-hover:text-[#7ed957] transition-colors">{game.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed font-mono uppercase mb-12 h-10 opacity-80">{game.desc}</p>
                    
                    <div className="flex items-center justify-between mb-8">
                       <div className="flex flex-col">
                          <span className="text-[8px] font-mono text-gray-600 uppercase font-black tracking-widest">Est. Reward</span>
                          <span className="text-[#7ed957] font-mono font-black text-sm">{game.xp}</span>
                       </div>
                       <div className="h-8 w-px bg-white/5" />
                       <div className="flex flex-col items-end">
                          <span className="text-[8px] font-mono text-gray-600 uppercase font-black tracking-widest">Protocol Status</span>
                          <span className="text-white font-mono font-black text-sm">ONLINE</span>
                       </div>
                    </div>

                    <button 
                      onClick={() => handleStartMission(game.slug)}
                      className={`w-full py-5 font-black uppercase text-xs tracking-[0.2em] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-3
                        ${isLoggedIn 
                          ? 'bg-[#7ed957] text-black hover:bg-[#ffb423] shadow-[0_0_30px_rgba(126,217,87,0.2)]' 
                          : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'}`}
                    >
                      {isLoggedIn ? <Play size={16} fill="currentColor" /> : <Lock size={16} />}
                      {isLoggedIn ? "Initialize Protocol" : "Authorization Required"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* --- RIGHT: GAMES DASHBOARD --- */}
          <div className="space-y-8">
             
             {/* HALL OF FAME CARD */}
             <div className="bg-[#0a101f] border border-[#7ed95733] p-8 rounded-[32px] backdrop-blur-xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Trophy size={80} />
                </div>
                <div className="flex items-center gap-3 mb-10 relative z-10">
                   <Trophy className="text-[#ffb423]" size={20} />
                   <h3 className="font-[family-name:var(--font-outfit)] text-xl font-black uppercase tracking-tighter text-white">Hall of Fame</h3>
                </div>
                
                <div className="space-y-6 relative z-10">
                   <GameStat label="Subnet Speedrun" value="2,400" icon={<Zap size={14}/>} />
                   <GameStat label="Binary Blitz" value="1,150" icon={<Binary size={14}/>} />
                   <GameStat label="Packet Route" value="1,800" icon={<Route size={14}/>} />
                   <GameStat label="Cable Chaos" value="950" icon={<Cable size={14}/>} />
                </div>
             </div>

             {/* RECENT MISSION LOGS */}
             <div className="bg-[#0a101f]/40 border border-white/5 p-8 rounded-[32px] backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-10">
                   <History className="text-[#7ed957]" size={20} />
                   <h3 className="font-[family-name:var(--font-outfit)] text-xl font-black uppercase tracking-tighter text-white">Simulation Log</h3>
                </div>
                <div className="space-y-8">
                   {RECENT_SIMULATIONS.map((sim, idx) => (
                     <div key={idx} className="flex gap-4 group">
                        <div className="mt-1">
                           {sim.status === 'success' ? (
                             <CheckCircle2 size={16} className="text-[#7ed957] opacity-50 group-hover:opacity-100 transition-opacity" />
                           ) : (
                             <Clock size={16} className="text-red-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                           )}
                        </div>
                        <div className="flex-1">
                           <div className="flex justify-between items-center mb-1">
                              <p className="text-[11px] font-bold text-white uppercase tracking-tight">{sim.name}</p>
                              <span className="text-[#7ed957] font-mono text-[10px] font-black">{sim.score !== '---' ? `+${sim.score}` : ''}</span>
                           </div>
                           <p className="font-mono text-[9px] uppercase font-bold text-gray-600">{sim.time} // {sim.status.toUpperCase()}</p>
                        </div>
                     </div>
                   ))}
                </div>
                <button className="w-full mt-10 py-4 bg-white/5 border border-white/5 rounded-xl font-mono text-[9px] font-black uppercase text-gray-500 hover:text-white transition-all cursor-pointer">
                    View Full Telemetry
                </button>
             </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

// --- SUB-COMPONENTS ---

function GameStat({ label, value, icon }: any) {
    return (
        <div className="flex items-center justify-between border-b border-white/5 pb-4 group">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-600 group-hover:text-[#7ed957] transition-colors">
                    {icon}
                </div>
                <span className="text-gray-500 font-mono text-[9px] font-black uppercase tracking-widest group-hover:text-white transition-colors">{label}</span>
            </div>
            <span className="text-[#7ed957] font-black font-mono text-sm tracking-tighter">{value}</span>
        </div>
    )
}