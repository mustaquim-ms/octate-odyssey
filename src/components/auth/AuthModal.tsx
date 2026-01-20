"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  X, Lock, User, Power, AlertCircle, 
  Fingerprint, ShieldCheck, ChevronRight, 
  Github, Chrome, Mail 
} from "lucide-react";

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // FIX: Prevent background scrolling when modal is open
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

  if (!isOpen) return null;

  const handleSimulatedAuth = () => {
    if ((username === "sabrihin" && password === "odyssey2025") || (username === "admin" && password === "admin123")) {
      localStorage.setItem("pilot_session", "active");
      localStorage.setItem("pilot_name", username === "sabrihin" ? "Sabrihin" : "Admin");
      localStorage.setItem("pilot_handle", username);
      window.location.reload(); 
    } else {
      setError("SIGNATURE MISMATCH: ACCESS DENIED");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    // FULL VIEWPORT CONTAINER - GUARANTEED CENTERING
    <div className="fixed top-0 left-0 w-screen h-screen z-[999] flex items-center justify-center p-4 md:p-10 pointer-events-auto">
      
      {/* 1. Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        onClick={onClose} 
        className="absolute inset-0 bg-[#020617]/95 backdrop-blur-xl cursor-crosshair" 
      />

      {/* 2. 3D ID Card - Perfectly Centered */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        className="relative w-full max-w-[950px] bg-[#0a101f] border border-white/10 rounded-[48px] shadow-[0_50px_100px_rgba(0,0,0,0.9)] flex overflow-hidden group auth-card-shadow"
      >
        {/* Decorative Frame */}
        <div className="absolute inset-0 border-[16px] border-white/[0.02] rounded-[48px] pointer-events-none z-50" />
        
        {/* LEFT SIDE: Identity Section */}
        <div className="hidden md:flex w-[45%] bg-gradient-to-br from-[#0a101f] via-black to-[#0a101f] p-12 flex-col justify-between relative border-r border-white/5">
           <div className="space-y-3">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#7ed957] animate-pulse" />
                 <span className="text-[#ffb423] font-mono text-[10px] font-black uppercase tracking-[0.5em]">Auth_Session // v2.0</span>
              </div>
              <h2 className="font-[family-name:var(--font-outfit)] text-5xl font-black uppercase text-white leading-[0.9] tracking-tighter">
                NAVIGATOR <br /><span className="text-[#7ed957]">ID_CARD</span>
              </h2>
           </div>

           <div className="relative w-48 h-48 mx-auto">
              <div className="absolute inset-0 bg-[#7ed957] blur-[60px] opacity-10" />
              <div className="w-full h-full bg-black/40 border border-white/10 rounded-[32px] flex items-center justify-center relative overflow-hidden shadow-inner transition-all duration-700">
                 <Fingerprint size={80} className={username ? "text-[#7ed957]" : "text-gray-800"} />
                 <div className="absolute bottom-0 left-0 w-full py-2 bg-[#7ed957]/5 backdrop-blur-md text-center border-t border-white/5">
                    <span className="font-mono text-[8px] text-[#7ed957] uppercase font-black">Biometric Sync Active</span>
                 </div>
              </div>
           </div>

           <p className="text-gray-500 font-mono text-[9px] uppercase leading-relaxed font-bold tracking-tight opacity-50">
              Authorized station access only. <br />Deep-packet protocol sync enabled.
           </p>
        </div>

        {/* RIGHT SIDE: Auth Form */}
        <div className="flex-1 p-10 md:p-14 bg-black/20 backdrop-blur-sm relative z-10">
          <button onClick={onClose} className="absolute top-8 right-8 text-gray-600 hover:text-[#ff4d4d] transition-colors cursor-pointer group">
             <X size={24} className="group-hover:rotate-90 transition-transform" />
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

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <AuthInput icon={<User size={18} />} placeholder="NAV_USERNAME" value={username} onChange={setUsername} />
                <AuthInput icon={<Lock size={18} />} placeholder="ACCESS_KEY" type="password" value={password} onChange={setPassword} />

                {error && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-[#ff4d4d] font-mono text-[9px] font-black uppercase bg-red-500/5 p-4 rounded-xl border border-red-500/20">
                    <AlertCircle size={16} /> {error}
                  </motion.div>
                )}

                <button 
                  onClick={handleSimulatedAuth}
                  className="w-full bg-[#7ed957] text-black font-black uppercase font-mono text-xs py-5 rounded-2xl flex items-center justify-between px-10 hover:bg-[#ffb423] transition-all cursor-pointer shadow-[0_20px_40px_rgba(126,217,87,0.2)] group"
                >
                  <div className="flex items-center gap-4">
                    <Power size={18} className="group-hover:rotate-90 transition-transform duration-500" />
                    <span className="tracking-widest">Engage Uplink</span>
                  </div>
                  <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </form>

              {/* SOCIAL BUTTONS */}
              <div className="mt-12 pt-8 border-t border-white/5">
                <div className="flex gap-4">
                  <SocialPill icon={<Chrome size={20} />} color="#7ed957" />
                  <SocialPill icon={<Github size={20} />} color="#ffb423" />
                  <SocialPill icon={<ShieldCheck size={20} />} color="#7ed957" />
                </div>
              </div>

              <div className="mt-10 text-center">
                <button onClick={() => setIsLogin(!isLogin)} className="text-[10px] font-mono font-black text-gray-500 hover:text-white uppercase tracking-widest cursor-pointer transition-colors">
                  {isLogin ? "Generate New Signature" : "Return to Terminal"}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

// Sub-components as before...
function AuthInput({ icon, placeholder, type = "text", value, onChange }: any) {
    return (
      <div className="relative group">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#7ed957] transition-colors">{icon}</div>
        <input 
          type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/[0.02] border border-white/10 px-16 py-5 rounded-2xl text-xs font-mono font-bold text-white outline-none focus:border-[#7ed957]/50 focus:bg-white/[0.05] transition-all uppercase placeholder:text-gray-700" 
        />
      </div>
    );
}

function SocialPill({ icon, color }: any) {
    return (
      <button className="flex-1 flex items-center justify-center py-4 bg-white/[0.02] border border-white/10 rounded-2xl hover:bg-white/[0.05] transition-all cursor-pointer group shadow-lg" style={{ borderBottom: `2px solid ${color}33` }}>
        <div className="transition-transform duration-500 group-hover:scale-125" style={{ color }}>{icon}</div>
      </button>
    );
}