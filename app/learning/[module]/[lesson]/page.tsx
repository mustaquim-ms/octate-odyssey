"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { COURSE_DATA } from "@/lib/courses";
import Navbar from "@/components/navigation/Navbar";
import LessonContent from "@/components/learning/LessonContent"; // IMPORT
import InteractiveTerminal from "@/components/learning/InteractiveTerminal";
import QuizEngine from "@/components/learning/QuizEngine";
import { ChevronRight, Cpu, Terminal as TerminalIcon } from "lucide-react";

export default function DynamicLessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonData = COURSE_DATA[params.module as string]?.[params.lesson as string];
  const [step, setStep] = useState(1);
  const [examPassed, setExamPassed] = useState(false);

  if (!lessonData) return <div className="text-center pt-40">Mission Data Not Found</div>;

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-[#7ed957] selection:text-black">
      <Navbar />
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#7ed95705] to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto pt-40 px-10 pb-40 relative z-10">
        
        {/* PHASE TRACKER BAR */}
        <div className="flex items-center justify-between mb-20 bg-white/[0.02] border border-white/5 p-5 rounded-3xl backdrop-blur-xl">
            <div className="flex gap-6">
                <PhaseIndicator num={1} label="Theory" active={step === 1} completed={step > 1} color="#ffb423" />
                <PhaseIndicator num={2} label="Simulation" active={step === 2} completed={step > 2} color="#7ed957" />
                <PhaseIndicator num={3} label="Evaluation" active={step === 3} completed={examPassed} color="#ffffff" />
            </div>
            <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-[#7ed957] font-black uppercase tracking-[0.3em]">
                <div className="w-2 h-2 rounded-full bg-[#7ed957] animate-ping" />
                Sync Active
            </div>
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: ENHANCED READING */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="mb-16">
                 <span className="text-[#ffb423] font-mono text-xs font-black uppercase tracking-[0.6em]">Module Segment 0{params.lesson?.slice(-1)}</span>
                 <h1 className="font-[family-name:var(--font-outfit)] text-6xl md:text-7xl font-[900] uppercase mt-4 mb-6 tracking-tighter leading-none text-white">
                    {lessonData.title}
                 </h1>
                 <div className="h-1.5 w-32 bg-gradient-to-r from-[#ffb423] to-transparent rounded-full" />
              </div>

              <LessonContent content={lessonData.content} />

              <button 
                onClick={() => setStep(2)}
                className="mt-24 group relative px-14 py-7 bg-[#7ed957] text-black font-[family-name:var(--font-outfit)] font-black uppercase tracking-[0.2em] rounded-2xl overflow-hidden transition-all hover:scale-105 hover:bg-[#ffb423] cursor-pointer shadow-[0_20px_50px_rgba(126,217,87,0.2)]"
              >
                <div className="flex items-center gap-4 relative z-10">
                   <TerminalIcon size={24} />
                   <span>Initialize Lab Simulation</span>
                   <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </button>
            </motion.div>
          )}

          {/* STEP 2: INTERACTIVE TERMINAL */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="text-center mb-16">
                 <h2 className="text-4xl font-black uppercase text-[#ffb423] mb-4">Command Access Portal</h2>
                 <p className="text-gray-500 font-mono text-sm font-bold uppercase tracking-[0.3em]">{lessonData.practical.goal}</p>
              </div>
              
              <InteractiveTerminal 
                expectedCommand={lessonData.practical.expected}
                successOutput={lessonData.practical.output}
                onSuccess={() => setTimeout(() => setStep(3), 1500)}
              />
            </motion.div>
          )}

          {/* STEP 3: EXAM */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <QuizEngine 
                questions={lessonData.quiz}
                onComplete={(score) => { if (score >= 85) setExamPassed(true); }}
              />
              
              {examPassed && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-16">
                    <button 
                        onClick={() => router.push('/learning')}
                        className="w-full py-8 bg-[#7ed957] text-black font-black uppercase text-sm tracking-[0.4em] rounded-2xl shadow-[0_0_50px_rgba(126,217,87,0.3)] hover:bg-[#ffb423] transition-all cursor-pointer"
                    >
                        Sync Complete: Back to Command Center
                    </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

// Sub-component for the tracker
function PhaseIndicator({ num, label, active, completed, color }: any) {
    return (
        <div className={`flex items-center gap-3 transition-all duration-500 ${active ? 'opacity-100 scale-105' : 'opacity-40'}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs border ${completed ? 'bg-[#7ed957] border-[#7ed957] text-black' : active ? 'border-white text-white' : 'border-white/20'}`}>
                {completed ? "✓" : `0${num}`}
            </div>
            <span className="font-mono text-[10px] font-black uppercase tracking-widest hidden sm:block" style={{ color: active ? color : 'white' }}>{label}</span>
        </div>
    )
}