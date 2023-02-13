/**
 * [TOPIC]: 给定一个字符串数组 strs ，将 变位词 组合在一起。 可以按任意顺序返回结果列表。
 * 
 * 注意：若两个字符串中每个字符出现的次数都相同，则称它们互为变位词。
 */

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    // === 不能用 ｜，这个是求变位词，要考虑长度，要考虑相同个数，不单单是非一样元素
    // 如何查找字符串中不同字母有哪些，使用 掩码
    // 掩码，是将每个字母按照进行排列顺序后，当出现此字母时 将 1 左移动 i顺序位，然后与之前结果进行 按位或 运算
    // 这样，当已经存在进行或运算也不会丢失，而不存在则会将 二进制 第i位变成1
    // 且由于都是 按照 1<<i，，都是 2 的指数倍，不会存在两个字符串不相同但因缘巧合变成一样的情况。
    // 用一个 map 根据字符串掩码 进行存储对应数组
    const map = new Map();
    // 默认最小为 a
    const min = 'a'.charCodeAt();
    strs.map((value) => {
        let element = 0;
        const sum = Array.from(value).reduce((result, val) => {
            // 注意 只有 31 位，需要这个左移动 只能差 31 位
            const different = (1 << (val.charCodeAt() - min));
            element = element | different;
            return result += different;
        }, 0);
        const key = `${sum}-${value.length}-${element}`;
        const valueList = map.get(key) ?? [];
        map.set(key, valueList.concat(value));
    })
    const result = [];
    map.forEach((value) => {
        result.push(value);
    })
    return result;
};

// 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
// 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]

// 输入: strs = [""]
// 输出: [[""]]

// 输入: strs = ["a"]
// 输出: [["a"]]

// 1 <= strs.length <= 104
// 0 <= strs[i].length <= 100
// strs[i] 仅包含小写字母