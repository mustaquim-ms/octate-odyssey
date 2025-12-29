"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, Linkedin, Mail, Lock, User, Chrome, Power, AlertCircle } from "lucide-react";

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSimulatedAuth = () => {
    // VALIDATION LOGIC
    if ((username === "sabrihin" && password === "odyssey2025") || 
        (username === "admin" && password === "admin123")) {
      
      localStorage.setItem("pilot_session", "active");
      localStorage.setItem("pilot_name", username === "sabrihin" ? "Sabrihin" : "Administrator");
      localStorage.setItem("pilot_handle", username);
      
      window.location.reload(); 
    } else {
      setError("INVALID SIGNAL: Signature not recognized.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer" />

      <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }} className="relative w-full max-w-lg bg-[#0a101f] border border-[#7ed957]/20 rounded-3xl shadow-2xl overflow-hidden z-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7ed957] to-transparent animate-pulse" />
        
        <div className="p-10 md:p-14">
          <AnimatePresence mode="wait">
            <motion.div key={isLogin ? "login" : "signup"}>
              <h2 className="font-[family-name:var(--font-outfit)] text-4xl font-black mb-2 uppercase tracking-tighter text-white text-center">
                {isLogin ? "LOG" : "SIGN"} <span className={isLogin ? "text-[#ffb423]" : "text-[#7ed957]"}>{isLogin ? "IN" : "UP"}</span>
              </h2>

              <div className="space-y-4 mt-10">
                {/* USERNAME INPUT */}
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#7ed957]" size={18} />
                  <input 
                    type="text" 
                    placeholder="PILOT USERNAME" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/5 px-14 py-5 rounded-2xl text-xs font-mono font-bold text-white outline-none focus:border-[#7ed957]/30 uppercase" 
                  />
                </div>

                {/* PASSWORD INPUT */}
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#ffb423]" size={18} />
                  <input 
                    type="password" 
                    placeholder="ACCESS KEY" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/5 px-14 py-5 rounded-2xl text-xs font-mono font-bold text-white outline-none focus:border-[#ffb423]/30 uppercase" 
                  />
                </div>

                {error && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-red-500 font-mono text-[10px] font-black uppercase justify-center">
                    <AlertCircle size={14} /> {error}
                  </motion.div>
                )}
                
                <button onClick={handleSimulatedAuth} className={`w-full py-5 mt-6 font-mono font-black uppercase tracking-[0.3em] transition-all cursor-pointer rounded-xl flex items-center justify-center gap-3 ${isLogin ? 'bg-[#ffb423] text-black shadow-[0_0_30px_#ffb42344]' : 'bg-[#7ed957] text-black shadow-[0_0_30px_#7ed95744]'}`}>
                  <Power size={18} /> ENGAGE ACCESS
                </button>
              </div>

              <p className="text-center text-gray-600 font-mono text-[9px] mt-8 uppercase leading-relaxed">
                Hint: Use <span className="text-white">sabrihin</span> / <span className="text-white">odyssey2025</span>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}