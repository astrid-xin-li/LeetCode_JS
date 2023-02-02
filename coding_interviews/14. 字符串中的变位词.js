/**
 * [TOPIC]: 给定两个字符串 s1 和 s2，写一个函数来判断 s2 是否包含 s1 的某个变位词。
 * 换句话说，第一个字符串的排列之一是第二个字符串的 子串 。
 */

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    const length = s1.length;
    if (length > s2.length) {
        return false;
    }
    const elements = [];
    const numbers = [];
    // 查找出内部所有的元素并记录个数，只需要在目标字符串中匹配到有相同元素和相同 个数即可认为包含
    for (const value of s1) {
        const index = elements.indexOf(value);
        if (index > -1) {
            numbers[index] = numbers[index] + 1;
        } else {
            elements.push(value);
            numbers.push(1);
        }
    }
    // 只要 target list 为 0 数组，那就是符合目标的
    const targetList = [...numbers];
    // 用来记录还差多少个达到目标，就是全部为 0
    // 是元素宽度，不是s1长度
    let target = targetList.length;
    for(let i = 0; i < length; i ++) {
        const value = s2[i];
        const index = elements.indexOf(value);
        if (index > -1) {
            // 有就从目标中减去 1 个，如果比目标多那就为负数，继续减
            const num = targetList[index]
            targetList[index] = num - 1;
            if (targetList[index] === 0) {
                target --;
            } else if (targetList[index] < 0 && num === 0) {
                target ++;
            }
        }
    }
    let j = length;
    while(target > 0 && j < s2.length) {
        const dropElement = s2[j - length];
        const addElement = s2[j];
        let index = elements.indexOf(dropElement);
        if (index > -1) {
            // 当前剔除一个存在 s1 中的元素
            const num = targetList[index]
            targetList[index] = num + 1;
            //  注意这些边界条件
            if (targetList[index] === 0) {
                target --;
            } else if (targetList[index] === 1 && num === 0) {
                target ++;
            }
        }
        index = elements.indexOf(addElement);
        if (index > -1) {
            // 当前剔除一个存在 s1 中的元素
            const num = targetList[index]
            targetList[index] = targetList[index] - 1;
            if (targetList[index] === 0) {
                target --;
            } else if (targetList[index] === -1 && num === 0) {
                target ++;
            }
        }
        j ++;
    }

    return target > 0 ? false : true;
};


// 输入: s1 = "ab" s2 = "eidbaooo"
// 输出: True
// 解释: s2 包含 s1 的排列之一 ("ba").

// 输入: s1= "ab" s2 = "eidboaoo"
// 输出: False

// 1 <= s1.length, s2.length <= 104
// s1 和 s2 仅包含小写字母