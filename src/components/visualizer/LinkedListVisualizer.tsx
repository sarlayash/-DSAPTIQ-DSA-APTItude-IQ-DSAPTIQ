import React, { useState } from 'react';
import {
  Link as LinkIcon,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  Search,
  RotateCcw
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
    if (nodes.length >= 8) {
      setLogMessage('Maximum visual node limit reached.');
      return;
    }
    const safeIdx = Math.max(0, Math.min(idx, nodes.length));
    const nextList = [...nodes];
    nextList.splice(safeIdx, 0, { id: String(Date.now()), val: v });
    setNodes(nextList);
    setActiveHighlightIdx(safeIdx);
    setLogMessage(`Inserted node ${v} at index ${safeIdx} in O(N) traversal time.`);
  };

  const handleDeleteHead = () => {
    if (nodes.length === 0) {
      setLogMessage('Underflow: Cannot delete from empty list.');
      return;
    }
    const removed = nodes[0].val;
    setNodes(nodes.slice(1));
    setActiveHighlightIdx(null);
    setLogMessage(`Deleted HEAD node (${removed}) in O(1) time. Head updated.`);
  };

  const handleDeleteTail = () => {
    if (nodes.length === 0) {
      setLogMessage('Underflow: Cannot delete from empty list.');
      return;
    }
    const removed = nodes[nodes.length - 1].val;
    setNodes(nodes.slice(0, nodes.length - 1));
    setActiveHighlightIdx(null);
    setLogMessage(`Deleted TAIL node (${removed}) in O(1) doubly / O(N) singly time.`);
  };

  const handleSearch = () => {
    const v = parseInt(inputVal, 10);
    if (isNaN(v)) return;
    const foundIdx = nodes.findIndex((n) => n.val === v);

    if (foundIdx !== -1) {
      setActiveHighlightIdx(foundIdx);
      setLogMessage(`Target ${v} found at index ${foundIdx} after ${foundIdx + 1} pointer steps.`);
    } else {
      setActiveHighlightIdx(null);
      setLogMessage(`Target ${v} not found after full linear traversal reaching NULL.`);
    }
  };

  const handleReverseInPlace = () => {
    if (nodes.length <= 1) return;
    const reversed = [...nodes].reverse();
    setNodes(reversed);
    setActiveHighlightIdx(null);
    setLogMessage(
      'Reversed linked list in-place using 3 pointers (prev, curr, next) in O(N) time and O(1) space.'
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
    setLogMessage('Reset to default 4-node singly linked list.');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 select-none">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-extrabold text-blue-950">Linked List Laboratory</h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 font-bold">
              Size: {nodes.length} nodes · Mode: {listType.toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-blue-900 mt-1 font-medium">
            Inspect dynamic pointer manipulations: O(1) head insertion, middle indexing, and in-place reversal.
          </p>
        </div>

        {/* List Type Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setListType('singly')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              listType === 'singly'
                ? 'bg-blue-900 text-white shadow-2xs'
                : 'text-blue-900 hover:text-blue-950 hover:bg-blue-100/60'
            }`}
          >
            Singly Linked
          </button>
          <button
            onClick={() => setListType('doubly')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              listType === 'doubly'
                ? 'bg-blue-900 text-white shadow-2xs'
                : 'text-blue-900 hover:text-blue-950 hover:bg-blue-100/60'
            }`}
          >
            Doubly Linked (Prev + Next)
          </button>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-blue-950 font-bold">Value:</span>
          <input
            type="number"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-16 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-blue-950 font-mono text-xs font-bold focus:outline-none focus:border-blue-400"
          />
          <button
            onClick={handleInsertHead}
            className="px-3 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Insert Head</span>
          </button>
          <button
            onClick={handleInsertTail}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-blue-950 font-bold text-xs border border-slate-200 cursor-pointer"
          >
            Insert Tail
          </button>
        </div>

        <div className="flex items-center gap-1.5 border-l border-slate-200 pl-3">
          <span className="text-blue-950 font-bold">At Pos:</span>
          <input
            type="number"
            value={inputIndex}
            onChange={(e) => setInputIndex(e.target.value)}
            className="w-12 px-2 py-1.5 rounded-lg bg-white border border-slate-200 text-blue-950 font-mono text-xs font-bold focus:outline-none"
          />
          <button
            onClick={handleInsertAtPosition}
            className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-blue-900 font-bold text-xs border border-slate-200 cursor-pointer"
          >
            Insert Pos
          </button>
        </div>

        <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
          <button
            onClick={handleDeleteHead}
            className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs cursor-pointer"
          >
            Del Head
          </button>
          <button
            onClick={handleDeleteTail}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-blue-900 border border-slate-200 font-bold text-xs cursor-pointer"
          >
            Del Tail
          </button>
          <button
            onClick={handleSearch}
            className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-950 border border-blue-200 font-bold text-xs flex items-center gap-1 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-blue-900" />
            <span>Search</span>
          </button>
          <button
            onClick={handleReverseInPlace}
            className="px-3 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
          >
            Reverse In-Place
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-blue-900 border border-slate-200 text-xs ml-auto cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Visual Canvas Display */}
      <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 overflow-x-auto min-h-[200px] flex items-center justify-center">
        {nodes.length === 0 ? (
          <div className="text-center font-mono text-xs text-blue-900 font-bold py-8">
            Linked List is currently empty (HEAD = NULL)
          </div>
        ) : (
          <div className="flex items-center gap-2 min-w-max py-4">
            {/* HEAD Pointer */}
            <div className="flex flex-col items-center mr-2">
              <span className="text-[11px] font-mono font-extrabold text-red-600 tracking-wider uppercase">
                HEAD
              </span>
              <span className="text-red-600 text-sm">▼</span>
            </div>

            {nodes.map((node, idx) => {
              const isHighlight = activeHighlightIdx === idx;

              return (
                <React.Fragment key={node.id}>
                  {/* Visual Node */}
                  <div
                    className={`flex items-center rounded-xl overflow-hidden font-mono text-xs border transition-all duration-300 shadow-2xs ${
                      isHighlight
                        ? 'border-red-600 bg-red-50 ring-2 ring-red-600 scale-105'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {/* Prev Pointer slot for Doubly */}
                    {listType === 'doubly' && (
                      <div className="px-2 py-3 bg-slate-100 text-[10px] text-blue-900 font-bold border-r border-slate-200 flex items-center gap-0.5">
                        <ArrowLeft className="w-2.5 h-2.5 text-blue-900" />
                        <span>prev</span>
                      </div>
                    )}

                    {/* Data Value Slot */}
                    <div className={`px-4 py-3 font-extrabold text-sm ${
                      isHighlight ? 'bg-red-600 text-white' : 'bg-blue-950 text-white'
                    }`}>
                      {node.val}
                    </div>

                    {/* Next Pointer Slot */}
                    <div className="px-2 py-3 bg-slate-100 text-[10px] text-blue-900 font-bold border-l border-slate-200 flex items-center gap-0.5">
                      <span>next</span>
                      <ArrowRight className="w-2.5 h-2.5 text-blue-900" />
                    </div>
                  </div>

                  {/* Connecting Arrow */}
                  {idx < nodes.length - 1 ? (
                    <div className="flex flex-col items-center px-1">
                      {listType === 'doubly' ? (
                        <div className="flex flex-col items-center text-blue-900 font-extrabold text-[10px] font-mono">
                          <span>⇄</span>
                        </div>
                      ) : (
                        <ArrowRight className="w-4 h-4 text-blue-900 font-bold shrink-0" />
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 ml-1">
                      <ArrowRight className="w-4 h-4 text-blue-900" />
                      <span className="px-2.5 py-1 rounded bg-slate-200 border border-slate-300 font-mono text-[11px] text-blue-950 font-extrabold">
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
      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1 font-mono text-xs">
        <span className="text-[10px] text-blue-950 uppercase block font-extrabold">
          Pointer Invariant:
        </span>
        <p className="text-blue-950 leading-relaxed font-medium">{logMessage}</p>
      </div>
    </div>
  );
};
