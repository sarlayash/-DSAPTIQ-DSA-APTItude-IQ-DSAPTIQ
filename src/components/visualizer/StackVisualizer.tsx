import React, { useState } from 'react';
import {
  Layers,
  ArrowUp,
  ArrowDown,
  Eye,
  Trash2,
  CheckCircle2,
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
    setLog('Stack cleared. TOP pointer reset to -1.');
  };

  // Run Parentheses validator
  const runParenthesesCheck = () => {
    if (isEvaluatingBrackets) return;
    setIsEvaluatingBrackets(true);
    setBracketResult(null);
    setBracketStepLog('Parsing input string using temporary character stack...');

    const cleanStr = bracketString.replace(/\s+/g, '');
    const charStack: string[] = [];
    let isValid = true;
    let step = 0;

    const interval = setInterval(() => {
      if (step < cleanStr.length) {
        const char = cleanStr[step];
        if (char === '(' || char === '[' || char === '{') {
          charStack.push(char);
          setBracketStepLog(`Step ${step + 1}: Found opening bracket '${char}'. Pushed onto stack.`);
        } else if (char === ')' || char === ']' || char === '}') {
          if (charStack.length === 0) {
            isValid = false;
            setBracketStepLog(`Step ${step + 1}: Found closing '${char}' but stack is empty! Mismatch.`);
            clearInterval(interval);
            setIsEvaluatingBrackets(false);
            setBracketResult('invalid');
            return;
          }
          const top = charStack.pop();
          const matches =
            (char === ')' && top === '(') ||
            (char === ']' && top === '[') ||
            (char === '}' && top === '{');

          if (!matches) {
            isValid = false;
            setBracketStepLog(`Step ${step + 1}: Mismatched bracket! Expected matching pair for '${top}', got '${char}'.`);
            clearInterval(interval);
            setIsEvaluatingBrackets(false);
            setBracketResult('invalid');
            return;
          } else {
            setBracketStepLog(`Step ${step + 1}: Matched '${top}' with '${char}'. Popped from stack.`);
          }
        }
        step++;
      } else {
        clearInterval(interval);
        setIsEvaluatingBrackets(false);
        if (isValid && charStack.length === 0) {
          setBracketResult('valid');
          setBracketStepLog('Validation Successful! All brackets correctly matched and stack is empty.');
        } else {
          setBracketResult('invalid');
          setBracketStepLog(`Validation Failed! Unclosed open brackets remaining on stack: [${charStack.join(', ')}].`);
        }
      }
    }, 700);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-extrabold text-blue-950">Stack Laboratory (LIFO)</h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 font-bold">
              Capacity: {stackItems.length} / 7 elements
            </span>
          </div>
          <p className="text-xs text-blue-900 mt-1 font-medium">
            Observe the Last-In First-Out discipline: push, pop, peek, overflow guards, and compiler bracket parsing.
          </p>
        </div>
      </div>

      {/* Main Grid: Visualizer Left + Parentheses Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Stack (7 cols) */}
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
              onClick={handlePush}
              className="px-3 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
            >
              <ArrowDown className="w-3.5 h-3.5" />
              <span>Push (TOP)</span>
            </button>
            <button
              onClick={handlePop}
              className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs border border-red-200 flex items-center gap-1 cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Pop</span>
            </button>
            <button
              onClick={handlePeek}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-blue-900 border border-slate-200 font-bold text-xs flex items-center gap-1 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Peek</span>
            </button>
            <button
              onClick={handleClear}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-red-50 text-red-600 border border-red-200 text-xs font-bold flex items-center gap-1 ml-auto cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>

          {/* Physical Vertical Stack Display */}
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center min-h-[260px]">
            {/* Top Pointer Indicator */}
            <div className="h-6 flex items-center gap-1.5 font-mono text-xs font-extrabold text-red-600">
              {stackItems.length > 0 && (
                <>
                  <span>TOP ──►</span>
                  <span className="text-white bg-blue-900 px-2 py-0.5 rounded shadow-2xs">
                    index [{stackItems.length - 1}]
                  </span>
                </>
              )}
            </div>

            {/* Stack Container Frame */}
            <div className="w-64 border-b-4 border-l-4 border-r-4 border-blue-900 rounded-b-2xl p-3 bg-white flex flex-col-reverse gap-2 shadow-xs min-h-[200px]">
              {stackItems.length === 0 ? (
                <div className="text-center font-mono text-xs text-blue-900 font-bold py-12">
                  Stack is Empty (TOP = -1)
                </div>
              ) : (
                stackItems.map((val, idx) => {
                  const isTop = idx === stackItems.length - 1;
                  const isPeeked = peekIndex === idx;

                  let slotClass = 'bg-slate-50 border-slate-200 text-blue-950';
                  if (isPeeked) {
                    slotClass = 'bg-red-50 border-red-600 text-red-600 font-extrabold ring-2 ring-red-600';
                  } else if (isTop) {
                    slotClass = 'bg-blue-900 border-blue-950 text-white font-extrabold shadow-2xs';
                  }

                  return (
                    <div
                      key={idx}
                      className={`w-full py-2.5 px-4 rounded-xl border flex items-center justify-between font-mono text-xs transition-all duration-300 ${slotClass}`}
                    >
                      <span className="text-[10px] font-bold opacity-70">[{idx}]</span>
                      <span className="text-sm font-extrabold">{val}</span>
                      <span className="text-[10px] font-extrabold">
                        {isTop ? 'TOP' : ''}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
            <span className="text-[11px] font-mono text-blue-900 font-bold mt-2">STACK BASE (Closed)</span>
          </div>
        </div>

        {/* Right Column: Balanced Parentheses Validator (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <div>
              <h3 className="text-sm font-extrabold text-blue-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-900" />
                Real-World App: Parentheses Checker
              </h3>
              <p className="text-[11px] text-blue-900 mt-1 font-medium">
                Compilers and IDEs evaluate balanced brackets using LIFO stack push &amp; pop.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-blue-950 font-mono font-bold">Input Expression:</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={bracketString}
                  onChange={(e) => setBracketString(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-blue-950 font-mono text-xs font-bold focus:outline-none focus:border-blue-400"
                />
                <button
                  onClick={runParenthesesCheck}
                  disabled={isEvaluatingBrackets}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1 shrink-0 shadow-2xs transition-colors cursor-pointer"
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
                    className="px-2 py-0.5 rounded bg-slate-50 hover:bg-blue-50 text-blue-900 font-mono text-[10px] border border-slate-200 font-bold cursor-pointer"
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
                    ? 'bg-blue-50 border-blue-300 text-blue-950'
                    : bracketResult === 'invalid'
                    ? 'bg-red-50 border-red-300 text-red-700'
                    : 'bg-slate-50 border-slate-200 text-blue-950'
                }`}
              >
                <div className="font-extrabold uppercase text-[10px]">
                  {bracketResult ? `Result: ${bracketResult.toUpperCase()}` : 'Evaluating...'}
                </div>
                <p className="text-[11px] leading-relaxed font-medium">{bracketStepLog}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Status Log */}
      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1 font-mono text-xs">
        <span className="text-[10px] text-blue-950 uppercase block font-extrabold">
          Stack Memory Invariant:
        </span>
        <p className="text-blue-950 leading-relaxed font-medium">{log}</p>
      </div>
    </div>
  );
};
