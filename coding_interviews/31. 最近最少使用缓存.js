/**
 * [TOPIC]: 运用所掌握的数据结构，设计和实现一个  LRU (Least Recently Used，最近最少使用) 缓存机制 。
 * 
 * 实现 LRUCache 类：
 * 
 * LRUCache(int capacity) 以正整数作为容量 capacity 初始化 LRU 缓存
 * int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
 * void put(int key, int value) 如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字-值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。
 * 
 * [进阶]：是否可以在 O(1) 时间复杂度内完成这两种操作？
 */
/**
 * @param {number} capacity
 */
 var LRUCache = function(capacity) {
    // 采用 map 作为存储数据
    this.map = new Map();
    // 采用 数组 用于存储时序, 模拟 双向链表， 【pre】【key】【next】
    // 当发生变动时，通过 arr map 找到 对应 key 在数组下标，更改其 pre 和 next
    this.arr = [];
    this.arrMap = new Map();
    // 用两个指针记录开始和结束 key
    this.first = null;
    this.last = null;
    // 记录是否要处于溢出
    this.length = 0;
    this.capacity = capacity;

    this.changeKeyPriority = (key) => {
        const firstIndex = this.arrMap.get(this.first);
        const lastIndex = this.arrMap.get(this.last) ?? -1;
        const index = this.arrMap.get(key);
        if (firstIndex === lastIndex || lastIndex === index) {
            // 当前第一个和最后一个都是同一个，不用更改 时序
            // 当前就是最后一个也不用更改时序
            return;
        }
        // 找到当前位置
        const [pre, , next] = this.arr[index];
        if (pre !== -1) {
            // 更改其上一个的 next 指向 其当前的 下一个
            this.arr[pre][2] = next;
        } else {
            // 当前为第一个，需要更改 first 指向 若没有下一个 还是当前
            this.first = this.arr[next]?.[1] ?? key;
        }
        if (next !== -1) {
            // 更改其下一个的 pre 指向 其当前的前一个
            this.arr[next][0] = pre;
        }
        if (this.arr[lastIndex]) {
            // 同步上一个最后一个指向
            this.arr[lastIndex][2] = index;
        }
        this.last = key;
        this.arr[index] = [lastIndex, key, -1];
    }
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if (this.map.has(key)) {
        this.changeKeyPriority(key);
        return this.map.get(key);
    }
    return -1;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    const firstIndex = this.arrMap.get(this.first);
    const lastIndex = this.arrMap.get(this.last) ?? -1;
    if (this.map.has(key)) {
        this.changeKeyPriority(key);
        this.map.set(key, value);
        return;
    }
    
    if (this.length < this.capacity){
        this.arrMap.set(key, this.arr.length);
        // 若之前为null，表示当前没有内容，需要重新初始化
        this.first = this.first === null ? key: this.first;
        if (lastIndex >= 0) {
            this.arr[lastIndex][2] = this.arr.length;
        }
        this.arr.push([lastIndex, key, -1]);
        this.last = key;
        this.map.set(key, value);
        this.length += 1;
        return;
    }

    // 当前需要删除第一个数据的,更改first 的 key 为下一个指向（要考虑当前 capacity = 1 情况）
    this.arrMap.delete(this.first);
    this.map.delete(this.first);
    this.arrMap.set(key, firstIndex);
    this.map.set(key, value);
    const next = this.arr[firstIndex][2];
    this.first = this.capacity === 1 ? key : this.arr[next][1];
    this.arr[firstIndex] = [this.capacity === 1 ? -1: lastIndex, key, -1];
    if (this.capacity !== 1) {
        this.arr[lastIndex][2] = firstIndex;
        this.arr[next][0] = -1;
    }
    this.last = key;
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
//  输入
//  ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
//  [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
//  输出
//  [null, null, null, 1, null, -1, null, -1, 3, 4]
 
//  解释
//  LRUCache lRUCache = new LRUCache(2);
//  lRUCache.put(1, 1); // 缓存是 {1=1}
//  lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
//  lRUCache.get(1);    // 返回 1
//  lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
//  lRUCache.get(2);    // 返回 -1 (未找到)
//  lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
//  lRUCache.get(1);    // 返回 -1 (未找到)
//  lRUCache.get(3);    // 返回 3
//  lRUCache.get(4);    // 返回 4
 
//  1 <= capacity <= 3000
//  0 <= key <= 10000
//  0 <= value <= 105
//  最多调用 2 * 105 次 get 和 put
