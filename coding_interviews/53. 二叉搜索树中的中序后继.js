/**
 * [TOPIC]: 给定一棵二叉搜索树和其中的一个节点 p ，找到该节点在树中的中序后继。如果节点没有中序后继，请返回 null 。
 * 
 * 节点 p 的后继是值比 p.val 大的节点中键值最小的节点，即按中序遍历的顺序节点 p 的下一个节点。
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 */
var inorderSuccessor = function(root, p) {
    // 二叉搜索树，只当前节点左孩子都会比自身小，右孩子都会比自身大
    // 而 中序后继 是指按中序遍历p的下一个节点
    // 左 中 右
    const target = p.val;
    const list  = [];
    const searchLeftNode = (node) => {
        if (node.left) {
            return searchLeftNode(node.left);
        }
        return node;
    }

    const inorderTraversal = (node) => {
        // 若当 p 小于当前节点， 则在左边 （左子树的左边，求左子树根，左子树右边，求左子树的父节点）
        // 大于当前节点，则在右边 （右子树的左边，求右子树根，右子树右边，求右子树的父节点的父节点）
        // 所以，当前是左孩子则存当前dom，若是右孩子则只存右孩子
        if (!node) {
            return null;
        }
        const val = node.val;
        if (val === target) {
            if (node.right) {
                return searchLeftNode(node.right);
            }
            return list.pop() ?? null;
        }
        if (val > target) {
            list.push(node);
            if (node.left) {
                return inorderTraversal(node.left);
            }
            return null;
        }
        if (node.right) {
            return inorderTraversal(node.right);
        }
        return null;
    }
    return inorderTraversal(root);
};

// https://leetcode.cn/problems/P5rCT8/?envType=study-plan&id=lcof-ii&plan=lcof&plan_progress=bv0usar

// 输入：root = [2,1,3], p = 1
// 输出：2
// 解释：这里 1 的中序后继是 2。请注意 p 和返回值都应是 TreeNode 类型。
// 示例 2：



// 输入：root = [5,3,6,2,4,null,null,1], p = 6
// 输出：null
// 解释：因为给出的节点没有中序后继，所以答案就返回 null 了。
//  

// 提示：

// 树中节点的数目在范围 [1, 104] 内。
// -105 <= Node.val <= 105
// 树中各节点的值均保证唯一。
//  
t = {
    val: 5,
    right: { val: 6, },
    left: {
        val: 3,
        right: { val: 4 },
        left: {
            val: 2,
            left: { val: 1},
        }
    }
}