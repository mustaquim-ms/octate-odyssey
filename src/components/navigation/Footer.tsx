"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Github, Twitter, Hash, Mail, 
  Cpu, ShieldCheck, LogOut
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#020617] pt-40 pb-12 font-[family-name:var(--font-jetbrains)] overflow-hidden">
      {/* --- TOP LASER SWEEP --- */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/5">
        <motion.div 
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-64 h-full bg-gradient-to-r from-transparent via-[#7ed957] to-transparent shadow-[0_0_20px_#7ed957]"
        />
      </div>

      <div className="max-w-[1600px] mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
          
          {/* --- BRAND IDENTITY MODULE --- */}
          <div className="lg:col-span-4 flex flex-col items-start relative">
            
            {/* NEW BACKGROUND: Vertical Blueprint Text */}
            <div 
              className="absolute -top-20 -left-12 font-[family-name:var(--font-outfit)] font-[900] text-[12rem] leading-none select-none pointer-events-none opacity-[0.03]"
              style={{ WebkitTextStroke: '2px white', color: 'transparent' }}
            >
              ODYSSEY
            </div>

            <div className="relative z-10 flex flex-col gap-8">
              {/* UPGRADED LOGO: Holographic Heartbeat */}
              <motion.div
                initial={{ opacity: 0.8 }}
                animate={{ 
                  opacity: [0.8, 1, 0.9, 1, 0.8],
                  scale: [1, 1.02, 1],
                  filter: [
                    "drop-shadow(0 0 15px rgba(126,217,87,0.2))",
                    "drop-shadow(0 0 35px rgba(126,217,87,0.5))",
                    "drop-shadow(0 0 15px rgba(126,217,87,0.2))"
                  ]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative cursor-none"
              >
                <Image 
                  src="/logo.png" 
                  alt="Octate Odyssey" 
                  width={200} 
                  height={200} 
                  priority
                />
                {/* Horizontal Scanline Overlay */}
                <motion.div 
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-[2px] bg-[#7ed957]/20 blur-[1px] pointer-events-none"
                />
              </motion.div>

              <p className="text-gray-500 text-[10px] leading-relaxed max-w-sm uppercase font-black tracking-[0.2em] opacity-80 font-mono">
                Engineering the backbone of the digital matrix through 
                <span className="text-white"> deep-packet immersion</span> and high-fidelity protocol logic. 
                <br /><br />
                Authorized for multi-layer infrastructure deployment // 
                <span className="text-[#7ed957] drop-shadow-[0_0_8px_#7ed95766]"> Uplink: Synchronized.</span>
              </p>

              {/* SOCIAL HEXAGONS */}
              <div className="flex gap-4 mt-2">
                <SocialLink href="https://github.com/octateodyssey" icon={<Github size={20} />} hoverColor="#ffffff" />
                <SocialLink href="https://x.com/octateodyssey" icon={<Twitter size={20} />} hoverColor="#1DA1F2" />
                <SocialLink href="https://discord.gg/octateodyssey" icon={<Hash size={20} />} hoverColor="#5865F2" />
                <SocialLink href="mailto:support@octateodyssey.com" icon={<Mail size={20} />} hoverColor="#ffb423" />
              </div>
            </div>
          </div>

          {/* --- NAVIGATION MATRIX --- */}
          <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-3 gap-8">
            <FooterNav title="Main_Frame" accent="#ffb423" links={[
              { n: "Dashboard", h: "/dashboard" },
              { n: "Learning", h: "/learning" },
              { n: "Global Ranks", h: "/leaderboard" },
              { n: "Community", h: "/community" }
            ]} />

            <FooterNav title="Tactical_Ops" accent="#7ed957" links={[
              { n: "Active Missions", h: "/missions" },
              { n: "Sandbox", h: "/labs" },
              { n: "Daily Ping", h: "/challenges" },
              { n: "Diplomas", h: "/certifications" }
            ]} />

            <FooterNav title="Archives" accent="#ffb423" links={[
              { n: "IP Calc", h: "/resources" },
              { n: "Visualizer", h: "/resources" },
              { n: "Simulator", h: "/resources" },
              { n: "API Protocol", h: "#" }
            ]} />
          </div>

          {/* --- SYSTEM MONITOR PANEL --- */}
          <div className="lg:col-span-3">
             <div className="bg-[#0a101f] border-2 border-white/5 rounded-[32px] p-8 relative overflow-hidden group hover:border-[#7ed95733] transition-all duration-700">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[size:100%_2px] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)]" />
                
                <div className="flex items-center justify-between mb-8">
                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-[0.4em]">Subsystem Status</span>
                    <Cpu size={14} className="text-[#ffb423] animate-pulse" />
                </div>

                <div className="space-y-6">
                    <StatusLine label="ENCRYPTION" val="AES-256" color="#7ed957" />
                    <StatusLine label="LATENCY" val="0.004 MS" color="#7ed957" />
                    <StatusLine label="CORE_TEMP" val="OPTIMAL" color="#ffb423" />
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3">
                    <div className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7ed957] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#7ed957]"></span>
                    </div>
                    <span className="text-[9px] font-black uppercase text-[#7ed957] tracking-[0.3em]">Downlink Stable</span>
                </div>
             </div>
          </div>
        </div>

        {/* --- BOTTOM TELEMETRY BAR --- */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-bold uppercase tracking-[0.4em] text-gray-600">
          <div className="flex items-center gap-5">
            <span className="text-white/20">SYSTEM_ID: ODYSSEY_ROOT_2025</span>
            <div className="h-3 w-px bg-white/10" />
            <span className="hover:text-white transition-colors cursor-default">বাংলাদেশ // AS45829</span>
          </div>

          <div className="flex gap-10">
            <Link href="#" className="hover:text-[#ffb423] transition-colors">Privacy_Protocol</Link>
            <Link href="#" className="hover:text-[#ffb423] transition-colors">Safety_Log</Link>
            <span className="text-white font-black tracking-[0.2em]">© {currentYear} OCTATE ODYSSEY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- REUSABLE SUB-COMPONENTS ---

function FooterNav({ title, links, accent }: any) {
    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-10">
                <div className="w-1 h-4 rounded-full" style={{ backgroundColor: accent }} />
                <h4 className="font-[family-name:var(--font-outfit)] font-black text-[13px] uppercase tracking-[0.4em] text-white">
                    {title}
                </h4>
            </div>
            <ul className="space-y-5">
                {links.map((l: any, i: number) => (
                    <li key={i}>
                        <Link href={l.h} className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-[#7ed957] transition-all">
                            <span className="text-white/10 group-hover:text-[#7ed957] transition-colors font-mono">[{i+1 < 10 ? `0${i+1}` : i+1}]</span>
                            <span className="relative">
                                {l.n}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#7ed957] transition-all group-hover:w-full" />
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function StatusLine({ label, val, color }: any) {
    return (
        <div className="flex justify-between items-center group">
            <span className="text-[9px] font-mono font-black text-gray-600 group-hover:text-gray-400 transition-colors">{label}</span>
            <span className="font-mono text-[11px] font-black tracking-tighter" style={{ color }}>{val}</span>
        </div>
    );
}

function SocialLink({ href, icon, hoverColor }: any) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.a 
      href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      className="w-14 h-14 flex items-center justify-center bg-white/[0.02] border border-white/10 rounded-2xl text-gray-500 transition-all duration-500 shadow-xl relative overflow-hidden group"
      style={{ 
        borderColor: isHovered ? `${hoverColor}44` : "rgba(255,255,255,0.05)",
        color: isHovered ? hoverColor : "#4b5563"
      }}
    >
      <div className="absolute inset-0 bg-white/[0.01] group-hover:bg-transparent transition-colors" />
      {isHovered && (
          <motion.div 
            layoutId="social-glow"
            className="absolute inset-0 blur-2xl opacity-10"
            style={{ backgroundColor: hoverColor }}
          />
      )}
      <span className="relative z-10">{icon}</span>
    </motion.a>
  );
}