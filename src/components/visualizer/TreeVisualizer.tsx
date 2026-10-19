import React, { useState } from 'react';
import {
  GitFork,
  RotateCcw,
  Plus,
  Trash2,
  Search,
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

    let rootRaw: RawNode | undefined;
    vals.forEach((v) => {
      rootRaw = insertRaw(rootRaw, v);
    });

    if (!rootRaw) return null;

    // Position coordinates
    const assignCoords = (
      node: RawNode | undefined,
      depth: number,
      minX: number,
      maxX: number
    ): TreeNode | undefined => {
      if (!node) return undefined;

      const midX = (minX + maxX) / 2;
      const y = 45 + depth * 65;

      const treeNode: TreeNode = {
        id: `node-${node.val}`,
        val: node.val,
        x: midX,
        y: y,
      };

      treeNode.left = assignCoords(node.left, depth + 1, minX, midX);
      treeNode.right = assignCoords(node.right, depth + 1, midX, maxX);

      return treeNode;
    };

    return assignCoords(rootRaw, 0, 40, 640) || null;
  };

  const bstRoot = buildBST(nodeValues);

  // Flatten tree for SVG rendering
  const flattenTree = (root: TreeNode | null): { nodes: TreeNode[]; edges: { x1: number; y1: number; x2: number; y2: number; key: string }[] } => {
    const nodes: TreeNode[] = [];
    const edges: { x1: number; y1: number; x2: number; y2: number; key: string }[] = [];

    const traverse = (node?: TreeNode) => {
      if (!node) return;
      nodes.push(node);

      if (node.left) {
        edges.push({
          x1: node.x,
          y1: node.y,
          x2: node.left.x,
          y2: node.left.y,
          key: `edge-${node.val}-${node.left.val}`,
        });
        traverse(node.left);
      }

      if (node.right) {
        edges.push({
          x1: node.x,
          y1: node.y,
          x2: node.right.x,
          y2: node.right.y,
          key: `edge-${node.val}-${node.right.val}`,
        });
        traverse(node.right);
      }
    };

    traverse(root || undefined);
    return { nodes, edges };
  };

  const { nodes: flatNodes, edges } = flattenTree(bstRoot);

  // Tree Insert Operation
  const handleInsert = () => {
    const val = parseInt(inputVal, 10);
    if (isNaN(val)) return;

    if (nodeValues.includes(val)) {
      setStatusLog(`Value ${val} already exists in BST (no duplicate keys allowed).`);
      return;
    }

    if (nodeValues.length >= 15) {
      setStatusLog('Maximum node capacity reached for clear hierarchical canvas.');
      return;
    }

    // Step-by-step search animation before insert
    const path: number[] = [];
    let curr: TreeNode | null | undefined = bstRoot;

    while (curr) {
      path.push(curr.val);
      if (val < curr.val) curr = curr.left;
      else curr = curr.right;
    }

    setHighlightPath(path);
    setActiveHighlightId(val);
    setStatusLog(`Searching insert location for ${val}: traversed path [${path.join(' -> ')}]. Inserting leaf...`);

    setTimeout(() => {
      setNodeValues((prev) => [...prev, val]);
      setHighlightPath([]);
      setActiveHighlightId(null);
      setStatusLog(`Inserted node ${val} into BST according to binary search invariant.`);
    }, 1200);
  };

  // Search Operation
  const handleSearch = () => {
    const target = parseInt(inputVal, 10);
    if (isNaN(target)) return;

    const path: number[] = [];
    let curr: TreeNode | null | undefined = bstRoot;
    let found = false;

    while (curr) {
      path.push(curr.val);
      if (curr.val === target) {
        found = true;
        break;
      } else if (target < curr.val) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }

    setHighlightPath(path);
    if (found) {
      setActiveHighlightId(target);
      setStatusLog(`Target ${target} found! Traversed path [${path.join(' -> ')}] in O(log N) comparisons.`);
    } else {
      setActiveHighlightId(null);
      setStatusLog(`Target ${target} does not exist in BST. Reached null leaf along path [${path.join(' -> ')}].`);
    }
  };

  // Delete Operation
  const handleDelete = () => {
    const target = parseInt(inputVal, 10);
    if (isNaN(target)) return;

    if (!nodeValues.includes(target)) {
      setStatusLog(`Cannot delete ${target}: node not present in tree.`);
      return;
    }

    setNodeValues((prev) => prev.filter((v) => v !== target));
    setActiveHighlightId(null);
    setHighlightPath([]);
    setStatusLog(`Deleted node ${target}. BST restructured preserving left < root < right invariant.`);
  };

  // Traversals
  const startTraversal = (type: TraversalType) => {
    if (isTraversing || !bstRoot) return;

    setIsTraversing(true);
    setActiveTraversalType(type);
    setVisitedNodes([]);
    setTraversalOutput([]);
    setHighlightPath([]);

    const sequence: number[] = [];

    const inorder = (node?: TreeNode) => {
      if (!node) return;
      inorder(node.left);
      sequence.push(node.val);
      inorder(node.right);
    };

    const preorder = (node?: TreeNode) => {
      if (!node) return;
      sequence.push(node.val);
      preorder(node.left);
      preorder(node.right);
    };

    const postorder = (node?: TreeNode) => {
      if (!node) return;
      postorder(node.left);
      postorder(node.right);
      sequence.push(node.val);
    };

    const levelorder = (rootNode: TreeNode) => {
      const q: TreeNode[] = [rootNode];
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

    setStatusLog(`Running ${type.toUpperCase()} traversal...`);

    // Step-by-step playback
    let step = 0;
    const interval = setInterval(() => {
      if (step < sequence.length) {
        const val = sequence[step];
        setActiveHighlightId(val);
        setVisitedNodes((prev) => [...prev, val]);
        setTraversalOutput((prev) => [...prev, val]);
        step++;
      } else {
        clearInterval(interval);
        setIsTraversing(false);
        setActiveHighlightId(null);
        setStatusLog(`${type.toUpperCase()} completed: [${sequence.join(', ')}].`);
      }
    }, 600);
  };

  const handleReset = () => {
    setNodeValues([50, 30, 70, 20, 40, 60, 80]);
    setActiveHighlightId(null);
    setHighlightPath([]);
    setVisitedNodes([]);
    setTraversalOutput([]);
    setStatusLog('Reset to default 7-node balanced BST.');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <GitFork className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-extrabold text-blue-950">Binary Search Tree (BST) Studio</h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200 font-bold">
              Height: ~{Math.ceil(Math.log2(nodeValues.length + 1))} · Nodes: {nodeValues.length}
            </span>
          </div>
          <p className="text-xs text-blue-900 mt-1 font-medium">
            Explore hierarchical binary trees: dynamic insertions, binary search pathing, and recursive traversals.
          </p>
        </div>

        {/* Tree Traversal Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200">
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
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTraversalType === t.id && isTraversing
                  ? 'bg-red-600 text-white shadow-2xs'
                  : 'text-blue-900 hover:text-blue-950 hover:bg-blue-100/60'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Action Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-blue-950 font-bold">Node Value:</span>
          <input
            type="number"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-20 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-blue-950 font-mono text-xs font-bold focus:outline-none focus:border-blue-400"
          />
          <button
            onClick={handleInsert}
            disabled={isTraversing}
            className="px-3.5 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1 transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Insert</span>
          </button>
          <button
            onClick={handleSearch}
            disabled={isTraversing}
            className="px-3.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-950 border border-blue-200 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-blue-900" />
            <span>Search</span>
          </button>
          <button
            onClick={handleDelete}
            disabled={isTraversing}
            className="px-3.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>

        <button
          onClick={handleReset}
          disabled={isTraversing}
          className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-blue-900 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-blue-800" />
          <span>Reset Default Tree</span>
        </button>
      </div>

      {/* SVG Canvas Tree Diagram */}
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 overflow-x-auto min-h-[340px] flex flex-col items-center justify-center relative">
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
                stroke={isHighlightedEdge ? '#DC2626' : '#1E3A8A'}
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

            let circleFill = '#0A192F';
            let circleStroke = '#1E3A8A';
            let textFill = '#FFFFFF';

            if (isTarget) {
              circleFill = '#DC2626';
              circleStroke = '#EF4444';
              textFill = '#FFFFFF';
            } else if (isVisited) {
              circleFill = '#1E3A8A';
              circleStroke = '#2563EB';
              textFill = '#FFFFFF';
            } else if (isInPath) {
              circleFill = '#B91C1C';
              circleStroke = '#DC2626';
              textFill = '#FFFFFF';
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
                  filter={isTarget ? 'drop-shadow(0px 0px 8px rgba(220, 38, 38, 0.6))' : undefined}
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
          <div className="w-full mt-4 p-3 rounded-xl bg-white border border-blue-200 flex items-center gap-2 overflow-x-auto text-xs font-mono shadow-2xs">
            <span className="text-red-600 font-extrabold shrink-0">
              {activeTraversalType.toUpperCase()} SEQUENCE:
            </span>
            <div className="flex items-center gap-1.5">
              {traversalOutput.map((val, idx) => (
                <React.Fragment key={idx}>
                  <span className="px-2 py-0.5 rounded bg-blue-900 text-white font-bold">
                    {val}
                  </span>
                  {idx < traversalOutput.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-red-600 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Log message */}
      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1 font-mono text-xs">
        <span className="text-[10px] text-blue-950 uppercase block font-extrabold">
          Tree Invariant Log:
        </span>
        <p className="text-blue-950 leading-relaxed font-medium">{statusLog}</p>
      </div>
    </div>
  );
};
