import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  SlidersHorizontal,
  ArrowRight
} from 'lucide-react';

type SearchAlgorithm = 'binary' | 'linear' | 'jump';

interface SearchStep {
  arr: number[];
  currentIndex: number;
  low?: number;
  high?: number;
  mid?: number;
  jumpBlocks?: { start: number; end: number };
  status: 'searching' | 'found' | 'not_found';
  log: string;
  comparisons: number;
}

export const SearchesVisualizer: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<SearchAlgorithm>('binary');
  const [arrayStr, setArrayStr] = useState<string>('3, 8, 14, 21, 29, 35, 42, 57, 68, 79, 88, 95');
  const [array, setArray] = useState<number[]>([3, 8, 14, 21, 29, 35, 42, 57, 68, 79, 88, 95]);
  const [target, setTarget] = useState<number>(35);
  const [customTargetInput, setCustomTargetInput] = useState<string>('35');

  const [steps, setSteps] = useState<SearchStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000); // ms per step

  // Generate steps based on chosen algorithm, array, and target
  useEffect(() => {
    const parsed = arrayStr
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));

    // Sort if binary or jump search
    let workingArr = parsed.length > 0 ? parsed : [3, 8, 14, 21, 29, 35, 42, 57, 68, 79, 88, 95];
    if (algorithm === 'binary' || algorithm === 'jump') {
      workingArr = [...workingArr].sort((a, b) => a - b);
    }
    setArray(workingArr);

    const generatedSteps: SearchStep[] = [];

    if (algorithm === 'linear') {
      // Linear Search
      let comparisons = 0;
      let found = false;
      generatedSteps.push({
        arr: [...workingArr],
        currentIndex: -1,
        status: 'searching',
        log: `Starting Linear Search for target ${target} from index 0 across ${workingArr.length} elements.`,
        comparisons: 0,
      });

      for (let i = 0; i < workingArr.length; i++) {
        comparisons++;
        if (workingArr[i] === target) {
          generatedSteps.push({
            arr: [...workingArr],
            currentIndex: i,
            status: 'found',
            log: `Match Found! Element at index ${i} (${workingArr[i]}) equals target ${target} after ${comparisons} comparison(s).`,
            comparisons,
          });
          found = true;
          break;
        } else {
          generatedSteps.push({
            arr: [...workingArr],
            currentIndex: i,
            status: 'searching',
            log: `Checking index ${i}: arr[${i}] = ${workingArr[i]} ≠ target ${target}. Advancing to index ${i + 1}.`,
            comparisons,
          });
        }
      }

      if (!found) {
        generatedSteps.push({
          arr: [...workingArr],
          currentIndex: -1,
          status: 'not_found',
          log: `End of array reached without finding target ${target}. Total comparisons: ${comparisons}.`,
          comparisons,
        });
      }
    } else if (algorithm === 'binary') {
      // Binary Search
      let l = 0;
      let r = workingArr.length - 1;
      let comparisons = 0;

      generatedSteps.push({
        arr: [...workingArr],
        currentIndex: -1,
        low: l,
        high: r,
        mid: Math.floor((l + r) / 2),
        status: 'searching',
        log: `Monotonically sorted array initialized. Search interval: [${l} .. ${r}]. Target: ${target}.`,
        comparisons: 0,
      });

      let found = false;
      while (l <= r) {
        const m = Math.floor(l + (r - l) / 2);
        comparisons++;

        if (workingArr[m] === target) {
          generatedSteps.push({
            arr: [...workingArr],
            currentIndex: m,
            low: l,
            high: r,
            mid: m,
            status: 'found',
            log: `Midpoint arr[${m}] = ${workingArr[m]} equals target ${target}! Search succeeded in ${comparisons} steps.`,
            comparisons,
          });
          found = true;
          break;
        } else if (workingArr[m] < target) {
          generatedSteps.push({
            arr: [...workingArr],
            currentIndex: m,
            low: l,
            high: r,
            mid: m,
            status: 'searching',
            log: `arr[${m}] = ${workingArr[m]} < target ${target}. Target must be in right half. Setting low = mid + 1 (${m + 1}).`,
            comparisons,
          });
          l = m + 1;
        } else {
          generatedSteps.push({
            arr: [...workingArr],
            currentIndex: m,
            low: l,
            high: r,
            mid: m,
            status: 'searching',
            log: `arr[${m}] = ${workingArr[m]} > target ${target}. Target must be in left half. Setting high = mid - 1 (${m - 1}).`,
            comparisons,
          });
          r = m - 1;
        }
      }

      if (!found) {
        generatedSteps.push({
          arr: [...workingArr],
          currentIndex: -1,
          low: l,
          high: r,
          mid: -1,
          status: 'not_found',
          log: `Interval inverted (low ${l} > high ${r}). Target ${target} not present in array. Comparisons: ${comparisons}.`,
          comparisons,
        });
      }
    } else if (algorithm === 'jump') {
      // Jump Search (Block Size m = sqrt(N))
      const n = workingArr.length;
      const stepSize = Math.max(1, Math.floor(Math.sqrt(n)));
      let prev = 0;
      let comparisons = 0;
      let step = stepSize;

      generatedSteps.push({
        arr: [...workingArr],
        currentIndex: 0,
        jumpBlocks: { start: 0, end: Math.min(step, n) - 1 },
        status: 'searching',
        log: `Jump Search initiated with block size m = √(${n}) ≈ ${stepSize}. Checking block boundaries.`,
        comparisons: 0,
      });

      while (workingArr[Math.min(step, n) - 1] < target) {
        comparisons++;
        generatedSteps.push({
          arr: [...workingArr],
          currentIndex: Math.min(step, n) - 1,
          jumpBlocks: { start: prev, end: Math.min(step, n) - 1 },
          status: 'searching',
          log: `Block boundary arr[${Math.min(step, n) - 1}] = ${workingArr[Math.min(step, n) - 1]} < target ${target}. Jumping ahead by ${stepSize}.`,
          comparisons,
        });
        prev = step;
        step += stepSize;
        if (prev >= n) break;
      }

      // Linear scan within the block
      let found = false;
      const blockEnd = Math.min(step, n);
      generatedSteps.push({
        arr: [...workingArr],
        currentIndex: prev,
        jumpBlocks: { start: prev, end: blockEnd - 1 },
        status: 'searching',
        log: `Target is bounded within interval [${prev} .. ${blockEnd - 1}]. Executing linear scan in block.`,
        comparisons,
      });

      for (let i = prev; i < blockEnd; i++) {
        comparisons++;
        if (workingArr[i] === target) {
          generatedSteps.push({
            arr: [...workingArr],
            currentIndex: i,
            jumpBlocks: { start: prev, end: blockEnd - 1 },
            status: 'found',
            log: `Target ${target} discovered at index ${i} within block! Total comparisons: ${comparisons}.`,
            comparisons,
          });
          found = true;
          break;
        } else {
          generatedSteps.push({
            arr: [...workingArr],
            currentIndex: i,
            jumpBlocks: { start: prev, end: blockEnd - 1 },
            status: 'searching',
            log: `Scanning block at index ${i}: arr[${i}] = ${workingArr[i]} ≠ ${target}.`,
            comparisons,
          });
        }
      }

      if (!found) {
        generatedSteps.push({
          arr: [...workingArr],
          currentIndex: -1,
          status: 'not_found',
          log: `Target ${target} not found after completing block scan. Total comparisons: ${comparisons}.`,
          comparisons,
        });
      }
    }

    setSteps(generatedSteps);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [algorithm, arrayStr, target]);

  // Autoplay handler
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length, speed]);

  const activeStep = steps[currentStepIdx] || steps[0] || {
    arr: array,
    currentIndex: -1,
    status: 'searching',
    log: 'Initializing visual search engine...',
    comparisons: 0,
  };

  const handleApplyCustomTarget = () => {
    const parsed = parseInt(customTargetInput, 10);
    if (!isNaN(parsed)) {
      setTarget(parsed);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 select-none">
      {/* Header & Algorithm Selection */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-950" />
            <h2 className="text-xl font-extrabold text-blue-950">Searches Studio</h2>
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
              {algorithm === 'binary' ? 'O(log N)' : algorithm === 'linear' ? 'O(N)' : 'O(√N)'}
            </span>
          </div>
          <p className="text-xs text-blue-900/80 mt-1">
            Compare algorithmic search patterns: divide-and-conquer binary halving, sequential linear traversal, and block jump search.
          </p>
        </div>

        {/* Algorithm Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {(
            [
              { id: 'binary', label: 'Binary Search', complexity: 'O(log N)' },
              { id: 'linear', label: 'Linear Search', complexity: 'O(N)' },
              { id: 'jump', label: 'Jump Search', complexity: 'O(√N)' },
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              onClick={() => setAlgorithm(m.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                algorithm === m.id
                  ? 'bg-blue-950 text-white shadow-xs'
                  : 'text-blue-900/80 hover:text-blue-950'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Target & Array Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
        {/* Target input */}
        <div className="md:col-span-4 flex items-center gap-2">
          <span className="text-blue-950 font-bold shrink-0">Target:</span>
          <input
            type="number"
            value={customTargetInput}
            onChange={(e) => setCustomTargetInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleApplyCustomTarget()}
            className="w-20 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-blue-950 font-mono text-xs font-bold focus:outline-none focus:border-blue-900"
          />
          <button
            onClick={handleApplyCustomTarget}
            className="px-3 py-1.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs shadow-xs cursor-pointer"
          >
            Set
          </button>
          <div className="flex gap-1 ml-auto">
            {[35, 79, 99].map((val) => (
              <button
                key={val}
                onClick={() => {
                  setCustomTargetInput(String(val));
                  setTarget(val);
                }}
                className={`px-2 py-1 rounded text-[11px] font-mono border cursor-pointer ${
                  target === val
                    ? 'bg-red-600 text-white border-red-600 font-bold'
                    : 'bg-white border-slate-200 text-blue-900 hover:border-blue-400'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* Array values input */}
        <div className="md:col-span-8 flex items-center gap-2">
          <span className="text-blue-950 font-bold shrink-0">Array:</span>
          <input
            type="text"
            value={arrayStr}
            onChange={(e) => setArrayStr(e.target.value)}
            placeholder="comma-separated numbers"
            className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-blue-950 font-mono text-xs font-medium focus:outline-none focus:border-blue-900"
          />
          <button
            onClick={() => {
              const def = '3, 8, 14, 21, 29, 35, 42, 57, 68, 79, 88, 95';
              setArrayStr(def);
            }}
            className="px-2.5 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-blue-950 text-xs font-bold shrink-0 cursor-pointer"
          >
            Preset
          </button>
        </div>
      </div>

      {/* Stepper Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStepIdx(0)}
            className="p-2 rounded-lg bg-white hover:bg-slate-100 text-blue-950 border border-slate-200 text-xs transition-colors cursor-pointer"
            title="Reset to beginning"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentStepIdx((prev) => Math.max(0, prev - 1))}
            disabled={currentStepIdx === 0}
            className="p-2 rounded-lg bg-white hover:bg-slate-100 disabled:opacity-30 text-blue-950 border border-slate-200 text-xs transition-colors cursor-pointer"
            title="Previous step"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsPlaying((prev) => !prev)}
            className="px-4 py-1.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button
            onClick={() => setCurrentStepIdx((prev) => Math.min(steps.length - 1, prev + 1))}
            disabled={currentStepIdx >= steps.length - 1}
            className="p-2 rounded-lg bg-white hover:bg-slate-100 disabled:opacity-30 text-blue-950 border border-slate-200 text-xs transition-colors cursor-pointer"
            title="Next step"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Speed switcher */}
          <div className="flex items-center gap-1 ml-3 pl-3 border-l border-slate-200 text-[11px] text-blue-900">
            <span className="font-semibold">Speed:</span>
            {[
              { label: 'Slow', val: 1500 },
              { label: '1x', val: 1000 },
              { label: 'Fast', val: 450 },
            ].map((s) => (
              <button
                key={s.label}
                onClick={() => setSpeed(s.val)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer ${
                  speed === s.val
                    ? 'bg-blue-950 text-white font-bold'
                    : 'text-blue-900 hover:bg-slate-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-blue-950">
          <div>
            Comparisons: <span className="text-red-600 font-extrabold">{activeStep.comparisons}</span>
          </div>
          <div>
            Step <span className="text-blue-950 font-extrabold">{currentStepIdx + 1}</span> / {steps.length}
          </div>
        </div>
      </div>

      {/* Visual Array Canvas */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-6 overflow-x-auto shadow-inner">
        <div className="flex items-center justify-center gap-2 sm:gap-3 min-w-[700px] py-4">
          {activeStep.arr.map((val, idx) => {
            let isCurrent = false;
            let isEliminated = false;
            let isMid = false;
            let isLow = false;
            let isHigh = false;
            let isFound = false;

            if (algorithm === 'linear') {
              isCurrent = idx === activeStep.currentIndex;
              isFound = isCurrent && activeStep.status === 'found';
            } else if (algorithm === 'binary') {
              const low = activeStep.low ?? 0;
              const high = activeStep.high ?? activeStep.arr.length - 1;
              const mid = activeStep.mid ?? -1;

              isEliminated = idx < low || idx > high;
              isLow = idx === low;
              isHigh = idx === high;
              isMid = idx === mid;
              isFound = isMid && activeStep.status === 'found';
            } else if (algorithm === 'jump') {
              isCurrent = idx === activeStep.currentIndex;
              isFound = isCurrent && activeStep.status === 'found';
              if (activeStep.jumpBlocks) {
                const inBlock =
                  idx >= activeStep.jumpBlocks.start && idx <= activeStep.jumpBlocks.end;
                if (!inBlock && activeStep.currentIndex > activeStep.jumpBlocks.end) {
                  isEliminated = true;
                }
              }
            }

            let cellClass = 'bg-white border-slate-200 text-blue-950 shadow-xs';
            if (isFound) {
              cellClass =
                'bg-red-50 border-red-600 text-red-600 ring-2 ring-red-600 font-extrabold scale-105 shadow-md';
            } else if (isMid) {
              cellClass =
                'bg-blue-100 border-blue-600 text-blue-950 ring-2 ring-blue-600 font-extrabold scale-105 shadow-md';
            } else if (isCurrent) {
              cellClass =
                'bg-blue-50 border-blue-400 text-blue-900 ring-2 ring-blue-400 font-bold';
            } else if (isEliminated) {
              cellClass =
                'bg-slate-100 border-slate-200 text-blue-900/40 opacity-40 line-through';
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-1.5 transition-all">
                {/* Pointer Tag */}
                <div className="h-5 text-[10px] font-mono font-extrabold flex items-center justify-center">
                  {isFound ? (
                    <span className="text-red-600 animate-pulse">MATCH</span>
                  ) : isMid ? (
                    <span className="text-blue-950">MID</span>
                  ) : isLow ? (
                    <span className="text-blue-800">LOW</span>
                  ) : isHigh ? (
                    <span className="text-red-600">HIGH</span>
                  ) : isCurrent ? (
                    <span className="text-blue-900">CURR</span>
                  ) : null}
                </div>

                {/* Number Box */}
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl border flex items-center justify-center font-mono text-sm sm:text-base font-extrabold transition-all duration-200 ${cellClass}`}
                >
                  {val}
                </div>

                {/* Index Subscript */}
                <span className="text-[10px] font-mono text-blue-900/60 font-semibold">[{idx}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Explanation Banner */}
      <div
        className={`p-4 rounded-xl border flex items-start gap-3 text-xs font-mono transition-colors ${
          activeStep.status === 'found'
            ? 'bg-red-50 border-red-200 text-red-700'
            : activeStep.status === 'not_found'
            ? 'bg-red-50 border-red-200 text-red-700'
            : 'bg-blue-50/70 border-blue-200 text-blue-950'
        }`}
      >
        {activeStep.status === 'found' ? (
          <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
        ) : activeStep.status === 'not_found' ? (
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
        ) : (
          <HelpCircle className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
        )}
        <div className="space-y-1">
          <span className="font-extrabold uppercase tracking-wider text-[10px] block opacity-80">
            Search Logic Invariant:
          </span>
          <p className="leading-relaxed font-medium">{activeStep.log}</p>
        </div>
      </div>
    </div>
  );
};
