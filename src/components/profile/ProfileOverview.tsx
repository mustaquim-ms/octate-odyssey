"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Trophy, Award, Activity, Target } from "lucide-react";

export default function ProfileOverview() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setUser(data);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <div className="text-gray-600 font-mono text-xs">LOADING DATA STREAM...</div>;

  return (
    <div className="space-y-8">
      <div className="bg-[#0a101f] border border-white/5 p-10 rounded-[40px] relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10 text-left">
            <div className="w-32 h-32 rounded-full border-4 border-[#7ed957] p-1 shadow-[0_0_30px_rgba(126,217,87,0.2)] bg-black flex items-center justify-center text-white text-4xl font-black">
                {user.username?.[0].toUpperCase() || "N"}
            </div>
            <div>
                <h2 className="font-[family-name:var(--font-outfit)] text-5xl font-black uppercase tracking-tighter text-white">
                    {user.username || "Navigator"}
                </h2>
                <p className="font-mono text-[#7ed957] font-bold uppercase tracking-widest mt-1">
                    Rank: {user.rank} — Level {Math.floor(user.xp / 1000) + 1}
                </p>
                <p className="text-gray-500 text-sm mt-4 max-w-lg leading-relaxed font-mono uppercase">
                    Your account is synchronized with the Odyssey Mainframe.
                </p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatBox label="Accumulated XP" val={user.xp?.toLocaleString() || "0"} color="#7ed957" />
        <StatBox label="Sync Status" val={`${user.sync_percent || 0}%`} color="#ffb423" />
        <StatBox label="Global Position" val="#412" color="#7ed957" />
      </div>
    </div>
  );
}

function StatBox({ label, val, color }: any) {
    return (
        <div className="bg-white/[0.03] border border-white/5 p-8 rounded-[32px] text-center">
            <p className="font-mono text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">{label}</p>
            <p className="text-4xl font-black font-[family-name:var(--font-outfit)]" style={{ color }}>{val}</p>
        </div>
    );
}