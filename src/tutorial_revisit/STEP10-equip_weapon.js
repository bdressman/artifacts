import { config } from '../config.js';
import { equip } from '../api/equip.js'
import { perform } from '../utils/perform.js'

// Equip the weapon per the tutorial

const character = config.CHARACTERS[0];

try {
    const result = await perform(() => equip(character, "wooden_staff", "weapon"));
    const char = result.character;

    console.log(`✅ Equipped wooden_staff in weapon slot!`);
    console.log(`⚔️  Your earth attack is now ${char.attack_earth}`);
} catch (error) {
    console.error("❌ " + error);
}