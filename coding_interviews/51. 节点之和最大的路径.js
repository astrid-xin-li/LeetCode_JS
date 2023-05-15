/**
 * [TOPIC]: 路径 被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不一定经过根节点。
 * 路径和 是路径中各节点值的总和。
 * 给定一个二叉树的根节点 root ，返回其 最大路径和，即所有路径上节点值之和的最大值。
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function(root) {
    // 后序遍历，从底部向上依次返回包含 MAX(left, right) + value 情况下值，作为上一层的 左/右 孩子
    // 当 当前 left + right + value 为最大时需要记录一下
    // 忘记考虑 val 为负数情况，所以此处不能用 0
    let max = null;
    const postOrderTraversal = (node) => {
        if (!node) {
            return 0;
        }
        const left = postOrderTraversal(node.left) ?? 0;
        const right = postOrderTraversal(node.right) ?? 0;
        // 因为若需要包含当前节点，的左右两边孩子，需要考虑两边孩子都为负数时，直接去当前节点值即可
        const current = Math.max(left, 0) + Math.max(right, 0) + node.val;
        if (max === null) {
            max = current;
        }
        if (current > max) {
            max = current;
        }
        // 因为不需要考虑出发点是否为子节点，所以，若孩子最大的也为负数，则去自身即可
        return node.val + Math.max(Math.max(left, right), 0);
    }
    postOrderTraversal(root);
    return max;
};

// https://leetcode.cn/problems/jC7MId/?envType=study-plan&id=lcof-ii&plan=lcof&plan_progress=bv0usar

// 输入：root = [1,2,3]
// 输出：6
// 解释：最优路径是 2 -> 1 -> 3 ，路径和为 2 + 1 + 3 = 6

// 输入：root = [-10,9,20,null,null,15,7]
// 输出：42
// 解释：最优路径是 15 -> 20 -> 7 ，路径和为 15 + 20 + 7 = 42

// 提示：

// 树中节点数目范围是 [1, 3 * 104]
// -1000 <= Node.val <= 1000

t = {
    val: -10,
    left: {
        val: 9
    }
}