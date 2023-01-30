// [TOPIC]: 给你一个整数数组 nums ，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次 。请你找出并返回那个只出现了一次的元素。



/**
 * @param {number[]} nums
 * @return {number}
 */
 var singleNumber = function(nums) {
    // 异或运算符 可以使得偶数位 数之间为0 a^a = 0
    const thirdList = new Map();
    const secondList = new Map();
    while(nums.length) {
        const temp = nums.pop();
        if (secondList.has(temp)) {
            secondList.delete(temp);
            // 等待第三个重复数
            thirdList.set(temp, 0);
        } else if (thirdList.has(temp)) {
            // 每个数只重复三次，已经查询到了，直接删除即可
            thirdList.delete(temp);
        } else {
            // 等待第二个重复数进行匹配
            secondList.set(temp, 0);
        }
    }
    let result = 0;
    secondList.forEach((value, key) => {
        result = key;
    })
    return result;
};


// 输入：nums = [2,2,3,2]
// 输出：3
// 输入：nums = [0,1,0,1,0,1,100]
// 输出：100

// 1 <= nums.length <= 3 * 104
// -231 <= nums[i] <= 231 - 1
// nums 中，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次