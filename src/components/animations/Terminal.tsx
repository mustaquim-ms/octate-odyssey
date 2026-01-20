"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, Activity, Wifi, ShieldCheck } from "lucide-react";

interface LogEntry {
  type: "command" | "info" | "success" | "warn" | "data" | "glitch";
  text: string;
}

const TERMINAL_SEQUENCE: LogEntry[] = [
  { type: "glitch", text: "--- INITIALIZING ODYSSEY ENCRYPTED TUNNEL ---" },
  { type: "command", text: "nmap -sV 192.168.1.0/24 --script=auth" },
  { type: "info", text: "Scanning 256 nodes in Sector 7..." },
  { type: "data", text: "Node [192.168.1.1] identified as: GATEWAY_ALPHA" },
  { type: "success", text: "Port 443 OPEN: SSL/TLS handshake complete." },
  { type: "command", text: "octate-cli sync --matrix --force" },
  { type: "info", text: "Syncing neural protocol headers..." },
  { type: "data", text: "PROGRESS: [||||||||||||----------] 52%" },
  { type: "data", text: "PROGRESS: [||||||||||||||||||||||] 100%" },
  { type: "success", text: "STATUS: FULL SYNCHRONIZATION ACHIEVED" },
  { type: "warn", text: "Heuristic Alert: Buffer overflow attempt at 0x0045F - Blocked." },
  { type: "command", text: "ssh Navigator@odyssey-mainframe" },
  { type: "info", text: "Identity Verified. Welcome, Navigator." },
];

export default function Terminal() {
  const [displayedLogs, setDisplayedLogs] = useState<LogEntry[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sequenceIndex >= TERMINAL_SEQUENCE.length) {
      const timeout = setTimeout(() => {
        setDisplayedLogs([]);
        setSequenceIndex(0);
      }, 8000);
      return () => clearTimeout(timeout);
    }

    const entry = TERMINAL_SEQUENCE[sequenceIndex];

    if (entry.type === "command") {
      let i = 0;
      const interval = setInterval(() => {
        setCurrentText(entry.text.slice(0, i + 1));
        i++;
        if (i === entry.text.length) {
          clearInterval(interval);
          setTimeout(() => {
            setDisplayedLogs((prev) => [...prev, entry]);
            setCurrentText("");
            setSequenceIndex((prev) => prev + 1);
          }, 800);
        }
      }, 40);
      return () => clearInterval(interval);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLogs((prev) => [...prev, entry]);
        setSequenceIndex((prev) => prev + 1);
      }, entry.type === "glitch" ? 100 : 600);
      return () => clearTimeout(timeout);
    }
  }, [sequenceIndex]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedLogs, currentText]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto mt-12 group relative"
    >
      {/* Outer Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#7ed957]/20 to-[#ffb423]/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />

      {/* Terminal Header */}
      <div className="relative bg-[#020617] border-x border-t border-white/10 rounded-t-2xl px-5 py-4 flex items-center justify-between shadow-2xl backdrop-blur-xl">
        <div className="flex gap-2.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_#ff5f5666]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_#ffbd2e66]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_#27c93f66]" />
        </div>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-gray-500 font-bold">
                <span className="text-[#7ed957] animate-pulse">●</span> SSH: 128.0.0.1
            </div>
            <div className="h-4 w-px bg-white/10" />
            <TerminalIcon size={14} className="text-gray-600" />
        </div>
      </div>

      {/* Terminal Body */}
      <div className="relative bg-black/80 backdrop-blur-2xl border border-white/10 p-8 rounded-b-2xl h-[400px] overflow-hidden font-mono text-[13px] leading-relaxed shadow-inner">
        
        {/* CRT Scanline & Glitch Overlays */}
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%]" />
            <motion.div 
                animate={{ y: ["0%", "100%"] }} 
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-full h-20 bg-white/[0.02] blur-xl" 
            />
        </div>

        {/* Console Content */}
        <div ref={scrollRef} className="h-[280px] overflow-y-auto scrollbar-hide pr-2 relative z-10 custom-terminal-text">
          <AnimatePresence>
            {displayedLogs.map((log, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-1.5"
              >
                {log.type === "command" ? (
                  <div className="text-white flex gap-2">
                    <span className="text-[#7ed957] font-bold whitespace-nowrap">Navigator@odyssey</span>
                    <span className="text-gray-600">~ $</span> 
                    <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{log.text}</span>
                  </div>
                ) : log.type === "glitch" ? (
                    <div className="text-gray-500 text-[11px] py-2 border-y border-white/5 my-2 tracking-[0.2em] text-center font-black">
                        {log.text}
                    </div>
                ) : (
                  <div style={{ color: getLogColor(log.type) }} className="flex gap-3 items-start">
                    <span className="text-[10px] opacity-30 mt-0.5 whitespace-nowrap">
                        {new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' })}
                    </span>
                    <span className="drop-shadow-[0_0_5px_currentColor]">{log.text}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Active Typing Line */}
          {currentText && (
            <div className="flex gap-2">
                <span className="text-[#7ed957] font-bold whitespace-nowrap">Navigator@odyssey</span>
                <span className="text-gray-600">~ $</span>
                <div className="flex items-center">
                    {currentText}
                    <motion.span 
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-2 h-4 bg-[#7ed957] ml-1 shadow-[0_0_10px_#7ed957]"
                    />
                </div>
            </div>
          )}
        </div>

        {/* Terminal Footer Bar */}
        <div className="absolute bottom-0 left-0 w-full bg-white/[0.03] border-t border-white/5 px-6 py-4 flex justify-between items-center z-40 backdrop-blur-md">
            <div className="flex gap-6">
                <TerminalStat icon={<Activity size={10} />} label="CPU" val="12.4%" color="#7ed957" />
                <TerminalStat icon={<Wifi size={10} />} label="LAT" val="14ms" color="#ffb423" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-[#7ed95711] border border-[#7ed95722] rounded-full">
                <ShieldCheck size={10} className="text-[#7ed957]" />
                <span className="text-[8px] font-black uppercase text-[#7ed957] tracking-widest">Encrypted</span>
            </div>
        </div>
      </div>
    </motion.div>
  );
}

function TerminalStat({ icon, label, val, color }: any) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-gray-600">{icon}</span>
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tight">{label}:</span>
            <span className="text-[9px] font-black font-mono" style={{ color }}>{val}</span>
        </div>
    );
}

function getLogColor(type: string) {
  switch (type) {
    case "success": return "#7ed957";
    case "warn": return "#ff4d4d";
    case "data": return "#a8a8a8";
    case "info": return "#ffb423";
    default: return "#ffffff";
  }
}