import { config } from '../config.js';
import { gather } from '../api/gather.js';
import { perform } from '../utils/perform.js'

// Gather the 4 ash wood at tile (-1, 0) so be sure you move there first.

const character = config.CHARACTERS[0];

try {
    for (let g = 0; g < 4; g++) {
        console.log(`Gather attempt ${g + 1}/4`);
        const result = await perform(() => gather(character));
        const { details } = result;
        const dropsStr = details.items.map(i => `${i.quantity}x ${i.code}`).join(", ");

        console.log(`🪓 Gathered successfully! Gained: ${dropsStr}`);
        console.log(`🌟 ${details.xp} Woodcutting XP gained.`);
        console.log(`Gathered. Cooldown was ${result.cooldown.total_seconds} seconds.`);
    }
} catch (error) {
    console.error("❌ " + error);
}