"use client";
// FIXED: Added 'Lock' and 'Shield' to the import list
import { ShieldCheck, Key, Smartphone, Fingerprint, Lock, Shield } from "lucide-react";

export default function SecurityPortal() {
  return (
    <div className="space-y-8">
      <div className="bg-[#0a101f] border border-[#ffb42333] p-10 rounded-[40px] relative overflow-hidden">
        {/* Subtle Background Icon */}
        <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
            <Shield size={250} />
        </div>

        <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-black uppercase mb-2 text-[#ffb423]">Access Security</h3>
        <p className="text-gray-500 font-mono text-[10px] uppercase mb-10 font-bold tracking-[0.3em]">Manage your encrypted credentials</p>

        <div className="space-y-6 relative z-10">
            <SecurityRow 
                icon={<Lock size={20} />} 
                title="Account Password" 
                desc="Last synchronized: 42 days ago" 
                action="Update Key" 
            />
            <SecurityRow 
                icon={<Smartphone size={20} />} 
                title="2FA Authentication" 
                desc="Status: ENABLED via Authenticator App" 
                action="Configure" 
                isActive 
            />
            <SecurityRow 
                icon={<Fingerprint size={20} />} 
                title="Biometric Access" 
                desc="Not configured for this station" 
                action="Initialize" 
            />
        </div>
      </div>

      <div className="bg-red-500/5 border border-red-500/20 p-10 rounded-[40px] flex flex-col md:flex-row justify-between items-center gap-6">
         <div className="text-center md:text-left">
            <h4 className="text-red-500 font-black uppercase tracking-tighter text-lg font-[family-name:var(--font-outfit)]">Self-Destruct Sequence</h4>
            <p className="text-gray-600 font-mono text-[9px] uppercase font-bold mt-1 tracking-widest">Permanently remove your pilot profile from the matrix</p>
         </div>
         <button className="px-10 py-4 border border-red-500/30 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-red-500 hover:text-white transition-all cursor-pointer rounded-xl font-mono">
            Terminate Profile
         </button>
      </div>
    </div>
  );
}

function SecurityRow({ icon, title, desc, action, isActive }: any) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-white/10 transition-all gap-4">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className={`p-4 rounded-xl transition-colors ${isActive ? 'bg-[#7ed95711] text-[#7ed957]' : 'bg-white/5 text-gray-500 group-hover:text-white'}`}>
                    {icon}
                </div>
                <div>
                    <h4 className="font-bold text-white uppercase text-sm tracking-tight font-[family-name:var(--font-outfit)]">{title}</h4>
                    <p className="font-mono text-[9px] text-gray-500 uppercase font-black mt-1 tracking-wider">{desc}</p>
                </div>
            </div>
            <button className="font-mono text-[10px] font-black uppercase text-[#ffb423] hover:text-white transition-all cursor-pointer border-b border-transparent hover:border-[#ffb423] pb-1 tracking-[0.2em]">
                {action}
            </button>
        </div>
    )
}