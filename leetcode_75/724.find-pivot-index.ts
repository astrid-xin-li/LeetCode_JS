/*
 * @lc app=leetcode id=724 lang=typescript
 *
 * [724] Find Pivot Index
 */

// @lc code=start
function pivotIndex(numbs: number[]): number {
    if (numbs.length === 1) {
        return 0;
    }
    let leftSum = 0;
    let rightSum = numbs.reduce((value, num) => value + num, 0);
    const { length } = numbs;
    let result = -1;
    numbs.some((value, index) => {
        rightSum = rightSum - value;
        if(leftSum === rightSum) {
            result = index;
            return true;
        }
        leftSum = leftSum + value;
    })
    return result;
};
// @lc code=end

