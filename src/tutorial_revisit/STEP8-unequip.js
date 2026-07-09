import { config } from '../config.js';
import { unequip } from '../api/unequip.js'
import { perform } from '../utils/perform.js'

// Unequip the weapon per the tutorial

const character = config.CHARACTERS[0];

try {
    const result = await perform(() => unequip(character, "weapon"));

    console.log(`🎒 Unequipped weapon! It is now in your inventory.`);
    console.log(`📦 Inventory capacity: ${result.character.inventory.length} / ${result.character.inventory_max_items}`);
} catch (error) {
    console.error("❌ " + error);
}