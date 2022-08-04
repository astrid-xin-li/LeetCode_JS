/*
 * @lc app=leetcode id=235 lang=typescript
 *
 * [235] Lowest Common Ancestor of a Binary Search Tree
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 */
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
	// 二叉搜索树，当前节点的左边一定是小于自身，右边一定是大于自身。
    // 那么需要找两个数的最低祖先 ancestor ，那么此祖先要么是左右一个大于一个小于，要么是自己+一个小于，要么是自己+一个大于
    if (!root || (!p && !q)) {
        return null;
    }
    const {val, left, right} = root;
    if (!p || !q) {
        // 当前只有一个查找了
        const searchVal = p?.val ?? q?.val;
        if (!searchVal) {
            return null;
        }
        if (searchVal === val) {
            return root;
        }
        return searchVal > val ? lowestCommonAncestor(right, p, q) : lowestCommonAncestor(left, p, q);
    }
    const min = Math.min(p.val, q.val);
    const max = Math.max(p.val, q.val);
    if ((min === val || max === val) || (min < val && max > val)) {
        return root;
    }
    if (min > val) {
        return lowestCommonAncestor(right, p, q);
    }
    return lowestCommonAncestor(left, p, q);
};
// @lc code=end

