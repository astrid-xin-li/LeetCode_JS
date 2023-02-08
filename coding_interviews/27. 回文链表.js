/**
 * [TOPIC]: 给定一个链表的 头节点 head ，请判断其是否为回文链表。
 * 如果一个链表是回文，那么链表节点序列从前往后看和从后往前看是相同的。
 * 
 * [进阶]：能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
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
 * @return {boolean}
 */
 var isPalindrome = function(head) {
    // 最简单是迭代，记录起点，找到终点后，比较f 与 l，符合就return，一直到 f 与 l 为同一个，或者两个不相等
    const list = [];
    let last = head;
    while(last) {
        list.push(last);
        last = last.next;
    }
    let first = head;
    while(first !== first) {
        last = list.pop();
        if (last === first) {
            // 两者为同一个
            return true;
        }
        if (last.val === first.val) {
            // 回文对应的上
            first = first.next;
            continue;
        }
        return false;
    }
};

//  输入: head = [1,2,3,3,2,1]
//  输出: true

//  输入: head = [1,2]
//  输出: false
