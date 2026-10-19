import React from 'react';
import {
  Compass,
  BookOpen,
  Cpu,
  Sparkles,
  Award,
  BarChart3,
  Flame,
  Shield,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  Zap,
  Target,
  Copy,
  Check,
  HelpCircle,
  AlertTriangle,
  Terminal
} from 'lucide-react';
import { LearnerProfile, PRISnapshot, QuestionAttempt } from '../types';
import { DAILY_100_QUESTIONS } from '../data/questionBank';
import { DAILY_50_SOLVED_EXAMPLES } from '../data/solvedExamples';
import { canSpinWheelToday } from '../services/storage';

interface DashboardViewProps {
  learner: LearnerProfile;
  pri: PRISnapshot;
  attempts: QuestionAttempt[];
  onNavigate: (tab: string) => void;
  onOpenProfile: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  learner,
  pri,
  attempts,
  onNavigate,
  onOpenProfile,
}) => {
  const [codeCopied, setCodeCopied] = React.useState(false);
  const isWheelEligible = canSpinWheelToday();

  const copyCode = () => {
    navigator.clipboard.writeText(learner.accessCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const answeredCount = attempts.length;
  const correctCount = attempts.filter((a) => a.isCorrect).length;
  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
  const understoodCount = learner.understoodExamples?.length || 0;

  // Band badge color helper
  const getBandBadge = (score: number) => {
    if (score >= 90) return { label: 'High Demonstrated Readiness', color: 'text-emerald-300 bg-emerald-950/60 border-emerald-700/80' };
    if (score >= 75) return { label: 'Strong Demonstrated Readiness', color: 'text-cyan-300 bg-cyan-950/60 border-cyan-700/80' };
    if (score >= 60) return { label: 'Progressing Toward Placement', color: 'text-slate-200 bg-slate-800/80 border-slate-600' };
    if (score >= 40) return { label: 'Developing Readiness', color: 'text-amber-300 bg-amber-950/60 border-amber-700/80' };
    return { label: 'Foundation Building', color: 'text-rose-300 bg-rose-950/60 border-rose-800/80' };
  };

  const band = getBandBadge(pri.overallScore);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Welcome & Access Code Header */}
      <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-slate-700/10 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              COMMAND CENTER · TODAY'S SESSION
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-300 font-medium">{learner.target}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Practice, {learner.name}?
          </h1>
          <p className="text-xs sm:text-sm text-[#BFC2C9] max-w-xl">
            100 questions and 50 solved examples are active for your assessment cohort. Elevate your logic and measure your PRI score.
          </p>
        </div>

        {/* Access Code and Streak Badges */}
        <div className="flex flex-wrap items-center gap-3 z-10">
          {/* Access Code Card */}
          <div className="bg-[#08090B] border border-slate-700/80 px-3.5 py-2 rounded-xl flex items-center gap-3">
            <div>
              <div className="text-[10px] text-slate-400 font-mono uppercase">Learner Access Code</div>
              <div className="text-xs font-mono font-bold text-white tracking-wider">{learner.accessCode}</div>
            </div>
            <button
              onClick={copyCode}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Copy access code for backup"
            >
              {codeCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Daily Streak Indicator */}
          <div className="bg-[#08090B] border border-slate-700/80 px-3.5 py-2 rounded-xl flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-950/40 border border-amber-800/60 flex items-center justify-center text-amber-400">
              <Flame className="w-4 h-4 fill-amber-500/20" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-mono uppercase">Daily Streak</div>
              <div className="text-xs font-mono font-bold text-amber-300">{learner.streakCount} Days Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Row: Placement Readiness Index (PRI) Intelligence Card */}
      <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2d3036] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                INTELLIGENCE ENGINE
              </span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${band.color}`}>
                {band.label}
              </span>
              {pri.isProvisional && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700" title="Based on under 20 attempts">
                  Provisional
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Placement Readiness Index (PRI)
            </h2>
          </div>

          <button
            onClick={() => onNavigate('intelligence')}
            className="text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors self-end sm:self-auto"
          >
            <span>View Full Diagnostic Breakdown</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Dial / Score */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 rounded-xl bg-[#08090B] border border-slate-800 relative">
            <div className="relative w-40 h-40 flex items-center justify-center">
              {/* Circular Gauge Track */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-slate-800/80"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={264}
                  strokeDashoffset={264 - (264 * pri.overallScore) / 100}
                  strokeLinecap="round"
                  className="text-slate-200 transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold font-mono text-white tracking-tight">
                  {pri.overallScore}
                </span>
                <span className="text-xs font-mono text-slate-400">/ 100</span>
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <div className="text-xs font-semibold text-slate-200">
                {pri.interpretation}
              </div>
              <p className="text-[11px] text-slate-400 max-w-xs">
                {pri.isProvisional
                  ? `Calibrating based on ${pri.totalAttemptsCount} recorded attempts. Reach 20 to establish index.`
                  : `Validated evidence across ${pri.totalAttemptsCount} assessment attempts.`}
              </p>
            </div>
          </div>

          {/* 6 Component Breakdown Bars */}
          <div className="lg:col-span-8 space-y-4">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Weighted Component Scores (\(PRI = \sum w_i s_i\))</span>
              <span className="text-[11px] text-slate-500">Weight</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Aptitude Proficiency', score: pri.components.aptitude, weight: '25%', domain: 'Quant / Logic / Verbal' },
                { label: 'DSA & Algorithms', score: pri.components.dsa, weight: '30%', domain: 'Data Structures / Complexity' },
                { label: 'Logic & Code Tracing', score: pri.components.logicTracing, weight: '15%', domain: 'Tracing & System Scenarios' },
                { label: 'Accuracy & Error Reduction', score: pri.components.accuracy, weight: '10%', domain: 'Valid vs Incorrect Choices' },
                { label: 'Solving Speed & Tempo', score: pri.components.speed, weight: '10%', domain: 'Time vs Estimated Benchmarks' },
                { label: 'Demonstrated Consistency', score: pri.components.consistency, weight: '10%', domain: 'Active Streaks & Sets' },
              ].map((comp, idx) => (
                <div key={idx} className="bg-[#121418] border border-[#23262d] p-3 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-200">{comp.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-400 text-[11px]">{comp.weight}</span>
                      <span className="font-mono font-bold text-white">{comp.score}%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-slate-300 rounded-full transition-all duration-700"
                      style={{ width: `${comp.score}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono truncate">{comp.domain}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actionable Next Steps / Interventions */}
        {pri.recommendedActions && pri.recommendedActions.length > 0 && (
          <div className="p-4 rounded-xl bg-[#08090B] border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Recommended High-Priority Actions to Increase Your PRI</span>
            </div>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
              {pri.recommendedActions.map((action, i) => (
                <li key={i} className="leading-relaxed">
                  <span className="text-slate-300">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Real Industry IDE Highlight Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-cyan-950/30 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden group shadow-xl">
        <div className="absolute -right-8 -top-8 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                NEW FEATURE
              </span>
              <span className="text-xs text-slate-400 font-mono">
                C · C++ · Java · Python 3
              </span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-400" />
              Programming IDE & Real Industry Solutions
            </h3>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Run, edit, and debug algorithmic code directly in your browser. Inspect and load authentic placement interview solutions tested at <strong className="text-white">Google, Amazon, TCS Digital, Infosys DSE, Microsoft, and Meta</strong> with time & space complexity breakdowns.
            </p>
          </div>
          <button
            onClick={() => onNavigate('ide')}
            className="shrink-0 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-900/30 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <span>Launch IDE & Solutions</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Feature Workspaces Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: 100 MCQs Assessment */}
        <div className="bg-[#17191D] border border-[#2d3036] hover:border-slate-500 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                100 MCQs
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white group-hover:text-slate-100">
                Daily Assessment
              </h3>
              <p className="text-xs text-[#BFC2C9] mt-1 leading-relaxed">
                Attempt 100 non-repeated questions spanning Quant, Logical, Verbal, DSA, and Industry Scenarios.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="bg-[#08090B] p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-slate-500 block text-[10px]">PROGRESS</span>
                <span className="text-white font-bold">{answeredCount} / 100</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block text-[10px]">ACCURACY</span>
                <span className="text-emerald-400 font-bold">{accuracy}%</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('assessment')}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-slate-200 hover:bg-white text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>Launch Assessment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 2: 50 Solved Examples */}
        <div className="bg-[#17191D] border border-[#2d3036] hover:border-slate-500 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                50 Worked
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white group-hover:text-slate-100">
                50 Solved Examples
              </h3>
              <p className="text-xs text-[#BFC2C9] mt-1 leading-relaxed">
                Step-by-step reasoning paths, ASCII diagrams, interview relevance, and misconception alerts.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="bg-[#08090B] p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-slate-500 block text-[10px]">UNDERSTOOD</span>
                <span className="text-white font-bold">{understoodCount} / 50</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block text-[10px]">BOOKMARKS</span>
                <span className="text-cyan-400 font-bold">{learner.bookmarks?.length || 0}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('examples')}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-2"
          >
            <span>Explore Examples</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 3: Logic Visualization Studio */}
        <div className="bg-[#17191D] border border-[#2d3036] hover:border-slate-500 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <span className="text-[10px] font-mono text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/60">
                Interactive
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white group-hover:text-slate-100">
                Logic Visualization Studio
              </h3>
              <p className="text-xs text-[#BFC2C9] mt-1 leading-relaxed">
                Step through Binary Search intervals, Stack/Queue/List state mutations, Sorting swaps, and Code Tracing.
              </p>
            </div>

            {/* Modules List */}
            <div className="bg-[#08090B] p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1 font-mono">
              <div>• Binary Search Halver</div>
              <div>• Stack & Queue State Machine</div>
              <div>• Sorting & Code Tracing Lab</div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('visualizer')}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-2"
          >
            <span>Enter Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 4: Daily Bonus Wheel */}
        <div className="bg-[#17191D] border border-[#2d3036] hover:border-slate-500 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200">
                <Award className="w-5 h-5 text-cyan-300" />
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                isWheelEligible
                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/80 animate-pulse'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                {isWheelEligible ? '1 Spin Ready' : 'Spun Today'}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white group-hover:text-slate-100">
                Daily Bonus Wheel
              </h3>
              <p className="text-xs text-[#BFC2C9] mt-1 leading-relaxed">
                Spin once every 24 hours for bonus practice challenges, streak protection tokens, and visual unlocks.
              </p>
            </div>

            {/* Rule note */}
            <div className="bg-[#08090B] p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
              <span className="text-slate-300 font-semibold">DSAPTIQ Integrity Rule:</span> Bonus wheel rewards drive learning engagement and never inflate academic PRI scores.
            </div>
          </div>

          <button
            onClick={() => onNavigate('wheel')}
            className={`mt-6 w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 ${
              isWheelEligible
                ? 'bg-gradient-to-r from-cyan-400 to-slate-200 text-slate-950 hover:brightness-110 shadow'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
          >
            <span>{isWheelEligible ? 'Spin Daily Wheel' : 'View Spin History'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
