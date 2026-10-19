import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  Sparkles,
  BookOpen,
  Compass,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Award,
  KeyRound,
  RotateCcw
} from 'lucide-react';
import { LearningLevel, TargetGoal, LearnerProfile } from '../types';
import heroBannerImg from '../assets/images/landing_hero_banner_1792318807606.jpg';

interface LandingViewProps {
  onStart: (name: string, level: LearningLevel, target: TargetGoal) => void;
  onRestoreByCode: (code: string) => boolean;
  savedProfile: LearnerProfile | null;
  onResumeSaved: () => void;
  onSeedDemo: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onStart,
  onRestoreByCode,
  savedProfile,
  onResumeSaved,
  onSeedDemo,
}) => {
  const [name, setName] = useState('');
  const [level, setLevel] = useState<LearningLevel>('Intermediate');
  const [target, setTarget] = useState<TargetGoal>('Campus Placement');
  const [showAccessCodeModal, setShowAccessCodeModal] = useState(false);
  const [accessCodeInput, setAccessCodeInput] = useState('');
  const [codeError, setCodeError] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setValidationError('Please enter your full name or preferred identifier to proceed.');
      return;
    }
    setValidationError('');
    onStart(name.trim(), level, target);
  };

  const handleRestoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCodeInput.trim()) {
      setCodeError('Enter a valid access token (e.g. DSAPTIQ-9PRO-2026)');
      return;
    }
    const success = onRestoreByCode(accessCodeInput.trim());
    if (!success) {
      setCodeError('No records found with this token. Check format or start a new profile.');
    } else {
      setShowAccessCodeModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-blue-950 selection:bg-blue-900 selection:text-white select-none">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-10 pb-16 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Brand Endorsement Badge */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-6 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-200 text-xs shadow-2xs">
              <span className="font-mono text-[10px] text-red-600 font-extrabold uppercase tracking-widest">
                KAPIL PRESENTS
              </span>
              <span className="w-1 h-1 rounded-full bg-blue-300" />
              <span className="font-extrabold text-blue-950">DSAPTIQ</span>
              <span className="w-1 h-1 rounded-full bg-blue-300" />
              <span className="text-blue-900 font-medium">
                Powered by <strong className="text-red-600 font-extrabold">SARLAYASH Mission</strong>
              </span>
            </div>
          </div>

          {/* Hero Typography */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-blue-900 mb-2 shadow-2xs">
              <span>DSA + APTItude + IQ = DSAPTIQ</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-blue-950 leading-tight">
              Fortune 500 Placement Ready. <br className="hidden sm:inline" />
              <span className="text-red-600">
                Driven by Pure Algorithmic Logic.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-blue-900/80 max-w-2xl mx-auto font-normal leading-relaxed">
              Not just another quiz site. DSAPTIQ is an institutional-grade placement intelligence platform: step through 8 visualizer laboratories, master 50 solved case studies, solve 100 daily MCQs, and calibrate your evidence-backed <strong className="text-blue-950 font-bold">Placement Readiness Index (PRI)</strong>.
            </p>
          </div>

          {/* Hero Showcase Graphic Banner */}
          <div className="mt-8 mb-10 max-w-4xl mx-auto">
            <div className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-lg transition-all hover:border-blue-400">
              {/* HUD Header Bar */}
              <div className="px-4 py-2.5 bg-blue-950 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white inline-block" />
                  <span className="ml-2 text-xs font-mono text-white font-bold tracking-wide">
                    DSAPTIQ :: Neural Logic, Algorithms &amp; Placement Intelligence Studio
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-blue-900 text-blue-200 border border-blue-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    DSA + APTI + IQ
                  </span>
                  <span className="text-[10px] font-mono text-blue-200 font-bold">CORP v2.6</span>
                </div>
              </div>

              {/* Graphic Frame */}
              <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
                <img
                  src={heroBannerImg}
                  alt="Kapil Presents DSAPTIQ - Data Structures, Algorithms, Aptitude and IQ Placement Intelligence"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.01]"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Badges Overlay */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-blue-950/90 text-xs font-bold text-white shadow flex items-center gap-1.5 border border-blue-800">
                      <span className="text-red-400 font-extrabold">100</span> Daily MCQs
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-blue-950/90 text-xs font-bold text-white shadow flex items-center gap-1.5 border border-blue-800">
                      <span className="text-blue-300 font-extrabold">50</span> Solved Case Studies
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-blue-950/90 text-xs font-mono font-bold text-white shadow flex items-center gap-1.5 border border-blue-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      IDE: C · C++ · Java · Python
                    </span>
                    <span className="hidden sm:inline-flex px-3 py-1 rounded-lg bg-blue-950/90 text-xs font-bold text-white shadow items-center gap-1.5 border border-blue-800">
                      8 Visualizer Labs
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-white text-xs font-mono font-extrabold text-blue-950 shadow border border-slate-200">
                      PRI Matrix: <span className="text-red-600 font-extrabold">0–100 Benchmark</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Onboarding Form Container */}
          <div className="mt-8 max-w-xl mx-auto">
            {/* Returning Learner Alert Banner */}
            {savedProfile && (
              <div className="mb-6 p-4 rounded-xl bg-white border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-950 flex items-center justify-center font-extrabold text-white text-sm">
                    {savedProfile.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs text-blue-800 font-semibold">Welcome back, learner</div>
                    <div className="text-sm font-extrabold text-blue-950">{savedProfile.name}</div>
                    <div className="text-[11px] text-blue-900/80 font-mono">Streak: {savedProfile.streakCount}d · {savedProfile.target}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onResumeSaved}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shrink-0 shadow-xs cursor-pointer"
                >
                  <span>Resume Journey</span>
                  <ArrowRight className="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>
            )}

            {/* Quick Registration Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-extrabold text-blue-950 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-red-600" />
                    Enter the Journey
                  </h2>
                  <p className="text-xs text-blue-900/80 mt-0.5">
                    Zero friction. No email or password required. Start in seconds.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded font-extrabold">
                  Free Access
                </span>
              </div>

              {/* Name Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-blue-950">
                  Full Name / Preferred Identifier <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (validationError) setValidationError('');
                  }}
                  placeholder="e.g. Kapil Narula or Priya S."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-blue-950 text-sm placeholder:text-blue-900/40 focus:outline-none focus:border-blue-900 focus:bg-white transition-all font-medium"
                  autoFocus
                />
                {validationError && (
                  <p className="text-xs text-red-600 mt-1 font-bold">{validationError}</p>
                )}
              </div>

              {/* Education / Experience Level */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-blue-950">
                  Current Readiness Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Beginner', 'Intermediate', 'Advanced'] as LearningLevel[]).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setLevel(lvl)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                        level === lvl
                          ? 'bg-blue-950 text-white border-blue-950 shadow-xs'
                          : 'bg-slate-50 text-blue-900/80 border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Placement Goal */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-blue-950">
                  Target Placement Track
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    'Campus Placement',
                    'Product-Based Companies',
                    'Service-Based Companies',
                    'General Readiness',
                  ] as TargetGoal[]).map((tgt) => (
                    <button
                      key={tgt}
                      type="button"
                      onClick={() => setTarget(tgt)}
                      className={`p-2.5 rounded-xl text-xs font-bold border text-left transition-all cursor-pointer ${
                        target === tgt
                          ? 'bg-blue-50 text-blue-950 border-red-600 shadow-xs'
                          : 'bg-slate-50 text-blue-900/80 border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      {tgt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-extrabold text-sm tracking-wide uppercase shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>BEGIN MY JOURNEY</span>
                <ArrowRight className="w-4 h-4 text-red-400" />
              </button>

              {/* Footer Options */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-blue-900/80 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAccessCodeModal(true)}
                  className="hover:text-blue-950 hover:underline transition-colors flex items-center gap-1.5 font-bold text-red-600 cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5 text-red-600" />
                  Have an access token? Restore
                </button>

                <button
                  type="button"
                  onClick={onSeedDemo}
                  className="hover:text-blue-950 text-blue-800 font-mono transition-colors text-[11px] underline underline-offset-4 cursor-pointer"
                >
                  Load Demo Profile with History
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* The 5-Step Learner Journey */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-widest bg-red-50 border border-red-200 px-3 py-1 rounded-full">
            THE DSAPTIQ PRODUCT LOOP
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 mt-3">
            5 Systematic Steps to Placement Readiness
          </h2>
          <p className="text-sm text-blue-900/80 max-w-xl mx-auto mt-2">
            Move from passive memorization to deep cognitive logic and proven technical skill progression.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              num: '01',
              title: 'Enter Journey',
              desc: 'Enter your name, pick your target company category, and begin without passwords or friction.',
              icon: Compass,
            },
            {
              num: '02',
              title: 'Understand',
              desc: '50 daily worked examples with step-by-step logic, ASCII traces, and common interview pitfalls.',
              icon: BookOpen,
            },
            {
              num: '03',
              title: 'Assess',
              desc: '100 fresh daily MCQs across 7 domains with Practice, Timed Challenge, and Revision modes.',
              icon: Cpu,
            },
            {
              num: '04',
              title: 'Earn Bonus',
              desc: 'Daily spin wheel for streak protection tokens, visual masterclasses, and revision challenges.',
              icon: Award,
            },
            {
              num: '05',
              title: 'Measure PRI',
              desc: 'Placement Readiness Index out of 100 based on verified accuracy, speed, and domain mastery.',
              icon: TrendingUp,
            },
          ].map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between hover:border-blue-400 transition-all shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-red-600">
                      STEP {step.num}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-950">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm font-extrabold text-blue-950 mb-2">{step.title}</h3>
                  <p className="text-xs text-blue-900/80 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3 Core Value Pillars */}
      <section className="py-16 bg-white border-t border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-950">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-blue-950">100% Industry Oriented</h3>
              <p className="text-xs text-blue-900/80 leading-relaxed">
                Authored around actual written and technical interview patterns from top product and IT service companies: TCS Digital, Infosys DSE, Cognizant GenC, Amazon, and Accenture.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-red-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-blue-950">Visual-First Logic Studio</h3>
              <p className="text-xs text-blue-900/80 leading-relaxed">
                Step through interactive algorithms: Searches (Binary, Linear, Jump), Sorting (Bubble, Quick, Merge), BST Trees, Graphs (BFS/DFS), Singly &amp; Doubly Linked Lists, Stacks, Queues, and live Code Tracing.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-950">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-blue-950">Transparent PRI Intelligence</h3>
              <p className="text-xs text-blue-900/80 leading-relaxed">
                No arbitrary gamified point inflation. The Placement Readiness Index (0–100) mathematically evaluates 6 weighted components: Aptitude (25%), DSA (30%), Logic (15%), Accuracy (10%), Speed (10%), and Consistency (10%).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Access Code Recovery Modal */}
      {showAccessCodeModal && (
        <div className="fixed inset-0 z-50 bg-blue-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-blue-950 flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-red-600" />
                Resume With Access Token
              </h3>
              <button
                type="button"
                onClick={() => setShowAccessCodeModal(false)}
                className="text-blue-900/60 hover:text-blue-950 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-blue-900/80 leading-relaxed">
              DSAPTIQ preserves your learning history anonymously. Paste your unique learner code (e.g., <code className="text-red-600 font-mono font-bold">DSAPTIQ-XXXX-2026</code>) to restore your previous sessions and PRI snapshot.
            </p>
            <form onSubmit={handleRestoreSubmit} className="space-y-3">
              <input
                type="text"
                value={accessCodeInput}
                onChange={(e) => {
                  setAccessCodeInput(e.target.value);
                  setCodeError('');
                }}
                placeholder="DSAPTIQ-XXXX-2026"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-blue-950 font-mono text-sm placeholder:text-blue-900/40 focus:outline-none focus:border-blue-900 font-bold"
              />
              {codeError && <p className="text-xs text-red-600 font-bold">{codeError}</p>}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAccessCodeModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-blue-900/80 hover:text-blue-950 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  Restore Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
