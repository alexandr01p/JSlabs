/**
 * Генерирует уникальный идентификатор для предмета.
 *
 * @returns {string} Уникальный ID.
 */
export function generateId() {
  return crypto.randomUUID();
}

/**
 * Возвращает CSS-класс в зависимости от редкости предмета.
 *
 * @param {string} rarity - Редкость предмета.
 * @returns {string} CSS-класс для строки таблицы.
 */
export function getRarityClass(rarity) {
  return `rarity-${rarity}`;
}

/**
 * Очищает строку от лишних пробелов по краям.
 *
 * @param {string} value - Исходная строка.
 * @returns {string} Очищенная строка.
 */
export function trimValue(value) {
  return value.trim();
}