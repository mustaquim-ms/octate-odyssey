"use client";
import { supabase } from "@/lib/supabase";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { 
  User, Settings, Shield, Key, Trophy, 
  ChevronDown, Rocket, LayoutDashboard, 
  Binary, Target, BarChart3, Book, LogOut,
  LayoutGrid, X, Power 
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
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState("Navigator");

  // 1. SCROLL LOCK LOGIC
  useEffect(() => {
    if (isMobileMenuOpen || isAuthOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen, isAuthOpen]);

  // 2. AUTH SESSION & PERSISTENCE
  useEffect(() => {
    setMounted(true);
    
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      if (session?.user) {
        setUserName(session.user.user_metadata?.username || "Navigator");
      }
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      if (session) {
        setUserName(session.user.user_metadata?.username || "Navigator");
        // CLEAN URL: Remove ?auth=login if we just logged in
        if (searchParams.get("auth")) {
          router.replace(pathname);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router, searchParams]);

  // 3. URL PARAMETER LISTENER (Opens Modal via Link)
  useEffect(() => {
    const authRequest = searchParams.get("auth");
    if (authRequest && !isLoggedIn) { 
      setAuthMode(authRequest === "signup" ? "signup" : "login");
      setIsAuthOpen(true); 
    }
  }, [searchParams, isLoggedIn]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("Navigator_session");
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
    setShowProfile(false);
    router.push("/");
  };

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Learning", href: "/learning", icon: <Binary size={18} /> },
    { name: "Games", href: "/games", icon: <Rocket size={18} /> },
    { name: "Missions", href: "/missions", icon: <Target size={18} /> },
    { name: "Leaderboard", href: "/leaderboard", icon: <BarChart3 size={18} /> },
    { name: "Resources", href: "/resources", icon: <Book size={18} /> },
  ];

  if (!mounted) return <nav className="fixed top-0 w-full z-50 h-20 md:h-28 border-b border-[#7ed957]/10 bg-[#020617]/70" />;

  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-[#7ed957]/10 bg-[#020617]/80 backdrop-blur-2xl">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 h-20 md:h-28 flex items-center justify-between">
          
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center group cursor-pointer z-[110]">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={mounted && window.innerWidth < 768 ? 75 : 110} 
              height={mounted && window.innerWidth < 768 ? 75 : 110} 
              priority 
              className="drop-shadow-[0_0_20px_rgba(126,217,87,0.4)]" 
            />
          </Link>

          {/* PC MENU */}
          <div className="hidden xl:flex items-center bg-white/[0.03] border border-white/10 rounded-full px-2 py-1 relative">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  onMouseEnter={() => setHoveredPath(item.name)}
                  onMouseLeave={() => setHoveredPath("")}
                  className={`relative px-6 py-3.5 flex items-center gap-2 font-[family-name:var(--font-space)] text-[11px] font-bold uppercase tracking-[0.2em] transition-all z-10 ${isActive ? 'text-[#7ed957]' : 'text-gray-500 hover:text-gray-200'}`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                  {isActive && <motion.div layoutId="nav-active" className="absolute inset-0 bg-[#7ed95710] border border-[#7ed95722] rounded-full -z-10" />}
                  {hoveredPath === item.name && !isActive && (
                    <motion.div layoutId="nav-hover" className="absolute inset-0 bg-white/[0.05] border border-white/10 rounded-full -z-10 backdrop-blur-md" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-6">
            {!isLoggedIn ? (
              <div className="hidden xl:flex items-center gap-8 font-mono">
                <button onClick={() => { setAuthMode("login"); setIsAuthOpen(true); }} className="text-xs font-bold uppercase text-gray-400 hover:text-[#ffb423] cursor-pointer transition-colors">Login</button>
                <button onClick={() => { setAuthMode("signup"); setIsAuthOpen(true); }} className="relative group px-8 py-4 overflow-hidden rounded-sm cursor-pointer shadow-[0_0_20px_rgba(126,217,87,0.2)]">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ffb423] to-[#7ed957]" />
                  <span className="relative text-black text-[11px] font-[900] tracking-widest uppercase">Join Odyssey</span>
                </button>
              </div>
            ) : (
              <div className="hidden xl:block relative">
                 <button 
                  onClick={(e) => { e.stopPropagation(); setShowProfile(!showProfile); }} 
                  className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full p-2 pr-6 hover:bg-white/10 transition cursor-pointer z-[120]"
                >
                    <div className="w-12 h-12 rounded-full border-2 border-[#7ed957] overflow-hidden p-1">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-[#ffb423] to-[#7ed957] flex items-center justify-center text-black font-black uppercase">
                        {userName[0]}
                      </div>
                    </div>
                    <div className="text-left font-mono">
                      <p className="text-[9px] text-gray-500 font-bold uppercase leading-none mb-1">Clearance: active</p>
                      <p className="text-sm font-bold text-white uppercase tracking-tight">{userName}</p>
                    </div>
                    <ChevronDown size={14} className={`text-gray-500 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
                 </button>

                 <AnimatePresence>
                  {showProfile && (
                    <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute right-0 mt-4 w-72 bg-[#0a101f] border border-[#7ed957]/30 rounded-2xl shadow-2xl p-3 z-[130]">
                        <div className="bg-[#7ed957]/5 p-5 rounded-xl border border-[#7ed957]/10 mb-2 font-mono">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[9px] uppercase tracking-widest text-[#7ed957] font-black">Registry Rank</span>
                            <Trophy size={14} className="text-[#ffb423]" />
                          </div>
                          <p className="text-lg font-[family-name:var(--font-outfit)] font-[900] text-white uppercase">Navigator</p>
                        </div>
                        <div className="space-y-1">
                          <Link href="/profile" onClick={() => setShowProfile(false)}><DropdownItem icon={<Settings size={14}/>} text="Settings" /></Link>
                          <Link href="/profile" onClick={() => setShowProfile(false)}><DropdownItem icon={<Shield size={14}/>} text="Security" /></Link>
                        </div>
                        <button onClick={handleLogout} className="w-full text-center py-4 text-red-400 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/10 rounded-xl transition mt-2 cursor-pointer flex items-center justify-center gap-2">
                           <LogOut size={12} /> Terminate Session
                        </button>
                    </motion.div>
                  )}
                 </AnimatePresence>
              </div>
            )}

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden z-[120] p-4 rounded-2xl bg-[#7ed957]/10 border border-[#7ed957]/30 text-[#7ed957] shadow-[0_0_20px_rgba(126,217,87,0.2)] active:scale-90 transition-all"
            >
              {isMobileMenuOpen ? <X size={24} /> : <LayoutGrid size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE HUD OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[115] bg-[#020617]/95 backdrop-blur-3xl xl:hidden flex flex-col pt-32 px-8">
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-8 text-gray-500 hover:text-[#ff4d4d] transition-colors"><X size={32} /></button>
            <div className="flex flex-col gap-3">
              <span className="text-[#ffb423] font-mono text-[9px] font-black uppercase tracking-[0.5em] mb-4 opacity-40">System Navigation</span>
              {menuItems.map((item, idx) => (
                <motion.div key={item.name} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: idx * 0.05 }}>
                  <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center justify-between p-6 rounded-3xl border transition-all ${pathname.startsWith(item.href) ? 'bg-[#7ed95711] border-[#7ed95744] text-[#7ed957]' : 'bg-white/[0.02] border-white/5 text-white'}`}>
                    <div className="flex items-center gap-4">{item.icon} <span className="font-[family-name:var(--font-outfit)] font-black uppercase tracking-widest text-lg">{item.name}</span></div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="mt-auto pb-12 space-y-4">
               {!isLoggedIn ? (
                 <div className="grid grid-cols-2 gap-4">
                   <button onClick={() => { setAuthMode("login"); setIsAuthOpen(true); setIsMobileMenuOpen(false); }} className="py-5 bg-white/5 border border-white/10 rounded-2xl font-black uppercase text-xs text-white">Login</button>
                   <button onClick={() => { setAuthMode("signup"); setIsAuthOpen(true); setIsMobileMenuOpen(false); }} className="py-5 bg-[#7ed957] text-black rounded-2xl font-black uppercase text-xs">Join</button>
                 </div>
               ) : (
                 <button onClick={handleLogout} className="w-full py-5 bg-red-500/10 border border-red-500/20 rounded-2xl font-black uppercase text-xs text-red-500">Terminate Session</button>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAuthOpen && <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} initialMode={authMode} />}
      </AnimatePresence>
    </>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<div className="h-28 bg-[#020617]" />}>
      <NavbarContent />
    </Suspense>
  );
}

function DropdownItem({ icon, text }: any) {
  return (
    <div className="w-full flex items-center gap-4 px-4 py-3.5 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition cursor-pointer font-mono text-[10px] font-black uppercase tracking-widest group">
      <span className="text-gray-600 group-hover:text-[#ffb423]">{icon}</span>
      <span className="font-bold tracking-tight">{text}</span>
    </div>
  );
}