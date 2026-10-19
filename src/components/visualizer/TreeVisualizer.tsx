import React, { useState, useEffect } from 'react';
import {
  GitFork,
  Play,
  RotateCcw,
  Plus,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
  ArrowRight
} from 'lucide-react';

interface TreeNode {
  id: string;
  val: number;
  left?: TreeNode;
  right?: TreeNode;
  x: number;
  y: number;
}

type TraversalType = 'inorder' | 'preorder' | 'postorder' | 'levelorder';

export const TreeVisualizer: React.FC = () => {
  // Tree values list
  const [nodeValues, setNodeValues] = useState<number[]>([50, 30, 70, 20, 40, 60, 80]);
  const [inputVal, setInputVal] = useState<string>('25');
  const [activeHighlightId, setActiveHighlightId] = useState<number | null>(null);
  const [highlightPath, setHighlightPath] = useState<number[]>([]);
  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
  const [traversalOutput, setTraversalOutput] = useState<number[]>([]);
  const [statusLog, setStatusLog] = useState<string>(
    'Binary Search Tree initialized with 7 balanced nodes. Ready for operations.'
  );

  const [isTraversing, setIsTraversing] = useState<boolean>(false);
  const [activeTraversalType, setActiveTraversalType] = useState<TraversalType>('inorder');

  // Helper to build BST and compute (x, y) coordinates
  const buildBST = (vals: number[]): TreeNode | null => {
    if (vals.length === 0) return null;

    interface RawNode {
      val: number;
      left?: RawNode;
      right?: RawNode;
    }

    const insertRaw = (root: RawNode | undefined, val: number): RawNode => {
      if (!root) return { val };
      if (val < root.val) {
        root.left = insertRaw(root.left, val);
      } else if (val > root.val) {
        root.right = insertRaw(root.right, val);
      }
      return root;
    };

    let rawRoot: RawNode | undefined = undefined;
    vals.forEach((v) => {
      rawRoot = insertRaw(rawRoot, v);
    });

    // Assign visual coordinates based on level and position
    const assignCoordinates = (
      node: RawNode | undefined,
      x: number,
      y: number,
      spread: number
    ): TreeNode | undefined => {
      if (!node) return undefined;
      return {
        id: `node-${node.val}`,
        val: node.val,
        x,
        y,
        left: assignCoordinates(node.left, x - spread, y + 68, Math.max(28, spread / 1.85)),
        right: assignCoordinates(node.right, x + spread, y + 68, Math.max(28, spread / 1.85)),
      };
    };

    return assignCoordinates(rawRoot, 340, 45, 130) || null;
  };

  const bstRoot = buildBST(nodeValues);

  // Collect all edges for SVG rendering
  const collectEdges = (
    node: TreeNode | null,
    edges: { x1: number; y1: number; x2: number; y2: number; key: string }[] = []
  ) => {
    if (!node) return edges;
    if (node.left) {
      edges.push({
        x1: node.x,
        y1: node.y,
        x2: node.left.x,
        y2: node.left.y,
        key: `${node.val}-${node.left.val}`,
      });
      collectEdges(node.left, edges);
    }
    if (node.right) {
      edges.push({
        x1: node.x,
        y1: node.right.y ? node.right.y : node.y + 68,
        x2: node.right.x,
        y2: node.right.y,
        key: `${node.val}-${node.right.val}`,
      });
      collectEdges(node.right, edges);
    }
    return edges;
  };

  const edges = collectEdges(bstRoot);

  // Collect all nodes into a flat array for rendering
  const flattenNodes = (node: TreeNode | null, list: TreeNode[] = []): TreeNode[] => {
    if (!node) return list;
    list.push(node);
    if (node.left) flattenNodes(node.left, list);
    if (node.right) flattenNodes(node.right, list);
    return list;
  };

  const flatNodes = flattenNodes(bstRoot);

  // Operations
  const handleInsert = () => {
    const v = parseInt(inputVal, 10);
    if (isNaN(v)) return;
    if (nodeValues.includes(v)) {
      setStatusLog(`Value ${v} already exists in the BST! BST requires unique keys.`);
      setActiveHighlightId(v);
      return;
    }
    if (nodeValues.length >= 15) {
      setStatusLog('Maximum visual tree limit (15 nodes) reached.');
      return;
    }

    // Trace path
    const path: number[] = [];
    let cur = bstRoot;
    while (cur) {
      path.push(cur.val);
      if (v < cur.val) cur = cur.left || null;
      else cur = cur.right || null;
    }

    setHighlightPath(path);
    setNodeValues([...nodeValues, v]);
    setActiveHighlightId(v);
    setStatusLog(
      `Inserted ${v} into BST! Traversed path: [${path.join(' → ')}] → new leaf node created.`
    );
  };

  const handleSearch = () => {
    const v = parseInt(inputVal, 10);
    if (isNaN(v)) return;

    const path: number[] = [];
    let cur = bstRoot;
    let found = false;

    while (cur) {
      path.push(cur.val);
      if (cur.val === v) {
        found = true;
        break;
      } else if (v < cur.val) {
        cur = cur.left || null;
      } else {
        cur = cur.right || null;
      }
    }

    setHighlightPath(path);
    if (found) {
      setActiveHighlightId(v);
      setStatusLog(`Found key ${v} in BST! Traversal depth: ${path.length} hops [${path.join(' → ')}].`);
    } else {
      setActiveHighlightId(null);
      setStatusLog(`Key ${v} not found in BST. Reached null leaf along path [${path.join(' → ')}].`);
    }
  };

  const handleDelete = () => {
    const v = parseInt(inputVal, 10);
    if (isNaN(v)) return;
    if (!nodeValues.includes(v)) {
      setStatusLog(`Cannot delete: ${v} does not exist in the BST.`);
      return;
    }
    if (nodeValues.length <= 1) {
      setStatusLog('Tree must contain at least 1 node.');
      return;
    }
    setNodeValues(nodeValues.filter((n) => n !== v));
    setActiveHighlightId(null);
    setHighlightPath([]);
    setStatusLog(`Deleted node ${v} from BST. Subtree re-balanced.`);
  };

  const handleReset = () => {
    setNodeValues([50, 30, 70, 20, 40, 60, 80]);
    setActiveHighlightId(null);
    setHighlightPath([]);
    setVisitedNodes([]);
    setTraversalOutput([]);
    setStatusLog('Reset to default balanced Binary Search Tree.');
  };

  // Traversal Animations
  const startTraversal = (type: TraversalType) => {
    if (isTraversing) return;
    setActiveTraversalType(type);
    setIsTraversing(true);
    setVisitedNodes([]);
    setTraversalOutput([]);

    const sequence: number[] = [];

    // Helper functions for traversals
    const inorder = (node: TreeNode | null) => {
      if (!node) return;
      inorder(node.left || null);
      sequence.push(node.val);
      inorder(node.right || null);
    };

    const preorder = (node: TreeNode | null) => {
      if (!node) return;
      sequence.push(node.val);
      preorder(node.left || null);
      preorder(node.right || null);
    };

    const postorder = (node: TreeNode | null) => {
      if (!node) return;
      postorder(node.left || null);
      postorder(node.right || null);
      sequence.push(node.val);
    };

    const levelorder = (root: TreeNode | null) => {
      if (!root) return;
      const q: TreeNode[] = [root];
      while (q.length > 0) {
        const curr = q.shift()!;
        sequence.push(curr.val);
        if (curr.left) q.push(curr.left);
        if (curr.right) q.push(curr.right);
      }
    };

    if (type === 'inorder') inorder(bstRoot);
    else if (type === 'preorder') preorder(bstRoot);
    else if (type === 'postorder') postorder(bstRoot);
    else if (type === 'levelorder') levelorder(bstRoot);

    setStatusLog(`Running ${type.toUpperCase()} traversal across ${sequence.length} nodes...`);

    let idx = 0;
    const interval = setInterval(() => {
      if (idx >= sequence.length) {
        clearInterval(interval);
        setIsTraversing(false);
        setStatusLog(
          `${type.toUpperCase()} traversal complete! Order: [${sequence.join(', ')}]`
        );
        return;
      }
      const currentVal = sequence[idx];
      setActiveHighlightId(currentVal);
      setVisitedNodes((prev) => [...prev, currentVal]);
      setTraversalOutput((prev) => [...prev, currentVal]);
      idx++;
    }, 700);
  };

  return (
    <div className="bg-[#17191D] border border-[#2d3036] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-[#2d3036] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <GitFork className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Binary Search Tree (BST) Studio</h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800">
              Left &lt; Root &lt; Right
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Explore hierarchical binary trees: dynamic insertions, binary search pathing, and recursive traversals.
          </p>
        </div>

        {/* Tree Traversal Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#08090B] p-1 rounded-xl border border-slate-800">
          {(
            [
              { id: 'inorder', label: 'In-Order (Sorted)' },
              { id: 'preorder', label: 'Pre-Order' },
              { id: 'postorder', label: 'Post-Order' },
              { id: 'levelorder', label: 'Level-Order (BFS)' },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => startTraversal(t.id)}
              disabled={isTraversing}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTraversalType === t.id && isTraversing
                  ? 'bg-emerald-400 text-slate-900 font-bold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Action Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#08090B] p-4 rounded-xl border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Node Value:</span>
          <input
            type="number"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-20 px-3 py-1.5 rounded-lg bg-[#17191D] border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
          />
          <button
            onClick={handleInsert}
            disabled={isTraversing}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Insert</span>
          </button>
          <button
            onClick={handleSearch}
            disabled={isTraversing}
            className="px-3.5 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 font-semibold text-xs flex items-center gap-1"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
          </button>
          <button
            onClick={handleDelete}
            disabled={isTraversing}
            className="px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800 font-medium text-xs flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>

        <button
          onClick={handleReset}
          disabled={isTraversing}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Default Tree</span>
        </button>
      </div>

      {/* SVG Canvas Tree Diagram */}
      <div className="p-6 rounded-2xl bg-[#08090B] border border-slate-800 overflow-x-auto min-h-[340px] flex flex-col items-center justify-center relative">
        <svg
          viewBox="0 0 680 320"
          className="w-full max-w-[680px] h-[300px] select-none"
        >
          {/* Edges */}
          {edges.map((edge) => {
            const isHighlightedEdge =
              highlightPath.includes(
                flatNodes.find((n) => n.x === edge.x1 && n.y === edge.y1)?.val || -1
              ) &&
              highlightPath.includes(
                flatNodes.find((n) => n.x === edge.x2 && n.y === edge.y2)?.val || -1
              );

            return (
              <line
                key={edge.key}
                x1={edge.x1}
                y1={edge.y1}
                x2={edge.x2}
                y2={edge.y2}
                stroke={isHighlightedEdge ? '#22d3ee' : '#334155'}
                strokeWidth={isHighlightedEdge ? '3' : '2'}
                strokeDasharray={isHighlightedEdge ? '4 2' : 'none'}
                className="transition-all duration-300"
              />
            );
          })}

          {/* Nodes */}
          {flatNodes.map((node) => {
            const isTarget = activeHighlightId === node.val;
            const isInPath = highlightPath.includes(node.val);
            const isVisited = visitedNodes.includes(node.val);

            let circleFill = '#1e293b';
            let circleStroke = '#475569';
            let textFill = '#e2e8f0';

            if (isTarget) {
              circleFill = '#059669';
              circleStroke = '#34d399';
              textFill = '#ffffff';
            } else if (isVisited) {
              circleFill = '#065f46';
              circleStroke = '#10b981';
              textFill = '#a7f3d0';
            } else if (isInPath) {
              circleFill = '#0e7490';
              circleStroke = '#22d3ee';
              textFill = '#cffafe';
            }

            return (
              <g key={node.id} className="transition-all duration-300 cursor-pointer">
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="20"
                  fill={circleFill}
                  stroke={circleStroke}
                  strokeWidth={isTarget || isInPath ? '3' : '2'}
                  filter={isTarget ? 'drop-shadow(0px 0px 8px rgba(52, 211, 153, 0.7))' : undefined}
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fill={textFill}
                  fontSize="12"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {node.val}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Real-time Traversal Output Banner */}
        {traversalOutput.length > 0 && (
          <div className="w-full mt-4 p-3 rounded-xl bg-[#121418] border border-emerald-500/30 flex items-center gap-2 overflow-x-auto text-xs font-mono">
            <span className="text-emerald-400 font-bold shrink-0">
              {activeTraversalType.toUpperCase()} SEQUENCE:
            </span>
            <div className="flex items-center gap-1.5">
              {traversalOutput.map((val, idx) => (
                <React.Fragment key={idx}>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-200 border border-emerald-700/50 font-bold">
                    {val}
                  </span>
                  {idx < traversalOutput.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-slate-600 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Log message */}
      <div className="p-4 rounded-xl bg-[#121418] border border-slate-800 space-y-1 font-mono text-xs">
        <span className="text-[10px] text-slate-400 uppercase block font-bold">
          Tree Invariant Log:
        </span>
        <p className="text-slate-200 leading-relaxed">{statusLog}</p>
      </div>
    </div>
  );
};
