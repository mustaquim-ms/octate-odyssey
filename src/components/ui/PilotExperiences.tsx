"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const experiences = [
  {
    name: "Sabrina Sarah",
    role: "Network Security Analyst",
    rank: "Architect Tier",
    text: "The interactive terminal labs made the OSI model actually click for me. Finally, a platform that respects the technical depth of networking.",
    color: "#7ed957"
  },
  {
    name: "Raffat Esha",
    role: "Infrastructure Lead",
    rank: "Titan Tier",
    text: "Subnetting was my nightmare until I started the speedrun missions here. The UI is incredibly immersive and the logic is flawless.",
    color: "#ffb423"
  },
  {
    name: "Safin Rabbani",
    role: "Systems Administrator",
    rank: "Expert Tier",
    text: "Octate Odyssey turned my CCNA prep into a game. The high-contrast console theme makes studying for 4 hours feel like 20 minutes.",
    color: "#7ed957"
  },
  {
    name: "Rajib Akash",
    role: "Cloud Architect",
    rank: "Architect Tier",
    text: "The visualization of packet flow is top-tier. It's rare to find a platform that balances gamification with actual professional accuracy.",
    color: "#ffb423"
  },
  {
    name: "Niharika Simi",
    role: "Wireless Specialist",
    rank: "Master Tier",
    text: "Mastering CIDR notation became a breeze. The feedback loops and XP systems keep you coming back to refine your networking skills.",
    color: "#7ed957"
  },
  {
    name: "Tanvir Rahman",
    role: "DevSecOps Engineer",
    rank: "Titan Tier",
    text: "From Binary foundations to advanced routing protocols, the trajectory is perfectly planned. Best investment for any aspiring engineer.",
    color: "#ffb423"
  }
];

// We double the array to create a seamless infinite loop
const doubleExperiences = [...experiences, ...experiences];

export default function PilotExperiences() {
  return (
    <section className="w-full mt-56 overflow-hidden py-10">
      {/* Section Header */}
      <div className="flex flex-col items-center gap-5 mb-20 text-center px-10">
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-12 bg-[#7ed957]/30" />
          <span className="text-[#7ed957] font-mono text-[10px] font-bold tracking-[0.6em] uppercase opacity-70">Pilot Logs</span>
          <div className="h-[1px] w-12 bg-[#7ed957]/30" />
        </div>
        <h2 className="text-5xl font-[family-name:var(--font-outfit)] font-black uppercase tracking-tighter text-white">
          Transmission Feedback
        </h2>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative flex overflow-hidden group">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{
            x: [0, "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
          // Pause animation on hover for readability
          whileHover={{ animationPlayState: "paused" }}
        >
          {doubleExperiences.map((exp, i) => (
            <div
              key={i}
              className="relative w-[400px] flex-shrink-0 bg-[#0a101f]/60 backdrop-blur-xl border border-white/5 p-10 rounded-[40px] overflow-hidden group/card transition-all hover:border-[#7ed957]/30"
            >
              {/* Decorative Corner Glow */}
              <div 
                className="absolute -top-10 -right-10 w-32 h-32 opacity-10 transition-opacity group-hover/card:opacity-40 blur-3xl"
                style={{ backgroundColor: exp.color }}
              />
              
              <Quote className="text-white/5 mb-6 group-hover/card:text-[#7ed957]/20 transition-colors" size={40} />
              
              <p className="font-mono text-xs text-gray-400 leading-relaxed mb-10 whitespace-normal italic">
                "{exp.text}"
              </p>

              <div className="flex items-center gap-5 border-t border-white/5 pt-8">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-black text-2xl font-[family-name:var(--font-outfit)] shadow-lg"
                  style={{ backgroundColor: exp.color, boxShadow: `0 0 20px ${exp.color}44` }}
                >
                  {exp.name.charAt(0)}
                </div>
                <div className="text-left">
                  <h4 className="font-black text-white text-sm uppercase tracking-tighter font-[family-name:var(--font-outfit)]">
                    {exp.name}
                  </h4>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest font-mono">
                    {exp.role}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: exp.color }} />
                    <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: exp.color }}>
                      {exp.rank}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Gradient Fades for the edges to make it look high-end */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}