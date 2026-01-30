"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useUserStats() {
  const [stats, setStats] = useState({
    xp: 0,
    rank: "Novice",
    username: "Navigator",
    sync_status: 0,
    loading: true
  });

  useEffect(() => {
    async function fetchStats() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (data) {
        setStats({
          xp: data.xp || 0,
          rank: data.rank || "Novice",
          username: data.username || "Navigator",
          sync_status: data.sync_percent || 0,
          loading: false
        });
      }
    }
    fetchStats();
  }, []);

  return stats;
}