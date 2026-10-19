import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Sliders,
  Shuffle,
  BarChart2,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';

type SortAlgorithm = 'bubble' | 'selection' | 'insertion' | 'quick' | 'merge';

interface SortStep {
  arr: number[];
  comparing: number[]; // indices currently being compared
  swapping: number[];  // indices being swapped / placed
  sortedIndices: number[]; // indices confirmed in final position
  pivotIndex?: number;
  log: string;
  comparisons: number;
  swaps: number;
}

export const SortingVisualizer: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<SortAlgorithm>('bubble');
  const [customArrayInput, setCustomArrayInput] = useState<string>('65, 25, 12, 82, 36, 45, 90, 18');
  const [baseArray, setBaseArray] = useState<number[]>([65, 25, 12, 82, 36, 45, 90, 18]);
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(750);

  // Generate sort steps based on chosen algorithm
  useEffect(() => {
    const arr = [...baseArray];
    const n = arr.length;
    const generated: SortStep[] = [];
    let comparisons = 0;
    let swaps = 0;

    generated.push({
      arr: [...arr],
      comparing: [],
      swapping: [],
      sortedIndices: [],
      log: `Initial unsorted array of ${n} elements. Algorithm: ${algorithm.toUpperCase()}.`,
      comparisons: 0,
      swaps: 0,
    });

    if (algorithm === 'bubble') {
      const sorted: number[] = [];
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          comparisons++;
          generated.push({
            arr: [...arr],
            comparing: [j, j + 1],
            swapping: [],
            sortedIndices: [...sorted],
            log: `Comparing index ${j} (${arr[j]}) with index ${j + 1} (${arr[j + 1]}).`,
            comparisons,
            swaps,
          });

          if (arr[j] > arr[j + 1]) {
            swaps++;
            const tmp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = tmp;

            generated.push({
              arr: [...arr],
              comparing: [],
              swapping: [j, j + 1],
              sortedIndices: [...sorted],
              log: `Swap: ${arr[j + 1]} > ${arr[j]} — bubbling up larger element to index ${j + 1}.`,
              comparisons,
              swaps,
            });
          }
        }
        sorted.push(n - i - 1);
      }
      sorted.push(0);
      generated.push({
        arr: [...arr],
        comparing: [],
        swapping: [],
        sortedIndices: Array.from({ length: n }, (_, i) => i),
        log: `Bubble Sort complete! Entire array is sorted in ascending order.`,
        comparisons,
        swaps,
      });
    } else if (algorithm === 'selection') {
      const sorted: number[] = [];
      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        generated.push({
          arr: [...arr],
          comparing: [i],
          swapping: [],
          sortedIndices: [...sorted],
          log: `Finding minimum element starting from index ${i}. Current minimum candidate is ${arr[i]}.`,
          comparisons,
          swaps,
        });

        for (let j = i + 1; j < n; j++) {
          comparisons++;
          generated.push({
            arr: [...arr],
            comparing: [minIdx, j],
            swapping: [],
            sortedIndices: [...sorted],
            log: `Checking candidate arr[${j}] = ${arr[j]} against current min arr[${minIdx}] = ${arr[minIdx]}.`,
            comparisons,
            swaps,
          });

          if (arr[j] < arr[minIdx]) {
            minIdx = j;
            generated.push({
              arr: [...arr],
              comparing: [minIdx],
              swapping: [],
              sortedIndices: [...sorted],
              log: `New minimum discovered: ${arr[minIdx]} at index ${minIdx}.`,
              comparisons,
              swaps,
            });
          }
        }

        if (minIdx !== i) {
          swaps++;
          const tmp = arr[i];
          arr[i] = arr[minIdx];
          arr[minIdx] = tmp;

          generated.push({
            arr: [...arr],
            comparing: [],
            swapping: [i, minIdx],
            sortedIndices: [...sorted],
            log: `Swapped found minimum ${arr[i]} into its final sorted position at index ${i}.`,
            comparisons,
            swaps,
          });
        }
        sorted.push(i);
      }
      sorted.push(n - 1);
      generated.push({
        arr: [...arr],
        comparing: [],
        swapping: [],
        sortedIndices: Array.from({ length: n }, (_, i) => i),
        log: `Selection Sort complete! Total passes: ${n - 1}, Comparisons: ${comparisons}, Swaps: ${swaps}.`,
        comparisons,
        swaps,
      });
    } else if (algorithm === 'insertion') {
      const sorted: number[] = [0];
      for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;

        generated.push({
          arr: [...arr],
          comparing: [i],
          swapping: [],
          sortedIndices: [...sorted],
          log: `Extracted key = ${key} at index ${i}. Finding insertion point in sorted prefix [0..${i - 1}].`,
          comparisons,
          swaps,
        });

        while (j >= 0) {
          comparisons++;
          generated.push({
            arr: [...arr],
            comparing: [j],
            swapping: [],
            sortedIndices: [...sorted],
            log: `Comparing key ${key} with prefix element arr[${j}] = ${arr[j]}.`,
            comparisons,
            swaps,
          });

          if (arr[j] > key) {
            swaps++;
            arr[j + 1] = arr[j];
            generated.push({
              arr: [...arr],
              comparing: [],
              swapping: [j + 1],
              sortedIndices: [...sorted],
              log: `Shifted arr[${j}] (${arr[j]}) one position right to index ${j + 1}.`,
              comparisons,
              swaps,
            });
            j--;
          } else {
            break;
          }
        }
        arr[j + 1] = key;
        sorted.push(i);

        generated.push({
          arr: [...arr],
          comparing: [],
          swapping: [j + 1],
          sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
          log: `Inserted key ${key} into position ${j + 1}. Prefix [0..${i}] is now sorted.`,
          comparisons,
          swaps,
        });
      }

      generated.push({
        arr: [...arr],
        comparing: [],
        swapping: [],
        sortedIndices: Array.from({ length: n }, (_, i) => i),
        log: `Insertion Sort complete! Sorted prefix expanded across entire array.`,
        comparisons,
        swaps,
      });
    } else if (algorithm === 'quick') {
      // Quick Sort with Lomuto partitioning
      const sorted: Set<number> = new Set();

      const quickSortHelper = (low: number, high: number) => {
        if (low < high) {
          const pivotVal = arr[high];
          let pIdx = low;

          generated.push({
            arr: [...arr],
            comparing: [],
            swapping: [],
            sortedIndices: Array.from(sorted),
            pivotIndex: high,
            log: `Partitioning sub-array [${low} .. ${high}] using pivot = ${pivotVal} at index ${high}.`,
            comparisons,
            swaps,
          });

          for (let i = low; i < high; i++) {
            comparisons++;
            generated.push({
              arr: [...arr],
              comparing: [i, high],
              swapping: [],
              sortedIndices: Array.from(sorted),
              pivotIndex: high,
              log: `Comparing arr[${i}] = ${arr[i]} with pivot ${pivotVal}.`,
              comparisons,
              swaps,
            });

            if (arr[i] < pivotVal) {
              if (i !== pIdx) {
                swaps++;
                const tmp = arr[i];
                arr[i] = arr[pIdx];
                arr[pIdx] = tmp;

                generated.push({
                  arr: [...arr],
                  comparing: [],
                  swapping: [i, pIdx],
                  sortedIndices: Array.from(sorted),
                  pivotIndex: high,
                  log: `Swapped arr[${i}] (${arr[pIdx]}) with arr[${pIdx}] (${arr[i]}) to group elements < pivot.`,
                  comparisons,
                  swaps,
                });
              }
              pIdx++;
            }
          }

          // Swap pivot into place
          swaps++;
          const tmp = arr[pIdx];
          arr[pIdx] = arr[high];
          arr[high] = tmp;
          sorted.add(pIdx);

          generated.push({
            arr: [...arr],
            comparing: [],
            swapping: [pIdx, high],
            sortedIndices: Array.from(sorted),
            pivotIndex: pIdx,
            log: `Pivot ${arr[pIdx]} placed at sorted boundary index ${pIdx}. Elements left are < ${arr[pIdx]}, right are ≥ ${arr[pIdx]}.`,
            comparisons,
            swaps,
          });

          quickSortHelper(low, pIdx - 1);
          quickSortHelper(pIdx + 1, high);
        } else if (low === high) {
          sorted.add(low);
        }
      };

      quickSortHelper(0, n - 1);
      generated.push({
        arr: [...arr],
        comparing: [],
        swapping: [],
        sortedIndices: Array.from({ length: n }, (_, i) => i),
        log: `Quick Sort complete! All partitions converged. Comparisons: ${comparisons}, Swaps: ${swaps}.`,
        comparisons,
        swaps,
      });
    } else if (algorithm === 'merge') {
      // Merge Sort
      const sorted: Set<number> = new Set();

      const merge = (l: number, m: number, r: number) => {
        const leftArr = arr.slice(l, m + 1);
        const rightArr = arr.slice(m + 1, r + 1);
        let i = 0;
        let j = 0;
        let k = l;

        generated.push({
          arr: [...arr],
          comparing: Array.from({ length: r - l + 1 }, (_, x) => l + x),
          swapping: [],
          sortedIndices: Array.from(sorted),
          log: `Merging two sorted sublists: [${leftArr.join(', ')}] and [${rightArr.join(', ')}].`,
          comparisons,
          swaps,
        });

        while (i < leftArr.length && j < rightArr.length) {
          comparisons++;
          swaps++;
          if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
          } else {
            arr[k] = rightArr[j];
            j++;
          }
          generated.push({
            arr: [...arr],
            comparing: [],
            swapping: [k],
            sortedIndices: Array.from(sorted),
            log: `Placed ${arr[k]} into position ${k}.`,
            comparisons,
            swaps,
          });
          k++;
        }

        while (i < leftArr.length) {
          swaps++;
          arr[k] = leftArr[i];
          generated.push({
            arr: [...arr],
            comparing: [],
            swapping: [k],
            sortedIndices: Array.from(sorted),
            log: `Flushed remaining left element ${arr[k]} into index ${k}.`,
            comparisons,
            swaps,
          });
          i++;
          k++;
        }

        while (j < rightArr.length) {
          swaps++;
          arr[k] = rightArr[j];
          generated.push({
            arr: [...arr],
            comparing: [],
            swapping: [k],
            sortedIndices: Array.from(sorted),
            log: `Flushed remaining right element ${arr[k]} into index ${k}.`,
            comparisons,
            swaps,
          });
          j++;
          k++;
        }

        if (l === 0 && r === n - 1) {
          for (let idx = 0; idx < n; idx++) sorted.add(idx);
        }
      };

      const mergeSortHelper = (l: number, r: number) => {
        if (l < r) {
          const m = Math.floor(l + (r - l) / 2);
          mergeSortHelper(l, m);
          mergeSortHelper(m + 1, r);
          merge(l, m, r);
        }
      };

      mergeSortHelper(0, n - 1);
      generated.push({
        arr: [...arr],
        comparing: [],
        swapping: [],
        sortedIndices: Array.from({ length: n }, (_, i) => i),
        log: `Merge Sort complete! Array stably merged into sorted order.`,
        comparisons,
        swaps,
      });
    }

    setSteps(generated);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [algorithm, baseArray]);

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
    arr: baseArray,
    comparing: [],
    swapping: [],
    sortedIndices: [],
    log: 'Sorting engine ready.',
    comparisons: 0,
    swaps: 0,
  };

  const handleShuffle = () => {
    const shuffled = [...baseArray].sort(() => Math.random() - 0.5);
    setBaseArray(shuffled);
  };

  const handleApplyCustom = () => {
    const parsed = customArrayInput
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n) && n > 0 && n <= 100);
    if (parsed.length >= 3) {
      setBaseArray(parsed.slice(0, 12));
    }
  };

  const getComplexity = (alg: SortAlgorithm) => {
    switch (alg) {
      case 'bubble':
      case 'selection':
      case 'insertion':
        return { time: 'O(N²)', space: 'O(1)', best: 'O(N)' };
      case 'quick':
        return { time: 'O(N log N)', space: 'O(log N)', best: 'O(N log N)' };
      case 'merge':
        return { time: 'O(N log N)', space: 'O(N)', best: 'O(N log N)' };
    }
  };

  const comp = getComplexity(algorithm);

  return (
    <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
      {/* Header & Algorithm Selection */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-[#2d3036] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white">Sorting Algorithms Lab</h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800">
              Avg: {comp.time} · Space: {comp.space}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Observe comparison passes, partition boundaries, insertion keys, and recursive merge buffers.
          </p>
        </div>

        {/* Algorithm Selection Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#08090B] p-1 rounded-xl border border-slate-800">
          {(
            [
              { id: 'bubble', label: 'Bubble' },
              { id: 'selection', label: 'Selection' },
              { id: 'insertion', label: 'Insertion' },
              { id: 'quick', label: 'Quick Sort' },
              { id: 'merge', label: 'Merge Sort' },
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              onClick={() => setAlgorithm(m.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                algorithm === m.id
                  ? 'bg-slate-200 text-slate-900 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Array Controls & Custom Input */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#08090B] p-4 rounded-xl border border-slate-800 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[280px]">
          <span className="text-slate-400 font-medium shrink-0">Values (1-100):</span>
          <input
            type="text"
            value={customArrayInput}
            onChange={(e) => setCustomArrayInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleApplyCustom()}
            placeholder="comma separated"
            className="flex-1 px-3 py-1.5 rounded-lg bg-[#17191D] border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
          />
          <button
            onClick={handleApplyCustom}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium"
          >
            Apply
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="px-3.5 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border border-amber-800 font-semibold text-xs flex items-center gap-1.5"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Shuffle</span>
          </button>
          <button
            onClick={() => {
              const def = [70, 15, 85, 30, 50, 20, 95, 40];
              setBaseArray(def);
              setCustomArrayInput(def.join(', '));
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
          >
            Reset Array
          </button>
        </div>
      </div>

      {/* Stepper Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#08090B] p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStepIdx(0)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
            title="Reset to beginning"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentStepIdx((prev) => Math.max(0, prev - 1))}
            disabled={currentStepIdx === 0}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 text-xs transition-colors"
            title="Previous step"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsPlaying((prev) => !prev)}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-white text-slate-900 font-bold text-xs flex items-center gap-1.5 shadow"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button
            onClick={() => setCurrentStepIdx((prev) => Math.min(steps.length - 1, prev + 1))}
            disabled={currentStepIdx >= steps.length - 1}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 text-xs transition-colors"
            title="Next step"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Speed switcher */}
          <div className="flex items-center gap-1 ml-3 pl-3 border-l border-slate-800 text-[11px] text-slate-400">
            <span>Speed:</span>
            {[
              { label: 'Slow', val: 1200 },
              { label: 'Normal', val: 750 },
              { label: 'Fast', val: 350 },
            ].map((s) => (
              <button
                key={s.label}
                onClick={() => setSpeed(s.val)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                  speed === s.val
                    ? 'bg-slate-700 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
          <div>
            Comparisons: <span className="text-amber-400 font-bold">{activeStep.comparisons}</span>
          </div>
          <div>
            Swaps / Shifts: <span className="text-cyan-400 font-bold">{activeStep.swaps}</span>
          </div>
          <div>
            Step <span className="text-white font-bold">{currentStepIdx + 1}</span> / {steps.length}
          </div>
        </div>
      </div>

      {/* Bar Chart Visualization Canvas */}
      <div className="p-8 rounded-2xl bg-[#08090B] border border-slate-800 space-y-6">
        <div className="h-64 flex items-end justify-center gap-2 sm:gap-4 px-4 border-b border-slate-800 pb-2">
          {activeStep.arr.map((val, idx) => {
            const isComparing = activeStep.comparing.includes(idx);
            const isSwapping = activeStep.swapping.includes(idx);
            const isSorted = activeStep.sortedIndices.includes(idx);
            const isPivot = activeStep.pivotIndex === idx;

            let barColor = 'bg-slate-600 border-slate-500 text-slate-300';
            let labelBadge = '';

            if (isPivot) {
              barColor = 'bg-purple-500 border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.5)] text-purple-200';
              labelBadge = 'PIVOT';
            } else if (isSwapping) {
              barColor = 'bg-rose-500 border-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.6)] text-rose-200';
              labelBadge = 'SWAP';
            } else if (isComparing) {
              barColor = 'bg-amber-400 border-white shadow-[0_0_15px_rgba(251,191,36,0.6)] text-amber-200';
              labelBadge = 'CMP';
            } else if (isSorted) {
              barColor = 'bg-emerald-500 border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)] text-emerald-200';
            }

            const barHeight = Math.max(20, (val / 100) * 190);

            return (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1 max-w-[56px] transition-all">
                {/* Status Indicator */}
                <span className="h-4 font-mono text-[9px] font-bold text-amber-300">
                  {labelBadge}
                </span>

                <span className="font-mono text-xs text-white font-bold">{val}</span>
                <div
                  className={`w-full rounded-t-xl border transition-all duration-300 ${barColor}`}
                  style={{ height: `${barHeight}px` }}
                />
                <span className="font-mono text-[10px] text-slate-500">[{idx}]</span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-slate-400 pt-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-slate-600 border border-slate-500" />
            <span>Unsorted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-400 border border-white" />
            <span>Comparing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-500 border border-rose-300" />
            <span>Swapping / Shifting</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-purple-500 border border-purple-300" />
            <span>Pivot</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500 border border-emerald-400" />
            <span>Sorted Position</span>
          </div>
        </div>
      </div>

      {/* Execution Log */}
      <div className="p-4 rounded-xl bg-[#121418] border border-slate-800 space-y-1 font-mono text-xs">
        <span className="text-[10px] text-slate-400 uppercase block font-bold">
          Algorithm Execution State:
        </span>
        <p className="text-slate-200 leading-relaxed">{activeStep.log}</p>
      </div>
    </div>
  );
};
