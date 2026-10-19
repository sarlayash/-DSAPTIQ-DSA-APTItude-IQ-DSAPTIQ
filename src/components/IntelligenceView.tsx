import React from 'react';
import {
  Printer
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 select-none">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs print:hidden">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-900 uppercase">
              COGNITIVE DIAGNOSTICS
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-red-50 text-red-600 border border-red-200 font-bold">
              PRI Matrix Engine v2.6
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight">
            Performance Intelligence & PRI Analytics
          </h1>
          <p className="text-xs sm:text-sm text-blue-900 max-w-2xl leading-relaxed font-medium">
            Transparent, explainable intelligence. Understand how your demonstrated performance translates into your overall Placement Readiness Index.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs shrink-0 transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4 text-white" />
          <span>Print Readiness Transcript</span>
        </button>
      </div>

      {/* Primary Mathematical Model Explainer */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono text-blue-900 font-bold uppercase tracking-wider block">
              EVIDENCE-BASED EVALUATION FORMULA
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-blue-950 mt-0.5">
              How Placement Readiness Index (PRI) Is Calculated
            </h2>
          </div>
          <div className="font-mono text-xs text-blue-950 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200 font-bold">
            PRI = Σ (w_i × s_i)
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
              title: 'Accuracy & Precision',
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
              title: 'Daily Consistency',
              weight: '10%',
              score: pri.components.consistency,
              desc: 'Demonstrated consecutive daily active practice and assessment volume.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-blue-950 font-extrabold uppercase">{item.title}</span>
                  <span className="text-red-600 font-bold">{item.weight}</span>
                </div>
                <div className="text-2xl font-extrabold font-mono text-blue-950 mt-1">
                  {item.score}%
                </div>
                <p className="text-[11px] text-blue-900 mt-1 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>

              <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden mt-3">
                <div
                  className="h-full bg-blue-900 rounded-full"
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Domain Mastery Breakdown */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-mono text-blue-900 font-bold uppercase tracking-wider block">
            SYLLABUS COVERAGE
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-blue-950 mt-0.5">
            Domain-Wise Assessment Breakdown
          </h2>
        </div>

        <div className="space-y-4">
          {domainStats.map((ds) => (
            <div
              key={ds.domain}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-blue-950">{ds.domain}</span>
                  <span className="text-[11px] text-blue-800 font-mono">
                    ({ds.attempted}/{ds.total} attempted)
                  </span>
                </div>
                <div className="flex items-center gap-4 font-mono">
                  <span className="text-blue-900 text-[11px] font-medium">
                    Correct: <strong className="text-blue-950">{ds.correct}</strong>
                  </span>
                  <span className={`font-bold ${
                    ds.accuracy >= 75 ? 'text-blue-950' : 'text-red-600'
                  }`}>
                    {ds.accuracy}% Accuracy
                  </span>
                </div>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    ds.accuracy >= 75 ? 'bg-blue-900' : 'bg-red-600'
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
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-red-600 font-bold uppercase tracking-wider block">
                GAP INTERVENTION
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-blue-950 mt-0.5">
                Recent Misconceptions & Pitfalls
              </h2>
            </div>
            <span className="text-xs text-red-600 font-mono bg-red-50 border border-red-200 px-2 py-0.5 rounded font-bold">
              {recentMistakes.length} Questions for Revision
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentMistakes.map(({ question }) => {
              if (!question) return null;
              return (
                <div
                  key={question.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-blue-900 font-bold">{question.id} · {question.domain}</span>
                    <span className="text-red-600 font-bold">Incorrect Choice</span>
                  </div>

                  <p className="text-xs text-blue-950 line-clamp-2 font-medium">
                    {question.text}
                  </p>

                  <div className="p-2.5 rounded-lg bg-white border border-blue-100 text-[11px] text-blue-950 space-y-1">
                    <div>
                      <strong className="text-blue-950">Correct Answer:</strong> {question.options[question.correctIndex]}
                    </div>
                    {question.commonPitfall && (
                      <div className="text-red-700 font-medium">
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

      {/* Official Placement Readiness Transcript */}
      <div className="bg-white border-2 border-blue-900 rounded-2xl p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-blue-100 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold tracking-widest text-red-600 uppercase">
              OFFICIAL READINESS TRANSCRIPT
            </span>
            <h3 className="text-xl font-extrabold text-blue-950">
              Kapil Presents DSAPTIQ Candidate Assessment
            </h3>
            <p className="text-xs text-blue-900 font-medium">
              Endorsed by SARLAYASH Mission · DSA + APTItude + IQ = DSAPTIQ
            </p>
          </div>

          <div className="text-right font-mono">
            <div className="text-xs text-blue-900 font-bold">PLACEMENT READINESS INDEX</div>
            <div className="text-3xl font-extrabold text-red-600">
              {pri.overallScore} <span className="text-sm text-blue-900 font-normal">/ 100</span>
            </div>
          </div>
        </div>

        {/* Candidate Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono">
          <div>
            <span className="text-blue-800 text-[10px] block uppercase font-bold">Candidate Name</span>
            <span className="text-blue-950 font-extrabold">{learner.name}</span>
          </div>
          <div>
            <span className="text-blue-800 text-[10px] block uppercase font-bold">Target Track</span>
            <span className="text-blue-900 font-bold">{learner.target}</span>
          </div>
          <div>
            <span className="text-blue-800 text-[10px] block uppercase font-bold">Readiness Band</span>
            <span className="text-red-600 font-extrabold">{pri.interpretation}</span>
          </div>
          <div>
            <span className="text-blue-800 text-[10px] block uppercase font-bold">Access ID</span>
            <span className="text-blue-950 font-bold">{learner.accessCode}</span>
          </div>
        </div>

        <div className="text-[11px] text-blue-900 leading-relaxed font-mono text-center pt-2 font-medium">
          This transcript reflects demonstrated problem-solving logic, aptitude accuracy, and DSA algorithmic competencies calibrated on the DSAPTIQ platform.
        </div>
      </div>
    </div>
  );
};
