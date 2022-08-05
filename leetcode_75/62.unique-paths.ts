/*
 * @lc app=leetcode id=62 lang=typescript
 *
 * [62] Unique Paths
 */

// @lc code=start
function uniquePaths(m: number, n: number): number {
    // 当前需要在给定的长方形（m*n）中，从（0，0）走到（m-1，n-1），只能往右和下走
    // 以列为目标选择，一层一层的递归查找下去，计算过的要存储——dp
    const stateMap: Map<string, number> = new Map();
    stateMap.set('1,1', 1);

    const dynamicProgramming = (x: number, y: number): number => {
        if (x < 1 || y < 1) {
            return 0;
        }
        if (x === 1 || y === 1) {
            return 1;
        }
        const key = `${x},${y}`;
        if (!stateMap.get(key)) {
            const value = dynamicProgramming(x - 1, y) + dynamicProgramming(x, y - 1);
            stateMap.set(key, value);
            return value;
        }
        return stateMap.get(key) ?? 0;
    };

    return dynamicProgramming(m, n);
};
// @lc code=end

