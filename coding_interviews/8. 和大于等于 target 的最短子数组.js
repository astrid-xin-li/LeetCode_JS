/**
 * 【TOPIC】: 给定一个含有 n 个正整数的数组和一个正整数 target 。
 * 
 * 找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。
 */


/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    // 此处要求是连续的子树， 无法排序
    // 从头遍历，找两个指针，第一个进行查找定位，第二个为最大定位，两个之间相加大于 target
    // 第一个移动，则结果剪去第一个之前的值，就能得到当前与 target差值，去确定是否往后查找
    let left = 0;
    let right = -1;
    let previewSum = 0;
    // 别用 length，非常有可能会存在所有加在一起
    let result = nums.length + 1;
    while(left < nums.length) {
        const leftValue = nums[left];
        // 要小心边界问题，left大于right，和初始化是如何自动加问题
        if (left > right) {
            right = left;
            previewSum += leftValue;
        }
        if (leftValue >= target) {
            return 1;
        }
        if (left > 0) {
            previewSum -= nums[left - 1];
            if (nums[left - 1] < 0) {
                // 需要到退回去查找，负数一去掉会变大
                let rightTemp = right > nums.length ? nums.length - 1 : right;
                let previewSumTemp = previewSum;
                while(rightTemp > left) {
                    previewSumTemp -= nums[rightTemp];
                    if (previewSumTemp >= target) {
                        right = rightTemp;
                        const min = right - left + 1;
                        previewSum = previewSumTemp;
                        result = Math.min(min, result);
                        // 可能后面还有更小的，所以需要继续查找下去
                    }
                    rightTemp --;
                }
            }
        }

        if (previewSum >= target) {
            const min = right - left + 1;
            result = Math.min(min, result);
            left ++;
            continue;
        }

        while(right + 1 < nums.length) {
            right ++;
            previewSum += nums[right];
            if (previewSum >= target) {
                const min = right - left + 1;
                result = Math.min(min, result);
                break;
            }
        }
        left ++;
    }
    return result === nums.length + 1 ? 0 : result;

};

// 输入：target = 7, nums = [2,3,1,2,4,3]
// 输出：2
// 解释：子数组 [4,3] 是该条件下的长度最小的子数组。

// 输入：target = 4, nums = [1,4,4]
// 输出：1

// 输入：target = 11, nums = [1,1,1,1,1,1,1,1]
// 输出：0

// 1 <= target <= 109
// 1 <= nums.length <= 105
// 1 <= nums[i] <= 105