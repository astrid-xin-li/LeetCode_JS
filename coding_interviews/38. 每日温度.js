/**
 * [TOPIC]: 请根据每日 气温 列表 temperatures ，重新生成一个列表，要求其对应位置的输出为：要想观测到更高的气温，至少需要等待的天数。如果气温在这之后都不会升高，请在该位置用 0 来代替。
 */

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
 var dailyTemperatures = function(temperatures) {
    // 最优解决方案应该是采用 37 小行星碰撞，将 小的数作为被消除的数值
    // 下面作法是 n*（next长度）+ 逆序n 的时间复杂度
    // 观察👀气温 就是求距离当前最近大于其自身温度的 距离
    // 找到当前温度的最大值时，若大于后一个，那直接找后一个的最大值，再比较，若还大，继续向后迭代找
    // 因此需要先求出后面的温度的最大差值，依次向前递推
    const arr = [];
    const current = [];
    while(temperatures.length) {
        const element = temperatures.pop();
        if (!arr.length) {
            arr.push(0);
            current.push(element);
            continue;
        }
        let index = current.length - 1
        let previous = current[index];
        let previousDifferent = arr[index];
        if (element === previous || (previousDifferent === 0 && element > previous)) {
            // 当前已经没有更大的了，直接存即可
            arr.push(previousDifferent === 0 ? 0 : previousDifferent + 1);
            current.push(element);
            continue;
        } if (element < previous) {
            arr.push(1);
            current.push(element);
            continue;
        }
        index = index - arr[index];
        // 非常可能最后一个就是最大的
        while(index >= 0) {
            previous = current[index];
            previousDifferent = arr[index];
            if (element < previous) {
                // 当前已经没有更大的了，直接存即可
                arr.push(arr.length - index);
                break;
            }
            if (index === 0) {
                // 当前已经是最后一个了，不能继续查找了
                break;
            }
            if (element === previous || previousDifferent === 0) {
                // 当前已经没有更大的了，直接存即可
                arr.push(previousDifferent === 0 ? 0 : previousDifferent + (arr.length - index));
                break;
            }
            index = index - arr[index];
        }
        if (arr.length === current.length) {
            // 上述没有查找到比当前还大的值，直接存 0 即可
            arr.push(0);
        }
        current.push(element);
    }
    return arr.reverse();
    // let max = 0;
    // const arr = [];
    // let index = 0;
    // while(index < temperatures.length - 1) {
    //     const element = temperatures[index];
    //     let j = index + 1;
    //     while(j < temperatures.length) {
    //         const temp = temperatures[j];
    //         if (temp <= element) {
    //             j ++;
    //             continue;
    //         }
    //         break;

    //     }
    //     if (j === temperatures.length) {
    //         arr.push(0);
    //         index ++;
    //         continue;
    //     }
    //     while(arr.length < j) {
    //         const current = temperatures[arr.length];
    //         if(current >= element) {
    //             arr.push(j - arr.length);
    //         } else {
    //             break;
    //         }
    //     }
    //     index = arr.length;
    // }
    // arr.push(0);
    // return arr;
};

// 输入: temperatures = [73,74,75,71,69,72,76,73]
// 输出: [1,1,4,2,1,1,0,0]

// 输入: temperatures = [30,40,50,60]
// 输出: [1,1,1,0]

// 输入: temperatures = [30,60,90]
// 输出: [1,1,0]

//  1 <= temperatures.length <= 105
//  30 <= temperatures[i] <= 100