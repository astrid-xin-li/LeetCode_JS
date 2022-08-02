/*
 * @lc app=leetcode id=876 lang=typescript
 *
 * [876] Middle of the Linked List
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

function middleNode(head: ListNode | null): ListNode | null {
    if (!head) {
        return null;
    }
    let middle = 0;
    let current = 0;
    let middleNode: ListNode | null = head;
    do {
        const currentMiddle = Math.round(current / 2);
        while (currentMiddle > middle) {
            middle ++;
            middleNode = middleNode?.next ?? null;
        }
        current ++;
        head = head.next;
    } while(head && middleNode)
    return middleNode;
};
// @lc code=end

