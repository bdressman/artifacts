import { headers } from '../utils/headers.js'

export async function fight(character) {
    // API endpoint to start a fight against the monster on the current tile
    const url = `https://api.artifactsmmo.com/my/${character}/action/fight`;

    const response = await fetch(url, { method: "POST", headers });
    const data = await response.json();

    if (data.error) 
        throw new Error(data.error.message);

    return data.data;
}