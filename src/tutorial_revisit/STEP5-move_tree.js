import { config } from "../config.js";
import { move } from "../api/move.js";
import { perform } from '../utils/perform.js'

// Move to ash tree according to original tutorial entry #5

const character = config.CHARACTERS[0];

try {
    const result = await perform(() => move(character, -1, 0));
    const { destination, cooldown } = result;

    console.log(`✅ Moved to (${destination.x}, ${destination.y}) on ${destination.name}`);
    console.log(`⏳ Cooldown started: ${cooldown.total_seconds} seconds`);

} catch (error) {
    console.error("❌ " + error);
}