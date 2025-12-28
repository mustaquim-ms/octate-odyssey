"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, Linkedin, Mail, Lock, User, Chrome } from "lucide-react";

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* 1. Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer" 
      />

      {/* 2. Modal Window */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        className="relative w-full max-w-lg bg-[#0a101f] border border-[#7ed957]/20 rounded-3xl shadow-[0_0_80px_rgba(126,217,87,0.15)] overflow-hidden z-10"
      >
        {/* Animated Scanning Line Decor */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7ed957] to-transparent animate-pulse" />
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors cursor-pointer z-50">
          <X size={24} />
        </button>

        <div className="p-10 md:p-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login-form" : "signup-form"}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: "circOut" }}
            >
              {/* Header */}
              <h2 className="font-[family-name:var(--font-syne)] text-4xl font-black mb-3 uppercase tracking-tighter">
                {isLogin ? "LOG" : "SIGN"} <span className={isLogin ? "text-[#ffb423]" : "text-[#7ed957]"}>{isLogin ? "IN" : "UP"}</span>
              </h2>
              <p className="text-gray-500 text-sm mb-10 font-[family-name:var(--font-space)] font-bold tracking-widest uppercase opacity-60">
                {isLogin ? "Sequence Initiation" : "New Pilot Registration"}
              </p>

              {/* Social Login Section */}
              <div className="flex gap-4 mb-10">
                <SocialBtn icon={<Chrome size={20} />} color="#7ed957" />
                <SocialBtn icon={<Github size={20} />} color="#ffb423" />
                <SocialBtn icon={<Linkedin size={20} />} color="#7ed957" />
              </div>

              {/* Divider */}
              <div className="relative flex items-center mb-10">
                <div className="flex-grow border-t border-white/5"></div>
                <span className="px-4 text-[10px] text-gray-600 font-bold tracking-[0.4em] uppercase">Auth Sync</span>
                <div className="flex-grow border-t border-white/5"></div>
              </div>

              {/* Form Input Fields */}
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                {!isLogin && (
                  <AuthInput icon={<User size={18} />} placeholder="PILOT NAME" type="text" />
                )}
                <AuthInput icon={<Mail size={18} />} placeholder="ACCESS EMAIL" type="email" />
                <AuthInput icon={<Lock size={18} />} placeholder="ACCESS KEY" type="password" />
                
                <button className={`w-full py-5 mt-6 font-[family-name:var(--font-space)] font-black uppercase tracking-[0.3em] transition-all cursor-pointer rounded-xl ${isLogin ? 'bg-[#ffb423] text-black hover:shadow-[0_0_30px_#ffb42388]' : 'bg-[#7ed957] text-black hover:shadow-[0_0_30px_#7ed95788]'}`}>
                  {isLogin ? "ENGAGE ACCESS" : "CONFIRM IDENTITY"}
                </button>
              </form>

              {/* Switch View Toggle */}
              <div className="mt-10 text-center">
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[11px] text-gray-500 hover:text-white transition-all font-black uppercase tracking-[0.2em] cursor-pointer"
                >
                  {isLogin ? "Need new clearance? Create Account" : "Existing pilot? Resume Session"}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

// Sub-component for Social Buttons
function SocialBtn({ icon, color }: { icon: React.ReactNode; color: string }) {
  return (
    <button 
      className="flex-1 flex items-center justify-center py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group"
      style={{ borderBottom: `2px solid ${color}22` }}
    >
      <div className="transition-transform group-hover:scale-125 duration-300" style={{ color }}>
        {icon}
      </div>
    </button>
  );
}

// Sub-component for Input Fields
function AuthInput({ icon, placeholder, type }: { icon: React.ReactNode; placeholder: string; type: string }) {
  return (
    <div className="relative group">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#7ed957] transition-colors">
        {icon}
      </div>
      <input 
        type={type} 
        placeholder={placeholder}
        className="w-full bg-white/[0.03] border border-white/5 px-14 py-5 rounded-2xl text-xs focus:outline-none focus:border-[#7ed957]/30 focus:bg-white/[0.07] transition-all font-[family-name:var(--font-space)] font-bold placeholder:text-gray-700 tracking-widest uppercase"
      />
    </div>
  );
}