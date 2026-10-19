import React from 'react';
import {
  Compass,
  BookOpen,
  Award,
  Sparkles,
  BarChart3,
  Sliders,
  Terminal,
  Cpu,
  PanelLeftClose,
  PanelLeftOpen,
  User,
  Flame,
  ChevronRight,
  ChevronLeft,
  LogOut
} from 'lucide-react';
import { LearnerProfile, PRISnapshot } from '../types';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  learner: LearnerProfile | null;
  pri: PRISnapshot;
  onOpenProfile: () => void;
  onLogout: () => void;
  onLogOffAndReset?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  isCollapsed,
  setIsCollapsed,
  learner,
  pri,
  onOpenProfile,
  onLogOffAndReset,
}) => {
  const navSections = [
    {
      title: 'CORE WORKSPACES',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: Compass,
          badge: null,
          description: 'Overview & Learning Path',
        },
        {
          id: 'assessment',
          label: '100 Daily MCQs',
          icon: BookOpen,
          badge: '100 Qs',
          description: 'Aptitude, DSA & Logic',
        },
        {
          id: 'examples',
          label: '50 Solved Cases',
          icon: Cpu,
          badge: '50 Cases',
          description: '8-Point Case Studies',
        },
        {
          id: 'ide',
          label: 'IDE & Coding',
          icon: Terminal,
          badge: 'C · C++ · Java · Py',
          description: 'Multi-Language IDE',
        },
        {
          id: 'visualizer',
          label: 'Logic Studio',
          icon: Sparkles,
          badge: '8 Labs',
          description: 'DSA Visualizers',
        },
      ],
    },
    {
      title: 'PLACEMENT READINESS',
      items: [
        {
          id: 'wheel',
          label: 'Daily Bonus Wheel',
          icon: Award,
          badge: 'Streak',
          description: 'Streak & Token Rewards',
        },
        {
          id: 'intelligence',
          label: 'Readiness Index',
          icon: BarChart3,
          badge: `${pri.overallScore}/100`,
          description: '6-Vector Evidence PRI',
        },
        {
          id: 'admin',
          label: 'Admin & Bank',
          icon: Sliders,
          badge: 'Manage',
          description: 'Question Bank & Config',
        },
      ],
    },
  ];

  return (
    <aside
      className={`sticky top-0 h-screen bg-white border-r border-slate-200 flex flex-col justify-between transition-all duration-300 z-30 shrink-0 select-none shadow-xs ${
        isCollapsed ? 'w-20' : 'w-64 lg:w-72'
      }`}
    >
      {/* Top Header Section */}
      <div className="flex flex-col min-h-0 flex-1">
        {/* Brand & Expand/Collapse Toggle */}
        <div className="h-16 border-b border-slate-200 px-3.5 flex items-center justify-between bg-white shrink-0">
          {!isCollapsed ? (
            <div
              onClick={() => setCurrentTab('dashboard')}
              className="flex items-center gap-2.5 cursor-pointer group min-w-0"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-900 to-blue-950 flex items-center justify-center text-white font-mono font-bold text-sm shadow-xs border border-blue-900 shrink-0">
                <span className="text-red-500 font-extrabold mr-0.5">D</span>
                <span className="text-blue-100">Q</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm tracking-tight text-blue-950">
                    DSAPTIQ
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-red-50 text-red-600 border border-red-200 font-bold shrink-0">
                    FORTUNE 500
                  </span>
                </div>
                <span className="text-[10px] font-medium text-blue-800 tracking-wider truncate">
                  Placement Suite
                </span>
              </div>
            </div>
          ) : (
            <div
              onClick={() => setCurrentTab('dashboard')}
              className="w-9 h-9 mx-auto rounded-xl bg-gradient-to-br from-blue-900 to-blue-950 flex items-center justify-center text-white font-mono font-bold text-xs shadow-xs cursor-pointer border border-blue-900"
              title="DSAPTIQ - Kapil Presents DRAPTI"
            >
              <span className="text-red-500 font-extrabold mr-0.5">D</span>
              <span className="text-blue-100">Q</span>
            </div>
          )}

          {/* Collapse/Expand Toggle Button at Top */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg text-blue-900 hover:text-blue-950 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition-all cursor-pointer shrink-0 ml-1"
            title={isCollapsed ? 'Expand Navigation Sidebar' : 'Collapse Navigation Sidebar'}
            aria-label={isCollapsed ? 'Expand Navigation Sidebar' : 'Collapse Navigation Sidebar'}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-4 h-4 text-blue-900" />
            ) : (
              <PanelLeftClose className="w-4 h-4 text-blue-900" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="py-3 px-2.5 space-y-5 overflow-y-auto flex-1">
          {navSections.map((sec, secIdx) => (
            <div key={secIdx} className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 text-[10px] font-bold font-mono text-blue-800 uppercase tracking-wider mb-1.5">
                  {sec.title}
                </div>
              )}

              <div className="space-y-0.5">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentTab(item.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer group ${
                        isActive
                          ? 'bg-blue-50 text-blue-950 font-bold border-l-4 border-red-600 shadow-2xs'
                          : 'text-blue-900 hover:text-blue-950 hover:bg-blue-50/60 font-medium'
                      } ${isCollapsed ? 'justify-center px-0' : ''}`}
                      title={isCollapsed ? `${item.label} (${item.description})` : undefined}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                          isActive
                            ? 'text-red-600'
                            : 'text-blue-800 group-hover:text-blue-950'
                        }`}
                      />

                      {!isCollapsed && (
                        <div className="flex-1 min-w-0 flex items-center justify-between">
                          <div className="truncate">
                            <span className="text-xs tracking-tight block truncate text-blue-950 font-semibold">
                              {item.label}
                            </span>
                          </div>

                          {item.badge && (
                            <span
                              className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 ml-1.5 ${
                                isActive
                                  ? 'bg-red-600 text-white shadow-2xs'
                                  : 'bg-red-50 text-red-600 border border-red-200'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Profile & Institutional Footer */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/70 shrink-0">
        {!isCollapsed ? (
          <div className="space-y-2.5">
            {/* Learner Profile Card */}
            {learner ? (
              <div
                onClick={onOpenProfile}
                className="p-2.5 rounded-xl bg-white border border-blue-100 hover:border-blue-300 shadow-2xs cursor-pointer transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-blue-900 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                      {learner.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-blue-950 truncate group-hover:text-blue-800">
                        {learner.name}
                      </div>
                      <div className="text-[10px] text-blue-800 truncate">
                        {learner.target}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200 shrink-0">
                    {pri.overallScore}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-slate-100 text-blue-900">
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-red-600 fill-red-600" />
                    <span>{learner.streakCount || 1}d Streak</span>
                  </span>
                  <span className="text-blue-900 hover:text-red-600 font-semibold">
                    Manage →
                  </span>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setCurrentTab('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-2 px-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-white" />
                <span>Begin Assessment</span>
              </button>
            )}

            {/* Log Off & Reset Session Option */}
            {onLogOffAndReset && (
              <button
                onClick={onLogOffAndReset}
                className="w-full py-1.5 px-2.5 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 flex items-center justify-center gap-1.5 text-[11px] font-mono font-bold transition-all cursor-pointer"
                title="Log Off & Reset Active Session"
              >
                <LogOut className="w-3.5 h-3.5 text-red-600" />
                <span>Log Off & Reset Session</span>
              </button>
            )}

            {/* Bottom Collapse Toggle Button */}
            <button
              onClick={() => setIsCollapsed(true)}
              className="w-full py-1.5 px-2.5 rounded-lg text-blue-900 hover:text-blue-950 hover:bg-blue-50/80 border border-blue-100 flex items-center justify-center gap-1.5 text-[11px] font-medium transition-all cursor-pointer"
              title="Collapse Sidebar"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-blue-900" />
              <span>Collapse Sidebar</span>
            </button>

            {/* Micro Institutional Tag */}
            <div className="text-[9px] font-mono text-center text-blue-800 leading-tight">
              <span>SARLAYASH · KAPIL PRESENTS</span>
              <span className="block text-red-600 font-semibold mt-0.5">
                Fortune 500 Standard
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            {learner ? (
              <button
                onClick={onOpenProfile}
                className="w-9 h-9 rounded-xl bg-blue-900 text-white font-bold text-xs flex items-center justify-center shadow-2xs cursor-pointer hover:bg-blue-800"
                title={`${learner.name} - PRI: ${pri.overallScore}/100`}
              >
                {learner.name.charAt(0).toUpperCase()}
              </button>
            ) : (
              <button
                onClick={() => setCurrentTab('dashboard')}
                className="w-9 h-9 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-2xs cursor-pointer"
                title="Begin Assessment"
              >
                <User className="w-3.5 h-3.5 text-white" />
              </button>
            )}

            {onLogOffAndReset && (
              <button
                onClick={onLogOffAndReset}
                className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center border border-red-200 shadow-2xs cursor-pointer transition-colors"
                title="Log Off & Reset Active Session"
              >
                <LogOut className="w-3.5 h-3.5 text-red-600" />
              </button>
            )}

            {/* Bottom Expand Button when collapsed */}
            <button
              onClick={() => setIsCollapsed(false)}
              className="p-1.5 rounded-lg text-blue-900 hover:text-blue-950 hover:bg-blue-50 border border-blue-100 transition-all cursor-pointer"
              title="Expand Sidebar"
              aria-label="Expand Sidebar"
            >
              <ChevronRight className="w-4 h-4 text-blue-900" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
