/**
 * [TOPIC]: 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
 */

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    // 回溯，当前向下求list 为两位
    const result = [];
    const backTrack = (i, list) => {
        for (let index = i;index <= n && list.length < k; index++) {
            list.push(index);
            if (list.length < k) {
                backTrack(index + 1, list);
            }
            list.length === k && result.push(list.slice());
            list.pop();
        }
    }
    backTrack(1, [])
    return result;
};

// 输入: n = 4, k = 2
// 输出:
// [
//   [2,4],
//   [3,4],
//   [2,3],
//   [1,2],
//   [1,3],
//   [1,4],
// ]

// 输入: n = 1, k = 1
// 输出: [[1]]