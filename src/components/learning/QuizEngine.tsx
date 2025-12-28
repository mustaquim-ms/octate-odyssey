"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Trophy } from "lucide-react";

interface Question {
  id: number;
  q: string;
  options: string[];
  correct: number;
}

export default function QuizEngine({ questions, onComplete }: { questions: Question[], onComplete: (score: number) => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const [shuffledQs, setShuffledQs] = useState<Question[]>([]);

  useEffect(() => {
    // Randomize questions on load
    setShuffledQs([...questions].sort(() => Math.random() - 0.5));
  }, [questions]);

  const handleSelect = (idx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = idx;
    setAnswers(newAnswers);
    
    if (currentQ < shuffledQs.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      const score = (newAnswers.filter((a, i) => a === shuffledQs[i].correct).length / shuffledQs.length) * 100;
      setFinished(true);
      onComplete(score);
    }
  };

  if (finished) {
    const finalScore = (answers.filter((a, i) => a === shuffledQs[i].correct).length / shuffledQs.length) * 100;
    return (
      <div className="text-center p-10 bg-white/5 border border-white/10 rounded-3xl">
        <Trophy className={finalScore >= 85 ? "text-[#7ed957] mx-auto mb-4" : "text-red-500 mx-auto mb-4"} size={64} />
        <h2 className="text-3xl font-black uppercase font-[family-name:var(--font-outfit)]">Exam Complete</h2>
        <p className="text-5xl font-mono font-black my-6" style={{ color: finalScore >= 85 ? '#7ed957' : '#ffb423' }}>{finalScore.toFixed(0)}%</p>
        <p className="text-gray-500 mb-8">{finalScore >= 85 ? "Module Clearance Granted. Next Level Unlocked." : "Clearance Denied. You need 85% to proceed."}</p>
        <button onClick={() => window.location.reload()} className="px-8 py-3 bg-white text-black font-bold uppercase text-xs font-mono">Retake Exam</button>
      </div>
    );
  }

  if (shuffledQs.length === 0) return null;

  return (
    <div className="max-w-2xl mx-auto p-10 bg-[#0a101f] border border-white/10 rounded-3xl shadow-2xl">
      <div className="mb-8">
        <span className="text-[10px] font-bold font-mono text-gray-500 uppercase tracking-widest">Question {currentQ + 1} of {shuffledQs.length}</span>
        <h3 className="text-xl font-bold mt-2 text-white">{shuffledQs[currentQ].q}</h3>
      </div>
      <div className="space-y-3">
        {shuffledQs[currentQ].options.map((opt, i) => (
          <button 
            key={i} 
            onClick={() => handleSelect(i)}
            className="w-full text-left p-5 bg-white/5 border border-white/5 rounded-xl hover:border-[#7ed957]/50 hover:bg-[#7ed95705] transition-all cursor-pointer font-mono text-sm"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}