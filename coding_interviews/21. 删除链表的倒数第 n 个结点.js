// [TOPIC]: 给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

/**
 * Definition for singly-linked list.
 */
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
 var removeNthFromEnd = function(head, n) {
    let length = 1;
    const result = head;
    while(head.next) {
        length += 1;
        head = head.next;
    }
    const different = length - n;
    let temp = result;
    for(let i = 1; i <= different; i ++) {
        if (i === different) {
            temp.next = temp.next.next;
            break;
        }
        if (!temp.next) {
            break;
        }
        temp = temp.next;
    }
    return result;
};

// 输入：head = [1,2,3,4,5], n = 2
// 输出：[1,2,3,5]

// 输入：head = [1], n = 1
// 输出：[]

// 输入：head = [1,2], n = 1
// 输出：[1]

// 链表中结点的数目为 sz
// 1 <= sz <= 30
// 0 <= Node.val <= 100
// 1 <= n <= sz