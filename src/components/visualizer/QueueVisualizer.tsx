import React, { useState } from 'react';
import {
  ListOrdered,
  ArrowRight,
  Eye,
  Trash2,
  RotateCcw,
  Cpu,
  Play,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const QueueVisualizer: React.FC = () => {
  const [queueMode, setQueueMode] = useState<'linear' | 'circular'>('linear');
  const [queueItems, setQueueItems] = useState<number[]>([10, 24, 38, 52]);
  const [inputVal, setInputVal] = useState<string>('66');
  const [peekIndex, setPeekIndex] = useState<number | null>(null);
  const [log, setLog] = useState<string>(
    'FIFO (First-In, First-Out) Queue initialized. Enqueue at REAR, Dequeue from FRONT.'
  );

  // OS Task Scheduler Simulation
  const [tasks, setTasks] = useState<{ id: string; name: string; priority: string }[]>([
    { id: 'T-101', name: 'Render 3D Mesh', priority: 'High' },
    { id: 'T-102', name: 'Compile C++ Binary', priority: 'Critical' },
    { id: 'T-103', name: 'Dispatch Analytics', priority: 'Normal' },
  ]);
  const [processedTaskLog, setProcessedTaskLog] = useState<string>('');

  const handleEnqueue = () => {
    const val = parseInt(inputVal, 10);
    if (isNaN(val)) return;
    if (queueItems.length >= 7) {
      setLog('Queue Full Error! Buffer reached maximum visual threshold (7 items).');
      return;
    }
    setQueueItems([...queueItems, val]);
    setPeekIndex(null);
    setLog(`ENQUEUE(${val}): Placed element at REAR of FIFO queue in O(1) time.`);
  };

  const handleDequeue = () => {
    if (queueItems.length === 0) {
      setLog('Queue Underflow Error! Queue is empty. Cannot dequeue.');
      return;
    }
    const removed = queueItems[0];
    setQueueItems(queueItems.slice(1));
    setPeekIndex(null);
    setLog(`DEQUEUE(): Removed oldest element (${removed}) from FRONT of queue in O(1) time.`);
  };

  const handlePeek = () => {
    if (queueItems.length === 0) {
      setLog('Cannot PEEK: Queue is currently empty.');
      return;
    }
    setPeekIndex(0);
    setLog(`PEEK(): Inspecting FRONT element (${queueItems[0]}) without removing it in O(1) time.`);
  };

  const handleClear = () => {
    setQueueItems([]);
    setPeekIndex(null);
    setLog('Queue buffer cleared to empty state.');
  };

  // OS Scheduler Step
  const handleProcessNextTask = () => {
    if (tasks.length === 0) {
      setProcessedTaskLog('All CPU task queue buffers have been executed and retired.');
      return;
    }
    const cur = tasks[0];
    setTasks(tasks.slice(1));
    setProcessedTaskLog(
      `Dispatched task [${cur.id}] "${cur.name}" (Priority: ${cur.priority}) to CPU Core in FIFO order!`
    );
  };

  const handleAddSampleTask = () => {
    const names = [
      'Disk I/O Sync',
      'Memory Compaction',
      'Kafka Consumer Poll',
      'Database WAL Flush',
    ];
    const picked = names[Math.floor(Math.random() * names.length)];
    const newT = {
      id: `T-${Math.floor(100 + Math.random() * 900)}`,
      name: picked,
      priority: 'Normal',
    };
    setTasks([...tasks, newT]);
    setProcessedTaskLog(`Added new task [${newT.id}] "${newT.name}" to CPU scheduling queue.`);
  };

  return (
    <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2d3036] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <ListOrdered className="w-5 h-5 text-sky-400" />
            <h2 className="text-xl font-bold text-white">FIFO Queue Buffer Studio</h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-sky-950/60 text-sky-300 border border-sky-800">
              First-In, First-Out · O(1) Enqueue & Dequeue
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Observe dual-pointer FRONT and REAR shifts, circular modulo ring buffers, and operating system task queues.
          </p>
        </div>

        {/* Linear vs Circular Mode */}
        <div className="flex items-center gap-1.5 bg-[#08090B] p-1 rounded-xl border border-slate-800">
          {(['linear', 'circular'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setQueueMode(m)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                queueMode === m
                  ? 'bg-slate-200 text-slate-900 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {m} Queue
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Queue Display & Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Action Operations Bar */}
          <div className="flex flex-wrap items-center gap-2 bg-[#08090B] p-3.5 rounded-xl border border-slate-800 text-xs">
            <input
              type="number"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-16 px-2.5 py-1.5 rounded-lg bg-[#17191D] border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-sky-400"
            />
            <button
              onClick={handleEnqueue}
              className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs"
            >
              Enqueue (Rear)
            </button>
            <button
              onClick={handleDequeue}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700"
            >
              Dequeue (Front)
            </button>
            <button
              onClick={handlePeek}
              className="px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 font-semibold text-xs flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Peek Front</span>
            </button>
            <button
              onClick={handleClear}
              className="px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs ml-auto"
            >
              Clear
            </button>
          </div>

          {/* Visual Canvas Display */}
          <div className="p-8 rounded-2xl bg-[#08090B] border border-slate-800 flex items-center justify-center min-h-[240px] overflow-x-auto">
            {queueItems.length === 0 ? (
              <div className="text-center font-mono text-xs text-slate-500 py-10">
                Queue Buffer is currently Empty (Front = Rear = NULL)
              </div>
            ) : queueMode === 'linear' ? (
              <div className="flex items-center gap-2 py-4">
                {/* FRONT indicator */}
                <div className="flex flex-col items-center mr-2">
                  <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider">
                    FRONT (Exit)
                  </span>
                  <span className="text-sky-400 text-sm">◄</span>
                </div>

                {queueItems.map((val, idx) => {
                  const isFront = idx === 0;
                  const isRear = idx === queueItems.length - 1;
                  const isPeeked = peekIndex === idx;

                  let cellClass = 'bg-[#17191D] border-slate-700 text-slate-200';
                  if (isPeeked) {
                    cellClass = 'bg-cyan-500/25 border-cyan-400 text-cyan-100 ring-2 ring-cyan-400';
                  } else if (isFront) {
                    cellClass = 'bg-sky-950/70 border-sky-400 text-sky-100 ring-1 ring-sky-400';
                  } else if (isRear) {
                    cellClass = 'bg-amber-950/70 border-amber-400 text-amber-100 ring-1 ring-amber-400';
                  }

                  return (
                    <div
                      key={idx}
                      className={`w-16 h-16 rounded-2xl border flex flex-col items-center justify-center font-mono text-xs font-bold transition-all duration-300 shadow-md ${cellClass}`}
                    >
                      <span className="text-sm">{val}</span>
                      <span className="text-[9px] text-slate-400 font-normal">
                        {isFront ? 'FRONT' : isRear ? 'REAR' : `[${idx}]`}
                      </span>
                    </div>
                  );
                })}

                {/* REAR indicator */}
                <div className="flex flex-col items-center ml-2">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                    REAR (Enter)
                  </span>
                  <span className="text-amber-400 text-sm">►</span>
                </div>
              </div>
            ) : (
              /* Circular Ring Display */
              <div className="flex flex-wrap items-center justify-center gap-3 py-4 max-w-sm">
                {Array.from({ length: 6 }).map((_, idx) => {
                  const hasItem = idx < queueItems.length;
                  const val = hasItem ? queueItems[idx] : '-';
                  const isFront = idx === 0 && hasItem;
                  const isRear = idx === queueItems.length - 1 && hasItem;

                  return (
                    <div
                      key={idx}
                      className={`w-14 h-14 rounded-full border-2 flex flex-col items-center justify-center font-mono text-xs transition-all ${
                        isFront
                          ? 'border-sky-400 bg-sky-950/60 text-sky-200 font-bold'
                          : isRear
                          ? 'border-amber-400 bg-amber-950/60 text-amber-200 font-bold'
                          : hasItem
                          ? 'border-slate-600 bg-[#17191D] text-slate-200'
                          : 'border-slate-800 bg-slate-900/40 text-slate-600 border-dashed'
                      }`}
                    >
                      <span>{val}</span>
                      <span className="text-[8px] text-slate-500">slot {idx}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Real-World OS Task / CPU Job Scheduler (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-[#08090B] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-sky-400" />
                OS CPU Process Scheduler
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                {tasks.length} In Queue
              </span>
            </div>

            <div className="space-y-2">
              {tasks.length === 0 ? (
                <div className="p-4 rounded-xl bg-[#121418] border border-slate-800 text-center font-mono text-xs text-slate-500">
                  CPU Idle · Process queue is empty
                </div>
              ) : (
                tasks.map((t, idx) => (
                  <div
                    key={t.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border font-mono text-xs ${
                      idx === 0
                        ? 'bg-sky-950/40 border-sky-500/40 text-white'
                        : 'bg-[#121418] border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-sky-400 font-bold">{t.id}</span>
                      <span className="font-medium text-slate-200">{t.name}</span>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded border ${
                        t.priority === 'Critical'
                          ? 'bg-rose-950/60 border-rose-800 text-rose-300'
                          : t.priority === 'High'
                          ? 'bg-amber-950/60 border-amber-800 text-amber-300'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      {t.priority}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleProcessNextTask}
                disabled={tasks.length === 0}
                className="flex-1 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Dispatch Next (FIFO)</span>
              </button>
              <button
                onClick={handleAddSampleTask}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                + New Task
              </button>
            </div>

            {processedTaskLog && (
              <div className="p-3 rounded-xl bg-[#121418] border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                <span className="text-[10px] text-sky-400 uppercase font-bold block">
                  Scheduler Event:
                </span>
                <p className="text-[11px] leading-relaxed">{processedTaskLog}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Status Log */}
      <div className="p-4 rounded-xl bg-[#121418] border border-slate-800 space-y-1 font-mono text-xs">
        <span className="text-[10px] text-slate-400 uppercase block font-bold">
          Queue Invariant:
        </span>
        <p className="text-slate-200 leading-relaxed">{log}</p>
      </div>
    </div>
  );
};
