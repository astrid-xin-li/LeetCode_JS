/*
 * @lc app=leetcode id=438 lang=typescript
 *
 * [438] Find All Anagrams in a String
 */

// @lc code=start
function findAnagrams(s: string, p: string): number[] {
    const parent = Array.from(s);
    const anagram = Array.from(p);
    if (anagram.length > parent.length) {
        return [];
    }
    if (anagram.length === parent.length) {
        return p === s ? [0] : [];
    }
    const compare = (first: number, last: number): number => {
        // 给 anagram 创建一个对应的是否匹配上的占位数组，未匹配都是 0, 匹配都是 1
        const flag: number[] = Array(anagram.length).fill(0);
        let i = first;
        while (i < last) {
            const aim = parent[i];
            let j = anagram.indexOf(aim);
            if (j === -1) {
                // 匹配失败直接返回
                return i;
            }
            while (flag[j]) {
                // 当前已经被占位 需呀向下找到没有被占位的
                j = anagram.indexOf(aim, j + 1);
                if (j >= anagram.length || j === -1) {
                    return i;
                }
            }
            flag[j] = 1;
            i = i + 1;
        }
        return -1;
    };
    const result: number[] = [];
    let index = 0;
    const different = parent.length - anagram.length + 1;
    while (index < different) {
        if (anagram.includes(parent[index])) {
            // 当前为起点需要查找 anagram.length 个parent letter是否刚刚好符合
            const isSame = compare(index, index + anagram.length);
            if (isSame === -1) {
                result.push(index);
            }
        }
        index = index + 1;
    }
    return result;
};
// @lc code=end

