"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, animate, useMotionValue, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { 
  Router, Laptop, Globe, Cpu, Zap, Activity, 
  ShieldCheck, ChevronRight, Database, Radio, 
  Share2, Lock, Unlock, FileCode, Terminal as TerminalIcon,
  Search, Info, AlertTriangle, MessageSquare, Star, Target, Fingerprint
} from "lucide-react";

// Components from src/ folder
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import Terminal from "@/components/animations/Terminal";
import FeatureGrid from "@/components/ui/FeatureGrid";
import NavigatorExperiences from "@/components/ui/NavigatorExperiences";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen flex flex-col bg-[#020617] overflow-hidden selection:bg-[#7ed957] selection:text-black">
      
      {/* 1. ATMOSPHERIC BACKGROUND LAYERS */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(126,217,87,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(126,217,87,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-[radial-gradient(circle_at_50%_20%,#7ed95708_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-[15%] left-0 w-[600px] h-[600px] bg-[#ffb42303] blur-[150px] pointer-events-none" />
      
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 flex flex-col items-center pt-48 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center w-full max-w-7xl flex flex-col items-center"
        >
          {/* BRAND TITLE */}
          <h1 className="font-[family-name:var(--font-outfit)] text-[clamp(4.5rem,14vw,11rem)] font-[900] tracking-[-0.06em] leading-[0.8] mb-12 select-none text-white">
            <span className="text-[#ffb423]">OCTATE</span><br />
            <span className="text-[#7ed957] drop-shadow-[0_0_40px_rgba(126,217,87,0.3)]">ODYSSEY</span>
          </h1>

          {/* TACTICAL HUD STATS BAR */}
          <div className="w-full max-w-5xl mb-24 relative px-4">
             {/* Technical Corner Brackets */}
             <div className="absolute -top-4 -left-2 w-10 h-10 border-t-2 border-l-2 border-[#7ed95766] rounded-tl-xl" />
             <div className="absolute -bottom-4 -right-2 w-10 h-10 border-b-2 border-r-2 border-[#ffb42366] rounded-br-xl" />

             <div className="flex flex-wrap items-center justify-center bg-white/[0.02] border border-white/10 rounded-3xl p-3 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                <TacticalStat label="Active Nodes" target={1204} icon={<Database size={14}/>} color="#7ed957" />
                <div className="hidden md:block h-14 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent mx-2" />
                <TacticalStat label="Link Status" value="STABLE" icon={<Radio size={14} className="animate-pulse" />} color="#7ed957" />
                <div className="hidden md:block h-14 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent mx-2" />
                <TacticalStat label="Clearance" value="MASTER" icon={<ShieldCheck size={14}/>} color="#ffb423" />
                <div className="hidden md:block h-14 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent mx-2" />
                <TacticalStat label="Global Sync" target={100} suffix="%" icon={<Fingerprint size={14}/>} color="#ffb423" />
             </div>
          </div>
          
          <NetworkPulse />
          <Terminal />

          {/* ATTRACTIVE MODERN BUTTONS */}
          <div className="mt-24 flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link href="/?auth=login">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-16 py-7 bg-[#7ed957] rounded-xl overflow-hidden shadow-[0_0_40px_rgba(126,217,87,0.3)] transition-all cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <span className="relative z-10 font-[family-name:var(--font-outfit)] font-black uppercase tracking-[0.3em] text-black flex items-center gap-3">
                   Initialize Odyssey <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </Link>

            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.98 }}
              className="px-16 py-7 border-2 border-white/10 rounded-xl font-[family-name:var(--font-outfit)] font-black uppercase tracking-[0.3em] text-white backdrop-blur-sm transition-all flex items-center gap-3 group cursor-pointer"
            >
              View Missions <Share2 size={18} className="text-gray-500 group-hover:text-[#ffb423] transition-colors" />
            </motion.button>
          </div>
        </motion.div>

        {/* 2. MISSION PROGRESSION SECTION */}
        <div className="mt-80 w-full">
            <TacticalHeader 
                mod="01" 
                title="Operational" 
                accent="Trajectory" 
                status="Sync: Active" 
                coords="X: 42.091 // Y: 108.442"
            />
            <MissionPath />
        </div>

        {/* 3. FEATURE GRID SECTION */}
        <div className="mt-80 w-full max-w-[1600px]">
            <TacticalHeader 
                mod="02" 
                title="Core Protocol" 
                accent="Hub" 
                status="System: Ready" 
                coords="SECTOR_07 // NODE_GRID"
            />
            <FeatureGrid />
        </div>

        {/* 4. Navigator EXPERIENCES SECTION */}
        <div className="mt-80 w-full">
            <TacticalHeader 
                mod="03" 
                title="Navigator" 
                accent="Logs" 
                status="Logs: Verified" 
                coords="UPLINK: ACTIVE // FREQ: 142MHz"
            />
            <NavigatorExperiences />
        </div>

        {/* 5. FAQ SECTION */}
        <div className="mt-80 w-full">
            <TacticalHeader 
                mod="04" 
                title="Secure" 
                accent="Transmissions" 
                status="Auth: Granted" 
                coords="KNOWLEDGE_BASE // V1.0.4"
            />
            <FAQSection />
        </div>

        {/* --- FINAL NEURAL BRIDGE CTA --- */}
        <section className="w-full pt-80 pb-40 text-center relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-96 bg-gradient-to-t from-[#7ed957] to-transparent opacity-20" />
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="relative z-10">
            <span className="text-[#7ed957] font-mono text-[10px] font-bold tracking-[1em] uppercase block mb-6">Synchronization Ready</span>
            <h2 className="text-6xl md:text-9xl font-[family-name:var(--font-outfit)] font-black uppercase mb-12 tracking-tighter text-white leading-none">
              READY TO <span className="text-[#7ed957] drop-shadow-[0_0_30px_#7ed95744]">SYNC?</span>
            </h2>
            <Link href="/?auth=login">
              <button className="relative group px-24 py-10 bg-white text-black font-[family-name:var(--font-outfit)] font-black rounded-sm uppercase tracking-[0.4em] hover:bg-[#7ed957] transition-all cursor-pointer shadow-[0_0_80px_rgba(255,255,255,0.1)]">
                Initialize Odyssey
              </button>
            </Link>
          </motion.div>
          <div className="font-mono text-[9px] tracking-[1.5em] text-gray-800 uppercase pt-40 pb-10">
            End of Line // Transmission Complete
          </div>
        </section>
      </section>

      <Footer />
    </main>
  );
}

// --- TACTICAL HEADER COMPONENT ---

function TacticalHeader({ mod, title, accent, status, coords }: any) {
    return (
        <div className="relative flex flex-col items-center mb-28 px-4 overflow-hidden">
            <motion.div 
                initial={{ opacity: 0, width: 0 }}
                whileInView={{ opacity: 1, width: "100%" }}
                viewport={{ once: true }}
                className="flex items-center justify-center gap-6 w-full max-w-4xl"
            >
                {/* Left Frame */}
                <div className="hidden sm:flex items-center gap-3">
                    <span className="font-mono text-[8px] text-gray-600 font-bold tracking-tighter uppercase">MOD.{mod}</span>
                    <div className="h-px w-20 md:w-40 bg-gradient-to-r from-transparent via-[#7ed95744] to-[#7ed957]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7ed957] shadow-[0_0_8px_#7ed957]" />
                </div>

                {/* Center Content */}
                <div className="relative group">
                    <span className="relative font-mono text-[11px] md:text-xs text-white font-black uppercase tracking-[1em] z-10">
                        {title} <span className="text-[#ffb423]">{accent}</span>
                    </span>
                    {/* Laser Scanner Wipe */}
                    <motion.div 
                        initial={{ left: "-100%" }}
                        whileInView={{ left: "100%" }}
                        transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
                        className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[#7ed95766] to-transparent -skew-x-12 z-20 pointer-events-none"
                    />
                </div>

                {/* Right Frame */}
                <div className="hidden sm:flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ffb423] shadow-[0_0_8px_#ffb423]" />
                    <div className="h-px w-20 md:w-40 bg-gradient-to-l from-transparent via-[#ffb42344] to-[#ffb423]" />
                    <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-[#7ed957] rounded-full animate-pulse" />
                        <span className="font-mono text-[8px] text-gray-600 font-bold uppercase tracking-tighter">{status}</span>
                    </div>
                </div>
            </motion.div>
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-5 font-mono text-[7px] text-gray-700 tracking-[1.5em] uppercase"
            >
                {coords}
            </motion.div>
        </div>
    );
}

// --- TACTICAL STAT COMPONENT ---

function TacticalStat({ label, target, value, suffix = "", icon, color }: any) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());
    const displayRef = useRef<HTMLSpanElement>(null);
    
    useEffect(() => {
        if (target) animate(count, target, { duration: 3.5, ease: "circOut" });
    }, [target, count]);

    useMotionValueEvent(rounded, "change", (latest) => {
        if (displayRef.current) displayRef.current.innerText = latest + suffix;
    });

    return (
        <div className="flex flex-col items-center px-12 py-5 group cursor-default transition-all hover:bg-white/[0.02] rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-600 group-hover:text-white transition-colors">{icon}</span>
                <span className="text-[9px] text-gray-500 font-mono font-bold uppercase tracking-[0.2em]">{label}</span>
            </div>
            <span 
                ref={displayRef} 
                className="font-mono font-black text-2xl md:text-4xl tracking-tighter"
                style={{ color, filter: `drop-shadow(0 0 15px ${color}55)` }}
            >
                {value || "0"}
            </span>
        </div>
    );
}

// --- MISSION PATH COMPONENT ---

function MissionPath() {
  const steps = [
    { id: "01", title: "Foundations", desc: "BITS, BYTES, AND MATH.", status: "STABLE", color: "#7ed957", icon: <Zap size={16} /> },
    { id: "02", title: "Architecture", desc: "V4/V6 AND ROUTING.", status: "SYNCHRONIZING", color: "#ffb423", icon: <Globe size={16} /> },
    { id: "03", title: "Subnet Warfare", desc: "LOGIC AND VLSM MATH.", status: "STANDBY", color: "#7ed957", icon: <Activity size={16} /> },
    { id: "04", title: "Security", desc: "FIREWALLS AND NAT.", status: "LOCKED", color: "#ff4d4d", icon: <ShieldCheck size={16} /> },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-10 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
        {/* Connection Line */}
        <div className="absolute top-12 left-0 w-full h-[1px] bg-white/5 hidden lg:block overflow-hidden">
            <motion.div 
                animate={{ x: ["-100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#7ed95744] to-transparent"
            />
        </div>

        {steps.map((s, idx) => (
          <motion.div 
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center group relative"
          >
            {/* NODE SHELL */}
            <div className="relative mb-10 z-10">
                <motion.div 
                   animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                   transition={{ repeat: Infinity, duration: 2, delay: idx * 0.5 }}
                   className="absolute inset-0 rounded-full blur-md"
                   style={{ backgroundColor: s.color }}
                />
                
                <div 
                    className="w-24 h-24 rounded-full bg-[#0a101f] border-2 flex items-center justify-center relative transition-all duration-500 group-hover:scale-110 shadow-2xl"
                    style={{ borderColor: `${s.color}33` }}
                >
                    <div className="flex flex-col items-center gap-1">
                        <span className="font-mono text-[9px] font-black opacity-30 uppercase text-gray-500">Phase</span>
                        <span className="font-mono text-xl font-black text-white" style={{ color: s.color }}>{s.id}</span>
                    </div>
                    <div className="absolute -top-2 -right-2 p-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        {s.icon}
                    </div>
                </div>
            </div>

            {/* NODE CONTENT */}
            <div className="text-center space-y-3">
                <h4 className="font-[family-name:var(--font-outfit)] font-black text-2xl uppercase tracking-tighter text-white group-hover:text-[#7ed957] transition-colors leading-none">
                    {s.title}
                </h4>
                <p className="font-mono text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em]">
                    {s.desc}
                </p>
                <div className="pt-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.02] border border-white/5 rounded-full">
                        <div className={`w-1.5 h-1.5 rounded-full ${s.status === 'LOCKED' ? 'bg-red-500' : 'bg-[#7ed957] animate-pulse'}`} />
                        <span className="font-mono text-[8px] font-black text-gray-500 uppercase tracking-widest">{s.status}</span>
                    </div>
                </div>
            </div>

            {/* Background Decal */}
            <div className="absolute top-20 text-[120px] font-black text-white/[0.01] pointer-events-none select-none group-hover:text-white/[0.02] transition-all -z-10">
                {s.id}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --- NETWORK PULSE COMPONENT ---

function NetworkPulse() {
  return (
    <div className="w-full max-w-lg mx-auto mb-16 flex justify-between items-center relative p-8 bg-white/[0.01] rounded-full border border-white/5 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2 text-[#ffb423]">
        <Globe size={18} className="opacity-50" /><span className="text-[8px] font-mono uppercase opacity-30 font-bold tracking-tighter">Cloud</span>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#7ed957]/20 to-transparent relative mx-6">
         <motion.div animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }} className="absolute top-[-2px] w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]" />
      </div>
      <div className="flex flex-col items-center gap-2 text-[#7ed957]">
        <Router size={20} /><span className="text-[8px] font-mono uppercase opacity-50 font-bold tracking-tighter">Gateway</span>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#ffb423]/20 to-transparent relative mx-6">
         <motion.div animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2.5, delay: 1.2, ease: "linear" }} className="absolute top-[-2px] w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]" />
      </div>
      <div className="flex flex-col items-center gap-2 text-[#ffb423]">
        <Laptop size={18} className="opacity-50" /><span className="text-[8px] font-mono uppercase opacity-30 font-bold tracking-tighter">Navigator</span>
      </div>
    </div>
  );
}

// --- TACTICAL FAQ COMPONENT ---

function FAQSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  const faqs = [
    { 
      q: "Sync status with global standards?", 
      a: "The Odyssey mainframe is in full synchronization with CCNA, Network+, and MikroTik MTCNA curriculum. Our labs simulate real-world IOS and RouterOS environments for professional-grade readiness.",
      id: "PROT_01"
    },
    { 
      q: "How do simulations work?", 
      a: "Our proprietary engine utilizes 'State-Stream' technology. You aren't just clicking buttons; you are interacting with a logical sandbox that handles CIDR math, packet routing, and OSI encapsulation in real-time.",
      id: "SIM_04"
    },
    { 
      q: "Cryptographic Credentials?", 
      a: "Successful extraction of 'Architect Tier' results in the issuance of a cryptographically signed Navigator Diploma. These credentials verify your mastery of IP, Routing, and Security protocols.",
      id: "SEC_09"
    },
    { 
      q: "Can I track my progress?", 
      a: "Absolutely. The Odyssey dashboard provides real-time telemetry on your learning path, including XP earned, ranks achieved, and badges unlocked. Integration with third-party platforms is also supported.",
      id: "NET_02"
    },
    {
      q: "What support is available?",
      a: "Our support team is available 24/7 via chat and email. Additionally, we offer a comprehensive knowledge base and community forums where Navigators can share insights and troubleshoot together.",
      id: "SUP_05"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-6 relative shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-1 bg-white/[0.02] border border-white/10 rounded-[40px] overflow-hidden backdrop-blur-2xl">
        {/* Left Pane: Question Selectors */}
        <div className="lg:col-span-2 border-r border-white/10 p-4 space-y-2">
           <div className="p-4 mb-4 font-mono text-[10px] text-gray-500 font-bold uppercase tracking-widest border-b border-white/5 flex items-center gap-2">
              <Search size={12} /> Search Knowledge Base
           </div>
           {faqs.map((faq, i) => (
             <button 
               key={i} 
               onClick={() => setActiveIdx(i)}
               className={`w-full text-left p-6 rounded-2xl transition-all flex items-center gap-4 group relative overflow-hidden ${activeIdx === i ? 'bg-[#7ed95711] border border-[#7ed95733]' : 'hover:bg-white/5 border border-transparent'} cursor-pointer`}
             >
               <span className={`font-mono text-[10px] font-bold ${activeIdx === i ? 'text-[#7ed957]' : 'text-gray-600'}`}>[{faq.id}]</span>
               <span className={`text-xs font-bold uppercase tracking-widest ${activeIdx === i ? 'text-white' : 'text-gray-400'}`}>{faq.q}</span>
               {activeIdx === i && <motion.div layoutId="faq-active" className="absolute left-0 top-0 w-1 h-full bg-[#7ed957] shadow-[0_0_15px_#7ed957]" />}
             </button>
           ))}
        </div>

        {/* Right Pane: Decryption Display */}
        <div className="lg:col-span-3 p-12 bg-black/40 relative">
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
                <FileCode size={300} />
            </div>
            <div className="flex items-center gap-3 mb-10 text-[#7ed957]">
                <Unlock size={18} />
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.4em]">
                   Status: Decrypted // Access Granted
                </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeIdx} 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }} 
                className="relative z-10" 
              >
                <h3 className="text-2xl font-[family-name:var(--font-outfit)] font-black text-white uppercase mb-6 tracking-tight">{faqs[activeIdx].q}</h3>
                <div className="p-8 bg-white/[0.03] border-l-2 border-[#7ed957] rounded-r-2xl">
                    <p className="font-mono text-sm text-gray-400 leading-relaxed">
                        <span className="text-[#7ed957] mr-2">{">"}</span>{faqs[activeIdx].a}
                    </p>
                </div>
                
                <div className="mt-12 flex gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7ed957] animate-pulse" />
                        <span className="text-[9px] font-mono text-gray-500 font-bold uppercase">Integrity: Verified</span>
                    </div>
                </div>
              </motion.div>
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
}