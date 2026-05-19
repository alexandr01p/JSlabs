import { Item, Weapon } from "./classes.js";
import { generateId } from "./utils.js";

/**
 * Массив, содержащий все предметы инвентаря.
 *
 * @type {Array<Item|Weapon>}
 */
export const inventory = [];

/**
 * Создает предмет на основе данных формы и добавляет его в массив inventory.
 *
 * @param {Object} itemData - Данные предмета.
 * @param {string} itemData.name - Название предмета.
 * @param {string} itemData.category - Категория предмета.
 * @param {string} itemData.rarity - Редкость предмета.
 * @param {string} itemData.description - Описание предмета.
 * @param {number} itemData.damage - Урон предмета, если это оружие.
 * @returns {Item|Weapon} Созданный предмет.
 */
export function addItemToInventory(itemData) {
  const id = generateId();

  let item;

  if (itemData.category === "weapon") {
    item = new Weapon(
      id,
      itemData.name,
      itemData.category,
      itemData.rarity,
      itemData.description,
      itemData.damage
    );
  } else {
    item = new Item(
      id,
      itemData.name,
      itemData.category,
      itemData.rarity,
      itemData.description
    );
  }

  inventory.push(item);

  return item;
}

/**
 * Удаляет предмет из массива inventory по его идентификатору.
 *
 * @param {string} id - ID предмета, который нужно удалить.
 * @returns {void}
 */
export function removeItemFromInventory(id) {
  const itemIndex = inventory.findIndex((item) => item.id === id);

  if (itemIndex !== -1) {
    inventory.splice(itemIndex, 1);
  }
}

/**
 * Возвращает предмет из массива inventory по его идентификатору.
 *
 * @param {string} id - ID предмета.
 * @returns {Item|Weapon|undefined} Найденный предмет или undefined.
 */
export function getItemById(id) {
  return inventory.find((item) => item.id === id);
}

/**
 * Подсчитывает общее количество предметов в инвентаре.
 *
 * @returns {number} Количество предметов.
 */
export function calculateTotalItems() {
  return inventory.length;
}