
let weeklySteps = [4500, 6200, 5800, 7100, 4900, 8300, 6700];


function addSteps(dayIndex, steps) {
    if (dayIndex >= 0 && dayIndex < weeklySteps.length) {
        weeklySteps[dayIndex] = steps;
        console.log(`Updated Day ${dayIndex} steps to ${steps}`);
    } else {
        console.log("Invalid day index!");
    }
}


function getHighestSteps() {
    return Math.max(...weeklySteps);
}


function getLowestSteps() {
    return Math.min(...weeklySteps);
}


function getAverageSteps() {
    let total = weeklySteps.reduce((sum, steps) => sum + steps, 0);
    return total / weeklySteps.length;
}


function getAboveAverageDays() {
    let average = getAverageSteps();
    return weeklySteps.filter(steps => steps > average);
}



console.log("Weekly Steps:", weeklySteps);

console.log("Highest Steps:", getHighestSteps());
console.log("Lowest Steps:", getLowestSteps());
console.log("Average Steps:", getAverageSteps().toFixed(2));
console.log("Above Average Days:", getAboveAverageDays());


addSteps(0, 9000);

console.log("\nAfter Updating Day 0:");
console.log("Weekly Steps:", weeklySteps);
console.log("Highest Steps:", getHighestSteps());
console.log("Lowest Steps:", getLowestSteps());
console.log("Average Steps:", getAverageSteps().toFixed(2));
console.log("Above Average Days:", getAboveAverageDays());