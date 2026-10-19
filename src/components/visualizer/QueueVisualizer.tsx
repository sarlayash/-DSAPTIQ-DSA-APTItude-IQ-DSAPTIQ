import React, { useState } from 'react';
import {
  ListOrdered,
  Eye,
  Trash2,
  Cpu,
  Play
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
    setLog('Queue buffer cleared. FRONT and REAR reset to null.');
  };

  // OS Task Dispatch (FIFO)
  const handleProcessNextTask = () => {
    if (tasks.length === 0) return;
    const dispatched = tasks[0];
    setTasks(tasks.slice(1));
    setProcessedTaskLog(
      `Dispatched [${dispatched.id}: ${dispatched.name}] (Priority: ${dispatched.priority}) to CPU core in FIFO arrival sequence.`
    );
  };

  const handleAddSampleTask = () => {
    const randomNum = Math.floor(Math.random() * 800 + 100);
    const newTasks = [
      ...tasks,
      {
        id: `T-${randomNum}`,
        name: `Async Service Job #${randomNum}`,
        priority: randomNum % 2 === 0 ? 'High' : 'Normal',
      },
    ];
    setTasks(newTasks);
    setProcessedTaskLog(`Enqueued new task T-${randomNum} at REAR of process queue.`);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 select-none">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <ListOrdered className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-extrabold text-blue-950">Queue Laboratory (FIFO)</h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 font-bold">
              Capacity: {queueItems.length} / 7 elements
            </span>
          </div>
          <p className="text-xs text-blue-900 mt-1 font-medium">
            First-In First-Out buffering: enqueue at rear, dequeue from front, circular array modes, and CPU job scheduling.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setQueueMode('linear')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              queueMode === 'linear'
                ? 'bg-blue-900 text-white shadow-2xs'
                : 'text-blue-900 hover:text-blue-950 hover:bg-blue-100/60'
            }`}
          >
            Linear Queue
          </button>
          <button
            onClick={() => setQueueMode('circular')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              queueMode === 'circular'
                ? 'bg-blue-900 text-white shadow-2xs'
                : 'text-blue-900 hover:text-blue-950 hover:bg-blue-100/60'
            }`}
          >
            Circular Ring Queue
          </button>
        </div>
      </div>

      {/* Main Grid: Visualizer Left + Task Scheduler Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Queue (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <span className="text-blue-950 font-bold">Value:</span>
            <input
              type="number"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-16 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-blue-950 font-mono text-xs font-bold focus:outline-none focus:border-blue-400"
            />
            <button
              onClick={handleEnqueue}
              className="px-3 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
            >
              Enqueue (Rear)
            </button>
            <button
              onClick={handleDequeue}
              className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs border border-red-200 cursor-pointer"
            >
              Dequeue (Front)
            </button>
            <button
              onClick={handlePeek}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-blue-900 border border-slate-200 font-bold text-xs flex items-center gap-1 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-blue-900" />
              <span>Peek Front</span>
            </button>
            <button
              onClick={handleClear}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-red-50 text-red-600 border border-red-200 text-xs font-bold ml-auto cursor-pointer"
            >
              Clear
            </button>
          </div>

          {/* Visual Canvas Display */}
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center min-h-[240px] overflow-x-auto">
            {queueItems.length === 0 ? (
              <div className="text-center font-mono text-xs text-blue-900 font-bold py-10">
                Queue Buffer is currently Empty (Front = Rear = NULL)
              </div>
            ) : queueMode === 'linear' ? (
              <div className="flex items-center gap-2 py-4">
                {/* FRONT indicator */}
                <div className="flex flex-col items-center mr-2">
                  <span className="text-[10px] font-mono font-extrabold text-blue-950 uppercase tracking-wider">
                    FRONT (Exit)
                  </span>
                  <span className="text-blue-950 text-sm">◄</span>
                </div>

                {queueItems.map((val, idx) => {
                  const isFront = idx === 0;
                  const isRear = idx === queueItems.length - 1;
                  const isPeeked = peekIndex === idx;

                  let cellClass = 'bg-white border-slate-200 text-blue-950';
                  if (isPeeked) {
                    cellClass = 'bg-red-50 border-red-600 text-red-600 font-extrabold ring-2 ring-red-600';
                  } else if (isFront) {
                    cellClass = 'bg-blue-900 border-blue-950 text-white font-extrabold shadow-2xs';
                  } else if (isRear) {
                    cellClass = 'bg-red-600 border-red-700 text-white font-extrabold shadow-2xs';
                  }

                  return (
                    <div
                      key={idx}
                      className={`w-16 h-16 rounded-2xl border flex flex-col items-center justify-center font-mono text-xs font-bold transition-all duration-300 shadow-2xs ${cellClass}`}
                    >
                      <span className="text-sm font-extrabold">{val}</span>
                      <span className="text-[9px] font-bold opacity-80">
                        {isFront ? 'FRONT' : isRear ? 'REAR' : `[${idx}]`}
                      </span>
                    </div>
                  );
                })}

                {/* REAR indicator */}
                <div className="flex flex-col items-center ml-2">
                  <span className="text-[10px] font-mono font-extrabold text-red-600 uppercase tracking-wider">
                    REAR (Enter)
                  </span>
                  <span className="text-red-600 text-sm">►</span>
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
                          ? 'border-blue-900 bg-blue-50 text-blue-950 font-extrabold shadow-2xs'
                          : isRear
                          ? 'border-red-600 bg-red-50 text-red-600 font-extrabold shadow-2xs'
                          : hasItem
                          ? 'border-slate-300 bg-white text-blue-950 font-bold'
                          : 'border-slate-200 bg-slate-100 text-blue-900/40 border-dashed'
                      }`}
                    >
                      <span>{val}</span>
                      <span className="text-[8px] font-semibold opacity-70">slot {idx}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Real-World OS Task / CPU Job Scheduler (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-blue-950 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-blue-900" />
                OS CPU Process Scheduler
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 font-bold">
                {tasks.length} In Queue
              </span>
            </div>

            <div className="space-y-2">
              {tasks.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center font-mono text-xs text-blue-900 font-medium">
                  CPU Idle · Process queue is empty
                </div>
              ) : (
                tasks.map((t, idx) => (
                  <div
                    key={t.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border font-mono text-xs ${
                      idx === 0
                        ? 'bg-blue-50 border-blue-300 text-blue-950 font-bold'
                        : 'bg-slate-50 border-slate-200 text-blue-900'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-blue-900 font-extrabold">{t.id}</span>
                      <span className="font-semibold">{t.name}</span>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded border font-bold ${
                        t.priority === 'Critical'
                          ? 'bg-red-50 border-red-200 text-red-600'
                          : t.priority === 'High'
                          ? 'bg-blue-50 border-blue-200 text-blue-900'
                          : 'bg-slate-100 border-slate-200 text-blue-800'
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
                className="flex-1 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 disabled:opacity-40 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Dispatch Next (FIFO)</span>
              </button>
              <button
                onClick={handleAddSampleTask}
                className="px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-blue-950 text-xs font-bold border border-slate-200 cursor-pointer"
              >
                + New Task
              </button>
            </div>

            {processedTaskLog && (
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs font-mono text-blue-950 space-y-1">
                <span className="text-[10px] text-red-600 uppercase font-extrabold block">
                  Scheduler Event:
                </span>
                <p className="text-[11px] leading-relaxed font-medium">{processedTaskLog}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Status Log */}
      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1 font-mono text-xs">
        <span className="text-[10px] text-blue-950 uppercase block font-extrabold">
          Queue Invariant:
        </span>
        <p className="text-blue-950 leading-relaxed font-medium">{log}</p>
      </div>
    </div>
  );
};
