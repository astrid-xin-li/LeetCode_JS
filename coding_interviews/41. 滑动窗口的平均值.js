/**
 * [TOPIC]: 给定一个整数数据流和一个窗口大小，根据该滑动窗口的大小，计算滑动窗口里所有数字的平均值。
 * 
 * 实现 MovingAverage 类：
 * 
 * MovingAverage(int size) 用窗口大小 size 初始化对象。
 * double next(int val) 成员函数 next 每次调用的时候都会往滑动窗口增加一个整数，请计算并返回数据流中最后 size 个值的移动平均值，即滑动窗口里所有数字的平均值。
 */


/**
 * Initialize your data structure here.
 * @param {number} size
 */
var MovingAverage = function(size) {
    // 调用next 方法就是向内部注入参数，然后再求 <= size 的平均值
    // 如果 长度 小于 size，则内部所有内容相加之和 / length
    // 若 长度 大于 size，则 求最后三个数的相加之和 / size
    // 此时应该做一个 长度 为 3的 map 去维护一个长度 为 3的数组，求出每个数组的 元素被替代的顺序
    this.first = 0;
    this.last = 0;
    this.arr = [];
    this.size = size;
    this.sum = 0;
};

/** 
 * @param {number} val
 * @return {number}
 */
MovingAverage.prototype.next = function(val) {
    this.sum += val;
    if (this.arr.length < this.size) {
        if (this.arr[this.last]) {
            this.arr[this.last][1] = this.arr.length;
        }
        this.last = this.arr.length;
        // 内部元素求和
        this.arr.push([val, -1]);
    } else {
        if (this.arr[this.last]) {
            this.arr[this.last][1] = this.first;
        }
        this.last = this.arr.length;
        this.last = this.first;
        this.sum -= this.arr[this.first][0];
        this.first = this.arr[this.first][1];
        this.arr[this.last] = [val, -1];
    }
    return (this.arr.reduce(((previous, [value]) => previous + value), 0) / this.arr.length);
};

/**
 * Your MovingAverage object will be instantiated and called as such:
 * var obj = new MovingAverage(size)
 * var param_1 = obj.next(val)
 */


// 输入：
// inputs = ["MovingAverage", "next", "next", "next", "next"]
// inputs = [[3], [1], [10], [3], [5]]
// 输出：
// [null, 1.0, 5.5, 4.66667, 6.0]

// 解释：
// MovingAverage movingAverage = new MovingAverage(3);
// movingAverage.next(1); // 返回 1.0 = 1 / 1
// movingAverage.next(10); // 返回 5.5 = (1 + 10) / 2
// movingAverage.next(3); // 返回 4.66667 = (1 + 10 + 3) / 3
// movingAverage.next(5); // 返回 6.0 = (10 + 3 + 5) / 3

// 1 <= size <= 1000
// -105 <= val <= 105
// 最多调用 next 方法 104 次