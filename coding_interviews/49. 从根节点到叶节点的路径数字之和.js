/**
 * [TOPIC]: 给定一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字。
 * 
 * 每条从根节点到叶节点的路径都代表一个数字：
 * 
 * 例如，从根节点到叶节点的路径 1 -> 2 -> 3 表示数字 123 。
 * 计算从根节点到叶节点生成的 所有数字之和 。
 * 
 * 叶节点 是指没有子节点的节点。
 */

/**
 * Definition for a binary tree node.
 */
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function(root) {
    // 就是找所有从根节点到叶子结点的路径，然后此路径上的数拼接成一个 数字，所有路径上的数字相加就是结果
    // 采用后序遍历
    let result = 0;
    const findChild = (node, preNum) => {
        const { val, left, right } = node;
        const num = preNum * 10 + val;
        if (!left && !right) {
            // 当前就是叶子结点
            result += num;
            return;
        }
        if (left) {
            findChild(left, num);
        }
        if (right) {
            findChild(right, num);
        }
    }
    findChild(root, 0);
    return result
};

const test = new TreeNode(
    4,
    new TreeNode(
        9,
        new TreeNode(5),
        new TreeNode(1),
    ),
    new TreeNode(0)
);

console.log(sumNumbers(test));
// https://leetcode.cn/problems/3Etpl5/?envType=study-plan&id=lcof-ii&plan=lcof&plan_progress=bv0usar

// 输入：root = [1,2,3]
// 输出：25
// 解释：
// 从根到叶子节点路径 1->2 代表数字 12
// 从根到叶子节点路径 1->3 代表数字 13
// 因此，数字总和 = 12 + 13 = 25
// 示例 2：


// 输入：root = [4,9,0,5,1]
// 输出：1026
// 解释：
// 从根到叶子节点路径 4->9->5 代表数字 495
// 从根到叶子节点路径 4->9->1 代表数字 491
// 从根到叶子节点路径 4->0 代表数字 40
// 因此，数字总和 = 495 + 491 + 40 = 1026
//  

// 提示：

// 树中节点的数目在范围 [1, 1000] 内
// 0 <= Node.val <= 9
// 树的深度不超过 10
