/**
 * Constructor function for creating an inventory item.
 * @constructor
 * @param {string} name - Item name.
 * @param {number} weight - Item weight.
 * @param {string} rarity - Item rarity (common, uncommon, rare, legendary).
 */
function Item(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
}

/**
 * Returns formatted information about the item.
 * @returns {string} String with item information.
 */
Item.prototype.getInfo = function () {
    return `Item: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
};

/**
 * Changes the item's weight.
 * @param {number} newWeight - New item weight.
 * @returns {void}
 */
Item.prototype.setWeight = function (newWeight) {
    this.weight = newWeight;
};

/**
 * Constructor function for creating a weapon.
 * Inherits from Item.
 * @constructor
 * @param {string} name - Weapon name.
 * @param {number} weight - Weapon weight.
 * @param {string} rarity - Weapon rarity.
 * @param {number} damage - Weapon damage.
 * @param {number} durability - Weapon durability (0 to 100).
 */
function Weapon(name, weight, rarity, damage, durability) {
    Item.call(this, name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
}

Weapon.prototype = Object.create(Item.prototype);
Weapon.prototype.constructor = Weapon;

/**
 * Returns formatted information about the weapon.
 * @returns {string} String with weapon information.
 */
Weapon.prototype.getInfo = function () {
    return `Weapon: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}, Damage: ${this.damage}, Durability: ${this.durability}`;
};

/**
 * Uses the weapon and decreases durability by 10 if durability is greater than 0.
 * Durability will not go below 0.
 * @returns {void}
 */
Weapon.prototype.use = function () {
    if (this.durability > 0) {
        this.durability = Math.max(0, this.durability - 10);
    }
};

/**
 * Restores weapon durability to 100.
 * @returns {void}
 */
Weapon.prototype.repair = function () {
    this.durability = 100;
};

// Testing
const potion = new Item("Health Potion", 0.5, "common");
console.log(potion.getInfo());
potion.setWeight(0.6);
console.log("Updated potion weight:", potion.weight);

const dagger = new Weapon("Iron Dagger", 1.2, "common", 10, 50);
console.log(dagger.getInfo());
dagger.use();
console.log("Dagger durability after use:", dagger.durability);
dagger.repair();
console.log("Dagger durability after repair:", dagger.durability);

// Optional chaining example
const chest = {
    firstItem: potion,
    secondItem: null
};

console.log("First item rarity:", chest.firstItem?.rarity);
console.log("Second item rarity:", chest.secondItem?.rarity);
console.log("Third item rarity:", chest.thirdItem?.rarity);