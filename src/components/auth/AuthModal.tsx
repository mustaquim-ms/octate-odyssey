"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { supabase } from "@/lib/supabase"; 
import { 
  X, Lock, User, Power, AlertCircle, 
  Fingerprint, ShieldCheck, ChevronRight, 
  Github, Chrome, Mail 
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup"; // Added to handle specific mode from Navbar
}

export default function AuthModal({ 
  isOpen, 
  onClose, 
  initialMode = "login" 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  initialMode?: "login" | "signup";
}) {
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Sync isLogin state with the prop when modal opens
  useEffect(() => {
    setIsLogin(initialMode === "login");
  }, [isOpen, initialMode]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  // 3D TILT LOGIC
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin }
    });
    if (error) setError(error.message.toUpperCase());
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const { data, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (loginError) throw loginError;
        if (data.user) {
          localStorage.setItem("Navigator_name", data.user.user_metadata?.username || "Navigator");
          window.location.reload(); 
        }
      } else {
        const { data, error: signupError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username, rank: 'Novice', xp: 0 },
            emailRedirectTo: window.location.origin
          }
        });
        if (signupError) throw signupError;
        if (data.user) {
          alert("REGISTRY INITIATED: Check your email to verify your signature.");
          onClose();
        }
      }
    } catch (err: any) {
      setError(err.message.toUpperCase());
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[999] flex items-center justify-center p-4 md:p-10 pointer-events-auto">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
        onClick={onClose} 
        className="absolute inset-0 bg-[#020617]/95 backdrop-blur-xl cursor-crosshair" 
      />

      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        className="relative w-full max-w-[950px] aspect-[1.6/1] bg-[#0a101f] border border-white/10 rounded-[48px] shadow-[0_50px_100px_rgba(0,0,0,0.9)] flex overflow-hidden group"
      >
        {/* FIXED: Reduced border thickness and ensured it doesn't block clicks */}
        <div className="absolute inset-0 border-[12px] border-white/[0.02] rounded-[48px] pointer-events-none z-[60]" />
        
        {/* LEFT SIDE */}
        <div className="hidden md:flex w-[45%] bg-gradient-to-br from-[#0a101f] via-black to-[#0a101f] p-12 flex-col justify-between relative border-r border-white/5">
           <div className="space-y-3">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#7ed957] animate-pulse" />
                 <span className="text-[#ffb423] font-mono text-[10px] font-black uppercase tracking-[0.5em]">Live_Auth // Supabase</span>
              </div>
              <h2 className="font-[family-name:var(--font-outfit)] text-5xl font-black uppercase text-white leading-[0.9] tracking-tighter">
                NAVIGATOR <br /><span className="text-[#7ed957]">ID_CARD</span>
              </h2>
           </div>

           <div className="relative w-48 h-48 mx-auto">
              <div className="absolute inset-0 bg-[#7ed957] blur-[60px] opacity-10" />
              <div className="w-full h-full bg-black/40 border border-white/10 rounded-[32px] flex items-center justify-center relative overflow-hidden shadow-inner">
                 <Fingerprint size={80} className={loading ? "text-[#ffb423] animate-pulse" : email ? "text-[#7ed957]" : "text-gray-800"} />
                 <div className="absolute bottom-0 left-0 w-full py-2 bg-[#7ed957]/5 backdrop-blur-md text-center border-t border-white/5">
                    <span className="font-mono text-[8px] text-[#7ed957] uppercase font-black">{loading ? "Synchronizing..." : "Biometric Sync Active"}</span>
                 </div>
              </div>
           </div>

           <p className="text-gray-500 font-mono text-[9px] uppercase leading-relaxed font-bold tracking-tight opacity-50">
              Authorized station access only. <br />Deep-packet protocol sync enabled.
           </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 p-10 md:p-14 bg-black/20 backdrop-blur-sm relative z-10 overflow-y-auto">
          <button onClick={onClose} className="absolute top-8 right-8 text-gray-600 hover:text-[#ff4d4d] transition-colors cursor-pointer z-[70]">
             <X size={24} className="hover:rotate-90 transition-transform" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div 
              key={isLogin ? "login" : "signup"} 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="mb-10">
                <h3 className="text-4xl font-black uppercase tracking-tighter text-white font-[family-name:var(--font-outfit)]">
                  {isLogin ? "LOG_IN" : "SIGN_UP"}
                </h3>
                <p className="text-gray-500 font-mono text-[10px] mt-1 uppercase font-black tracking-[0.3em]">Sector clearance required</p>
              </div>

              <form className="space-y-4" onSubmit={handleAuth}>
                {!isLogin && (
                    <AuthInput icon={<User size={18} />} placeholder="CHOOSE_USERNAME" value={username} onChange={setUsername} />
                )}
                <AuthInput icon={<Mail size={18} />} placeholder="EMAIL_ADDRESS" type="email" value={email} onChange={setEmail} />
                <AuthInput icon={<Lock size={18} />} placeholder="ACCESS_KEY" type="password" value={password} onChange={setPassword} />

                {error && (
                  <div className="flex items-center gap-2 text-[#ff4d4d] font-mono text-[10px] font-black uppercase bg-red-500/5 p-4 rounded-xl border border-red-500/20">
                    <AlertCircle size={16} /> {error}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#7ed957] disabled:opacity-50 text-black font-black uppercase font-mono text-xs py-6 rounded-2xl flex items-center justify-between px-10 hover:bg-[#ffb423] transition-all cursor-pointer shadow-lg group"
                >
                  <div className="flex items-center gap-4">
                    <Power size={18} className={loading ? "animate-spin" : "group-hover:rotate-90 transition-transform"} />
                    <span className="tracking-widest">{loading ? "SYNCING..." : isLogin ? "Engage Uplink" : "Create Signature"}</span>
                  </div>
                  <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </form>

              {/* SOCIAL BUTTONS WITH REAL HANDLERS */}
              <div className="mt-10 pt-8 border-t border-white/5">
                <div className="flex gap-4">
                  <SocialPill onClick={() => handleSocialLogin('google')} icon={<Chrome size={20} />} color="#7ed957" />
                  <SocialPill onClick={() => handleSocialLogin('github')} icon={<Github size={20} />} color="#ffb423" />
                  <SocialPill onClick={() => {}} icon={<ShieldCheck size={20} />} color="#7ed957" />
                </div>
              </div>

              {/* FIXED: Toggle button made as a proper clickable element */}
              <div className="mt-8 text-center relative z-[80]">
                <button 
                  type="button"
                  onClick={() => { setIsLogin(!isLogin); setError(""); }} 
                  className="text-[10px] font-mono font-black text-gray-500 hover:text-white uppercase tracking-widest cursor-pointer transition-colors py-2 px-4"
                >
                  {isLogin ? "Generate New Signature" : "Access Existing Terminal"}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

function AuthInput({ icon, placeholder, type = "text", value, onChange }: any) {
    return (
      <div className="relative group">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#7ed957] transition-colors">{icon}</div>
        <input 
          required
          type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/[0.02] border border-white/10 px-16 py-5 rounded-2xl text-xs font-mono font-bold text-white outline-none focus:border-[#7ed957]/50 focus:bg-white/[0.05] transition-all uppercase placeholder:text-gray-700" 
        />
      </div>
    );
}

function SocialPill({ icon, color, onClick }: any) {
    return (
      <button 
        type="button"
        onClick={onClick}
        className="flex-1 flex items-center justify-center py-4 bg-white/[0.02] border border-white/10 rounded-2xl hover:bg-white/[0.05] transition-all cursor-pointer group shadow-lg z-[80]" 
        style={{ borderBottom: `2px solid ${color}33` }}
      >
        <div className="transition-transform duration-500 group-hover:scale-125" style={{ color }}>{icon}</div>
      </button>
    );
}