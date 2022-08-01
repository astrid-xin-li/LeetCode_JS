/*
 * @lc app=leetcode id=206 lang=typescript
 *
 * [206] Reverse Linked List
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 */
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}


function reverseList(head: ListNode | null): ListNode | null {
    // 把当前链反过来
    if (!head) {
        return null;
    }
    const reverseNode = (head: ListNode | null, parent: ListNode) => {
        if (!head) {
            return parent;
        }
        const temp = head.next;
        head.next = parent;
        return reverseNode(temp, head);
    }
    const temp = head.next;
    head.next = null;
    return reverseNode(temp, head);
};
// @lc code=end

