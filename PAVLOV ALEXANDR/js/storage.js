/**
 * storage.js
 *
 * This module is responsible for saving and loading tasks
 * from the browser's LocalStorage.
 */

/**
 * Key used to store tasks in LocalStorage.
 *
 * @type {string}
 */
const STORAGE_KEY = "todo_tasks";

/**
 * Saves the current array of tasks to LocalStorage.
 * The array is converted to a JSON string before saving.
 *
 * @param {Array<Object>} tasks - Array of task objects.
 */
export function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Loads tasks from LocalStorage.
 * If the saved data is missing or corrupted, the function returns null.
 *
 * @returns {Array<Object>|null} Array of saved tasks or null.
 */
export function loadTasks() {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (!savedTasks) {
        return null;
    }

    try {
        const parsedTasks = JSON.parse(savedTasks);

        if (!Array.isArray(parsedTasks)) {
            return null;
        }

        return parsedTasks;
    } catch (error) {
        console.error("Error while reading tasks from LocalStorage:", error);
        localStorage.removeItem(STORAGE_KEY);
        return null;
    }
}