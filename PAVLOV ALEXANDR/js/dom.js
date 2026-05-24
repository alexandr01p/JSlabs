/**
 * dom.js
 *
 * This module contains DOM elements and functions for rendering
 * tasks on the page, displaying validation errors and updating
 * the user interface.
 */

/**
 * Form used to add a new task.
 *
 * @type {HTMLFormElement}
 */
export const taskForm = document.querySelector("#task-form");

/**
 * Input field for the task title.
 *
 * @type {HTMLInputElement}
 */
export const taskTitleInput = document.querySelector("#task-title");

/**
 * Input field for the task category.
 *
 * @type {HTMLInputElement}
 */
export const taskCategoryInput = document.querySelector("#task-category");

/**
 * Select element for the task priority.
 *
 * @type {HTMLSelectElement}
 */
export const taskPrioritySelect = document.querySelector("#task-priority");

/**
 * Element used to show validation error for task title.
 *
 * @type {HTMLElement}
 */
export const titleError = document.querySelector("#title-error");

/**
 * Element used to show validation error for task category.
 *
 * @type {HTMLElement}
 */
export const categoryError = document.querySelector("#category-error");

/**
 * Input field used to search tasks.
 *
 * @type {HTMLInputElement}
 */
export const searchInput = document.querySelector("#search-input");

/**
 * Select element used to filter tasks by status.
 *
 * @type {HTMLSelectElement}
 */
export const statusFilter = document.querySelector("#status-filter");

/**
 * Select element used to sort tasks.
 *
 * @type {HTMLSelectElement}
 */
export const sortSelect = document.querySelector("#sort-select");

/**
 * Container where task elements are rendered.
 *
 * @type {HTMLElement}
 */
export const taskList = document.querySelector("#task-list");

/**
 * Message displayed when there are no tasks.
 *
 * @type {HTMLElement}
 */
export const emptyMessage = document.querySelector("#empty-message");

/**
 * Element used to display the number of tasks.
 *
 * @type {HTMLElement}
 */
export const taskCounter = document.querySelector("#task-counter");

/**
 * Clears the form fields after a task is added.
 */
export function clearForm() {
    taskTitleInput.value = "";
    taskCategoryInput.value = "";
    taskPrioritySelect.value = "low";
}

/**
 * Clears all validation error messages.
 */
export function clearErrors() {
    titleError.textContent = "";
    categoryError.textContent = "";
}

/**
 * Displays validation errors near the corresponding fields.
 *
 * @param {Object} errors - Object containing validation error messages.
 * @param {string} [errors.title] - Error message for the title field.
 * @param {string} [errors.category] - Error message for the category field.
 */
export function showValidationErrors(errors) {
    titleError.textContent = errors.title || "";
    categoryError.textContent = errors.category || "";
}

/**
 * Converts priority value into readable text.
 *
 * @param {string} priority - Priority value: low, medium or high.
 * @returns {string} Readable priority text.
 */
export function getPriorityText(priority) {
    const priorityMap = {
        low: "Низкий",
        medium: "Средний",
        high: "Высокий"
    };

    return priorityMap[priority];
}

/**
 * Renders the list of tasks on the page.
 *
 * @param {Array<Object>} tasks - Array of tasks that should be displayed.
 * @param {Function} onToggle - Function called when task status is changed.
 * @param {Function} onDelete - Function called when task is deleted.
 * @param {Function} onEdit - Function called when task is edited.
 */
export function renderTasks(tasks, onToggle, onDelete, onEdit) {
    taskList.innerHTML = "";

    taskCounter.textContent = `Всего задач: ${tasks.length}`;

    if (tasks.length === 0) {
        emptyMessage.classList.remove("hidden");
        return;
    }

    emptyMessage.classList.add("hidden");

    tasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";

        if (task.completed) {
            taskItem.classList.add("completed");
        }

        taskItem.innerHTML = `
            <div class="task-header">
                <h3 class="task-title">${task.title}</h3>
                <span class="priority priority-${task.priority}">
                    ${getPriorityText(task.priority)}
                </span>
            </div>

            <div class="task-info">
                <p><strong>Категория:</strong> ${task.category}</p>
                <p><strong>Дата создания:</strong> ${task.createdAt}</p>
                <p><strong>Статус:</strong> ${task.completed ? "Выполнена" : "Активна"}</p>
            </div>

            <div class="task-actions">
                <button class="btn complete-btn">
                    ${task.completed ? "Сделать активной" : "Отметить выполненной"}
                </button>
                <button class="btn edit-btn">Редактировать</button>
                <button class="btn delete-btn">Удалить</button>
            </div>
        `;

        const completeButton = taskItem.querySelector(".complete-btn");
        const editButton = taskItem.querySelector(".edit-btn");
        const deleteButton = taskItem.querySelector(".delete-btn");

        completeButton.addEventListener("click", () => onToggle(task.id));
        deleteButton.addEventListener("click", () => onDelete(task.id));
        editButton.addEventListener("click", () => onEdit(task.id));

        taskList.append(taskItem);
    });
}