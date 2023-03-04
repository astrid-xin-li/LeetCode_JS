/**
 * [TOPIC]: 给定一个二叉树的 根节点 root，请找出该二叉树的 最底层 最左边 节点的值。
 * 假设二叉树中至少有一个节点。
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
var findBottomLeftValue = function(root) {
    // 遍历查找level和最左边值
    let val = root.val;
    let current = [root];
    let children = [];
    while(current.length) {
        const { left, right } = current.shift();
        if (left) {
            if (!children.length) {
                val = left.val;
            }
            children.push(left);
        }
        if (right) {
            if (!children.length) {
                val = right.val;
            }
            children.push(right);
        }
        if (!current.length) {
            current = children;
            children = [];
        }
    }
    return val;
};

// 输入: root = [2,1,3]
// 输出: 1

// 输入: [1,2,3,4,null,5,6,null,null,7]
// 输出: 7
// 二叉树的节点个数的范围是 [1,104]
// -231 <= Node.val <= 231 - 1 

// 具体事例： https://leetcode.cn/problems/LwUNpT/?envType=study-plan&id=lcof-ii&plan=lcof&plan_progress=bv0usar