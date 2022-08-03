/*
 * @lc app=leetcode id=409 lang=typescript
 *
 * [409] Longest Palindrome
 */

// @lc code=start
function longestPalindrome(s: string): number {
    // 回文是有无数个 偶数个相同字母组成，最多含有一个字母是 奇数
    let palindromeLength = 0;
    const map = new Map();
    Array.from(s).map(value => {
        if (map.get(value)) {
            // 已经有了一个，那加上这个就两个了，凑一对，并删除方便下次记录
            map.delete(value);
            palindromeLength = palindromeLength + 2;
        } else {
            map.set(value, 1);
        }
    })
    // map 的长度是 size 不是 length
    if (map.size) {
        // 现在map里面存储的就是单个字母的，那么回文里面最多只能有一个奇数，所以加上这个就行了
        palindromeLength ++;
    }
    return palindromeLength;
};
// @lc code=end

