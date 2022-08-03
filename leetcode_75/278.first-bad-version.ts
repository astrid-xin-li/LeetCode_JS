/*
 * @lc app=leetcode id=278 lang=typescript
 *
 * [278] First Bad Version
 */

// @lc code=start
/**
 * The knows API is defined in the parent class Relation.
 * isBadVersion(version: number): boolean {
 *     ...
 * };
 */

var solution = function(isBadVersion: any) {
    // 查找坏 version，依赖坏的开发得到的也是坏的，这里快速做法应该是二分查找，当匹配到前一个好后一个坏则认为坏的就是目标
    return function(n: number): number {
        let left = 1;
        let right = n;
        while (left < right) {
            const mid = Math.round((right + left) / 2);
            const result = isBadVersion(mid);
            if (!result) {
                // 中间这个是好的，需要向右查
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        // 查找第一个出错点——需要注意在查找的最后跳出循环时可能当前指向时好的，那么就需要找旁边的那个坏的
        if (!isBadVersion(left)) {
            return left + 1;
        }
        return left;
    };
};
// @lc code=end

