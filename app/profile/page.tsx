"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { User, Shield, Lock, Award, Bell, Zap, ChevronRight, ShieldAlert, Power } from "lucide-react";

// Sub-components
import ProfileOverview from "@/components/profile/ProfileOverview";
import AccountSettings from "@/components/profile/AccountSettings";
import SecurityPortal from "@/components/profile/SecurityPortal";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  // Security Check: Look for active session in localStorage
  useEffect(() => {
    const session = localStorage.getItem("Navigator_session");
    setIsAuthorized(session === "active");
  }, []);

  // Prevent UI flash while checking session
  if (isAuthorized === null) return null;

  // ACCESS DENIED VIEW
  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-[#020617] flex items-center justify-center p-10 font-mono relative overflow-hidden">
        {/* Visual Background Alert Effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse z-20" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.05)_0%,transparent_70%)] pointer-events-none" />

        <div className="text-center space-y-8 border border-red-500/20 bg-red-500/5 p-16 md:p-24 rounded-[40px] backdrop-blur-xl relative z-10 max-w-2xl">
           <ShieldAlert size={100} className="text-red-500 mx-auto animate-bounce" />
           <div>
             <h1 className="font-[family-name:var(--font-outfit)] text-5xl font-black uppercase text-white tracking-tighter">Clearance Required</h1>
             <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.5em] mt-4">Unauthorized signature detected in sector 7</p>
           </div>
           
           <div className="pt-4">
             <Link href="/?auth=login">
               <button className="bg-white text-black px-12 py-5 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-[#7ed957] transition-all cursor-pointer flex items-center gap-3 mx-auto shadow-2xl">
                  <Power size={18} /> Initialize Session
               </button>
             </Link>
           </div>

           <p className="text-gray-600 text-[9px] font-bold uppercase tracking-widest pt-10">
             Note: Use "sabrihin" to bypass this security wall.
           </p>
        </div>
      </main>
    );
  }

  // AUTHORIZED PROFILE VIEW
  const tabs = [
    { id: "overview", label: "Overview", icon: <User size={18} /> },
    { id: "settings", label: "Account Settings", icon: <Bell size={18} /> },
    { id: "security", label: "Security & MFA", icon: <Shield size={18} /> },
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-[#7ed957] selection:text-black">
      {/* High-Tech Background Decor */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(126,217,87,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(126,217,87,0.01)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      
      <Navbar />

      <section className="max-w-[1400px] mx-auto px-10 pt-44 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* LEFT SIDEBAR: Navigation */}
          <div className="space-y-2">
            <div className="mb-10 px-4">
                <span className="font-mono text-[#ffb423] text-[10px] font-black uppercase tracking-[0.4em]">Navigator Identity</span>
                <h1 className="font-[family-name:var(--font-outfit)] text-5xl font-black uppercase tracking-tighter mt-1 leading-none">Profile</h1>
            </div>

            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl font-mono text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer group
                  ${activeTab === tab.id ? 'bg-[#7ed957] text-black shadow-[0_0_25px_rgba(126,217,87,0.2)]' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}
              >
                <span className={activeTab === tab.id ? 'text-black' : 'text-gray-600 group-hover:text-[#7ed957]'}>
                    {tab.icon}
                </span>
                {tab.label}
                {activeTab === tab.id && <ChevronRight size={14} className="ml-auto" />}
              </button>
            ))}

            <div className="mt-20 p-8 bg-[#ffb42311] border border-[#ffb42333] rounded-[32px]">
                <div className="flex items-center gap-2 mb-3">
                    <Zap size={14} className="text-[#ffb423]" />
                    <span className="font-mono text-[9px] font-black text-[#ffb423] uppercase tracking-widest">System Notice</span>
                </div>
                <p className="text-[10px] text-gray-500 font-bold leading-relaxed uppercase font-mono">
                    Clearance Level: <span className="text-white">Tier 3 (Active)</span>. Mission logs are currently auto-syncing with the global registry.
                </p>
            </div>
          </div>

          {/* RIGHT SIDE: Dynamic Content */}
          <div className="lg:col-span-3 min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "overview" && <ProfileOverview />}
                {activeTab === "settings" && <AccountSettings />}
                {activeTab === "security" && <SecurityPortal />}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}