"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";

// Analytical & Stats Components
import StatsOverview from "@/components/dashboard/StatsOverview";
import SkillMatrix from "@/components/dashboard/SkillMatrix";
import ActivityChart from "@/components/dashboard/ActivityChart";
import AchievementCase from "@/components/dashboard/AchievementCase";
import RecentActivity from "@/components/dashboard/RecentActivity";
import DailyPing from "@/components/dashboard/DailyPing";
import RankTimeline from "@/components/dashboard/RankTimeline";
import SyncBreakdown from "@/components/dashboard/SyncBreakdown";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // FETCH REAL USER DATA FROM SUPABASE
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (data) setProfile(data);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center font-mono">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#7ed957] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <span className="text-[#7ed957] font-black uppercase tracking-[0.4em] text-[10px]">Syncing Telemetry...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-[#7ed957] selection:text-black">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(126,217,87,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(126,217,87,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_50%_0%,#7ed95705_0%,transparent_70%)] pointer-events-none" />

      <Navbar />

      <section className="max-w-[1600px] mx-auto px-10 pt-40 pb-24 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 bg-[#ffb423] rounded-full animate-pulse shadow-[0_0_10px_#ffb423]" />
              <span className="font-mono text-[#ffb423] text-[10px] font-black uppercase tracking-[0.6em]">Telemetry Terminal active</span>
            </div>
            <h1 className="font-[family-name:var(--font-outfit)] text-6xl font-black uppercase tracking-tighter leading-none">
              Welcome back, <span className="text-[#7ed957]">{profile?.username || "Navigator"}</span>
            </h1>
          </motion.div>

          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex gap-4">
             <div className="bg-white/[0.03] border border-white/10 px-8 py-4 rounded-2xl backdrop-blur-md flex flex-col justify-center text-center">
                <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest mb-1">Accumulated XP</p>
                <p className="font-mono text-[#7ed957] text-xl font-black">{profile?.xp || 0}</p>
             </div>
             <div className="bg-[#7ed957] text-black px-8 py-4 rounded-2xl font-black uppercase text-xs flex flex-col justify-center text-center shadow-[0_0_30px_rgba(126,217,87,0.2)]">
                <span className="opacity-60 text-[8px] mb-1 uppercase">Class</span>
                {profile?.rank || "Novice"}
             </div>
          </motion.div>
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <motion.div variants={itemVariants} className="xl:col-span-2"><SkillMatrix /></motion.div>
              <motion.div variants={itemVariants}><StatsOverview /></motion.div>
            </div>
            <motion.div variants={itemVariants}><DailyPing /></motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <motion.div variants={itemVariants}><ActivityChart /></motion.div>
               <motion.div variants={itemVariants}><SyncBreakdown /></motion.div>
            </div>
          </div>
          <div className="space-y-8">
            <motion.div variants={itemVariants}><RankTimeline /></motion.div>
            <motion.div variants={itemVariants}><AchievementCase /></motion.div>
            <motion.div variants={itemVariants}><RecentActivity /></motion.div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}