import { headers } from '../utils/headers.js'

export async function equip(character, what, where) {
    const url = `https://api.artifactsmmo.com/my/${character}/action/equip`;

    const body = JSON.stringify([{ code: what, slot: where }]);

    const response = await fetch(url, { method: "POST", headers, body });
    const data = await response.json();

    if (data.error)
        throw new Error(data.error.message);

    return data.data;
}