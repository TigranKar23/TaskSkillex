class Helper {
    generateCombinations(items, length) {
        const itemMap = new Map();
        items.forEach((item) => {
            const prefix = item.charAt(0);
            if (!itemMap.has(prefix)) itemMap.set(prefix, []);
            itemMap.get(prefix).push(item);
        });

        const itemArrays = Array.from(itemMap.values());
        const results = [];

        function backtrack(start, comb) {
            if (comb.length === length) {
                results.push([...comb]);
                return;
            }
            for (let i = start; i < itemArrays.length; i++) {
                for (const item of itemArrays[i]) {
                    comb.push(item);
                    backtrack(i + 1, comb);
                    comb.pop();
                }
            }
        }
        backtrack(0, []);
        return results;
    }
}

module.exports = new Helper();
