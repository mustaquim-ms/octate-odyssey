"use client";
import { Mail, User, Globe, Pencil } from "lucide-react";

export default function AccountSettings() {
  return (
    <div className="bg-[#0a101f] border border-white/5 p-10 rounded-[40px] h-full">
      <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-black uppercase mb-10 text-white">Navigator Information</h3>
      
      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProfileInput label="Full Name" val="Mustaquim Chowdhury" icon={<User size={18}/>} />
            <ProfileInput label="Navigator Handle" val="Navigator_mustaquim" icon={<Pencil size={18}/>} />
            <ProfileInput label="Encryption Email" val="mustaquim@odyssey.net" icon={<Mail size={18}/>} />
            <ProfileInput label="Operational Region" val="Bangladesh [AS45829]" icon={<Globe size={18}/>} />
        </div>

        <div className="space-y-4">
            <label className="font-mono text-[10px] text-gray-500 uppercase font-black tracking-widest ml-1">Mission Log / Bio</label>
            <textarea 
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 font-mono text-sm focus:outline-none focus:border-[#7ed95733] transition-all h-32"
                placeholder="Brief summary of your technical objectives..."
            />
        </div>

        <button className="bg-[#7ed957] text-black font-black font-mono text-xs px-12 py-5 rounded-xl uppercase tracking-widest hover:bg-[#ffb423] transition-all shadow-lg cursor-pointer">
            Save Modifications
        </button>
      </form>
    </div>
  );
}

function ProfileInput({ label, val, icon }: any) {
    return (
        <div className="space-y-3">
            <label className="font-mono text-[10px] text-gray-500 uppercase font-black tracking-widest ml-1">{label}</label>
            <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#7ed957] transition-colors">{icon}</div>
                <input 
                    defaultValue={val}
                    className="w-full bg-white/5 border border-white/10 px-14 py-5 rounded-2xl font-mono text-xs focus:outline-none focus:border-[#7ed95733] transition-all text-white font-bold" 
                />
            </div>
        </div>
    )
}