/**
 * [TOPIC]: 给定两个字符串 s 和 t ，编写一个函数来判断它们是不是一组变位词（字母异位词）。
 * 注意：若 s 和 t 中每个字符出现的次数都相同且字符顺序不完全相同，则称 s 和 t 互为变位词（字母异位词）。
 * 
 * [进阶]: 如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
 var isAnagram = function(s, t) {
    if (s.length !== t.length || s === t) {
        return false;
    }
    const map = new Map();
    Array.from(s).map((value) => {
        const times = map.get(value) ?? 0;
        map.set(value, times + 1);
    })
    // some 是至少有一个为true，every 是所有都要为true
    return Array.from(t).every((value) => {
        const times = map.get(value) ?? 0;
        if (times === 0) {
            // 当前不存在此元素，匹配失败
            return false;
        }
        map.set(value, times - 1);
        return true;
    })
};

// 输入: s = "a", t = "a"
// 输出: false

// 输入: s = "rat", t = "car"
// 输出: false

// 输入: s = "anagram", t = "nagaram"
// 输出: true

//  1 <= s.length, t.length <= 5 * 104
//  s and t 仅包含小写字母