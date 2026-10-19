import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Sliders,
  Layers,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle2,
  Code2,
  Cpu
} from 'lucide-react';

export const VisualizerView: React.FC = () => {
  const [activeModule, setActiveModule] = useState<'binary_search' | 'data_structures' | 'sorting' | 'code_trace'>('binary_search');

  // ==========================================
  // MODULE 1: BINARY SEARCH VISUALIZER STATE
  // ==========================================
  const [bsArray, setBsArray] = useState<number[]>([3, 8, 12, 17, 24, 35, 42, 56, 72, 88, 95]);
  const [bsTarget, setBsTarget] = useState<number>(35);
  const [bsLow, setBsLow] = useState<number>(0);
  const [bsHigh, setBsHigh] = useState<number>(10);
  const [bsMid, setBsMid] = useState<number>(5);
  const [bsStep, setBsStep] = useState<number>(0);
  const [bsHistory, setBsHistory] = useState<{ low: number; high: number; mid: number; explanation: string; status: 'searching' | 'found' | 'not_found' }[]>([]);
  const [bsIsPlaying, setBsIsPlaying] = useState<boolean>(false);

  // Generate binary search steps whenever target changes
  const buildBinarySearchSteps = (target: number, arr: number[]) => {
    const steps: { low: number; high: number; mid: number; explanation: string; status: 'searching' | 'found' | 'not_found' }[] = [];
    let l = 0;
    let r = arr.length - 1;

    while (l <= r) {
      const m = Math.floor(l + (r - l) / 2);
      if (arr[m] === target) {
        steps.push({
          low: l,
          high: r,
          mid: m,
          explanation: `Midpoint index ${m} has arr[${m}] = ${arr[m]} which EQUALS target ${target}! Search succeeded.`,
          status: 'found',
        });
        return steps;
      } else if (arr[m] < target) {
        steps.push({
          low: l,
          high: r,
          mid: m,
          explanation: `Midpoint index ${m} has arr[${m}] = ${arr[m]} < target ${target}. Target must be in right half. Setting low = mid + 1 (${m + 1}).`,
          status: 'searching',
        });
        l = m + 1;
      } else {
        steps.push({
          low: l,
          high: r,
          mid: m,
          explanation: `Midpoint index ${m} has arr[${m}] = ${arr[m]} > target ${target}. Target must be in left half. Setting high = mid - 1 (${m - 1}).`,
          status: 'searching',
        });
        r = m - 1;
      }
    }

    steps.push({
      low: l,
      high: r,
      mid: -1,
      explanation: `low (${l}) > high (${r}). Target ${target} does not exist in array.`,
      status: 'not_found',
    });
    return steps;
  };

  useEffect(() => {
    const steps = buildBinarySearchSteps(bsTarget, bsArray);
    setBsHistory(steps);
    setBsStep(0);
    if (steps.length > 0) {
      setBsLow(steps[0].low);
      setBsHigh(steps[0].high);
      setBsMid(steps[0].mid);
    }
  }, [bsTarget, bsArray]);

  useEffect(() => {
    if (bsHistory.length > 0 && bsStep < bsHistory.length) {
      const cur = bsHistory[bsStep];
      setBsLow(cur.low);
      setBsHigh(cur.high);
      setBsMid(cur.mid);
    }
  }, [bsStep, bsHistory]);

  // Autoplay for binary search
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (bsIsPlaying) {
      timer = setInterval(() => {
        setBsStep((prev) => {
          if (prev >= bsHistory.length - 1) {
            setBsIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(timer);
  }, [bsIsPlaying, bsHistory.length]);

  // ==========================================
  // MODULE 2: DATA STRUCTURE PLAYGROUND (STACK / QUEUE / LINKED LIST)
  // ==========================================
  const [dsType, setDsType] = useState<'stack' | 'queue' | 'linked_list'>('stack');
  const [stackItems, setStackItems] = useState<number[]>([15, 28, 42]);
  const [queueItems, setQueueItems] = useState<number[]>([10, 20, 30, 40]);
  const [linkedList, setLinkedList] = useState<number[]>([5, 12, 19, 27]);
  const [dsInputVal, setDsInputVal] = useState<string>('50');
  const [dsMessage, setDsMessage] = useState<string>('Ready for interactive state operations.');

  const handleStackPush = () => {
    const val = parseInt(dsInputVal, 10);
    if (isNaN(val)) return;
    if (stackItems.length >= 7) {
      setDsMessage('Stack Overflow! Maximum visual capacity reached.');
      return;
    }
    setStackItems([...stackItems, val]);
    setDsMessage(`pushed ${val} onto top of stack (LIFO).`);
  };

  const handleStackPop = () => {
    if (stackItems.length === 0) {
      setDsMessage('Stack Underflow! Stack is currently empty.');
      return;
    }
    const popped = stackItems[stackItems.length - 1];
    setStackItems(stackItems.slice(0, -1));
    setDsMessage(`popped ${popped} from top of stack.`);
  };

  const handleQueueEnqueue = () => {
    const val = parseInt(dsInputVal, 10);
    if (isNaN(val)) return;
    if (queueItems.length >= 7) {
      setDsMessage('Queue Full! Maximum visual buffer reached.');
      return;
    }
    setQueueItems([...queueItems, val]);
    setDsMessage(`enqueued ${val} at rear of queue (FIFO).`);
  };

  const handleQueueDequeue = () => {
    if (queueItems.length === 0) {
      setDsMessage('Queue Underflow! Queue is currently empty.');
      return;
    }
    const removed = queueItems[0];
    setQueueItems(queueItems.slice(1));
    setDsMessage(`dequeued ${removed} from front of queue.`);
  };

  const handleLinkedListInsertHead = () => {
    const val = parseInt(dsInputVal, 10);
    if (isNaN(val)) return;
    setLinkedList([val, ...linkedList]);
    setDsMessage(`Inserted ${val} at Head of linked list in O(1) time.`);
  };

  const handleLinkedListInsertTail = () => {
    const val = parseInt(dsInputVal, 10);
    if (isNaN(val)) return;
    setLinkedList([...linkedList, val]);
    setDsMessage(`Inserted ${val} at Tail of linked list in O(1) time (with tail pointer).`);
  };

  const handleLinkedListDeleteHead = () => {
    if (linkedList.length === 0) return;
    const removed = linkedList[0];
    setLinkedList(linkedList.slice(1));
    setDsMessage(`Deleted Head node (${removed}) in O(1) time.`);
  };

  const handleLinkedListReverse = () => {
    setLinkedList([...linkedList].reverse());
    setDsMessage('Reversed entire linked list in-place (3-pointer algorithm)!');
  };

  // ==========================================
  // MODULE 3: SORTING ALGORITHM ANIMATION (BUBBLE / TWO-POINTER)
  // ==========================================
  const [sortArray, setSortArray] = useState<number[]>([65, 25, 12, 82, 36, 45, 90, 18]);
  const [sortActiveI, setSortActiveI] = useState<number>(-1);
  const [sortActiveJ, setSortActiveJ] = useState<number>(-1);
  const [sortLog, setSortLog] = useState<string>('Click "Step Comparison" or "Play Animation" to begin.');
  const [sortSteps, setSortSteps] = useState<{ arr: number[]; i: number; j: number; log: string }[]>([]);
  const [sortStepIndex, setSortStepIndex] = useState<number>(0);
  const [sortIsPlaying, setSortIsPlaying] = useState<boolean>(false);

  // Generate bubble sort steps
  const generateSortSteps = (initial: number[]) => {
    const steps: { arr: number[]; i: number; j: number; log: string }[] = [];
    const arr = [...initial];
    const n = arr.length;

    steps.push({
      arr: [...arr],
      i: -1,
      j: -1,
      log: 'Initial unsorted state. Scanning adjacent pairs.',
    });

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          arr: [...arr],
          i: j,
          j: j + 1,
          log: `Comparing index ${j} (${arr[j]}) with index ${j + 1} (${arr[j + 1]}).`,
        });

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          steps.push({
            arr: [...arr],
            i: j,
            j: j + 1,
            log: `Swap triggered: ${arr[j + 1]} was larger than ${arr[j]}.`,
          });
        }
      }
    }

    steps.push({
      arr: [...arr],
      i: -1,
      j: -1,
      log: 'Array is fully sorted in ascending order! Verification complete.',
    });
    return steps;
  };

  useEffect(() => {
    const steps = generateSortSteps(sortArray);
    setSortSteps(steps);
    setSortStepIndex(0);
  }, []);

  useEffect(() => {
    if (sortSteps.length > 0 && sortStepIndex < sortSteps.length) {
      const cur = sortSteps[sortStepIndex];
      setSortActiveI(cur.i);
      setSortActiveJ(cur.j);
      setSortLog(cur.log);
    }
  }, [sortStepIndex, sortSteps]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sortIsPlaying) {
      timer = setInterval(() => {
        setSortStepIndex((prev) => {
          if (prev >= sortSteps.length - 1) {
            setSortIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 700);
    }
    return () => clearInterval(timer);
  }, [sortIsPlaying, sortSteps.length]);

  // ==========================================
  // MODULE 4: CODE TRACING LAB
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              STUDIO LABORATORY
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              Visual-First Cognitive Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Logic Visualization Studio
          </h1>
          <p className="text-xs sm:text-sm text-[#BFC2C9] max-w-2xl leading-relaxed">
            Turn abstract code into visual step movements. Inspect runtime memory, pointer shifts, and algorithm invariants rather than just watching a passive animation.
          </p>
        </div>

        {/* Module Switcher Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#08090B] p-1 rounded-xl border border-slate-800 shrink-0">
          {[
            { id: 'binary_search', label: 'Binary Search' },
            { id: 'data_structures', label: 'Data Structures' },
            { id: 'sorting', label: 'Sorting Lab' },
            { id: 'code_trace', label: 'Code Tracing' },
          ].map((mod) => (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeModule === mod.id
                  ? 'bg-slate-200 text-slate-900 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {mod.label}
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================================
          MODULE 1: BINARY SEARCH VISUALIZER
          ========================================================================= */}
      {activeModule === 'binary_search' && (
        <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2d3036] pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-slate-300" />
                Binary Search Halver & Midpoint Elimination
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Targeted divide-and-conquer search in a monotonically sorted array.
              </p>
            </div>

            {/* Target Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Search Target:</span>
              <select
                value={bsTarget}
                onChange={(e) => setBsTarget(Number(e.target.value))}
                className="bg-[#08090B] border border-[#414349] text-white text-xs font-mono px-3 py-1.5 rounded-lg focus:outline-none focus:border-slate-300"
              >
                {bsArray.map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
                <option value={99}>99 (Not Present)</option>
              </select>
            </div>
          </div>

          {/* Stepper Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-[#08090B] p-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBsStep(0)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                title="Reset to beginning"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setBsStep((prev) => Math.max(0, prev - 1))}
                disabled={bsStep === 0}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs"
                title="Previous step"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setBsIsPlaying((prev) => !prev)}
                className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-white text-slate-900 font-bold text-xs flex items-center gap-1.5 shadow"
              >
                {bsIsPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{bsIsPlaying ? 'Pause' : 'Play'}</span>
              </button>
              <button
                onClick={() => setBsStep((prev) => Math.min(bsHistory.length - 1, prev + 1))}
                disabled={bsStep >= bsHistory.length - 1}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs"
                title="Next step"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-xs font-mono text-slate-300">
              Step <span className="text-white font-bold">{bsStep + 1}</span> of {bsHistory.length}
            </div>
          </div>

          {/* Array Visual Display */}
          <div className="p-6 rounded-2xl bg-[#08090B] border border-slate-800 space-y-6 overflow-x-auto">
            <div className="flex items-center justify-center gap-2 min-w-[650px] py-4">
              {bsArray.map((val, idx) => {
                const isEliminated = idx < bsLow || idx > bsHigh;
                const isMid = idx === bsMid;
                const isLow = idx === bsLow;
                const isHigh = idx === bsHigh;
                const isTargetMatch = val === bsTarget && isMid;

                let cellStyle = 'bg-[#17191D] border-slate-700 text-white';
                if (isEliminated) {
                  cellStyle = 'bg-slate-900/40 border-slate-800/40 text-slate-600 opacity-40 line-through';
                } else if (isTargetMatch) {
                  cellStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-200 ring-2 ring-emerald-400 font-bold';
                } else if (isMid) {
                  cellStyle = 'bg-cyan-500/20 border-cyan-400 text-cyan-200 ring-2 ring-cyan-400 font-bold';
                }

                return (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    {/* Top Pointer Badge */}
                    <div className="h-5 text-[10px] font-mono font-bold flex items-center justify-center">
                      {isMid && <span className="text-cyan-400 animate-bounce">MID</span>}
                      {!isMid && isLow && <span className="text-amber-400">LOW</span>}
                      {!isMid && isHigh && <span className="text-rose-400">HIGH</span>}
                    </div>

                    {/* Array Cell Box */}
                    <div
                      className={`w-12 h-14 rounded-xl border flex items-center justify-center font-mono text-sm transition-all duration-300 ${cellStyle}`}
                    >
                      {val}
                    </div>

                    {/* Index Label */}
                    <span className="text-[10px] font-mono text-slate-500">[{idx}]</span>
                  </div>
                );
              })}
            </div>

            {/* Explanation Log */}
            {bsHistory[bsStep] && (
              <div className="p-4 rounded-xl bg-[#121418] border border-slate-700 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">
                  Step {bsStep + 1} Logic Breakdown:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-mono">
                  {bsHistory[bsStep].explanation}
                </p>
                <div className="text-[11px] text-slate-400 pt-1 font-mono">
                  Active interval: [{bsLow} .. {bsHigh}] · Search space reduced by 50%
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODULE 2: DATA STRUCTURE PLAYGROUND (STACK / QUEUE / LINKED LIST)
          ========================================================================= */}
      {activeModule === 'data_structures' && (
        <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2d3036] pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-300" />
                Data Structure State Playground
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Interact with physical memory topologies for LIFO Stacks, FIFO Queues, and Singly Linked Lists.
              </p>
            </div>

            {/* Structure Switcher */}
            <div className="flex items-center gap-1.5 bg-[#08090B] p-1 rounded-xl border border-slate-800">
              {(['stack', 'queue', 'linked_list'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setDsType(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-colors ${
                    dsType === t
                      ? 'bg-slate-200 text-slate-900 font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Action Operations Controller */}
          <div className="flex flex-wrap items-center gap-3 bg-[#08090B] p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Element:</span>
              <input
                type="number"
                value={dsInputVal}
                onChange={(e) => setDsInputVal(e.target.value)}
                className="w-20 px-3 py-1.5 rounded-lg bg-[#17191D] border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-slate-300"
              />
            </div>

            {dsType === 'stack' && (
              <>
                <button
                  onClick={handleStackPush}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-200 hover:bg-white text-slate-900 font-bold text-xs"
                >
                  Push (LIFO)
                </button>
                <button
                  onClick={handleStackPop}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700"
                >
                  Pop Top
                </button>
              </>
            )}

            {dsType === 'queue' && (
              <>
                <button
                  onClick={handleQueueEnqueue}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-200 hover:bg-white text-slate-900 font-bold text-xs"
                >
                  Enqueue (Rear)
                </button>
                <button
                  onClick={handleQueueDequeue}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700"
                >
                  Dequeue (Front)
                </button>
              </>
            )}

            {dsType === 'linked_list' && (
              <>
                <button
                  onClick={handleLinkedListInsertHead}
                  className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-white text-slate-900 font-bold text-xs"
                >
                  Insert Head
                </button>
                <button
                  onClick={handleLinkedListInsertTail}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700"
                >
                  Insert Tail
                </button>
                <button
                  onClick={handleLinkedListDeleteHead}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700"
                >
                  Delete Head
                </button>
                <button
                  onClick={handleLinkedListReverse}
                  className="px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300 font-semibold text-xs border border-cyan-800"
                >
                  Reverse List In-Place
                </button>
              </>
            )}
          </div>

          {/* Visual Canvas Display */}
          <div className="p-8 rounded-2xl bg-[#08090B] border border-slate-800 min-h-[220px] flex items-center justify-center">
            {dsType === 'stack' && (
              <div className="flex flex-col-reverse items-center gap-2 border-b-4 border-l-4 border-r-4 border-slate-600 p-4 rounded-b-xl w-64 bg-[#121418]">
                {stackItems.length === 0 ? (
                  <span className="text-xs text-slate-600 font-mono py-8">Stack is Empty</span>
                ) : (
                  stackItems.map((val, idx) => (
                    <div
                      key={idx}
                      className={`w-full py-2.5 rounded-lg border text-center font-mono text-xs font-bold transition-all ${
                        idx === stackItems.length - 1
                          ? 'bg-slate-200 text-slate-950 border-white shadow'
                          : 'bg-[#17191D] border-slate-700 text-slate-300'
                      }`}
                    >
                      {val} {idx === stackItems.length - 1 && '(TOP)'}
                    </div>
                  ))
                )}
              </div>
            )}

            {dsType === 'queue' && (
              <div className="flex items-center gap-2 overflow-x-auto py-6">
                <span className="text-xs font-mono text-cyan-400 uppercase font-bold mr-2">
                  FRONT ◄
                </span>
                {queueItems.length === 0 ? (
                  <span className="text-xs text-slate-600 font-mono">Queue is Empty</span>
                ) : (
                  queueItems.map((val, idx) => (
                    <div
                      key={idx}
                      className={`w-16 h-14 rounded-xl border flex flex-col items-center justify-center font-mono text-xs font-bold transition-all ${
                        idx === 0
                          ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200'
                          : idx === queueItems.length - 1
                          ? 'bg-amber-950/60 border-amber-500 text-amber-200'
                          : 'bg-[#17191D] border-slate-700 text-slate-200'
                      }`}
                    >
                      <span>{val}</span>
                      <span className="text-[9px] text-slate-500 font-normal">
                        {idx === 0 ? 'head' : idx === queueItems.length - 1 ? 'tail' : `[${idx}]`}
                      </span>
                    </div>
                  ))
                )}
                <span className="text-xs font-mono text-amber-400 uppercase font-bold ml-2">
                  ◄ REAR
                </span>
              </div>
            )}

            {dsType === 'linked_list' && (
              <div className="flex items-center gap-2 overflow-x-auto py-6">
                <span className="text-xs font-mono text-emerald-400 font-bold mr-1">
                  HEAD ──►
                </span>
                {linkedList.length === 0 ? (
                  <span className="text-xs text-slate-600 font-mono">null</span>
                ) : (
                  linkedList.map((val, idx) => (
                    <React.Fragment key={idx}>
                      <div className="flex items-center rounded-xl bg-[#17191D] border border-slate-600 overflow-hidden font-mono text-xs">
                        <div className="px-3.5 py-2.5 font-bold text-white bg-slate-800">
                          {val}
                        </div>
                        <div className="px-2 py-2.5 text-[10px] text-slate-400 border-l border-slate-700">
                          next
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
                    </React.Fragment>
                  ))
                )}
                <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                  null
                </span>
              </div>
            )}
          </div>

          {/* Operation Status Log */}
          <div className="p-3.5 rounded-xl bg-[#08090B] border border-slate-800 text-xs font-mono text-slate-300">
            <span className="text-slate-500 font-bold uppercase mr-2">LOG:</span>
            {dsMessage}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODULE 3: SORTING ALGORITHM ANIMATION
          ========================================================================= */}
      {activeModule === 'sorting' && (
        <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2d3036] pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-slate-300" />
                Algorithm Sorting & Invariant Animator
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Observe adjacent comparison passes, element swaps, and sorted boundary compaction.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const shuffled = [70, 15, 85, 30, 50, 20, 95, 40];
                  setSortArray(shuffled);
                  const st = generateSortSteps(shuffled);
                  setSortSteps(st);
                  setSortStepIndex(0);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700"
              >
                Shuffle Array
              </button>
            </div>
          </div>

          {/* Stepper Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-[#08090B] p-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSortStepIndex(0)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                title="Reset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setSortStepIndex((prev) => Math.max(0, prev - 1))}
                disabled={sortStepIndex === 0}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setSortIsPlaying((prev) => !prev)}
                className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-white text-slate-900 font-bold text-xs flex items-center gap-1.5 shadow"
              >
                {sortIsPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{sortIsPlaying ? 'Pause' : 'Play'}</span>
              </button>
              <button
                onClick={() => setSortStepIndex((prev) => Math.min(sortSteps.length - 1, prev + 1))}
                disabled={sortStepIndex >= sortSteps.length - 1}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-xs font-mono text-slate-300">
              Comparison Step <span className="text-white font-bold">{sortStepIndex + 1}</span> of {sortSteps.length}
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="p-8 rounded-2xl bg-[#08090B] border border-slate-800 space-y-6">
            <div className="h-56 flex items-end justify-center gap-3 sm:gap-4 px-4 border-b border-slate-800 pb-2">
              {(sortSteps[sortStepIndex]?.arr || sortArray).map((val, idx) => {
                const isComparing = idx === sortActiveI || idx === sortActiveJ;

                let barColor = 'bg-slate-600 border-slate-500';
                if (isComparing) {
                  barColor = 'bg-cyan-400 border-white shadow-[0_0_15px_rgba(34,211,238,0.5)]';
                }

                return (
                  <div key={idx} className="flex flex-col items-center gap-2 flex-1 max-w-[48px]">
                    <span className="font-mono text-[10px] text-slate-300 font-bold">{val}</span>
                    <div
                      className={`w-full rounded-t-lg border transition-all duration-300 ${barColor}`}
                      style={{ height: `${(val / 100) * 180}px` }}
                    />
                    <span className="font-mono text-[10px] text-slate-500">[{idx}]</span>
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-xl bg-[#121418] border border-slate-700 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">
                Algorithm Execution State:
              </span>
              <p className="text-xs font-mono text-slate-200">{sortLog}</p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODULE 4: CODE TRACING LAB
          ========================================================================= */}
      {activeModule === 'code_trace' && (
        <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2d3036] pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-slate-300" />
                Line-by-Line Code Tracing Lab
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Step through iterative loop execution with live variable state inspection and output console.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                onClick={() => setTraceStepIdx(0)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              >
                Reset
              </button>
              <button
                onClick={() => setTraceStepIdx((prev) => Math.max(0, prev - 1))}
                disabled={traceStepIdx === 0}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 border border-slate-700"
              >
                Prev
              </button>
              <button
                onClick={() => setTraceStepIdx((prev) => Math.min(traceSteps.length - 1, prev + 1))}
                disabled={traceStepIdx >= traceSteps.length - 1}
                className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-white text-slate-900 font-bold shadow"
              >
                Next Step
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Code Editor Preview (7 cols) */}
            <div className="lg:col-span-7 bg-[#08090B] border border-slate-800 rounded-xl p-4 font-mono text-xs overflow-x-auto space-y-1">
              <div className="text-[10px] text-slate-500 uppercase pb-2 border-b border-slate-800">
                Source: OddNumbersSum.java
              </div>
              {codeLines.map((l) => {
                const isActive = l.line === activeTrace.line;
                return (
                  <div
                    key={l.line}
                    className={`flex items-center gap-3 px-2 py-1 rounded transition-colors ${
                      isActive
                        ? 'bg-slate-800 text-white font-bold border-l-2 border-cyan-400 pl-3'
                        : 'text-slate-400'
                    }`}
                  >
                    <span className="w-5 text-right text-slate-600 select-none">{l.line}</span>
                    <pre className="text-xs">{l.text}</pre>
                  </div>
                );
              })}
            </div>

            {/* Live Variable Watch Table & Output (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Watch Table */}
              <div className="bg-[#08090B] border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between border-b border-slate-800 pb-2">
                  <span>Variable Watch Table</span>
                  <span className="text-[10px] text-emerald-400">Stack Scope</span>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  {Object.entries(activeTrace.vars).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between p-2 rounded bg-[#121418] border border-slate-800">
                      <span className="text-slate-400 font-medium">{k}</span>
                      <span className="text-cyan-300 font-bold">{String(v)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Explanation */}
              <div className="bg-[#121418] border border-slate-700 rounded-xl p-4 space-y-1.5 font-mono text-xs">
                <span className="text-[10px] text-slate-400 uppercase block font-bold">
                  Runtime Step Explanation:
                </span>
                <p className="text-slate-200 leading-relaxed">{activeTrace.desc}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
