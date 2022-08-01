/*
 * @lc app=leetcode id=392 lang=typescript
 *
 * [392] Is Subsequence
 */

// @lc code=start
function isSubsequence(s: string, t: string): boolean {
    // 判断当前s字符串类型是否包含在 t字符串中
    if (s.length > t.length) {
        return false;
    }
    if (s.length === t.length) {
        return s === t;
    }
    const parentArray = Array.from(t);
    const childArray = Array.from(s);
    const parentLen = parentArray.length;
    const childLen = childArray.length;
    let i = 0;
    const value = parentArray.every((value, index) => {
        if ((parentLen - index) < (childLen - i)) {
            // 长度小于子项时一定不会再包裹了
            return false;
        }
        if (value === childArray[i]) {
            i ++;
        }
        if (i === childLen) {
            // 目前为止已经得到包裹子项，直接结束遍历
            return false;
        }
        return true;
    })
    return i === childLen;
};
// @lc code=end

