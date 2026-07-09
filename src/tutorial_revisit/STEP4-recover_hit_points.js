import { config } from '../config.js';
import { rest } from '../api/rest.js';

// Recover hit points 

try {
    const data = await rest(config.CHARACTERS[0]);

    const { hp_restored } = data;
    const hp = data.character.hp;
    const max_hp = data.character.max_hp;

    console.log(`🛏️  Rested and restored ${hp_restored} HP.`);
    console.log(`❤️  Current HP: ${hp}/${max_hp}`);

} catch (error) {
    console.error("❌ " + error);
}