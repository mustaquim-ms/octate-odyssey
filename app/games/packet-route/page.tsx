"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/navigation/Navbar";
import { Route, Timer, Trophy, ShieldCheck, Map } from "lucide-react";

export default function PacketRoute() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'result'>('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [problem, setProblem] = useState<any>(null);

  const gateways = [
    { id: "A", range: "10.0.0.0/8", color: "#7ed957" },
    { id: "B", range: "172.16.0.0/12", color: "#ffb423" },
    { id: "C", range: "192.168.0.0/16", color: "#00d4ff" }
  ];

  const generateProblem = () => {
    const type = Math.floor(Math.random() * 3);
    let ip = "";
    if (type === 0) ip = `10.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.1`;
    else if (type === 1) ip = `172.16.${Math.floor(Math.random()*15)}.${Math.floor(Math.random()*255)}`;
    else ip = `192.168.${Math.floor(Math.random()*255)}.50`;
    
    setProblem({ ip, correct: gateways[type].id });
  };

  const handleChoice = (id: string) => {
    if (id === problem.correct) {
      setScore(s => s + 200);
      generateProblem();
    } else {
      setScore(s => Math.max(0, s - 100));
      generateProblem();
    }
  };

  const startGame = () => {
    setScore(0); setTimeLeft(60); setGameState('playing'); generateProblem();
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const t = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(t);
    } else if (timeLeft === 0) setGameState('result');
  }, [timeLeft, gameState]);

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto pt-40 px-10 relative z-10 text-center">
        <AnimatePresence mode="wait">
          {gameState === 'idle' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0a101f] p-16 rounded-[40px] border border-[#00d4ff33]">
              <Map size={64} className="text-[#00d4ff] mx-auto mb-8" />
              <h1 className="text-5xl font-black uppercase mb-4 tracking-tighter">Packet Route</h1>
              <p className="text-gray-500 mb-10 text-xs tracking-[0.2em]">Route the data to the correct gateway based on RFC1918 Private Ranges.</p>
              <button onClick={startGame} className="px-12 py-5 bg-[#00d4ff] text-black font-black uppercase text-xs rounded-xl">Launch Simulator</button>
            </motion.div>
          ) : gameState === 'playing' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between mb-12"><span className="text-3xl font-black">Time: {timeLeft}s</span><span className="text-3xl font-black text-[#7ed957]">Score: {score}</span></div>
              <div className="bg-white/5 border border-white/10 p-16 rounded-[50px] mb-12">
                <span className="text-gray-500 font-bold uppercase tracking-[0.5em] mb-4 block">Destination IP</span>
                <div className="text-7xl font-black text-white">{problem?.ip}</div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {gateways.map(g => (
                  <button key={g.id} onClick={() => handleChoice(g.id)} className="group p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all cursor-pointer">
                    <p className="text-3xl font-black mb-2" style={{ color: g.color }}>GW-{g.id}</p>
                    <p className="text-[10px] font-mono text-gray-500 font-bold uppercase">{g.range}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#0a101f] p-16 rounded-[40px]">
              <h2 className="text-9xl font-black text-[#00d4ff] mb-4">{score}</h2>
              <p className="uppercase font-bold tracking-widest text-gray-500 mb-10">Network Efficiency Rating</p>
              <Link href="/games"><button className="px-12 py-5 bg-white text-black font-black uppercase text-xs rounded-xl">Save & Exit</button></Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}