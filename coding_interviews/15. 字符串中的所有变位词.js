/**
 * [TOPIC]: 给定两个字符串 s 和 p，找到 s 中所有 p 的 变位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。
 * 
 * 变位词 指字母相同，但排列不同的字符串。
 */

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    if (p.length > s.length) {
        return [];
    }
    const result = [];
    const elements = [];
    const numbers = [];
    // 查找出内部所有的元素并记录个数，只需要在目标字符串中匹配到有相同元素和相同 个数即可认为匹配到
    for (const value of p) {
        const index = elements.indexOf(value);
        if (index > -1) {
            numbers[index] = numbers[index] + 1;
        } else {
            elements.push(value);
            numbers.push(1);
        }
    }
    const { length } = p;
    let target = elements.length;
    for (let index = 0; index < s.length; index++) {
        const value = s[index];
        const different = index - length;
        if (different >= 0) {
            const preValue = s[different];
            if (preValue !== value) {
                // 先移出之前的数据
                const i = elements.indexOf(preValue);
                if (i > -1) {
                    const pre = numbers[i];
                    if (pre === -1) {
                        target -= 1;
                    } else if (pre === 0) {
                        target += 1;
                    }
                    numbers[i] = pre + 1;
                }
            } else {
                // 移出的和当前的是同一个元素，不需要改动，直接判断之前是否符合条件，记录就行
                if (target === 0) {
                    result.push(different + 1);
                }
                continue;
            }
        }
        const i = elements.indexOf(value);
        if (i > -1) {
            const pre = numbers[i];
            if (pre === 1) {
                target -= 1;
            } else if (pre === 0) {
                target += 1;
            }
            numbers[i] = pre - 1;
        }
        if (target === 0) {
            result.push(different + 1);
        }
    }
    return result;
};

// 输入: s = "cbaebabacd", p = "abc"
// 输出: [0,6]
// 解释:
// 起始索引等于 0 的子串是 "cba", 它是 "abc" 的变位词。
// 起始索引等于 6 的子串是 "bac", 它是 "abc" 的变位词。

// 输入: s = "abab", p = "ab"
// 输出: [0,1,2]
// 解释:
// 起始索引等于 0 的子串是 "ab", 它是 "ab" 的变位词。
// 起始索引等于 1 的子串是 "ba", 它是 "ab" 的变位词。
// 起始索引等于 2 的子串是 "ab", 它是 "ab" 的变位词。

// 1 <= s.length, p.length <= 3 * 104
// s 和 p 仅包含小写字母
