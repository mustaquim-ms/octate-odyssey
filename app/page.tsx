"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, animate, useMotionValue, useTransform, useMotionValueEvent } from "framer-motion";
import { Router, Laptop, Globe, Cpu, Zap, Activity } from "lucide-react";

// Components from src/ folder
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import Terminal from "@/components/animations/Terminal";
import FeatureGrid from "@/components/ui/FeatureGrid";
import PilotExperiences from "@/components/ui/PilotExperiences";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen flex flex-col bg-[#020617] overflow-hidden">
      
      {/* 1. Deep Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-[radial-gradient(circle_at_50%_20%,#7ed95710_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#ffb42305] blur-[150px] pointer-events-none" />
      
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-48 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="font-[family-name:var(--font-outfit)] text-[clamp(4rem,14vw,10rem)] font-[900] tracking-[-0.05em] leading-[0.85] mb-12">
            <span className="text-[#ffb423]">OCTATE</span><br />
            <span className="text-[#7ed957] drop-shadow-[0_0_35px_#7ed95755]">ODYSSEY</span>
          </h1>
          
          <NetworkPulse />

          <Terminal />

          <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/?auth=login">
              <button className="group relative px-16 py-6 bg-[#7ed957] text-black font-[family-name:var(--font-outfit)] font-extrabold tracking-widest uppercase rounded-sm cursor-pointer overflow-hidden transition-all hover:scale-105 hover:bg-[#ffb423] shadow-[0_0_40px_rgba(126,217,87,0.3)]">
                <span className="relative z-10">Launch Interface</span>
              </button>
            </Link>
            <button className="px-16 py-6 border-2 border-white/10 text-white font-[family-name:var(--font-outfit)] font-extrabold tracking-widest uppercase rounded-sm hover:bg-white/5 transition-all cursor-pointer backdrop-blur-sm">
              View Missions
            </button>
          </div>
        </motion.div>

        {/* Mission Progression Path */}
        <MissionPath />

        {/* Feature Grid (12 Mission Boxes) */}
        <div className="mt-56 w-full">
            <div className="flex flex-col items-center gap-5 mb-24">
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-[#7ed957]/30" />
                  <span className="text-[#7ed957] font-mono text-[10px] font-bold tracking-[0.8em] uppercase opacity-70">Core Protocol Hub</span>
                  <div className="h-[1px] w-12 bg-[#7ed957]/30" />
                </div>
                <h2 className="text-5xl md:text-6xl font-[family-name:var(--font-outfit)] font-black uppercase tracking-tighter">Choose Your Mission</h2>
            </div>
            <FeatureGrid />
        </div>

        {/* Pilot Experiences (Social Proof) */}
        <PilotExperiences />

        {/* Live Animated Stats Bar */}
        <div className="mt-56 w-full max-w-7xl grid grid-cols-2 md:grid-cols-4 border-y-2 border-white/5 py-20 gap-12 bg-white/[0.01] backdrop-blur-xl rounded-[50px] relative border-x-2 border-white/5">
           <CounterStat label="Active Nodes" target={1204} />
           <TextStat label="Data Stream" value="Stable" color="#7ed957" />
           <TextStat label="Current Tier" value="Master" color="#ffb423" />
           <CounterStat label="Sync Status" target={100} suffix="%" />
        </div>

        {/* FAQ Section */}
        <FAQSection />

        {/* Final Interactive CTA */}
        <section className="w-full py-40 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7ed95705_0%,transparent_70%)]" />
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            <h2 className="text-6xl md:text-8xl font-[family-name:var(--font-outfit)] font-black uppercase mb-10 tracking-tighter text-white">
              Ready to <span className="text-[#7ed957]">Synchronize?</span>
            </h2>
            <Link href="/?auth=login">
              <button className="bg-[#7ed957] text-black font-[family-name:var(--font-outfit)] font-black px-16 py-8 rounded-sm uppercase tracking-[0.3em] hover:scale-110 hover:bg-[#ffb423] transition-all cursor-pointer shadow-[0_0_50px_#7ed95733]">
                Initialize Odyssey v1.0
              </button>
            </Link>
          </motion.div>
        </section>
      </section>

      <Footer />
    </main>
  );
}

// --- SUB COMPONENTS ---

function NetworkPulse() {
  return (
    <div className="w-full max-w-lg mx-auto mb-20 flex justify-between items-center relative p-8 bg-white/[0.02] rounded-full border border-white/5">
      <div className="flex flex-col items-center gap-2 text-[#ffb423]">
        <Globe size={20} /><span className="text-[9px] font-mono uppercase opacity-50 font-bold">Cloud</span>
      </div>
      <div className="flex-1 h-[1px] bg-gradient-to-r from-[#ffb423] to-[#7ed957] relative mx-4">
         <motion.div animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute top-[-2px] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
      </div>
      <div className="flex flex-col items-center gap-2 text-[#7ed957]">
        <Router size={20} /><span className="text-[9px] font-mono uppercase opacity-50 font-bold">Gateway</span>
      </div>
      <div className="flex-1 h-[1px] bg-gradient-to-r from-[#7ed957] to-[#ffb423] relative mx-4">
         <motion.div animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 1, ease: "linear" }} className="absolute top-[-2px] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
      </div>
      <div className="flex flex-col items-center gap-2 text-[#ffb423]">
        <Laptop size={20} /><span className="text-[9px] font-mono uppercase opacity-50 font-bold">Pilot</span>
      </div>
    </div>
  );
}

function MissionPath() {
  const steps = [
    { id: "01", title: "Binary Foundations", desc: "Master bits, bytes, and the math." },
    { id: "02", title: "IP Architecture", desc: "Understand v4/v6 and routing." },
    { id: "03", title: "Subnet Warfare", desc: "Slice networks with CIDR/VLSM." },
    { id: "04", title: "Global Defense", desc: "Deploy firewalls and NAT." },
  ];
  return (
    <div className="w-full max-w-6xl mx-auto mt-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
      {steps.map((s) => (
        <div key={s.id} className="text-center group">
          <div className="w-14 h-14 rounded-full bg-[#0a101f] border border-[#7ed957]/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_#7ed95711] group-hover:border-[#7ed957] transition-all">
            <span className="font-mono font-bold text-[#7ed957]">{s.id}</span>
          </div>
          <h4 className="font-[family-name:var(--font-outfit)] font-bold text-lg mb-2 uppercase text-white">{s.title}</h4>
          <p className="text-gray-500 font-mono text-[10px] uppercase leading-tight tracking-widest">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}

function FAQSection() {
  return (
    <section className="w-full max-w-3xl mx-auto mt-56 mb-20 px-6 text-left">
      <h2 className="text-center text-4xl font-[family-name:var(--font-outfit)] font-black uppercase mb-16 text-white tracking-tighter">Secure Transmissions</h2>
      <div className="space-y-4">
        <div className="p-8 border border-white/5 bg-white/[0.01] rounded-2xl group cursor-help transition-all hover:border-[#7ed957]/30">
          <h4 className="text-[#ffb423] font-bold mb-3 uppercase text-sm tracking-widest group-hover:text-[#7ed957] transition-colors">Protocol Sync Status?</h4>
          <p className="text-gray-500 text-xs font-mono leading-relaxed uppercase">Full synchronization with CCNA and Network+ standards across all learning modules.</p>
        </div>
      </div>
    </section>
  );
}

function CounterStat({ label, target, suffix = "" }: { label: string; target: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());
  const displayRef = useRef<HTMLSpanElement>(null);
  useEffect(() => { animate(count, target, { duration: 3, ease: "circOut" }); }, [target]);
  useMotionValueEvent(rounded, "change", (latest) => { if (displayRef.current) displayRef.current.innerText = latest + suffix; });
  return (
    <div className="flex flex-col items-center">
      <span className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-[0.4em] mb-6">{label}</span>
      <span ref={displayRef} className="text-[#7ed957] font-mono font-bold text-4xl md:text-5xl drop-shadow-[0_0_20px_#7ed95755]">0{suffix}</span>
    </div>
  );
}

function TextStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-[0.5em] mb-6">{label}</span>
      <span className="font-mono font-bold text-4xl md:text-5xl uppercase" style={{ color }}>{value}</span>
    </div>
  );
}