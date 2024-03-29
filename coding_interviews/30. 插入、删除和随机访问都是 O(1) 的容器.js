/**
 * [TOPIC]: 设计一个支持在平均 时间复杂度 O(1) 下，执行以下操作的数据结构：
 * 
 * insert(val)：当元素 val 不存在时返回 true ，并向集合中插入该项，否则返回 false 。
 * remove(val)：当元素 val 存在时返回 true ，并从集合中移除该项，否则返回 false 。
 * getRandom：随机返回现有集合中的一项。每个元素应该有 相同的概率 被返回。
 */

/**
 * Initialize your data structure here.
 */
 var RandomizedSet = function() {
    this.valList = [];
    this.valMap = new Map();
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    // 不能使用 index of 这个复杂度可能为 n, 所以要有专门查找
    // const index = this.valList.indexOf(val);
    if (this.valMap.has(val)) {
        return false;
    }
    this.valMap.set(val, this.valList.length);
    this.valList.push(val);
    return true;
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element. 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    // 不能使用 index of 这个复杂度可能为 n, 所以要有专门查找
    // const index = this.valList.indexOf(val);
    if (this.valMap.has(val)) {
        // 不能使用 splice 会让后续的内容前进，不能做到复杂度为 1 ，可能会为 0 
        // 题目不在意顺序，那么只需要删除最末尾，让其与末尾交换即可
        const index = this.valMap.get(val);
        this.valList[index] = this.valList[this.valList.length - 1];
        this.valList.pop();
        this.valMap.delete(val);
        return true;
    }
    return false;
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    const random = Math.floor(Math.random() * this.valList.length);
    // random 是 （0～1） * length 得到的结果为 0～（length -1）floor 向下取整
    return this.valList?.[random];
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */

// 输入: inputs = ["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
// [[], [1], [2], [2], [], [1], [2], []]
// 输出: [null, true, false, true, 2, true, false, 2]
// 解释:
// RandomizedSet randomSet = new RandomizedSet();  // 初始化一个空的集合
// randomSet.insert(1); // 向集合中插入 1 ， 返回 true 表示 1 被成功地插入

// randomSet.remove(2); // 返回 false，表示集合中不存在 2 

// randomSet.insert(2); // 向集合中插入 2 返回 true ，集合现在包含 [1,2] 

// randomSet.getRandom(); // getRandom 应随机返回 1 或 2 
  
// randomSet.remove(1); // 从集合中移除 1 返回 true 。集合现在包含 [2] 

// randomSet.insert(2); // 2 已在集合中，所以返回 false 

// randomSet.getRandom(); // 由于 2 是集合中唯一的数字，getRandom 总是返回 2 

// -231 <= val <= 231 - 1
// 最多进行 2 * 105 次 insert ， remove 和 getRandom 方法调用
// 当调用 getRandom 方法时，集合中至少有一个元素