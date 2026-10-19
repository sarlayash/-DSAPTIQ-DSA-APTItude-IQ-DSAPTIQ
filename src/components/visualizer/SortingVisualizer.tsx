import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Sliders,
  Shuffle
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
          pivotIndex: minIdx,
          log: `Pass ${i + 1}: Initial min candidate at index ${i} (${arr[i]}). Scanning right...`,
          comparisons,
          swaps,
        });

        for (let j = i + 1; j < n; j++) {
          comparisons++;
          generated.push({
            arr: [...arr],
            comparing: [j],
            swapping: [],
            sortedIndices: [...sorted],
            pivotIndex: minIdx,
            log: `Comparing arr[${j}] (${arr[j]}) with current min arr[${minIdx}] (${arr[minIdx]}).`,
            comparisons,
            swaps,
          });

          if (arr[j] < arr[minIdx]) {
            minIdx = j;
            generated.push({
              arr: [...arr],
              comparing: [],
              swapping: [minIdx],
              sortedIndices: [...sorted],
              pivotIndex: minIdx,
              log: `New minimum discovered: arr[${minIdx}] = ${arr[minIdx]}.`,
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
            log: `Swapped minimum (${arr[i]}) into sorted boundary position ${i}.`,
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
        log: `Selection Sort complete. Min elements locked in place.`,
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
          pivotIndex: i,
          log: `Extracting key arr[${i}] = ${key}. Searching insertion position in sorted prefix.`,
          comparisons,
          swaps,
        });

        while (j >= 0 && arr[j] > key) {
          comparisons++;
          swaps++;
          arr[j + 1] = arr[j];

          generated.push({
            arr: [...arr],
            comparing: [j],
            swapping: [j + 1],
            sortedIndices: [...sorted],
            log: `Shift arr[${j}] (${arr[j + 1]}) right to index ${j + 1}.`,
            comparisons,
            swaps,
          });
          j--;
        }

        arr[j + 1] = key;
        sorted.push(i);

        generated.push({
          arr: [...arr],
          comparing: [],
          swapping: [j + 1],
          sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
          log: `Inserted key ${key} at index ${j + 1}.`,
          comparisons,
          swaps,
        });
      }
      generated.push({
        arr: [...arr],
        comparing: [],
        swapping: [],
        sortedIndices: Array.from({ length: n }, (_, i) => i),
        log: `Insertion Sort complete. Prefix is fully ordered.`,
        comparisons,
        swaps,
      });
    } else if (algorithm === 'quick') {
      const sorted: number[] = [];

      const quickSort = (low: number, high: number) => {
        if (low < high) {
          const pivotVal = arr[high];
          let i = low - 1;

          generated.push({
            arr: [...arr],
            comparing: [],
            swapping: [],
            sortedIndices: [...sorted],
            pivotIndex: high,
            log: `QuickSort subarray [${low}..${high}]. Chosen pivot: arr[${high}] = ${pivotVal}.`,
            comparisons,
            swaps,
          });

          for (let j = low; j < high; j++) {
            comparisons++;
            generated.push({
              arr: [...arr],
              comparing: [j, high],
              swapping: [],
              sortedIndices: [...sorted],
              pivotIndex: high,
              log: `Comparing arr[${j}] (${arr[j]}) <= pivot (${pivotVal}).`,
              comparisons,
              swaps,
            });

            if (arr[j] <= pivotVal) {
              i++;
              if (i !== j) {
                swaps++;
                const tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;

                generated.push({
                  arr: [...arr],
                  comparing: [],
                  swapping: [i, j],
                  sortedIndices: [...sorted],
                  pivotIndex: high,
                  log: `Swap arr[${i}] and arr[${j}] to place smaller element on left side of partition.`,
                  comparisons,
                  swaps,
                });
              }
            }
          }

          swaps++;
          const tmp = arr[i + 1];
          arr[i + 1] = arr[high];
          arr[high] = tmp;
          const partitionIndex = i + 1;
          sorted.push(partitionIndex);

          generated.push({
            arr: [...arr],
            comparing: [],
            swapping: [partitionIndex, high],
            sortedIndices: [...sorted],
            log: `Placed pivot ${arr[partitionIndex]} into final partition position ${partitionIndex}.`,
            comparisons,
            swaps,
          });

          quickSort(low, partitionIndex - 1);
          quickSort(partitionIndex + 1, high);
        } else if (low === high) {
          sorted.push(low);
        }
      };

      quickSort(0, n - 1);
      generated.push({
        arr: [...arr],
        comparing: [],
        swapping: [],
        sortedIndices: Array.from({ length: n }, (_, i) => i),
        log: `Quick Sort completed across all partition branches.`,
        comparisons,
        swaps,
      });
    } else if (algorithm === 'merge') {
      const sorted: number[] = [];

      const merge = (left: number, mid: number, right: number) => {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);
        let i = 0, j = 0, k = left;

        generated.push({
          arr: [...arr],
          comparing: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
          swapping: [],
          sortedIndices: [...sorted],
          log: `Merging subarrays [${left}..${mid}] and [${mid + 1}..${right}].`,
          comparisons,
          swaps,
        });

        while (i < leftArr.length && j < rightArr.length) {
          comparisons++;
          if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
          } else {
            arr[k] = rightArr[j];
            j++;
          }
          swaps++;
          generated.push({
            arr: [...arr],
            comparing: [],
            swapping: [k],
            sortedIndices: [...sorted],
            log: `Placed smaller element ${arr[k]} into index ${k}.`,
            comparisons,
            swaps,
          });
          k++;
        }

        while (i < leftArr.length) {
          arr[k] = leftArr[i];
          swaps++;
          generated.push({
            arr: [...arr],
            comparing: [],
            swapping: [k],
            sortedIndices: [...sorted],
            log: `Flushed remaining left element ${arr[k]} to index ${k}.`,
            comparisons,
            swaps,
          });
          i++;
          k++;
        }

        while (j < rightArr.length) {
          arr[k] = rightArr[j];
          swaps++;
          generated.push({
            arr: [...arr],
            comparing: [],
            swapping: [k],
            sortedIndices: [...sorted],
            log: `Flushed remaining right element ${arr[k]} to index ${k}.`,
            comparisons,
            swaps,
          });
          j++;
          k++;
        }

        for (let idx = left; idx <= right; idx++) {
          if (!sorted.includes(idx)) sorted.push(idx);
        }
      };

      const mergeSort = (left: number, right: number) => {
        if (left < right) {
          const mid = Math.floor((left + right) / 2);
          mergeSort(left, mid);
          mergeSort(mid + 1, right);
          merge(left, mid, right);
        }
      };

      mergeSort(0, n - 1);
      generated.push({
        arr: [...arr],
        comparing: [],
        swapping: [],
        sortedIndices: Array.from({ length: n }, (_, i) => i),
        log: `Merge Sort complete! Sub-buffers combined in O(N log N) time.`,
        comparisons,
        swaps,
      });
    }

    setSteps(generated);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [baseArray, algorithm]);

  // Autoplay ticker
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

  const activeStep: SortStep = steps[currentStepIdx] || {
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
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 select-none">
      {/* Header & Algorithm Selection */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-extrabold text-blue-950">Sorting Algorithms Lab</h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 font-bold">
              Avg: {comp.time} · Space: {comp.space}
            </span>
          </div>
          <p className="text-xs text-blue-900 mt-1 font-medium">
            Observe comparison passes, partition boundaries, insertion keys, and recursive merge buffers.
          </p>
        </div>

        {/* Algorithm Selection Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200">
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
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                algorithm === m.id
                  ? 'bg-blue-900 text-white shadow-2xs'
                  : 'text-blue-900 hover:text-blue-950 hover:bg-blue-100/60'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Array Controls & Custom Input */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[280px]">
          <span className="text-blue-950 font-bold shrink-0">Values (1-100):</span>
          <input
            type="text"
            value={customArrayInput}
            onChange={(e) => setCustomArrayInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleApplyCustom()}
            placeholder="comma separated"
            className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-blue-950 font-mono text-xs focus:outline-none focus:border-blue-400 font-semibold"
          />
          <button
            onClick={handleApplyCustom}
            className="px-3.5 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold transition-colors cursor-pointer shadow-2xs"
          >
            Apply
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="px-3.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5 text-red-600" />
            <span>Shuffle</span>
          </button>
          <button
            onClick={() => {
              const def = [70, 15, 85, 30, 50, 20, 95, 40];
              setBaseArray(def);
              setCustomArrayInput(def.join(', '));
            }}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-blue-900 border border-slate-200 text-xs font-semibold cursor-pointer"
          >
            Reset Array
          </button>
        </div>
      </div>

      {/* Stepper Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStepIdx(0)}
            className="p-2 rounded-lg bg-white hover:bg-slate-100 text-blue-900 border border-slate-200 text-xs transition-colors cursor-pointer"
            title="Reset to beginning"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentStepIdx((prev) => Math.max(0, prev - 1))}
            disabled={currentStepIdx === 0}
            className="p-2 rounded-lg bg-white hover:bg-slate-100 disabled:opacity-30 text-blue-900 border border-slate-200 text-xs transition-colors cursor-pointer"
            title="Previous step"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsPlaying((prev) => !prev)}
            className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button
            onClick={() => setCurrentStepIdx((prev) => Math.min(steps.length - 1, prev + 1))}
            disabled={currentStepIdx >= steps.length - 1}
            className="p-2 rounded-lg bg-white hover:bg-slate-100 disabled:opacity-30 text-blue-900 border border-slate-200 text-xs transition-colors cursor-pointer"
            title="Next step"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Speed switcher */}
          <div className="flex items-center gap-1 ml-3 pl-3 border-l border-slate-200 text-[11px] text-blue-900 font-bold">
            <span>Speed:</span>
            {[
              { label: 'Slow', val: 1200 },
              { label: 'Normal', val: 750 },
              { label: 'Fast', val: 350 },
            ].map((s) => (
              <button
                key={s.label}
                onClick={() => setSpeed(s.val)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold cursor-pointer ${
                  speed === s.val
                    ? 'bg-blue-900 text-white'
                    : 'text-blue-900 hover:bg-blue-100'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-blue-900">
          <div>
            Comparisons: <span className="text-red-600 font-extrabold">{activeStep.comparisons}</span>
          </div>
          <div>
            Swaps / Shifts: <span className="text-blue-950 font-extrabold">{activeStep.swaps}</span>
          </div>
          <div>
            Step <span className="text-blue-950 font-extrabold">{currentStepIdx + 1}</span> / {steps.length}
          </div>
        </div>
      </div>

      {/* Bar Chart Visualization Canvas */}
      <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
        <div className="h-64 flex items-end justify-center gap-2 sm:gap-4 px-4 border-b border-slate-200 pb-2">
          {activeStep.arr.map((val, idx) => {
            const isComparing = activeStep.comparing.includes(idx);
            const isSwapping = activeStep.swapping.includes(idx);
            const isSorted = activeStep.sortedIndices.includes(idx);
            const isPivot = activeStep.pivotIndex === idx;

            let barColor = 'bg-blue-200 border-blue-300 text-blue-950';
            let labelBadge = '';

            if (isPivot) {
              barColor = 'bg-blue-950 border-blue-900 shadow-md text-white';
              labelBadge = 'PIVOT';
            } else if (isSwapping) {
              barColor = 'bg-red-600 border-red-700 shadow-md text-white';
              labelBadge = 'SWAP';
            } else if (isComparing) {
              barColor = 'bg-red-400 border-red-500 shadow-sm text-white';
              labelBadge = 'CMP';
            } else if (isSorted) {
              barColor = 'bg-blue-800 border-blue-900 shadow-sm text-white';
            }

            const barHeight = Math.max(20, (val / 100) * 190);

            return (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1 max-w-[56px] transition-all">
                {/* Status Indicator */}
                <span className="h-4 font-mono text-[9px] font-extrabold text-red-600">
                  {labelBadge}
                </span>

                <span className="font-mono text-xs text-blue-950 font-extrabold">{val}</span>
                <div
                  className={`w-full rounded-t-xl border transition-all duration-300 ${barColor}`}
                  style={{ height: `${barHeight}px` }}
                />
                <span className="font-mono text-[10px] text-blue-800 font-bold">[{idx}]</span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-blue-950 font-bold pt-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-blue-200 border border-blue-300" />
            <span>Unsorted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-red-400 border border-red-500" />
            <span className="text-red-600">Comparing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-red-600 border border-red-700" />
            <span className="text-red-700">Swapping / Shifting</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-blue-950 border border-blue-900" />
            <span className="text-blue-950">Pivot</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-blue-800 border border-blue-900" />
            <span className="text-blue-900">Sorted Position</span>
          </div>
        </div>
      </div>

      {/* Execution Log */}
      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1 font-mono text-xs">
        <span className="text-[10px] text-blue-950 uppercase block font-extrabold">
          Algorithm Execution State:
        </span>
        <p className="text-blue-950 leading-relaxed font-medium">{activeStep.log}</p>
      </div>
    </div>
  );
};
