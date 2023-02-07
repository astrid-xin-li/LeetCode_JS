/**
 * [TOPIC]: 给定两个单链表的头节点 headA 和 headB ，请找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 null 。
 * 题目数据 保证 整个链式结构中不存在环。
 * 注意，函数返回结果后，链表必须 保持其原始结构 。
 * 
 * [进阶]：能否设计一个时间复杂度 O(n) 、仅用 O(1) 内存的解决方案？
 */

/**
 * Definition for singly-linked list.
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}


/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
 var getIntersectionNode = function(headA, headB) {
    // 分别求出两个节点总长度，因为后面的数据是一样的情况下找出第一个通用节点
    // 那么相当于需要在距离末端一样长度情况下，两个进行依次向后比较直到有一个相同 node 为止，那就是找出公共接点开始位置
    let tempA = headA;
    let lengthA = 0;
    while(tempA) {
        lengthA += 1;
        tempA = tempA.next;
    }
    let tempB = headB;
    let lengthB = 0;
    while(tempB) {
        lengthB += 1;
        tempB = tempB.next;
    }
    let min = lengthB > lengthA ? headA : headB;
    let max = lengthB > lengthA ? headB : headA;
    let maxIndex = Math.abs(lengthA - lengthB);
    for (let i = 0; i < maxIndex && max; i++) {
        max = max.next
    }
    while(max && min) {
        if (max === min) {
            return max;
        }
        max = max.next;
        min = min.next;
    }
    return null;

    // // 求出 a 中所有元素
    // let temp = headA;
    // const elementA = [];
    // while(temp) {
    //     elementA.push(temp.val);
    //     temp = temp.next;
    // }
    // while(headB) {
    //     const element = headB.val;
    //     const indexA = elementA.indexOf(element);
    //     if (indexA > -1) {
    //         let tempA = headA;
    //         for (let i = 0; i <= indexA && tempA; i++) {
    //             tempA = tempA.next;
    //         }
    //         if (tempA === headB) {
    //             return headB;
    //         }
    //     }
    // }
    // return null;
};


// 输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
// 输出：Intersected at '8'
// 解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。
// 从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,0,1,8,4,5]。
// 在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。

// 输入：intersectVal = 2, listA = [0,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
// 输出：Intersected at '2'
// 解释：相交节点的值为 2 （注意，如果两个链表相交则不能为 0）。
// 从各自的表头开始算起，链表 A 为 [0,9,1,2,4]，链表 B 为 [3,2,4]。
// 在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。

// 来输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
// 输出：null
// 解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。
// 由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
// 这两个链表不相交，因此返回 null 。

// listA 中节点数目为 m
// listB 中节点数目为 n
// 0 <= m, n <= 3 * 104
// 1 <= Node.val <= 105
// 0 <= skipA <= m
// 0 <= skipB <= n
// 如果 listA 和 listB 没有交点，intersectVal 为 0
// 如果 listA 和 listB 有交点，intersectVal == listA[skipA + 1] == listB[skipB + 1]