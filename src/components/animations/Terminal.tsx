"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LogEntry {
  type: "command" | "info" | "success" | "warn" | "data";
  text: string;
}

const TERMINAL_SEQUENCE: LogEntry[] = [
  { type: "command", text: "nmap -sV 192.168.1.0/24" },
  { type: "info", text: "Starting Nmap 7.92 ( https://nmap.org ) at 2025-12-28 20:45" },
  { type: "info", text: "Scanning 256 hosts..." },
  { type: "success", text: "Nmap scan report for odyssey.local (192.168.1.1)" },
  { type: "data", text: "PORT     STATE SERVICE VERSION" },
  { type: "data", text: "80/tcp   open  http    OdysseyServer v1.0" },
  { type: "data", text: "443/tcp  open  https   OctateShield v2.4" },
  { type: "command", text: "octate --sync --force" },
  { type: "info", text: "Syncing protocol headers..." },
  { type: "success", text: "[##########] 100% - SYNC COMPLETE" },
  { type: "warn", text: "Unauthorized packet detected in Subnet 7... filtered." },
  { type: "info", text: "System ready. Awaiting Pilot input." },
];

export default function Terminal() {
  const [displayedLogs, setDisplayedLogs] = useState<LogEntry[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sequenceIndex >= TERMINAL_SEQUENCE.length) {
      // Loop sequence after a delay
      const timeout = setTimeout(() => {
        setDisplayedLogs([]);
        setSequenceIndex(0);
      }, 5000);
      return () => clearTimeout(timeout);
    }

    const entry = TERMINAL_SEQUENCE[sequenceIndex];

    if (entry.type === "command") {
      // Type out commands character by character
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
          }, 600);
        }
      }, 50);
      return () => clearInterval(interval);
    } else {
      // System logs appear instantly with a slight delay
      const timeout = setTimeout(() => {
        setDisplayedLogs((prev) => [...prev, entry]);
        setSequenceIndex((prev) => prev + 1);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [sequenceIndex]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedLogs, currentText]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto mt-12 group"
    >
      {/* Window Header */}
      <div className="bg-[#0f172a] border-x border-t border-white/10 rounded-t-xl px-4 py-3 flex items-center justify-between shadow-2xl">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-[#ffb423]/30 border border-[#ffb423]/50" />
          <div className="w-3 h-3 rounded-full bg-[#7ed957]/30 border border-[#7ed957]/50" />
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
          <div className="w-2 h-2 rounded-full bg-[#7ed957] animate-pulse" />
          Secure Shell — v2.0.25
        </div>
      </div>

      {/* Terminal Body */}
      <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-b-xl h-64 overflow-hidden font-mono text-[13px] leading-relaxed shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {/* CRT Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-20" />
        
        <div ref={scrollRef} className="h-full overflow-y-auto scrollbar-hide pr-2">
          {displayedLogs.map((log, i) => (
            <div key={i} className="mb-1">
              {log.type === "command" ? (
                <p className="text-white">
                  <span className="text-[#7ed957] font-bold">pilot@odyssey</span>
                  <span className="text-gray-500">:</span>
                  <span className="text-[#ffb423]">~</span>
                  <span className="text-gray-500">$</span> {log.text}
                </p>
              ) : (
                <p style={{ color: getLogColor(log.type) }} className="opacity-90">
                  <span className="opacity-40 mr-2">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' })}]</span>
                  {log.text}
                </p>
              )}
            </div>
          ))}

          {/* Current Typing Command */}
          {currentText && (
            <div className="flex gap-2">
              <p className="text-white">
                <span className="text-[#7ed957] font-bold">pilot@odyssey</span>
                <span className="text-gray-500">:</span>
                <span className="text-[#ffb423]">~</span>
                <span className="text-gray-500">$</span> {currentText}
                <span className="w-2 h-4 bg-[#7ed957] inline-block animate-pulse ml-1 align-middle" />
              </p>
            </div>
          )}
          
          {/* Static Cursor when idle */}
          {!currentText && sequenceIndex < TERMINAL_SEQUENCE.length && (
             <div className="flex gap-2">
               <span className="text-gray-500 animate-pulse">{">"}_</span>
             </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function getLogColor(type: string) {
  switch (type) {
    case "success": return "#7ed957";
    case "warn": return "#ffb423";
    case "data": return "#94a3b8";
    case "info": return "#475569";
    default: return "#ffffff";
  }
}