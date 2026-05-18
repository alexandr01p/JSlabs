const {
    printArray,
    printArray1,
    forEach,
    map,
    filter,
    find,
    some,
    every,
    reduce
} = require("./main");

// ===== TESTS =====

console.log("=== printArray ===");
printArray(["x", "y", "z"]);
// Expected:
// Element 0: value x
// Element 1: value y
// Element 2: value z

console.log("\n=== printArray1 ===");
printArray1(["x", "y", "z"]);
// Expected:
// 0: x
// 1: y
// 2: z

console.log("\n=== forEach ===");
forEach([10, 20, 30], (element, index) => {
    console.log(`Index ${index}, value ${element}`);
});
// Expected:
// Index 0, value 10
// Index 1, value 20
// Index 2, value 30

console.log("\n=== map ===");
const squared = map([1, 2, 3, 4], (element) => element * element);
console.log(squared);
// Expected: [1, 4, 9, 16]

console.log("\n=== filter ===");
const evens = filter([1, 2, 3, 4, 5, 6], (element) => element % 2 === 0);
console.log(evens);
// Expected: [2, 4, 6]

console.log("\n=== find ===");
const firstGreaterThanThree = find([1, 2, 3, 4, 5], (element) => element > 3);
console.log(firstGreaterThanThree);
// Expected: 4

console.log("\n=== some ===");
const hasNegative = some([3, 7, -1, 9], (element) => element < 0);
console.log(hasNegative);
// Expected: true

const hasBigNumber = some([1, 2, 3], (element) => element > 10);
console.log(hasBigNumber);
// Expected: false

console.log("\n=== every ===");
const allPositive = every([1, 2, 3, 4], (element) => element > 0);
console.log(allPositive);
// Expected: true

const allEven = every([2, 4, 5, 6], (element) => element % 2 === 0);
console.log(allEven);
// Expected: false

console.log("\n=== reduce ===");
const sum = reduce([1, 2, 3, 4], (acc, element) => acc + element, 0);
console.log(sum);
// Expected: 10

const sumWithoutInitial = reduce([1, 2, 3, 4], (acc, element) => acc + element);
console.log(sumWithoutInitial);
// Expected: 10

const emptyReduce = reduce([], (acc, element) => acc + element);
console.log(emptyReduce);
// Expected: undefined