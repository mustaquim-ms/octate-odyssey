"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Info, Target, Lightbulb, Activity } from "lucide-react";

export default function LessonContent({ content }: { content: string }) {
  return (
    <div className="space-y-10 font-[family-name:var(--font-mono)]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Style Headers
          h3: ({ children }) => (
            <div className="flex items-center gap-3 mt-12 mb-6 group">
              <div className="w-2 h-8 bg-[#ffb423] rounded-full group-hover:shadow-[0_0_15px_#ffb423] transition-all" />
              <h3 className="text-2xl font-[family-name:var(--font-outfit)] font-black uppercase tracking-tighter text-white">
                {children}
              </h3>
            </div>
          ),
          // Style Paragraphs
          p: ({ children }) => (
            <p className="text-gray-400 leading-relaxed text-lg mb-4">{children}</p>
          ),
          // Style Lists
          ul: ({ children }) => (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">{children}</ul>
          ),
          li: ({ children }) => (
            <li className="bg-white/[0.03] border border-white/5 p-4 rounded-xl flex items-center gap-3 text-[#7ed957] font-bold text-sm uppercase tracking-tight">
              <div className="w-1.5 h-1.5 rounded-full bg-[#7ed957] animate-pulse" />
              {children}
            </li>
          ),
          // Style Bold text as highlight
          strong: ({ children }) => (
            <span className="text-[#ffb423] font-black">{children}</span>
          ),
          // Create special "Callout" boxes for Analogy or Learning Outcomes
          blockquote: ({ children }) => {
            const isAnalogy = JSON.stringify(children).includes("Analogy");
            return (
              <div className={`my-10 p-8 rounded-3xl border-2 backdrop-blur-sm relative overflow-hidden ${
                isAnalogy ? "border-[#ffb423]/20 bg-[#ffb423]/5" : "border-[#7ed957]/20 bg-[#7ed957]/5"
              }`}>
                <div className="absolute top-4 right-6 opacity-10">
                   {isAnalogy ? <Lightbulb size={80} /> : <Target size={80} />}
                </div>
                <div className="relative z-10">{children}</div>
              </div>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}