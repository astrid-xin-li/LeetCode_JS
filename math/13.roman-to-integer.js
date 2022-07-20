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
    const arr = Array.from(s);
    // 这里又个特殊点左边要是比有右边小，那么就需要 拿右边的值去减去左边的值
    const {value: num} = arr.reduceRight(({value, keyName}, name) => {
        if (!symbol[name]) {
            // 用户传入的内容有些问题，直接跳过这个
            return {
                value,
                keyName,
            }
        }
        let num = symbol[name] + value;
        if (symbol[keyName] && symbol[keyName] > symbol[name]) {
            // 当前是右边有内容，需要去比较一下，是否小于右侧
            num = value - symbol[name];
        }
        return {
            keyName: name,
            value: num,
        }
        
    }, {
        value: 0,
        keyName: '',
    })
    return num;
};
// @lc code=end

