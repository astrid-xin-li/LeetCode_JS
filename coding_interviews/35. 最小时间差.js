// [TOPIC]: 给定一个 24 小时制（小时:分钟 "HH:MM"）的时间列表，找出列表中任意两个时间的最小时间差并以分钟数表示。

/**
 * @param {string[]} timePoints
 * @return {number}
 */
var findMinDifference = function(timePoints) {
    let min = -1;
    const map = new Map();
    for (let index = 0; index < timePoints.length; index++) {
        const [currentHour, currentMinute] = timePoints[index].split(':');
        const valueList = map.get(currentHour);
        if (valueList.length) {
            
        }
    }

};

// 输入：timePoints = ["23:59","00:00"]
// 输出：1

// 输入：timePoints = ["00:00","23:59","00:00"]
// 输出：0

// 2 <= timePoints <= 2 * 104
// timePoints[i] 格式为 "HH:MM"