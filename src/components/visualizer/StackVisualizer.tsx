import React, { useState } from 'react';
import {
  Layers,
  ArrowUp,
  ArrowDown,
  Eye,
  Trash2,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Play
} from 'lucide-react';

export const StackVisualizer: React.FC = () => {
  const [stackItems, setStackItems] = useState<number[]>([15, 28, 42, 59]);
  const [inputVal, setInputVal] = useState<string>('73');
  const [peekIndex, setPeekIndex] = useState<number | null>(null);
  const [log, setLog] = useState<string>(
    'LIFO (Last-In, First-Out) Stack initialized. Elements enter and exit through TOP.'
  );

  // Balanced Parentheses Interactive Demonstration
  const [bracketString, setBracketString] = useState<string>('{ [ ( ) ] }');
  const [bracketStepLog, setBracketStepLog] = useState<string>('');
  const [isEvaluatingBrackets, setIsEvaluatingBrackets] = useState<boolean>(false);
  const [bracketResult, setBracketResult] = useState<'valid' | 'invalid' | null>(null);

  const handlePush = () => {
    const val = parseInt(inputVal, 10);
    if (isNaN(val)) return;
    if (stackItems.length >= 7) {
      setLog('Stack Overflow Error! Maximum stack capacity (7) reached.');
      return;
    }
    setStackItems([...stackItems, val]);
    setPeekIndex(null);
    setLog(`PUSH(${val}): Incremented TOP pointer. Pushed ${val} onto stack in O(1) time.`);
  };

  const handlePop = () => {
    if (stackItems.length === 0) {
      setLog('Stack Underflow Error! Cannot pop from empty stack.');
      return;
    }
    const popped = stackItems[stackItems.length - 1];
    setStackItems(stackItems.slice(0, -1));
    setPeekIndex(null);
    setLog(`POP(): Removed TOP element (${popped}) in O(1) time. Decremented TOP pointer.`);
  };

  const handlePeek = () => {
    if (stackItems.length === 0) {
      setLog('Cannot PEEK: Stack is empty.');
      return;
    }
    setPeekIndex(stackItems.length - 1);
    setLog(`PEEK(): Inspecting TOP element (${stackItems[stackItems.length - 1]}) without removal in O(1) time.`);
  };

  const handleClear = () => {
    setStackItems([]);
    setPeekIndex(null);
    setLog('Stack cleared to empty state (TOP = -1).');
  };

  // Run Balanced Parentheses check
  const runParenthesesCheck = () => {
    if (isEvaluatingBrackets) return;
    setIsEvaluatingBrackets(true);
    setBracketResult(null);

    const chars = bracketString.replace(/\s+/g, '').split('');
    const tempStack: string[] = [];
    let idx = 0;

    const matching: Record<string, string> = {
      ')': '(',
      '}': '{',
      ']': '[',
    };

    const interval = setInterval(() => {
      if (idx >= chars.length) {
        clearInterval(interval);
        setIsEvaluatingBrackets(false);
        if (tempStack.length === 0) {
          setBracketResult('valid');
          setBracketStepLog('Completed! All opening brackets had matching closing brackets in correct LIFO order.');
        } else {
          setBracketResult('invalid');
          setBracketStepLog(`Invalid! Unclosed brackets remain on stack: [${tempStack.join(', ')}].`);
        }
        return;
      }

      const ch = chars[idx];
      if (ch === '(' || ch === '{' || ch === '[') {
        tempStack.push(ch);
        setBracketStepLog(`Char '${ch}' is opening bracket. PUSH onto verification stack: [${tempStack.join(', ')}].`);
      } else if (ch === ')' || ch === '}' || ch === ']') {
        const expected = matching[ch];
        if (tempStack.length === 0 || tempStack[tempStack.length - 1] !== expected) {
          clearInterval(interval);
          setIsEvaluatingBrackets(false);
          setBracketResult('invalid');
          setBracketStepLog(`Mismatch detected at '${ch}'! Expected '${expected}', but found '${tempStack[tempStack.length - 1] || 'Empty Stack'}'.`);
          return;
        } else {
          tempStack.pop();
          setBracketStepLog(`Matched '${ch}' with '${expected}'! POP from stack. Remaining: [${tempStack.join(', ')}].`);
        }
      }
      idx++;
    }, 600);
  };

  return (
    <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2d3036] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white">LIFO Stack Memory Studio</h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800">
              Last-In, First-Out · O(1) Push/Pop
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Physical call stack topology: inspect TOP pointer shifts, overflow guards, and real-world parentheses validation.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-300 bg-[#08090B] px-3 py-1.5 rounded-xl border border-slate-800">
          Capacity: <span className="text-purple-400 font-bold">{stackItems.length}</span> / 7 Slots
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Stack Controls & Visual Cylinder (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Operations Bar */}
          <div className="flex flex-wrap items-center gap-2 bg-[#08090B] p-3.5 rounded-xl border border-slate-800 text-xs">
            <input
              type="number"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-16 px-2.5 py-1.5 rounded-lg bg-[#17191D] border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-purple-400"
            />
            <button
              onClick={handlePush}
              className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1 shadow"
            >
              <ArrowDown className="w-3.5 h-3.5" />
              <span>Push (TOP)</span>
            </button>
            <button
              onClick={handlePop}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center gap-1"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Pop</span>
            </button>
            <button
              onClick={handlePeek}
              className="px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 font-semibold text-xs flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Peek</span>
            </button>
            <button
              onClick={handleClear}
              className="px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs flex items-center gap-1 ml-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>

          {/* Physical Vertical Stack Display */}
          <div className="p-8 rounded-2xl bg-[#08090B] border border-slate-800 flex flex-col items-center justify-center min-h-[260px]">
            {/* Top Pointer Indicator */}
            <div className="h-6 flex items-center gap-1.5 font-mono text-xs font-bold text-purple-400">
              {stackItems.length > 0 && (
                <>
                  <span>TOP ──►</span>
                  <span className="text-white bg-purple-900/60 px-2 py-0.5 rounded border border-purple-500/50">
                    index [{stackItems.length - 1}]
                  </span>
                </>
              )}
            </div>

            {/* Stack Container Frame */}
            <div className="w-64 border-b-4 border-l-4 border-r-4 border-purple-500/60 rounded-b-2xl p-3 bg-[#121418] flex flex-col-reverse gap-2 shadow-2xl min-h-[200px]">
              {stackItems.length === 0 ? (
                <div className="text-center font-mono text-xs text-slate-500 py-12">
                  Stack is Empty (TOP = -1)
                </div>
              ) : (
                stackItems.map((val, idx) => {
                  const isTop = idx === stackItems.length - 1;
                  const isPeeked = peekIndex === idx;

                  let slotClass = 'bg-[#17191D] border-slate-700 text-slate-300';
                  if (isPeeked) {
                    slotClass = 'bg-cyan-500/25 border-cyan-400 text-cyan-100 ring-2 ring-cyan-400';
                  } else if (isTop) {
                    slotClass = 'bg-purple-600/30 border-purple-400 text-purple-100 font-bold ring-1 ring-purple-400';
                  }

                  return (
                    <div
                      key={idx}
                      className={`w-full py-2.5 px-4 rounded-xl border flex items-center justify-between font-mono text-xs transition-all duration-300 ${slotClass}`}
                    >
                      <span className="text-[10px] text-slate-500">[{idx}]</span>
                      <span className="text-sm font-bold">{val}</span>
                      <span className="text-[10px] font-bold text-purple-300">
                        {isTop ? 'TOP' : ''}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
            <span className="text-[11px] font-mono text-slate-500 mt-2">STACK BASE (Closed)</span>
          </div>
        </div>

        {/* Right Column: Real-World Balanced Parentheses Validator (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-[#08090B] border border-slate-800 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Real-World App: Parentheses Checker
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">
                Compilers and IDEs evaluate balanced brackets using LIFO stack push & pop.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-slate-400 font-mono">Input Expression:</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={bracketString}
                  onChange={(e) => setBracketString(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-[#17191D] border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-purple-400"
                />
                <button
                  onClick={runParenthesesCheck}
                  disabled={isEvaluatingBrackets}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shrink-0"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Verify</span>
                </button>
              </div>

              {/* Sample presets */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['{ [ ( ) ] }', '( ( { [ ] } ) )', '{ [ ( ] ) }'].map((sample) => (
                  <button
                    key={sample}
                    onClick={() => setBracketString(sample)}
                    className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[10px] border border-slate-700"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>

            {/* Validation Log */}
            {bracketStepLog && (
              <div
                className={`p-3 rounded-xl border text-xs font-mono space-y-1 ${
                  bracketResult === 'valid'
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : bracketResult === 'invalid'
                    ? 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                    : 'bg-[#121418] border-slate-800 text-slate-300'
                }`}
              >
                <div className="font-bold uppercase text-[10px]">
                  {bracketResult ? `Result: ${bracketResult.toUpperCase()}` : 'Evaluating...'}
                </div>
                <p className="text-[11px] leading-relaxed">{bracketStepLog}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Status Log */}
      <div className="p-4 rounded-xl bg-[#121418] border border-slate-800 space-y-1 font-mono text-xs">
        <span className="text-[10px] text-slate-400 uppercase block font-bold">
          Stack Memory Invariant:
        </span>
        <p className="text-slate-200 leading-relaxed">{log}</p>
      </div>
    </div>
  );
};
