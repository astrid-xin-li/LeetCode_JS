/**
 * [TOPIC]: 某种外星语也使用英文小写字母，但可能顺序 order 不同。字母表的顺序（order）是一些小写字母的排列。
 * 
 * 给定一组用外星语书写的单词 words，以及其字母表的顺序 order，只有当给定的单词在这种外星语中按字典序排列时，返回 true；否则，返回 false
 */

/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
var isAlienSorted = function(words, order) {
    for (let wordIndex = 1; wordIndex < words.length; wordIndex++) {
        const previous = words[wordIndex - 1];
        const current = words[wordIndex];
        for (let index = 0; index < previous.length; index++) {
            const value = previous[index];
            // 先判断当前是否已经超出 current 长度，若比较到当前位置 current 没有元素，说明 current 应该在前面
            if (index >= current.length) {
                return false;
            }
            // 比较前一个元素，与当前元素在相同位置，是否按照 order 排序
            // 如果两个字母相同，则需要继续比较，
            // 否则 current 大，直接终止进入后面一个元素比较，
            // current 小，直接结束return false
            const currentValue = current[index];
            if (currentValue === value) {
                continue;
            }
            const currentIndex = order.indexOf(currentValue);
            const previewIndex = order.indexOf(value);
            if (currentIndex < previewIndex) {
                return false;
            } else {
                break;
            }
        }
        
    }
    return true;
};

// 输入：words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
// 输出：true
// 解释：在该语言的字母表中，'h' 位于 'l' 之前，所以单词序列是按字典序排列的。

// 输入：words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"
// 输出：false
// 解释：在该语言的字母表中，'d' 位于 'l' 之后，那么 words[0] > words[1]，因此单词序列不是按字典序排列的。


// 输入：words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"
// 输出：false
// 解释：当前三个字符 "app" 匹配时，第二个字符串相对短一些，然后根据词典编纂规则 "apple" > "app"，因为 'l' > '∅'，其中 '∅' 是空白字符，定义为比任何其他字符都小（更多信息）。

// 1 <= words.length <= 100
// 1 <= words[i].length <= 20
// order.length == 26
// 在 words[i] 和 order 中的所有字符都是英文小写字母。