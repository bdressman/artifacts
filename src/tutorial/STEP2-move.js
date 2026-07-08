import { config } from '../config.js';

const TOKEN = config.TOKEN;
const CHARACTER_NAME = config.CHARACTERS[0];

// API endpoint for the move action
const url = `https://api.artifactsmmo.com/my/${CHARACTER_NAME}/action/move`;

// Authentication headers — your token identifies you on the server
const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Authorization": `Bearer ${TOKEN}`
};

// Target coordinates: move to tile (0, 1) where the chicken is
const body = JSON.stringify({ x: 0, y: 1 });

try {
  const response = await fetch(url, { method: "POST", headers, body });
  const data = await response.json();
  
  if (data.error) throw new Error(data.error.message);
  
  const { destination, cooldown } = data.data;
  console.log(`✅ Moved to (${destination.x}, ${destination.y}) on ${destination.name}`);
  console.log(`⏳ Cooldown started: ${cooldown.total_seconds} seconds`);
} catch (error) {
  console.error("❌ " + error);
}