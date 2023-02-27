/**
 * [TOPIC]: 给定一棵二叉树的根节点 root ，请找出该二叉树中每一层的最大值。
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
var largestValues = function(root) {
    if (!root) {
        return [];
    }
    // 进行层次遍历，而且当前层与孩子层级需要分离开
    let current = [root];
    let children = [];
    const arr = [];
    let max = null;
    while(current.length) {
        const node = current.shift();
        const { val, left, right } = node;
        if (max < val || max === null) {
            max = val;
        }
        if (left) {
            children.push(left);
        }
        if (right) {
            children.push(right);
        }
        if (!current.length) {
            current = children;
            children = [];
            arr.push(max);
            max = null;
        }
    }
    return arr;
};

// 输入: root = [1,3,2,5,3,null,9]
// 输出: [1,3,9]
// 解释:
//           1
//          / \
//         3   2
//        / \   \  
//       5   3   9 
// 示例2：

// 输入: root = [1,2,3]
// 输出: [1,3]
// 解释:
//           1
//          / \
//         2   3
// 示例3：

// 输入: root = [1]
// 输出: [1]
// 示例4：

// 输入: root = [1,null,2]
// 输出: [1,2]
// 解释:      
//            1 
//             \
//              2     
// 示例5：

// 输入: root = []
// 输出: []
//  

// 提示：

// 二叉树的节点个数的范围是 [0,104]