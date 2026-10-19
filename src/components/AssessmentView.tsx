import React, { useState, useEffect, useMemo } from 'react';
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Bookmark,
  Flag,
  ChevronLeft,
  ChevronRight,
  Filter,
  RotateCcw,
  Sparkles,
  Zap,
  Send,
  Eye,
  Check,
  Cpu
} from 'lucide-react';
import { Question, QuestionAttempt, AssessmentMode, AssessmentDomain } from '../types';
import { DAILY_100_QUESTIONS } from '../data/questionBank';

interface AssessmentViewProps {
  attempts: QuestionAttempt[];
  onSaveAttempt: (attempt: QuestionAttempt) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onAssessmentCompleted?: () => void;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  attempts,
  onSaveAttempt,
  bookmarks,
  onToggleBookmark,
  onAssessmentCompleted,
}) => {
  const [mode, setMode] = useState<AssessmentMode>('practice');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(new Set());
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [showSubmissionSummary, setShowSubmissionSummary] = useState<boolean>(false);

  // Map of attempts by questionId for fast lookup
  const attemptMap = useMemo(() => {
    return new Map(attempts.map((a) => [a.questionId, a]));
  }, [attempts]);

  // Filter questions based on mode and domain
  const filteredQuestions = useMemo(() => {
    let list = DAILY_100_QUESTIONS;

    if (mode === 'diagnostic') {
      // Diagnostic mode: 20 balanced calibration questions (first 20 across key categories)
      list = DAILY_100_QUESTIONS.slice(0, 20);
    } else if (mode === 'revision') {
      // Revision mode: only previously missed or bookmarked
      const missedIds = new Set(attempts.filter((a) => !a.isCorrect).map((a) => a.questionId));
      list = DAILY_100_QUESTIONS.filter(
        (q) => missedIds.has(q.id) || bookmarks.includes(q.id)
      );
      if (list.length === 0) {
        list = DAILY_100_QUESTIONS.slice(0, 10); // fallback if none missed
      }
    }

    if (selectedDomain !== 'All') {
      list = list.filter((q) => q.domain === selectedDomain);
    }

    return list;
  }, [mode, selectedDomain, attempts, bookmarks]);

  // Current active question
  const currentQ: Question | undefined = filteredQuestions[currentIndex] || filteredQuestions[0];

  // Guard index bounds if filters change
  useEffect(() => {
    if (currentIndex >= filteredQuestions.length && filteredQuestions.length > 0) {
      setCurrentIndex(0);
    }
  }, [filteredQuestions.length, currentIndex]);

  // Reset local state when active question changes
  useEffect(() => {
    if (!currentQ) return;
    const existingAttempt = attemptMap.get(currentQ.id);
    if (existingAttempt) {
      setSelectedOption(existingAttempt.selectedIndex);
      setShowExplanation(mode === 'practice' || showSubmissionSummary);
    } else {
      setSelectedOption(null);
      setShowExplanation(false);
    }
    setQuestionStartTime(Date.now());
  }, [currentIndex, currentQ?.id, mode, attemptMap, showSubmissionSummary]);

  // Timer counter
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (idx: number) => {
    if (!currentQ) return;
    setSelectedOption(idx);

    const isCorrect = idx === currentQ.correctIndex;
    const timeSpent = Math.max(5, Math.round((Date.now() - questionStartTime) / 1000));

    const attempt: QuestionAttempt = {
      questionId: currentQ.id,
      selectedIndex: idx,
      isCorrect,
      timeSpentSeconds: timeSpent,
      timestamp: new Date().toISOString(),
      mode,
    };

    onSaveAttempt(attempt);

    if (mode === 'practice') {
      setShowExplanation(true);
    }
  };

  const toggleFlag = (id: string) => {
    setFlaggedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const answeredInFilter = filteredQuestions.filter((q) => attemptMap.has(q.id)).length;
  const correctInFilter = filteredQuestions.filter(
    (q) => attemptMap.get(q.id)?.isCorrect
  ).length;

  const domainsList: { name: string; count: number }[] = [
    { name: 'All', count: DAILY_100_QUESTIONS.length },
    { name: 'Quantitative Aptitude', count: 20 },
    { name: 'Logical Reasoning', count: 15 },
    { name: 'Verbal & Analytical', count: 10 },
    { name: 'Data Structures', count: 20 },
    { name: 'Algorithms & Complexity', count: 15 },
    { name: 'Code Tracing & Logic', count: 10 },
    { name: 'Industry Scenarios', count: 10 },
  ];

  if (!currentQ) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-slate-400">
        <p>No questions found under this filter.</p>
        <button
          onClick={() => {
            setSelectedDomain('All');
            setMode('practice');
          }}
          className="mt-4 px-4 py-2 bg-slate-800 text-white rounded-lg text-xs"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  const existingAttempt = attemptMap.get(currentQ.id);
  const isAnswered = existingAttempt !== undefined;
  const isFlagged = flaggedIds.has(currentQ.id);
  const isBookmarked = bookmarks.includes(currentQ.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Assessment Controls Bar */}
      <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        {/* Mode Selector */}
        <div className="flex items-center gap-1.5 bg-[#08090B] p-1 rounded-xl border border-slate-800">
          {(
            [
              { id: 'practice', label: 'Practice Mode', hint: 'Instant Feedback' },
              { id: 'challenge', label: 'Challenge Mode', hint: 'Timed Exam' },
              { id: 'revision', label: 'Revision Mode', hint: 'Mistakes / Flags' },
              { id: 'diagnostic', label: 'Diagnostic', hint: '20 Calibration' },
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                mode === m.id
                  ? 'bg-slate-200 text-slate-900 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={m.hint}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Timer and Progress */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#08090B] px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-white font-bold">{formatTimer(timerSeconds)}</span>
            <button
              onClick={() => setIsTimerRunning((prev) => !prev)}
              className="text-[10px] text-slate-500 hover:text-slate-300 underline ml-1"
            >
              {isTimerRunning ? 'Pause' : 'Resume'}
            </button>
          </div>

          <div className="text-xs font-mono text-slate-300">
            <span className="text-white font-bold">{answeredInFilter}</span> / {filteredQuestions.length} Complete
          </div>

          <button
            onClick={() => setShowSubmissionSummary(true)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-200 hover:bg-white text-slate-900 font-bold text-xs flex items-center gap-1.5 shadow"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Finish Set</span>
          </button>
        </div>
      </div>

      {/* Main Assessment Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Question Workspace (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            {/* Question Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#2d3036] pb-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    Q{String(currentIndex + 1).padStart(3, '0')} · {currentQ.id}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {currentQ.domain}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-400">
                    {currentQ.topic}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                    currentQ.difficulty === 'Beginner'
                      ? 'text-emerald-400 border-emerald-800/80 bg-emerald-950/40'
                      : currentQ.difficulty === 'Intermediate'
                      ? 'text-cyan-400 border-cyan-800/80 bg-cyan-950/40'
                      : 'text-amber-400 border-amber-800/80 bg-amber-950/40'
                  }`}>
                    {currentQ.difficulty}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Flag, Bookmark */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleFlag(currentQ.id)}
                  className={`p-2 rounded-lg border text-xs transition-colors ${
                    isFlagged
                      ? 'bg-amber-950/60 border-amber-600 text-amber-300'
                      : 'bg-[#08090B] border-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title="Flag for review"
                >
                  <Flag className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onToggleBookmark(currentQ.id)}
                  className={`p-2 rounded-lg border text-xs transition-colors ${
                    isBookmarked
                      ? 'bg-cyan-950/60 border-cyan-600 text-cyan-300'
                      : 'bg-[#08090B] border-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title="Bookmark question"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Question Text */}
            <div className="text-sm sm:text-base text-[#F2F3F5] font-normal leading-relaxed whitespace-pre-line">
              {currentQ.text}
            </div>

            {/* Optional Code Snippet */}
            {currentQ.codeSnippet && (
              <div className="bg-[#08090B] border border-[#2d3036] rounded-xl p-4 overflow-x-auto font-mono text-xs text-slate-300 leading-relaxed">
                <pre>{currentQ.codeSnippet}</pre>
              </div>
            )}

            {/* Estimated Target Time */}
            <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Target Benchmark: {currentQ.estimatedSeconds}s</span>
              {existingAttempt && (
                <span className="text-slate-500">
                  (You took: {existingAttempt.timeSpentSeconds}s)
                </span>
              )}
            </div>

            {/* 4 Plausible Options */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrectChoice = idx === currentQ.correctIndex;
                const revealMode = mode === 'practice' || showSubmissionSummary;

                let stateClasses = 'bg-[#08090B] border-slate-800 hover:border-slate-600 text-slate-300';

                if (revealMode && existingAttempt) {
                  if (isCorrectChoice) {
                    stateClasses = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-medium';
                  } else if (isSelected && !isCorrectChoice) {
                    stateClasses = 'bg-rose-950/40 border-rose-500 text-rose-200 font-medium';
                  }
                } else if (isSelected) {
                  stateClasses = 'bg-slate-800 border-slate-300 text-white font-medium';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${stateClasses} active:scale-[0.995]`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-xs sm:text-sm pt-0.5 leading-relaxed">{opt}</span>
                    {revealMode && existingAttempt && isCorrectChoice && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-auto mt-1" />
                    )}
                    {revealMode && existingAttempt && isSelected && !isCorrectChoice && (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-auto mt-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Stepper Controls: Prev / Next */}
            <div className="pt-4 flex items-center justify-between border-t border-[#2d3036]">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl bg-[#08090B] border border-slate-800 hover:border-slate-600 disabled:opacity-40 disabled:pointer-events-none text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {mode === 'challenge' && !showExplanation && existingAttempt && (
                <button
                  onClick={() => setShowExplanation(true)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Reveal Explanation</span>
                </button>
              )}

              <button
                onClick={handleNext}
                disabled={currentIndex === filteredQuestions.length - 1}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-white text-slate-900 disabled:opacity-40 disabled:pointer-events-none text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Explanation & Visual Trace Card (Revealed in Practice Mode or Upon Selection) */}
          {showExplanation && (
            <div className="bg-[#17191D] border border-slate-700 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#2d3036] pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-slate-300" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Worked Reasoning Path & Concept Insight
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded">
                  Correct Option: {String.fromCharCode(65 + currentQ.correctIndex)}
                </span>
              </div>

              {/* Step-by-Step Logic Explanation */}
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
                <p>{currentQ.explanation}</p>
              </div>

              {/* Visual Diagram / Trace */}
              {currentQ.visualTrace && (
                <div className="bg-[#08090B] border border-[#2d3036] rounded-xl p-3.5 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                  <span className="text-[10px] text-slate-500 block uppercase mb-1 font-bold">
                    Visual Trace / Logic Pathway:
                  </span>
                  {currentQ.visualTrace}
                </div>
              )}

              {/* Metadata Badges: Interview Relevance & Common Pitfall */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                {currentQ.interviewRelevance && (
                  <div className="p-3 rounded-xl bg-[#08090B] border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">
                      Placement Relevance
                    </span>
                    <p className="text-slate-300">{currentQ.interviewRelevance}</p>
                  </div>
                )}
                {currentQ.commonPitfall && (
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 space-y-1">
                    <span className="text-[10px] text-amber-400 font-mono uppercase block font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Common Pitfall
                    </span>
                    <p className="text-amber-200/90">{currentQ.commonPitfall}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: Navigator & Domain Filters (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Domain Category Filter */}
          <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-4 shadow-lg space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
              <span>Domain Filter</span>
              <Filter className="w-3.5 h-3.5" />
            </div>

            <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
              {domainsList.map((d) => (
                <button
                  key={d.name}
                  onClick={() => {
                    setSelectedDomain(d.name);
                    setCurrentIndex(0);
                  }}
                  className={`w-full px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                    selectedDomain === d.name
                      ? 'bg-slate-200 text-slate-900 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <span className="truncate">{d.name}</span>
                  <span className="font-mono text-[11px] opacity-70">({d.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Question Grid Navigator */}
          <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-4 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-300 font-bold uppercase tracking-wider">
                Question Navigator ({filteredQuestions.length})
              </span>
              <div className="flex items-center gap-2 text-[10px] font-mono">
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Answered
                </span>
                <span className="flex items-center gap-1 text-amber-400">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Flagged
                </span>
              </div>
            </div>

            {/* Jump Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-1.5 max-h-80 overflow-y-auto p-1 bg-[#08090B] rounded-xl border border-slate-800">
              {filteredQuestions.map((q, idx) => {
                const att = attemptMap.get(q.id);
                const hasAnswer = att !== undefined;
                const isCurrent = idx === currentIndex;
                const isFlag = flaggedIds.has(q.id);

                let btnStyle = 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-600';
                if (hasAnswer) {
                  btnStyle = 'bg-slate-700 text-white border-slate-500 font-bold';
                }
                if (isCurrent) {
                  btnStyle = 'ring-2 ring-white bg-slate-200 text-slate-950 font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-lg border text-xs font-mono transition-all relative flex items-center justify-center ${btnStyle}`}
                  >
                    <span>{idx + 1}</span>
                    {isFlag && (
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Submission Confirmation Modal */}
      {showSubmissionSummary && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#17191D] border border-slate-700 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#2d3036] pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Assessment Session Summary
              </h3>
              <button
                type="button"
                onClick={() => setShowSubmissionSummary(false)}
                className="text-slate-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-[#08090B] rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 font-mono uppercase block">Total</span>
                <span className="text-xl font-bold font-mono text-white">{filteredQuestions.length}</span>
              </div>
              <div className="p-3 bg-[#08090B] rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 font-mono uppercase block">Attempted</span>
                <span className="text-xl font-bold font-mono text-cyan-300">{answeredInFilter}</span>
              </div>
              <div className="p-3 bg-[#08090B] rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 font-mono uppercase block">Accuracy</span>
                <span className="text-xl font-bold font-mono text-emerald-400">
                  {answeredInFilter > 0 ? Math.round((correctInFilter / answeredInFilter) * 100) : 0}%
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              All answers and response timings have been autosaved. Your Placement Readiness Index has been updated based on demonstrated performance.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmissionSummary(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Review Answers
              </button>
              {onAssessmentCompleted && (
                <button
                  type="button"
                  onClick={() => {
                    setShowSubmissionSummary(false);
                    onAssessmentCompleted();
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-white text-slate-900 text-xs font-bold shadow"
                >
                  View Updated PRI Score
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
