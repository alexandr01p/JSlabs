import { Weapon } from "./classes.js";
import { getRarityClass } from "./utils.js";

/**
 * Создает строку таблицы для предмета.
 *
 * @param {import("./classes.js").Item | import("./classes.js").Weapon} item - Предмет инвентаря.
 * @returns {HTMLTableRowElement} Строка таблицы.
 */
export function createInventoryRow(item) {
  const row = document.createElement("tr");

  row.dataset.id = item.id;
  row.dataset.description = item.description;
  row.classList.add(getRarityClass(item.rarity));

  const damageText = item instanceof Weapon ? item.attack() : "—";

  row.innerHTML = `
    <td>${item.name}</td>
    <td>${item.category}</td>
    <td>${item.rarity}</td>
    <td>${damageText}</td>
    <td>
      <button class="delete-btn" data-action="delete">Удалить</button>
    </td>
  `;

  return row;
}

/**
 * Добавляет строку предмета в таблицу.
 *
 * @param {HTMLTableSectionElement} tableBody - Тело таблицы.
 * @param {import("./classes.js").Item | import("./classes.js").Weapon} item - Предмет инвентаря.
 * @returns {void}
 */
export function renderItem(tableBody, item) {
  const row = createInventoryRow(item);
  tableBody.appendChild(row);
}

/**
 * Обновляет отображение общего количества предметов.
 *
 * @param {HTMLElement} totalElement - Элемент, в котором отображается количество.
 * @param {number} total - Общее количество предметов.
 * @returns {void}
 */
export function updateTotalItems(totalElement, total) {
  totalElement.textContent = total;
}

/**
 * Показывает описание предмета в отдельном блоке.
 *
 * @param {HTMLElement} descriptionElement - Элемент для вывода описания.
 * @param {string} description - Описание предмета.
 * @returns {void}
 */
export function showItemDescription(descriptionElement, description) {
  descriptionElement.textContent = description;
}

/**
 * Очищает описание предмета.
 *
 * @param {HTMLElement} descriptionElement - Элемент для вывода описания.
 * @returns {void}
 */
export function clearItemDescription(descriptionElement) {
  descriptionElement.textContent = "Наведите курсор на предмет, чтобы увидеть описание.";
}

/**
 * Показывает сообщение об ошибке.
 *
 * @param {HTMLElement} errorElement - Элемент для вывода ошибки.
 * @param {string} message - Текст ошибки.
 * @returns {void}
 */
export function showError(errorElement, message) {
  errorElement.textContent = message;
}

/**
 * Очищает сообщение об ошибке.
 *
 * @param {HTMLElement} errorElement - Элемент для вывода ошибки.
 * @returns {void}
 */
export function clearError(errorElement) {
  errorElement.textContent = "";
}