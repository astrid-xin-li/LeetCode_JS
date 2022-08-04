/*
 * @lc app=leetcode id=200 lang=typescript
 *
 * [200] Number of Islands
 */

// @lc code=start
function numIslands(grid: string[][]): number {
    // 找岛，岛是四面环海，即上下左右是 0
    // 有两点，一个是找到了需要标记，另外一个是统计有几个标记区域
    const mark: string[] = [];
    const water = '0';
    const land = '1';
    const direction = (x, y): number[][] => ([
        [x, y - 1],
        [x + 1, y],
        [x, y + 1],
        [x - 1, y],
    ]);
    const depthFirstSearch = (markPoint: string, geography: string[][], x: number, y: number): string[][] => {
        // 从上右下做开始依次搜索
        geography[x][y] = markPoint;
        const fourDirections = direction(x,y);
        fourDirections.map(([i, j]) => {
            const oneDirectionValue = geography[i]?.[j];
            if (typeof(oneDirectionValue) === "string" && oneDirectionValue === land) {
                // 当前存在的情况下，需要不能被其他岛屿标记，并且也不是水
                geography = depthFirstSearch(markPoint, geography, i, j);
            }
        })
        return geography;
    }

    // 找到一个非海，就需要进行深度查找把整体找到并标记出来
    let geography = [...grid];
    let flag = '@';
    grid.map((horizontally, gridI) => {
        horizontally.map((_vertically, gridJ) => {
            const value = geography[gridI][gridJ];
            if (!mark.includes(value) && water !== value) {
                // 当前为未标记的陆地，需要查找范围
                geography = [ ...depthFirstSearch(flag, geography, gridI, gridJ)];
                mark.push(flag);
                // 千万不要用 flag = `${flag}${flag}`; 太长了，指数增长，会出现栈溢出的
                flag = `${flag}1`;
            }
        })
    })
    return mark.length;
};
// @lc code=end

