import { config } from '../config.js';

const TOKEN = config.TOKEN;

// Authentication headers — your token identifies you on the server
const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Authorization": `Bearer ${TOKEN}`
};

export async function move(character, x, y) {
  // API endpoint for the move action
  const url = `https://api.artifactsmmo.com/my/${character}/action/move`;
  const body = JSON.stringify({ x, y });

  const response = await fetch(url, { method: "POST", headers, body });
  const data = await response.json();
  
  if (data.error) 
    throw new Error(data.error.message);

  return data.data;
}