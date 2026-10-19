import React, { useState } from 'react';
import {
  Globe,
  PanelLeftClose,
  PanelLeftOpen,
  Flame,
  Terminal,
  Sparkles,
  BookOpen,
  Cpu,
  LogOut,
  Award
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
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  onLogOffAndReset?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  learner,
  pri,
  onOpenProfile,
  isSidebarCollapsed,
  onToggleSidebar,
  onLogOffAndReset,
}) => {
  const [showTimeZones, setShowTimeZones] = useState<boolean>(true);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs select-none">
      {/* Top Fortune 500 Executive Strip */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 px-4 py-1.5 text-xs text-blue-100 flex flex-wrap items-center justify-between gap-2 border-b border-blue-950">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-mono font-extrabold tracking-wider uppercase shadow-2xs">
            KAPIL PRESENTS
          </span>
          <span className="font-extrabold tracking-wide text-white">DSAPTIQ</span>
          <span className="text-blue-300 hidden sm:inline">•</span>
          <span className="text-blue-200 hidden sm:inline font-medium">
            Daily Readiness Assessment & Placement Training Index
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <button
            onClick={() => setShowTimeZones(!showTimeZones)}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono bg-blue-900 hover:bg-blue-800 text-white border border-blue-700 transition-colors cursor-pointer"
            title="Toggle live international placement time zones (USA, UK, India, Singapore)"
          >
            <Globe className="w-3 h-3 text-red-400" />
            <span className="font-semibold">
              {showTimeZones ? 'Hide Time Zones' : 'Show Time Zones (USA · UK · IND · SGP)'}
            </span>
          </button>
          <span className="text-blue-300 hidden md:inline">Powered by</span>
          <span className="text-white font-bold tracking-wide hidden md:inline">
            SARLAYASH Mission
          </span>
          <span className="hidden lg:inline px-2 py-0.5 rounded bg-blue-950 text-[10px] font-mono text-red-400 border border-blue-800 font-bold">
            100% Industry Standard
          </span>
        </div>
      </div>

      {/* Real-Time World Time Zones Bar */}
      {showTimeZones && <TimeZonesBar />}

      {/* Main Header Bar */}
      <div className="px-4 sm:px-6 h-16 flex items-center justify-between gap-3 bg-white">
        {/* Left Side: Sidebar Expand/Collapse Toggle & Brand Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-blue-950 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all cursor-pointer shadow-2xs group"
            title={isSidebarCollapsed ? 'Expand Navigation Sidebar' : 'Collapse Navigation Sidebar'}
            aria-label="Toggle Navigation Sidebar"
          >
            {isSidebarCollapsed ? (
              <>
                <PanelLeftOpen className="w-4 h-4 text-blue-900 group-hover:text-red-600 transition-colors" />
                <span className="text-[11px] font-mono font-bold text-blue-900 hidden sm:inline">
                  Expand
                </span>
              </>
            ) : (
              <>
                <PanelLeftClose className="w-4 h-4 text-blue-900 group-hover:text-red-600 transition-colors" />
                <span className="text-[11px] font-mono font-bold text-blue-900 hidden sm:inline">
                  Collapse
                </span>
              </>
            )}
          </button>

          <div
            onClick={() => setCurrentTab('dashboard')}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-blue-950 leading-none">
                DSAPTIQ
              </span>
              <span className="text-[9px] font-bold text-red-600 tracking-wider uppercase mt-0.5">
                Fortune 500 Executive Suite
              </span>
            </div>
          </div>
        </div>

        {/* Center / Right: Quick Navigation Actions & PRI Metrics */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Module Launchers */}
          <div className="hidden lg:flex items-center gap-1 border-r border-slate-200 pr-3">
            <button
              onClick={() => setCurrentTab('assessment')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentTab === 'assessment'
                  ? 'bg-blue-900 text-white font-bold shadow-2xs'
                  : 'text-blue-900 hover:bg-blue-50 hover:text-blue-950'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-800" />
              <span>100 MCQs</span>
            </button>
            <button
              onClick={() => setCurrentTab('examples')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentTab === 'examples'
                  ? 'bg-blue-900 text-white font-bold shadow-2xs'
                  : 'text-blue-900 hover:bg-blue-50 hover:text-blue-950'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-blue-800" />
              <span>50 Cases</span>
            </button>
            <button
              onClick={() => setCurrentTab('ide')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentTab === 'ide'
                  ? 'bg-blue-900 text-white font-bold shadow-2xs'
                  : 'text-blue-900 hover:bg-blue-50 hover:text-blue-950'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-red-600" />
              <span className="text-red-700 font-bold">IDE</span>
            </button>
            <button
              onClick={() => setCurrentTab('visualizer')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentTab === 'visualizer'
                  ? 'bg-blue-900 text-white font-bold shadow-2xs'
                  : 'text-blue-900 hover:bg-blue-50 hover:text-blue-950'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-800" />
              <span>Visualizer</span>
            </button>
            <button
              onClick={() => setCurrentTab('levels')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentTab === 'levels'
                  ? 'bg-blue-900 text-white font-bold shadow-2xs'
                  : 'text-blue-900 hover:bg-blue-50 hover:text-blue-950'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-red-600" />
              <span className="text-red-700 font-bold">30 Levels & Certs</span>
            </button>
          </div>

          {/* PRI Score Metric Pill */}
          <div
            onClick={() => setCurrentTab('intelligence')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 hover:border-blue-400 cursor-pointer transition-all shadow-2xs"
            title="View Real-Time Placement Readiness Index"
          >
            <div className="text-[10px] font-mono font-bold text-blue-900 uppercase">
              PRI
            </div>
            <div className="h-4 w-px bg-blue-200" />
            <div className="text-sm font-extrabold font-mono text-red-600">
              {pri.overallScore}
              <span className="text-[10px] text-blue-900 font-normal">/100</span>
            </div>
          </div>

          {/* Streak Indicator */}
          {learner && (
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-mono font-bold">
              <Flame className="w-3.5 h-3.5 fill-red-600 text-red-600" />
              <span>{learner.streakCount || 1}d</span>
            </div>
          )}

          {/* Learner Profile Pill / Quick Onboarding */}
          {learner ? (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-white border border-slate-200 hover:border-blue-300 transition-all cursor-pointer shadow-2xs group"
              title="Manage Profile & Settings"
            >
              <div className="w-7 h-7 rounded-full bg-blue-950 text-white font-extrabold text-xs flex items-center justify-center">
                {learner.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-bold text-blue-950 max-w-[100px] truncate hidden sm:inline">
                {learner.name}
              </span>
            </button>
          ) : (
            <button
              onClick={() => {
                setCurrentTab('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3.5 py-1.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Begin Journey
            </button>
          )}

          {/* Dedicated Log Off & Reset Session Button */}
          {onLogOffAndReset && (
            <button
              onClick={onLogOffAndReset}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 hover:text-red-700 transition-all cursor-pointer shadow-2xs group"
              title="Log Off & Reset Active Session"
              aria-label="Log Off and Reset Session"
            >
              <LogOut className="w-3.5 h-3.5 text-red-600 group-hover:rotate-12 transition-transform" />
              <span className="text-xs font-mono font-bold hidden md:inline">
                Log Off & Reset
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
