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
  Sliders
} from 'lucide-react';
import { TimeZonesBar } from './TimeZonesBar';

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
    <footer className="border-t border-[#23262d] bg-[#0c0e12] print:hidden">
      {/* Real-time World Time Zones Bar */}
      <TimeZonesBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand Column (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-200 via-slate-400 to-slate-600 p-[1px]">
                <div className="w-full h-full bg-[#08090B] rounded-[7px] flex items-center justify-center font-mono font-bold text-slate-100 text-xs">
                  DQ
                </div>
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                DSAPTIQ
              </span>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-1.5 py-0.5 rounded">
                v2.6 LIVE
              </span>
            </div>

            <div className="text-xs text-slate-300 font-mono">
              <span className="text-white font-bold">KAPIL PRESENTS DSAPTIQ</span>
              <div className="text-slate-400">DSA + APTItude + IQ = DSAPTIQ</div>
              <div className="text-cyan-400">Powered by SARLAYASH Mission</div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The premier explainable placement intelligence platform. Master 100 daily benchmark MCQs, 50 step-by-step solutions, live C/C++/Java/Python IDE execution, and track your true Placement Readiness Index (PRI).
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Free Public Access · Zero Passwords Required</span>
            </div>
          </div>

          {/* Column 2: Platform Modules */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
              Core Modules
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => handleNav('dashboard')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-slate-400" />
                  <span>Learner Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('assessment')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span>100 Daily MCQs</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('examples')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Cpu className="w-3.5 h-3.5 text-slate-400" />
                  <span>50 Solved Challenges</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('ide')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-cyan-300 font-medium"
                >
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Programming IDE (C/C++/Java/Py)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('visualizer')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                  <span>Visual Logic Studio</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('intelligence')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Readiness Index (PRI)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Placement Tracks */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
              Placement Tracks
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• Campus Recruitment Drives</li>
              <li>• TCS Digital & TCS Prime</li>
              <li>• Infosys DSE & Specialist</li>
              <li>• Cognizant GenC & GenC Next</li>
              <li>• Amazon & Google SDE-1</li>
              <li>• Microsoft Core Software Track</li>
              <li>• Accenture Advanced Technical</li>
            </ul>
          </div>

          {/* Column 4: Global Clocks & Admin */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
              Global Support
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>USA: New York & SF</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>UK: London (BST/GMT)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>India: New Delhi / Blr (IST)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>Singapore: SGT (APAC Hub)</span>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => handleNav('admin')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 font-mono text-[11px] text-slate-400"
                >
                  <Sliders className="w-3.5 h-3.5 text-slate-400" />
                  <span>Admin & Question Bank</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 border-t border-[#23262d] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span className="font-mono text-slate-200 font-bold uppercase tracking-wider">
              KAPIL PRESENTS DSAPTIQ
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span>DSA + APTItude + IQ = DSAPTIQ</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-200 font-medium">Powered by SARLAYASH Mission</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
            <span>© 2026 DSAPTIQ</span>
            <span>•</span>
            <span>All Rights Reserved</span>
            <span>•</span>
            <span className="text-emerald-400">100% Free Public Tier</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
