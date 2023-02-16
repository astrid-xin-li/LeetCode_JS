// [TOPIC]: 给定两个整数 a 和 b ，求它们的除法的商 a/b ，要求不得使用乘号 '*'、除号 '/' 以及求余符号 '%' 。

/**
 * [TIPS]:
 * 整数除法的结果应当截去（truncate）其小数部分，例如：truncate(8.345) = 8 以及 truncate(-2.7335) = -2
 * 假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−2^31, 2^31−1]。本题中，如果除法结果溢出，则返回 2^31 − 1
 */

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var divide = function(a, b) {
    if (a === b) {
        return 1;
    }
    // 此题由于明确指出是 32 位，所以需要先考虑边界溢出问题
    // 32 位 是指 32 位整数，而是在求实际容量是，应该是 31 次方，有一个是用于正负号的
    const min = - Math.pow(2, 31);
    const max = Math.pow(2, 31) - 1;
    // 由于在此区间上有正有负，我们需要先统一符号，方便计算（由于 min 取绝对值也是负数，所以我们统一使用 负数）
    // 异或 相同为 false，不同 为 true
    const single = (a > 0) ^ (b > 0);
    if (!a || (b === min && a !== min)) {
        // 当被除数为 0 时结果一定为0 
        // 若 b 为最小值，那么若 a 不为同一个数，那不考虑符号情况下 a 在任何情况下都小于 b，取整则直接为 0
        return 0;
    }
    if (b === min && a === min) {
        return 1;
    }

    // 由于 min 颠倒为正数时会比 max 大，会导致溢出，那么当 a 为 min，不能➗负数
    // 由于 min 已经是最小的了，若➗ >0 && <1 的数则会导致比 min 更小，造成溢出
    if (a === min ) {
        if (b < 1 && b >= -1) {
            return max; 
        }
        if (b === 1) {
            return min;
        }
    }

    // 最佳解决方案，从大到小依次比较， 因为有32 位，排除上述边界表明 target / divisor  最大的商也不会超过 31, 不然就命中上述溢出了
    // 而由于 不能 直接使用 / , 所以需要用到 位运算 右移， 而右移：
    // 【正数】，整体向右 移动 n 位，左侧 补 0
    // 【负数】，先符号位不变，按位取反得反码，再➕1得补码，再整体向右移动 n位，左侧补1
    // 所以 负数 >> n 是不等于

    // 下面的用符号想法错误 ❌
    // ❌ 那么从 31 依次比较，当发现 target 大于 divisor，表明能够除掉的最大倍数，他们的差 作为 target 继续向下除， 因为此时的 key 为 最大 divisor << key 小于 target 的结果， 那么表明 他们的差值 一定会比 divisor << key 小
    // 所以再次计算时，继续从key向下减即可，直到 key 小于 0 终止
    let result = 0;
    let key = 31;
    let target = Math.abs(a)
    let divisor = Math.abs(b);
    let value = divisor;
    while(key >= 0 && (target > 0 || target === min)) {
        // ❌由于 divisor * 2 ^ 31 倍 可能会存在溢出，那就需要用 target 方向去 / key，避免溢出
        // ❌因为 divisor 和 target 都是 负数，那么在比较时，需要方向 求出 (target >> key) < divisor 那就是 当前最符合的 key
        // 因为 target 可能为  min ，而 min 的绝对值 还是 min ，所以此时需要 无符号运算
        // 而由于 target 和 divisor 都是正数，那么 就需要 大于 0 时 求得 结果 当前 二分查找最佳结果
        value = target >>> key;
        const different = value - divisor;
        if (different < 0) {
            // 还能继续除，往下继续算
            key -= 1;
            continue;
        }
        result += 1 << key;
        target = target === min ? Math.abs(target + (divisor << key)): target - (divisor << key);
        key -= 1;
    }
    if (result === 0) {
        return 0;
    }
    return single ? -result: result;


    // 下面的方法超时， 因为每次都是从小到达去求，相当于可能会计算 logn*logn 次，所以采用上面方法，从大到小计算 最多遍历 n 次
    // // 上述是边界问题处理，下面进行除法求解
    // // 我们采用指数求解，就是将除数从小到大进行翻倍求除，第一次为 b，第二次为 2b， 第三次为 4b， 第四次为 8b
    // // 左移动是x2的n次倍，右移动是/2的n次倍
    // // 用这个除数的指数倍 与 被除数进行比较，当发现小的时候，就会退到上次比较差值，差值作为 被除数进行比较
    // // 依次递归比较，直到发现最终差值小于 除数时，所有指数加起来就是所求的商
    // let result = 0;
    // let key = 0;
    // let target = a > 0 ? -a: a;
    // let divisor = b > 0 ? -b: b;
    // let value = divisor;
    // while(target <= value) {
    //     value = divisor << key;
    //     const different = target - value;
    //     if (different === 0) {
    //         // 当前刚好算到位， 结束
    //         result += 1 << key;
    //         break;
    //     }
    //     if (different < 0) {
    //         // 还能继续除，往下继续算
    //         key += 1;
    //         continue;
    //     }
    //     if (key > 0) {
    //         // 当前非第一次求值，只需要倒退到上一位，将余数作为 target 继续求解 即可
    //         key = key - 1;
    //         target = target - (divisor << key);
    //         let temp = 1 << (key);
    //         if (temp < 0) {
    //             // 当前处于 按位计算 溢出状态（超过max，min的范围），需要扭转
    //             temp =  -temp;
    //         }
    //         result += temp;
    //         key  = 0;
    //         value = divisor << key;
    //         continue;
    //     }
    //     // 当前第一次求值，无法回退，直接舍去即可
    //     return;
    // }
    // if (result === 0) {
    //     return 0;
    // }
    // return single ? -result: result;
};


//  输入：a = 15, b = 2
//  输出：7
//  解释：15/2 = truncate(7.5) = 7

//  输入：a = 7, b = -3
//  输出：-2
//  解释：7/-3 = truncate(-2.33333..) = -2

//  输入：a = 1, b = 1
//  输出：1

//  输入：a = 0, b = 1
//  输出：0

// -231 <= a, b <= 231 - 1
// b != 0