/**
 * data.js
 *
 * This module stores and manages the application's task data.
 * It contains the main array of tasks and provides functions
 * for adding, deleting, editing and updating task status.
 */

/**
 * Array of task objects used as the main data source of the application.
 *
 * Each task contains:
 * - id: unique identifier
 * - title: task name
 * - category: task category
 * - priority: task priority
 * - completed: task status
 * - createdAt: task creation date
 *
 * @type {Array<Object>}
 */
export let tasks = [
    {
        id: 1,
        title: "Сделать лабораторную работу",
        category: "Учеба",
        priority: "high",
        completed: false,
        createdAt: "2026-05-14"
    },
    {
        id: 2,
        title: "Прочитать документацию JavaScript",
        category: "Самообучение",
        priority: "medium",
        completed: false,
        createdAt: "2026-05-14"
    },
    {
        id: 3,
        title: "Отправить проект на GitHub",
        category: "Учеба",
        priority: "low",
        completed: true,
        createdAt: "2026-05-14"
    }
];

/**
 * Replaces the current tasks array with a new array.
 * This function is used when tasks are loaded from LocalStorage.
 *
 * @param {Array<Object>} newTasks - New array of task objects.
 */
export function setTasks(newTasks) {
    tasks = newTasks;
}

/**
 * Adds a new task to the tasks array.
 *
 * @param {Object} task - New task object.
 */
export function addTask(task) {
    tasks.push(task);
}

/**
 * Deletes a task by its id.
 *
 * @param {number} taskId - The id of the task that should be deleted.
 */
export function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
}

/**
 * Changes the completion status of a task.
 * If the task is active, it becomes completed.
 * If the task is completed, it becomes active again.
 *
 * @param {number} taskId - The id of the task whose status should be changed.
 */
export function toggleTaskStatus(taskId) {
    const task = tasks.find(task => task.id === taskId);

    if (task) {
        task.completed = !task.completed;
    }
}

/**
 * Edits the title of an existing task.
 *
 * @param {number} taskId - The id of the task that should be edited.
 * @param {string} newTitle - New title for the task.
 */
export function editTask(taskId, newTitle) {
    const task = tasks.find(task => task.id === taskId);

    if (task) {
        task.title = newTitle;
    }
}