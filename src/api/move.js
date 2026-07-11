import { headers } from '../utils/headers.js'

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