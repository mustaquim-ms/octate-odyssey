"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Hash, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/5 bg-[#020617] pt-24 pb-12 font-[family-name:var(--font-jetbrains)]">
      {/* Top Laser-Line Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#7ed957]/30 to-transparent" />
      
      <div className="max-w-[1600px] mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-24">
          
          {/* Column 1-2: Brand Identity & Tagline */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <Image src="/logo.png" alt="Octate Odyssey" width={64} height={64} className="drop-shadow-[0_0_10px_rgba(126,217,87,0.2)]" />
              <div className="flex flex-col">
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-10 font-medium">
              The elite frontier for mastering the digital matrix. We transform packet-novices into subnet-samurais through deep technical immersion.
            </p>
            
            {/* ENHANCED SOCIAL LINKS */}
            <div className="flex gap-4">
              <SocialLink 
                href="https://github.com/octateodyssey" 
                icon={<Github size={20} />} 
                label="GitHub"
                hoverColor="#ffffff"
              />
              <SocialLink 
                href="https://x.com/octateodyssey" 
                icon={<Twitter size={20} />} 
                label="X (Twitter)"
                hoverColor="#1DA1F2"
              />
              <SocialLink 
                href="https://discord.gg/octateodyssey" 
                icon={<Hash size={20} />} 
                label="Discord"
                hoverColor="#5865F2"
              />
              <SocialLink 
                href="mailto:support@octateodyssey.com" 
                icon={<Mail size={20} />} 
                label="Email Support"
                hoverColor="#ffb423" 
              />
            </div>
          </div>

          {/* Column 3: Odyssey Hub */}
          <div>
            <h4 className="font-[family-name:var(--font-outfit)] font-black text-[11px] uppercase tracking-[0.3em] text-white mb-8 border-l-2 border-[#ffb423] pl-3">
              Odyssey Hub
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              <li><FooterNavLink href="/dashboard">Dashboard</FooterNavLink></li>
              <li><FooterNavLink href="/learning">Learning</FooterNavLink></li>
              <li><FooterNavLink href="/leaderboard">Global Ranks</FooterNavLink></li>
              <li><FooterNavLink href="/community">Community</FooterNavLink></li>
              <li><FooterNavLink href="/support">Tech Support</FooterNavLink></li>
              <li><FooterNavLink href="/blog">Dev Blog</FooterNavLink></li>
            </ul>
          </div>

          {/* Column 4: Training Center */}
          <div>
            <h4 className="font-[family-name:var(--font-outfit)] font-black text-[11px] uppercase tracking-[0.3em] text-white mb-8 border-l-2 border-[#7ed957] pl-3">
              Missions
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              <li><FooterNavLink href="/missions">Active Missions</FooterNavLink></li>
              <li><FooterNavLink href="/labs">Sandbox Labs</FooterNavLink></li>
              <li><FooterNavLink href="/challenges">Daily Pings</FooterNavLink></li>
              <li><FooterNavLink href="/certifications">Diplomas</FooterNavLink></li>
              <li><FooterNavLink href="/path">Career Path</FooterNavLink></li>
              <li><FooterNavLink href="/flashcards">Flashcards</FooterNavLink></li>
            </ul>
          </div>

          {/* Column 5: Resources */}
          <div>
            <h4 className="font-[family-name:var(--font-outfit)] font-black text-[11px] uppercase tracking-[0.3em] text-white mb-8 border-l-2 border-[#ffb423] pl-3">
              Resources
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              <li><FooterNavLink href="#">Cheat Sheets</FooterNavLink></li>
              <li><FooterNavLink href="#">IP Calculator</FooterNavLink></li>
              <li><FooterNavLink href="#">Subnet Visualizer</FooterNavLink></li>
              <li><FooterNavLink href="#">Net-Simulator</FooterNavLink></li>
              <li><FooterNavLink href="#">Glossary</FooterNavLink></li>
              <li><FooterNavLink href="#">API Docs</FooterNavLink></li>
            </ul>
          </div>

          {/* Column 6: Real-time System Status */}
          <div className="flex flex-col items-start">
            <h4 className="font-[family-name:var(--font-outfit)] font-black text-[11px] uppercase tracking-[0.3em] text-white mb-8 border-l-2 border-[#7ed957] pl-3">
              Status
            </h4>
            <div className="bg-white/[0.03] border border-white/5 p-5 rounded-2xl w-full backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="w-2 h-2 bg-[#7ed957] rounded-full shadow-[0_0_8px_#7ed957]" />
                  <div className="absolute inset-0 w-2 h-2 bg-[#7ed957] rounded-full animate-ping" />
                </div>
                <span className="text-[9px] font-black uppercase text-[#7ed957] tracking-[0.2em]">Operational</span>
              </div>
              <p className="text-[9px] text-gray-600 font-bold leading-tight uppercase tracking-tighter">
                Global Protocol sync: <span className="text-gray-400">Stable</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Legal & Signature */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-600">
            © 2025 <span className="text-white">Octate Odyssey</span>. Project initialized for the matrix.
          </div>
          <div className="flex gap-8 text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500">
            <Link href="#" className="hover:text-[#ffb423] transition-colors">Privacy Protocol</Link>
            <Link href="#" className="hover:text-[#ffb423] transition-colors">Terms of Access</Link>
            <Link href="#" className="hover:text-[#ffb423] transition-colors">Security Hub</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * REUSABLE NAVIGATION LINK
 */
function FooterNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="hover:text-[#7ed957] transition-all duration-300 flex items-center group">
      <span className="w-0 group-hover:w-2 h-[1px] bg-[#7ed957] mr-0 group-hover:mr-2 transition-all opacity-0 group-hover:opacity-100" />
      {children}
    </Link>
  );
}

/**
 * ENHANCED SOCIAL LINK COMPONENT
 * Features dynamic hover coloring based on the brand's primary hex.
 */
function SocialLink({ href, icon, label, hoverColor }: { href: string; icon: any; label: string; hoverColor: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-gray-400 transition-all duration-300 cursor-pointer group shadow-lg"
      style={{ 
        borderColor: isHovered ? `${hoverColor}55` : "rgba(255,255,255,0.1)",
        color: isHovered ? hoverColor : "rgba(156, 163, 175, 1)",
        backgroundColor: isHovered ? `${hoverColor}11` : "rgba(255,255,255,0.05)",
        boxShadow: isHovered ? `0 0 15px ${hoverColor}22` : "none"
      }}
    >
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
    </a>
  );
}