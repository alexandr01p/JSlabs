/**
 * app.js
 *
 * Main application module.
 * This file connects data, DOM rendering and LocalStorage.
 * It also contains event handlers and main application logic.
 */

import {
    tasks,
    setTasks,
    addTask,
    deleteTask,
    toggleTaskStatus,
    editTask
} from "./data.js";

import {
    taskForm,
    taskTitleInput,
    taskCategoryInput,
    taskPrioritySelect,
    searchInput,
    statusFilter,
    sortSelect,
    clearForm,
    clearErrors,
    showValidationErrors,
    renderTasks
} from "./dom.js";

import {
    saveTasks,
    loadTasks
} from "./storage.js";

/**
 * Initializes the application.
 * Loads saved tasks from LocalStorage and renders the current list.
 */
function initApp() {
    const savedTasks = loadTasks();

    if (savedTasks) {
        setTasks(savedTasks);
    }

    renderCurrentTasks();
}

/**
 * Creates a new task object.
 *
 * @param {string} title - Task title.
 * @param {string} category - Task category.
 * @param {string} priority - Task priority.
 * @returns {Object} New task object.
 */
function createTask(title, category, priority) {
    return {
        id: Date.now(),
        title,
        category,
        priority,
        completed: false,
        createdAt: new Date().toISOString().split("T")[0]
    };
}

/**
 * Validates the task form.
 *
 * @param {string} title - Task title.
 * @param {string} category - Task category.
 * @returns {Object} Object with validation errors.
 */
function validateTaskForm(title, category) {
    const errors = {};

    if (title.length === 0) {
        errors.title = "Введите название задачи.";
    } else if (title.length < 3) {
        errors.title = "Название должно содержать минимум 3 символа.";
    }

    if (category.length === 0) {
        errors.category = "Введите категорию задачи.";
    }

    return errors;
}

/**
 * Checks whether the validation errors object contains any errors.
 *
 * @param {Object} errors - Object with validation errors.
 * @returns {boolean} True if there are validation errors.
 */
function hasErrors(errors) {
    return Object.keys(errors).length > 0;
}

/**
 * Filters tasks by search text and selected status.
 *
 * @returns {Array<Object>} Filtered array of tasks.
 */
function getFilteredTasks() {
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedStatus = statusFilter.value;

    let filteredTasks = [...tasks];

    if (searchText) {
        filteredTasks = filteredTasks.filter(task =>
            task.title.toLowerCase().includes(searchText) ||
            task.category.toLowerCase().includes(searchText)
        );
    }

    if (selectedStatus === "active") {
        filteredTasks = filteredTasks.filter(task => !task.completed);
    }

    if (selectedStatus === "completed") {
        filteredTasks = filteredTasks.filter(task => task.completed);
    }

    return filteredTasks;
}

/**
 * Sorts tasks according to the selected sorting option.
 *
 * @param {Array<Object>} filteredTasks - Array of already filtered tasks.
 * @returns {Array<Object>} Sorted array of tasks.
 */
function getSortedTasks(filteredTasks) {
    const selectedSort = sortSelect.value;

    const priorityOrder = {
        high: 1,
        medium: 2,
        low: 3
    };

    const sortedTasks = [...filteredTasks];

    if (selectedSort === "title") {
        sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (selectedSort === "priority") {
        sortedTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    if (selectedSort === "date") {
        sortedTasks.sort((a, b) => b.id - a.id);
    }

    return sortedTasks;
}

/**
 * Renders the current task list after applying filtering and sorting.
 */
function renderCurrentTasks() {
    const filteredTasks = getFilteredTasks();
    const sortedTasks = getSortedTasks(filteredTasks);

    renderTasks(
        sortedTasks,
        handleToggleTask,
        handleDeleteTask,
        handleEditTask
    );
}

/**
 * Handles form submission and adds a new task.
 *
 * @param {Event} event - Form submit event.
 */
function handleAddTask(event) {
    event.preventDefault();

    clearErrors();

    const title = taskTitleInput.value.trim();
    const category = taskCategoryInput.value.trim();
    const priority = taskPrioritySelect.value;

    const errors = validateTaskForm(title, category);

    if (hasErrors(errors)) {
        showValidationErrors(errors);
        return;
    }

    const newTask = createTask(title, category, priority);

    addTask(newTask);
    saveTasks(tasks);
    clearForm();
    renderCurrentTasks();
}

/**
 * Handles task status change.
 *
 * @param {number} taskId - Id of the task.
 */
function handleToggleTask(taskId) {
    toggleTaskStatus(taskId);
    saveTasks(tasks);
    renderCurrentTasks();
}

/**
 * Handles task deletion.
 *
 * @param {number} taskId - Id of the task.
 */
function handleDeleteTask(taskId) {
    const confirmed = confirm("Вы уверены, что хотите удалить эту задачу?");

    if (!confirmed) {
        return;
    }

    deleteTask(taskId);
    saveTasks(tasks);
    renderCurrentTasks();
}

/**
 * Handles task title editing.
 *
 * @param {number} taskId - Id of the task.
 */
function handleEditTask(taskId) {
    const newTitle = prompt("Введите новое название задачи:");

    if (newTitle === null) {
        return;
    }

    const trimmedTitle = newTitle.trim();

    if (trimmedTitle.length < 3) {
        alert("Название задачи должно содержать минимум 3 символа.");
        return;
    }

    editTask(taskId, trimmedTitle);
    saveTasks(tasks);
    renderCurrentTasks();
}

/**
 * Registers all event listeners used in the application.
 */
taskForm.addEventListener("submit", handleAddTask);
searchInput.addEventListener("input", renderCurrentTasks);
statusFilter.addEventListener("change", renderCurrentTasks);
sortSelect.addEventListener("change", renderCurrentTasks);

initApp();