const getAverage = (arr) => {
    let sum = 0;
    arr.forEach(num => sum += num);
    return sum / arr.length;
};

console.log(getAverage([10, 20, 30]));