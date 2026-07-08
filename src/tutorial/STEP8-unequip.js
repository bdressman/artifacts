import { config } from '../config.js';

const TOKEN = config.TOKEN;
const CHARACTER_NAME = config.CHARACTERS[0];

// Unequip the item in the weapon slot — moves it back to your inventory
const url = `https://api.artifactsmmo.com/my/${CHARACTER_NAME}/action/unequip`;
const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Authorization": `Bearer ${TOKEN}`
};

// The payload is a list of slots to unequip.
// "quantity" is optional and only applies to utility slots.
const body = JSON.stringify([{ slot: "weapon" }]);

try {
  const response = await fetch(url, { method: "POST", headers, body });
  const data = await response.json();
  
  if (data.error) throw new Error(data.error.message);
  
  console.log(`🎒 Unequipped weapon! It is now in your inventory.`);
  console.log(`📦 Inventory capacity: ${data.data.character.inventory.length} / ${data.data.character.inventory_max_items}`);
} catch (error) {
  console.error("❌ " + error);
}