"use client";
import { motion } from "framer-motion";
import { 
  Globe, Zap, Cpu, Activity, ShieldAlert, Send, 
  Gauge, Search, Timer, Lock, Route, RefreshCcw 
} from "lucide-react";

const features = [
  { title: "IP MASTERY", icon: <Globe size={28} />, color: "#ffb423", desc: "Navigate the global addressing matrix." },
  { title: "SUBNET SPEEDRUN", icon: <Zap size={28} />, color: "#7ed957", desc: "Slice networks in microseconds." },
  { title: "OSI ARCHITECTURE", icon: <Cpu size={28} />, color: "#ffb423", desc: "Build the foundation of the web." },
  { title: "TRAFFIC ANALYST", icon: <Activity size={28} />, color: "#7ed957", desc: "Monitor the pulse of data streams." },
  { title: "PROTOCOL PRO", icon: <RefreshCcw size={28} />, color: "#ffb423", desc: "Master communication standards." },
  { title: "FIREWALL FURY", icon: <ShieldAlert size={28} />, color: "#7ed957", desc: "Defend against cyber threats." },
  { title: "PACKET Navigator", icon: <Send size={28} />, color: "#ffb423", desc: "Direct data with precision." },
  { title: "BANDWIDTH BOSS", icon: <Gauge size={28} />, color: "#7ed957", desc: "Optimize network flow." },
  { title: "DNS DYNAMO", icon: <Search size={28} />, color: "#ffb423", desc: "Resolve names at lightning speed." },
  { title: "LATENCY LEGEND", icon: <Timer size={28} />, color: "#7ed957", desc: "Minimize delays, maximize speed." },
  { title: "ENCRYPTION EXPERT", icon: <Lock size={28} />, color: "#ffb423", desc: "Secure data with advanced algorithms." },
  { title: "ROUTING RULER", icon: <Route size={28} />, color: "#7ed957", desc: "Chart the best paths for data." },
];

export default function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-[1600px] mx-auto mt-24 px-10">
      {features.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ y: -12, scale: 1.02 }}
          className="group relative bg-[#0a101f]/60 backdrop-blur-sm border border-white/5 p-10 rounded-3xl overflow-hidden cursor-pointer transition-all duration-300"
        >
          {/* Neon Border Glow on Hover */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
            style={{ 
              border: `2px solid ${f.color}`, 
              boxShadow: `inset 0 0 20px ${f.color}22, 0 0 30px ${f.color}33` 
            }}
          />
          
          <div className="relative z-10">
            {/* Icon with Glowing Backdrop */}
            <div 
              className="mb-8 inline-block p-4 rounded-2xl bg-white/5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[10deg]" 
              style={{ color: f.color, boxShadow: `0 0 15px ${f.color}44` }}
            >
              {f.icon}
            </div>

            {/* Title with Syne Font and Brand Color */}
            <h3 
              className="font-[family-name:var(--font-syne)] font-black text-xl mb-3 tracking-tighter transition-colors duration-300"
              style={{ color: f.color }}
            >
              {f.title}
            </h3>

            {/* Description - Brighter and matching logo */}
            <p 
              className="font-[family-name:var(--font-space)] text-sm leading-relaxed font-bold tracking-tight opacity-80 group-hover:opacity-100 transition-opacity"
              style={{ color: f.color === "#ffb423" ? "#ffca60" : "#a8f08a" }} // Lighter versions of brand colors
            >
              {f.desc}
            </p>
          </div>

          {/* Background Number Decal - Precise and Modern */}
          <div className="absolute -bottom-6 -right-4 text-white/[0.03] font-black text-8xl select-none group-hover:text-white/[0.07] transition-colors">
            {i + 1 < 10 ? `0${i + 1}` : i + 1}
          </div>
        </motion.div>
      ))}
    </div>
  );
}