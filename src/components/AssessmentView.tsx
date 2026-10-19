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
  Sparkles,
  Send,
  Eye,
  RotateCcw
} from 'lucide-react';
import { Question, QuestionAttempt, AssessmentMode } from '../types';
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
      // Diagnostic mode: 20 balanced calibration questions
      list = DAILY_100_QUESTIONS.slice(0, 20);
    } else if (mode === 'revision') {
      // Revision mode: only previously missed or bookmarked
      const missedIds = new Set(attempts.filter((a) => !a.isCorrect).map((a) => a.questionId));
      list = DAILY_100_QUESTIONS.filter(
        (q) => missedIds.has(q.id) || bookmarks.includes(q.id)
      );
      if (list.length === 0) {
        list = DAILY_100_QUESTIONS.slice(0, 10);
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
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-blue-900 bg-white border border-slate-200 rounded-2xl shadow-xs">
        <p className="text-sm font-semibold">No questions found under this filter criteria.</p>
        <button
          onClick={() => {
            setSelectedDomain('All');
            setMode('practice');
          }}
          className="mt-4 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  const existingAttempt = attemptMap.get(currentQ.id);
  const isFlagged = flaggedIds.has(currentQ.id);
  const isBookmarked = bookmarks.includes(currentQ.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 select-none">
      {/* Assessment Controls Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        {/* Mode Selector */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-blue-100">
          {(
            [
              { id: 'practice', label: 'Practice Mode', hint: 'Instant Explanations' },
              { id: 'challenge', label: 'Challenge Mode', hint: 'Timed Simulation' },
              { id: 'revision', label: 'Revision Mode', hint: 'Mistakes & Bookmarks' },
              { id: 'diagnostic', label: 'Diagnostic', hint: '20 Calibration Questions' },
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === m.id
                  ? 'bg-blue-900 text-white font-bold shadow-2xs'
                  : 'text-blue-900 hover:text-blue-950 hover:bg-blue-100/60'
              }`}
              title={m.hint}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Timer and Progress */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-blue-100 text-xs font-mono">
            <Clock className="w-3.5 h-3.5 text-blue-900" />
            <span className="text-red-600 font-extrabold">{formatTimer(timerSeconds)}</span>
            <button
              onClick={() => setIsTimerRunning((prev) => !prev)}
              className="text-[10px] text-blue-800 hover:text-blue-950 underline ml-1 cursor-pointer"
            >
              {isTimerRunning ? 'Pause' : 'Resume'}
            </button>
          </div>

          <div className="text-xs font-mono text-blue-900">
            <span className="text-blue-950 font-extrabold">{answeredInFilter}</span> / {filteredQuestions.length} Answered
          </div>

          <button
            onClick={() => setShowSubmissionSummary(true)}
            className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
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
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            {/* Question Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-extrabold text-blue-950 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                    Q{String(currentIndex + 1).padStart(3, '0')} · {currentQ.id}
                  </span>
                  <span className="text-xs text-blue-900 font-bold">
                    {currentQ.domain}
                  </span>
                  <span className="text-blue-300">•</span>
                  <span className="text-xs text-blue-800">
                    {currentQ.topic}
                  </span>
                  <span className="text-blue-300">•</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                    currentQ.difficulty === 'Beginner'
                      ? 'text-blue-800 border-blue-200 bg-blue-50'
                      : currentQ.difficulty === 'Intermediate'
                      ? 'text-blue-900 border-blue-300 bg-blue-100'
                      : 'text-red-700 border-red-200 bg-red-50'
                  }`}>
                    {currentQ.difficulty}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Flag, Bookmark */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleFlag(currentQ.id)}
                  className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
                    isFlagged
                      ? 'bg-red-50 border-red-300 text-red-600'
                      : 'bg-white border-slate-200 text-blue-800 hover:text-blue-950 hover:bg-blue-50'
                  }`}
                  title="Flag for review"
                  aria-label="Flag question"
                >
                  <Flag className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onToggleBookmark(currentQ.id)}
                  className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
                    isBookmarked
                      ? 'bg-blue-100 border-blue-400 text-blue-950'
                      : 'bg-white border-slate-200 text-blue-800 hover:text-blue-950 hover:bg-blue-50'
                  }`}
                  title="Bookmark question"
                  aria-label="Bookmark question"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Question Text */}
            <div className="text-sm sm:text-base text-blue-950 font-medium leading-relaxed whitespace-pre-line">
              {currentQ.text}
            </div>

            {/* Optional Code Snippet */}
            {currentQ.codeSnippet && (
              <div className="bg-blue-950 border border-blue-900 rounded-xl p-4 overflow-x-auto font-mono text-xs text-blue-100 leading-relaxed shadow-xs">
                <pre>{currentQ.codeSnippet}</pre>
              </div>
            )}

            {/* Estimated Target Time */}
            <div className="text-[11px] text-blue-800 font-mono flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-900" />
              <span>Target Benchmark: {currentQ.estimatedSeconds}s</span>
              {existingAttempt && (
                <span className="text-red-600 font-semibold">
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

                let stateClasses = 'bg-white border-slate-200 hover:border-blue-400 text-blue-950 hover:bg-blue-50/40';

                if (revealMode && existingAttempt) {
                  if (isCorrectChoice) {
                    stateClasses = 'bg-blue-50 border-blue-600 text-blue-950 font-bold shadow-2xs';
                  } else if (isSelected && !isCorrectChoice) {
                    stateClasses = 'bg-red-50 border-red-500 text-red-700 font-bold shadow-2xs';
                  }
                } else if (isSelected) {
                  stateClasses = 'bg-blue-50 border-blue-700 text-blue-950 font-bold shadow-xs';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${stateClasses} active:scale-[0.995]`}
                  >
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs font-extrabold shrink-0 ${
                      isSelected ? 'bg-blue-900 text-white' : 'bg-slate-100 text-blue-900 border border-blue-100'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-xs sm:text-sm pt-0.5 leading-relaxed font-medium">{opt}</span>
                    {revealMode && existingAttempt && isCorrectChoice && (
                      <CheckCircle2 className="w-4 h-4 text-blue-900 shrink-0 ml-auto mt-1" />
                    )}
                    {revealMode && existingAttempt && isSelected && !isCorrectChoice && (
                      <XCircle className="w-4 h-4 text-red-600 shrink-0 ml-auto mt-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Stepper Controls: Prev / Next */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 disabled:opacity-40 disabled:pointer-events-none text-xs font-bold text-blue-900 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {mode === 'challenge' && !showExplanation && existingAttempt && (
                <button
                  onClick={() => setShowExplanation(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-950 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-900" />
                  <span>Reveal Explanation</span>
                </button>
              )}

              <button
                onClick={handleNext}
                disabled={currentIndex === filteredQuestions.length - 1}
                className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white disabled:opacity-40 disabled:pointer-events-none text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Explanation & Visual Trace Card */}
          {showExplanation && (
            <div className="bg-white border border-blue-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-blue-100 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-red-600" />
                  <h3 className="text-sm font-extrabold text-blue-950 uppercase tracking-wider">
                    Worked Reasoning Path & Concept Insight
                  </h3>
                </div>
                <span className="text-[11px] font-mono font-extrabold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                  Correct Answer: {String.fromCharCode(65 + currentQ.correctIndex)}
                </span>
              </div>

              {/* Step-by-Step Logic Explanation */}
              <div className="text-xs sm:text-sm text-blue-950 leading-relaxed space-y-2">
                <p>{currentQ.explanation}</p>
              </div>

              {/* Visual Diagram / Trace */}
              {currentQ.visualTrace && (
                <div className="bg-slate-50 border border-blue-100 rounded-xl p-3.5 font-mono text-xs text-blue-950 whitespace-pre-wrap leading-relaxed">
                  <span className="text-[10px] text-blue-800 block uppercase mb-1 font-bold">
                    Visual Trace / Logic Pathway:
                  </span>
                  {currentQ.visualTrace}
                </div>
              )}

              {/* Metadata Badges: Interview Relevance & Common Pitfall */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                {currentQ.interviewRelevance && (
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                    <span className="text-[10px] text-blue-900 font-mono uppercase block font-extrabold">
                      Placement Relevance
                    </span>
                    <p className="text-blue-950 font-medium">{currentQ.interviewRelevance}</p>
                  </div>
                )}
                {currentQ.commonPitfall && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 space-y-1">
                    <span className="text-[10px] text-red-700 font-mono uppercase block font-extrabold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                      Common Pitfall
                    </span>
                    <p className="text-red-800 font-medium">{currentQ.commonPitfall}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: Navigator & Domain Filters (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Domain Category Filter */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs text-blue-900 font-bold uppercase tracking-wider">
              <span>Domain Filter</span>
              <Filter className="w-3.5 h-3.5 text-blue-800" />
            </div>

            <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
              {domainsList.map((d) => (
                <button
                  key={d.name}
                  onClick={() => {
                    setSelectedDomain(d.name);
                    setCurrentIndex(0);
                  }}
                  className={`w-full px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    selectedDomain === d.name
                      ? 'bg-blue-900 text-white font-bold shadow-2xs'
                      : 'text-blue-900 hover:text-blue-950 hover:bg-blue-50 font-medium'
                  }`}
                >
                  <span className="truncate">{d.name}</span>
                  <span className="font-mono text-[11px] opacity-80">({d.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Question Grid Navigator */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-950 font-extrabold uppercase tracking-wider">
                Question Navigator ({filteredQuestions.length})
              </span>
              <div className="flex items-center gap-2 text-[10px] font-mono">
                <span className="flex items-center gap-1 text-blue-900 font-bold">
                  <span className="w-2 h-2 rounded-full bg-blue-900" />
                  Answered
                </span>
                <span className="flex items-center gap-1 text-red-600 font-bold">
                  <span className="w-2 h-2 rounded-full bg-red-600" />
                  Flagged
                </span>
              </div>
            </div>

            {/* Jump Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-1.5 max-h-80 overflow-y-auto p-1.5 bg-slate-50 rounded-xl border border-slate-200">
              {filteredQuestions.map((q, idx) => {
                const att = attemptMap.get(q.id);
                const hasAnswer = att !== undefined;
                const isCurrent = idx === currentIndex;
                const isFlag = flaggedIds.has(q.id);

                let btnStyle = 'bg-white text-blue-900 border-slate-200 hover:border-blue-400 font-semibold';
                if (hasAnswer) {
                  btnStyle = 'bg-blue-100 text-blue-950 border-blue-300 font-bold';
                }
                if (isCurrent) {
                  btnStyle = 'ring-2 ring-red-600 bg-blue-900 text-white font-extrabold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-lg border text-xs font-mono transition-all relative flex items-center justify-center cursor-pointer ${btnStyle}`}
                  >
                    <span>{idx + 1}</span>
                    {isFlag && (
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-600" />
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
        <div className="fixed inset-0 z-50 bg-blue-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-extrabold text-blue-950 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-900" />
                Assessment Session Summary
              </h3>
              <button
                type="button"
                onClick={() => setShowSubmissionSummary(false)}
                className="text-blue-900 hover:text-red-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-slate-50 rounded-xl border border-blue-100">
                <span className="text-[10px] text-blue-800 font-mono uppercase block font-semibold">Total</span>
                <span className="text-xl font-bold font-mono text-blue-950">{filteredQuestions.length}</span>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                <span className="text-[10px] text-blue-800 font-mono uppercase block font-semibold">Attempted</span>
                <span className="text-xl font-bold font-mono text-blue-900">{answeredInFilter}</span>
              </div>
              <div className="p-3 bg-red-50 rounded-xl border border-red-200">
                <span className="text-[10px] text-red-700 font-mono uppercase block font-semibold">Accuracy</span>
                <span className="text-xl font-bold font-mono text-red-600">
                  {answeredInFilter > 0 ? Math.round((correctInFilter / answeredInFilter) * 100) : 0}%
                </span>
              </div>
            </div>

            <p className="text-xs text-blue-900 leading-relaxed font-medium">
              All answers and response timings have been autosaved. Your Placement Readiness Index (PRI) has been calibrated based on demonstrated problem solving speed and accuracy.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmissionSummary(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-blue-950 text-xs font-bold transition-colors cursor-pointer"
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
                  className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
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
