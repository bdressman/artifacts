import { config } from '../config.js';

const TOKEN = config.TOKEN;
const CHARACTER_NAME = config.CHARACTERS[0];

// API endpoint to make your character rest and recover HP
const url = `https://api.artifactsmmo.com/my/${CHARACTER_NAME}/action/rest`;
const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Authorization": `Bearer ${TOKEN}`
};

try {
  const response = await fetch(url, { method: "POST", headers });
  const data = await response.json();
  
  if (data.error) throw new Error(data.error.message);
  
  const { hp_restored } = data.data;
  const hp = data.data.character.hp;
  const max_hp = data.data.character.max_hp;
  
  console.log(`🛏️  Rested and restored ${hp_restored} HP.`);
  console.log(`❤️  Current HP: ${hp}/${max_hp}`);
} catch (error) {
  console.error("❌ " + error);
}