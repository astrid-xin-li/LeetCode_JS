/*
 * @lc app=leetcode id=733 lang=typescript
 *
 * [733] Flood Fill
 */

// @lc code=start
function floodFill(image: number[][], sr: number, sc: number, color: number): number[][] {
    // 只有 color 与之前 value 不一样时才执行
    // 只有同 pixel 才能更改 color，在image中一个点有四个方向，但只能一个方向一个方向的走，不能全部一起深，避免死循环
    // 按照顺时针方向来，从上-右-下-左的顺序走
    const value = image[sr][sc];
    if (color === value) {
        return image;
    }
    image[sr][sc] = color;
    // 请注意，二位数组是要先确定横向一维是否存在，再去看接下来的
    const top = image[sr]?.[sc - 1];
    // 请注意，0 也认为是false ，所以不能直接去判断需呀去用类型判读
    if (typeof(top) === 'number' && top === value) {
        image = floodFill(image, sr, sc - 1, color);
    }
    const right = image[sr + 1]?.[sc];
    if (typeof(right) === 'number' && right === value) {
        image = floodFill(image, sr + 1, sc, color);
    }
    const bottom = image[sr]?.[sc + 1];
    if (typeof(bottom) === 'number' && bottom === value) {
        image = floodFill(image, sr, sc + 1, color);
    }
    const left = image[sr - 1]?.[sc];
    if (typeof(left) === 'number' && left === value) {
        image = floodFill(image, sr - 1, sc, color);
    }
    return image;
};
// @lc code=end

