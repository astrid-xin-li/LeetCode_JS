/*
 * @lc app=leetcode id=2 lang=typescript
 *
 * [2] Add Two Numbers
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
 class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const numList1 = [l1.val];
    let next1 = l1.next;
    while(next1) {
        numList1.concat(next1.val);
        next1 = next1.next;
    }
    const numList2 = [l2.val];
    let next2 = l2.next;
    while(next2) {
        numList2.concat(next2.val);
        next2 = next2.next;
    }

    const num1 = parseInt(numList1.reduceRight((value, num) => `${value}${num}`,''));
    const num2 = parseInt(numList2.reduceRight((value, num) => `${value}${num}`,''));
    const result = Array.from(`${num2 + num1}`).reverse();
    const l3: ListNode = new ListNode(parseInt(result[0]))
    result.reduce((pre, value) => {
        const temp = new ListNode(parseInt(value));
        pre.next = temp;
        return temp;
    }, l3);
    return l3.next;
};
// @lc code=end

