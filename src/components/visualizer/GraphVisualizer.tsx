import React, { useState, useEffect } from 'react';
import {
  Network,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Layers,
  ArrowRight,
  CheckCircle2,
  ListFilter
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
  const [speed, setSpeed] = useState<number>(1000);

  // Generate BFS or DFS steps
  useEffect(() => {
    const generated: GraphStep[] = [];

    if (algorithm === 'bfs') {
      // Breadth-First Search using Queue (FIFO)
      const queue: string[] = [startNode];
      const visited: Set<string> = new Set([startNode]);

      generated.push({
        currentNode: startNode,
        visited: Array.from(visited),
        frontier: [...queue],
        log: `Starting BFS at vertex ${startNode}. Enqueued ${startNode} into FIFO Queue.`,
      });

      while (queue.length > 0) {
        const u = queue.shift()!;
        generated.push({
          currentNode: u,
          visited: Array.from(visited),
          frontier: [...queue],
          log: `Dequeued vertex ${u} from front of Queue. Inspecting unvisited neighbors.`,
        });

        const neighbors = adjacencyList[u] || [];
        for (const v of neighbors) {
          if (!visited.has(v)) {
            visited.add(v);
            queue.push(v);
            generated.push({
              currentNode: u,
              visited: Array.from(visited),
              frontier: [...queue],
              activeEdge: { from: u, to: v },
              log: `Discovered unvisited neighbor ${v}. Marked visited and Enqueued into Queue [${queue.join(', ')}].`,
            });
          }
        }
      }

      generated.push({
        currentNode: '',
        visited: Array.from(visited),
        frontier: [],
        log: `BFS traversal finished! Visited all ${visited.size} connected vertices in level-order distance.`,
      });
    } else {
      // Depth-First Search using Call Stack (LIFO)
      const stack: string[] = [startNode];
      const visited: Set<string> = new Set();

      generated.push({
        currentNode: startNode,
        visited: [],
        frontier: [...stack],
        log: `Starting DFS at vertex ${startNode}. Pushed ${startNode} onto Call Stack.`,
      });

      while (stack.length > 0) {
        const u = stack.pop()!;
        if (!visited.has(u)) {
          visited.add(u);
          generated.push({
            currentNode: u,
            visited: Array.from(visited),
            frontier: [...stack],
            log: `Popped vertex ${u} from Stack. Marked as visited.`,
          });

          const neighbors = adjacencyList[u] || [];
          // reverse order so first neighbor is popped first
          for (const v of [...neighbors].reverse()) {
            if (!visited.has(v)) {
              stack.push(v);
              generated.push({
                currentNode: u,
                visited: Array.from(visited),
                frontier: [...stack],
                activeEdge: { from: u, to: v },
                log: `Explored edge (${u} ── ${v}). Pushed neighbor ${v} onto Stack [${stack.join(', ')}].`,
              });
            }
          }
        }
      }

      generated.push({
        currentNode: '',
        visited: Array.from(visited),
        frontier: [],
        log: `DFS traversal complete! All reachable depths explored.`,
      });
    }

    setSteps(generated);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [algorithm, startNode]);

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
    currentNode: '',
    visited: [],
    frontier: [],
    log: 'Graph visualizer ready.',
  };

  return (
    <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-[#2d3036] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Graph Traversal Lab (BFS & DFS)</h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800">
              {algorithm === 'bfs' ? 'Queue (FIFO) · O(V + E)' : 'Stack (LIFO) · O(V + E)'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Observe network discovery frontiers, FIFO Queue versus LIFO Call Stack memory, and shortest path level expansion.
          </p>
        </div>

        {/* Algorithm Switcher */}
        <div className="flex items-center gap-1.5 bg-[#08090B] p-1 rounded-xl border border-slate-800">
          {(
            [
              { id: 'bfs', label: 'Breadth-First Search (BFS)' },
              { id: 'dfs', label: 'Depth-First Search (DFS)' },
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

      {/* Start Node & Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#08090B] p-4 rounded-xl border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Source Vertex:</span>
          <div className="flex items-center gap-1">
            {nodes.map((n) => (
              <button
                key={n.id}
                onClick={() => setStartNode(n.id)}
                className={`w-7 h-7 rounded-lg font-mono text-xs font-bold border transition-all ${
                  startNode === n.id
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow'
                    : 'bg-[#17191D] border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStepIdx(0)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentStepIdx((prev) => Math.max(0, prev - 1))}
            disabled={currentStepIdx === 0}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 text-xs"
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
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 text-xs"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="text-xs font-mono text-slate-300">
          Step <span className="text-white font-bold">{currentStepIdx + 1}</span> of {steps.length}
        </div>
      </div>

      {/* Visual Canvas (Graph Network + Memory Queue/Stack) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Graph SVG (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-[#08090B] border border-slate-800 flex items-center justify-center min-h-[300px]">
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
                  stroke={isActiveEdge ? '#818cf8' : '#334155'}
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

              let fill = '#1e293b';
              let stroke = '#475569';
              let textFill = '#cbd5e1';

              if (isCurrent) {
                fill = '#4f46e5';
                stroke = '#a5b4fc';
                textFill = '#ffffff';
              } else if (isVisited) {
                fill = '#059669';
                stroke = '#34d399';
                textFill = '#ecfdf5';
              } else if (isFrontier) {
                fill = '#0e7490';
                stroke = '#22d3ee';
                textFill = '#cffafe';
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
                    filter={isCurrent ? 'drop-shadow(0px 0px 10px rgba(99, 102, 241, 0.8))' : undefined}
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
          <div className="p-4 rounded-xl bg-[#08090B] border border-slate-800 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-slate-300 uppercase">
                {algorithm === 'bfs' ? 'FIFO Queue' : 'LIFO Stack'}
              </span>
              <span className="text-[10px] text-indigo-400">
                {algorithm === 'bfs' ? 'Frontier' : 'Call Stack'}
              </span>
            </div>

            <div className="min-h-[48px] flex items-center gap-1.5 p-2 rounded-lg bg-[#121418] border border-slate-800 overflow-x-auto">
              {activeStep.frontier.length === 0 ? (
                <span className="text-slate-500 text-[11px] italic">Empty</span>
              ) : (
                activeStep.frontier.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-indigo-950/80 text-indigo-200 border border-indigo-700/60 font-bold"
                  >
                    {item}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Visited Set */}
          <div className="p-4 rounded-xl bg-[#08090B] border border-slate-800 space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-slate-300 uppercase">Visited Set</span>
              <span className="text-[10px] text-emerald-400">
                {activeStep.visited.length} / {nodes.length} Vertices
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-lg bg-[#121418] border border-slate-800">
              {activeStep.visited.length === 0 ? (
                <span className="text-slate-500 text-[11px] italic">None</span>
              ) : (
                activeStep.visited.map((v) => (
                  <span
                    key={v}
                    className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700 font-bold"
                  >
                    {v}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Adjacency List Preview */}
          <div className="p-4 rounded-xl bg-[#08090B] border border-slate-800 space-y-1.5 font-mono text-[11px]">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">
              Adjacency List:
            </span>
            <div className="space-y-1 text-slate-400">
              {Object.entries(adjacencyList).slice(0, 4).map(([k, neighbors]) => (
                <div key={k} className="flex gap-2">
                  <span className="text-white font-bold">{k}:</span>
                  <span>[{neighbors.join(', ')}]</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Traversal Log */}
      <div className="p-4 rounded-xl bg-[#121418] border border-slate-800 space-y-1 font-mono text-xs">
        <span className="text-[10px] text-slate-400 uppercase block font-bold">
          Traversal Invariant:
        </span>
        <p className="text-slate-200 leading-relaxed">{activeStep.log}</p>
      </div>
    </div>
  );
};
