import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  Zap,
  Target,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Printer,
  ShieldCheck,
  Cpu,
  Sparkles
} from 'lucide-react';
import { LearnerProfile, PRISnapshot, QuestionAttempt } from '../types';
import { DAILY_100_QUESTIONS } from '../data/questionBank';

interface IntelligenceViewProps {
  learner: LearnerProfile;
  pri: PRISnapshot;
  attempts: QuestionAttempt[];
}

export const IntelligenceView: React.FC<IntelligenceViewProps> = ({
  learner,
  pri,
  attempts,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const questionMap = new Map(DAILY_100_QUESTIONS.map((q) => [q.id, q]));

  // Domain breakdown
  const domainStats = [
    { name: 'Quantitative Aptitude', total: 20 },
    { name: 'Logical Reasoning', total: 15 },
    { name: 'Verbal & Analytical', total: 10 },
    { name: 'Data Structures', total: 20 },
    { name: 'Algorithms & Complexity', total: 15 },
    { name: 'Code Tracing & Logic', total: 10 },
    { name: 'Industry Scenarios', total: 10 },
  ].map((d) => {
    const domainAttempts = attempts.filter(
      (a) => questionMap.get(a.questionId)?.domain === d.name
    );
    const correctCount = domainAttempts.filter((a) => a.isCorrect).length;
    const accuracy =
      domainAttempts.length > 0
        ? Math.round((correctCount / domainAttempts.length) * 100)
        : 0;
    return {
      domain: d.name,
      attempted: domainAttempts.length,
      total: d.total,
      correct: correctCount,
      accuracy,
    };
  });

  // Recent mistakes for targeted revision
  const recentMistakes = attempts
    .filter((a) => !a.isCorrect)
    .slice(-6)
    .map((a) => ({
      attempt: a,
      question: questionMap.get(a.questionId),
    }))
    .filter((m) => m.question !== undefined);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl print:hidden">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
              COGNITIVE DIAGNOSTICS
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              PRI Engine v2.6
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Performance Intelligence & PRI Analytics
          </h1>
          <p className="text-xs sm:text-sm text-[#BFC2C9] max-w-2xl leading-relaxed">
            Transparent, explainable intelligence. Understand how your demonstrated performance translates into your overall Placement Readiness Index.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-white text-slate-900 font-bold text-xs flex items-center gap-2 shadow shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>Print Readiness Transcript</span>
        </button>
      </div>

      {/* Primary Mathematical Model Explainer */}
      <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="border-b border-[#2d3036] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              EVIDENCE-BASED EVALUATION FORMULA
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              How Placement Readiness Index (PRI) Is Calculated
            </h2>
          </div>
          <div className="font-mono text-xs text-slate-300 bg-[#08090B] px-3 py-1.5 rounded-xl border border-slate-800">
            \[ PRI = \sum_{`{i=1}`}^{`{6}`} w_i s_i \]
          </div>
        </div>

        {/* 6 Component Formula Breakdown Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'Aptitude Proficiency',
              weight: '25%',
              score: pri.components.aptitude,
              desc: 'Calculated across Quantitative, Logical, and Verbal benchmarks.',
            },
            {
              title: 'DSA & Algorithms',
              weight: '30%',
              score: pri.components.dsa,
              desc: 'Evaluates tree, graph, sorting, dynamic programming, and data structures mastery.',
            },
            {
              title: 'Logic & Code Tracing',
              weight: '15%',
              score: pri.components.logicTracing,
              desc: 'Line-by-line pointer dereferencing, recursion depth, and system scenarios.',
            },
            {
              title: 'Accuracy & Error Reduction',
              weight: '10%',
              score: pri.components.accuracy,
              desc: 'Strict precision ratio of correct answers versus total attempted questions.',
            },
            {
              title: 'Timed Solving Speed',
              weight: '10%',
              score: pri.components.speed,
              desc: 'Actual execution seconds measured against industry standard target benchmarks.',
            },
            {
              title: 'Demonstrated Consistency',
              weight: '10%',
              score: pri.components.consistency,
              desc: 'Demonstrated consecutive daily active practice and assessment volume.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#08090B] border border-slate-800 space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 font-bold uppercase">{item.title}</span>
                  <span className="text-slate-500 font-bold">{item.weight}</span>
                </div>
                <div className="text-2xl font-bold font-mono text-white mt-1">
                  {item.score}%
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden mt-3">
                <div
                  className="h-full bg-slate-300 rounded-full"
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Domain Mastery Breakdown */}
      <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="border-b border-[#2d3036] pb-4">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
            SYLLABUS COVERAGE
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
            Domain-Wise Assessment Breakdown
          </h2>
        </div>

        <div className="space-y-4">
          {domainStats.map((ds) => (
            <div
              key={ds.domain}
              className="p-4 rounded-xl bg-[#08090B] border border-slate-800 space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{ds.domain}</span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    ({ds.attempted}/{ds.total} attempted)
                  </span>
                </div>
                <div className="flex items-center gap-4 font-mono">
                  <span className="text-slate-400 text-[11px]">
                    Correct: <strong className="text-white">{ds.correct}</strong>
                  </span>
                  <span className={`font-bold ${
                    ds.accuracy >= 75 ? 'text-emerald-400' : ds.accuracy >= 50 ? 'text-slate-200' : 'text-amber-400'
                  }`}>
                    {ds.accuracy}% Accuracy
                  </span>
                </div>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    ds.accuracy >= 75 ? 'bg-emerald-400' : ds.accuracy >= 50 ? 'bg-slate-300' : 'bg-amber-400'
                  }`}
                  style={{ width: `${ds.accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Targeted Mistake & Gap Log */}
      {recentMistakes.length > 0 && (
        <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-[#2d3036] pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                GAP INTERVENTION
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                Recent Misconceptions & Pitfalls
              </h2>
            </div>
            <span className="text-xs text-rose-400 font-mono bg-rose-950/40 border border-rose-800 px-2 py-0.5 rounded">
              {recentMistakes.length} Questions for Revision
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentMistakes.map(({ attempt, question }) => {
              if (!question) return null;
              return (
                <div
                  key={question.id}
                  className="p-4 rounded-xl bg-[#08090B] border border-slate-800 space-y-2.5"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400 font-bold">{question.id} · {question.domain}</span>
                    <span className="text-rose-400">Incorrect Choice</span>
                  </div>

                  <p className="text-xs text-slate-200 line-clamp-2">
                    {question.text}
                  </p>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                    <div>
                      <strong className="text-emerald-400">Correct Answer:</strong> {question.options[question.correctIndex]}
                    </div>
                    {question.commonPitfall && (
                      <div className="text-amber-300/80">
                        <strong>Pitfall:</strong> {question.commonPitfall}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Official Placement Readiness Transcript (Print-Optimized / Clean Card) */}
      <div className="bg-[#17191D] border-2 border-slate-500 rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-700 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
              OFFICIAL READINESS TRANSCRIPT
            </span>
            <h3 className="text-xl font-extrabold text-white">
              Kapil Presents DSAPTIQ Candidate Assessment
            </h3>
            <p className="text-xs text-slate-400">
              Endorsed by SARLAYASH Mission · DSA + APTItude + IQ = DSAPTIQ
            </p>
          </div>

          <div className="text-right font-mono">
            <div className="text-xs text-slate-400">PLACEMENT READINESS INDEX</div>
            <div className="text-3xl font-extrabold text-white">
              {pri.overallScore} <span className="text-sm text-slate-400">/ 100</span>
            </div>
          </div>
        </div>

        {/* Candidate Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#08090B] border border-slate-800 text-xs font-mono">
          <div>
            <span className="text-slate-500 text-[10px] block uppercase">Candidate Name</span>
            <span className="text-white font-bold">{learner.name}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block uppercase">Target Track</span>
            <span className="text-slate-300">{learner.target}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block uppercase">Readiness Band</span>
            <span className="text-slate-200 font-bold">{pri.interpretation}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block uppercase">Access ID</span>
            <span className="text-slate-300">{learner.accessCode}</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 leading-relaxed font-mono text-center pt-2">
          This transcript reflects demonstrated problem-solving logic, aptitude accuracy, and DSA algorithmic competencies recorded on the DSAPTIQ platform.
        </div>
      </div>
    </div>
  );
};
