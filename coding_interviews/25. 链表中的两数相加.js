/**
 * [TOPIC]:给定两个 非空链表 l1和 l2 来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储一位数字。将这两数相加会返回一个新的链表。
 * 可以假设除了数字 0 之外，这两个数字都不会以零开头。
 * 
 * [进阶]：如果输入链表不能修改该如何处理？换句话说，不能对列表中的节点进行翻转。
 */

/**
 * Definition for singly-linked list.
 */
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

var sum = function(a,b,max) {
    if (max !== a && b !== max && max !== null) {
        // 当前处于 max 持续向下递归 从下面返回 求和 结果
        const result = sum(a, b, max.next);
        if (result?.val / 10 >= 1) {
            result.val = result.val % 10;
            max.val += 1;
        }
        max.next = result;
        return max;
    }
    if (!a || !b) {
        return a ?? b ?? new ListNode(0, null);
    }
    // 找到了相同开始位置，开始求加
    // 当前 没有向下查找，只有单纯的 a 和 b 求加
    let value = a.val + b.val;
    let result = null;
    if (a.next || b.next) {
        result = sum(a.next, b.next, null);
        if (result?.val / 10 >= 1) {
            result.val = result.val % 10;
            value += 1;
        }
    }
    return new ListNode(value, result);
    
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
 var addTwoNumbers = function(l1, l2) {
    // 先通过查找遍历方法使得两个 指针 p q分别指向链表同样长度位置，开始进行递归求和
    // 然后最长的链表开始从头递归到 p 位置，然后根据之前溢出数据向上依次求和
    let a = l1;
    let b = l2;
    let max = null;
    let isBreak = false;
    while(!isBreak) {
        if (!b.next || !a.next) {
            if (!max) {
                // 当前有一个率先抵达终点，若 b 先 则是 l1 长，否则是 l2 长
                max = !b.next ? l1 : l2;
            } else {
                // 当前 第二次出现没有下一位了，那么此时 b 和 a 向后校验位置后，他们后续的长度保持一致
                b = b.next ?? l1;
                a = a.next ?? l2;
                isBreak = true;
                break;
            }
        }
        b = b.next ?? l1;
        a = a.next ?? l2;
    }
    // return max;
    const result = sum(a,b, max);
    if (result?.val / 10 >= 1) {
        result.val = result.val % 10;
        return new ListNode(1, result);
    }
    return result;
};

//  输入：l1 = [7,2,4,3], l2 = [5,6,4]
//  输出：[7,8,0,7]

// 输入：l1 = [2,4,3], l2 = [5,6,4]
// 输出：[8,0,7]

// 输入：l1 = [0], l2 = [0]
// 输出：[0]

// 链表的长度范围为 [1, 100]
// 0 <= node.val <= 9
// 输入数据保证链表代表的数字无前导 0