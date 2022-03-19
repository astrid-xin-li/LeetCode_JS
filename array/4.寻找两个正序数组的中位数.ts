/*
 * @lc app=leetcode.cn id=4 lang=typescript
 *
 * [4] 寻找两个正序数组的中位数
 */



/**
 * 创建一个数组 leftMiddleContent，非有序，但是一定要保证都是比中位数 小 或者 等于。长度为 middleLength (长度为奇数 则包含中位数，长度为偶数 则求中位数平均值的最小一位)
 * 记录当前 leftMiddleContent 数组中最大一位，奇数直接返回，偶数返回需要找到剩下的 n1 和 n2 指向最小的一位求平均值
 * 
 * 首先 找到 nums1 和 nums2 的中间数，若偶数则找小的那个。
 * 相互比较大小，小的那边 一定会比中位数小，所以可以把小的那边放入 leftMiddleContent 中
 * （为什么会比中位数小，因为可以将其右边为分界线，一分为二，会发现，中间数及其左边所有个数 等于 右边数（偶），或者 等于 右边+1（奇）。
 *      而中间数对于非右边而言，只需要最大的一个数参与 middle 计算，那么比 最大数小的一定会比 middle 小，所以可以放入 leftMiddleContent中。
 *      可以思考极端情况，就是 两个传入数组的中位数 就是要求的，那么 两个中位数，在奇数情况下 一个是 middle 一个是 小于middle的数，在偶数情况下 一个是求middle的另一半，另一个是更小的数 ）
 */

// @lc code=start
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    // 两个数组的中位数，下标
    let n1 = Math.ceil(nums1.length / 2) - 1;
    let n2 = Math.ceil(nums2.length / 2) - 1;

    // 第几位是中间数，不是指下标
    const middleNumber =  Math.ceil((nums1.length + nums2.length) / 2);
    // 余数不为 0 的情况，是指就是 middleNumber 指向的数， 否则就是需要 middleNumber 再加上后面一位数的 平均值
    const remainder = (nums1.length + nums2.length) % 2;
    // 中间数及其左边的内容
    const leftMiddleContent = [];
    // leftMiddleContent 数组中最大数，就是未来的 middleNumber
    let leftMiddleContentNumber;


    while(leftMiddleContent.length < middleNumber && nums1[n1] !== undefined && nums2[n2] !== undefined) {
        if (nums1[n1] >= nums2[n2]) {
            // a1 大于 b1  可以确定 对于中间数而言 b0 - b1 一定是左边的, 所以就要删除 b0-b1 放到 leftMiddleContent
            const b1 = nums2[n2];
            const deleteList = nums2.splice(0, n2 + 1);
            n2 = 0;
            leftMiddleContent.push(...deleteList);
            if (!leftMiddleContentNumber || leftMiddleContentNumber < b1) {
                // 当前的 b1 比 leftMiddleContentNumber 大，就替换，或者 leftMiddleContentNumber 不存在，就替换
                leftMiddleContentNumber = b1;
            }
            n1 = n1 - 1;
            if (n1 < 0 && nums1.length >0) {
                n1 = 0;
            }
        } else if (nums1[n1] < nums2[n2]) {
             // b1 大于 a1  可以确定 对于中间数而言 a0 - a1 一定是左边的
            const a1 = nums1[n1];
            const deleteList = nums1.splice(0, n1 + 1);
            n1 = 0;
            leftMiddleContent.push(...deleteList);
            if (!leftMiddleContentNumber || leftMiddleContentNumber < a1) {
                // 当前的 b1 比 leftMiddleContentNumber 大，就替换，或者 leftMiddleContentNumber 不存在，就替换
                leftMiddleContentNumber = a1;
            }
            n2 = n2 - 1;
            if (n2 < 0 && nums2.length >0) {
                n2 = 0;
            }
        }

    }

    // 当前获取的 数不够的到 middle，那么代表有一个数组已经为空了，所以，直接把非空的数组进行截断补全 leftMiddleContent 即可
    if (leftMiddleContent.length < middleNumber) {
        const temp = nums1[n1] !==  undefined ? nums1 : nums2;
        const p = nums1[n1] !==  undefined ? 1 : 0;
        // 如果 leftMiddleContent.length 小于 middleNumber，就是说 需要 temp 补全，把 temp 的剩余部分放到 leftMiddleContent
        const difference = middleNumber - leftMiddleContent.length;
        const max = temp[difference - 1];
        leftMiddleContent.push(...temp.splice(0, difference));
        if (p) {
            n1 = 0;
        } else {
            n2 = 0;
        }
        if (!leftMiddleContentNumber || max > leftMiddleContentNumber) {
            leftMiddleContentNumber = max;
        }
    }

    if (remainder !== 0) {
        // 奇数，直接返回 leftMiddleContentNumber（不要用 === 1，因为可能是 -1  呢）
        return leftMiddleContentNumber;
    }

    if (nums1[n1] ===  undefined) {
        return (leftMiddleContentNumber + nums2[n2]) / 2;
    } else if (nums2[n2] === undefined) {
        return (leftMiddleContentNumber + nums1[n1]) / 2;
    } else {
        // 一定要注意是要找 小的，因为参与 middle 计算的应该是 比leftMiddleContentNumber大一点的数
        return (leftMiddleContentNumber + Math.min(nums1[n1], nums2[n2])) / 2;
    }
};
// @lc code=end
