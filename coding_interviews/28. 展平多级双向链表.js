/**
 * [TOPIC]: 多级双向链表中，除了指向下一个节点和前一个节点指针之外，它还有一个子链表指针，可能指向单独的双向链表。这些子列表也可能会有一个或多个自己的子项，依此类推，生成多级数据结构，如下面的示例所示。
 * 
 * 给定位于列表第一级的头节点，请扁平化列表，即将这样的多级双向链表展平成普通的双向链表，使所有结点出现在单级双链表中。
 */

/**
 * // Definition for a Node.
 */
function Node(val,prev,next,child) {
   this.val = val;
   this.prev = prev;
   this.next = next;
   this.child = child;
};

function find(head) {
    // 每次返回查找到最末尾的节点
    if (!head || (!head.next && !head.child)) {
        return head;
    }
    if(head.child) {
        // 当前有孩子节点优先找 孩子,find 返回最末尾节点
        const child = head.child;
        const result = find(head.child);
        result.next = head.next;
        head.next = child;
        child.prev = head;
        head.child = null;
        if (result.next) {
            // 可能 head 下面没有内容了，这个child是最后一个，需要做判断
            result.next.prev = result;
        }
        head = result;
    }
    return head.next ? find(head.next) : head;
}

/**
 * @param {Node} head
 * @return {Node}
 */
 var flatten = function(head) {
    // 这里相当于从起点开始，先判断有没有孩子，有孩子优先找孩子节点，没有则找右节点，相当于深度遍历，去掉孩子
    find(head);
    return head;

};

//  输入：head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
//  输出：[1,2,3,7,8,11,12,9,10,4,5,6]
//  解释：
//  1---2---3---4---5---6--NULL
//          |
//          7---8---9---10--NULL
//              |
//              11--12--NULL
//     序列化其中的每一级之后：
//     [1,2,3,4,5,6,null]
//     [7,8,9,10,null]
//     [11,12,null]
//     为了将每一级都序列化到一起，我们需要每一级中添加值为 null 的元素，以表示没有节点连接到上一级的上级节点。
//     [1,2,3,4,5,6,null]
//     [null,null,7,8,9,10,null]
//     [null,11,12,null]
//     合并所有序列化结果，并去除末尾的 null 。
//     合并所有序列化结果，并去除末尾的 null 。

//  输入：head = [1,2,null,3]
//  输出：[1,3,2]
//  解释：
 
//  输入的多级列表如下图所示：
 
//    1---2---NULL
//    |
//    3---NULL
 
//    节点数目不超过 1000
//    1 <= Node.val <= 10^5