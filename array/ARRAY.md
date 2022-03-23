# 循环遍历
## ForEach
    高阶函数，调用回调函数，所以在forEach内部的return只会先跳出forEach当前遍历调用的callback，不会直接跳出forEach。
    break 无效。

    foreach在作用上和for循环在循环数组时是相同，都是可以实现遍历数组的目的，但二者之间略有差别。

    for循环遍历数组本质上是遍历数组下标，即先找到索引，再连接数组元素，而foreach循环是基于Iterator来实现的，所以foreach是每次访问该元素的下一个元素的地址，来实现的直接元素访问。

    因为for循环实现了遍历数组下标，所以可以直接的对元素值进行删除，但因其地址并未被删除，所以可以直接将后元素的值对前元素进行赋值，即可另值消失。

    因为foreach是基于Iterator实现的，直接访问的是下一个元素的地址，所以在其中无法实现直接的数组元素删除，需要借助Iterator中定义的remove方法来对某元素实现删除，该删除直接删除的为元素地址，但在删除元素后，foreach中定义的某变量值会发生改变，当其值发生改变时会造成安全隐患，如果循环继续运行，则Java会抛出异常。

    所以我们通常是不可以使用foreach来实现元素的删除的，如果需要将元素进行删除时，需要采用for循环，而不能采用foreach循环。
    ————————————————
    版权声明：本文为CSDN博主「醺泽」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
    原文链接：https://blog.csdn.net/qq_45722267/article/details/113029368

## Some
    用于检测是否有元素符合预期，return true 结束遍历
    * 不对空数组检测
    * 不改变原有数组
## Every
    用于检测元素是否都符合预期，return false 结束遍历
    * 不对空数组检测
    * 不改变原有数组

# JS 数组 方法
## splice
    用于对当前数组进行 增删改 操作, 返回删除内容
    使用方法： `arr.splice(index, number, ...valueList)`
    index: 对 arr 数组操作 的起始位置下标
    number: 操作数据个数，若 10 ，则表示从 index 开始一直删除 10 个， 若 0 ，则表示从 index 开始删除 0 个元素
    valueList: 删除操作后，将 valueList 插入原数组中
    ** 🌰 **
    arr = [1,2,3,4,5,6,7] ，修改 arr 的 第三个和第四个数 为 10，11
    const temp = arr.splice(2,2, 10, 11)
    temp -> [3,4]
    arr -> [1,2,10,11,5,6,7]

# 算法

## 二分查找
    时间复杂度 log(n)
    条件
    * 当前数组为有序数组（升/降序）
    用途
    * 查找大于等于 某个值的第一个数，例如一个数组中，去查找大于等于 15的第一位数是哪个

# 方法
## 对于一个有序数组，查找距离每个元素 x 差值内最远的元素是哪位？
### O(n^2) 两个 for 循环 $\color{red}{0分}$
```ts
for (let i = 0; i < arr.length; i++) {
    for(let j = i + 1; j < arr.length; j++) {
        if (arr[j] - arr[i] > x) {
            console.log(`对于当前元素${arr[i]}而言，距离${x}差值内，最大元素为${arr[j - 1]},当前两位距离为${j - 1 - x}`);
            break;
        }
    }
    if (j > arr.length) {
        console.log(`对于当前元素${arr[i]}而言，距离${x}差值内，最大元素为${arr[j - 1]},当前两位距离为${j - 1 - x}`);
    }
}
```

### O(n*log(n)) 一个for循环进行查找各个元素，另外通过二分查找方法找出目标元素 $\color{red}{5分}$
```ts
// 当前 array 为升序
const binarySearch = (array: number[], maxTarget: number) => {
    let left = 0;
    let right = array.length - 1;
    let mid = Math.ceil(array.length / 2) - 1;
    while (left < right) {
        if (array[mid] < maxTarget) {
            left = mid;
            mid = Math.ceil((right + left) / 2);
        } else if (array[mid] > maxTarget) {
            right = mid;
            mid = Math.ceil((right + left) / 2);
        } else if (array[mid] === maxTarget) {
            return mid;
        }
    }
    return maxTarget < array[left] ? right : left;
}

for (let i = 0; i < arr.length; i++) {
    const j = binarySearch(arr, arr[i] + x);
    console.log(`对于当前元素${arr[i]}而言，距离${x}差值内，最大元素为${arr[j - 1]},当前两位距离为${j - 1 - x}`);
}
```

### O(n) 一个for循环进行查找各个元素，另外一个因为此为有序数组，所以当前元素最大差值目标元素 和 下一个元素的最大差值目标元素，只能一样或者在右边，O(2n)=O(n) $\color{red}{10分}$
```ts
// 当前 array 为升序
let j = 0;
for (let i = 0; i < arr.length; i++) {
    const maxTarget = arr[i] + x;
    while (j < arr.length && arr[j] > maxTarget) {
        j ++;
    }
    console.log(`对于当前元素${arr[i]}而言，距离${x}差值内，最大元素为${arr[j - 1]},当前两位距离为${j - 1 - x}`);
}
```
