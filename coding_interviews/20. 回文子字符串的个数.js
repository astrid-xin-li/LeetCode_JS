/**
 * [TOPIC]: 给定一个字符串 s ，请计算这个字符串中有多少个回文子字符串。
 * 具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。
 */

/**
 * @param {string} s
 * @return {number}
 */
 var countSubstrings = function(s) {
    let result = 0;
    // 将 s 中 各个元素作为中心点，依次向外扩展查找扩展外的两个元素是否一样，若发现不一样的直接终止查询 此元素作为中心点的回文已经结束
    for (let index = 0; index < s.length; index++) {
        let left = index - 1;
        let right = index + 1;
        // 当前元素默认就是一个回文，所以记录应该从 1 开始
        let currentNum = 1;
        while(left >= 0 && right < s.length) {
            // 回文为奇数
            if (s[left] === s[right]) {
                currentNum += 1;
                left -= 1;
                right += 1;
            } else {
                break;
            }
        }
        // 上述循环是查的是以 index 作为 中心点进行回文对齐，下面需要找的是 index 和 index + 1 之间作为中心点，进行循环查找
        left = index;
        right = index + 1;
        while(left >= 0 && right < s.length) {
            // 回文为偶数
            if (s[left] === s[right]) {
                currentNum += 1;
                left -= 1;
                right += 1;
            } else {
                break;
            }
        }
        result += currentNum;
    }
    return result;
};

//  输入：s = "abc"
//  输出：3
//  解释：三个回文子串: "a", "b", "c"

// 输入：s = "aaa"
// 输出：6
// 解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"

// 1 <= s.length <= 1000
// s 由小写英文字母组成