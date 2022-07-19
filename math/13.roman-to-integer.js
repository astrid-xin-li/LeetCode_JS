/*
 * @lc app=leetcode id=13 lang=javascript
 *
 * [13] Roman to Integer
 */

const symbol = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000,
}

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    // 这里又个特殊点左边要是比有右边小，那么就需要 拿右边的值去减去左边的值
    Array.from(s).reduce(() => {

    }, {
        value: 0,
        
    })
};
// @lc code=end

