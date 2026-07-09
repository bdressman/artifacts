import { config } from '../config.js';

const TOKEN = config.TOKEN;

// Authentication headers — your token identifies you on the server
const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${TOKEN}`
};

export async function gather(character) {

    const url = `https://api.artifactsmmo.com/my/${character}/action/gathering`;

    const response = await fetch(url, { method: "POST", headers });
    const data = await response.json();

    if (data.error)
        throw new Error(data.error.message);

    return data.data;
}