// [TOPIC]: 给定一个字符串 s ，请你找出其中不含有重复字符的 最长连续子字符串 的长度

/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLongestSubstring = function(s) {
    let currentList = [];
    let left = 0;
    let length = 0;
    while(left < s.length) {
        const value = s[left];
        const index = currentList.indexOf(value);
        if (index > -1) {
            const currentLength =currentList.length;
            length = Math.max(length, currentLength)
            currentList = currentList.slice(index + 1, currentLength);
        }
        currentList.push(value);
        left ++;
    }
    return Math.max(length, currentList.length);
};

// 输入: s = "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子字符串是 "abc"，所以其长度为 3。

// 输入: s = "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子字符串是 "b"，所以其长度为 1。

// 输入: s = "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

// 输入: s = ""
// 输出: 0

// 0 <= s.length <= 5 * 104
// s 由英文字母、数字、符号和空格组成
