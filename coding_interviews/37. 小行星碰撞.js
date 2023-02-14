/**
 * [TOPIC]: 给定一个整数数组 asteroids，表示在同一行的小行星。
 * 对于数组中的每一个元素，其绝对值表示小行星的大小，正负表示小行星的移动方向（正表示向右移动，负表示向左移动）。每一颗小行星以相同的速度移动。
 * 找出碰撞后剩下的所有小行星。碰撞规则：两个行星相互碰撞，较小的行星会爆炸。如果两颗行星大小相同，则两颗行星都会爆炸。两颗移动方向相同的行星，永远不会发生碰撞。
 */

/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
 var asteroidCollision = function(asteroids) {
    // 看下述表现是，向右后出现向左 就会相撞，向左后出现向右 就会无事
    // 相当于 正数 后面 存在 负数 机会相撞，所以只需要记录正数即可
    // 相撞时，会看当前与最近一个大小，若当前大，就继续向前比较，直到 同符号/ 被比较的大时才行
    const arr = [];
    for (let index = 0; index < asteroids.length; index++) {
        const element = asteroids[index];
        if (element < 0) {
            // 当前存在 正数 就碰撞
            let isOver = false;
            while(arr.length) {
                const left = arr.pop();
                if (left < 0) {
                    // 当前是同符号的了，前面不会产生碰撞了，直接结束即可
                    arr.push(left);
                    break;
                }
                if (left > -element) {
                    // 当前销毁， 此元素可以继续放入
                    isOver = true;
                    arr.push(left);
                    break;
                } else if (left === -element) {
                    // 两个元素都销毁，跳出碰撞
                    isOver = true;
                    break;
                }
                // 继续向下碰撞, 直到上述两种情况截止，或者所有元素被碰撞完
            }
            if(!isOver) {
                arr.push(element);
            }
            continue;
        }
        if (element > 0) {
            arr.push(element);
        }
    }
    return arr;
};

// 输入：asteroids = [5,10,-5]
// 输出：[5,10]
// 解释：10 和 -5 碰撞后只剩下 10 。 5 和 10 永远不会发生碰撞。

// 输入：asteroids = [8,-8]
// 输出：[]
// 解释：8 和 -8 碰撞后，两者都发生爆炸。

// 输入：asteroids = [10,2,-5]
// 输出：[10]
// 解释：2 和 -5 发生碰撞后剩下 -5 。10 和 -5 发生碰撞后剩下 10 。

// 输入：asteroids = [-2,-1,1,2]
// 输出：[-2,-1,1,2]
// 解释：-2 和 -1 向左移动，而 1 和 2 向右移动。 由于移动方向相同的行星不会发生碰撞，所以最终没有行星发生碰撞。 


// 2 <= asteroids.length <= 104
// -1000 <= asteroids[i] <= 1000
// asteroids[i] != 0