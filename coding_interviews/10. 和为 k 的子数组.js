/**
 * [TOPIC]: 给定一个整数数组和一个整数 k ，请找到该数组中和为 k 的连续子数组的个数。
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    // 目标为 k，那么就是 找两个指针分别记录 开始求和起点 和最终一个大于等于 k 的终点两个位置
    // 当发现大于 k 了，left 先向左移动，移动到 小于等于 k
    // 当发现 小于 k 了，right 先向右移动，移动到 大于等于 k
    let result = 0;
    let left = 0;
    let sum = 0;
    for (let index = 0; index < nums.length; index++) {
        const element = nums[index];
        sum += element;
        if (sum === k) {
            result += 1;
            continue;
        }
        if (sum < k) {
            // 继续向下加
            continue;
        }
        while (left <= index && sum > k) {
            // 需要一直向前减，直到发现减到当前还是大于，就再往下找
            const pre = nums[left];
            sum -= pre;
            if (sum === k && left !== index) {
                // 要注意是求和，若当前已经全部元素减完了才发现符合目标是不记录到
                result += 1;
            }
            left ++;
        }
    }
    return result;
};

// 输入:nums = [1,1,1], k = 2
// 输出: 2
// 解释: 此题 [1,1] 与 [1,1] 为两种不同的情况

// 输入:nums = [1,2,3], k = 3
// 输出: 2

// 1 <= nums.length <= 2 * 104
// -1000 <= nums[i] <= 1000
// -107 <= k <= 107