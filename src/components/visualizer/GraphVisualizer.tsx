import React, { useState, useEffect } from 'react';
import {
  Network,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack
} from 'lucide-react';

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface GraphEdge {
  from: string;
  to: string;
}

interface GraphStep {
  currentNode: string;
  visited: string[];
  frontier: string[]; // queue for BFS, stack for DFS
  log: string;
  activeEdge?: { from: string; to: string };
}

export const GraphVisualizer: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<'bfs' | 'dfs'>('bfs');
  const [startNode, setStartNode] = useState<string>('A');

  // Fixed graph structure: 7 vertices
  const nodes: GraphNode[] = [
    { id: 'A', label: 'A', x: 80, y: 140 },
    { id: 'B', label: 'B', x: 200, y: 60 },
    { id: 'C', label: 'C', x: 200, y: 220 },
    { id: 'D', label: 'D', x: 340, y: 60 },
    { id: 'E', label: 'E', x: 340, y: 220 },
    { id: 'F', label: 'F', x: 480, y: 100 },
    { id: 'G', label: 'G', x: 480, y: 200 },
  ];

  // Graph Adjacency List (Undirected)
  const adjacencyList: Record<string, string[]> = {
    A: ['B', 'C'],
    B: ['A', 'D', 'E'],
    C: ['A', 'E'],
    D: ['B', 'F'],
    E: ['B', 'C', 'F', 'G'],
    F: ['D', 'E', 'G'],
    G: ['E', 'F'],
  };

  const edges: GraphEdge[] = [
    { from: 'A', to: 'B' },
    { from: 'A', to: 'C' },
    { from: 'B', to: 'D' },
    { from: 'B', to: 'E' },
    { from: 'C', to: 'E' },
    { from: 'D', to: 'F' },
    { from: 'E', to: 'F' },
    { from: 'E', to: 'G' },
    { from: 'F', to: 'G' },
  ];

  const [steps, setSteps] = useState<GraphStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(900);

  // Compute BFS / DFS traversal steps
  useEffect(() => {
    const generated: GraphStep[] = [];

    if (algorithm === 'bfs') {
      const visited: string[] = [];
      const queue: string[] = [startNode];

      generated.push({
        currentNode: '',
        visited: [],
        frontier: [...queue],
        log: `BFS initialized at starting root vertex ${startNode}. Enqueued to FIFO frontier.`,
      });

      while (queue.length > 0) {
        const u = queue.shift()!;
        if (!visited.includes(u)) {
          visited.push(u);

          generated.push({
            currentNode: u,
            visited: [...visited],
            frontier: [...queue],
            log: `Dequeued vertex ${u} from front of queue. Marked as visited. Inspecting adjacent neighbors...`,
          });

          const neighbors = adjacencyList[u] || [];
          for (const v of neighbors) {
            if (!visited.includes(v) && !queue.includes(v)) {
              queue.push(v);
              generated.push({
                currentNode: u,
                visited: [...visited],
                frontier: [...queue],
                activeEdge: { from: u, to: v },
                log: `Discovered unvisited neighbor ${v} along edge (${u} -> ${v}). Enqueued to back of queue.`,
              });
            }
          }
        }
      }

      generated.push({
        currentNode: '',
        visited: [...visited],
        frontier: [],
        log: `Breadth-First Search (BFS) complete! All reachable vertices traversed level by level in O(V + E) time.`,
      });
    } else {
      // DFS
      const visited: string[] = [];
      const stack: string[] = [startNode];

      generated.push({
        currentNode: '',
        visited: [],
        frontier: [...stack],
        log: `DFS initialized at starting root vertex ${startNode}. Pushed to LIFO call stack.`,
      });

      while (stack.length > 0) {
        const u = stack.pop()!;
        if (!visited.includes(u)) {
          visited.push(u);

          generated.push({
            currentNode: u,
            visited: [...visited],
            frontier: [...stack],
            log: `Popped vertex ${u} from top of stack. Marked as visited. Exploring depth path...`,
          });

          const neighbors = [...(adjacencyList[u] || [])].reverse();
          for (const v of neighbors) {
            if (!visited.includes(v)) {
              stack.push(v);
              generated.push({
                currentNode: u,
                visited: [...visited],
                frontier: [...stack],
                activeEdge: { from: u, to: v },
                log: `Pushed unvisited neighbor ${v} onto call stack along edge (${u} -> ${v}).`,
              });
            }
          }
        }
      }

      generated.push({
        currentNode: '',
        visited: [...visited],
        frontier: [],
        log: `Depth-First Search (DFS) complete! Backtracking explored all branches in O(V + E) time.`,
      });
    }

    setSteps(generated);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [algorithm, startNode]);

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

  const activeStep: GraphStep = steps[currentStepIdx] || {
    currentNode: '',
    visited: [],
    frontier: [],
    log: 'Graph ready.',
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-extrabold text-blue-950">Graph Algorithms Lab (BFS &amp; DFS)</h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 font-bold">
              Time: O(V + E) · Vertices: 7 · Edges: 9
            </span>
          </div>
          <p className="text-xs text-blue-900 mt-1 font-medium">
            Visualize Breadth-First Search (FIFO queue level frontier) and Depth-First Search (LIFO recursion stack).
          </p>
        </div>

        {/* Algorithm Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setAlgorithm('bfs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              algorithm === 'bfs'
                ? 'bg-blue-900 text-white shadow-2xs'
                : 'text-blue-900 hover:text-blue-950 hover:bg-blue-100/60'
            }`}
          >
            BFS (Queue)
          </button>
          <button
            onClick={() => setAlgorithm('dfs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              algorithm === 'dfs'
                ? 'bg-blue-900 text-white shadow-2xs'
                : 'text-blue-900 hover:text-blue-950 hover:bg-blue-100/60'
            }`}
          >
            DFS (Stack)
          </button>
        </div>
      </div>

      {/* Stepper Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStepIdx(0)}
            className="p-2 rounded-lg bg-white hover:bg-slate-100 text-blue-900 border border-slate-200 transition-colors cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentStepIdx((prev) => Math.max(0, prev - 1))}
            disabled={currentStepIdx === 0}
            className="p-2 rounded-lg bg-white hover:bg-slate-100 disabled:opacity-30 text-blue-900 border border-slate-200 transition-colors cursor-pointer"
            title="Prev"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsPlaying((prev) => !prev)}
            className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <button
            onClick={() => setCurrentStepIdx((prev) => Math.min(steps.length - 1, prev + 1))}
            disabled={currentStepIdx >= steps.length - 1}
            className="p-2 rounded-lg bg-white hover:bg-slate-100 disabled:opacity-30 text-blue-900 border border-slate-200 transition-colors cursor-pointer"
            title="Next"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Start node selector */}
          <div className="flex items-center gap-1.5 ml-3 pl-3 border-l border-slate-200 font-bold text-blue-950">
            <span>Root:</span>
            <select
              value={startNode}
              onChange={(e) => setStartNode(e.target.value)}
              className="px-2 py-0.5 rounded bg-white border border-slate-200 text-blue-950 font-mono font-bold cursor-pointer"
            >
              {nodes.map((n) => (
                <option key={n.id} value={n.id}>
                  Vertex {n.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="font-mono text-xs text-blue-900 font-bold">
          Step <span className="text-red-600 font-extrabold">{currentStepIdx + 1}</span> / {steps.length}
        </div>
      </div>

      {/* Main Graph Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Graph SVG (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center min-h-[300px]">
          <svg viewBox="0 0 560 280" className="w-full max-w-[560px] h-[260px] select-none">
            {/* Edges */}
            {edges.map((e) => {
              const fromN = nodes.find((n) => n.id === e.from)!;
              const toN = nodes.find((n) => n.id === e.to)!;
              const isActiveEdge =
                activeStep.activeEdge &&
                ((activeStep.activeEdge.from === e.from && activeStep.activeEdge.to === e.to) ||
                  (activeStep.activeEdge.from === e.to && activeStep.activeEdge.to === e.from));

              return (
                <line
                  key={`${e.from}-${e.to}`}
                  x1={fromN.x}
                  y1={fromN.y}
                  x2={toN.x}
                  y2={toN.y}
                  stroke={isActiveEdge ? '#DC2626' : '#1E3A8A'}
                  strokeWidth={isActiveEdge ? '3.5' : '2'}
                  className="transition-all duration-300"
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const isCurrent = activeStep.currentNode === node.id;
              const isVisited = activeStep.visited.includes(node.id);
              const isFrontier = activeStep.frontier.includes(node.id);

              let fill = '#0A192F';
              let stroke = '#1E3A8A';
              let textFill = '#FFFFFF';

              if (isCurrent) {
                fill = '#DC2626';
                stroke = '#EF4444';
                textFill = '#FFFFFF';
              } else if (isVisited) {
                fill = '#1E3A8A';
                stroke = '#3B82F6';
                textFill = '#FFFFFF';
              } else if (isFrontier) {
                fill = '#1E40AF';
                stroke = '#93C5FD';
                textFill = '#FFFFFF';
              }

              return (
                <g key={node.id} className="transition-all duration-300">
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="22"
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={isCurrent ? '3.5' : '2'}
                    filter={isCurrent ? 'drop-shadow(0px 0px 8px rgba(220, 38, 38, 0.7))' : undefined}
                  />
                  <text
                    x={node.x}
                    y={node.y + 5}
                    textAnchor="middle"
                    fill={textFill}
                    fontSize="13"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Frontier State (Queue / Stack) + Visited Set (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active Memory Structure (Queue / Stack) */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 font-mono text-xs shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-extrabold text-blue-950 uppercase">
                {algorithm === 'bfs' ? 'FIFO Queue' : 'LIFO Stack'}
              </span>
              <span className="text-[10px] text-red-600 font-bold">
                {algorithm === 'bfs' ? 'Frontier' : 'Call Stack'}
              </span>
            </div>

            <div className="min-h-[48px] flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200 overflow-x-auto">
              {activeStep.frontier.length === 0 ? (
                <span className="text-blue-900 text-[11px] font-medium italic">Empty</span>
              ) : (
                activeStep.frontier.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-blue-900 text-white font-extrabold text-xs shadow-2xs"
                  >
                    {item}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Visited Set */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 font-mono text-xs shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-extrabold text-blue-950 uppercase">Visited Set</span>
              <span className="text-[10px] text-blue-900 font-bold">
                {activeStep.visited.length} / {nodes.length} Vertices
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
              {activeStep.visited.length === 0 ? (
                <span className="text-blue-900 text-[11px] font-medium italic">None</span>
              ) : (
                activeStep.visited.map((v) => (
                  <span
                    key={v}
                    className="px-2 py-0.5 rounded bg-red-50 text-red-600 border border-red-200 font-extrabold"
                  >
                    {v}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Adjacency List Preview */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5 font-mono text-[11px] shadow-2xs">
            <span className="text-[10px] text-blue-900 font-extrabold uppercase block">
              Adjacency List:
            </span>
            <div className="space-y-1 text-blue-900">
              {Object.entries(adjacencyList).slice(0, 4).map(([k, neighbors]) => (
                <div key={k} className="flex gap-2">
                  <span className="text-blue-950 font-extrabold">{k}:</span>
                  <span className="font-medium">[{neighbors.join(', ')}]</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Traversal Log */}
      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1 font-mono text-xs">
        <span className="text-[10px] text-blue-950 uppercase block font-extrabold">
          Traversal Invariant:
        </span>
        <p className="text-blue-950 leading-relaxed font-medium">{activeStep.log}</p>
      </div>
    </div>
  );
};
