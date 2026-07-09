import { config } from '../config.js';
import { rest } from '../api/rest.js';
import { perform } from '../utils/perform.js'

// Recover hit points 

const character = config.CHARACTERS[0];

try {
    const result = await perform(() => rest(character));

    const { hp_restored } = result;
    const hp = result.character.hp;
    const max_hp = result.character.max_hp;

    console.log(`🛏️  Rested and restored ${hp_restored} HP.`);
    console.log(`❤️  Current HP: ${hp}/${max_hp}`);

} catch (error) {
    console.error("❌ " + error);
}