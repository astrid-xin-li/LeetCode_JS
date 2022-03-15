/*
 * @lc app=leetcode.cn id=1 lang=typescript
 *
 * [1] 两数之和
 */

// @lc code=start
function twoSum(nums: number[], target: number): number[] {
    let result: number[] = [];
    nums.some((value: number, index: number) => {
        const different = target - value;
        const i = nums.indexOf(different);
        if (i !== -1 && i !== index) {
            result = [index, i];
            return true;
        }
        return false;
    });
    return result;
};
// @lc code=end

