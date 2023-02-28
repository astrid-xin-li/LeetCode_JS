/**
 *  [TOPIC]: 给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。
 * 路径 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function(root, targetSum) {
    // 应该使用前缀和，https://leetcode.cn/problems/6eUYwP/solution/xiang-xia-de-lu-jing-jie-dian-zhi-he-by-a1iyy/ ，时间复杂度为n
    // 深度遍历方案（时间复杂度为 n^2）
    let result = 0;
    // 从下面依次返回
    const findChildList = (node) => {
        if(!node) {
            return [];
        }
        const { val, left, right } = node;
        const list = [val];
        if (val === targetSum) {
            result += 1;
        }
        if (left) {
            findChildList(left).map(value => {
                const temp = value + val;
                list.push(temp);
                if (temp === targetSum) {
                    result += 1;
                }
            });
        }
        if (right) {
            findChildList(right).map(value => {
                const temp = value + val;
                list.push(temp);
                if (temp === targetSum) {
                    result += 1;
                }
            });
        }
        return list;
    }
    findChildList(root);
    return result;
};

const test = new TreeNode(
    10,
    new TreeNode(
        5,
        new TreeNode(
            3,
            new TreeNode(3),
            new TreeNode(-2),
        ),
        new TreeNode(
            2,
            undefined,
            new TreeNode(1),
        ),
    ),
    new TreeNode(
        -3,
        undefined,
        new TreeNode(11),
    )
);
const test2 = new TreeNode(
    5,
    new TreeNode(
        4,
        new TreeNode(
            11,
            new TreeNode(7),
            new TreeNode(2),
        ),
        undefined,
    ),
    new TreeNode(
        8,
        new TreeNode(13),
        new TreeNode(
            4,
            new TreeNode(5),
            new TreeNode(1),
        ),
    )
);

console.log(pathSum(test, 8));
console.log(pathSum(test2, 22));

// https://leetcode.cn/problems/6eUYwP/?envType=study-plan&id=lcof-ii&plan=lcof&plan_progress=bv0usar

// 输入：root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
// 输出：3
// 解释：和等于 8 的路径有 3 条，如图所示。
// 示例 2：

// 输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
// 输出：3
//  

// 提示:

// 二叉树的节点个数的范围是 [0,1000]
// -109 <= Node.val <= 109 
// -1000 <= targetSum <= 1000 