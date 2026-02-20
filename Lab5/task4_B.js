function findLongestWord(str) {
    let words = str.split(" ");
    return words.reduce((a, b) => {
        return a.length > b.length ? a : b;
    });
}

console.log(findLongestWord("JavaScript is very powerful language"));