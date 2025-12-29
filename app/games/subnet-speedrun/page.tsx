"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link"; // FIXED: Added missing import
import Navbar from "@/components/navigation/Navbar";
import { Zap, Timer, Trophy, RotateCcw, ShieldCheck, CheckCircle2, XCircle, Send } from "lucide-react";

export default function SubnetSpeedrun() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'result'>('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentProblem, setCurrentProblem] = useState<any>(null);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  // LOGIC: Real Subnetting Math Generator
  const generateProblem = () => {
    const oct1 = 192;
    const oct2 = 168;
    const oct3 = Math.floor(Math.random() * 254);
    const masks = [25, 26, 27, 28, 29, 30];
    const mask = masks[Math.floor(Math.random() * masks.length)];
    
    const increment = Math.pow(2, 32 - mask);
    const randomHost = Math.floor(Math.random() * 254);
    const networkOctet = Math.floor(randomHost / increment) * increment;
    
    const ip = `${oct1}.${oct2}.${oct3}.${randomHost}`;
    const answer = `${oct1}.${oct2}.${oct3}.${networkOctet}`;
    
    setCurrentProblem({ ip, mask: `/${mask}`, answer });
    setFeedback(null);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameState('playing');
    generateProblem();
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('result');
    }
  }, [timeLeft, gameState]);

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userInput) return;

    if (userInput.trim() === currentProblem.answer) {
      setFeedback('correct');
      setScore(prev => prev + 100);
      setTimeout(() => {
        setUserInput("");
        generateProblem();
      }, 600);
    } else {
      setFeedback('wrong');
      setScore(prev => Math.max(0, prev - 50));
      // Briefly show wrong then let them try again or clear
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white overflow-hidden font-[family-name:var(--font-mono)]">
      <Navbar />

      <div className="max-w-4xl mx-auto pt-40 px-10 relative z-10 flex flex-col items-center">
        
        <AnimatePresence mode="wait">
          {/* 1. START SCREEN */}
          {gameState === 'idle' && (
            <motion.div key="start" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center bg-[#0a101f] border border-[#7ed95733] p-16 rounded-[40px]">
              <Zap size={64} className="text-[#7ed957] mx-auto mb-8 animate-pulse" />
              <h1 className="font-[family-name:var(--font-outfit)] text-5xl font-black uppercase mb-4">Subnet Speedrun</h1>
              <p className="text-gray-500 text-xs mb-10 uppercase tracking-widest">Identify the Network ID (First IP) for the target.</p>
              <button onClick={startGame} className="px-12 py-5 bg-[#7ed957] text-black font-black uppercase text-xs rounded-xl cursor-pointer hover:bg-[#ffb423] transition-all">
                Initialize System
              </button>
            </motion.div>
          )}

          {/* 2. GAMEPLAY SCREEN */}
          {gameState === 'playing' && (
            <motion.div key="play" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
              <div className="flex justify-between items-center w-full mb-12 bg-white/5 p-6 rounded-2xl border border-white/10">
                 <div className="flex items-center gap-4">
                    <Timer className={timeLeft < 10 ? "text-red-500 animate-ping" : "text-[#ffb423]"} />
                    <span className="text-3xl font-black">{timeLeft}s</span>
                 </div>
                 <div className="flex items-center gap-4 text-[#7ed957]">
                    <Trophy size={24} />
                    <span className="text-3xl font-black">{score}</span>
                 </div>
              </div>

              <div className={`relative bg-[#0a101f] border-2 transition-all duration-300 p-20 rounded-[50px] mb-10 text-center
                ${feedback === 'correct' ? 'border-[#7ed957] shadow-[0_0_40px_rgba(126,217,87,0.2)]' : 
                  feedback === 'wrong' ? 'border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.2)]' : 'border-white/5'}`}>
                
                <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">Target IP / CIDR</span>
                <div className="text-6xl md:text-7xl font-black font-[family-name:var(--font-outfit)] tracking-tighter">
                  {currentProblem.ip}<span className="text-[#7ed957]">{currentProblem.mask}</span>
                </div>

                <div className="absolute top-6 right-10">
                    {feedback === 'correct' && <CheckCircle2 className="text-[#7ed957] animate-bounce" size={40} />}
                    {feedback === 'wrong' && <XCircle className="text-red-500 animate-shake" size={40} />}
                </div>
              </div>

              <form onSubmit={handleVerify} className="relative w-full max-w-lg mx-auto flex gap-4">
                <input 
                  autoFocus
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Enter Network ID..."
                  className="flex-1 bg-white/5 border-2 border-white/10 rounded-2xl py-6 px-8 text-2xl font-bold focus:outline-none focus:border-[#7ed957] transition-all text-center"
                />
                <button type="submit" className="bg-[#7ed957] text-black px-8 rounded-2xl hover:bg-[#ffb423] transition-all cursor-pointer shadow-lg">
                    <Send size={24} />
                </button>
              </form>
            </motion.div>
          )}

          {/* 3. RESULT SCREEN */}
          {gameState === 'result' && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="bg-[#0a101f] border border-white/10 p-16 rounded-[40px] shadow-2xl">
                  <h2 className="text-[#ffb423] text-sm font-black uppercase tracking-[0.4em] mb-4">Mission Concluded</h2>
                  <div className="text-9xl font-black font-[family-name:var(--font-outfit)] text-white mb-2">{score}</div>
                  <p className="text-gray-500 font-bold uppercase tracking-widest mb-12">Performance Rating: <span className="text-[#7ed957]">S-Tier</span></p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={startGame} className="flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/10 rounded-xl hover:bg-white/5 cursor-pointer transition-all">
                      <RotateCcw size={20} /> <span className="font-black uppercase text-xs">Re-Initialize</span>
                    </button>
                    <Link href="/games">
                       <button className="flex items-center justify-center gap-3 px-10 py-5 bg-[#7ed957] text-black font-black uppercase text-xs rounded-xl cursor-pointer hover:bg-[#ffb423] transition-all">
                         <ShieldCheck size={20} /> Dashboard
                       </button>
                    </Link>
                  </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}