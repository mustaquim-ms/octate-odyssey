"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { Zap, Binary, Trophy, Activity, Target, History, Cable, Route } from "lucide-react";
import Link from "next/link";

const GAMES = [
  {
    title: "Subnet Speedrun",
    slug: "subnet-speedrun",
    desc: "Calculate Network IDs and Broadcasts against a 60s clock.",
    icon: <Zap size={32} />,
    color: "#7ed957",
    xp: "500 XP"
  },
  {
    title: "Binary Blitz",
    slug: "binary-blitz",
    desc: "Intercept falling bits and convert them before the buffer fills.",
    icon: <Binary size={32} />,
    color: "#ffb423",
    xp: "350 XP"
  },
  {
    title: "Packet Route",
    slug: "packet-route",
    desc: "Route packets to the correct gateway based on destination IPs.",
    icon: <Route size={32} />,
    color: "#00d4ff",
    xp: "450 XP"
  },
  {
    title: "Cable Chaos",
    slug: "cable-chaos",
    desc: "Arrange TIA/EIA-568B color codes to build a perfect patch cable.",
    icon: <Cable size={32} />,
    color: "#ff4d4d",
    xp: "300 XP"
  }
];

export default function GamesPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <Navbar />

      <section className="max-w-[1600px] mx-auto px-10 pt-40 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          <div className="lg:col-span-3">
            <div className="mb-16">
              <span className="text-[#7ed957] font-mono text-xs font-black uppercase tracking-[0.6em]">Simulation Environment</span>
              <h1 className="font-[family-name:var(--font-outfit)] text-6xl font-black uppercase tracking-tighter mt-2">The <span className="text-[#ffb423]">Chamber</span></h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {GAMES.map((game, i) => (
                <motion.div key={i} whileHover={{ y: -10 }} className="bg-[#0a101f] border border-white/5 p-10 rounded-[40px] relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="p-4 bg-white/5 rounded-2xl w-fit mb-8 text-[#7ed957] group-hover:text-[#ffb423] transition-colors">
                      {game.icon}
                    </div>
                    <h3 className="font-[family-name:var(--font-outfit)] text-3xl font-black uppercase mb-4">{game.title}</h3>
                    <p className="text-gray-500 text-sm mb-10 leading-relaxed font-mono uppercase">{game.desc}</p>
                    <Link href={`/games/${game.slug}`}>
                      <button className="w-full py-5 bg-[#7ed957] text-black font-black uppercase text-xs tracking-widest rounded-xl hover:bg-[#ffb423] transition-all cursor-pointer">
                        Start Mission
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* GAMES DASHBOARD - High Scores */}
          <div className="space-y-8">
             <div className="bg-[#0a101f] border border-[#7ed95733] p-8 rounded-[32px] backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-8">
                   <Activity className="text-[#7ed957]" size={20} />
                   <h3 className="font-[family-name:var(--font-outfit)] text-xl font-black uppercase">Hall of Fame</h3>
                </div>
                
                <div className="space-y-6">
                   <GameStat label="Subnet Speedrun" value="2,400" icon={<Zap size={14}/>} />
                   <GameStat label="Binary Blitz" value="1,150" icon={<Binary size={14}/>} />
                   <GameStat label="Packet Route" value="1,800" icon={<Route size={14}/>} />
                   <GameStat label="Cable Chaos" value="950" icon={<Cable size={14}/>} />
                </div>
             </div>
             {/* ... rest of your recent activity code ... */}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function GameStat({ label, value, icon }: any) {
    return (
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-2 text-gray-500 font-mono text-[10px] font-black uppercase">
                {icon} {label}
            </div>
            <span className="text-[#7ed957] font-black font-mono">{value}</span>
        </div>
    )
}