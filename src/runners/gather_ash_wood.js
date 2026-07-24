import { config } from '../config.js';
import { perform } from '../utils/perform.js'
import { move } from "../api/move.js";
import { gather } from '../api/gather.js';


const character = config.CHARACTERS[0];

// First move to ash wood tree at (-1, 0)
try {
    console.log('Traveling...');
    const result = await perform(() => move(character, -1, -0));
    const { destination, cooldown } = result;

    console.log(`✅ Moved to (${destination.x}, ${destination.y}) on ${destination.name}`);
    //console.log(`⏳ Cooldown started: ${cooldown.total_seconds} seconds`);

} catch (error) {
    console.error("❌ " + error);
}

// Then gather ash wood endlessly
while(true) {
    try {
        console.log('Gathering...');
        const result = await perform(() => gather(character));
        const { details } = result;

        console.log(`🪓 Gathered successfully!`);
        console.log(`🌟 ${details.xp} Woodcutting XP gained.`);
    } catch (error) {
        console.error("❌ " + error);

        if (error.message.includes("inventory is full")) {
            console.log("Success detecting full inventory");
        }
    }
}