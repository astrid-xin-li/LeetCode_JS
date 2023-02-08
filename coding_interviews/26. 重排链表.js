/**
 * [TOPIC]: 给定一个单链表 L 的头节点 head ，单链表 L 表示为：
 *  L0 → L1 → … → Ln-1 → Ln 
 * 
 * 请将其重新排列后变为：
 * L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …
 * 
 * 不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
 */

/**
 * Definition for singly-linked list.
 */
 function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
 var reorderList = function(head) {
    //  采用递归方法，一层嵌套一层，当到底部时l，头部f指向l，l指向f.next，f在向后移动两位
    // 一直到 f 的下一个就是 l 时结束
    let first = head;
    let last = head;
    const list = [];
    while(last) {
        list.push(last);
        last = last.next;
    }
    while(first && first.next !== last && first.next) {
        last = list.pop();
        last.next = null;
        const temp = first.next;
        if (temp !== last) {
            last.next = temp;
        }
        first.next = last;
        first = temp;
    }
    if (first.next === last) {
        // 此时链表长度为基数，最后一个没有做处理，但其指向 last，导致产生长度为2的闭环，需要对 f 进行解除
        first.next = null
    }
};

//  输入: head = [1,2,3,4]
//  输出: [1,4,2,3]

//  输入: head = [1,2,3,4,5]
//  输出: [1,5,2,4,3]

//  链表的长度范围为 [1, 5 * 104]
//  1 <= node.val <= 1000