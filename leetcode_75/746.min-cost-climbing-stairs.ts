/*
 * @lc app=leetcode id=746 lang=typescript
 *
 * [746] Min Cost Climbing Stairs
 */

// @lc code=start
function minCostClimbingStairs(cost: number[]): number {
    // 可以从0 开始也可以从 1 开始，每次只能 1 or 2 个台阶。cost[i]为需要此台阶花费
    const { length } = cost;
    const dynamicProgrammingMinCost: Map<number, number> = new Map();
    const costClimbingStairs = (index: number): number => {
        // 当前用于从 index 为起点 计算花费 2 步 还是 1 步抵达终点更小
        if (dynamicProgrammingMinCost.has(index)) {
            return dynamicProgrammingMinCost.get(index) ?? 0;
        }
        if (index === length || index === length + 1) {
            // 抵达终点
            return 0;
        }
        const two = costClimbingStairs(index + 2);
        const one = costClimbingStairs(index + 1);
        // index 从 -1 开始需要有兜底
        const values = Math.min(two, one) + (cost[index] ?? 0);
        dynamicProgrammingMinCost.set(index, values);
        return values;
    };
    return costClimbingStairs(-1);
};
// @lc code=end

