import { config } from '../config.js';

const TOKEN = config.TOKEN;
const CHARACTER_NAME = config.CHARACTERS[0];

// Craft the wooden staff — requires 4x Ash Wood + 1x Wooden Stick in your inventory
// Make sure you are at the workshop (2,1) before running this!
const url = `https://api.artifactsmmo.com/my/${CHARACTER_NAME}/action/crafting`;
const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Authorization": `Bearer ${TOKEN}`
};

// "code" is the item identifier you want to craft
const body = JSON.stringify({ code: "wooden_staff" });

try {
  const response = await fetch(url, { method: "POST", headers, body });
  const data = await response.json();
  
  if (data.error) throw new Error(data.error.message);
  
  const { details } = data.data;
  console.log(`🔨 Crafted 1x wooden_staff successfully!`);
  console.log(`🌟 ${details.xp} Weaponcrafting XP gained.`);
} catch (error) {
  console.error("❌ " + error);
}