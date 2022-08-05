/*
 * @lc app=leetcode id=509 lang=typescript
 *
 * [509] Fibonacci Number
 */

// @lc code=start
function fib(n: number): number {
    // fibonacci numbers denoted each number is the sum of the two preceding ones
    // start from 0 and 1
    const dynamicMap: Map<number, number> = new Map();
    dynamicMap.set(0, 0);
    dynamicMap.set(1, 1);
    const calculateFibonacciNumber = (param: number): number => {
        if (!dynamicMap.has(param)) {
            const value = calculateFibonacciNumber(param - 1) + calculateFibonacciNumber(param - 2);
            dynamicMap.set(param, value);
            return value;
        }
        return dynamicMap.get(param) ?? 0;
    };
    return calculateFibonacciNumber(n);
};
// @lc code=end

