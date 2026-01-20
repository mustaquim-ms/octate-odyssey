"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface TerminalProps {
  expectedCommand: string;
  onSuccess: () => void;
  successOutput: string;
}

export default function InteractiveTerminal({ expectedCommand, onSuccess, successOutput }: TerminalProps) {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<{type: 'cmd' | 'out', text: string}[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    const newLogs = [...logs, { type: 'cmd' as const, text: `Navigator@odyssey:~$ ${input}` }];
    
    if (cmd === expectedCommand.toLowerCase()) {
      newLogs.push({ type: 'out' as const, text: successOutput });
      setTimeout(onSuccess, 1500);
    } else {
      newLogs.push({ type: 'out' as const, text: `Command not recognized: ${cmd}` });
    }
    
    setLogs(newLogs);
    setInput("");
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [logs]);

  return (
    <div className="w-full bg-black/80 border border-white/10 rounded-xl overflow-hidden font-mono text-sm shadow-2xl">
      <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex justify-between items-center">
        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Interactive Lab Terminal</span>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/40" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
          <div className="w-2 h-2 rounded-full bg-[#7ed957]/40" />
        </div>
      </div>
      <div ref={scrollRef} className="h-64 p-6 overflow-y-auto space-y-2">
        {logs.map((log, i) => (
          <p key={i} className={log.type === 'cmd' ? 'text-[#ffb423]' : 'text-gray-400'}>
            {log.text}
          </p>
        ))}
        <form onSubmit={handleCommand} className="flex gap-2">
          <span className="text-[#7ed957] font-bold">Navigator@odyssey:~$</span>
          <input 
            autoFocus
            className="bg-transparent outline-none border-none flex-1 text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}