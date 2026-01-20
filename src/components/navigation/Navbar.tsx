"use client";
import { supabase } from "@/lib/supabase";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { 
  User, Settings, Shield, Key, Trophy, 
  ChevronDown, Rocket, LayoutDashboard, 
  Binary, Target, BarChart3, Book, LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "@/components/auth/AuthModal";

function NavbarContent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [hoveredPath, setHoveredPath] = useState("");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  
  // NEW: State to determine if modal opens as Login or Sign Up
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  // 1. Initial Session Check & Real-time Auth Listener
  useEffect(() => {
    setMounted(true);
    
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      if (session?.user) {
        // Sync metadata to localStorage for non-auth components
        localStorage.setItem("Navigator_name", session.user.user_metadata?.username || "Navigator");
      }
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      if (session) {
        localStorage.setItem("Navigator_session", "active");
      } else {
        localStorage.removeItem("Navigator_session");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Listen for URL parameters (?auth=login or ?auth=signup)
  useEffect(() => {
    const authRequest = searchParams.get("auth");
    if (authRequest === "login") {
      setAuthMode("login");
      setIsAuthOpen(true);
    } else if (authRequest === "signup") {
      setAuthMode("signup");
      setIsAuthOpen(true);
    }
  }, [searchParams]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("Navigator_session");
    localStorage.removeItem("Navigator_name");
    localStorage.removeItem("Navigator_handle");
    setIsLoggedIn(false);
    setShowProfile(false);
    router.push("/");
    router.refresh();
  };

  const handleCloseAuth = () => {
    setIsAuthOpen(false);
    // Remove the ?auth parameter from the URL to prevent re-opening on refresh
    const params = new URLSearchParams(searchParams.toString());
    params.delete("auth");
    const newPath = pathname + (params.toString() ? `?${params.toString()}` : "");
    router.replace(newPath, { scroll: false });
  };

  // Helper to open modal in specific mode
  const openAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={14} /> },
    { name: "Learning", href: "/learning", icon: <Binary size={14} /> },
    { name: "Games", href: "/games", icon: <Rocket size={14} /> },
    { name: "Missions", href: "/missions", icon: <Target size={14} /> },
    { name: "Leaderboard", href: "/leaderboard", icon: <BarChart3 size={14} /> },
    { name: "Resources", href: "/resources", icon: <Book size={14} /> },
  ];

  if (!mounted) return <nav className="fixed top-0 w-full z-50 h-28 border-b border-[#7ed957]/10 bg-[#020617]/70" />;

  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-[#7ed957]/10 bg-[#020617]/70 backdrop-blur-2xl">
        <div className="max-w-[1600px] mx-auto px-10 h-28 flex items-center justify-between">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center group cursor-pointer">
            <Image 
              src="/logo.png" 
              alt="Octate Odyssey" 
              width={110} 
              height={110} 
              priority 
              className="drop-shadow-[0_0_20px_rgba(126,217,87,0.4)] transition-transform group-hover:scale-105" 
            />
          </Link>

          {/* Center Menu with Restored Glass Hover Effect */}
          <div className="hidden xl:flex items-center bg-white/[0.03] border border-white/10 rounded-full px-2 py-1 relative">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  onMouseEnter={() => setHoveredPath(item.name)}
                  onMouseLeave={() => setHoveredPath("")}
                  className={`relative px-6 py-3.5 flex items-center gap-2 font-[family-name:var(--font-space)] text-[11px] font-bold uppercase tracking-[0.2em] transition-all z-10 
                    ${isActive ? 'text-[#7ed957]' : 'text-gray-500 hover:text-[#7ed957]'}`}
                >
                  {item.icon}
                  <span>{item.name}</span>

                  {/* Active Background Pill */}
                  {isActive && (
                    <motion.div 
                      layoutId="active-pill"
                      className="absolute inset-0 bg-[#7ed95710] border border-[#7ed95722] rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {/* GLASS HOVER EFFECT PILL (Restored) */}
                  {hoveredPath === item.name && !isActive && (
                    <motion.div 
                      layoutId="nav-hover-glow"
                      className="absolute inset-0 bg-white/[0.05] border border-white/10 rounded-full -z-10 backdrop-blur-md"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}

                  {/* Active Underline Glow */}
                  {isActive && (
                    <motion.div 
                      layoutId="active-line"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-[2px] bg-[#7ed957] rounded-full shadow-[0_0_12px_#7ed957]"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Section: Auth or Navigator Profile */}
          <div className="flex items-center gap-6">
            {!isLoggedIn ? (
              <div className="flex items-center gap-8 font-mono">
                <button 
                  onClick={() => openAuth("login")} 
                  className="text-xs font-bold tracking-widest uppercase hover:text-[#ffb423] cursor-pointer text-gray-400 transition-colors"
                >
                  Login
                </button>
                <button 
                  onClick={() => openAuth("signup")} 
                  className="relative group px-8 py-4 overflow-hidden rounded-sm cursor-pointer transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ffb423] to-[#7ed957] shadow-[0_0_20px_rgba(126,217,87,0.2)]" />
                  <span className="relative text-black text-[11px] font-black tracking-widest uppercase">Join Odyssey</span>
                </button>
              </div>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setShowProfile(!showProfile)} 
                  className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full p-2 pr-6 hover:bg-white/10 transition cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-[#7ed957] overflow-hidden p-1 shadow-[0_0_15px_rgba(126,217,87,0.2)]">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#ffb423] to-[#7ed957] flex items-center justify-center text-black font-black uppercase text-sm">
                       {localStorage.getItem("Navigator_name")?.[0] || "N"}
                    </div>
                  </div>
                  <div className="text-left font-mono">
                    <p className="text-[9px] text-gray-500 font-bold uppercase leading-none mb-1">Clearance: active</p>
                    <p className="text-sm font-bold text-white leading-none uppercase tracking-tight">
                        {localStorage.getItem("Navigator_name") || "Navigator"}
                    </p>
                  </div>
                  <ChevronDown size={14} className={`text-gray-500 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showProfile && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-72 bg-[#0a101f] border border-[#7ed957]/30 rounded-2xl shadow-2xl p-3 z-50 overflow-hidden"
                    >
                      <div className="bg-[#7ed957]/5 p-5 rounded-xl border border-[#7ed957]/10 mb-2 font-mono">
                        <div className="flex justify-between items-center mb-1 text-[#7ed957]">
                          <span className="text-[9px] uppercase tracking-widest font-black">Registry Rank</span>
                          <Trophy size={14} className="text-[#ffb423]" />
                        </div>
                        <p className="text-lg font-[family-name:var(--font-outfit)] font-[900] text-white uppercase tracking-tight">Subnet Samurai</p>
                      </div>

                      <div className="space-y-1">
                        <Link href="/leaderboard" onClick={() => setShowProfile(false)}><DropdownItem icon={<Trophy size={14}/>} text="User Ranks" /></Link>
                        <Link href="/profile" onClick={() => setShowProfile(false)}><DropdownItem icon={<Settings size={14}/>} text="Settings" /></Link>
                        <Link href="/profile" onClick={() => setShowProfile(false)}><DropdownItem icon={<Shield size={14}/>} text="Security & MFA" /></Link>
                        <Link href="/profile" onClick={() => setShowProfile(false)}><DropdownItem icon={<Key size={14}/>} text="Password" /></Link>
                      </div>

                      <button 
                        onClick={handleLogout} 
                        className="w-full text-center py-4 text-red-400 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/10 rounded-xl transition mt-2 cursor-pointer border border-transparent hover:border-red-500/20 font-mono flex items-center justify-center gap-2"
                      >
                        <LogOut size={12} /> Terminate Session
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isAuthOpen && (
          <AuthModal 
            isOpen={isAuthOpen} 
            onClose={handleCloseAuth}
            initialMode={authMode} // Pass the mode to the modal
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<div className="h-28 bg-[#020617] border-b border-white/5" />}>
      <NavbarContent />
    </Suspense>
  );
}

function DropdownItem({ icon, text }: { icon: any; text: string }) {
  return (
    <div className="w-full flex items-center gap-4 px-4 py-3.5 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition cursor-pointer font-mono text-[10px] font-black uppercase tracking-widest group text-left">
      <span className="text-gray-600 group-hover:text-[#ffb423] transition-colors">{icon}</span>
      <span className="font-bold tracking-tight">{text}</span>
    </div>
  );
}