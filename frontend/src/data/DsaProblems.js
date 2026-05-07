// ── DSA PROBLEMS DATA ────────────────────────────────────
// This is the hardcoded problem list
// Each pattern has an id, name, icon, and problems array
// Each problem has a unique id, name, difficulty, and leetcode link
//
// To add a new pattern: add an object to this array
// To add a new problem: add to the problems array of that pattern
//
// Problem IDs follow the pattern: shortname_number
// e.g. arr_1, arr_2, tree_1 etc.
// These IDs are stored in the DB when user marks a problem done

export const dsaPatterns = [
  {
    id: "arrays",
    name: "Arrays",
    icon: "📦",
    problems: [
      { id: "arr_1",  name: "Two Sum",                          difficulty: "Easy",   link: "https://leetcode.com/problems/two-sum/" },
      { id: "arr_2",  name: "Best Time to Buy and Sell Stock",  difficulty: "Easy",   link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
      { id: "arr_3",  name: "Contains Duplicate",               difficulty: "Easy",   link: "https://leetcode.com/problems/contains-duplicate/" },
      { id: "arr_4",  name: "Product of Array Except Self",     difficulty: "Medium", link: "https://leetcode.com/problems/product-of-array-except-self/" },
      { id: "arr_5",  name: "Maximum Subarray",                 difficulty: "Medium", link: "https://leetcode.com/problems/maximum-subarray/" },
      { id: "arr_6",  name: "Maximum Product Subarray",         difficulty: "Medium", link: "https://leetcode.com/problems/maximum-product-subarray/" },
      { id: "arr_7",  name: "Find Minimum in Rotated Array",    difficulty: "Medium", link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
      { id: "arr_8",  name: "Search in Rotated Sorted Array",   difficulty: "Medium", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
      { id: "arr_9",  name: "3Sum",                             difficulty: "Medium", link: "https://leetcode.com/problems/3sum/" },
      { id: "arr_10", name: "Container With Most Water",        difficulty: "Medium", link: "https://leetcode.com/problems/container-with-most-water/" },
    ],
  },
  {
    id: "strings",
    name: "Strings",
    icon: "🔤",
    problems: [
      { id: "str_1", name: "Valid Anagram",                     difficulty: "Easy",   link: "https://leetcode.com/problems/valid-anagram/" },
      { id: "str_2", name: "Valid Palindrome",                  difficulty: "Easy",   link: "https://leetcode.com/problems/valid-palindrome/" },
      { id: "str_3", name: "Longest Substring Without Repeat",  difficulty: "Medium", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
      { id: "str_4", name: "Longest Repeating Char Replacement",difficulty: "Medium", link: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
      { id: "str_5", name: "Minimum Window Substring",          difficulty: "Hard",   link: "https://leetcode.com/problems/minimum-window-substring/" },
      { id: "str_6", name: "Group Anagrams",                    difficulty: "Medium", link: "https://leetcode.com/problems/group-anagrams/" },
      { id: "str_7", name: "Encode and Decode Strings",         difficulty: "Medium", link: "https://leetcode.com/problems/encode-and-decode-strings/" },
      { id: "str_8", name: "Palindromic Substrings",            difficulty: "Medium", link: "https://leetcode.com/problems/palindromic-substrings/" },
    ],
  },
  {
    id: "linked_list",
    name: "Linked List",
    icon: "🔗",
    problems: [
      { id: "ll_1", name: "Reverse Linked List",                difficulty: "Easy",   link: "https://leetcode.com/problems/reverse-linked-list/" },
      { id: "ll_2", name: "Merge Two Sorted Lists",             difficulty: "Easy",   link: "https://leetcode.com/problems/merge-two-sorted-lists/" },
      { id: "ll_3", name: "Reorder List",                       difficulty: "Medium", link: "https://leetcode.com/problems/reorder-list/" },
      { id: "ll_4", name: "Remove Nth Node From End",           difficulty: "Medium", link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
      { id: "ll_5", name: "Linked List Cycle",                  difficulty: "Easy",   link: "https://leetcode.com/problems/linked-list-cycle/" },
      { id: "ll_6", name: "Merge K Sorted Lists",               difficulty: "Hard",   link: "https://leetcode.com/problems/merge-k-sorted-lists/" },
    ],
  },
  {
    id: "trees",
    name: "Trees",
    icon: "🌳",
    problems: [
      { id: "tree_1", name: "Invert Binary Tree",               difficulty: "Easy",   link: "https://leetcode.com/problems/invert-binary-tree/" },
      { id: "tree_2", name: "Maximum Depth of Binary Tree",     difficulty: "Easy",   link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
      { id: "tree_3", name: "Same Tree",                        difficulty: "Easy",   link: "https://leetcode.com/problems/same-tree/" },
      { id: "tree_4", name: "Subtree of Another Tree",          difficulty: "Easy",   link: "https://leetcode.com/problems/subtree-of-another-tree/" },
      { id: "tree_5", name: "Lowest Common Ancestor of BST",    difficulty: "Medium", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
      { id: "tree_6", name: "Binary Tree Level Order Traversal",difficulty: "Medium", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
      { id: "tree_7", name: "Validate Binary Search Tree",      difficulty: "Medium", link: "https://leetcode.com/problems/validate-binary-search-tree/" },
      { id: "tree_8", name: "Binary Tree Maximum Path Sum",     difficulty: "Hard",   link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
    ],
  },
  {
    id: "sliding_window",
    name: "Sliding Window",
    icon: "🪟",
    problems: [
      { id: "sw_1", name: "Best Time to Buy/Sell Stock",        difficulty: "Easy",   link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
      { id: "sw_2", name: "Longest Substring Without Repeat",   difficulty: "Medium", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
      { id: "sw_3", name: "Longest Repeating Char Replacement", difficulty: "Medium", link: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
      { id: "sw_4", name: "Permutation in String",              difficulty: "Medium", link: "https://leetcode.com/problems/permutation-in-string/" },
      { id: "sw_5", name: "Minimum Window Substring",           difficulty: "Hard",   link: "https://leetcode.com/problems/minimum-window-substring/" },
      { id: "sw_6", name: "Sliding Window Maximum",             difficulty: "Hard",   link: "https://leetcode.com/problems/sliding-window-maximum/" },
    ],
  },
  {
    id: "binary_search",
    name: "Binary Search",
    icon: "🔍",
    problems: [
      { id: "bs_1", name: "Binary Search",                      difficulty: "Easy",   link: "https://leetcode.com/problems/binary-search/" },
      { id: "bs_2", name: "Search a 2D Matrix",                 difficulty: "Medium", link: "https://leetcode.com/problems/search-a-2d-matrix/" },
      { id: "bs_3", name: "Koko Eating Bananas",                difficulty: "Medium", link: "https://leetcode.com/problems/koko-eating-bananas/" },
      { id: "bs_4", name: "Find Minimum in Rotated Array",      difficulty: "Medium", link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
      { id: "bs_5", name: "Search in Rotated Sorted Array",     difficulty: "Medium", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
      { id: "bs_6", name: "Median of Two Sorted Arrays",        difficulty: "Hard",   link: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
    ],
  },
  {
    id: "graphs",
    name: "Graphs",
    icon: "🕸️",
    problems: [
      { id: "gr_1", name: "Number of Islands",                  difficulty: "Medium", link: "https://leetcode.com/problems/number-of-islands/" },
      { id: "gr_2", name: "Clone Graph",                        difficulty: "Medium", link: "https://leetcode.com/problems/clone-graph/" },
      { id: "gr_3", name: "Max Area of Island",                 difficulty: "Medium", link: "https://leetcode.com/problems/max-area-of-island/" },
      { id: "gr_4", name: "Pacific Atlantic Water Flow",        difficulty: "Medium", link: "https://leetcode.com/problems/pacific-atlantic-water-flow/" },
      { id: "gr_5", name: "Course Schedule",                    difficulty: "Medium", link: "https://leetcode.com/problems/course-schedule/" },
      { id: "gr_6", name: "Number of Connected Components",     difficulty: "Medium", link: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/" },
      { id: "gr_7", name: "Word Ladder",                        difficulty: "Hard",   link: "https://leetcode.com/problems/word-ladder/" },
    ],
  },
  {
    id: "dp",
    name: "Dynamic Programming",
    icon: "🧮",
    problems: [
      { id: "dp_1",  name: "Climbing Stairs",                   difficulty: "Easy",   link: "https://leetcode.com/problems/climbing-stairs/" },
      { id: "dp_2",  name: "House Robber",                      difficulty: "Medium", link: "https://leetcode.com/problems/house-robber/" },
      { id: "dp_3",  name: "House Robber II",                   difficulty: "Medium", link: "https://leetcode.com/problems/house-robber-ii/" },
      { id: "dp_4",  name: "Longest Palindromic Substring",     difficulty: "Medium", link: "https://leetcode.com/problems/longest-palindromic-substring/" },
      { id: "dp_5",  name: "Palindromic Substrings",            difficulty: "Medium", link: "https://leetcode.com/problems/palindromic-substrings/" },
      { id: "dp_6",  name: "Coin Change",                       difficulty: "Medium", link: "https://leetcode.com/problems/coin-change/" },
      { id: "dp_7",  name: "Longest Increasing Subsequence",    difficulty: "Medium", link: "https://leetcode.com/problems/longest-increasing-subsequence/" },
      { id: "dp_8",  name: "Unique Paths",                      difficulty: "Medium", link: "https://leetcode.com/problems/unique-paths/" },
      { id: "dp_9",  name: "Jump Game",                         difficulty: "Medium", link: "https://leetcode.com/problems/jump-game/" },
      { id: "dp_10", name: "Word Break",                        difficulty: "Medium", link: "https://leetcode.com/problems/word-break/" },
    ],
  },
];