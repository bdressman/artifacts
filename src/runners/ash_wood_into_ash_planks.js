// Convert the ash wood in inventory into ash planks for the first character in list (no multi-char support yet)
// ctrl+c to stop running
// Does not check inventory yet

import { config } from '../config.js';
import { perform } from '../utils/perform.js'
import { move } from "../api/move.js";
import { crafting } from '../api/crafting.js';

const character = config.CHARACTERS[0];

// First, move to the woodcutter workshop at (-2, -3)
try {
    console.log('Traveling...');
    const result = await perform(() => move(character, -2, -3));
    const { destination, cooldown } = result;

    console.log(`✅ Moved to (${destination.x}, ${destination.y}) on ${destination.name}`);
    //console.log(`⏳ Cooldown started: ${cooldown.total_seconds} seconds`);

} catch (error) {
    console.error("❌ " + error);
}

// Then, continually craft ash planks from ash wood (no inventory check yet)
while(true) {
    try {
        console.log("Crafting...");
        const result = await perform(() => crafting(character, "ash_plank"));
        //const { details } = result;
        console.log(`🔨 ${result.description}`);
        console.log(`🌟 ${result.xp} Woodcutting XP gained.`);
    } catch (error) {
        console.error("❌ " + error);
    }
}