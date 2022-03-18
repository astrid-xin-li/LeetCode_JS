/*
 * @lc app=leetcode.cn id=88 lang=typescript
 *
 * [88] 合并两个有序数组
 * o(m + n) 时间复杂度
 */

// @lc code=start
/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let n1 = 0;
    let n2 = 0;
    if (nums1.length !== m) {
        nums1.splice(m, nums1.length - m);
    }
    if (nums2.length !== n) {
        nums2.splice(n, nums2.length - n);
    }
    const length = nums1.length + nums2.length;

    while (n1 < nums1.length && n2 < nums2.length) {
        const result1 = nums1[n1];
        const result2 = nums2[n2];
        if (result1 >= result2) {
            nums1.splice(n1, 0, result2);
            n2 ++;
            n1 ++;
        } else if (result1 < result2) {
            n1 ++;
        }
    }
    // 重点是这个 小于等于中的 等于，因为上述循环中，如果 result1 >= result2 会添加nums2的元素，并且 n2 ++了，所以 n2 指向的元素永远不会再 nums1 中
    if (n2 <= nums2.length - 1 && nums1.length < length) {
        const difference = nums2.splice(n2, nums2.length - n2);
        nums1.push(...difference);
    }

};
// @lc code=end
