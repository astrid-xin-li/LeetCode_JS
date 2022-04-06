/*
 * @lc app=leetcode.cn id=11 lang=typescript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
function maxArea(height: number[]): number {
    let max = 0;
    const arr = [];
    height.map((item, index) => {
        height.map((item2, index2) => {
            if ((item2 > item) || (item2 === item && index2 > index)) {
                const area = Math.abs(index2 - index) * item;
                if (area > max) {
                    max = area;
                }
            }
        })
    });
    return max;
};
// @lc code=end

