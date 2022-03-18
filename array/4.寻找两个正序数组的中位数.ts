/*
 * @lc app=leetcode.cn id=4 lang=typescript
 *
 * [4] 寻找两个正序数组的中位数
 */

// @lc code=start
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    // 两个数组的中位数
    if (nums1.length === 0) {
        return nums2.length % 2 === 0 ? (nums2[Math.floor(nums2.length / 2)] + nums2[Math.floor(nums2.length / 2) - 1]) / 2 : nums2[Math.floor(nums2.length / 2)];
    }
    if (nums2.length === 0) {
        return nums1.length % 2 === 0 ? (nums1[Math.floor(nums1.length / 2)] + nums1[Math.floor(nums1.length / 2) - 1]) / 2 : nums1[Math.floor(nums1.length / 2)];
    }

    const index = Math.floor((nums1.length + nums2.length) / 2) - 1;
    const difference = (nums1.length + nums2.length) % 2;
    let n2 = 0;
    let n1 = 0;
    const result = [];
    
    while (result.length < (index + difference)) {
        if (nums1[n1] < nums2[n2]) {
            if (n1 < nums1.length) {
                n1++;
                result.push(nums2[n2])
            } else {
                n2 = (index + difference) - n1;
            }
        } else if (nums1[n1] > nums2[n2]) {
            if (n2 < nums2.length) {
                n2++;
            } else {
                n1 = (index + difference) - n2;
            }
        } else if (nums1[n1] === nums2[n2]) {
            if (n1 < nums1.length) {
                n1++;
            } else {
                n2 ++;
            }
        }
    }

    if (difference !== 0) {
        return nums1[n1] < nums2[n2] ? nums1[n1] : nums2[n2];
    }

    return ( nums1[n1] + nums2[n2] ) / 2;
};
// @lc code=end


/**
 * 正序数组中位数，第一想法
 */
