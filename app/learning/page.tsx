"use client";
import { motion } from "framer-motion";
import { Zap, ChevronRight } from "lucide-react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import LearningHeader from "@/components/learning/LearningHeader";
import ModuleGrid from "@/components/learning/ModuleGrid";

export default function LearningPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      {/* Background Cyber-Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(126,217,87,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(126,217,87,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <Navbar />

      <section className="max-w-[1600px] mx-auto px-10 pt-40 pb-20 relative z-10">
        
        {/* 1. ACTIVE MISSION BANNER (High Impact) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 p-[1px] rounded-3xl bg-gradient-to-r from-[#7ed95733] via-transparent to-transparent"
        >
          <div className="bg-[#0a101f]/80 backdrop-blur-xl rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5">
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 bg-[#7ed95711] rounded-2xl flex items-center justify-center border border-[#7ed95733] shadow-[0_0_20px_rgba(126,217,87,0.1)]">
                <Zap className="text-[#7ed957]" size={40} />
              </div>
              <div className="text-left">
                <span className="font-mono text-[10px] text-[#7ed957] font-bold tracking-[0.5em] uppercase mb-2 block">Current Objective</span>
                <h3 className="font-[family-name:var(--font-outfit)] text-3xl font-black uppercase leading-none">IPv4 Subnetting: Phase II</h3>
                <p className="text-gray-500 font-mono text-xs mt-2 font-bold uppercase tracking-wider">Module: Subnetting Made Simple</p>
              </div>
            </div>
            <button className="px-12 py-5 bg-[#7ed957] text-black font-black font-mono text-xs uppercase tracking-[0.2em] rounded-sm hover:scale-105 hover:bg-[#ffb423] transition-all cursor-pointer shadow-[0_0_30px_#7ed95733]">
              Resume Mission
            </button>
          </div>
        </motion.div>

        {/* 2. USER INTELLIGENCE PROFILE (Spider Graph & Ranks) */}
        <LearningHeader />

        {/* 3. CORE LEARNING PATH */}
        <div className="mt-32">
          <div className="flex flex-col gap-2 mb-12">
            <div className="flex items-center gap-4">
               <div className="w-12 h-[1px] bg-[#7ed957]/30" />
               <span className="text-[#7ed957] font-mono text-[10px] font-bold tracking-[0.6em] uppercase">Phase 01</span>
            </div>
            <h2 className="font-[family-name:var(--font-outfit)] text-5xl font-black uppercase tracking-tighter">
              Core Learning Path
            </h2>
            <p className="text-gray-600 font-mono text-sm uppercase tracking-widest">Architect Trajectory: Beginner → Advanced</p>
          </div>
          <ModuleGrid category="core" />
        </div>

        {/* 4. SPECIALIZED TRACKS */}
        <div className="mt-40">
          <div className="flex flex-col gap-2 mb-12">
            <div className="flex items-center gap-4">
               <div className="w-12 h-[1px] bg-[#ffb423]/30" />
               <span className="text-[#ffb423] font-mono text-[10px] font-bold tracking-[0.6em] uppercase">Specialized</span>
            </div>
            <h2 className="font-[family-name:var(--font-outfit)] text-5xl font-black uppercase tracking-tighter">
              Advanced Specializations
            </h2>
            <p className="text-gray-600 font-mono text-sm uppercase tracking-widest">Tactical Expert Modules</p>
          </div>
          <ModuleGrid category="specialized" />
        </div>

      </section>

      <Footer />
    </main>
  );
}