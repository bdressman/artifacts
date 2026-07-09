import { config } from "../config.js";
import { move } from "../api/move.js";
import { perform } from '../utils/perform.js'

// Move to workshop according to original tutorial entry #7

const character = config.CHARACTERS[0];

try {
    const result = await perform(() => move(character, 2, 1));
    const { destination, cooldown } = result;
    console.log(`✅ Moved to (${destination.x}, ${destination.y}) on ${destination.name}`);
    console.log(`⏳ Cooldown started: ${cooldown.total_seconds} seconds`);

} catch (error) {
    console.error("❌ " + error);
}