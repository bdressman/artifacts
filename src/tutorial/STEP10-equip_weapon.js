import { config } from '../config.js';

const TOKEN = config.TOKEN;
const CHARACTER_NAME = config.CHARACTERS[0];

// Equip the wooden staff from your inventory into the weapon slot
const url = `https://api.artifactsmmo.com/my/${CHARACTER_NAME}/action/equip`;
const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${TOKEN}`
};

// The payload is a list of items to equip.
// "quantity" is optional and only applies to utilities.
const body = JSON.stringify([{ code: "wooden_staff", slot: "weapon" }]);

try {
    const response = await fetch(url, { method: "POST", headers, body });
    const data = await response.json();

    if (data.error) throw new Error(data.error.message);

    const char = data.data.character;
    console.log(`✅ Equipped wooden_staff in weapon slot!`);
    console.log(`⚔️  Your earth attack is now ${char.attack_earth}`);
} catch (error) {
    console.error("❌ " + error);
}