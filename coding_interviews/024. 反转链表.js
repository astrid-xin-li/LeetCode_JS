// [TOPIC]: 定单链表的头节点 head ，请反转链表，并返回反转后的链表的头节点。
// [进阶]：链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题？

/**
 * Definition for singly-linked list.
 */
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 var reverseList = function(head) {
    //  递归
    if (!head?.next) {
        return head;
    }
    const temp = head;
    // 此时是除了 当前 temp 以外，剩余内容进行逆序。
    const result = reverseList(head.next);
    // 包含 temp 的下一位已经在逆序正确位置，现在产生的情况下是 temp -> temp.next, temp.next -> null
    // 而我们需要的是 temp.next -> temp -> null 
    temp.next.next = temp;
    temp.next = null;
    return result;
    

    //  迭代
    // //  挨个遍历，用一个指向返回头 first，一个指向最开始第一位 head，
    // // 依次将 head next 放到 first 之前，从而完成逆序
    // let first = head;
    // while(head.next) {
    //     const temp = head.next;
    //     head.next = temp.next;
    //     temp.next = first;
    //     first = temp;
    // }
    // return first;
};

// 输入：head = [1,2,3,4,5]
// 输出：[5,4,3,2,1]

// 输入：head = [1,2]
// 输出：[2,1]

// 输入：head = []
// 输出：[]

// 链表中节点的数目范围是 [0, 5000]
// -5000 <= Node.val <= 5000