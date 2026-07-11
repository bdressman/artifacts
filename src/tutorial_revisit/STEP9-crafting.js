import { config } from '../config.js';
import { crafting } from '../api/crafting.js'
import { perform } from '../utils/perform.js'

// Craft the wooden staff according to tutorial

const character = config.CHARACTERS[0];

try {

    const result = await perform(() => crafting(character, "wooden_staff"));
    const { details } = result.data;
    console.log(`🔨 Crafted 1x wooden_staff successfully!`);
    console.log(`🌟 ${details.xp} Weaponcrafting XP gained.`);
} catch (error) {
    console.error("❌ " + error);
}