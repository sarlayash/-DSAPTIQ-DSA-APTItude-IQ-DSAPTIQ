export interface IndustrySolution {
  language: 'c' | 'cpp' | 'java' | 'python';
  code: string;
  explanation: string;
}

export interface IndustryProblem {
  id: string;
  title: string;
  company: string[];
  roleTarget: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  domain: 'Data Structures' | 'Algorithms' | 'Dynamic Programming' | 'Graph Algorithms' | 'Sliding Window & Pointers';
  interviewRound: string;
  problemStatement: string;
  constraints: string[];
  sampleInput: string;
  sampleOutput: string;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  keyTakeaway: string;
  testCases: Array<{
    input: string;
    expectedOutput: string;
    description: string;
  }>;
  solutions: {
    c: IndustrySolution;
    cpp: IndustrySolution;
    java: IndustrySolution;
    python: IndustrySolution;
  };
}

export const REAL_INDUSTRY_PROBLEMS: IndustryProblem[] = [
  // 1. AMAZON & GOOGLE: Longest Substring Without Repeating Characters
  {
    id: 'IND-01',
    title: 'Longest Substring Without Repeating Characters',
    company: ['Amazon', 'Google', 'Microsoft', 'Flipkart'],
    roleTarget: 'SDE-1 / Software Engineer',
    difficulty: 'Medium',
    domain: 'Sliding Window & Pointers',
    interviewRound: 'Technical Interview Round 1 (DSA)',
    problemStatement: 'Given a string `s`, find the length of the longest substring without duplicate characters.',
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    sampleInput: 'abcabcbb',
    sampleOutput: '3',
    explanation: 'The answer is "abc", with the length of 3. "bbbbb" would have length 1 ("b").',
    timeComplexity: 'O(N) - Each character is visited at most twice by the two pointers.',
    spaceComplexity: 'O(min(N, M)) where M is the charset size (e.g., 128 for ASCII or 256 for extended ASCII).',
    keyTakeaway: 'Avoid O(N^2) nested string scanning. Maintain an index table of the last seen position of each character to jump the left window boundary forward in O(1).',
    testCases: [
      { input: 'abcabcbb', expectedOutput: '3', description: 'Standard repeating characters' },
      { input: 'bbbbb', expectedOutput: '1', description: 'All identical characters' },
      { input: 'pwwkew', expectedOutput: '3', description: 'Substring with interior repeat ("wke")' },
      { input: '', expectedOutput: '0', description: 'Empty string boundary test' }
    ],
    solutions: {
      c: {
        language: 'c',
        code: `#include <stdio.h>
#include <string.h>

int lengthOfLongestSubstring(char *s) {
    int lastPos[256];
    for (int i = 0; i < 256; i++) lastPos[i] = -1;
    
    int maxLen = 0;
    int left = 0;
    
    for (int right = 0; s[right] != '\\0'; right++) {
        unsigned char c = (unsigned char)s[right];
        if (lastPos[c] >= left) {
            left = lastPos[c] + 1;
        }
        lastPos[c] = right;
        int currentLen = right - left + 1;
        if (currentLen > maxLen) {
            maxLen = currentLen;
        }
    }
    return maxLen;
}

int main() {
    char s[] = "abcabcbb";
    int result = lengthOfLongestSubstring(s);
    printf("Input: %s\\n", s);
    printf("Longest Substring Length: %d\\n", result);
    return 0;
}`,
        explanation: 'Uses a direct 256-integer lookup table to map each ASCII character to its latest index, advancing the left pointer in O(1).'
      },
      cpp: {
        language: 'cpp',
        code: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        vector<int> lastIndex(256, -1);
        int maxLen = 0;
        int left = 0;

        for (int right = 0; right < s.length(); right++) {
            unsigned char c = s[right];
            if (lastIndex[c] >= left) {
                left = lastIndex[c] + 1;
            }
            lastIndex[c] = right;
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};

int main() {
    Solution solver;
    string input = "abcabcbb";
    cout << "Input: " << input << endl;
    cout << "Longest Substring Length: " << solver.lengthOfLongestSubstring(input) << endl;
    return 0;
}`,
        explanation: 'C++ STL implementation using vector<int> with size 256 for O(1) character lookup and std::max for running window comparison.'
      },
      java: {
        language: 'java',
        code: `import java.util.*;

public class Solution {
    public static int lengthOfLongestSubstring(String s) {
        int[] lastIndex = new int[256];
        Arrays.fill(lastIndex, -1);
        int maxLen = 0;
        int left = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (lastIndex[c] >= left) {
                left = lastIndex[c] + 1;
            }
            lastIndex[c] = right;
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }

    public static void main(String[] args) {
        String test = "abcabcbb";
        System.out.println("Input: " + test);
        System.out.println("Longest Substring Length: " + lengthOfLongestSubstring(test));
    }
}`,
        explanation: 'Standard Java implementation with fixed array mapping for Unicode ASCII subset, avoiding HashMap auto-boxing overhead.'
      },
      python: {
        language: 'python',
        code: `def length_of_longest_substring(s: str) -> int:
    char_map = {}
    max_len = 0
    left = 0

    for right, char in enumerate(s):
        if char in char_map and char_map[char] >= left:
            left = char_map[char] + 1
        char_map[char] = right
        max_len = max(max_len, right - left + 1)

    return max_len

if __name__ == "__main__":
    test_str = "abcabcbb"
    result = length_of_longest_substring(test_str)
    print(f"Input: {test_str}")
    print(f"Longest Substring Length: {result}")
`,
        explanation: 'Pythonic sliding window using dict mapping character -> last index. Updates left boundary in O(1).'
      }
    }
  },

  // 2. TCS DIGITAL & INFOSYS DSE: Trapping Rain Water
  {
    id: 'IND-02',
    title: 'Trapping Rain Water',
    company: ['TCS Digital', 'Infosys DSE', 'Amazon', 'Adobe'],
    roleTarget: 'Specialist Programmer / Digital Cadre',
    difficulty: 'Hard',
    domain: 'Data Structures',
    interviewRound: 'Advanced Coding Round (Round 2)',
    problemStatement: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    constraints: [
      'n == height.length',
      '1 <= n <= 2 * 10^4',
      '0 <= height[i] <= 10^5'
    ],
    sampleInput: '[0,1,0,2,1,0,1,3,2,1,2,1]',
    sampleOutput: '6',
    explanation: 'Water trapped at indices: i=2 (1 unit), i=4 (1 unit), i=5 (2 units), i=6 (1 unit), i=9 (1 unit) = Total 6 units.',
    timeComplexity: 'O(N) - Single pass using Two-Pointer approach.',
    spaceComplexity: 'O(1) - Constant auxiliary space, no precomputed arrays required.',
    keyTakeaway: 'Instead of computing prefix_max and suffix_max arrays (O(N) space), two converging pointers (left, right) track current left_max and right_max to calculate water level on the fly.',
    testCases: [
      { input: '0 1 0 2 1 0 1 3 2 1 2 1', expectedOutput: '6', description: 'Standard jagged profile' },
      { input: '4 2 0 3 2 5', expectedOutput: '9', description: 'Deep valley profile' },
      { input: '1 2 3 4 5', expectedOutput: '0', description: 'Strictly increasing profile (no entrapment)' }
    ],
    solutions: {
      c: {
        language: 'c',
        code: `#include <stdio.h>

int trap(int* height, int heightSize) {
    if (heightSize <= 2) return 0;
    
    int left = 0, right = heightSize - 1;
    int leftMax = 0, rightMax = 0;
    int totalWater = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                totalWater += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                totalWater += rightMax - height[right];
            }
            right--;
        }
    }
    return totalWater;
}

int main() {
    int heights[] = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
    int n = sizeof(heights) / sizeof(heights[0]);
    int trapped = trap(heights, n);
    printf("Trapped Rain Water: %d units\\n", trapped);
    return 0;
}`,
        explanation: 'Two-pointer technique maintaining leftMax and rightMax without allocating secondary memory.'
      },
      cpp: {
        language: 'cpp',
        code: `#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size();
        if (n <= 2) return 0;

        int left = 0, right = n - 1;
        int leftMax = 0, rightMax = 0;
        int trappedWater = 0;

        while (left < right) {
            if (height[left] <= height[right]) {
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    trappedWater += leftMax - height[left];
                }
                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    trappedWater += rightMax - height[right];
                }
                right--;
            }
        }
        return trappedWater;
    }
};

int main() {
    Solution solver;
    vector<int> heights = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
    cout << "Trapped Rain Water: " << solver.trap(heights) << " units" << endl;
    return 0;
}`,
        explanation: 'C++ two-pointer implementation operating in strict O(1) space and O(N) time.'
      },
      java: {
        language: 'java',
        code: `public class Solution {
    public static int trap(int[] height) {
        if (height == null || height.length <= 2) return 0;

        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0;
        int trappedWater = 0;

        while (left < right) {
            if (height[left] <= height[right]) {
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    trappedWater += leftMax - height[left];
                }
                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    trappedWater += rightMax - height[right];
                }
                right--;
            }
        }
        return trappedWater;
    }

    public static void main(String[] args) {
        int[] heights = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
        System.out.println("Trapped Water: " + trap(heights) + " units");
    }
}`,
        explanation: 'Java two-pointer implementation with zero object allocations, running in pure primitive arrays.'
      },
      python: {
        language: 'python',
        code: `def trap(height: list[int]) -> int:
    if not height or len(height) <= 2:
        return 0

    left, right = 0, len(height) - 1
    left_max, right_max = 0, 0
    total_water = 0

    while left < right:
        if height[left] <= height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                total_water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                total_water += right_max - height[right]
            right -= 1

    return total_water

if __name__ == "__main__":
    heights = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
    print(f"Elevation Profile: {heights}")
    print(f"Trapped Rain Water: {trap(heights)} units")
`,
        explanation: 'Concise Python solution using symmetric two-pointer iteration with O(1) space.'
      }
    }
  },

  // 3. MICROSOFT & COGNIZANT GENC NEXT: Next Greater Element using Monotonic Stack
  {
    id: 'IND-03',
    title: 'Next Greater Element with Monotonic Stack',
    company: ['Microsoft', 'Cognizant GenC Next', 'Walmart Global Tech', 'Qualcomm'],
    roleTarget: 'Systems & Core Software Engineer',
    difficulty: 'Medium',
    domain: 'Data Structures',
    interviewRound: 'Technical Round 1 (Data Structures)',
    problemStatement: 'Given an array `arr` of size `N`, find the next greater element for each element of the array in order of their appearance. If no greater element exists, output -1.',
    constraints: [
      '1 <= N <= 10^5',
      '-10^9 <= arr[i] <= 10^9'
    ],
    sampleInput: '[4, 5, 2, 25]',
    sampleOutput: '[5, 25, 25, -1]',
    explanation: '4 -> 5, 5 -> 25, 2 -> 25, 25 -> -1 (no greater element to its right).',
    timeComplexity: 'O(N) - Every element is pushed and popped from the stack at most once.',
    spaceComplexity: 'O(N) - Auxiliary stack of maximum size N.',
    keyTakeaway: 'Traverse backwards from right to left while maintaining a monotonic strictly decreasing stack. Pop all elements smaller than or equal to current value.',
    testCases: [
      { input: '4 5 2 25', expectedOutput: '5 25 25 -1', description: 'Standard array with varying steps' },
      { input: '13 7 6 12', expectedOutput: '-1 12 12 -1', description: 'Array with decreasing prefix' },
      { input: '1 2 3 4', expectedOutput: '2 3 4 -1', description: 'Strictly ascending elements' }
    ],
    solutions: {
      c: {
        language: 'c',
        code: `#include <stdio.h>
#include <stdlib.h>

void nextGreaterElements(int arr[], int n, int result[]) {
    int stack[n];
    int top = -1;
    
    // Process from right to left
    for (int i = n - 1; i >= 0; i--) {
        while (top >= 0 && stack[top] <= arr[i]) {
            top--; // pop
        }
        
        result[i] = (top == -1) ? -1 : stack[top];
        stack[++top] = arr[i]; // push
    }
}

int main() {
    int arr[] = {4, 5, 2, 25};
    int n = sizeof(arr) / sizeof(arr[0]);
    int result[n];
    
    nextGreaterElements(arr, n, result);
    
    printf("Original: [4, 5, 2, 25]\\nResult:   [");
    for (int i = 0; i < n; i++) {
        printf("%d%s", result[i], (i < n - 1) ? ", " : "]\\n");
    }
    return 0;
}`,
        explanation: 'Stack-based solution using an array-backed stack for zero heap allocation overhead in C.'
      },
      cpp: {
        language: 'cpp',
        code: `#include <iostream>
#include <vector>
#include <stack>

using namespace std;

vector<int> nextGreaterElements(const vector<int>& arr) {
    int n = arr.size();
    vector<int> result(n, -1);
    stack<int> s;

    for (int i = n - 1; i >= 0; i--) {
        while (!s.empty() && s.top() <= arr[i]) {
            s.pop();
        }
        if (!s.empty()) {
            result[i] = s.top();
        }
        s.push(arr[i]);
    }
    return result;
}

int main() {
    vector<int> arr = {4, 5, 2, 25};
    vector<int> res = nextGreaterElements(arr);
    
    cout << "Next Greater Elements: [";
    for (int i = 0; i < res.size(); i++) {
        cout << res[i] << (i + 1 < res.size() ? ", " : "]\\n");
    }
    return 0;
}`,
        explanation: 'C++ std::stack pattern traversing reverse order for intuitive next-greater lookup in O(N).'
      },
      java: {
        language: 'java',
        code: `import java.util.*;

public class Solution {
    public static int[] nextGreaterElements(int[] arr) {
        int n = arr.length;
        int[] result = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();

        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && stack.peek() <= arr[i]) {
                stack.pop();
            }
            result[i] = stack.isEmpty() ? -1 : stack.peek();
            stack.push(arr[i]);
        }
        return result;
    }

    public static void main(String[] args) {
        int[] arr = {4, 5, 2, 25};
        int[] res = nextGreaterElements(arr);
        System.out.println("Result: " + Arrays.toString(res));
    }
}`,
        explanation: 'Uses ArrayDeque as an efficient stack in Java, avoiding synchronized Stack overhead.'
      },
      python: {
        language: 'python',
        code: `def next_greater_elements(arr: list[int]) -> list[int]:
    n = len(arr)
    result = [-1] * n
    stack = []

    for i in range(n - 1, -1, -1):
        while stack and stack[-1] <= arr[i]:
            stack.pop()
        if stack:
            result[i] = stack[-1]
        stack.append(arr[i])

    return result

if __name__ == "__main__":
    nums = [4, 5, 2, 25]
    print(f"Input:  {nums}")
    print(f"Output: {next_greater_elements(nums)}")
`,
        explanation: 'Clean Pythonic list comprehension pattern using native list append/pop operations in O(N).'
      }
    }
  },

  // 4. ACCENTURE & INFOSYS: Coin Change (Minimum Coins)
  {
    id: 'IND-04',
    title: 'Coin Change Problem - Minimum Coins',
    company: ['Accenture', 'Infosys', 'Capgemini', 'Goldman Sachs'],
    roleTarget: 'Core Software Developer',
    difficulty: 'Medium',
    domain: 'Dynamic Programming',
    interviewRound: 'Aptitude & Technical Coding Round',
    problemStatement: 'You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount cannot be made up by any combination of the coins, return -1.',
    constraints: [
      '1 <= coins.length <= 12',
      '1 <= coins[i] <= 2^31 - 1',
      '0 <= amount <= 10^4'
    ],
    sampleInput: 'coins = [1, 2, 5], amount = 11',
    sampleOutput: '3',
    explanation: '11 = 5 + 5 + 1 (3 coins total).',
    timeComplexity: 'O(amount * coins.length) - Iterating through each state from 1 to amount.',
    spaceComplexity: 'O(amount) - DP table of size amount + 1.',
    keyTakeaway: 'Greedy approach fails for arbitrary coin denominations (e.g. coins=[1, 3, 4], amount=6: greedy gives 4+1+1=3 coins, but optimal DP gives 3+3=2 coins). Use bottom-up DP table.',
    testCases: [
      { input: '11 (coins: 1 2 5)', expectedOutput: '3', description: 'Optimal: 5 + 5 + 1' },
      { input: '3 (coins: 2)', expectedOutput: '-1', description: 'Impossible amount' },
      { input: '0 (coins: 1)', expectedOutput: '0', description: 'Zero amount edge case' }
    ],
    solutions: {
      c: {
        language: 'c',
        code: `#include <stdio.h>

int coinChange(int* coins, int coinsSize, int amount) {
    if (amount == 0) return 0;
    
    int dp[amount + 1];
    dp[0] = 0;
    
    // Initialize with sentinel value
    for (int i = 1; i <= amount; i++) {
        dp[i] = amount + 1;
    }
    
    for (int i = 1; i <= amount; i++) {
        for (int j = 0; j < coinsSize; j++) {
            if (coins[j] <= i) {
                int sub = dp[i - coins[j]];
                if (sub != amount + 1 && sub + 1 < dp[i]) {
                    dp[i] = sub + 1;
                }
            }
        }
    }
    
    return dp[amount] > amount ? -1 : dp[amount];
}

int main() {
    int coins[] = {1, 2, 5};
    int amount = 11;
    int ans = coinChange(coins, 3, amount);
    printf("Min Coins for Amount %d: %d\\n", amount, ans);
    return 0;
}`,
        explanation: 'Bottom-up dynamic programming filling dp array from 1 to amount with safe boundary checking.'
      },
      cpp: {
        language: 'cpp',
        code: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;

        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
};

int main() {
    Solution solver;
    vector<int> coins = {1, 2, 5};
    int amount = 11;
    cout << "Min Coins for Amount " << amount << ": " << solver.coinChange(coins, amount) << endl;
    return 0;
}`,
        explanation: 'C++ vector solution with clean std::min state transitions.'
      },
      java: {
        language: 'java',
        code: `import java.util.*;

public class Solution {
    public static int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;

        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }

    public static void main(String[] args) {
        int[] coins = {1, 2, 5};
        int amount = 11;
        System.out.println("Min Coins: " + coinChange(coins, amount));
    }
}`,
        explanation: 'Java DP implementation with initial values filled with sentinel (amount + 1).'
      },
      python: {
        language: 'python',
        code: `def coin_change(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0

    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1

if __name__ == "__main__":
    test_coins = [1, 2, 5]
    test_amount = 11
    print(f"Coins: {test_coins}, Amount: {test_amount}")
    print(f"Minimum Coins Required: {coin_change(test_coins, test_amount)}")
`,
        explanation: 'Python dynamic programming bottom-up iteration using float("inf") sentinel.'
      }
    }
  },

  // 5. META & FLIPKART: Merge Overlapping Intervals
  {
    id: 'IND-05',
    title: 'Merge Overlapping Intervals',
    company: ['Meta', 'Flipkart', 'Salesforce', 'Bloomberg'],
    roleTarget: 'Full-Stack / Core Backend Engineer',
    difficulty: 'Medium',
    domain: 'Algorithms',
    interviewRound: 'Technical Interview Round 1',
    problemStatement: 'Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
    constraints: [
      '1 <= intervals.length <= 10^4',
      'intervals[i].length == 2',
      '0 <= start_i <= end_i <= 10^4'
    ],
    sampleInput: '[[1,3],[2,6],[8,10],[15,18]]',
    sampleOutput: '[[1,6],[8,10],[15,18]]',
    explanation: 'Intervals [1,3] and [2,6] overlap, merging into [1,6]. Others do not overlap.',
    timeComplexity: 'O(N log N) - Dominated by initial sorting of intervals by starting time.',
    spaceComplexity: 'O(N) - Output array to store merged intervals.',
    keyTakeaway: 'Sort intervals by start time. Once sorted, an overlap can only occur between the current interval and the most recently merged interval in the output.',
    testCases: [
      { input: '1,3 2,6 8,10 15,18', expectedOutput: '[[1,6], [8,10], [15,18]]', description: 'Overlapping head' },
      { input: '1,4 4,5', expectedOutput: '[[1,5]]', description: 'Contiguous boundary touch' },
      { input: '1,4 2,3', expectedOutput: '[[1,4]]', description: 'Total containment' }
    ],
    solutions: {
      c: {
        language: 'c',
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int start;
    int end;
} Interval;

int compare(const void *a, const void *b) {
    Interval *ia = (Interval *)a;
    Interval *ib = (Interval *)b;
    return ia->start - ib->start;
}

int main() {
    Interval intervals[] = {{1, 3}, {2, 6}, {8, 10}, {15, 18}};
    int n = sizeof(intervals) / sizeof(intervals[0]);
    
    qsort(intervals, n, sizeof(Interval), compare);
    
    Interval merged[n];
    int mCount = 0;
    
    merged[0] = intervals[0];
    mCount = 1;
    
    for (int i = 1; i < n; i++) {
        if (intervals[i].start <= merged[mCount - 1].end) {
            if (intervals[i].end > merged[mCount - 1].end) {
                merged[mCount - 1].end = intervals[i].end;
            }
        } else {
            merged[mCount++] = intervals[i];
        }
    }
    
    printf("Merged Intervals:\\n");
    for (int i = 0; i < mCount; i++) {
        printf("[%d, %d] ", merged[i].start, merged[i].end);
    }
    printf("\\n");
    return 0;
}`,
        explanation: 'C qsort implementation sorting interval structs by start coordinate, merging sequentially.'
      },
      cpp: {
        language: 'cpp',
        code: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        if (intervals.empty()) return {};
        
        sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[0] < b[0];
        });

        vector<vector<int>> merged;
        merged.push_back(intervals[0]);

        for (int i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] <= merged.back()[1]) {
                merged.back()[1] = max(merged.back()[1], intervals[i][1]);
            } else {
                merged.push_back(intervals[i]);
            }
        }
        return merged;
    }
};

int main() {
    Solution solver;
    vector<vector<int>> intervals = {{1, 3}, {2, 6}, {8, 10}, {15, 18}};
    auto res = solver.merge(intervals);
    cout << "Merged Intervals: ";
    for (auto& iv : res) {
        cout << "[" << iv[0] << "," << iv[1] << "] ";
    }
    cout << endl;
    return 0;
}`,
        explanation: 'C++ lambda sorting with back() reference updating in O(N log N).'
      },
      java: {
        language: 'java',
        code: `import java.util.*;

public class Solution {
    public static int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;

        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> merged = new ArrayList<>();
        int[] current = intervals[0];
        merged.add(current);

        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] <= current[1]) {
                current[1] = Math.max(current[1], intervals[i][1]);
            } else {
                current = intervals[i];
                merged.add(current);
            }
        }
        return merged.toArray(new int[merged.size()][]);
    }

    public static void main(String[] args) {
        int[][] intervals = {{1, 3}, {2, 6}, {8, 10}, {15, 18}};
        int[][] res = merge(intervals);
        System.out.println("Merged Intervals: " + Arrays.deepToString(res));
    }
}`,
        explanation: 'Java 2D array comparator sort with ArrayList tracking merged intervals.'
      },
      python: {
        language: 'python',
        code: `def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
    if not intervals:
        return []

    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for current in intervals[1:]:
        last = merged[-1]
        if current[0] <= last[1]:
            last[1] = max(last[1], current[1])
        else:
            merged.append(current)

    return merged

if __name__ == "__main__":
    intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
    print(f"Original: {intervals}")
    print(f"Merged:   {merge_intervals(intervals)}")
`,
        explanation: 'Pythonic list sorting by first element and in-place expansion of the final element in merged.'
      }
    }
  }
];
