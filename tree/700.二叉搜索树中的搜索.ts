/*
 * @lc app=leetcode.cn id=700 lang=typescript
 *
 * [700] 二叉搜索树中的搜索
 */

// @lc code=start

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

function searchBST(root: TreeNode | null, val: number): TreeNode | null {
    if (!root) return null;
    const { val: value } = root;
    if (value === val) {
        return root;
    }
    if (value < val) {
        return searchBST(root.right, val);
    }
    return searchBST(root.left, val);
};
// @lc code=end


/**
 * 给定二叉搜索树（BST）的根节点 root 和一个整数值 val。
 * 你需要在 BST 中找到节点值等于 val 的节点。 返回以该节点为根的子树。 如果节点不存在，则返回 null 。
 * 
 * 
 * 当前应该是广度优先搜索，对于当前二叉树而言一行一行搜索，当前还是左小右大，那么就是 左遍历
 */