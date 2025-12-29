"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import Podium from "@/components/leaderboard/Podium";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import UserRankCard from "@/components/leaderboard/UserRankCard";
import SeasonStats from "@/components/leaderboard/SeasonStats";

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      {/* Dynamic Cyber Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(126,217,87,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(126,217,87,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      
      <Navbar />

      <section className="max-w-[1600px] mx-auto px-10 pt-40 pb-20 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="font-mono text-[#7ed957] text-xs font-black uppercase tracking-[0.6em]">Global Pilot Registry</span>
            <h1 className="font-[family-name:var(--font-outfit)] text-7xl font-black uppercase tracking-tighter mt-4">
              HALL OF <span className="text-[#ffb423]">TITANS</span>
            </h1>
            <p className="text-gray-500 font-mono text-sm uppercase mt-4 tracking-widest">Performance sync across all operational sectors.</p>
          </motion.div>
        </div>

        {/* TOP 3 PODIUM */}
        <Podium />

        {/* MAIN CONTENT SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mt-20">
          
          {/* RANKINGS LIST (Left/Center) */}
          <div className="lg:col-span-3">
             <LeaderboardTable />
          </div>

          {/* USER CONTEXT (Right Sidebar) */}
          <div className="space-y-8">
            <UserRankCard />
            <SeasonStats />
            
            {/* SEASON COUNTDOWN */}
            <div className="bg-[#ffb42311] border border-[#ffb42333] p-8 rounded-[32px] text-center">
               <p className="text-[10px] font-mono text-[#ffb423] font-black uppercase tracking-widest mb-2">Season 04 Ending In</p>
               <p className="font-[family-name:var(--font-outfit)] text-3xl font-black text-white uppercase">14D : 02H : 45M</p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}