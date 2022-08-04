/*
 * @lc app=leetcode id=704 lang=typescript
 *
 * [704] Binary Search
 */

// @lc code=start
function search(nums: number[], target: number): number {
    // 二叉树搜索，而且传递过来的是  ascending order 升序数组(升序表示没有重复的数)，直接比较左右即可
    let left = 0;
    let right = nums.length - 1;
    while(left <= right) {
        const mid = Math.round((left + right) / 2);
        const value = nums[mid];
        if (value === target) {
            return mid;
        }
        if (value > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return -1;
};
// @lc code=end

