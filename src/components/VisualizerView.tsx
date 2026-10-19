import React, { useState } from 'react';
import {
  Search,
  Sliders,
  GitFork,
  Network,
  Link as LinkIcon,
  Layers,
  ListOrdered,
  Code2,
  Sparkles,
  Cpu,
  Compass
} from 'lucide-react';
import { SearchesVisualizer } from './visualizer/SearchesVisualizer';
import { SortingVisualizer } from './visualizer/SortingVisualizer';
import { TreeVisualizer } from './visualizer/TreeVisualizer';
import { GraphVisualizer } from './visualizer/GraphVisualizer';
import { LinkedListVisualizer } from './visualizer/LinkedListVisualizer';
import { StackVisualizer } from './visualizer/StackVisualizer';
import { QueueVisualizer } from './visualizer/QueueVisualizer';

type VisualizerCategory =
  | 'searches'
  | 'sorting'
  | 'trees'
  | 'graphs'
  | 'linked_list'
  | 'stacks'
  | 'queues'
  | 'code_trace';

export const VisualizerView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<VisualizerCategory>('searches');

  // ==========================================
  // CODE TRACING LAB STATE
  // ==========================================
  const codeLines = [
    { line: 1, text: 'int sum = 0;' },
    { line: 2, text: 'int[] nums = { 4, 7, 2, 9 };' },
    { line: 3, text: 'for (int i = 0; i < nums.length; i++) {' },
    { line: 4, text: '    if (nums[i] % 2 != 0) {' },
    { line: 5, text: '        sum += nums[i];' },
    { line: 6, text: '    }' },
    { line: 7, text: '}' },
    { line: 8, text: 'print("Odd Sum: " + sum);' },
  ];

  const traceSteps = [
    { line: 1, vars: { sum: 0, i: 'undefined', 'nums[i]': 'undefined' }, desc: 'Initialized variable `sum` to 0 in stack memory.' },
    { line: 2, vars: { sum: 0, nums: '[4, 7, 2, 9]' }, desc: 'Allocated array `nums` of size 4.' },
    { line: 3, vars: { sum: 0, i: 0, 'nums[i]': 4 }, desc: 'Loop start: i = 0. Condition (0 < 4) is TRUE.' },
    { line: 4, vars: { sum: 0, i: 0, 'nums[i]': 4, 'nums[i] % 2': 0 }, desc: 'Evaluate condition (4 % 2 != 0) -> FALSE. Skip odd addition.' },
    { line: 3, vars: { sum: 0, i: 1, 'nums[i]': 7 }, desc: 'Loop increment: i = 1. Condition (1 < 4) is TRUE.' },
    { line: 4, vars: { sum: 0, i: 1, 'nums[i]': 7, 'nums[i] % 2': 1 }, desc: 'Evaluate condition (7 % 2 != 0) -> TRUE! Entering branch.' },
    { line: 5, vars: { sum: 7, i: 1, 'nums[i]': 7 }, desc: 'sum += 7. New sum value = 7.' },
    { line: 3, vars: { sum: 7, i: 2, 'nums[i]': 2 }, desc: 'Loop increment: i = 2. Condition (2 < 4) is TRUE.' },
    { line: 4, vars: { sum: 7, i: 2, 'nums[i]': 2, 'nums[i] % 2': 0 }, desc: 'Evaluate condition (2 % 2 != 0) -> FALSE. Skip.' },
    { line: 3, vars: { sum: 7, i: 3, 'nums[i]': 9 }, desc: 'Loop increment: i = 3. Condition (3 < 4) is TRUE.' },
    { line: 4, vars: { sum: 7, i: 3, 'nums[i]': 9, 'nums[i] % 2': 1 }, desc: 'Evaluate condition (9 % 2 != 0) -> TRUE! Entering branch.' },
    { line: 5, vars: { sum: 16, i: 3, 'nums[i]': 9 }, desc: 'sum += 9. New sum value = 16 (7 + 9).' },
    { line: 3, vars: { sum: 16, i: 4, 'nums[i]': 'OOB' }, desc: 'Loop increment: i = 4. Condition (4 < 4) is FALSE. Loop breaks!' },
    { line: 8, vars: { sum: 16 }, desc: 'Final print executed. Output console: "Odd Sum: 16".' },
  ];

  const [traceStepIdx, setTraceStepIdx] = useState<number>(0);
  const activeTrace = traceSteps[traceStepIdx];

  const visualizerTabs: {
    id: VisualizerCategory;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge: string;
    description: string;
  }[] = [
    {
      id: 'searches',
      label: 'Searches',
      icon: Search,
      badge: 'Binary · Linear · Jump',
      description: 'Divide-and-conquer, midpoint elimination & interval jumping',
    },
    {
      id: 'sorting',
      label: 'Sorting Lab',
      icon: Sliders,
      badge: 'Bubble · Quick · Merge',
      description: 'Comparison passes, partitioning & divide-and-conquer buffers',
    },
    {
      id: 'trees',
      label: 'Trees (BST)',
      icon: GitFork,
      badge: 'Insert · Traversals',
      description: 'Binary Search Tree, In-Order, Pre-Order, Post-Order, BFS',
    },
    {
      id: 'graphs',
      label: 'Graphs Lab',
      icon: Network,
      badge: 'BFS & DFS',
      description: 'FIFO Queue & LIFO Stack discovery frontiers, network edges',
    },
    {
      id: 'linked_list',
      label: 'Linked Lists',
      icon: LinkIcon,
      badge: 'Singly · Doubly',
      description: 'Head/tail pointers, dynamic re-linking & 3-pointer reverse',
    },
    {
      id: 'stacks',
      label: 'Stacks (LIFO)',
      icon: Layers,
      badge: 'Push · Pop · Peek',
      description: 'Top pointers, overflow guards & compiler bracket validator',
    },
    {
      id: 'queues',
      label: 'Queues (FIFO)',
      icon: ListOrdered,
      badge: 'Linear · Circular',
      description: 'Front & rear bounds, circular buffers & CPU task scheduling',
    },
    {
      id: 'code_trace',
      label: 'Code Tracing',
      icon: Code2,
      badge: 'Line-by-Line',
      description: 'Loop invariant stepper, stack watch table & memory state',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 select-none">
      {/* Studio Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-extrabold tracking-widest text-red-600 uppercase">
              STUDIO LABORATORY
            </span>
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
              Interactive Cognitive Engine
            </span>
            <span className="text-[11px] font-mono font-extrabold px-2 py-0.5 rounded bg-red-50 text-red-600 border border-red-200">
              8 Full Visualizers
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight">
            Data Structure &amp; Algorithm Visualizer Studio
          </h1>
          <p className="text-xs sm:text-sm text-blue-900/80 max-w-2xl leading-relaxed">
            Turn abstract code into visual step movements. Inspect runtime memory, pointer shifts, and algorithm invariants rather than just watching a passive animation.
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-mono text-blue-950">
          <div className="text-right">
            <span className="text-blue-800/80 block text-[10px] font-semibold">COVERAGE</span>
            <span className="text-red-600 font-extrabold">100% Industry DSA</span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-right">
            <span className="text-blue-800/80 block text-[10px] font-semibold">MODES</span>
            <span className="text-blue-950 font-extrabold">Step &amp; Autoplay</span>
          </div>
        </div>
      </div>

      {/* Main Category Navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        {visualizerTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center text-center p-3 rounded-xl transition-all duration-200 relative group cursor-pointer ${
                isActive
                  ? 'bg-blue-950 text-white font-bold shadow-xs ring-1 ring-blue-900 scale-[1.02]'
                  : 'bg-slate-50 text-blue-900/80 hover:text-blue-950 hover:bg-blue-50/60 border border-slate-200'
              }`}
            >
              <Icon
                className={`w-5 h-5 mb-1.5 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-red-400' : 'text-blue-900 group-hover:text-red-600'
                }`}
              />
              <span className="text-xs font-bold leading-tight line-clamp-1">{tab.label}</span>
              <span
                className={`text-[9px] font-mono mt-1 px-1.5 py-0.5 rounded transition-colors font-bold ${
                  isActive
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-blue-900 border border-slate-200'
                }`}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          ACTIVE VISUALIZER MODULE RENDER
          ========================================================================= */}
      {activeTab === 'searches' && <SearchesVisualizer />}

      {activeTab === 'sorting' && <SortingVisualizer />}

      {activeTab === 'trees' && <TreeVisualizer />}

      {activeTab === 'graphs' && <GraphVisualizer />}

      {activeTab === 'linked_list' && <LinkedListVisualizer />}

      {activeTab === 'stacks' && <StackVisualizer />}

      {activeTab === 'queues' && <QueueVisualizer />}

      {/* =========================================================================
          MODULE 8: CODE TRACING LAB
          ========================================================================= */}
      {activeTab === 'code_trace' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-blue-950 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-red-600" />
                Line-by-Line Code Tracing Lab
              </h2>
              <p className="text-xs text-blue-900/80 mt-0.5">
                Step through iterative loop execution with live variable state inspection and output console.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                onClick={() => setTraceStepIdx(0)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-blue-950 border border-slate-200 font-bold cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => setTraceStepIdx((prev) => Math.max(0, prev - 1))}
                disabled={traceStepIdx === 0}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-blue-950 border border-slate-200 font-bold cursor-pointer"
              >
                Prev
              </button>
              <button
                onClick={() => setTraceStepIdx((prev) => Math.min(traceSteps.length - 1, prev + 1))}
                disabled={traceStepIdx >= traceSteps.length - 1}
                className="px-4 py-1.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold shadow-xs cursor-pointer"
              >
                Next Step
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Code Editor Preview (7 cols) */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-4 font-mono text-xs overflow-x-auto space-y-1">
              <div className="text-[10px] text-blue-800 font-bold uppercase pb-2 border-b border-slate-200">
                Source: OddNumbersSum.java
              </div>
              {codeLines.map((l) => {
                const isActive = l.line === activeTrace.line;
                return (
                  <div
                    key={l.line}
                    className={`flex items-center gap-3 px-2 py-1.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-blue-950 font-bold border-l-4 border-red-600 pl-3'
                        : 'text-blue-900/80'
                    }`}
                  >
                    <span className="w-5 text-right text-blue-800/60 select-none font-bold">{l.line}</span>
                    <pre className="text-xs">{l.text}</pre>
                  </div>
                );
              })}
            </div>

            {/* Live Variable Watch Table & Output (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Watch Table */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="text-xs font-mono font-bold text-blue-950 uppercase tracking-wider flex items-center justify-between border-b border-slate-200 pb-2">
                  <span>Variable Watch Table</span>
                  <span className="text-[10px] text-red-600 font-bold">Stack Scope</span>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  {Object.entries(activeTrace.vars).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                      <span className="text-blue-900 font-semibold">{k}</span>
                      <span className="text-red-600 font-extrabold">{String(v)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Explanation */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 space-y-1.5 font-mono text-xs">
                <span className="text-[10px] text-blue-950 uppercase block font-extrabold">
                  Runtime Step Explanation:
                </span>
                <p className="text-blue-900 leading-relaxed font-medium">{activeTrace.desc}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
