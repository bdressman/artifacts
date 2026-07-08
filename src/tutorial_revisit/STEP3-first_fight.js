import { config } from '../config.js';
import { fight } from '../api/fight.js'

// Be sure you have moved to chicken first.
// Fight chicken

try {
    const data = await fight(config.CHARACTERS[0]);

    // Avoiding name collision:
    const { fight: fightResult, cooldown } = data
    const fightStats = fightResult.characters[0];

    console.log(fightResult.result === "win" ? "🏆 Fight won!" : "💀 Fight lost!");
    console.log(`⚔️  XP gained: ${fightStats.xp} | HP remaining: ${fightStats.final_hp}`);

    if (fightStats.drops && fightStats.drops.length > 0) {
        const dropsStr = fightStats.drops.map(d => `${d.quantity}x ${d.code}`).join(", ");
        console.log(`🎁 Loot dropped: ${dropsStr}`);
  }
} catch(error) {
    console.error("❌ " + error);
}