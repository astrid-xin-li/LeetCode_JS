/**
 * [TOPIC]: 序列化是将一个数据结构或者对象转换为连续的比特位的操作，进而可以将转换后的数据存储在一个文件或者内存中，同时也可以通过网络传输到另一个计算机环境，采取相反方式重构得到原数据。
 * 请设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。
 */

/**
 * Definition for a binary tree node.
 */

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    // 这里就是相当于一种遍历，转换成字符串，然后在 deserialize  再反转回来
    // 转换时，按照层次遍历去找，当发现此节点没有左/右就存 null，在解析的时候此节点对应 shift 两个节点，如果是null则不存储，非null则存储继续找其终点
    if (!root) {
        return '';
    }
    const current = [root];
    let result = '';
    while(current.length) {
        const node = current.shift();
        if (!node) {
            result =  `${result},null`;
            continue;
        }

        const { val, left, right } = node;
        if (!result) {
            // 千万不能第一次直接赋值，不然当前为 0 的情况下 result 为 0 下次还会走到此逻辑
            result = `${val}`;
        } else {
            result = `${result},${val}`;
        }

        current.push(left ?? null);
        current.push(right ?? null);
    }
    return result;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    if (!data.length) {
        return null;
    }
    const arr = data.split(',');
    const root = new TreeNode(arr.shift());
    const current = [root];

    while(current.length) {
        const node = current.shift();
        if (!(node === null || node === undefined)) {
            // 之前已经被转换成字符串了，需要判断是否为 null 字符串
            const left = arr.shift();
            const right = arr.shift();
            // 左孩子
            if (left !== 'null' && left !== 'undefined') {
                const children = new TreeNode(left);
                node.left = children;
                current.push(children);
            }
            // 右孩子
            if (right !== 'null' && right !== 'undefined') {
                const children = new TreeNode(right);
                node.right = children;
                current.push(children);
            }
        }
    }

    return root;
};

const t = deserialize('0,0,0,0');
console.log(t);

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

// https://leetcode.cn/problems/h54YBf/?envType=study-plan&id=lcof-ii&plan=lcof&plan_progress=bv0usar

// 输入：root = [1,2,3,null,null,4,5]
// 输出：[1,2,3,null,null,4,5]
// 示例 2：

// 输入：root = []
// 输出：[]
// 示例 3：

// 输入：root = [1]
// 输出：[1]
// 示例 4：

// 输入：root = [1,2]
// 输出：[1,2]

// 输入输出格式与 LeetCode 目前使用的方式一致，详情请参阅 LeetCode 序列化二叉树的格式。你并非必须采取这种方式，也可以采用其他的方法解决这个问题。
// https://leetcode.cn/faq/#binary-tree
// 树中结点数在范围 [0, 104] 内
// -1000 <= Node.val <= 1000