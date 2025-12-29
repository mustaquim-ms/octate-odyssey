"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/navigation/Navbar";
import { Cable, RotateCcw, ShieldCheck, CheckCircle2, XCircle, Info } from "lucide-react";

// TIA/EIA-568B Color Standard
const WIRE_DATA = [
  { id: "wo", name: "White-Orange", color: "#ffffff", stripe: "#ff8c00" },
  { id: "o",  name: "Orange",       color: "#ff8c00", stripe: null },
  { id: "wg", name: "White-Green",  color: "#ffffff", stripe: "#32cd32" },
  { id: "b",  name: "Blue",         color: "#1e90ff", stripe: null },
  { id: "wb", name: "White-Blue",   color: "#ffffff", stripe: "#1e90ff" },
  { id: "g",  name: "Green",        color: "#32cd32", stripe: null },
  { id: "wbr",name: "White-Brown",  color: "#ffffff", stripe: "#8b4513" },
  { id: "br", name: "Brown",        color: "#8b4513", stripe: null },
];

const CORRECT_ORDER = ["wo", "o", "wg", "b", "wb", "g", "wbr", "br"];

export default function CableChaos() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'result'>('idle');
  const [slots, setSlots] = useState<(string | null)[]>(Array(8).fill(null));
  const [inventory, setInventory] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const startGame = () => {
    setSlots(Array(8).fill(null));
    setInventory([...CORRECT_ORDER].sort(() => Math.random() - 0.5));
    setGameState('playing');
    setFeedback(null);
  };

  const handleWireClick = (wireId: string) => {
    const nextEmptySlot = slots.indexOf(null);
    if (nextEmptySlot !== -1) {
      const newSlots = [...slots];
      newSlots[nextEmptySlot] = wireId;
      setSlots(newSlots);
      setInventory(inventory.filter(id => id !== wireId));
    }
  };

  const handleSlotClick = (index: number) => {
    const wireId = slots[index];
    if (wireId) {
      const newSlots = [...slots];
      newSlots[index] = null;
      setSlots(newSlots);
      setInventory([...inventory, wireId]);
    }
  };

  const verifyCable = () => {
    const isCorrect = JSON.stringify(slots) === JSON.stringify(CORRECT_ORDER);
    if (isCorrect) {
      setFeedback('correct');
      setTimeout(() => setGameState('result'), 1000);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#020617] text-white font-[family-name:var(--font-mono)]">
      <Navbar />
      <div className="max-w-5xl mx-auto pt-40 px-10 relative z-10 flex flex-col items-center">
        
        <AnimatePresence mode="wait">
          {gameState === 'idle' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center bg-[#0a101f] p-16 rounded-[40px] border border-[#ff4d4d33]">
              <Cable size={64} className="text-[#ff4d4d] mx-auto mb-8" />
              <h1 className="font-[family-name:var(--font-outfit)] text-5xl font-black uppercase mb-4">Cable Chaos</h1>
              <p className="text-gray-500 text-xs mb-10 uppercase tracking-widest">Arrange the wires in TIA/EIA-568B order to complete the connection.</p>
              <button onClick={startGame} className="px-12 py-5 bg-[#ff4d4d] text-white font-black uppercase text-xs rounded-xl cursor-pointer hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,77,77,0.3)]">
                Access Layer 1 Lab
              </button>
            </motion.div>
          ) : gameState === 'playing' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center">
              
              {/* THE RJ45 CONNECTOR VISUAL */}
              <div className="relative bg-white/10 border-2 border-white/20 w-full max-w-2xl h-64 rounded-t-[40px] rounded-b-xl mb-12 p-4 flex gap-1 items-end overflow-hidden shadow-2xl">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">RJ45 Connector Shell</div>
                {slots.map((wireId, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleSlotClick(i)}
                    className="flex-1 h-48 bg-black/40 rounded-t-md border-x border-white/5 cursor-pointer hover:bg-white/5 transition-all flex flex-col items-center justify-end pb-2 group"
                  >
                    {wireId ? (
                      <motion.div layoutId={wireId} className="w-full h-full relative" style={{ backgroundColor: WIRE_DATA.find(w => w.id === wireId)?.color }}>
                        {WIRE_DATA.find(w => w.id === wireId)?.stripe && (
                            <div className="absolute inset-0 w-full h-full opacity-40" style={{ background: `repeating-linear-gradient(45deg, transparent, transparent 5px, ${WIRE_DATA.find(w => w.id === wireId)?.stripe} 5px, ${WIRE_DATA.find(w => w.id === wireId)?.stripe} 10px)` }} />
                        )}
                      </motion.div>
                    ) : (
                      <span className="text-[10px] text-gray-700 font-bold mb-2">{i+1}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* WIRE INVENTORY */}
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-12">
                {inventory.map((wireId) => {
                  const data = WIRE_DATA.find(w => w.id === wireId)!;
                  return (
                    <motion.div 
                      key={wireId}
                      layoutId={wireId}
                      onClick={() => handleWireClick(wireId)}
                      className="w-12 h-24 rounded-full cursor-pointer hover:scale-110 transition-transform relative overflow-hidden border border-white/10"
                      style={{ backgroundColor: data.color }}
                    >
                       {data.stripe && (
                         <div className="absolute inset-0 w-full h-full opacity-40" style={{ background: `repeating-linear-gradient(45deg, transparent, transparent 5px, ${data.stripe} 5px, ${data.stripe} 10px)` }} />
                       )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex gap-6">
                 <button onClick={startGame} className="px-8 py-4 border border-white/10 rounded-xl uppercase text-[10px] font-black tracking-widest text-gray-500 flex items-center gap-2 hover:bg-white/5 cursor-pointer">
                    <RotateCcw size={14} /> Reset
                 </button>
                 <button 
                   onClick={verifyCable}
                   disabled={slots.includes(null)}
                   className={`px-12 py-4 rounded-xl uppercase text-[10px] font-black tracking-widest transition-all
                    ${slots.includes(null) ? 'bg-white/5 text-gray-700 cursor-not-allowed' : 'bg-[#7ed957] text-black cursor-pointer shadow-[0_0_20px_rgba(126,217,87,0.3)]'}`}
                 >
                    Crimp & Verify
                 </button>
              </div>

              {feedback && (
                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex items-center gap-2">
                    {feedback === 'correct' ? <CheckCircle2 className="text-[#7ed957]" /> : <XCircle className="text-[#ff4d4d]" />}
                    <span className={`font-bold uppercase text-xs ${feedback === 'correct' ? 'text-[#7ed957]' : 'text-[#ff4d4d]'}`}>
                        {feedback === 'correct' ? "Standard B Confirmed" : "Sequence Invalid"}
                    </span>
                 </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center bg-[#0a101f] p-16 rounded-[40px] border border-[#7ed95733] shadow-2xl">
              <Trophy size={64} className="text-[#ffb423] mx-auto mb-8" />
              <h2 className="text-6xl font-black text-white mb-2 font-[family-name:var(--font-outfit)]">CRIMPED!</h2>
              <p className="text-[#7ed957] font-bold uppercase tracking-[0.4em] mb-12">Physical Layer Synchronized</p>
              <div className="flex gap-4">
                 <button onClick={startGame} className="px-10 py-5 border border-white/10 rounded-xl uppercase font-black text-xs cursor-pointer">Retry Lab</button>
                 <Link href="/games"><button className="px-10 py-5 bg-[#7ed957] text-black rounded-xl uppercase font-black text-xs cursor-pointer shadow-lg">Save XP</button></Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function Trophy(props: any) {
    return <CheckCircle2 {...props} />
}