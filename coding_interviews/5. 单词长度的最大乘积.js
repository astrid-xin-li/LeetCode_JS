// [TOPIC]: 给定一个字符串数组 words，请计算当两个字符串 words[i] 和 words[j] 不包含相同字符时，它们长度的乘积的最大值。假设字符串中只包含英语的小写字母。如果没有不包含相同字符的一对字符串，返回 0。


/**
 * @param {string[]} words
 * @return {number}
 */
 var maxProduct = function(words) {
    let result = 0;
    const map = new Map();
    const min = 'a'.charCodeAt();
    // 最粗暴的解决方法就是 n * n 次遍历， 从头到尾依次与后面的结果进行遍历
    for(let i = 0; i < words.length; i ++) {
        const value = words[i];
        let result = 0;
        for(let j = 0; j < value.length; j ++) {
            // 使用按位或，提取出不同元素
            result |= 1 << (value[j].charCodeAt() - min);
        }
        const length = map.get(result) ?? 0;
        map.set(result, Math.max(length, value.length));
    }
    result = 0;
    // 目前 map 里面存了 各个组合（有一样元素情况下 取最长的）的长度，此时需要进行匹配找到两个组合完全不一样
    // 使用异或，一旦相同 则 为 0 ，那么两个组合在有相同元素情况下，那么得到的异或结果一定会小于 他们两任意相加的和
    const arr = Array.from(map);
    arr.forEach(([key, value], currentIndex) => {
        for (let index = currentIndex + 1; index < arr.length; index++) {
            const [otherKey, otherValue] = arr[index];
            const different = key ^ otherKey;
            if (different >= (key + otherKey)) {
                const multi = otherValue * value;
                result = Math.max(multi, result);
            }
        }
    })
    return result;
};


// 输入: words = ["abcw","baz","foo","bar","fxyz","abcdef"]
// 输出: 16 
// 解释: 这两个单词为 "abcw", "fxyz"。它们不包含相同字符，且长度的乘积最大。

// 输入: words = ["a","ab","abc","d","cd","bcd","abcd"]
// 输出: 4 
// 解释: 这两个单词为 "ab", "cd"。

// 输入: words = ["a","aa","aaa","aaaa"]
// 输出: 0 
// 解释: 不存在这样的两个单词。

// 2 <= words.length <= 1000
// 1 <= words[i].length <= 1000
// words[i] 仅包含小写字母