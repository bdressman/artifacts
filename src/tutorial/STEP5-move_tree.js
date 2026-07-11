import { config } from '../config.js';

const TOKEN = config.TOKEN;
const CHARACTER_NAME = config.CHARACTERS[0];

// Move to tile (-1, 0) where the Ash Tree is located
const url = `https://api.artifactsmmo.com/my/${CHARACTER_NAME}/action/move`;
const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${TOKEN}`
};

// Target coordinates: the Ash Tree resource node
const body = JSON.stringify({ x: -1, y: 0 });

try {
    const response = await fetch(url, { method: "POST", headers, body });
    const data = await response.json();

    if (data.error) throw new Error(data.error.message);

    const { destination, cooldown } = data.data;
    console.log(`✅ Moved to (${destination.x}, ${destination.y}) on ${destination.name}`);
    console.log(`⏳ Wait ${cooldown.total_seconds}s before gathering!`);
} catch (error) {
    console.error("❌ " + error);
}