// [TOPIC]: 给定一个非空字符串 s，请判断如果 最多 从字符串中删除一个字符能否得到一个回文字符串

var isPalindrome = function(s) {
    let left = 0;
    let right = s.length - 1;
    while(left < right) {
        const leftElement = s[left].toLowerCase();
        const rightElement = s[right].toLowerCase();
        if (leftElement !== rightElement) {
            return false;
        }
        left ++;
        right --;
    }
    return true;
}

/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function(s) {
    let left = 0;
    let right = s.length - 1;
    while(left < right) {
        const leftElement = s[left].toLowerCase();
        const rightElement = s[right].toLowerCase();
        if (leftElement !== rightElement) {
            return isPalindrome(s.slice(left, right)) || isPalindrome(s.slice(left + 1, right + 1));
        }
        left ++;
        right --;
    }
    return true;
};

// 输入: s = "aba"
// 输出: true

// 输入: s = "abca"
// 输出: true
// 解释: 可以删除 "c" 字符 或者 "b" 字符

// 输入: s = "abc"
// 输出: false