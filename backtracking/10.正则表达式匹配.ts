/*
 * @lc app=leetcode.cn id=10 lang=typescript
 *
 * [10] 正则表达式匹配
 */

// @lc code=start
function isMatch(s: string, p: string): boolean {
    if (p.length === 0) {
        return s.length === 0;
    }
    const pSplitList = p.split('*');
    let index = 0;
    let repeatWord = '';
    let repeatWordLen = 0;
    let result = true;
    pSplitList.some((targeList, i) => {
        if (repeatWord !== '') {
            let j = index;
            do {

            } while()
        }
        const targeListLen = targeList.length;
        let j = 0;
        while(j < targeListLen) {
            const target = targeList[j];
            if (j === targeListLen - 1) {
                const nowRepeatWord = s[index - 1];
                j ++;
                if (nowRepeatWord !== s[index]) {
                    continue;
                } else {
                    repeatWord = nowRepeatWord;
                    repeatWordLen = 1;
                    const nextTargetList = pSplitList[i + 1];
                    if (nextTargetList[0] !== repeatWord) {
                        // 重复字段都是这个 * 所匹配的,需要index去指向下一个不是 repeatWord的
                        index ++;
                        while(s[index] === repeatWord) {
                            repeatWordLen ++;
                            index ++;
                        }
                        repeatWord = '';
                        repeatWordLen = 0;
                        continue;
                    } else {
                        let nextRepeatIndex = 0;
                        let sIndex = index + 1;
                        let nextRepeat =  false;
                        while(nextTargetList[nextRepeatIndex] === repeatWord && nextRepeatIndex < nextTargetList.length) {
                            nextRepeatIndex ++;
                            if (nextRepeatIndex === nextTargetList.length) {
                                nextRepeat = true;
                            }
                        }
                        while(s[sIndex] === repeatWord) {
                            sIndex ++;
                            repeatWordLen ++;
                        }
                        if (repeatWordLen < nextRepeatIndex) {
                            if (repeatWordLen === nextRepeatIndex - 1 || (repeatWordLen === nextRepeatIndex - 2 && nextRepeat)) {
                                break;
                            } else {
                                result = false;
                                return false;
                            }
                        }
                    }
                }
            }
            if (target === '.') {
                j ++;
                index++;
                continue;
            }
            if (s[index] !== target) {
                result = false;
                return false;
            }
            targeListLen--;
            j ++;
            index++;
        }
    })
    return result;
};
// @lc code=end

1、根据 * 进行拆分成多个字段
2、匹配每个字段的前len-2 个字符是否匹配，不匹配则返回false
3、找到 len-1 的字符，看对应的字符是否匹配
4、不匹配，则忽略 len-1  的字符，直接进入下一个字符的循环匹配 第2步
5、匹配，则找s中连续的几个匹配。然后查下一个p字段的开头，是否有与 len-1 匹配的字符看有几个，是否能对的上，能得话进入 2

interface IRepeat {
    isNext: boolean;
    sIndex: number;
}

/**
 * 获取在下一个匹配中有 repeatWord, repeatWord 不能是 .
 * 获取在接下来的s中有 多少个连续的 repeatWord
 * @param repeatWord 
 * @param nextTargetList 
 * @param s 
 * @param index 
 * @returns 
 */
function getRepeat(repeatWord: string, nextTargetList: string, s: string, index: number): IRepeat {
    let nextRepeatIndex = 0;
    let sIndex = index + 1;
    let nextTargetRepeat =  false;
    let repeatWordLen = 1;
    let result = true;
    while(nextTargetList[nextRepeatIndex] === repeatWord && nextRepeatIndex < nextTargetList.length) {
        nextRepeatIndex ++;
        if (nextRepeatIndex === nextTargetList.length) {
            nextTargetRepeat = true;
        }
    }
    while(s[sIndex] === repeatWord) {
        sIndex ++;
        repeatWordLen ++;
    }
    if (repeatWordLen < nextRepeatIndex) {
        // 重复的内容比接下来的字符少
        // 如果最后一个也是 repeatWord，则可以可以少一个, 否则不行就是匹配不上
        if (repeatWordLen === nextRepeatIndex - 1 && nextTargetRepeat) {
            sIndex = index;
        } else {
            result = false;
        }
    } else if (repeatWordLen > nextRepeatIndex) {
        sIndex = index + repeatWordLen - nextRepeatIndex - 1;
        if (nextTargetRepeat) {
            // 下一个是完全重复的，那么当前直接指定最开始的那个就行了
            sIndex = index;
        }
        result = true;
    } else {
        sIndex = index + 1;
        result = true;
    }

    return {
        isNext: result,
        sIndex,
    }
}

function match(s: string, p: string): boolean {
    if (p.length === 0) {
        return s.length === 0;
    }
    const pSplitList = p.split('*');
    let sIndex = 0;
    let result = false;

    pSplitList.some((targetList, i) => {
        // 当前匹配为空，则直接进入下一个
        if (targetList.length === 0) {
            return false;
        }
        for (let j = 0; j < targetList.length; j++) {
            // 当前最后一个字符
            if (j === targetList.length) {
                // 后面是否还有其他的 targetlist，没有则表示无匹配
                if (i === pSplitList.length - 1) {
                    if (s[sIndex] === targetList[j]) {
                        sIndex ++;
                        result = true;
                    }
                    return true;
                }
                // 后面还有其他的 targetlist，则看是否有下一个匹配
                if (targetList[j] !== '.') {
                    const repeatWord = targetList[j];
                    const {sIndex: index, isNext} = getRepeat(repeatWord, pSplitList[i + 1], s, sIndex)
                    if (isNext) {
                        result = false;
                        return true;
                    }
                }
                // 当前是否为字符 . 是的话可以任意匹配，需要查找 nextTargetList的


            }
        }
    })

    return s.length >= sIndex && result;
}