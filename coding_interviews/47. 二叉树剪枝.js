/**
 * [TOPIC]: 给定一个二叉树 根节点 root ，树的每个节点的值要么是 0，要么是 1。请剪除该二叉树中所有节点的值为 0 的子树。
 * 节点 node 的子树为 node 本身，以及所有 node 的后代。
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
 * @return {TreeNode}
 */
var pruneTree = function(root) {
    // 减枝就相当于后序遍历，当发现左右孩子都可以减去的情况下，自身也能减，当前就被剪掉了
    const isPruneChildren = (node) => {
        const { val, left, right } = node;
        // 没有就是默认已经被剪掉了
        const isPruneLeft = left ? isPruneChildren(left) : true;
        const isPruneRight = right ? isPruneChildren(right) : true;
        if (isPruneLeft) {
            node.left = null;
        }
        if (isPruneRight) {
            node.right = null;
        }
        return isPruneLeft && isPruneRight && (val === 0)
    }
    const isNull = isPruneChildren(root);
    if (isNull) {
        // 当前没有任何节点可以保留
        return null;
    }
    return root;
};

// 具体讲解 https://leetcode.cn/problems/pOCWxh/?envType=study-plan&id=lcof-ii&plan=lcof&plan_progress=bv0usar

// 输入: [1,null,0,0,1]
// 输出: [1,null,0,null,1] 
// 解释: 
// 只有红色节点满足条件“所有不包含 1 的子树”。
// 右图为返回的答案。

// 输入: [1,0,1,0,0,0,1]
// 输出: [1,null,1,null,1]

// 输入: [1,1,0,1,1,0,1,0]
// 输出: [1,1,0,1,1,null,1]


// 提示:

// 二叉树的节点个数的范围是 [1,200]
// 二叉树节点的值只会是 0 或 1