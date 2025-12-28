"use client";
import { motion } from "framer-motion";

const steps = [
  { id: "01", title: "Binary Foundations", desc: "Master bits, bytes, and the math of the matrix." },
  { id: "02", title: "IP Architecture", desc: "Understand addressing, IPv4 vs IPv6, and routing." },
  { id: "03", title: "Subnet Warfare", desc: "Slice networks with CIDR and VLSM in real-time." },
  { id: "04", title: "Global Defense", desc: "Deploy firewalls, NAT, and secure protocols." },
];

export default function MissionPath() {
  return (
    <div className="w-full max-w-6xl mx-auto mt-40 px-6">
      <div className="text-center mb-20">
        <h2 className="text-5xl font-[family-name:var(--font-outfit)] font-black uppercase mb-4">The Learning Trajectory</h2>
        <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">Follow the sequence to achieve full sync</p>
      </div>

      <div className="relative">
        {/* The Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -translate-y-1/2 hidden lg:block" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="relative z-10 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#0a101f] border border-[#7ed957]/30 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_#7ed95722]">
                <span className="font-mono font-bold text-[#7ed957]">{step.id}</span>
              </div>
              <h4 className="font-[family-name:var(--font-outfit)] font-bold text-xl mb-3">{step.title}</h4>
              <p className="text-gray-500 font-mono text-xs leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}