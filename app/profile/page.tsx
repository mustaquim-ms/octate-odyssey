"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; // Import real Supabase client
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { User, Shield, Lock, Award, Bell, Zap, ChevronRight, Settings } from "lucide-react";

// Sub-components
import ProfileOverview from "@/components/profile/ProfileOverview";
import AccountSettings from "@/components/profile/AccountSettings";
import SecurityPortal from "@/components/profile/SecurityPortal";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // If no real session, send them to home to login
        router.push("/?auth=login");
      } else {
        setLoading(false);
      }
    };
    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center font-mono">
        <div className="text-[#7ed957] animate-pulse uppercase tracking-[0.5em]">Verifying Credentials...</div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Navigator Intel", icon: <User size={18} /> },
    { id: "settings", label: "Command Settings", icon: <Settings size={18} /> },
    { id: "security", label: "Security Grid", icon: <Shield size={18} /> },
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <Navbar />

      <section className="max-w-[1400px] mx-auto px-10 pt-44 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* LEFT SIDEBAR: Navigation */}
          <div className="space-y-2">
            <div className="mb-10 px-4">
                <span className="font-mono text-[#ffb423] text-[10px] font-black uppercase tracking-[0.4em]">Navigator Core</span>
                <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-black uppercase tracking-tighter mt-1">Profile</h1>
            </div>

            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl font-mono text-[11px] font-black uppercase tracking-widest transition-all cursor-pointer group
                  ${activeTab === tab.id ? 'bg-[#7ed957] text-black shadow-lg' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}
              >
                <span className={activeTab === tab.id ? 'text-black' : 'text-gray-600 group-hover:text-[#7ed957]'}>
                    {tab.icon}
                </span>
                {tab.label}
                {activeTab === tab.id && <ChevronRight size={14} className="ml-auto" />}
              </button>
            ))}
          </div>

          {/* RIGHT SIDE: Dynamic Settings Content */}
          <div className="lg:col-span-3 min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
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