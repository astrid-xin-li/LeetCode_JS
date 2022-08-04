/*
 * @lc app=leetcode id=70 lang=typescript
 *
 * [70] Climbing Stairs
 */

// @lc code=start
function climbStairs(n: number): number {
    // 从1爬到n，每次可以climb 1 or 2, how many distinct way?
    // dp —— dynamic programming， 让大问题化解为小问题，使用递归一步一步化简
    // 1，5， 11 三种面值，求出 15 需要最少个数纸币
    // 用 11，f(15) = f(11) + f(4) = f(11) + f(1) + f(3) = ... = 1 + 4 = 5
    // 用 5，f(15) = f(5) + f(10) = 3
    // 用 1，f(15) = f(1) + f(14) = 5

    // 请注意！要存储之前计算过的结果，不然会会超时！
    const stateMap: Map<number, number> = new Map();
    const dynamicProgramming = (param: number): number => {
        if (param <= 2) {
            return param;
        }
        const one = param - 1;
        const two = param - 2;
        if (!stateMap.get(one)) {
            const result = dynamicProgramming(one);
            stateMap.set(one, result);
        }
        if (!stateMap.get(two)) {
            const result = dynamicProgramming(two);
            stateMap.set(two, result);
        }
        return (stateMap.get(one) ?? 0) + (stateMap.get(two) ?? 0);
    };
    return dynamicProgramming(n);
};
// @lc code=end

