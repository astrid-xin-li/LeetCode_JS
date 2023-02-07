/**
 * [TOPIC]: 给定一个链表，返回链表开始入环的第一个节点。 从链表的头节点开始沿着 next 指针进入环的第一个节点为环的入口节点。如果链表无环，则返回 null。
 * 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意，pos 仅仅是用于标识环的情况，并不会作为参数传递到函数中。
 * 说明：不允许修改给定的链表。
 * 
 * [进阶]：是否可以使用 O(1) 空间解决此题？
 */

/**
 * Definition for singly-linked list.
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 var detectCycle = function(head) {
    let temp = head;
    for (let index = 0; temp; index++) {
        const value = Number(temp.val);
        if (isNaN(value)) {
            return temp;
        }
        temp.val = `${index}px`;
        temp = temp.next;
    }
    // 最牛的解决方案，应该是操场快慢跑，同时出发一个快一个慢匀速跑问他们什么时候再次碰面
    // 设置两个指针，一个一次只找 1个，另一个一次找两个，当它们两个指向同一个时就是解题
    // 快的速度是慢的2倍，慢的走过不重复a，加上重复b相当于，1/2 的快的走过的 a + 重合慢的b + 自行跑了n圈的闭环 b+c
    // 可以得到 a = n(b + c) - b = c + (n - 1)(b + c)
    // 当第三个指针从头开始与 slow 一起一个找走，他们两个相同时就是 所求
};

//  输入：head = [3,2,0,-4], pos = 1
//  输出：返回索引为 1 的链表节点
//  解释：链表中有一个环，其尾部连接到第二个节点。

//  输入：head = [1,2], pos = 0
// 输出：返回索引为 0 的链表节点
// 解释：链表中有一个环，其尾部连接到第一个节点

// 输入：head = [1], pos = -1
// 输出：返回 null
// 解释：链表中没有环。

// 链表中节点的数目范围在范围 [0, 104] 内
// -105 <= Node.val <= 105
// pos 的值为 -1 或者链表中的一个有效索引