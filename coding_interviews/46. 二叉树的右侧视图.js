/**
 * [TOPIC]: 给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
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
 * @return {number[]}
 */
var rightSideView = function(root) {
    if (!root) {
        return [];
    }
    // 层次遍历找到最后一个结果
    const arr = [];
    let current = [root];
    let children = [];
    while(current.length) {
        const { left, right, val } = current.shift();
        if (left) {
            children.push(left);
        }
        if (right) {
            children.push(right);
        }
        if (!current.length) {
            arr.push(val);
            current = children;
            children = [];
        }
    }
    return arr;
};

// 输入: [1,2,3,null,5,null,4]
// 输出: [1,3,4]

// 输入: [1,null,3]
// 输出: [1,3]

// 输入: []
// 输出: []