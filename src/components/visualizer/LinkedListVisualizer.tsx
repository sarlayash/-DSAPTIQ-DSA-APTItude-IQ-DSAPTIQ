import React, { useState } from 'react';
import {
  Link as LinkIcon,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  Search,
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface ListNode {
  id: string;
  val: number;
}

export const LinkedListVisualizer: React.FC = () => {
  const [listType, setListType] = useState<'singly' | 'doubly'>('singly');
  const [nodes, setNodes] = useState<ListNode[]>([
    { id: '1', val: 12 },
    { id: '2', val: 25 },
    { id: '3', val: 38 },
    { id: '4', val: 51 },
  ]);
  const [inputVal, setInputVal] = useState<string>('64');
  const [inputIndex, setInputIndex] = useState<string>('2');
  const [activeHighlightIdx, setActiveHighlightIdx] = useState<number | null>(null);
  const [logMessage, setLogMessage] = useState<string>(
    'Linked List initialized with 4 nodes. Pointers configured.'
  );

  const handleInsertHead = () => {
    const v = parseInt(inputVal, 10);
    if (isNaN(v)) return;
    if (nodes.length >= 8) {
      setLogMessage('Maximum visual node limit (8 nodes) reached.');
      return;
    }
    const newNode = { id: String(Date.now()), val: v };
    setNodes([newNode, ...nodes]);
    setActiveHighlightIdx(0);
    setLogMessage(`Inserted node ${v} at HEAD in O(1) time. Head pointer redirected.`);
  };

  const handleInsertTail = () => {
    const v = parseInt(inputVal, 10);
    if (isNaN(v)) return;
    if (nodes.length >= 8) {
      setLogMessage('Maximum visual node limit (8 nodes) reached.');
      return;
    }
    const newNode = { id: String(Date.now()), val: v };
    setNodes([...nodes, newNode]);
    setActiveHighlightIdx(nodes.length);
    setLogMessage(`Inserted node ${v} at TAIL in O(1) time with tail reference.`);
  };

  const handleInsertAtPosition = () => {
    const v = parseInt(inputVal, 10);
    const idx = parseInt(inputIndex, 10);
    if (isNaN(v) || isNaN(idx)) return;
    if (idx < 0 || idx > nodes.length) {
      setLogMessage(`Invalid index ${idx}. Must be within [0 .. ${nodes.length}].`);
      return;
    }
    if (nodes.length >= 8) {
      setLogMessage('Maximum visual node limit (8 nodes) reached.');
      return;
    }
    const newNode = { id: String(Date.now()), val: v };
    const updated = [...nodes];
    updated.splice(idx, 0, newNode);
    setNodes(updated);
    setActiveHighlightIdx(idx);
    setLogMessage(`Inserted ${v} at index ${idx}. Next pointers re-linked in O(k) steps.`);
  };

  const handleDeleteHead = () => {
    if (nodes.length === 0) {
      setLogMessage('List is empty. Underflow on Delete Head.');
      return;
    }
    const removed = nodes[0].val;
    setNodes(nodes.slice(1));
    setActiveHighlightIdx(null);
    setLogMessage(`Deleted HEAD node (${removed}) in O(1) time. Head advanced to next.`);
  };

  const handleDeleteTail = () => {
    if (nodes.length === 0) {
      setLogMessage('List is empty. Underflow on Delete Tail.');
      return;
    }
    const removed = nodes[nodes.length - 1].val;
    setNodes(nodes.slice(0, -1));
    setActiveHighlightIdx(null);
    setLogMessage(`Deleted TAIL node (${removed}) in O(N) time (traversed to (n-1)th node).`);
  };

  const handleSearch = () => {
    const v = parseInt(inputVal, 10);
    if (isNaN(v)) return;

    let idx = 0;
    const interval = setInterval(() => {
      if (idx >= nodes.length) {
        clearInterval(interval);
        setActiveHighlightIdx(null);
        setLogMessage(`Value ${v} not found after traversing entire linked list to NULL.`);
        return;
      }
      setActiveHighlightIdx(idx);
      if (nodes[idx].val === v) {
        clearInterval(interval);
        setLogMessage(`Found value ${v} at index ${idx} in O(${idx + 1}) steps!`);
        return;
      }
      idx++;
    }, 450);
  };

  const handleReverseInPlace = () => {
    if (nodes.length <= 1) {
      setLogMessage('List with ≤ 1 node is already reversed.');
      return;
    }
    setNodes([...nodes].reverse());
    setActiveHighlightIdx(null);
    setLogMessage(
      'Reversed entire list in-place using 3 pointers (prev, curr, next) in O(N) time, O(1) auxiliary space!'
    );
  };

  const handleReset = () => {
    setNodes([
      { id: '1', val: 12 },
      { id: '2', val: 25 },
      { id: '3', val: 38 },
      { id: '4', val: 51 },
    ]);
    setActiveHighlightIdx(null);
    setLogMessage('Reset linked list to default topology.');
  };

  return (
    <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-[#2d3036] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-teal-400" />
            <h2 className="text-xl font-bold text-white">Linked List Studio</h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-950/60 text-teal-300 border border-teal-800">
              {listType === 'singly' ? 'Singly Linked List' : 'Doubly Linked List (Prev ⇄ Next)'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic node memory topology with explicit pointer shifts, head/tail mutations, and in-place reversal.
          </p>
        </div>

        {/* Singly vs Doubly Switcher */}
        <div className="flex items-center gap-1.5 bg-[#08090B] p-1 rounded-xl border border-slate-800">
          {(['singly', 'doubly'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setListType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                listType === t
                  ? 'bg-slate-200 text-slate-900 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t} List
            </button>
          ))}
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex flex-wrap items-center gap-3 bg-[#08090B] p-4 rounded-xl border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Value:</span>
          <input
            type="number"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-16 px-2.5 py-1.5 rounded-lg bg-[#17191D] border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-teal-400"
          />
        </div>

        <button
          onClick={handleInsertHead}
          className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs"
        >
          Insert Head
        </button>
        <button
          onClick={handleInsertTail}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700"
        >
          Insert Tail
        </button>

        <div className="flex items-center gap-1.5 border-l border-slate-800 pl-3">
          <span className="text-slate-400">At Pos:</span>
          <input
            type="number"
            value={inputIndex}
            onChange={(e) => setInputIndex(e.target.value)}
            className="w-12 px-2 py-1.5 rounded-lg bg-[#17191D] border border-slate-700 text-white font-mono text-xs focus:outline-none"
          />
          <button
            onClick={handleInsertAtPosition}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs"
          >
            Insert Pos
          </button>
        </div>

        <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
          <button
            onClick={handleDeleteHead}
            className="px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 font-medium text-xs"
          >
            Del Head
          </button>
          <button
            onClick={handleDeleteTail}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs"
          >
            Del Tail
          </button>
          <button
            onClick={handleSearch}
            className="px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 font-medium text-xs flex items-center gap-1"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
          </button>
          <button
            onClick={handleReverseInPlace}
            className="px-3 py-1.5 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-800 font-semibold text-xs"
          >
            Reverse In-Place
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs ml-auto"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Visual Canvas Display */}
      <div className="p-8 rounded-2xl bg-[#08090B] border border-slate-800 overflow-x-auto min-h-[200px] flex items-center justify-center">
        {nodes.length === 0 ? (
          <div className="text-center font-mono text-xs text-slate-500 py-8">
            Linked List is currently empty (HEAD = NULL)
          </div>
        ) : (
          <div className="flex items-center gap-2 min-w-max py-4">
            {/* HEAD Pointer */}
            <div className="flex flex-col items-center mr-2">
              <span className="text-[11px] font-mono font-bold text-teal-400 tracking-wider uppercase">
                HEAD
              </span>
              <span className="text-teal-400 text-sm">▼</span>
            </div>

            {nodes.map((node, idx) => {
              const isHighlight = activeHighlightIdx === idx;
              const isHead = idx === 0;
              const isTail = idx === nodes.length - 1;

              return (
                <React.Fragment key={node.id}>
                  {/* Visual Node */}
                  <div
                    className={`flex items-center rounded-xl overflow-hidden font-mono text-xs border transition-all duration-300 shadow-md ${
                      isHighlight
                        ? 'border-teal-400 bg-teal-950/60 ring-2 ring-teal-400 scale-105'
                        : 'border-slate-700 bg-[#17191D]'
                    }`}
                  >
                    {/* Prev Pointer slot for Doubly */}
                    {listType === 'doubly' && (
                      <div className="px-2 py-3 bg-slate-900 text-[10px] text-slate-400 border-r border-slate-800 flex items-center gap-0.5">
                        <ArrowLeft className="w-2.5 h-2.5 text-slate-500" />
                        <span>prev</span>
                      </div>
                    )}

                    {/* Data Value Slot */}
                    <div className="px-4 py-3 font-bold text-white text-sm bg-slate-800/80">
                      {node.val}
                    </div>

                    {/* Next Pointer Slot */}
                    <div className="px-2 py-3 bg-slate-900 text-[10px] text-slate-400 border-l border-slate-800 flex items-center gap-0.5">
                      <span>next</span>
                      <ArrowRight className="w-2.5 h-2.5 text-slate-500" />
                    </div>
                  </div>

                  {/* Connecting Arrow */}
                  {idx < nodes.length - 1 ? (
                    <div className="flex flex-col items-center px-1">
                      {listType === 'doubly' ? (
                        <div className="flex flex-col items-center text-teal-400 text-[10px] font-mono">
                          <span>⇄</span>
                        </div>
                      ) : (
                        <ArrowRight className="w-4 h-4 text-teal-400/80 shrink-0" />
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 ml-1">
                      <ArrowRight className="w-4 h-4 text-slate-600" />
                      <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-500 font-bold">
                        NULL
                      </span>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>

      {/* Log banner */}
      <div className="p-4 rounded-xl bg-[#121418] border border-slate-800 space-y-1 font-mono text-xs">
        <span className="text-[10px] text-slate-400 uppercase block font-bold">
          Pointer Invariant:
        </span>
        <p className="text-slate-200 leading-relaxed">{logMessage}</p>
      </div>
    </div>
  );
};
