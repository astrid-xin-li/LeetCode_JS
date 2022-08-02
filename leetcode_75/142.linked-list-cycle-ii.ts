/*
 * @lc app=leetcode id=142 lang=typescript
 *
 * [142] Linked List Cycle II
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

function detectCycle(head: ListNode | null): ListNode | null {
    // 这里需要找到循环点，那么我将value都进行拼接存储到一个字符串中
    // 当发现当前内容与字符串有重复，则认为开始循环，一直进行查找到与字符串最末尾value一致时，则认为此为循环
    // 如果中间突然出现不一致的，则将刚刚认为重复字段拼接到 value string 中，作为父本匹配文本继续查重
    let valueString = '';
    const gapString = ',';
    let cycleStartPoint: ListNode | null = null;
    let repeatString = '';
    while (head) {
        const {val} = head;
        if (valueString.includes(`${val}`)) {
            if (!repeatString) {
                // 当前为第一个重复字段
                cycleStartPoint = head;
                repeatString = `${val}`;
            } else {
                const tempString = `${repeatString}${gapString}${val}`;
                if (!valueString.includes(tempString)) {
                    // 先要匹配一下，是不是当前已经进入第二次循环
                    if (!repeatString.split(`${val}`)[0]) {
                        break;
                    }
                    // 当前与之前链接后无法拼接，需要把之前拼接字段放到父本中作为匹配字段
                    valueString = `${valueString}${gapString}${repeatString}`;
                    repeatString = `${val}`;
                    cycleStartPoint = head;
                } else {
                    repeatString = tempString;
                }
            }
            head = head.next;
            continue;
        } else if (repeatString) {
            // 之前已经开始进行循环匹配了，但是此次没有匹配上，需要把之前匹配内容放到父本中
            valueString = `${valueString}${gapString}${repeatString}`;
            repeatString = '';
            cycleStartPoint = null;
        }
        valueString = `${valueString}${gapString}${val}`;
        head = head.next;
    }
    if (!head?.next) {
        // 上述循环可能是 没有next了，所以这里要加兜底逻辑！
        cycleStartPoint = null;
    }
    return cycleStartPoint;
};
// @lc code=end

