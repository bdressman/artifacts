// Script that simply kills chickens and rests infinitely. End with ctrl+c.

import { config } from '../config.js';
import { fight } from '../api/fight.js'
import { perform } from '../utils/perform.js'
import { rest } from '../api/rest.js';
import { move } from "../api/move.js";

const character = config.CHARACTERS[0];


// First, move to the location of the chicken
try {
    const result = await perform(() => move(character, 0, 1));
    const { destination, cooldown } = result;

    console.log(`✅ Moved to (${destination.x}, ${destination.y}) on ${destination.name}`);
    console.log(`⏳ Cooldown started: ${cooldown.total_seconds} seconds`);

} catch (error) {
    console.error("❌ " + error);
}

// Next, fight the chicken forever
while (true) {
    try {
        const result = await perform(() => fight(character));

        // Avoiding name collision:
        const { fight: fightResult, cooldown } = result;
        const fightStats = fightResult.characters[0];

        console.log(fightResult.result === "win" ? "🏆 Fight won!" : "💀 Fight lost!");
        console.log(`⚔️  XP gained: ${fightStats.xp} | HP remaining: ${fightStats.final_hp}`);

        if (fightStats.drops && fightStats.drops.length > 0) {
            const dropsStr = fightStats.drops.map(d => `${d.quantity}x ${d.code}`).join(", ");
            console.log(`🎁 Loot dropped: ${dropsStr}`);
        }
    } catch (error) {
        console.error("❌ " + error);
    }

    // Next, rest
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
}