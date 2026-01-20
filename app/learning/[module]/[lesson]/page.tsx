"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { COURSE_DATA } from "@/lib/courses";

// Icons
import { 
  ChevronRight, 
  Cpu, 
  Terminal as TerminalIcon, 
  ArrowLeft, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Target 
} from "lucide-react";

// Components
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import LessonContent from "@/components/learning/LessonContent";
import InteractiveTerminal from "@/components/learning/InteractiveTerminal";
import QuizEngine from "@/components/learning/QuizEngine";

export default function DynamicLessonPage() {
  const params = useParams();
  const router = useRouter();
  
  // State Management
  const [step, setStep] = useState(1);
  const [examPassed, setExamPassed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydration fix
  useEffect(() => {
    setMounted(true);
  }, []);

  // Resolve Data based on URL
  const moduleSlug = params.module as string;
  const lessonSlug = params.lesson as string;
  const lessonData = COURSE_DATA[moduleSlug]?.[lessonSlug];

  if (!mounted) return null;

  if (!lessonData) {
    return (
      <main className="min-h-screen bg-[#020617] flex items-center justify-center p-10 font-mono">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Mission Data Not Found</h1>
          <button 
            onClick={() => router.push('/learning')}
            className="text-[#7ed957] hover:text-[#ffb423] transition-colors uppercase text-xs font-bold tracking-[0.3em]"
          >
            Return to Learning Hub
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-[#7ed957] selection:text-black">
      <Navbar />
      
      {/* 1. ATMOSPHERIC DECOR */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(126,217,87,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(126,217,87,0.01)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#7ed95705] to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto pt-40 px-10 pb-40 relative z-10">
        
        {/* 2. BREADCRUMBS & METADATA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div className="flex items-center gap-3 font-mono text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">
            <button onClick={() => router.push('/learning')} className="hover:text-white transition-colors cursor-pointer">Learning</button>
            <ChevronRight size={10} />
            <span className="text-[#ffb423]">{moduleSlug.replace('-', ' ')}</span>
            <ChevronRight size={10} />
            <span className="text-white">Step 0{lessonSlug.slice(-1)}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <Clock size={12} className="text-[#7ed957]" />
              <span className="font-mono text-[9px] font-bold text-gray-400 uppercase">{lessonData.duration || "30m"}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <Target size={12} className="text-[#ffb423]" />
              <span className="font-mono text-[9px] font-bold text-gray-400 uppercase">Tier 0{lessonSlug.slice(-1)}</span>
            </div>
          </div>
        </div>

        {/* 3. TACTICAL PHASE TRACKER */}
        <div className="flex items-center justify-between mb-20 bg-white/[0.02] border border-white/10 p-6 rounded-[32px] backdrop-blur-xl">
            <div className="flex gap-8">
                <PhaseIndicator num={1} label="Phase: Theory" active={step === 1} completed={step > 1} color="#ffb423" />
                <PhaseIndicator num={2} label="Phase: Lab" active={step === 2} completed={step > 2} color="#7ed957" />
                <PhaseIndicator num={3} label="Phase: Evaluation" active={step === 3} completed={examPassed} color="#ffffff" />
            </div>
            <div className="hidden lg:flex items-center gap-3 font-mono text-[10px] text-[#7ed957] font-black uppercase tracking-[0.4em]">
                <div className="w-2 h-2 rounded-full bg-[#7ed957] animate-pulse" />
                Downlink Stable
            </div>
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: THEORY PHASE */}
          {step === 1 && (
            <motion.div 
              key="step1" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-16">
                 <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-6 bg-[#ffb423] rounded-full shadow-[0_0_15px_#ffb423]" />
                    <span className="text-[#ffb423] font-mono text-xs font-black uppercase tracking-[0.6em]">Authorized Briefing</span>
                 </div>
                 <h1 className="font-[family-name:var(--font-outfit)] text-6xl md:text-7xl font-[900] uppercase tracking-tighter leading-none text-white max-w-3xl">
                    {lessonData.title}
                 </h1>
              </div>

              {/* Enhanced Content Renderer */}
              <LessonContent content={lessonData.content} />

              <button 
                onClick={() => setStep(2)}
                className="mt-24 group relative px-14 py-8 bg-[#7ed957] text-black font-[family-name:var(--font-outfit)] font-black uppercase tracking-[0.3em] rounded-2xl overflow-hidden transition-all hover:scale-105 hover:bg-[#ffb423] cursor-pointer shadow-[0_20px_50px_rgba(126,217,87,0.2)]"
              >
                <div className="flex items-center gap-4 relative z-10">
                   <TerminalIcon size={24} />
                   <span>Initialize Lab Simulation</span>
                   <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </motion.div>
          )}

          {/* STEP 2: SIMULATION PHASE (TERMINAL) */}
          {step === 2 && (
            <motion.div 
              key="step2" 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 1.02 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                 <h2 className="font-[family-name:var(--font-outfit)] text-4xl font-black uppercase text-[#ffb423] tracking-tighter">Interface Access Terminal</h2>
                 <p className="text-gray-500 font-mono text-sm font-bold uppercase tracking-[0.3em] max-w-xl mx-auto">{lessonData.practical.goal}</p>
              </div>
              
              <InteractiveTerminal 
                expectedCommand={lessonData.practical.expected}
                successOutput={lessonData.practical.output}
                onSuccess={() => setTimeout(() => setStep(3), 1500)}
              />

              <button 
                onClick={() => setStep(1)}
                className="flex items-center gap-2 mx-auto font-mono text-[10px] font-black text-gray-600 uppercase hover:text-white transition-colors py-4 px-8 border border-white/5 rounded-full"
              >
                <ArrowLeft size={14} /> Review Briefing
              </button>
            </motion.div>
          )}

          {/* STEP 3: EVALUATION PHASE (QUIZ) */}
          {step === 3 && (
            <motion.div 
              key="step3" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <div className="text-center mb-16">
                  <h2 className="font-[family-name:var(--font-outfit)] text-4xl font-black uppercase text-white tracking-tighter">Mission Assessment</h2>
                  <p className="text-gray-500 font-mono text-[10px] uppercase font-bold tracking-[0.4em] mt-2">Achievement Threshold: 85% Accuracy</p>
              </div>

              <QuizEngine 
                questions={lessonData.quiz}
                onComplete={(score) => { if (score >= 85) setExamPassed(true); }}
              />
              
              {examPassed && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-20">
                    <button 
                        onClick={() => router.push('/learning')}
                        className="group w-full py-8 bg-[#7ed957] text-black font-[family-name:var(--font-outfit)] font-black uppercase text-sm tracking-[0.4em] rounded-2xl shadow-[0_0_60px_rgba(126,217,87,0.3)] hover:bg-[#ffb423] transition-all cursor-pointer relative overflow-hidden"
                    >
                        <div className="flex items-center justify-center gap-4 relative z-10">
                            <ShieldCheck size={20} />
                            <span>Sync Complete: Return to Command</span>
                        </div>
                        <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                    </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </main>
  );
}

// --- REUSABLE SUB-COMPONENT: PHASE INDICATOR ---

function PhaseIndicator({ num, label, active, completed, color }: any) {
    return (
        <div className={`flex items-center gap-4 transition-all duration-500 ${active ? 'opacity-100 scale-105' : 'opacity-30'}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-black text-xs border-2 transition-all
              ${completed ? 'bg-[#7ed957] border-[#7ed957] text-black shadow-[0_0_15px_#7ed957]' : 
                active ? `border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]` : 'border-white/10 text-gray-500'}`}>
                {completed ? "✓" : `0${num}`}
            </div>
            <span className="font-mono text-[11px] font-black uppercase tracking-[0.2em] hidden md:block" style={{ color: active ? color : 'white' }}>{label}</span>
        </div>
    )
}