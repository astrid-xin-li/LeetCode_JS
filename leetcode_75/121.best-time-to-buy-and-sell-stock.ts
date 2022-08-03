/*
 * @lc app=leetcode id=121 lang=typescript
 *
 * [121] Best Time to Buy and Sell Stock
 */

// @lc code=start
function maxProfit(prices: number[]): number {
    // prices是按照时间顺序定的股票价格，需要先买后卖，低买高卖

    // 方案一感觉太啰里八嗦，不太好
    // if (!prices.length) {
    //     return 0;
    // }
    // let buy: number = prices[0];
    // let sell: number | null = prices[0];
    // let different = 0;
    // prices.map((value) => {
    //     if (value < buy) {
    //         buy = value;
    //         sell = null;
    //     } else if (sell === null) {
    //         const temp = value - buy;
    //         if (temp > different) {
    //             sell = value;
    //             different = temp;
    //         }
    //     } else if (value > sell) {
    //         sell = value;
    //         different = sell - buy;
    //     }
    // })
    // return different;

    // 方案二
    let buy = prices[0];
    let profit = 0;
    prices.map(value => {
        if (value < buy) {
            buy = value;
        } else if (value - buy >  profit) {
            profit = value - buy;
        }
    })
    return profit;
};
// @lc code=end

