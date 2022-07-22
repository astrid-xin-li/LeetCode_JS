/*
 * @lc app=leetcode id=1480 lang=typescript
 *
 * [1480] Running Sum of 1d Array
 */

// @lc code=start
function runningSum(numbs: number[]): number[] {
    let sum = 0;
    const result = numbs.map((value: number) => {
        sum = sum + value;
        return sum;
    })
    return result;
};
// @lc code=end

