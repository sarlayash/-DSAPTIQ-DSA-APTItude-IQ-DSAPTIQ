import React, { useState, useMemo } from 'react';
import {
  Search,
  Check,
  Bookmark,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Briefcase,
  Target
} from 'lucide-react';
import { DAILY_50_SOLVED_EXAMPLES } from '../data/solvedExamples';

interface ExamplesViewProps {
  understoodList: string[];
  onToggleUnderstood: (id: string) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
}

export const ExamplesView: React.FC<ExamplesViewProps> = ({
  understoodList,
  onToggleUnderstood,
  bookmarks,
  onToggleBookmark,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>('EX01');

  const categories: { name: string; count: number }[] = [
    { name: 'All', count: DAILY_50_SOLVED_EXAMPLES.length },
    { name: 'Quantitative Aptitude', count: 12 },
    { name: 'Logical Reasoning', count: 8 },
    { name: 'Verbal & Analytical', count: 5 },
    { name: 'Data Structures', count: 10 },
    { name: 'Algorithms', count: 8 },
    { name: 'Code Tracing & Complexity', count: 5 },
    { name: 'Industry Scenarios', count: 2 },
  ];

  const filteredExamples = useMemo(() => {
    return DAILY_50_SOLVED_EXAMPLES.filter((ex) => {
      const matchesSearch =
        ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.conceptTested.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.problemStatement.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || ex.category === selectedCategory;
      const matchesDiff =
        selectedDifficulty === 'All' || ex.difficulty === selectedDifficulty;
      return matchesSearch && matchesCategory && matchesDiff;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 select-none">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-widest text-blue-900 uppercase">
              EXPERIENTIAL LEARNING
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-red-50 text-red-600 border border-red-200 font-bold">
              50 Solved Case Studies
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight">
            Understand Before You Memorize
          </h1>
          <p className="text-xs sm:text-sm text-blue-900 max-w-2xl leading-relaxed font-medium">
            Every case is thoroughly dissected through 8 distinct pedagogical pillars: theoretical principle, visual trace, step-by-step reasoning, common pitfall analysis, and Fortune 500 interview relevance.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="bg-slate-50 border border-blue-200 px-5 py-3 rounded-xl flex items-center gap-4 shrink-0 font-mono">
          <div>
            <span className="text-[10px] text-blue-800 uppercase block font-bold">Understood</span>
            <span className="text-xl font-extrabold text-red-600">
              {understoodList.length} <span className="text-xs text-blue-900 font-normal">/ 50</span>
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center shadow-xs">
            <Check className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Search and Filters Controls */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
          {/* Search Input */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-blue-800 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, algorithms, pitfalls..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-blue-950 placeholder:text-blue-800/60 focus:outline-none focus:border-blue-400 font-medium"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-blue-900 font-bold">Difficulty:</span>
            {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                  selectedDifficulty === diff
                    ? 'bg-blue-900 text-white border-blue-900 font-bold shadow-2xs'
                    : 'bg-white text-blue-900 border-slate-200 hover:bg-blue-50'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-t border-slate-100 pt-3">
          {categories.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelectedCategory(c.name)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === c.name
                  ? 'bg-blue-900 text-white font-bold shadow-2xs'
                  : 'bg-white text-blue-900 hover:bg-blue-50 border border-slate-200'
              }`}
            >
              <span>{c.name}</span>
              <span className="font-mono text-[10px] opacity-80">({c.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Examples Accordion List */}
      <div className="space-y-4">
        {filteredExamples.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl text-blue-900 space-y-2 shadow-xs">
            <p className="text-sm font-semibold">No case studies matched your filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedDifficulty('All');
              }}
              className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filteredExamples.map((ex) => {
            const isExpanded = expandedId === ex.id;
            const isUnderstood = understoodList.includes(ex.id);
            const isBookmarked = bookmarks.includes(ex.id);

            return (
              <div
                key={ex.id}
                className={`bg-white border transition-all rounded-2xl shadow-xs overflow-hidden ${
                  isExpanded ? 'border-blue-400 ring-1 ring-blue-400/40' : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                {/* Accordion Header */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : ex.id)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none bg-white hover:bg-blue-50/30 transition-colors"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-950 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {ex.id}
                      </span>
                      <span className="text-xs text-blue-900 font-bold">{ex.category}</span>
                      <span className="text-blue-300">•</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                        ex.difficulty === 'Easy'
                          ? 'text-blue-800 border-blue-200 bg-blue-50'
                          : ex.difficulty === 'Medium'
                          ? 'text-blue-900 border-blue-300 bg-blue-100'
                          : 'text-red-700 border-red-200 bg-red-50'
                      }`}>
                        {ex.difficulty}
                      </span>
                      {isUnderstood && (
                        <span className="text-[10px] font-mono text-blue-900 font-bold flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          <Check className="w-3 h-3 text-blue-900" />
                          Understood
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-blue-950">
                      {ex.title}
                    </h3>
                    <p className="text-xs text-blue-900 line-clamp-1 font-medium">
                      <strong className="text-blue-950">Core Concept:</strong> {ex.conceptTested}
                    </p>
                  </div>

                  {/* Actions & Chevron */}
                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(ex.id);
                      }}
                      className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
                        isBookmarked
                          ? 'bg-blue-100 border-blue-400 text-blue-950'
                          : 'bg-white border-slate-200 text-blue-800 hover:text-blue-950 hover:bg-blue-50'
                      }`}
                      title="Bookmark case study"
                      aria-label="Bookmark case study"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-blue-900">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Worked Solution Body */}
                {isExpanded && (
                  <div className="border-t border-slate-100 p-6 sm:p-8 space-y-6 bg-slate-50/50">
                    {/* 1. Problem Statement */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono text-blue-900 uppercase tracking-wider block font-bold">
                        1. Problem Statement
                      </span>
                      <div className="p-4 rounded-xl bg-white border border-slate-200 text-sm text-blue-950 leading-relaxed font-medium shadow-2xs">
                        {ex.problemStatement}
                      </div>
                    </div>

                    {/* 2. Concept Tested */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono text-blue-900 uppercase tracking-wider block font-bold">
                        2. Concept Tested
                      </span>
                      <p className="text-xs text-blue-950 leading-relaxed font-medium">
                        {ex.conceptTested}
                      </p>
                    </div>

                    {/* 3. Step-by-Step Reasoning */}
                    <div className="space-y-3">
                      <span className="text-[11px] font-mono text-blue-900 uppercase tracking-wider block font-bold">
                        3. Step-by-Step Reasoning Path
                      </span>
                      <div className="space-y-2.5">
                        {ex.steps.map((st) => (
                          <div
                            key={st.stepNumber}
                            className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 shadow-2xs"
                          >
                            <div className="flex items-center gap-2 text-xs font-bold text-blue-950">
                              <span className="w-5 h-5 rounded-md bg-blue-900 text-white flex items-center justify-center font-mono text-[10px]">
                                {st.stepNumber}
                              </span>
                              <span>{st.title}</span>
                            </div>
                            <p className="text-xs text-blue-900 pl-7 leading-relaxed font-medium">
                              {st.explanation}
                            </p>
                            {st.subCodeOrFormula && (
                              <div className="ml-7 mt-1.5 font-mono text-xs text-blue-100 bg-blue-950 px-2.5 py-1 rounded-md border border-blue-900 inline-block">
                                {st.subCodeOrFormula}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 4. Visual Representation */}
                    {ex.visualRepresentation && (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-mono text-blue-900 uppercase tracking-wider block font-bold">
                          4. Visual Representation & State Trace
                        </span>
                        <div className="bg-white border border-slate-200 rounded-xl p-4 font-mono text-xs text-blue-950 whitespace-pre-wrap leading-relaxed overflow-x-auto shadow-2xs">
                          {ex.visualRepresentation.content}
                        </div>
                      </div>
                    )}

                    {/* 5. Final Answer */}
                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-blue-800 uppercase block font-bold">
                          5. Final Answer
                        </span>
                        <span className="text-sm font-extrabold text-blue-950 font-mono">{ex.finalAnswer}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-lg">
                        Verified Valid
                      </span>
                    </div>

                    {/* 6. Common Mistake & 7. Placement Relevance */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-red-50 border border-red-200 space-y-1.5">
                        <span className="text-xs font-bold text-red-700 flex items-center gap-1.5 font-mono uppercase">
                          <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                          6. Common Mistake / Misconception
                        </span>
                        <p className="text-xs text-red-800 leading-relaxed font-medium">
                          {ex.commonMistake}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1.5">
                        <span className="text-xs font-bold text-blue-950 flex items-center gap-1.5 font-mono uppercase">
                          <Briefcase className="w-3.5 h-3.5 text-blue-900" />
                          7. Placement & Interview Relevance
                        </span>
                        <p className="text-xs text-blue-950 leading-relaxed font-medium">
                          {ex.interviewRelevance}
                        </p>
                      </div>
                    </div>

                    {/* 8. Related Practice Challenge & Understood Toggle */}
                    <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-200">
                      <div className="text-xs text-blue-900 flex items-center gap-2 font-medium">
                        <Target className="w-4 h-4 text-red-600 shrink-0" />
                        <span>
                          <strong className="text-blue-950">Related Challenge:</strong> {ex.relatedPracticeChallenge}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onToggleUnderstood(ex.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                          isUnderstood
                            ? 'bg-blue-100 text-blue-950 border border-blue-300'
                            : 'bg-blue-900 hover:bg-blue-800 text-white shadow-xs'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{isUnderstood ? 'Marked as Understood' : 'Mark as Understood'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
