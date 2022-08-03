/*
 * @lc app=leetcode id=102 lang=typescript
 *
 * [102] Binary Tree Level Order Traversal
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

function levelOrder(root: TreeNode | null): number[][] {
    const result: number[][] = [];
    if (!root) {
        return result;
    }
    let queue: TreeNode[] = [root];
    while (queue.length) {
        // 当前层的所有节点
        const currentList = [...queue];
        queue = [];
        const value: number[] = [];
        let index = 0;
        while(currentList.length > index) {
            const current = currentList[index];
            if (!current) {
                break;
            }
            const {left, right, val} = current;
            left && queue.push(left);
            right && queue.push(right);
            value.push(val);
            index ++ ;
        }
        result.push(value);
    }
    return result;
};
// @lc code=end

