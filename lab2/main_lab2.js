module.exports = {
    printArray,
    printArray1,
    forEach,
    map,
    filter,
    find,
    some,
    every,
    reduce
};

/**
 * Prints array elements in format: "Element i: value x"
 * @param {Array} array - Input array
 * @throws {TypeError} If input is not an array
 */
function printArray(array) {
    if (!Array.isArray(array)) {
        throw new TypeError("Expected an array");
    }

    for (let i = 0; i < array.length; i++) {
        console.log(`Element ${i}: value ${array[i]}`);
    }
}

/**
 * Prints array elements in format: "i: value"
 * @param {Array} array - Input array
 * @throws {TypeError} If input is not an array
 */
function printArray1(array) {
    if (!Array.isArray(array)) {
        throw new TypeError("Expected an array");
    }

    for (let i = 0; i < array.length; i++) {
        console.log(`${i}: ${array[i]}`);
    }
}

/**
 * Executes a callback for each element in the array
 * @param {Array} array - Input array
 * @param {Function} callback - Function to execute
 * @throws {TypeError} If arguments are invalid
 */
function forEach(array, callback) {
    if (!Array.isArray(array)) {
        throw new TypeError("Expected an array");
    }

    if (typeof callback !== "function") {
        throw new TypeError("Callback must be a function");
    }

    for (let i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}

/**
 * Creates a new array with results of callback execution
 * @param {Array} array - Input array
 * @param {Function} callback - Transformation function
 * @returns {Array} New transformed array
 */
function map(array, callback) {
    if (!Array.isArray(array)) {
        throw new TypeError("Expected an array");
    }

    if (typeof callback !== "function") {
        throw new TypeError("Callback must be a function");
    }

    const result = [];

    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i], i, array));
    }

    return result;
}

/**
 * Filters array elements based on condition
 * @param {Array} array - Input array
 * @param {Function} callback - Condition function
 * @returns {Array} Filtered array
 */
function filter(array, callback) {
    if (!Array.isArray(array)) {
        throw new TypeError("Expected an array");
    }

    if (typeof callback !== "function") {
        throw new TypeError("Callback must be a function");
    }

    const result = [];

    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            result.push(array[i]);
        }
    }

    return result;
}

/**
 * Returns first element matching condition
 * @param {Array} array - Input array
 * @param {Function} callback - Condition function
 * @returns {*} Found element or undefined
 */
function find(array, callback) {
    if (!Array.isArray(array)) {
        throw new TypeError("Expected an array");
    }

    if (typeof callback !== "function") {
        throw new TypeError("Callback must be a function");
    }

    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            return array[i];
        }
    }

    return undefined;
}

/**
 * Checks if at least one element satisfies condition
 * @param {Array} array - Input array
 * @param {Function} callback - Condition function
 * @returns {boolean}
 */
function some(array, callback) {
    if (!Array.isArray(array)) {
        throw new TypeError("Expected an array");
    }

    if (typeof callback !== "function") {
        throw new TypeError("Callback must be a function");
    }

    for (let i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            return true;
        }
    }

    return false;
}

/**
 * Checks if all elements satisfy condition
 * @param {Array} array - Input array
 * @param {Function} callback - Condition function
 * @returns {boolean}
 */
function every(array, callback) {
    if (!Array.isArray(array)) {
        throw new TypeError("Expected an array");
    }

    if (typeof callback !== "function") {
        throw new TypeError("Callback must be a function");
    }

    for (let i = 0; i < array.length; i++) {
        if (!callback(array[i], i, array)) {
            return false;
        }
    }

    return true;
}

/**
 * Reduces array to a single value
 * @param {Array} array - Input array
 * @param {Function} callback - Reducer function
 * @param {*} initialValue - Initial accumulator value
 * @returns {*} Final accumulated result
 */
function reduce(array, callback, initialValue) {
    if (!Array.isArray(array)) {
        throw new TypeError("Expected an array");
    }

    if (typeof callback !== "function") {
        throw new TypeError("Callback must be a function");
    }

    if (array.length === 0 && initialValue === undefined) {
        return undefined;
    }

    let accumulator = initialValue !== undefined ? initialValue : array[0];
    let startIndex = initialValue !== undefined ? 0 : 1;

    for (let i = startIndex; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i, array);
    }

    return accumulator;
}