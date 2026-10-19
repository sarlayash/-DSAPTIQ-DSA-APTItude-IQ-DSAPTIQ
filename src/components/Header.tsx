import React from 'react';
import {
  Compass,
  BookOpen,
  Award,
  Sparkles,
  BarChart3,
  Sliders,
  Flame,
  Shield,
  Copy,
  Check,
  User,
  LogOut,
  Cpu,
  Terminal,
  Globe
} from 'lucide-react';
import { LearnerProfile, PRISnapshot } from '../types';
import { TimeZonesBar } from './TimeZonesBar';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  learner: LearnerProfile | null;
  pri: PRISnapshot;
  onLogout: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  learner,
  pri,
  onLogout,
  onOpenProfile,
}) => {
  const [copied, setCopied] = React.useState(false);

  const copyAccessCode = () => {
    if (!learner) return;
    navigator.clipboard.writeText(learner.accessCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [showTimeZones, setShowTimeZones] = React.useState(true);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'assessment', label: '100 Daily MCQs', icon: BookOpen, badge: 'Daily' },
    { id: 'examples', label: '50 Solved Examples', icon: Cpu, badge: '50' },
    { id: 'ide', label: 'IDE & Coding', icon: Terminal, badge: 'C/C++/Py' },
    { id: 'visualizer', label: 'Logic Studio', icon: Sparkles },
    { id: 'wheel', label: 'Daily Wheel', icon: Award },
    { id: 'intelligence', label: 'Readiness Index', icon: BarChart3 },
    { id: 'admin', label: 'Admin & Bank', icon: Sliders },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#08090B]/95 backdrop-blur-md border-b border-[#2d3036]">
      {/* Top Endorsement Bar */}
      <div className="bg-gradient-to-r from-[#0d0f13] via-[#17191d] to-[#0d0f13] border-b border-[#23262d] px-4 py-1.5 text-xs text-[#BFC2C9] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono tracking-widest text-[#F2F3F5] uppercase border border-slate-700">
            KAPIL PRESENTS
          </span>
          <span className="font-semibold text-slate-300">DSAPTIQ</span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">DSA + APTItude + IQ = DSAPTIQ</span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <button
            onClick={() => setShowTimeZones(!showTimeZones)}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            title="Toggle live international placement time zones"
          >
            <Globe className="w-3 h-3 text-cyan-400" />
            <span>Time Zones (USA · UK · IND · SGP)</span>
          </button>
          <span className="text-slate-400 hidden sm:inline">Powered by</span>
          <span className="text-[#F2F3F5] font-semibold tracking-wide bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent hidden sm:inline">
            SARLAYASH Mission
          </span>
          <span className="hidden md:inline px-2 py-0.5 rounded-full bg-slate-800/80 text-[10px] text-slate-300 border border-slate-700">
            100% Industry-Oriented
          </span>
        </div>
      </div>

      {/* Real-time World Time Zones Bar */}
      {showTimeZones && <TimeZonesBar />}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 gap-4">
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => setCurrentTab('dashboard')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-slate-200 via-slate-400 to-slate-600 p-[1px] shadow-sm">
            <div className="w-full h-full bg-[#08090B] rounded-[7px] flex items-center justify-center font-mono font-bold text-slate-100 text-xs tracking-wider">
              DQ
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-[#F2F3F5] group-hover:text-white transition-colors">
                DSAPTIQ
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800/60 px-1.5 py-0.5 rounded border border-slate-700/60">
                v2.6
              </span>
            </div>
            <p className="text-[11px] text-[#BFC2C9] hidden sm:block tracking-wide">
              DSA + APTITUDE + IQ · LOGIC · VISUALIZE · UNDERSTAND
            </p>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#121418] p-1 rounded-xl border border-[#2d3036]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-slate-200 text-slate-900 font-semibold shadow-sm'
                    : 'text-[#BFC2C9] hover:text-[#F2F3F5] hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-900' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                      isActive
                        ? 'bg-slate-900/20 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Learner Info & PRI Quick Badge */}
        {learner ? (
          <div className="flex items-center gap-2">
            {/* PRI Mini Score */}
            <div 
              onClick={() => setCurrentTab('intelligence')}
              className="cursor-pointer flex items-center gap-2 bg-[#17191D] hover:bg-[#1d2127] border border-[#2d3036] px-2.5 py-1.5 rounded-lg transition-colors"
              title="Placement Readiness Index (Click for full analysis)"
            >
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">PRI SCORE</div>
                <div className="text-sm font-bold font-mono text-[#F2F3F5] leading-none">
                  {pri.overallScore}<span className="text-xs text-slate-500 font-normal">/100</span>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                <span className={`text-xs font-bold font-mono ${
                  pri.overallScore >= 75 ? 'text-emerald-400' : pri.overallScore >= 50 ? 'text-slate-200' : 'text-amber-400'
                }`}>
                  {pri.overallScore}
                </span>
              </div>
            </div>

            {/* Streak & Protection */}
            <div className="hidden sm:flex items-center gap-1.5 bg-[#17191D] border border-[#2d3036] px-2 py-1.5 rounded-lg text-xs">
              <span className="flex items-center text-amber-400 font-mono font-medium gap-1" title="Daily Learning Streak">
                <Flame className="w-3.5 h-3.5 fill-amber-500/30 text-amber-400" />
                {learner.streakCount}d
              </span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center text-cyan-400 font-mono gap-1" title="Streak Protection Tokens">
                <Shield className="w-3 h-3 text-cyan-400" />
                {learner.streakProtectionTokens}
              </span>
            </div>

            {/* Profile Avatar / Menu */}
            <div className="flex items-center gap-1">
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-2 bg-[#17191D] hover:bg-[#21242b] border border-[#2d3036] px-2.5 py-1.5 rounded-lg text-xs text-[#F2F3F5] transition-colors"
                title="Learner Profile & Access Code"
              >
                <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-200">
                  {learner.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[80px] sm:max-w-[110px] truncate font-medium">
                  {learner.name}
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCurrentTab('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-white text-slate-900 font-medium text-xs transition-colors"
            >
              Begin Journey
            </button>
          </div>
        )}
      </div>

      {/* Mobile Secondary Sub-Nav Bar */}
      <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 bg-[#121418] border-t border-[#23262d] gap-1 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`shrink-0 px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 ${
                isActive
                  ? 'bg-slate-200 text-slate-950 font-semibold'
                  : 'text-[#BFC2C9] hover:bg-slate-800/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
