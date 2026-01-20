"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { 
  Book, FileText, Calculator, Search, 
  ExternalLink, Download, Code, 
  Terminal, Layers, Share2, X, Zap, Cpu, Lock
} from "lucide-react";

// Hooks & Utils
import { useAuthGuard } from "@/hooks/useAuthGuard";

// Sub-components
import QuickSubnetCalc from "@/components/resources/QuickSubnetCalc";
import IPAnalyzer from "@/components/resources/IPAnalyzer";
import NetSim from "@/components/resources/NetSim";

const RESOURCE_CARDS = [
  { 
    id: "calc",
    title: "IP Calculator Pro", 
    desc: "Calculate VLSM, CIDR, and Wildcard masks with real-time binary visualization.", 
    icon: <Calculator size={24} />, 
    color: "#7ed957",
    tag: "TOOL"
  },
  { 
    id: "visual",
    title: "Subnet Visualizer", 
    desc: "A graphic representation of address space partitioning and host allocation.", 
    icon: <Layers size={24} />, 
    color: "#ffb423",
    tag: "VISUAL"
  },
  { 
    id: "sim",
    title: "Network Simulator", 
    desc: "Web-based sandbox to drag and drop routers, switches, and test packet flow.", 
    icon: <Terminal size={24} />, 
    color: "#7ed957",
    tag: "BETA"
  },
  { 
    id: "api",
    title: "Protocol API Docs", 
    desc: "Technical documentation for Octate Odyssey's internal networking engine.", 
    icon: <Code size={24} />, 
    color: "#ffb423",
    tag: "DEV"
  }
];

export default function ResourcesPage() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const { checkAuth } = useAuthGuard();

  const handleToolInitialize = (id: string) => {
    // SECURITY CHECK BEFORE OPENING TOOL
    checkAuth(() => {
        setActiveTool(id);
    });
  };

  return (
    <main className="relative min-h-screen flex flex-col bg-[#020617] text-white selection:bg-[#7ed957] selection:text-black">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(126,217,87,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(126,217,87,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <Navbar />

      <section className="max-w-[1600px] mx-auto px-10 pt-40 pb-20 relative z-10">
        
        {/* HERO HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                    <Book className="text-[#ffb423]" size={20} />
                    <span className="font-mono text-[10px] text-[#ffb423] font-black uppercase tracking-[0.4em]">Central Intelligence Repository</span>
                </div>
                <h1 className="font-[family-name:var(--font-outfit)] text-7xl font-[900] uppercase tracking-tighter leading-none mb-6">
                  DATA <span className="text-[#7ed957]">ARCHIVES</span>
                </h1>
                <p className="text-gray-500 font-mono text-sm leading-relaxed uppercase font-bold tracking-tight">
                    Professional toolkits, verified cheat sheets, and technical documentation curated for high-tier network engineers.
                </p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full lg:w-96 relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#7ed957] transition-colors" size={18} />
                <input 
                    type="text" 
                    placeholder="QUERY ARCHIVES (OSPF, BGP, CIDR)..." 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-14 pr-6 font-mono text-[10px] font-bold focus:outline-none focus:border-[#7ed957]/50 transition-all uppercase tracking-[0.2em] backdrop-blur-sm"
                />
            </motion.div>
        </div>

        {/* 1. HERO TOOL: QUICK PARSER (Public Preview) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <QuickSubnetCalc />
        </motion.div>

        {/* 2. MAIN TOOLS GRID (Gated) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-24">
            {RESOURCE_CARDS.map((card, i) => (
                <motion.div 
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    whileHover={{ y: -10 }}
                    onClick={() => handleToolInitialize(card.id)}
                    className="bg-[#0a101f]/60 border border-white/5 p-10 rounded-[40px] group cursor-pointer hover:border-[#7ed95733] transition-all backdrop-blur-sm relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                        {card.icon}
                    </div>

                    <div className="flex justify-between items-start mb-10">
                        <div className="p-4 bg-white/5 rounded-2xl text-white group-hover:scale-110 transition-all duration-500" style={{ color: card.color }}>
                            {card.icon}
                        </div>
                        <span className="font-mono text-[8px] font-black uppercase px-3 py-1 bg-white/5 rounded-full text-gray-500 tracking-widest border border-white/5">{card.tag}</span>
                    </div>
                    
                    <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-black uppercase mb-4 text-white group-hover:text-[#7ed957] transition-colors leading-tight">
                        {card.title}
                    </h3>
                    <p className="font-mono text-[11px] text-gray-500 leading-relaxed uppercase font-bold tracking-tight mb-12">
                        {card.desc}
                    </p>
                    
                    <div className="pt-6 border-t border-white/5 flex justify-between items-center text-[#7ed957] group-hover:text-[#ffb423] transition-colors">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Initialize Tool</span>
                        <Lock size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                    </div>
                </motion.div>
            ))}
        </div>

        {/* 3. CHEAT SHEET SECTION (Gated) */}
        <div className="mt-32 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-1.5 h-8 bg-[#7ed957] rounded-full" />
                    <h2 className="font-[family-name:var(--font-outfit)] text-4xl font-black uppercase tracking-tighter text-white">Tactical Cheat Sheets</h2>
                </div>
                <div className="space-y-4">
                    <DownloadRow title="Subnetting Mastery PDF" size="2.4 MB" date="2025.12.01" />
                    <DownloadRow title="Cisco IOS Command Reference" size="1.8 MB" date="2025.11.28" />
                    <DownloadRow title="IPv6 Compression Logic" size="0.9 MB" date="2025.12.15" />
                    <DownloadRow title="OSI Model Layer Diagnostic" size="3.1 MB" date="2025.12.20" />
                </div>
            </div>

            <motion.div 
                whileHover={{ scale: 1.02 }}
                onClick={() => handleToolInitialize('api')}
                className="bg-gradient-to-br from-[#ffb42311] to-transparent border border-[#ffb42333] p-12 rounded-[40px] flex flex-col justify-center text-center relative overflow-hidden group shadow-2xl cursor-pointer"
            >
                <div className="absolute -top-10 -right-10 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                    <Share2 size={250} />
                </div>
                <h3 className="text-[#ffb423] font-[family-name:var(--font-outfit)] text-3xl font-black uppercase mb-4 tracking-tighter">Navigator Uplink</h3>
                <p className="text-gray-400 font-mono text-xs leading-relaxed uppercase font-bold mb-10">
                    Contribute your technical logs or custom cheat sheets to the Odyssey fleet. Earn 500 XP per approved file.
                </p>
                <button className="bg-[#ffb423] text-black font-black font-mono text-xs py-5 rounded-xl uppercase tracking-[0.3em] hover:bg-white transition-all shadow-lg">
                    Upload Protocol
                </button>
            </motion.div>
        </div>
      </section>

      {/* 4. HOLOGRAPHIC TOOL MODAL SYSTEM */}
      <AnimatePresence>
        {activeTool && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-[#020617]/90 backdrop-blur-2xl flex items-center justify-center p-6 md:p-12">
                <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="w-full max-w-7xl h-[85vh] bg-[#0a101f] border border-white/10 rounded-[50px] relative flex flex-col overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
                    <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-[#7ed957] animate-ping" />
                            <h2 className="font-[family-name:var(--font-outfit)] text-3xl font-black uppercase tracking-tighter text-white">
                                {RESOURCE_CARDS.find(t => t.id === activeTool)?.title}
                            </h2>
                        </div>
                        <button onClick={closeTool} className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer"><X size={24} /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-8 md:p-16 custom-scrollbar">
                        {(activeTool === 'calc' || activeTool === 'visual') && <IPAnalyzer />}
                        {activeTool === 'sim' && <NetSim />}
                        {activeTool === 'api' && <div className="text-center p-20 font-mono text-gray-500">API Documentation Module is in Standby Mode.</div>}
                    </div>
                    <div className="p-6 border-t border-white/5 bg-black/40 flex justify-between items-center font-mono text-[9px] text-gray-600 font-black uppercase tracking-[0.4em]">
                        <span>Session: {localStorage.getItem("pilot_name") || "Active"}</span>
                        <span>Encrypted Environment v2.0</span>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

function DownloadRow({ title, size, date }: any) {
    const { checkAuth } = useAuthGuard();
    
    return (
        <motion.div 
            whileHover={{ x: 10 }}
            onClick={() => checkAuth(() => alert(`Authorized: Starting download of ${title}`))}
            className="bg-[#0a101f]/40 border border-white/5 p-6 rounded-3xl flex items-center justify-between group hover:bg-white/[0.03] transition-all cursor-pointer"
        >
            <div className="flex items-center gap-6 text-left">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-[#7ed957] group-hover:border-[#7ed95733] border border-transparent transition-all">
                    <FileText size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-lg text-white uppercase tracking-tight group-hover:text-[#7ed957] transition-colors">{title}</h4>
                    <p className="font-mono text-[10px] text-gray-600 uppercase font-black mt-1 tracking-widest">
                        Metadata: {size} <span className="mx-2">|</span> Sync Date: {date}
                    </p>
                </div>
            </div>
            <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-gray-500 group-hover:text-white group-hover:border-[#7ed957] transition-all">
                <Download size={20} />
            </div>
        </motion.div>
    );
}