import { config } from '../config.js';

const TOKEN = config.TOKEN;
const CHARACTER_NAME = config.CHARACTERS[0];

// API endpoint to start a fight against the monster on the current tile
const url = `https://api.artifactsmmo.com/my/${CHARACTER_NAME}/action/fight`;
const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Authorization": `Bearer ${TOKEN}`
};

try {
  const response = await fetch(url, { method: "POST", headers });
  const data = await response.json();
  
  if (data.error) throw new Error(data.error.message);
  
  const { fight, cooldown } = data.data;
  const fightStats = fight.characters[0];
  
  console.log(fight.result === "win" ? "🏆 Fight won!" : "💀 Fight lost!");
  console.log(`⚔️  XP gained: ${fightStats.xp} | HP remaining: ${fightStats.final_hp}`);
  
  if (fightStats.drops && fightStats.drops.length > 0) {
    const dropsStr = fightStats.drops.map(d => `${d.quantity}x ${d.code}`).join(", ");
    console.log(`🎁 Loot dropped: ${dropsStr}`);
  }
} catch (error) {
  console.error("❌ " + error);
}