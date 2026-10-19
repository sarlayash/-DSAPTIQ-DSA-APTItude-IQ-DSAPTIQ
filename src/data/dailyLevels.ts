import { DailyLevel } from '../types';

export const DAILY_30_LEVELS: DailyLevel[] = [
  // ==========================================
  // TIER 1: EASY (DAYS 1 TO 7) - FOUNDATIONS
  // ==========================================
  {
    levelNumber: 1,
    dayNumber: 1,
    title: 'Array Mechanics & Prefix Sums',
    domain: 'Data Structures & Fast Access',
    difficulty: 'Easy',
    xpReward: 150,
    badgeName: 'Array Pioneer',
    badgeTitle: 'Pioneer of Linear Memory & Range Sums',
    badgeTier: 'Bronze',
    description: 'Master continuous memory layout, cache locality, 0-indexed bounds, and constant-time range query sums.',
    coreConcepts: ['Contiguous Allocation', 'Prefix Sum Array O(1) Queries', 'Boundary Checking'],
    solvedChallenge: {
      title: 'Subarray Sum Equals K in Streaming Traffic',
      description: 'Used cumulative prefix map to detect zero-latency transaction windows in payment gateway.',
      keyTakeaway: 'Hash prefix differences transform an O(N²) nested loop into an O(N) single-pass lookup.'
    },
    hasCertificate: true,
    certificateTitle: 'Day 1 Array Mechanics Certificate of Completion'
  },
  {
    levelNumber: 2,
    dayNumber: 2,
    title: 'String Tokenization & Palindromes',
    domain: 'String Algorithms & Pointers',
    difficulty: 'Easy',
    xpReward: 180,
    badgeName: 'String Maestro',
    badgeTitle: 'Architect of String Slices & Symmetric Scans',
    badgeTier: 'Bronze',
    description: 'Analyze string immutability, UTF-8 byte encodings, expand-around-center palindromes, and clean parsing.',
    coreConcepts: ['ASCII/Unicode Mapping', 'Two-Way Palindrome Scan', 'String Slicing Invariants'],
    solvedChallenge: {
      title: 'Valid Palindrome with Alphanumeric Normalization',
      description: 'Skipped punctuation in log files to verify mirrored cryptographic transmission sequences.',
      keyTakeaway: 'In-place character validation avoids O(N) string allocation overhead in low-memory systems.'
    },
    hasCertificate: false
  },
  {
    levelNumber: 3,
    dayNumber: 3,
    title: 'Fast Binary Search & Range Bounding',
    domain: 'Search & Logarithmic Optimization',
    difficulty: 'Easy',
    xpReward: 220,
    badgeName: 'Binary Navigator',
    badgeTitle: 'Master of Logarithmic Space & Invariant Splits',
    badgeTier: 'Bronze',
    description: 'Establish integer mid-overflow avoidance, lower-bound and upper-bound monotonicity conditions.',
    coreConcepts: ['mid = low + (high - low)/2', 'Monotonic Invariants', 'Search in Rotated Space'],
    solvedChallenge: {
      title: 'First Bad Version in Distributed Deployment',
      description: 'Pinpointed failing microservice commit across 100,000 build pipelines in 17 comparisons.',
      keyTakeaway: 'Binary search works across any monotonic boolean predicate, not only sorted numbers.'
    },
    hasCertificate: false
  },
  {
    levelNumber: 4,
    dayNumber: 4,
    title: 'Two-Pointer Partitioning & Deduplication',
    domain: 'Linear Complexity & In-Place Ops',
    difficulty: 'Easy',
    xpReward: 250,
    badgeName: 'Pointer Tactician',
    badgeTitle: 'Specialist in O(1) Memory Array Transformations',
    badgeTier: 'Bronze',
    description: 'Master fast/slow and converging pointer techniques to filter, deduplicate, and partition collections in-place.',
    coreConcepts: ['Converging Pointers', 'Slow-Fast Reader/Writer', 'In-Place Swap Invariants'],
    solvedChallenge: {
      title: 'Move Zeroes & Remove Duplicates in Stock Feeds',
      description: 'Sanitized high-frequency order book quotes without paying garbage collection allocation costs.',
      keyTakeaway: 'Writer pointer preserves relative ordering while pruning undesirable noise elements.'
    },
    hasCertificate: false
  },
  {
    levelNumber: 5,
    dayNumber: 5,
    title: 'Hash Maps, Frequencies & Collision Control',
    domain: 'Lookup Systems & Key-Value Stores',
    difficulty: 'Easy',
    xpReward: 280,
    badgeName: 'Hash Master',
    badgeTitle: 'Commander of Constant-Time Associative Mappings',
    badgeTier: 'Bronze',
    description: 'Dive into hashing functions, bucket distribution, load factors, collision chaining, and open addressing.',
    coreConcepts: ['Load Factor Rehash', 'Collision Resolution', 'Amortized O(1) Operations'],
    solvedChallenge: {
      title: 'Two Sum & Anagram Grouping in Telemetry Logs',
      description: 'Aggregated error payloads across multi-region services by sorted signature buckets.',
      keyTakeaway: 'Prime-number hash primes and frequency tuples guarantee clean distribution under high throughput.'
    },
    hasCertificate: false
  },
  {
    levelNumber: 6,
    dayNumber: 6,
    title: 'Number Theory, Modulo Arithmetic & Sieve',
    domain: 'Quantitative Aptitude & Prime Filters',
    difficulty: 'Easy',
    xpReward: 320,
    badgeName: 'Math Virtuoso',
    badgeTitle: 'Specialist in Discrete Mathematics & Modulo Bounds',
    badgeTier: 'Bronze',
    description: 'Master Euclid GCD, modular exponentiation under 10^9+7, prime sieving, and combinatorics formulas.',
    coreConcepts: ['Euclidean Algorithm', 'Sieve of Eratosthenes', 'Modulo Inverse & Overflow'],
    solvedChallenge: {
      title: 'High-Scale Cryptographic Key Exponentiation',
      description: 'Computed large state powers in O(log N) operations to generate verifiable nonce values.',
      keyTakeaway: 'Binary exponentiation prevents 64-bit numeric truncation while running in minimal clock cycles.'
    },
    hasCertificate: false
  },
  {
    levelNumber: 7,
    dayNumber: 7,
    title: 'Foundations Milestone Assessment',
    domain: 'Comprehensive Baseline Mastery',
    difficulty: 'Easy',
    xpReward: 500,
    badgeName: 'Foundation Laureate',
    badgeTitle: 'Certified Master of Tier 1 Algorithmic Foundations',
    badgeTier: 'Silver',
    description: 'Capstone assessment covering Arrays, Strings, Binary Search, Two Pointers, Hash Maps, and Number Theory.',
    coreConcepts: ['Full Tier-1 Integration', 'Time-Space Complexity Auditing', 'Edge Case Immunity'],
    solvedChallenge: {
      title: '3Sum Zero-Balance Financial Audit Engine',
      description: 'Audited enterprise ledger transactions with zero extra heap space and duplicate avoidance.',
      keyTakeaway: 'Sorting upfront enables deterministic two-pointer pruning with zero hash collision risk.'
    },
    hasCertificate: true,
    certificateTitle: 'Level 7 Foundation Placement Readiness Certificate'
  },

  // ==========================================
  // TIER 2: HARD (DAYS 8 TO 15) - CORE DATA STRUCTURES
  // ==========================================
  {
    levelNumber: 8,
    dayNumber: 8,
    title: 'Monotonic Stacks & Range Extremes',
    domain: 'Data Structures & Stack Optimization',
    difficulty: 'Hard',
    xpReward: 400,
    badgeName: 'Monotonic Sentinel',
    badgeTitle: 'Master of Non-Increasing & Non-Decreasing Stacks',
    badgeTier: 'Silver',
    description: 'Solve next-greater-element, daily temperatures, and maximal rectangle histograms in strictly linear time.',
    coreConcepts: ['Strictly Monotonic Invariant', 'Histogram Width Expansion', 'Amortized O(N) Total Pushes/Pops'],
    solvedChallenge: {
      title: 'Largest Rectangle in Skyline Telemetry Grid',
      description: 'Evaluated peak resource usage windows for AWS container nodes in linear time.',
      keyTakeaway: 'Stack-based indices resolve boundary bounds as soon as an element violates monotonicity.'
    },
    hasCertificate: false
  },
  {
    levelNumber: 9,
    dayNumber: 9,
    title: 'Queues, Deques & Sliding Window Extremes',
    domain: 'Double-Ended Buffers & Windows',
    difficulty: 'Hard',
    xpReward: 450,
    badgeName: 'Queue Commander',
    badgeTitle: 'Strategist of Moving Extremes & FIFO Resilience',
    badgeTier: 'Silver',
    description: 'Implement ring buffers, monotonic double-ended queues, and moving maximums across live data windows.',
    coreConcepts: ['Circular Ring Buffer Indexing', 'Monotonic Deque Pruning', 'Sliding Window Invariant'],
    solvedChallenge: {
      title: 'Sliding Window Maximum in Network Packets',
      description: 'Identified latency spikes across a rolling 1,000-packet buffer in O(1) amortized time per packet.',
      keyTakeaway: 'Discarding smaller incoming elements from the deque back keeps the window maximum at index 0.'
    },
    hasCertificate: false
  },
  {
    levelNumber: 10,
    dayNumber: 10,
    title: 'Linked Lists & In-Place Pointer Sculpting',
    domain: 'Pointer Architecture & Memory Nodes',
    difficulty: 'Hard',
    xpReward: 500,
    badgeName: 'Pointer Sculptor',
    badgeTitle: 'Architect of In-Place List Manipulation & Floyd Cycles',
    badgeTier: 'Silver',
    description: 'Tackle list reversals, K-group reversals, merge-sort on nodes, and Floyd tortoise/hare cycle intersection.',
    coreConcepts: ['Three-Pointer Reversal', 'Floyd Cycle Detection', 'Sentinel Dummy Nodes'],
    solvedChallenge: {
      title: 'Reverse Nodes in K-Group for Memory Block Reordering',
      description: 'Re-aligned operating system virtual memory page nodes with O(1) auxiliary overhead.',
      keyTakeaway: 'Sentinel head nodes eliminate branching logic around edge cases when modifying list heads.'
    },
    hasCertificate: false
  },
  {
    levelNumber: 11,
    dayNumber: 11,
    title: 'Binary Trees, LCA & Path Sums',
    domain: 'Hierarchical Structures & Recursion',
    difficulty: 'Hard',
    xpReward: 550,
    badgeName: 'Tree Sovereign',
    badgeTitle: 'Specialist in Hierarchical Tree Invariants & Subtrees',
    badgeTier: 'Silver',
    description: 'Analyze pre/in/post traversals, lowest common ancestors, tree diameters, and maximum path sums.',
    coreConcepts: ['Recursive Postorder Aggregation', 'LCA Branch Splitting', 'Diameter via Height Return'],
    solvedChallenge: {
      title: 'Lowest Common Ancestor in Organization Hierarchy',
      description: 'Computed optimal manager escalation node for security clearance conflicts across 50,000 employees.',
      keyTakeaway: 'Post-order recursion bubbles up findings from left and right subtrees to identify the junction node.'
    },
    hasCertificate: false
  },
  {
    levelNumber: 12,
    dayNumber: 12,
    title: 'Binary Search Trees & Range Query Validation',
    domain: 'Ordered Trees & Dynamic Sets',
    difficulty: 'Hard',
    xpReward: 600,
    badgeName: 'BST Sentinel',
    badgeTitle: 'Guardian of Search Invariants & Balanced Subtrees',
    badgeTier: 'Silver',
    description: 'Enforce BST validity with range limits (-inf, +inf), handle in-order predecessor/successor, and balancing.',
    coreConcepts: ['Strict (min, max) Boundary Check', 'Inorder Traversal Monotonicity', 'Kth Smallest via Rank'],
    solvedChallenge: {
      title: 'Validate Enterprise Routing Table Invariants',
      description: 'Verified routing IP prefix search tree integrity during dynamic gateway reconfiguration.',
      keyTakeaway: 'Passing recursive bounds downwards guarantees no rogue child violates an ancestor invariant.'
    },
    hasCertificate: false
  },
  {
    levelNumber: 13,
    dayNumber: 13,
    title: 'Binary Heaps & Top-K Stream Aggregation',
    domain: 'Priority Queues & Selection Systems',
    difficulty: 'Hard',
    xpReward: 650,
    badgeName: 'Heap Titan',
    badgeTitle: 'Commander of Priority Queues & Median Tracking',
    badgeTier: 'Silver',
    description: 'Master min-heap/max-heap array indexing (2i+1, 2i+2), sift-up/sift-down, and dual-heap continuous medians.',
    coreConcepts: ['Array-Backed Binary Heaps', 'Dual-Heap Median Balance', 'Top-K in O(N log K)'],
    solvedChallenge: {
      title: 'Real-Time Server Load Balancing Median Tracker',
      description: 'Balanced dynamic microservice traffic routing based on true streaming CPU median load.',
      keyTakeaway: 'Two balanced heaps of max and min polarity maintain instant O(1) access to median metrics.'
    },
    hasCertificate: false
  },
  {
    levelNumber: 14,
    dayNumber: 14,
    title: 'Backtracking & Pruned State Space',
    domain: 'Combinatorial Optimization & Search',
    difficulty: 'Hard',
    xpReward: 700,
    badgeName: 'Backtracking Alchemist',
    badgeTitle: 'Architect of Pruned Search Trees & Constraint Logic',
    badgeTier: 'Silver',
    description: 'Tackle N-Queens, Sudoku solvers, word search matrices, and subsets with aggressive branch pruning.',
    coreConcepts: ['State Choice -> Recurse -> Undo Pattern', 'Bitmask Row/Diag Collisions', 'Branch Pruning'],
    solvedChallenge: {
      title: 'N-Queens Conflict-Free Cluster Node Allocation',
      description: 'Arranged critical compute jobs with diagonal network interference constraints in zero collisions.',
      keyTakeaway: 'Bitmasks track column and diagonal occupancy in O(1) bitwise operations instead of set lookups.'
    },
    hasCertificate: false
  },
  {
    levelNumber: 15,
    dayNumber: 15,
    title: 'Core Data Structures Milestone Assessment',
    domain: 'Full Tier-2 Rigor & Architecture',
    difficulty: 'Hard',
    xpReward: 900,
    badgeName: 'Data Structure Architect',
    badgeTitle: 'Certified Architect of Advanced Memory Structures',
    badgeTier: 'Gold',
    description: 'Exhaustive capstone covering Stacks, Deques, Trees, Heaps, BSTs, and Backtracking under time bounds.',
    coreConcepts: ['Multi-Structure Synthesis', 'Amortized Runtime Proofs', 'Memory Optimization'],
    solvedChallenge: {
      title: 'Design In-Memory File System with Fast Hierarchical Search',
      description: 'Architected high-throughput directory hierarchy with trie paths, file size heaps, and instant search.',
      keyTakeaway: 'Combining specialized structures matches production database engine performance profiles.'
    },
    hasCertificate: true,
    certificateTitle: 'Level 15 Enterprise Associate Placement Certificate'
  },

  // ==========================================
  // TIER 3: VERY HARD (DAYS 16 TO 23) - ENTERPRISE ALGORITHMS
  // ==========================================
  {
    levelNumber: 16,
    dayNumber: 16,
    title: '1D Dynamic Programming & State Transitions',
    domain: 'Optimal Substructure & Memoization',
    difficulty: 'Very Hard',
    xpReward: 800,
    badgeName: 'DP Strategist',
    badgeTitle: 'Master of Overlapping Subproblems & State Compaction',
    badgeTier: 'Gold',
    description: 'Analyze recurrence relations, space compression from O(N) to O(1), Coin Change, and Longest Increasing Subsequence.',
    coreConcepts: ['Optimal Substructure', 'Bottom-Up Tabulation', 'Patience Sorting O(N log N) LIS'],
    solvedChallenge: {
      title: 'Coin Change Minimal Cloud Resource Provisioning',
      description: 'Minimized cost to provision exact CPU burst capacities using non-standard instance tier units.',
      keyTakeaway: 'Unbounded knapsack dynamic programming guarantees absolute mathematical optimality.'
    },
    hasCertificate: false
  },
  {
    levelNumber: 17,
    dayNumber: 17,
    title: '2D Dynamic Programming & String Distance',
    domain: 'Matrix DP & Alignment Metrics',
    difficulty: 'Very Hard',
    xpReward: 850,
    badgeName: 'Matrix Optimiser',
    badgeTitle: 'Specialist in 2D Space Transitions & Edit Operations',
    badgeTier: 'Gold',
    description: 'Master Longest Common Subsequence, Levenshtein Edit Distance, and 2-row memory rolling buffers.',
    coreConcepts: ['2D Tabulation Table', 'Rolling 2-Row Optimization', 'Diagonal String Alignment'],
    solvedChallenge: {
      title: 'Database Schema Migration Diff & Edit Distance',
      description: 'Calculated minimal transformation operations between two disparate enterprise API schemas.',
      keyTakeaway: 'Tracking the optimal operation parent pointers recovers the exact mutation patch recipe.'
    },
    hasCertificate: false
  },
  {
    levelNumber: 18,
    dayNumber: 18,
    title: 'Graph Traversals: BFS, DFS & Cycles',
    domain: 'Network Topologies & Connected Graphs',
    difficulty: 'Very Hard',
    xpReward: 900,
    badgeName: 'Graph Explorer',
    badgeTitle: 'Navigator of Graph Topologies & Component Clusters',
    badgeTier: 'Gold',
    description: 'Implement adjacency lists, cycle detection in directed/undirected graphs, and multi-source shortest distance BFS.',
    coreConcepts: ['Coloring Cycle Detection', 'Multi-Source Level BFS', 'Bipartite 2-Coloring Check'],
    solvedChallenge: {
      title: 'Rotting Oranges Multi-Source Viral Threat Propagation',
      description: 'Simulated malware transmission propagation through cloud VPC instances in minimal time ticks.',
      keyTakeaway: 'Queueing all initial infection vectors simultaneously simulates true parallel time steps.'
    },
    hasCertificate: false
  },
  {
    levelNumber: 19,
    dayNumber: 19,
    title: 'Shortest Paths: Dijkstra & Bellman-Ford',
    domain: 'Weighted Graphs & Routing Engines',
    difficulty: 'Very Hard',
    xpReward: 950,
    badgeName: 'Shortest Path Ace',
    badgeTitle: 'Master of Non-Negative and Negative-Cycle Pathing',
    badgeTier: 'Gold',
    description: 'Understand greedy Dijkstra edge relaxation with priority queues and Bellman-Ford negative arbitrage cycles.',
    coreConcepts: ['Priority Queue Relaxation O((V+E) log V)', 'Bellman-Ford N-1 Passes', 'Arbitrage Detection'],
    solvedChallenge: {
      title: 'Currency Arbitrage Matrix Negative-Log Cycle Detection',
      description: 'Detected profitable triangular foreign exchange rate arbitrage paths across institutional exchanges.',
      keyTakeaway: 'Transforming exchange rates via -log(R) turns multiplicative arbitrage into negative-weight cycles.'
    },
    hasCertificate: false
  },
  {
    levelNumber: 20,
    dayNumber: 20,
    title: 'Topological Sort & DAG Dependency Resolution',
    domain: 'Build Pipelines & Task Scheduling',
    difficulty: 'Very Hard',
    xpReward: 1000,
    badgeName: 'DAG Scheduler',
    badgeTitle: 'Commander of Directed Acyclic Graphs & Build Orders',
    badgeTier: 'Gold',
    description: 'Implement Kahn in-degree array algorithm and DFS post-order stack sorting to resolve complex build dependencies.',
    coreConcepts: ['In-Degree Zero Queue (Kahn)', 'Cycle Trapping in DAGs', 'Parallel Schedule Levels'],
    solvedChallenge: {
      title: 'Course Schedule II Enterprise CI/CD Pipeline',
      description: 'Computed optimal execution order of 5,000 interdependent build modules with zero deadlocks.',
      keyTakeaway: 'If topological sort output length does not equal total vertices, a circular deadlock cycle exists.'
    },
    hasCertificate: false
  },
  {
    levelNumber: 21,
    dayNumber: 21,
    title: 'Disjoint Set Union (DSU) & Kruskal MST',
    domain: 'Equivalence Classes & Minimum Spanning Trees',
    difficulty: 'Very Hard',
    xpReward: 1050,
    badgeName: 'Union-Find Maestro',
    badgeTitle: 'Master of Path Compression & Near-Constant Connectivity',
    badgeTier: 'Gold',
    description: 'Master tree root union by rank/size, recursive path compression to achieve inverse Ackermann alpha(N) speed.',
    coreConcepts: ['Union by Rank / Size', 'Recursive Path Compression', 'Kruskal Greedy Edge Sorting'],
    solvedChallenge: {
      title: 'Minimum Cost to Connect Distributed Data Centers',
      description: 'Designed fiber-optic routing topology connecting 200 data centers with minimal cabling expenditure.',
      keyTakeaway: 'Sorting all candidate connections upfront guarantees minimal spanning tree without cycle formation.'
    },
    hasCertificate: false
  },
  {
    levelNumber: 22,
    dayNumber: 22,
    title: 'Trie (Prefix Trees) & Autocomplete Engines',
    domain: 'High-Throughput Prefix Search',
    difficulty: 'Very Hard',
    xpReward: 1100,
    badgeName: 'Trie Cartographer',
    badgeTitle: 'Architect of Multi-Branch Prefix Trees & Radix Nodes',
    badgeTier: 'Gold',
    description: 'Build fast prefix matching, bitwise tries for maximum XOR pairs, and word search dictionaries.',
    coreConcepts: ['Alphabet Branching [26]', 'Bitwise Binary Trie [31..0]', 'Prefix Wildcard Matching'],
    solvedChallenge: {
      title: 'Maximum XOR of Two Numbers in Large Telemetry Array',
      description: 'Found highest distinct entropy bitmask pair in 500,000 sensor streams in O(N * 32) time.',
      keyTakeaway: 'Binary trie guides opposite-bit choices from MSB to LSB to maximize result bits greedily.'
    },
    hasCertificate: false
  },
  {
    levelNumber: 23,
    dayNumber: 23,
    title: 'Enterprise Algorithms Milestone Assessment',
    domain: 'Tier-3 Algorithmic Rigor',
    difficulty: 'Very Hard',
    xpReward: 1300,
    badgeName: 'Algorithmic Virtuoso',
    badgeTitle: 'Certified Master of Advanced Enterprise Graph & DP Systems',
    badgeTier: 'Diamond',
    description: 'Comprehensive milestone challenging candidates across DP, Dijkstra, Kahn DAGs, DSU, and Prefix Tries.',
    coreConcepts: ['Complex System Integration', 'Poly-Logarithmic Solutions', 'Zero-Allocation Invariants'],
    solvedChallenge: {
      title: 'Alien Dictionary Topological Order Reconstruction',
      description: 'Decoded character ranking order of unknown enterprise serialization format from sorted string pairs.',
      keyTakeaway: 'Adjacent word mismatch characters define strict DAG directed edges for topological ordering.'
    },
    hasCertificate: true,
    certificateTitle: 'Level 23 Senior Placement Readiness Certificate'
  },

  // ==========================================
  // TIER 4: SUPER TOUGH (DAYS 24 TO 30) - FORTUNE 500 APEX
  // ==========================================
  {
    levelNumber: 24,
    dayNumber: 24,
    title: 'Segment Trees, Lazy Propagation & Fenwick',
    domain: 'Dynamic Range Queries & Updates',
    difficulty: 'Super Tough',
    xpReward: 1200,
    badgeName: 'Range Query Master',
    badgeTitle: 'Commander of O(log N) Range Mutations & Lazy Trees',
    badgeTier: 'Diamond',
    description: 'Implement 4N array-backed segment trees, lazy tag propagation for range increments, and binary indexed trees.',
    coreConcepts: ['Tree Divide-and-Conquer', 'Lazy Update Postponement', 'Binary Indexed Tree lowbit(x)'],
    solvedChallenge: {
      title: 'Range Sum Dynamic Cloud Billing Tier Mutations',
      description: 'Updated rate limits across millions of active customer IDs with O(log N) audit latency.',
      keyTakeaway: 'Lazy arrays postpone updates to child intervals until exact queries require inspection.'
    },
    hasCertificate: false
  },
  {
    levelNumber: 25,
    dayNumber: 25,
    title: 'Bitmask Dynamic Programming & Subset Enumeration',
    domain: 'Exponential Complexity Management',
    difficulty: 'Super Tough',
    xpReward: 1300,
    badgeName: 'Bitmask Strategist',
    badgeTitle: 'Specialist in 2^N State Space Compaction & Hamiltonian Paths',
    badgeTier: 'Diamond',
    description: 'Solve Traveling Salesperson Problem, optimal matching, and subset covers via compact 32-bit state masks.',
    coreConcepts: ['Bit Manipulation Operations', 'Mask State Transitions', 'Submask Enumeration (s-1)&mask'],
    solvedChallenge: {
      title: 'Shortest Path Visiting All Target Logistics Warehouses',
      description: 'Optimized multi-hub drone delivery trajectory visiting 18 distinct regional hubs in minimal fuel.',
      keyTakeaway: 'dp[mask][lastNode] memoizes shortest path through subset `mask` terminating at `lastNode`.'
    },
    hasCertificate: false
  },
  {
    levelNumber: 26,
    dayNumber: 26,
    title: 'Network Flows, Ford-Fulkerson & Min-Cut',
    domain: 'Capacity Networks & Bipartite Matches',
    difficulty: 'Super Tough',
    xpReward: 1400,
    badgeName: 'Flow Network Emperor',
    badgeTitle: 'Architect of Max-Flow Min-Cut Theorem & Capacity Residuals',
    badgeTier: 'Diamond',
    description: 'Master residual graph mechanics, Edmonds-Karp BFS augmenting paths, and max-flow min-cut duality.',
    coreConcepts: ['Residual Graph Forward/Backward Edges', 'Max-Flow Min-Cut Duality', 'Hopcroft-Karp Matching'],
    solvedChallenge: {
      title: 'Global Bandwidth Capacity Routing Under Severed Undersea Cables',
      description: 'Maximized inter-continental transatlantic packet throughput during physical cable blackout.',
      keyTakeaway: 'Bottleneck capacity along residual augmenting paths steadily pushes net transmission to upper limit.'
    },
    hasCertificate: false
  },
  {
    levelNumber: 27,
    dayNumber: 27,
    title: 'High-Scale Concurrency, Lock-Free & LRU/LFU',
    domain: 'System Architecture & Cache Algorithms',
    difficulty: 'Super Tough',
    xpReward: 1500,
    badgeName: 'Concurrency Architect',
    badgeTitle: 'Master of Lock-Free Structures & O(1) Cache Eviction',
    badgeTier: 'Diamond',
    description: 'Implement O(1) Least Frequently Used (LFU) doubly-linked frequency bucket cache and compare-and-swap primitives.',
    coreConcepts: ['Dual Hash Map Frequency Buckets', 'O(1) Eviction Proof', 'Atomic CAS Primitives'],
    solvedChallenge: {
      title: 'Design In-Memory LFU Cache for Tier-1 Web Engine',
      description: 'Engineered high-concurrency microsecond cache serving 2,000,000 queries per second with O(1) LFU eviction.',
      keyTakeaway: 'Maintaining a minFrequency pointer alongside linked list nodes guarantees true O(1) operations.'
    },
    hasCertificate: false
  },
  {
    levelNumber: 28,
    dayNumber: 28,
    title: 'Big-Tech Marathon: 5 Multi-Discipline Problems',
    domain: 'FAANG/Fortune 500 Interview Marathon',
    difficulty: 'Super Tough',
    xpReward: 1650,
    badgeName: 'Big-Tech Champion',
    badgeTitle: 'Conqueror of Multi-Hour Big-Tech Algorithmic Gauntlets',
    badgeTier: 'Diamond',
    description: 'Simulate high-pressure multi-round interviews with stringent memory caps, edge cases, and runtime proofs.',
    coreConcepts: ['High-Velocity Code Tracing', 'Poly-Structure Invariants', 'Clean Defensive Coding'],
    solvedChallenge: {
      title: 'Median of Two Sorted Arrays in O(log(min(M, N))) Time',
      description: 'Partitioned two large distinct server telemetry buffers to yield median in logarithmic time.',
      keyTakeaway: 'Binary searching the partition cutoff in the smaller array establishes balanced half-counts immediately.'
    },
    hasCertificate: false
  },
  {
    levelNumber: 29,
    dayNumber: 29,
    title: 'Enterprise Architecture & Catastrophic Incident Recovery',
    domain: 'Real Production Reliability & Failover',
    difficulty: 'Super Tough',
    xpReward: 1800,
    badgeName: 'Enterprise Sovereign',
    badgeTitle: 'Commander of Disaster Recovery & Critical Production Restorations',
    badgeTier: 'Apex',
    description: 'Trace distributed split-brain recovery, Byzantine consensus voting, and database write-ahead log recovery.',
    coreConcepts: ['Write-Ahead Logging (WAL)', 'Paxos/Raft Leader Election', 'Split-Brain Fencing'],
    solvedChallenge: {
      title: 'Restoring Distributed Ledger After Multi-Region Network Partition',
      description: 'Reconciled split-brain transaction logs across 3 cloud regions using vector clocks and idempotency keys.',
      keyTakeaway: 'Monotonically increasing vector clock matrices unambiguously identify causal event precedence.'
    },
    hasCertificate: false
  },
  {
    levelNumber: 30,
    dayNumber: 30,
    title: 'DRAPTI Apex Placement Grandmaster Certification',
    domain: 'Final Capstone of Algorithmic & Placement Excellence',
    difficulty: 'Super Tough',
    xpReward: 2500,
    badgeName: 'Fortune 500 Apex Grandmaster',
    badgeTitle: 'Grandmaster of Algorithms, Data Structures & Placement Readiness',
    badgeTier: 'Apex',
    description: 'The supreme culmination of 30 days of relentless training. Fully vetted candidate accredited by SARLAYASH Mission.',
    coreConcepts: ['Complete 30-Day Synthesis', 'Apex Algorithmic Mastery', 'Executive Placement Readiness'],
    solvedChallenge: {
      title: 'Global High-Frequency Trading Match Engine with Zero Allocation',
      description: 'Built zero-allocation double-auction order matching engine executing 10M orders/sec with < 5 microsecond latency.',
      keyTakeaway: 'True grandmaster code eliminates runtime garbage collection, allocations, and branch mispredictions.'
    },
    hasCertificate: true,
    certificateTitle: 'Level 30 Supreme Placement Readiness Grandmaster Certificate'
  }
];
