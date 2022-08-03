/*
 * @lc app=leetcode id=589 lang=typescript
 *
 * [589] N-ary Tree Preorder Traversal
 */

// @lc code=start
/**
 * Definition for node.
 */
class naryNode {
    val: number
    children: Node[]
    constructor(val?: number) {
        this.val = (val===undefined ? 0 : val)
        this.children = []
    }
}

function preorder(root: naryNode | null): number[] {
    const result: number[] = [];
    if (!root) {
        return result;
    }
    result.push(root.val);
    root.children.map((value) => {
        result.push(...preorder(value))
    })
    return result;
};
// @lc code=end

