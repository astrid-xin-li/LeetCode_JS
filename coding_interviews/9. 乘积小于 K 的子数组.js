// [TOPIC]: 给定一个正整数数组 nums和整数 k ，请找出该数组内乘积小于 k 的连续的子数组的个数。


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function(nums, k) {
    // 连续乘法，双指针问题
    let left = 0;
    let right = -1;
    let multi = 1;
    let result = 0;
    let previewTemp = 0;
    while(left < nums.length) {
        const value = nums[left];
        if (value < k) {
            result ++;
        }
        if (left > right) {
            multi *= value;
            right = left;
        }
        if (left > 0) {
            multi /= nums[left - 1];
        }
        if (multi < k && previewTemp) {
            // 说明上一轮的计算直接可以往下复用； 去掉 1 是因为此层比上层少一位，少一种组合情况
            previewTemp -= 1;
            result += previewTemp;
        }
        while(right + 1 < nums.length) {
            const newValue = nums[right + 1];
            const temp = multi * newValue;
            if (temp >= k) {
                break;
            }
            result ++;
            right ++;
            previewTemp ++;
            multi = temp;
        }
        left ++;
    }
    return result;
};

// 输入: nums = [10,5,2,6], k = 100
// 输出: 8
// 解释: 8 个乘积小于 100 的子数组分别为: [10], [5], [2], [6], [10,5], [5,2], [2,6], [5,2,6]。
// 需要注意的是 [10,5,2] 并不是乘积小于100的子数组。

// 输入: nums = [1,2,3], k = 0
// 输出: 0

// 1 <= nums.length <= 3 * 104
// 1 <= nums[i] <= 1000
// 0 <= k <= 106
