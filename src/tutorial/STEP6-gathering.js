import { config } from '../config.js';

const TOKEN = config.TOKEN;
const CHARACTER_NAME = config.CHARACTERS[0];

// Gather the resource on the current tile (Ash Tree at -1,0)
const url = `https://api.artifactsmmo.com/my/${CHARACTER_NAME}/action/gathering`;
const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Authorization": `Bearer ${TOKEN}`
};

try {
  const response = await fetch(url, { method: "POST", headers });
  const data = await response.json();
  
  if (data.error) throw new Error(data.error.message);
  
  const { details } = data.data;
  const dropsStr = details.items.map(i => `${i.quantity}x ${i.code}`).join(", ");
  
  console.log(`🪓 Gathered successfully! Gained: ${dropsStr}`);
  console.log(`🌟 ${details.xp} Woodcutting XP gained.`);
} catch (error) {
  console.error("❌ " + error);
}