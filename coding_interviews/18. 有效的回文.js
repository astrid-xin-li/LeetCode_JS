/**
 * 给定一个字符串 s ，验证 s 是否是 回文串 ，只考虑字母和数字字符，可以忽略字母的大小写。
 * 本题中，将空字符串定义为有效的 回文串 。
 */

/**
 * @param {string} s
 * @return {boolean}
 */
 var isPalindrome = function(s) {
    if (s.length <= 1) {
        return true;
    }
    // 不能带括号，不然会认为过滤大小写字母和数字以及括号以外的内容
    // const list = Array.from(s.replace(/[^(A-Za-z0-9)]/g, ''));
    const list = Array.from(s.replace(/[^A-Za-z0-9]/g, ''));
    let left = 0;
    let right = list.length - 1;
    while(left < right) {
        const leftElement = list[left].toLowerCase();
        const rightElement = list[right].toLowerCase();
        if (leftElement !== rightElement) {
            return false;
        }
        left ++;
        right --;
    }
    return true;
};

//  输入: s = "A man, a plan, a canal: Panama"
//  输出: true
//  解释："amanaplanacanalpanama" 是回文串
 
//  输入: s = "race a car"
//  输出: false
//  解释："raceacar" 不是回文串

// 1 <= s.length <= 2 * 105
// 字符串 s 由 ASCII 字符组成
