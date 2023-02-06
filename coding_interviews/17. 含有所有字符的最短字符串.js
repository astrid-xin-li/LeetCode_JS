/**
 * [TOPIC]: 给定两个字符串 s 和 t 。返回 s 中包含 t 的所有字符的最短子字符串。
 * 如果 s 中不存在符合条件的子字符串，则返回空字符串 "" 。
 * 如果 s 中存在多个符合条件的子字符串，返回任意一个。
 * 注意： 对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    // 记录 t 中所有元素，以及对应的个数，从左到右依次查找能够满足 t 所有元素和个数的字符串
    // 满足要求的字符串，应该是以存在第一个字符开始，全部清空个数位置
    if (s.length < t.length) {
        return '';
    }
    const elements = [];
    const numList = [];
    Array.from(t).map((value) => {
        const index = elements.indexOf(value);
        if (index > -1) {
            numList[index] = numList[index] + 1;
        } else {
            elements.push(value);
            numList.push(1);
        }
    })
    // 统计被测试字符串里包含的元素，以及他们存在的从小到大的顺序
    const elementsMap = new Map();
    // 用于统计当前字符串中包含那个元素，方便统计下一个开始位置
    const currentList = [];
    let isAll = elements.length;
    let min = 0;
    let different = -1;

    Array.from(s).map((value, i) => {
        const index = elements.indexOf(value);
        if (index > -1) {
            const number = elementsMap.get(value) ?? [];
            elementsMap.set(value, [...number, i]);
            // 只往里面添加，所以会一直剪去，若当前剪完后为 0 则认为此时此刻此元素就是找到全部符合要求的
            numList[index] -= 1;
            if (numList[index] === 0) {
                isAll -= 1;
            }
            currentList.push(value);
        }
        while(isAll <= 0) {
            const firstElement = currentList[0];
            const lastElement = currentList[currentList.length - 1];
            const firstList = elementsMap.get(firstElement);
            const first = firstList[0];
            const last = elementsMap.get(lastElement)[elementsMap.get(lastElement).length - 1];
            // 需要包含最后一个元素，所以要加一
            const diff = Math.abs(last - first + 1);
            if (diff < different || different === -1) {
                // 当前为初始化，或者此时字符串比较小则同步记录
                different = diff;
                min = Math.min(last, first);
            }
            currentList.shift();
            firstList.shift();
            const firstIndex = elements.indexOf(firstElement);
            // 当前是去掉元素，所以对于目标而言要加回去
            numList[firstIndex] += 1;
            if (numList[firstIndex] > 0) {
                // 当前 numList[firstIndex] 被删除了一个，需要重新查找下一个
                isAll += 1;
            }
        }
    })
    if (different < t.length) {
        // 当前元素未凑齐，直接返回
        return '';
    }
    return Array.from(s).splice(min, different).reduce((value, currentValue) => `${value}${currentValue}`, '');
};

//  输入：s = "ADOBECODEBANC", t = "ABC"
//  输出："BANC" 
//  解释：最短子字符串 "BANC" 包含了字符串 t 的所有字符 'A'、'B'、'C'
 
//  输入：s = "a", t = "a"
//  输出："a"

// 输入：s = "a", t = "aa"
// 输出：""
// 解释：t 中两个字符 'a' 均应包含在 s 的子串中，因此没有符合条件的子字符串，返回空字符串。

// 1 <= s.length, t.length <= 105
// s 和 t 由英文字母组成