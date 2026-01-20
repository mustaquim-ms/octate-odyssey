"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Globe, Cpu, Terminal, BookOpen, Zap, Route, 
  Wifi, ShieldAlert, ChevronLeft, Play, Lock 
} from "lucide-react";
import { useAuthGuard } from "@/hooks/useAuthGuard";

const MODULE_DATA = {
  core: [
    { 
      slug: "foundations",
      title: "Networking Foundations", 
      desc: "How the Internet Really Works. Covers core concepts like networks, devices, and terminology.", 
      icon: <Globe size={24} />, 
      level: "Beginner", 
      duration: "4h", 
      progress: 0,
      lessons: [
        "What Is a Network?",
        "Network Components",
        "Types of Networks",
        "Data & Packets",
        "IP Addresses",
        "Routers & Switches",
        "How the Internet Works",
        "Troubleshooting Logic"
      ]
    },
    { 
      slug: "building",
      title: "Building Networks", 
      desc: "TCP/IP, IP Addressing, and Routing. Switching design and network management.", 
      icon: <Cpu size={24} />, 
      level: "Intermediate", 
      duration: "8h", 
      progress: 0,
      lessons: [
        "Why Protocols Exist",
        "OSI Model Thinking",
        "TCP/IP vs OSI",
        "IP & Binary Logic",
        "Subnetting Math",
        "Switching Logic",
        "Routing Decisions",
        "Network Design"
      ]
    },
    { 
      slug: "advanced",
      title: "Advanced Networking", 
      desc: "Optimization, performance monitoring, and advanced troubleshooting skills.", 
      icon: <Terminal size={24} />, 
      level: "Advanced", 
      duration: "14h", 
      progress: 0,
      lessons: [
        "Real Network Failures", "Performance Metrics", "Congestion Analysis",
        "QoS Engineering", "Network Monitoring", "Logs & Correlation",
        "Security Strategy", "Firewall Logic", "Network Attacks",
        "Secure Segmentation", "Troubleshooting Models", "Incident Cases",
        "Capacity Planning", "Engineer Mindset"
      ]
    },
  ],
  professional: [
    { 
      slug: "ccna-mastery",
      title: "CCNA: Cisco Certified Associate", 
      desc: "The gold standard. Master Cisco IOS, VLANs, OSPF, and Access Control Lists.", 
      icon: <Cpu size={24} />, 
      level: "Intermediate", 
      duration: "40h", 
      progress: 0,
      lessons: [
        "Intro to Cisco IOS", 
        "VLANs & Trunking", 
        "Inter-VLAN Routing", 
        "OSPF Dynamic Routing", 
        "ACL Security",
        "NAT & DHCP Services"
      ]
    },
    { 
      slug: "ccnp-enterprise",
      title: "CCNP: Enterprise Core", 
      desc: "Advanced routing (BGP), Spanning Tree tuning, and High Availability design.", 
      icon: <ShieldAlert size={24} />, 
      level: "Advanced", 
      duration: "60h", 
      progress: 0,
      lessons: [
        "Advanced STP", 
        "BGP Fundamentals", 
        "EIGRP Optimization", 
        "Wireless Architecture", 
        "Virtualization & SD-Access",
        "Network Automation"
      ]
    },
    { 
      slug: "mikrotik-mtcna",
      title: "MikroTik: RouterOS Mastery", 
      desc: "Master the swiss-army knife of networking. Queues, Firewall, and Winbox logic.", 
      icon: <Zap size={24} />, 
      level: "Intermediate", 
      duration: "20h", 
      progress: 0,
      lessons: [
        "RouterOS Basics", 
        "Bridge & Switch Logic", 
        "Routing & Static Paths", 
        "Wireless & Capsman", 
        "Mangle & QoS Queues",
        "User Management"
      ]
    }
  ],
  specialized: [
    { 
      slug: "osi-model",
      title: "TCP/IP & OSI Model", 
      desc: "Mastering the 7 layers of communication and standards.", 
      icon: <BookOpen size={24} />, 
      level: "Expert", 
      duration: "5h", 
      progress: 0,
      lessons: [
        "Why Networking Needs Layers",
        "OSI Layer Breakdown",
        "TCP/IP and Real Traffic",
        "Encapsulation Journey",
        "Common Port Numbers",
        "Diagnostic Tools Mastery"
      ]
    },
    { 
      slug: "subnetting",
      title: "Subnetting Made Simple", 
      desc: "IPv4 and IPv6 math explained with tactical simplicity.", 
      icon: <Zap size={24} />, 
      level: "Intermediate", 
      duration: "6h", 
      progress: 0,
      lessons: [
        "IP Address Structure",
        "Subnetting Math Step-by-Step",
        "IPv6 Explained Clearly",
        "CIDR & Slash Notation",
        "NAT & Private IP Logic",
        "Binary Speed-Counting"
      ]
    },
    { 
      slug: "routing-switching",
      title: "Routing & Switching", 
      desc: "Essentials with real network scenarios and hardware simulation.", 
      icon: <Route size={24} />, 
      level: "Advanced", 
      duration: "10h", 
      progress: 0,
      lessons: [
        "Static Routing", 
        "Dynamic Routing (OSPF)", 
        "Inter-VLAN Routing", 
        "Spanning Tree Protocol", 
        "EtherChannel"
      ]
    },
    { 
      slug: "wireless",
      title: "Wireless Networking", 
      desc: "Wi-Fi Design, optimization, and signal architecture.", 
      icon: <Wifi size={24} />, 
      level: "Intermediate", 
      duration: "4h", 
      progress: 0,
      lessons: [
        "Wi-Fi Standards", 
        "Signal & Antenna Design", 
        "Wireless Security", 
        "AP Deployment"
      ]
    },
    { 
      slug: "security",
      title: "Network Security Basics", 
      desc: "Firewalls, VPNs, and identifying digital threats.", 
      icon: <ShieldAlert size={24} />, 
      level: "Advanced", 
      duration: "9h", 
      progress: 0,
      lessons: [
        "Firewall Fundamentals", 
        "VPN Architecture", 
        "IDS/IPS Systems", 
        "Endpoint Security"
      ]
    },
    { 
      slug: "troubleshooting-pro",
      title: "Hands-On Troubleshooting", 
      desc: "Advanced forensics. Master packet captures, latency tracing, and MTU issues.", 
      icon: <ShieldAlert size={24} />, 
      level: "Advanced", 
      duration: "6h", 
      progress: 0,
      lessons: ["Packet Capture Art", "Advanced Traceroute", "DNS Debugging", "MTU & Fragmentation", "Forensics Lab"]
    },
    { 
      slug: "cloud-networking",
      title: "Cloud Networking", 
      desc: "Master VPCs, Security Groups, and Load Balancing in AWS, Azure, and GCP.", 
      icon: <Globe size={24} />, 
      level: "Intermediate", 
      duration: "7h", 
      progress: 0,
      lessons: ["VPC Architecture", "Cloud Gateways", "NACLs vs SG", "Global Load Balancing", "Hybrid Cloud Links"]
    },
    { 
      slug: "sdn-automation",
      title: "SDN & Automation", 
      desc: "The future of networking. Learn Python, Ansible, and API-driven control planes.", 
      icon: <Cpu size={24} />, 
      level: "Expert", 
      duration: "10h", 
      progress: 0,
      lessons: ["Control vs Data Plane", "Network APIs", "Ansible for Networks", "Python Netmiko Lab", "Infrastructure as Code"]
    },
    { 
      slug: "enterprise-design",
      title: "Enterprise Design", 
      desc: "Design resilient campus networks using Hierarchical models and Zero Trust.", 
      icon: <Route size={24} />, 
      level: "Expert", 
      duration: "8h", 
      progress: 0,
      lessons: ["Hierarchical Models", "Redundancy (HSRP)", "Data Center Design", "SD-WAN Logic", "Zero Trust Architecture"]
    },
  ]
};

type CategoryType = 'core' | 'specialized' | 'professional';

export default function ModuleGrid({ category }: { category: CategoryType }) {
  const [selected, setSelected] = useState<any | null>(null);
  const { checkAuth } = useAuthGuard();
  const router = useRouter();
  
  const data = MODULE_DATA[category];

  // UPDATED: Logic to intercept lesson clicks with Auth Guard
  const handleLessonClick = (path: string) => {
    checkAuth(() => {
      // This only runs if Pilot is authenticated
      router.push(path);
    });
  };

  return (
    <>
      {/* 1. MODULE GRID CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((module, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -10 }}
            onClick={() => setSelected(module)}
            className="group relative bg-[#0a101f]/60 backdrop-blur-md border border-white/5 p-10 rounded-[40px] overflow-hidden hover:border-[#7ed957]/30 transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-10">
              <div className="p-5 bg-white/5 rounded-2xl text-[#7ed957] group-hover:scale-110 group-hover:text-[#ffb423] transition-all duration-500">
                {module.icon}
              </div>
              <div className="flex flex-col items-end">
                <span className="font-mono text-[9px] uppercase font-black text-gray-500 tracking-widest">{module.duration}</span>
                <span className={`font-mono text-[9px] uppercase font-black tracking-widest ${module.level === 'Beginner' ? 'text-[#7ed957]' : 'text-[#ffb423]'}`}>{module.level}</span>
              </div>
            </div>

            <h3 className="font-[family-name:var(--font-outfit)] text-2xl font-black mb-4 text-white uppercase tracking-tight leading-tight">
              {module.title}
            </h3>
            <p className="font-mono text-xs text-gray-500 leading-relaxed mb-10 h-12 overflow-hidden text-ellipsis">
              {module.desc}
            </p>

            <div className="flex items-center justify-between mb-3 font-mono text-[10px] uppercase font-black tracking-[0.2em]">
              <span className="text-gray-600">Sync Status</span>
              <span className="text-white">{module.progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${module.progress}%` }}
                className="h-full bg-gradient-to-r from-[#7ed957] to-[#ffb423]" 
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* 2. MISSION BRIEFING MODAL (Side-over) */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] cursor-pointer" 
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full md:w-[600px] h-screen bg-[#0a101f] z-[110] border-l border-[#7ed95733] p-12 overflow-y-auto"
            >
              <button onClick={() => setSelected(null)} className="mb-12 text-gray-500 hover:text-[#7ed957] flex items-center gap-3 font-mono text-[10px] font-black uppercase tracking-[0.3em] transition-colors cursor-pointer">
                <ChevronLeft size={16} /> Close Briefing
              </button>
              
              <div className="p-4 bg-[#7ed95711] inline-block rounded-2xl text-[#7ed957] mb-6">
                 {selected.icon}
              </div>
              <h2 className="text-4xl font-[family-name:var(--font-outfit)] font-black uppercase mb-4 tracking-tighter leading-none text-white">{selected.title}</h2>
              <p className="text-gray-500 font-mono text-xs leading-relaxed mb-12 uppercase font-bold tracking-wider">{selected.desc}</p>

              <div className="space-y-4">
                <h4 className="text-[#ffb423] font-mono text-[10px] font-black uppercase tracking-[0.4em] mb-8">Mission Checklist</h4>
                
                {selected.lessons.map((lessonName: string, i: number) => {
                  const isUnlocked = i === 0 || (selected.progress >= (i * 12));

                  return isUnlocked ? (
                    // MODIFIED: Use a div with onClick instead of <Link> to enable Auth Check
                    <div 
                      key={i} 
                      onClick={() => handleLessonClick(`/learning/${selected.slug}/lesson-${i + 1}`)}
                      className="p-6 bg-white/[0.02] border border-[#7ed957]/40 rounded-2xl flex items-center justify-between group transition-all hover:bg-[#7ed95705] cursor-pointer"
                    >
                      <div className="flex items-center gap-6 text-left">
                        <span className="font-mono text-xs text-gray-600 font-bold">0{i + 1}</span>
                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">{lessonName}</span>
                      </div>
                      <Play size={16} className="text-[#7ed957] group-hover:scale-125 transition-transform" />
                    </div>
                  ) : (
                    <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between opacity-40 cursor-not-allowed">
                      <div className="flex items-center gap-6 text-left">
                        <span className="font-mono text-xs text-gray-600 font-bold">0{i + 1}</span>
                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">{lessonName}</span>
                      </div>
                      <Lock size={16} className="text-gray-700" />
                    </div>
                  );
                })}
              </div>
              
              {/* FINAL EXAM GATING - Also protected by Auth Check */}
              <div className="mt-12">
                <h4 className="text-gray-600 font-mono text-[9px] uppercase font-black mb-4 tracking-widest text-center">Final Module Evaluation</h4>
                <button 
                    disabled={selected.progress < 85}
                    onClick={() => handleLessonClick(`/learning/${selected.slug}/final-exam`)}
                    className={`w-full py-6 font-black font-mono text-xs uppercase tracking-[0.3em] rounded-sm transition-all shadow-lg 
                        ${selected.progress >= 85 
                        ? 'bg-[#7ed957] text-black hover:bg-[#ffb423] cursor-pointer shadow-[0_0_30px_rgba(126,217,87,0.3)]' 
                        : 'bg-white/5 text-gray-600 cursor-not-allowed border border-white/5'}`}
                >
                    {selected.progress >= 85 ? "Initialize Final Exam" : "Achieve 85% Sync to Unlock Exam"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}