import {
  addItemToInventory,
  removeItemFromInventory,
  calculateTotalItems,
} from "./inventory.js";

import {
  renderItem,
  updateTotalItems,
  showItemDescription,
  clearItemDescription,
  showError,
  clearError,
} from "./ui.js";

import { trimValue } from "./utils.js";

/**
 * Форма добавления предмета.
 *
 * @type {HTMLFormElement}
 */
const itemForm = document.querySelector("#item-form");

/**
 * Тело таблицы инвентаря.
 *
 * @type {HTMLTableSectionElement}
 */
const inventoryBody = document.querySelector("#inventory-body");

/**
 * Элемент для отображения общего количества предметов.
 *
 * @type {HTMLElement}
 */
const totalItemsElement = document.querySelector("#total-items");

/**
 * Элемент для отображения описания предмета.
 *
 * @type {HTMLElement}
 */
const itemDescriptionElement = document.querySelector("#item-description");

/**
 * Элемент для отображения ошибок формы.
 *
 * @type {HTMLElement}
 */
const errorMessageElement = document.querySelector("#error-message");

/**
 * Получает данные из формы.
 *
 * @returns {Object} Объект с данными формы.
 */
function getFormData() {
  return {
    name: trimValue(document.querySelector("#name").value),
    category: document.querySelector("#category").value,
    rarity: document.querySelector("#rarity").value,
    description: trimValue(document.querySelector("#description").value),
    damage: Number(document.querySelector("#damage").value),
  };
}

/**
 * Проверяет корректность данных формы.
 *
 * @param {Object} itemData - Данные предмета.
 * @param {string} itemData.name - Название предмета.
 * @param {string} itemData.category - Категория предмета.
 * @param {string} itemData.rarity - Редкость предмета.
 * @param {string} itemData.description - Описание предмета.
 * @param {number} itemData.damage - Урон предмета.
 * @returns {string|null} Текст ошибки или null, если ошибок нет.
 */
function validateForm(itemData) {
  if (!itemData.name) {
    return "Введите название предмета.";
  }

  if (!itemData.category) {
    return "Выберите категорию предмета.";
  }

  if (!itemData.rarity) {
    return "Выберите редкость предмета.";
  }

  if (!itemData.description) {
    return "Введите описание предмета.";
  }

  if (itemData.category === "weapon" && (!itemData.damage || itemData.damage <= 0)) {
    return "Для оружия нужно указать урон больше 0.";
  }

  return null;
}

/**
 * Очищает форму после успешного добавления предмета.
 *
 * @returns {void}
 */
function resetForm() {
  itemForm.reset();
}

/**
 * Обновляет счетчик общего количества предметов.
 *
 * @returns {void}
 */
function refreshTotalItems() {
  updateTotalItems(totalItemsElement, calculateTotalItems());
}

/**
 * Обрабатывает отправку формы и добавляет новый предмет в инвентарь.
 *
 * @param {SubmitEvent} event - Событие отправки формы.
 * @returns {void}
 */
function handleFormSubmit(event) {
  event.preventDefault();

  clearError(errorMessageElement);

  const itemData = getFormData();
  const error = validateForm(itemData);

  if (error) {
    showError(errorMessageElement, error);
    return;
  }

  const item = addItemToInventory(itemData);

  renderItem(inventoryBody, item);
  refreshTotalItems();
  resetForm();
}

/**
 * Обрабатывает клик по таблице.
 * Используется делегирование событий для удаления предметов.
 *
 * @param {MouseEvent} event - Событие клика.
 * @returns {void}
 */
function handleTableClick(event) {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (target.dataset.action !== "delete") {
    return;
  }

  const row = target.closest("tr");

  if (!row) {
    return;
  }

  const itemId = row.dataset.id;

  row.classList.add("fade-out");

  setTimeout(() => {
    removeItemFromInventory(itemId);
    row.remove();
    refreshTotalItems();
  }, 500);
}

/**
 * Обрабатывает наведение курсора на строку таблицы.
 * При наведении показывает описание предмета.
 *
 * @param {MouseEvent} event - Событие наведения мыши.
 * @returns {void}
 */
function handleTableMouseOver(event) {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  const row = target.closest("tr");

  if (!row || !row.dataset.description) {
    return;
  }

  showItemDescription(itemDescriptionElement, row.dataset.description);
}

/**
 * Обрабатывает уход курсора со строки таблицы.
 *
 * @param {MouseEvent} event - Событие ухода мыши.
 * @returns {void}
 */
function handleTableMouseOut(event) {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  const row = target.closest("tr");

  if (!row) {
    return;
  }

  clearItemDescription(itemDescriptionElement);
}

itemForm.addEventListener("submit", handleFormSubmit);
inventoryBody.addEventListener("click", handleTableClick);
inventoryBody.addEventListener("mouseover", handleTableMouseOver);
inventoryBody.addEventListener("mouseout", handleTableMouseOut);