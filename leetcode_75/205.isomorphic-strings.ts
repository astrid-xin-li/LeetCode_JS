/*
 * @lc app=leetcode id=205 lang=typescript
 *
 * [205] Isomorphic Strings
 */
// @lc code=start
function isIsomorphic(s: string, t: string): boolean {
    const equar = (a: number[], b: number[]) => {
        if (a.length !== b.length) {
            return false;
        }
        if (a.length === 0) {
            return true;
        }
        const tempA = a.pop();
        const tempB = b.pop();
        if (tempA !== tempB) {
            return false;
        }
        return equar(a,b);
    }
    // 用一个 map 去存储各个 字母在单词中的对应位置。通过匹配是否有相同的位置去判断是否同源
    const sAlphabetMap =  new Map<string, Array<number>>();
    const tAlphabetMap =  new Map<string, Array<number>>();
    const sList = Array.from(s);
    const tList = Array.from(t);
    const result = sList.every((value, index) => {
        const temp = tList[index];
        sAlphabetMap.set(value, [...sAlphabetMap.get(value) ?? [], index])
        tAlphabetMap.set(temp, [...tAlphabetMap.get(temp) ?? [], index])
        const tResult = tAlphabetMap.get(temp) ?? [];
        const sResult = sAlphabetMap.get(value) ?? [];
        // 单纯有序的数组可以用转换成字符串进行匹配
        // const isEqual = tResult?.toString() === sResult?.toString();
        if (!equar([...tResult], [...sResult])) {
            return false;
        }
        return true;
    })
    return result
};
// @lc code=end

