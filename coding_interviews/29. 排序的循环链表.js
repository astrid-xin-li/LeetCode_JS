/**
 * [TOPIC]: 给定循环单调非递减列表中的一个点，写一个函数向这个列表中插入一个新元素 insertVal ，使这个列表仍然是循环升序的。
 * 给定的可以是这个列表中任意一个顶点的指针，并不一定是这个列表中最小元素的指针。
 * 如果有多个满足条件的插入位置，可以选择任意一个位置插入新的值，插入后整个列表仍然保持有序。
 * 如果列表为空（给定的节点是 null），需要创建一个循环有序列表并返回这个节点。否则。请返回原先给定的节点。
 */

/**
 * // Definition for a Node.
 */
function Node(val, next) {
    this.val = val;
    this.next = next;
};

/**
 * @param {Node} head
 * @param {number} insertVal
 * @return {Node}
 */
 var insert = function(head, insertVal) {
    // 由于他们成为一个循环，那么代表其左侧一定小于右侧，若不是当前左侧是整个链路最大值，右侧是整个链路最小值
    // 循环遍历每个节点，记录比目标小且在里为最大的值，插入在其左侧， 若此值在头部，则插入到尾部
    let last = head;
    const node = new Node(insertVal, null);
    if (!head) {
        node.next = node;
        return node;
    }
    if (last.next === head) {
        head.next = node;
        node.next = head;
        return head;
    }
    let prev = null;
    do {
        const val = last.val;
        const next = last.next.val;
        if (val === insertVal || (val < insertVal && next > insertVal)) {
            // 当处于找到一样值，或者左小右大，按照非递减 ，都是直接插入当前的下一个即可
            node.next = last.next;
            last.next = node;
            return head;
        }
        if (next < val) {
            prev = last;
        }
        if (head === last.next && !prev) {
            // 当前没有找到交接处，都是一样的数那认为 交接在最末尾
            prev = last;
        }
        last = last.next;
    } while (head !== last)
    // 当前就是找了一遍，发现当前不是全部都大，就是全部都小，那无论哪种都是插在排序开头/末尾 即循环交接处
    node.next = prev.next;
    prev.next = node;
    return head;
};

// 输入：head = [3,4,1], insertVal = 2
// 输出：[3,4,1,2]
// 解释：在上图中，有一个包含三个元素的循环有序列表，你获得值为 3 的节点的指针，我们需要向表中插入元素 2 。新插入的节点应该在 1 和 3 之间，插入之后，整个列表如上图所示，最后返回节点 3 。

// 输入：head = [], insertVal = 1
// 输出：[1]
// 解释：列表为空（给定的节点是 null），创建一个循环有序列表并返回这个节点。

// 输入：head = [1], insertVal = 0
// 输出：[1,0]

// 0 <= Number of Nodes <= 5 * 10^4
// -10^6 <= Node.val <= 10^6
// -10^6 <= insertVal <= 10^6