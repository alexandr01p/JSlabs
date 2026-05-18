/**
 * Class representing an inventory item.
 */
class Item {
    /**
     * Create an item.
     * @param {string} name - Item name.
     * @param {number} weight - Item weight.
     * @param {string} rarity - Item rarity (common, uncommon, rare, legendary).
     */
    constructor(name, weight, rarity) {
        this.name = name;
        this.weight = weight;
        this.rarity = rarity;
    }

    /**
     * Returns formatted information about the item.
     * @returns {string} String with item information.
     */
    getInfo() {
        return `Item: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
    }

    /**
     * Changes the item's weight.
     * @param {number} newWeight - New item weight.
     * @returns {void}
     */
    setWeight(newWeight) {
        this.weight = newWeight;
    }
}

/**
 * Class representing a weapon.
 * Extends the Item class.
 */
class Weapon extends Item {
    /**
     * Create a weapon.
     * @param {string} name - Weapon name.
     * @param {number} weight - Weapon weight.
     * @param {string} rarity - Weapon rarity.
     * @param {number} damage - Weapon damage.
     * @param {number} durability - Weapon durability (0 to 100).
     */
    constructor(name, weight, rarity, damage, durability) {
        super(name, weight, rarity);
        this.damage = damage;
        this.durability = durability;
    }

    /**
     * Returns formatted information about the weapon.
     * @returns {string} String with weapon information.
     */
    getInfo() {
        return `Weapon: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}, Damage: ${this.damage}, Durability: ${this.durability}`;
    }

    /**
     * Uses the weapon and decreases durability by 10 if durability is greater than 0.
     * Durability will not go below 0.
     * @returns {void}
     */
    use() {
        if (this.durability > 0) {
            this.durability = Math.max(0, this.durability - 10);
        }
    }

    /**
     * Restores weapon durability to 100.
     * @returns {void}
     */
    repair() {
        this.durability = 100;
    }
}

// Testing
const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo());
sword.setWeight(4.0);
console.log("Updated weight:", sword.weight);

const shield = new Item("Knight Shield", 5.5, "uncommon");
console.log(shield.getInfo());

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());
bow.use();
console.log("Bow durability after use:", bow.durability);
bow.repair();
console.log("Bow durability after repair:", bow.durability);

const axe = new Weapon("Battle Axe", 6.0, "rare", 25, 30);
console.log(axe.getInfo());
axe.use();
axe.use();
axe.use();
axe.use();
console.log("Axe durability after multiple uses:", axe.durability);

// Optional chaining example
const inventory = {
    mainWeapon: bow,
    backupWeapon: null
};

console.log("Main weapon damage:", inventory.mainWeapon?.damage);
console.log("Backup weapon damage:", inventory.backupWeapon?.damage);
console.log("Owner nickname:", inventory.owner?.nickname);