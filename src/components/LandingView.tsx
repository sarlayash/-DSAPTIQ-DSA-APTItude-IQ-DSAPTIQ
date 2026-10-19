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
      setValidationError('Please enter your full name or nickname to proceed.');
      return;
    }
    setValidationError('');
    onStart(name.trim(), level, target);
  };

  const handleRestoreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCodeInput.trim()) {
      setCodeError('Enter a valid access code (e.g. DSAPTIQ-9PRO-2026)');
      return;
    }
    const success = onRestoreByCode(accessCodeInput.trim());
    if (!success) {
      setCodeError('No records found with this code. Check the format or create a new profile.');
    } else {
      setShowAccessCodeModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090B] text-[#F2F3F5] selection:bg-slate-700 selection:text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-12 pb-20 border-b border-[#2d3036]/50">
        {/* Subtle background metallic ambient light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-96 bg-gradient-to-b from-slate-700/10 via-slate-800/5 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Brand Endorsement Badge */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#17191D] border border-slate-700/70 text-xs shadow-inner">
              <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                KAPIL PRESENTS
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-500" />
              <span className="font-semibold text-slate-200">DSAPTIQ</span>
              <span className="w-1 h-1 rounded-full bg-slate-500" />
              <span className="text-slate-400">Powered by <strong className="text-white font-medium">SARLAYASH Mission</strong></span>
            </div>
          </div>

          {/* Hero Typography */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono text-cyan-300 mb-2">
              <span>DSA + APTItude + IQ = DSAPTIQ</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Your Placement Journey <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500 bg-clip-text text-transparent">
                Starts With Logic.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#BFC2C9] max-w-2xl mx-auto font-normal">
              Not just another quiz site. DSAPTIQ is an industry-grade placement intelligence platform: visualize algorithm step patterns, master 50 daily worked examples, solve 100 benchmark MCQs, and measure your explainable <strong>Placement Readiness Index (PRI)</strong> every single day.
            </p>
          </div>

          {/* Hero Showcase Banner Card */}
          <div className="mt-8 mb-10 max-w-4xl mx-auto">
            <div className="relative group rounded-2xl overflow-hidden border border-[#2d3036] bg-[#121418] shadow-2xl transition-all hover:border-slate-500/70">
              {/* HUD Header Bar */}
              <div className="px-4 py-2.5 bg-[#17191D] border-b border-[#2d3036] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-xs font-mono text-slate-300 font-semibold tracking-wide">
                    DSAPTIQ :: Neural Logic, Algorithms & Placement Intelligence Studio
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/60 border border-cyan-800/60 text-cyan-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    DSA + APTI + IQ
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">v1.0 LIVE</span>
                </div>
              </div>

              {/* Banner Graphic Frame */}
              <div className="relative aspect-[16/9] w-full bg-[#08090B] overflow-hidden">
                <img
                  src={heroBannerImg}
                  alt="Kapil Presents DSAPTIQ - Data Structures, Algorithms, Aptitude and IQ Placement Intelligence"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.01]"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090B]/90 via-transparent to-transparent pointer-events-none" />

                {/* Badges Overlay */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-xs font-medium text-white shadow-lg flex items-center gap-1.5">
                      <span className="text-cyan-400 font-bold">100</span> Daily MCQs
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-xs font-medium text-white shadow-lg flex items-center gap-1.5">
                      <span className="text-emerald-400 font-bold">50</span> Solved Challenges
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-500/40 text-xs font-mono text-cyan-300 shadow-lg flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      IDE: C · C++ · Java · Python
                    </span>
                    <span className="hidden sm:inline-flex px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-xs font-medium text-purple-300 shadow-lg items-center gap-1.5">
                      Visualizer Studio
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300 shadow-lg">
                      PRI Score: <span className="text-amber-400 font-bold">0–100 Matrix</span>
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
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-[#17191D] to-[#1a1e24] border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-600 flex items-center justify-center font-bold text-slate-200 text-sm">
                    {savedProfile.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Welcome back, learner</div>
                    <div className="text-sm font-semibold text-white">{savedProfile.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">Streak: {savedProfile.streakCount}d · {savedProfile.target}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onResumeSaved}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-slate-200 hover:bg-white text-slate-900 font-semibold text-xs transition-all flex items-center justify-center gap-2 shrink-0 shadow"
                >
                  <span>Resume Journey</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Quick Registration Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6"
            >
              <div className="border-b border-[#2d3036] pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-slate-300" />
                    Enter the Journey
                  </h2>
                  <p className="text-xs text-[#BFC2C9] mt-0.5">
                    Zero friction. No email or password required. Start in seconds.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded">
                  Free Access
                </span>
              </div>

              {/* Name Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Full Name / Preferred Identifier <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (validationError) setValidationError('');
                  }}
                  placeholder="e.g. Kapil Narula or Priya S."
                  className="w-full px-4 py-3 rounded-xl bg-[#08090B] border border-[#414349] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-slate-300 focus:ring-1 focus:ring-slate-300 transition-all"
                  autoFocus
                />
                {validationError && (
                  <p className="text-xs text-rose-400 mt-1 font-medium">{validationError}</p>
                )}
              </div>

              {/* Education / Experience Level */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Current Readiness Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Beginner', 'Intermediate', 'Advanced'] as LearningLevel[]).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setLevel(lvl)}
                      className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                        level === lvl
                          ? 'bg-slate-200 text-slate-900 border-white font-semibold shadow-sm'
                          : 'bg-[#08090B] text-slate-400 border-[#2d3036] hover:text-white hover:border-slate-600'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Placement Goal */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
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
                      className={`p-2.5 rounded-lg text-xs font-medium border text-left transition-all ${
                        target === tgt
                          ? 'bg-slate-800 text-white border-slate-400 font-semibold shadow-sm'
                          : 'bg-[#08090B] text-slate-400 border-[#2d3036] hover:text-white hover:border-slate-600'
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
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-slate-100 to-slate-300 hover:from-white hover:to-slate-200 text-slate-950 font-bold text-sm tracking-wide uppercase shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <span>BEGIN MY JOURNEY</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Footer Options */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 border-t border-[#2d3036]">
                <button
                  type="button"
                  onClick={() => setShowAccessCodeModal(true)}
                  className="hover:text-white transition-colors flex items-center gap-1.5 font-medium"
                >
                  <KeyRound className="w-3.5 h-3.5 text-slate-400" />
                  Have an access code? Restore
                </button>

                <button
                  type="button"
                  onClick={onSeedDemo}
                  className="hover:text-slate-200 text-slate-500 font-mono transition-colors text-[11px] underline underline-offset-4"
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
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
            THE DSAPTIQ PRODUCT LOOP
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3">
            5 Systematic Steps to Placement Readiness
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto mt-2">
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
                className="bg-[#17191D] border border-[#2d3036] rounded-xl p-5 flex flex-col justify-between hover:border-slate-500 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-slate-500">
                      STEP {step.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3 Core Value Pillars */}
      <section className="py-16 bg-[#121418] border-t border-b border-[#2d3036]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">100% Industry Oriented</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Authored around actual written and technical interview patterns from top product and IT service companies: TCS Digital, Infosys DSE, Cognizant GenC, Amazon, and Accenture.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Visual-First Logic Studio</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Step through interactive algorithms: Binary Search halving, Stack/Queue/Linked List operations, Sorting bar animations, and live Code Tracing variable watch tables.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Transparent PRI Intelligence</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                No arbitrary gamified point inflation. The Placement Readiness Index (0–100) mathematically evaluates 6 weighted components: Aptitude (25%), DSA (30%), Logic (15%), Accuracy (10%), Speed (10%), and Consistency (10%).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Access Code Recovery Modal */}
      {showAccessCodeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#17191D] border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#2d3036] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-slate-300" />
                Resume With Access Code
              </h3>
              <button
                type="button"
                onClick={() => setShowAccessCodeModal(false)}
                className="text-slate-500 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              DSAPTIQ preserves your learning history anonymously. Paste your unique learner code (e.g., <code className="text-slate-300 font-mono">DSAPTIQ-XXXX-2026</code>) to restore your previous sessions and PRI snapshot.
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
                className="w-full px-4 py-2.5 rounded-xl bg-[#08090B] border border-[#414349] text-white font-mono text-sm placeholder:text-slate-600 focus:outline-none focus:border-slate-300"
              />
              {codeError && <p className="text-xs text-rose-400 font-medium">{codeError}</p>}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAccessCodeModal(false)}
                  className="px-4 py-2 rounded-lg text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-white text-slate-900 font-bold text-xs"
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
