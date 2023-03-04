/**
 * [TOPIC]: 给定非负整数数组 heights ，数组中的数字用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
 * 求在该柱状图中，能够勾勒出来的矩形的最大面积。
 * 
 * https://leetcode.cn/problems/0ynMMM/?envType=study-plan&id=lcof-ii&plan=lcof&plan_progress=bv0usar
 */

/**
 * @param {number[]} heights
 * @return {number}
 */
 var largestRectangleArea = function(heights) {
    let stack = [-1];
    let maxArea = 0;
    for (let i = 0; i < heights.length; i++) {
      // 当前柱子的高度小于位于栈顶的柱子的高度
      while (
        stack[stack.length - 1] != -1 &&
        heights[stack[stack.length - 1]] >= heights[i]
      ) {
        // 以栈顶的柱子为高度计算面积
        let height = heights[stack.pop()];
        let width = i - stack[stack.length - 1] - 1;
        maxArea = Math.max(maxArea, height * width);
      }
      // 当前柱子的高度大于位于栈顶的柱子的高度  入栈
      stack.push(i);
    }
    // 计算末尾
    while (stack[stack.length - 1] != -1) {
      let height = heights[stack.pop()];
      let width = heights.length - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }
    return maxArea;
    //  避免使用多维数组，导致超时
    // 采用进栈原则，当前大于前面的一个数，则进站，若当前小于前面一个数，则出栈，一直出到比当前小的位置
    // 出栈的元素 = 高 ，上一个元素位置 到当前元素位置 = 宽
    // if (!heights.length) {
    //     return 0;
    // }
    // const max = heights.length;
    // const arr = [];
    // let area = 0;
    // let index = 0;
    // do {
    //     let last = arr[arr.length - 1];
    //     const current = heights.shift();
    //     while (last?.[0] > current) {
    //         // 进行出栈， 计算当前面积
    //         const tempArea = last[0] * (index - (arr[arr.length - 2]?.[1] ?? -1) - 1);
    //         area = tempArea > area ? tempArea : area;
    //         arr.pop();
    //         last = arr[arr.length - 1];
    //     }
    //     arr.push([current, index]);
    //     index ++;
    // } while(arr.length && heights.length)

    // while (arr.length) {
    //     // 当前元素都是可以该位置一直到末尾, 且到前一个数 都能以其作为高求面积
    //     const current = arr.pop();
    //     // 若当前为最后一个元素，则需要兜底使用 -1 (-1+1 = 0 刚好为 max ，得到整个数组长度作为宽)
    //     const tempArea = current[0] * (max - (arr[arr.length - 1]?.[1] ?? -1) - 1 );
    //     area = tempArea > area ? tempArea : area;
    // }
    // return area;
};

console.log(largestRectangleArea([2,4]))

// 输入：heights = [2,1,5,6,2,3]
// 输出：10
// 解释：最大的矩形为图中红色区域，面积为 10

// 输入： heights = [2,4]
// 输出： 4
//  

// 提示：

// 1 <= heights.length <=105
// 0 <= heights[i] <= 104