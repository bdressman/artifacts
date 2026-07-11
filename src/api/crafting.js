import { headers } from '../utils/headers.js'

export async function crafting(character, what) {

    const url = `https://api.artifactsmmo.com/my/${character}/action/crafting`;

    const body = JSON.stringify({ code: what });

    const response = await fetch(url, { method: "POST", headers, body });
    const data = await response.json();

    if (data.error)
        throw new Error(data.error.message);

    return data.data;
}