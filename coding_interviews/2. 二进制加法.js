// [TOPIC]: 给定两个 01 字符串 a 和 b ，请计算它们的和，并以二进制字符串的形式输出。
// 输入为 非空 字符串且只包含数字 1 和 0。


/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    // 从最后一位开始向前依次累加，两位加在一起为2就向前进 1 位
    let carry = 0;
    const maxString = a.length > b.length ? a : b;
    const minString = a.length > b.length ? b : a;
    const result = new Array(maxString.length);

    let resultIndex = 0;
    while(resultIndex < maxString.length) {
        const min = resultIndex < minString.length ? Number.parseInt(minString[minString.length - resultIndex - 1]) : 0;
        let temp = Number.parseInt(maxString[maxString.length - resultIndex - 1])
            + min
            + carry;
        if (temp >= 2) {
            carry = 1;
            temp %= 2;
        } else {
            carry = 0;
        }
        result[resultIndex] = temp;
        resultIndex ++;
    }
    if (carry) {
        result[resultIndex] = 1;
    }
    return result.reduceRight((value, current) => value + current, '');
};


// 输入: a = "11", b = "10"
// 输出: "101"
// 输入: a = "1010", b = "1011"
// 输出: "10101"

// 每个字符串仅由字符 '0' 或 '1' 组成。
// 1 <= a.length, b.length <= 10^4
// 字符串如果不是 "0" ，就都不含前导零。