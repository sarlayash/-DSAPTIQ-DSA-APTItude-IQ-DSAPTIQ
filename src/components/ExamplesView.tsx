import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  CheckCircle2,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Cpu,
  Sparkles,
  AlertTriangle,
  Briefcase,
  Target,
  Check,
  Filter
} from 'lucide-react';
import { SolvedExample, ExampleCategory } from '../types';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
              EXPERIENTIAL LEARNING
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              50 Daily Solved Examples
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Understand Before You Memorize
          </h1>
          <p className="text-xs sm:text-sm text-[#BFC2C9] max-w-2xl leading-relaxed">
            Every example is thoroughly dissected: theoretical concept, visual representation, line-by-line reasoning, common misconceptions, and actual hiring relevance.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="bg-[#08090B] border border-slate-800 px-5 py-3 rounded-xl flex items-center gap-4 shrink-0 font-mono">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block">Understood</span>
            <span className="text-xl font-bold text-emerald-400">
              {understoodList.length} <span className="text-xs text-slate-500 font-normal">/ 50</span>
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
            <Check className="w-5 h-5 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Search and Filters Controls */}
      <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-4 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
          {/* Search Input */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, algorithms, pitfalls..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#08090B] border border-[#414349] text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-slate-300"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-slate-400 font-medium">Difficulty:</span>
            {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  selectedDifficulty === diff
                    ? 'bg-slate-200 text-slate-900 border-white font-bold'
                    : 'bg-[#08090B] text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-t border-[#23262d] pt-3">
          {categories.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelectedCategory(c.name)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                selectedCategory === c.name
                  ? 'bg-slate-200 text-slate-900 font-bold'
                  : 'bg-[#08090B] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{c.name}</span>
              <span className="font-mono text-[10px] opacity-70">({c.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Examples Accordion List */}
      <div className="space-y-4">
        {filteredExamples.length === 0 ? (
          <div className="text-center py-16 bg-[#17191D] border border-[#2d3036] rounded-2xl text-slate-400 space-y-2">
            <p className="text-sm">No examples matched your filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedDifficulty('All');
              }}
              className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs"
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
                className={`bg-[#17191D] border transition-all rounded-2xl shadow-lg overflow-hidden ${
                  isExpanded ? 'border-slate-500 ring-1 ring-slate-600/50' : 'border-[#2d3036] hover:border-slate-600'
                }`}
              >
                {/* Accordion Header */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : ex.id)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none bg-gradient-to-r from-transparent via-slate-800/10 to-transparent"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                        {ex.id}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{ex.category}</span>
                      <span className="text-slate-600">•</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                        ex.difficulty === 'Easy'
                          ? 'text-emerald-400 border-emerald-800/80 bg-emerald-950/40'
                          : ex.difficulty === 'Medium'
                          ? 'text-cyan-400 border-cyan-800/80 bg-cyan-950/40'
                          : 'text-amber-400 border-amber-800/80 bg-amber-950/40'
                      }`}>
                        {ex.difficulty}
                      </span>
                      {isUnderstood && (
                        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/80">
                          <Check className="w-3 h-3" />
                          Understood
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-slate-200">
                      {ex.title}
                    </h3>
                    <p className="text-xs text-[#BFC2C9] line-clamp-1">
                      <strong className="text-slate-300">Core Concept:</strong> {ex.conceptTested}
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
                      className={`p-2 rounded-lg border text-xs transition-colors ${
                        isBookmarked
                          ? 'bg-cyan-950/60 border-cyan-600 text-cyan-300'
                          : 'bg-[#08090B] border-slate-800 text-slate-400 hover:text-white'
                      }`}
                      title="Bookmark example"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <div className="w-8 h-8 rounded-lg bg-[#08090B] border border-slate-800 flex items-center justify-center text-slate-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Worked Solution Body */}
                {isExpanded && (
                  <div className="border-t border-[#2d3036] p-6 sm:p-8 space-y-6 bg-[#121418]/60">
                    {/* 1. Problem Statement */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                        1. Problem Statement
                      </span>
                      <div className="p-4 rounded-xl bg-[#08090B] border border-slate-800 text-sm text-[#F2F3F5] leading-relaxed">
                        {ex.problemStatement}
                      </div>
                    </div>

                    {/* 2. Concept Tested */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                        2. Concept Tested
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {ex.conceptTested}
                      </p>
                    </div>

                    {/* 3. Step-by-Step Reasoning */}
                    <div className="space-y-3">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                        3. Step-by-Step Reasoning Path
                      </span>
                      <div className="space-y-2.5">
                        {ex.steps.map((st) => (
                          <div
                            key={st.stepNumber}
                            className="p-3.5 rounded-xl bg-[#08090B] border border-slate-800 space-y-1"
                          >
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                              <span className="w-5 h-5 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-[10px] text-slate-300">
                                {st.stepNumber}
                              </span>
                              <span>{st.title}</span>
                            </div>
                            <p className="text-xs text-slate-400 pl-7 leading-relaxed">
                              {st.explanation}
                            </p>
                            {st.subCodeOrFormula && (
                              <div className="ml-7 mt-1.5 font-mono text-xs text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 inline-block">
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
                        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                          4. Visual Representation & State Trace
                        </span>
                        <div className="bg-[#08090B] border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                          {ex.visualRepresentation.content}
                        </div>
                      </div>
                    )}

                    {/* 5. Final Answer */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-[#121418] border border-slate-700 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">
                          5. Final Answer
                        </span>
                        <span className="text-sm font-bold text-white font-mono">{ex.finalAnswer}</span>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-700/80 px-3 py-1 rounded-lg">
                        Verified Valid
                      </span>
                    </div>

                    {/* 6. Common Mistake & 7. Placement Relevance */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/50 space-y-1.5">
                        <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 font-mono uppercase">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          6. Common Mistake / Misconception
                        </span>
                        <p className="text-xs text-amber-200/90 leading-relaxed">
                          {ex.commonMistake}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#08090B] border border-slate-800 space-y-1.5">
                        <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 font-mono uppercase">
                          <Briefcase className="w-3.5 h-3.5" />
                          7. Placement & Interview Relevance
                        </span>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {ex.interviewRelevance}
                        </p>
                      </div>
                    </div>

                    {/* 8. Related Practice Challenge & Understood Toggle */}
                    <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#2d3036]">
                      <div className="text-xs text-slate-400 flex items-center gap-2">
                        <Target className="w-4 h-4 text-slate-500 shrink-0" />
                        <span>
                          <strong className="text-slate-300">Related Challenge:</strong> {ex.relatedPracticeChallenge}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onToggleUnderstood(ex.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                          isUnderstood
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700'
                            : 'bg-slate-200 hover:bg-white text-slate-900 shadow'
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
