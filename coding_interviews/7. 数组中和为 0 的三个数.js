/**
 * [TOPIC]: 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。
 * 
 * 请你返回所有和为 0 且不重复的三元组。
 * 注意：答案中不可以包含重复的三元组。
 */

/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number[][]}
 */
var twoSum = function(arr, target) {
    // 当前传入一个非降序数组, 求任意两个元素之和为 target
    // 使用二分查找
    let left = 0;
    let right = arr.length - 1;
    const result = [];
    while(left < right) {
        const min = arr[left];
        const max = arr[right];
        const sum =  min + max;
        if (sum === target) {
            // 当发现有符合目标的就记录，最小位向前一个
            result.push([min, max]);
            while(arr[left] === arr[left + 1]) {
                left ++;
            }
            left ++;
        } else if (sum > target) {
            // 当前结果过大了，向下一位查找
            right --;
        } else {
            // 当前结果小了
            left ++;
        }

    }
    return result;
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    // 排序从小到大依次挨个找相关的另外两个数与当前数求和为0，排序后可以用二分查找方法
    const arr = nums.sort((a,b) => a-b);
    let result = [];
    const dropList = [];
    for (let index = arr.length - 1; index >= 0; index--) {
        const element = arr.pop();
        if (dropList.includes(element)) {
            // 当前元素已经查找过了，跳过，不记录相同元素
            continue;
        }
        dropList.push(element);
        const different = 0 - element;
        const temp = twoSum(arr, different)
            .map((value) => [element].concat(value));
        result = result.concat(temp);
    }
    return result;
};


// 输入：nums = [-1,0,1,2,-1,-4]
// 输出：[[-1,-1,2],[-1,0,1]]
// 解释：
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
// 不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
// 注意，输出的顺序和三元组的顺序并不重要。

// 输入：nums = [0,1,1]
// 输出：[]
// 解释：唯一可能的三元组和不为 0 。

// 输入：nums = [0,0,0]
// 输出：[[0,0,0]]
// 解释：唯一可能的三元组和为 0 。

// 3 <= nums.length <= 3000
// -105 <= nums[i] <= 105