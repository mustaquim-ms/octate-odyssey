"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { 
  User, Settings, Shield, Key, Trophy, 
  ChevronDown, Rocket, LayoutDashboard, 
  Binary, Target, BarChart3, Book, LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "@/components/auth/AuthModal";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  
  // State for hydration safety
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [showProfile, setShowProfile] = useState(false);
  const [hoveredPath, setHoveredPath] = useState("");
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // 1. Handle Hydration & Session Persistence
  useEffect(() => {
    setMounted(true);
    const session = localStorage.getItem("pilot_session");
    if (session === "active") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("pilot_session");
    localStorage.removeItem("pilot_name");
    localStorage.removeItem("pilot_handle");
    setIsLoggedIn(false);
    setShowProfile(false);
    router.push("/");
    // Force refresh to clear all protected states
    window.location.reload();
  };

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={14} /> },
    { name: "Learning", href: "/learning", icon: <Binary size={14} /> },
    { name: "Games", href: "/games", icon: <Rocket size={14} /> },
    { name: "Missions", href: "/missions", icon: <Target size={14} /> },
    { name: "Leaderboard", href: "/leaderboard", icon: <BarChart3 size={14} /> },
    { name: "Resources", href: "/resources", icon: <Book size={14} /> },
  ];

  // Prevent hydration mismatch by returning a skeleton or null during server-side render
  if (!mounted) return <nav className="fixed top-0 w-full z-50 h-28 border-b border-[#7ed957]/10 bg-[#020617]/70" />;

  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-[#7ed957]/10 bg-[#020617]/70 backdrop-blur-2xl">
        <div className="max-w-[1600px] mx-auto px-10 h-28 flex items-center justify-between">
          
          {/* Logo Section - Name Removed */}
          <Link href="/" className="flex items-center group cursor-pointer">
            <Image 
              src="/logo.png" 
              alt="Octate Odyssey" 
              width={90} 
              height={90} 
              priority 
              className="drop-shadow-[0_0_15px_rgba(126,217,87,0.3)]" 
            />
          </Link>

          {/* Center Menu */}
          <div className="hidden xl:flex items-center bg-white/5 border border-white/10 rounded-full px-2 py-1 relative">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  onMouseEnter={() => setHoveredPath(item.name)}
                  onMouseLeave={() => setHoveredPath("")}
                  className={`relative px-6 py-3 flex items-center gap-2 font-[family-name:var(--font-space)] text-[11px] font-bold uppercase tracking-[0.2em] transition-all z-10 
                    ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-200'}`}
                >
                  {item.icon}
                  <span>{item.name}</span>

                  {/* Active Slide Indicator */}
                  {isActive && (
                    <motion.div 
                      layoutId="active-pill"
                      className="absolute inset-0 bg-[#7ed95715] border border-[#7ed95733] rounded-full shadow-[0_0_20px_rgba(126,217,87,0.1)] -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {/* Hover Glow */}
                  {hoveredPath === item.name && !isActive && (
                    <motion.div 
                      layoutId="nav-glow"
                      className="absolute inset-0 bg-white/5 rounded-full border border-white/10 -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {isActive && (
                    <motion.div 
                      layoutId="active-line"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#7ed957] rounded-full shadow-[0_0_10px_#7ed957]"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Section: Auth or Profile */}
          <div className="flex items-center gap-6">
            {!isLoggedIn ? (
              <div className="flex items-center gap-8 font-mono">
                <button 
                  onClick={() => setIsAuthOpen(true)}
                  className="text-xs font-bold tracking-widest uppercase hover:text-[#ffb423] cursor-pointer text-gray-400"
                >
                  Login
                </button>
                <button 
                  onClick={() => setIsAuthOpen(true)}
                  className="relative group px-8 py-4 overflow-hidden rounded-sm cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ffb423] to-[#7ed957] transition-transform group-hover:scale-105" />
                  <span className="relative text-black text-[11px] font-black tracking-widest uppercase">Join Odyssey</span>
                </button>
              </div>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setShowProfile(!showProfile)} 
                  className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full p-2 pr-6 hover:bg-white/10 transition cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-[#7ed957] overflow-hidden p-1">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#ffb423] to-[#7ed957] flex items-center justify-center text-black font-black uppercase">
                       {localStorage.getItem("pilot_name")?.[0] || "P"}
                    </div>
                  </div>
                  <div className="text-left font-mono">
                    <p className="text-[9px] text-gray-500 font-bold uppercase leading-none mb-1">Authenticated</p>
                    <p className="text-sm font-bold text-white leading-none uppercase tracking-tight">
                        {localStorage.getItem("pilot_name") || "Pilot"}
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
                      <div className="bg-[#7ed957]/5 p-4 rounded-xl border border-[#7ed957]/10 mb-2">
                        <div className="flex justify-between items-center mb-1 font-mono">
                          <span className="text-[9px] uppercase tracking-widest text-[#7ed957] font-bold">Registry Rank</span>
                          <Trophy size={14} className="text-[#ffb423]" />
                        </div>
                        <p className="text-lg font-[family-name:var(--font-outfit)] font-black text-white uppercase">Subnet Samurai</p>
                      </div>

                      <div className="space-y-1">
                        <Link href="/leaderboard"><DropdownItem icon={<Trophy size={14}/>} text="User Ranks" /></Link>
                        <Link href="/profile"><DropdownItem icon={<Settings size={14}/>} text="Settings" /></Link>
                        <Link href="/profile"><DropdownItem icon={<Shield size={14}/>} text="Security & MFA" /></Link>
                        <Link href="/profile"><DropdownItem icon={<Key size={14}/>} text="Password" /></Link>
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
            onClose={() => setIsAuthOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}

function DropdownItem({ icon, text }: { icon: any; text: string }) {
  return (
    <div className="w-full flex items-center gap-4 px-4 py-3.5 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition cursor-pointer font-mono text-[10px] font-black uppercase tracking-widest group">
      <span className="text-gray-600 group-hover:text-[#ffb423] transition-colors">{icon}</span>
      <span className="font-bold tracking-tight">{text}</span>
    </div>
  );
}