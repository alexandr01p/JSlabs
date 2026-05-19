/**
 * Класс, представляющий базовый предмет инвентаря.
 */
export class Item {
  /**
   * Создает объект предмета.
   *
   * @param {string} id - Уникальный идентификатор предмета.
   * @param {string} name - Название предмета.
   * @param {string} category - Категория предмета: armor, weapon или potion.
   * @param {string} rarity - Редкость предмета: common, uncommon, rare или legendary.
   * @param {string} description - Полное описание предмета.
   */
  constructor(id, name, category, rarity, description) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.rarity = rarity;
    this.description = description;
  }

  /**
   * Возвращает строку с краткой информацией о предмете.
   *
   * @returns {string} Строка с названием, категорией и редкостью предмета.
   */
  getInfo() {
    return `${this.name} | Категория: ${this.category} | Редкость: ${this.rarity}`;
  }
}

/**
 * Класс, представляющий оружие.
 * Наследуется от класса Item.
 */
export class Weapon extends Item {
  /**
   * Создает объект оружия.
   *
   * @param {string} id - Уникальный идентификатор оружия.
   * @param {string} name - Название оружия.
   * @param {string} category - Категория предмета.
   * @param {string} rarity - Редкость оружия.
   * @param {string} description - Описание оружия.
   * @param {number} damage - Количество урона оружия.
   */
  constructor(id, name, category, rarity, description, damage) {
    super(id, name, category, rarity, description);
    this.damage = damage;
  }

  /**
   * Возвращает сообщение об атаке оружием.
   *
   * @returns {string} Сообщение с названием оружия и количеством нанесенного урона.
   */
  attack() {
    return `Оружие ${this.name} нанесло ${this.damage} урона!`;
  }
}