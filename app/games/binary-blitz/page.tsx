"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/navigation/Navbar";
import { Binary, Timer, Trophy, RotateCcw, ShieldCheck } from "lucide-react";

export default function BinaryBlitz() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'result'>('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [currentBinary, setCurrentBinary] = useState("");
  const [answer, setAnswer] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const generateBinary = () => {
    const num = Math.floor(Math.random() * 256);
    setCurrentBinary(num.toString(2).padStart(8, '0'));
    setAnswer(num);
    setFeedback(null);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(45);
    setGameState('playing');
    generateBinary();
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) setGameState('result');
  }, [timeLeft, gameState]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(userInput) === answer) {
      setFeedback('correct');
      setScore(s => s + 150);
      setTimeout(() => { setUserInput(""); generateBinary(); }, 500);
    } else {
      setFeedback('wrong');
      setScore(s => Math.max(0, s - 50));
      setTimeout(() => setFeedback(null), 800);
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto pt-40 px-10 relative z-10 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {gameState === 'idle' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center bg-[#0a101f] p-16 rounded-[40px] border border-[#ffb42333]">
              <Binary size={64} className="text-[#ffb423] mx-auto mb-8" />
              <h1 className="text-5xl font-black uppercase mb-4">Binary Blitz</h1>
              <p className="text-gray-500 mb-10 uppercase text-xs tracking-widest">Convert the 8-bit stream to decimal before time expires.</p>
              <button onClick={startGame} className="px-12 py-5 bg-[#ffb423] text-black font-black uppercase text-xs rounded-xl cursor-pointer">Start Sequence</button>
            </motion.div>
          ) : gameState === 'playing' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
              <div className="flex justify-between mb-12 bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3"><Timer className="text-[#ffb423]" /> <span className="text-3xl font-black">{timeLeft}s</span></div>
                <div className="flex items-center gap-3"><Trophy className="text-[#7ed957]" /> <span className="text-3xl font-black">{score}</span></div>
              </div>
              <div className={`p-20 rounded-[50px] text-center border-2 transition-all ${feedback === 'correct' ? 'border-[#7ed957]' : feedback === 'wrong' ? 'border-red-500' : 'border-white/10'}`}>
                <span className="text-gray-500 text-xs font-bold uppercase tracking-[0.5em] mb-6 block">Incoming Data Stream</span>
                <div className="text-7xl font-black font-mono tracking-widest text-[#ffb423]">{currentBinary}</div>
              </div>
              <form onSubmit={handleSubmit} className="mt-10 flex gap-4 max-w-md mx-auto">
                <input autoFocus value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="???" className="flex-1 bg-white/5 border-2 border-white/10 rounded-2xl py-6 text-center text-3xl font-bold focus:border-[#ffb423] outline-none" />
                <button type="submit" className="bg-[#ffb423] text-black px-10 rounded-2xl font-black uppercase text-xs">Verify</button>
              </form>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center bg-[#0a101f] p-16 rounded-[40px] border border-[#7ed95733]">
              <h2 className="text-8xl font-black text-[#7ed957] mb-4">{score}</h2>
              <p className="text-gray-500 uppercase tracking-widest mb-12">Total XP Synced</p>
              <div className="flex gap-4"><button onClick={startGame} className="px-10 py-5 border border-white/10 rounded-xl uppercase font-black text-xs">Retry</button>
              <Link href="/games"><button className="px-10 py-5 bg-[#7ed957] text-black rounded-xl uppercase font-black text-xs">Dashboard</button></Link></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}