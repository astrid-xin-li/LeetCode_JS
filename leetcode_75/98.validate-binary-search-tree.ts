/*
 * @lc app=leetcode id=98 lang=typescript
 *
 * [98] Validate Binary Search Tree
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

function isValidBST(root: TreeNode | null): boolean {
    // 判断是否为 二叉搜索树，任意一个节点，有两个定义，左子树所有节点都小于自身，右子树所有节点都大于自身
    // 注意没有等于自身的数
    // 注意右侧大于和左侧小于，左子树中所有节点都要小于父节点，右子树中所有节点都要大于父节点
    // 所以，需要从低往上查找，每个字数都要返回最大和最小两个值，跟当前节点判断是否符合对应子树
    const searchTreeBoundary = (tree: TreeNode | null): {
        result: boolean;
        min?: number;
        max?: number;
    } => {
        if (!tree) {
            return {
                result: true,
            }
        }
        const {val, left, right} = tree;
        if (!left && !right) {
            return {
                result: true,
            }
        }

        const { min: leftMin, max: leftMax, result: leftResult} = searchTreeBoundary(left);
        if (left) {
            // 左侧都要大，所以找左子树最大的那个节点比较即可
            const max = leftMax ?? left.val;
            if (val <= max || !leftResult) {
                return {
                    result: false,
                }
            }
        }
        const { min: rightMin, max: rightMax, result: rightResult} = searchTreeBoundary(right);
        if (right) {
            // 右侧都要大，所以找左子树最小的那个节点比较即可
            const min = rightMin ?? right.val;
            if (val >= min || !rightResult) {
                return {
                    result: false,
                }
            }
        }

        const min = leftMin ?? left?.val;
        const max = rightMax ?? right?.val;
        return {
            result: true,
            max,
            min,
        }
    }

    const {result} = searchTreeBoundary(root);
    return result;
};
// @lc code=end

