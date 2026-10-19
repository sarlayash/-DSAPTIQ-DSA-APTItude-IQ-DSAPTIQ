import React from 'react';
import {
  Compass,
  BookOpen,
  Cpu,
  Sparkles,
  BarChart3,
  Award,
  Terminal,
  ShieldCheck,
  Globe,
  Sliders,
  ExternalLink,
  Download,
  Github
} from 'lucide-react';

interface FooterProps {
  onNavigate?: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (tab: string) => {
    if (onNavigate) {
      onNavigate(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-slate-200 bg-white print:hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand & Manifesto Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-950 flex items-center justify-center font-mono font-bold text-white text-sm shadow-xs border border-blue-900">
                <span className="text-red-500 font-extrabold mr-0.5">D</span>
                <span className="text-blue-100">Q</span>
              </div>
              <span className="font-extrabold text-2xl text-blue-950 tracking-tight">
                DSAPTIQ
              </span>
              <span className="text-[10px] font-mono text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded font-extrabold">
                ENTERPRISE
              </span>
            </div>

            <div className="text-xs font-mono space-y-0.5">
              <div className="text-blue-950 font-extrabold">
                KAPIL PRESENTS DRAPTI / DSAPTIQ
              </div>
              <div className="text-blue-900 font-semibold">
                DSA + APTItude + IQ = DSAPTIQ Platform
              </div>
              <div className="text-red-600 font-bold">
                Powered by SARLAYASH Mission · Institutional Standards
              </div>
            </div>

            <p className="text-xs text-blue-900/80 leading-relaxed max-w-sm">
              The premier Fortune 500 placement intelligence and algorithmic reasoning platform. Master 100 daily industry benchmark MCQs, 50 comprehensive case solutions, multi-language C/C++/Java/Python IDE runtime simulations, and 8 visualizer laboratories.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-red-600 font-semibold">
              <ShieldCheck className="w-4 h-4 text-red-600" />
              <span>100% Free Public Access · Zero Passwords Required</span>
            </div>
          </div>

          {/* Column 2: Platform Workspaces */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold text-blue-950 uppercase tracking-wider border-b border-slate-100 pb-1.5">
              Workspaces
            </div>
            <ul className="space-y-2 text-xs text-blue-900/80">
              <li>
                <button
                  onClick={() => handleNav('dashboard')}
                  className="hover:text-blue-950 hover:underline transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Compass className="w-3.5 h-3.5 text-blue-800" />
                  <span>Learner Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('assessment')}
                  className="hover:text-blue-950 hover:underline transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <BookOpen className="w-3.5 h-3.5 text-blue-800" />
                  <span>100 Daily MCQs</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('examples')}
                  className="hover:text-blue-950 hover:underline transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Cpu className="w-3.5 h-3.5 text-blue-800" />
                  <span>50 Solved Case Studies</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('ide')}
                  className="hover:text-blue-950 hover:underline transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Terminal className="w-3.5 h-3.5 text-red-600" />
                  <span className="font-bold text-red-600">Multi-Language IDE</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('visualizer')}
                  className="hover:text-blue-950 hover:underline transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-800" />
                  <span>8 Visualizer Studios</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Placement Matrix */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold text-blue-950 uppercase tracking-wider border-b border-slate-100 pb-1.5">
              Readiness & AI
            </div>
            <ul className="space-y-2 text-xs text-blue-900/80">
              <li>
                <button
                  onClick={() => handleNav('intelligence')}
                  className="hover:text-blue-950 hover:underline transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-blue-800" />
                  <span>PRI Matrix Calculator</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('wheel')}
                  className="hover:text-blue-950 hover:underline transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Award className="w-3.5 h-3.5 text-red-600" />
                  <span>Daily Streak Wheel</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('admin')}
                  className="hover:text-blue-950 hover:underline transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Sliders className="w-3.5 h-3.5 text-blue-800" />
                  <span>Admin & Question Bank</span>
                </button>
              </li>
              <li>
                <span className="text-blue-800 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  <span>Anonymous Local Storage</span>
                </span>
              </li>
              <li>
                <span className="text-blue-800 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-900" />
                  <span>Transferable Access Tokens</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Institutional Resources & GitHub */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold text-blue-950 uppercase tracking-wider border-b border-slate-100 pb-1.5">
              Resources & Deployment
            </div>
            <ul className="space-y-2 text-xs text-blue-900/80">
              <li>
                <a
                  href="https://github.com/sarlayash/-DSAPTIQ-DSA-APTItude-IQ-DSAPTIQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-950 hover:underline transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5 text-blue-950" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-red-600" />
                </a>
              </li>
              <li>
                <a
                  href="https://sarlayash.github.io/-DSAPTIQ-DSA-APTItude-IQ-DSAPTIQ/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-950 hover:underline transition-colors flex items-center gap-1.5 font-bold text-red-600"
                >
                  <Globe className="w-3.5 h-3.5 text-red-600" />
                  <span>Live GitHub Pages</span>
                  <ExternalLink className="w-3 h-3 text-red-600" />
                </a>
              </li>
              <li>
                <a
                  href="./DSAPTIQ-web-ready.zip"
                  download="DSAPTIQ-web-ready.zip"
                  className="hover:text-blue-950 hover:underline transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-blue-800" />
                  <span>Download Web Bundle (.ZIP)</span>
                </a>
              </li>
              <li>
                <a
                  href="./DSAPTIQ-source.zip"
                  download="DSAPTIQ-source.zip"
                  className="hover:text-blue-950 hover:underline transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-blue-800" />
                  <span>Download Full Source (.ZIP)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Recruitment Zones Summary Banner */}
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-950" />
            <span className="font-extrabold text-blue-950">
              INTERNATIONAL HIRING ZONES:
            </span>
            <span className="text-blue-900 hidden sm:inline">
              USA (EDT & PDT) · UK (GMT/BST) · India (IST) · Singapore (SGT)
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span className="px-2 py-0.5 rounded bg-white text-blue-950 font-bold border border-blue-200 shadow-2xs">
              FAANG & Fortune 500 Standard
            </span>
            <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold shadow-2xs">
              Live Recruitment Active
            </span>
          </div>
        </div>

        {/* Bottom Copyright & Accreditation Strip */}
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-blue-900/80">
          <div>
            © {new Date().getFullYear()}{' '}
            <span className="font-bold text-blue-950">DSAPTIQ</span> · Kapil Presents DRAPTI.
            All rights reserved.
          </div>

          <div className="flex items-center gap-2">
            <span>Powered by</span>
            <span className="font-extrabold text-red-600">
              SARLAYASH Mission
            </span>
            <span>·</span>
            <span className="text-blue-950 font-semibold">
              Logic. Visualize. Understand.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
