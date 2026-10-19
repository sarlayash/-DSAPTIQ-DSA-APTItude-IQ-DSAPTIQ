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

  // Fortune 500 Band badge helper (strictly Red & Blue fonts)
  const getBandBadge = (score: number) => {
    if (score >= 90) return { label: 'Top Tier Placement Ready', color: 'text-blue-950 bg-blue-100 border-blue-300 font-extrabold' };
    if (score >= 75) return { label: 'Strong Demonstrated Readiness', color: 'text-blue-900 bg-blue-50 border-blue-200 font-bold' };
    if (score >= 60) return { label: 'Progressing Toward Placement', color: 'text-blue-800 bg-slate-100 border-slate-200 font-medium' };
    if (score >= 40) return { label: 'Developing Readiness', color: 'text-red-700 bg-red-50 border-red-200 font-bold' };
    return { label: 'Foundation Calibration', color: 'text-red-800 bg-red-100 border-red-300 font-bold' };
  };

  const band = getBandBadge(pri.overallScore);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 select-none">
      {/* Top Executive Header Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm relative overflow-hidden">
        {/* Subtle executive accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-950 via-red-600 to-blue-900" />

        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-wider">
              EXECUTIVE COHORT · TODAY'S SESSION
            </span>
            <span className="text-blue-200">•</span>
            <span className="text-xs text-blue-900 font-semibold">{learner.target}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight">
            Ready to Practice, {learner.name}?
          </h1>
          <p className="text-xs sm:text-sm text-blue-900/80 max-w-xl leading-relaxed">
            100 daily benchmark questions, 50 solved case studies, and 8 visualizer laboratories are active. Elevate your logic and measure your Placement Readiness Index (PRI).
          </p>
        </div>

        {/* Access Code and Streak Badges */}
        <div className="flex flex-wrap items-center gap-3 z-10">
          {/* Access Code Card */}
          <div className="bg-slate-50 border border-blue-200/80 px-3.5 py-2 rounded-xl flex items-center gap-3 shadow-2xs">
            <div>
              <div className="text-[10px] text-blue-800 font-mono font-bold uppercase">Access Token</div>
              <div className="text-xs font-mono font-extrabold text-blue-950 tracking-wider">{learner.accessCode}</div>
            </div>
            <button
              onClick={copyCode}
              className="p-1.5 rounded-lg bg-white hover:bg-blue-50 text-blue-900 border border-slate-200 transition-colors cursor-pointer"
              title="Copy access token for backup"
            >
              {codeCopied ? <Check className="w-3.5 h-3.5 text-red-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Daily Streak Indicator */}
          <div className="bg-red-50 border border-red-200 px-3.5 py-2 rounded-xl flex items-center gap-2.5 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
              <Flame className="w-4 h-4 fill-red-600" />
            </div>
            <div>
              <div className="text-[10px] text-red-700 font-mono font-bold uppercase">Daily Streak</div>
              <div className="text-xs font-mono font-extrabold text-red-700">{learner.streakCount} Days Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Row: Placement Readiness Index (PRI) Intelligence Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-widest text-blue-950 uppercase">
                INTELLIGENCE ENGINE
              </span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${band.color}`}>
                {band.label}
              </span>
              {pri.isProvisional && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 font-bold" title="Based on under 20 attempts">
                  Provisional
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-blue-950 mt-1">
              Placement Readiness Index (PRI)
            </h2>
          </div>

          <button
            onClick={() => onNavigate('intelligence')}
            className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1.5 transition-colors self-end sm:self-auto cursor-pointer"
          >
            <span>View Full Diagnostic Breakdown</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Dial / Score */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-slate-50 border border-blue-100 shadow-2xs">
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
                  className="text-blue-100"
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
                  className="text-red-600 transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold font-mono text-blue-950 tracking-tight">
                  {pri.overallScore}
                </span>
                <span className="text-xs font-mono font-bold text-red-600">/ 100</span>
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <div className="text-xs font-bold text-blue-950">
                {pri.interpretation}
              </div>
              <p className="text-[11px] text-blue-900/80 max-w-xs">
                {pri.isProvisional
                  ? `Calibrating based on ${pri.totalAttemptsCount} recorded attempts. Reach 20 to establish index.`
                  : `Validated evidence across ${pri.totalAttemptsCount} assessment attempts.`}
              </p>
            </div>
          </div>

          {/* 6 Component Breakdown Bars */}
          <div className="lg:col-span-8 space-y-4">
            <div className="text-xs font-mono font-bold text-blue-950 uppercase tracking-wider flex items-center justify-between">
              <span>Weighted Component Scores (PRI = ∑ wᵢ · sᵢ)</span>
              <span className="text-[11px] text-blue-800 font-bold">Weight</span>
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
                <div key={idx} className="bg-slate-50 border border-slate-200 p-3 rounded-xl space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-950">{comp.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-blue-800 text-[11px] font-semibold">{comp.weight}</span>
                      <span className="font-mono font-extrabold text-red-600">{comp.score}%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-blue-900 rounded-full transition-all duration-700"
                      style={{ width: `${comp.score}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-blue-800/80 font-mono truncate">{comp.domain}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actionable Next Steps / Interventions */}
        {pri.recommendedActions && pri.recommendedActions.length > 0 && (
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-950">
              <Zap className="w-3.5 h-3.5 text-red-600" />
              <span>Recommended High-Priority Actions to Increase Your PRI</span>
            </div>
            <ul className="text-xs text-blue-900 space-y-1.5 list-disc list-inside">
              {pri.recommendedActions.map((action, i) => (
                <li key={i} className="leading-relaxed">
                  <span className="text-blue-950 font-medium">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Real Industry IDE Highlight Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-red-50 border border-blue-200 rounded-2xl p-6 sm:p-8 relative overflow-hidden group shadow-sm">
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-red-600 text-white font-mono shadow-2xs">
                INDUSTRY IDE
              </span>
              <span className="text-xs text-blue-900 font-mono font-bold">
                C · C++ · Java · Python 3
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-blue-950 tracking-tight flex items-center gap-2">
              <Terminal className="w-5 h-5 text-red-600" />
              Programming IDE & Real Industry Solutions
            </h3>
            <p className="text-sm text-blue-900/90 max-w-2xl leading-relaxed">
              Run, edit, and debug algorithmic code directly in your browser. Inspect and load authentic placement interview solutions tested at <strong className="text-blue-950 font-extrabold">Google, Amazon, TCS Digital, Infosys DSE, Microsoft, and Meta</strong> with time & space complexity breakdowns.
            </p>
          </div>
          <button
            onClick={() => onNavigate('ide')}
            className="shrink-0 px-5 py-3 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>Launch IDE & Solutions</span>
            <ArrowRight className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>

      {/* 30-Day Levels & Badges Executive Progression Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white rounded-2xl p-6 sm:p-7 shadow-md border border-blue-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-red-600 text-white text-[10px] font-mono font-extrabold uppercase">
              LEVEL 1 TO 30 CURRICULUM
            </span>
            <span className="text-xs font-mono font-bold text-blue-200">
              EASY · HARD · VERY HARD · SUPER TOUGH
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Daily Placement Milestones, Medallion Badges & PNG Certificates
          </h3>

          <p className="text-xs text-blue-200/90 max-w-2xl leading-relaxed">
            Progress through all 30 days of industry-calibrated challenges. Earn verified XP, unlock 800×800 PNG medallion badges, and download accredited high-resolution PNG certificates with zero overlapping or border issues.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-1 text-blue-100">
            <span>Current: <strong className="text-white font-bold">Level {learner.currentDayLevel || 1} / 30</strong></span>
            <span>·</span>
            <span>XP Accumulated: <strong className="text-red-400 font-bold">+{(learner.totalXP || 250).toLocaleString()} XP</strong></span>
            <span>·</span>
            <span>Badges Unlocked: <strong className="text-white font-bold">{learner.badges?.length || 1}</strong></span>
          </div>
        </div>

        <button
          onClick={() => onNavigate('levels')}
          className="shrink-0 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg flex items-center gap-2.5 transition-all cursor-pointer group"
        >
          <Award className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
          <span>Open 30 Levels & Certs</span>
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* 4 Feature Workspaces Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: 100 MCQs Assessment */}
        <div className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-sm hover:shadow-md">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-900">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200 font-bold">
                100 MCQs
              </span>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-blue-950 group-hover:text-blue-800">
                Daily Assessment
              </h3>
              <p className="text-xs text-blue-900/80 mt-1 leading-relaxed">
                Attempt 100 non-repeated questions spanning Quant, Logical, Verbal, DSA, and Industry Scenarios.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-blue-800 block text-[10px] font-semibold">PROGRESS</span>
                <span className="text-blue-950 font-extrabold">{answeredCount} / 100</span>
              </div>
              <div className="text-right">
                <span className="text-blue-800 block text-[10px] font-semibold">ACCURACY</span>
                <span className="text-red-600 font-extrabold">{accuracy}%</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('assessment')}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Launch Assessment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 2: 50 Solved Examples */}
        <div className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-sm hover:shadow-md">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-900">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-bold">
                50 Worked
              </span>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-blue-950 group-hover:text-blue-800">
                50 Solved Examples
              </h3>
              <p className="text-xs text-blue-900/80 mt-1 leading-relaxed">
                Step-by-step reasoning paths, ASCII diagrams, interview relevance, and misconception alerts.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-blue-800 block text-[10px] font-semibold">UNDERSTOOD</span>
                <span className="text-blue-950 font-extrabold">{understoodCount} / 50</span>
              </div>
              <div className="text-right">
                <span className="text-blue-800 block text-[10px] font-semibold">BOOKMARKS</span>
                <span className="text-red-600 font-extrabold">{learner.bookmarks?.length || 0}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('examples')}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Explore Examples</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 3: Logic Visualization Studio */}
        <div className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-sm hover:shadow-md">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-900">
                <Sparkles className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-[10px] font-mono text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200 font-bold">
                8 Labs
              </span>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-blue-950 group-hover:text-blue-800">
                Logic Visualization Studio
              </h3>
              <p className="text-xs text-blue-900/80 mt-1 leading-relaxed">
                Step through Searches, Sorting passes, BST Trees, Graphs (BFS/DFS), Linked Lists, Stacks, Queues, and Code Tracing.
              </p>
            </div>

            {/* Modules List */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-blue-900 space-y-1 font-mono">
              <div>• Searches & Sorting (Bubble, Quick, Merge)</div>
              <div>• Trees (BST) & Graphs (BFS / DFS)</div>
              <div>• Linked Lists, Stacks (LIFO), Queues (FIFO)</div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('visualizer')}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Enter Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 4: Daily Bonus Wheel */}
        <div className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-sm hover:shadow-md">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-900">
                <Award className="w-5 h-5 text-blue-900" />
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                isWheelEligible
                  ? 'bg-red-50 text-red-600 border-red-200'
                  : 'bg-slate-100 text-blue-900/60 border-slate-200'
              }`}>
                {isWheelEligible ? '1 Spin Ready' : 'Spun Today'}
              </span>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-blue-950 group-hover:text-blue-800">
                Daily Bonus Wheel
              </h3>
              <p className="text-xs text-blue-900/80 mt-1 leading-relaxed">
                Spin once every 24 hours for bonus practice challenges, streak protection tokens, and visual unlocks.
              </p>
            </div>

            {/* Rule note */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-blue-900/80 leading-relaxed">
              <span className="text-blue-950 font-bold">DSAPTIQ Integrity Rule:</span> Bonus wheel rewards drive learning engagement and never inflate academic PRI scores.
            </div>
          </div>

          <button
            onClick={() => onNavigate('wheel')}
            className={`mt-6 w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
              isWheelEligible
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-blue-950 hover:bg-blue-900 text-white'
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
