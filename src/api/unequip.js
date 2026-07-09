import { headers } from '../utils/headers.js'

export async function unequip(character, what) {
    const url = `https://api.artifactsmmo.com/my/${character}/action/unequip`;

    const body = JSON.stringify([{ slot: what }]);

    const response = await fetch(url, { method: "POST", headers, body });
    const data = await response.json();

    if (data.error)
        throw new Error(data.error.message);

    return data.data;
}