/*
 * @lc app=leetcode id=21 lang=typescript
 *
 * [21] Merge Two Sorted Lists
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

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    // 两个有序链接拼接成一个有序的
    if (!list1 || !list2) {
        return list1 ?? list2;
    }
    if (list1.val === list2.val) {
        const temp = list1.next;
        list1.next = list2;
        list2.next = mergeTwoLists(temp, list2.next);
        return list1
    }
    if (list1.val < list2.val) {
        const temp = list1.next;
        list1.next = mergeTwoLists(temp, list2);
        return list1;
    }
    const temp = list2.next;
    list2.next = mergeTwoLists(temp, list1);
    return list2;
};
// @lc code=end

