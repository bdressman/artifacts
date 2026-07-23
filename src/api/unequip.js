import { headers } from '../utils/headers.js'
import { api_request } from '../utils/api_request.js';

export async function unequip(character, what) {
    const url = `https://api.artifactsmmo.com/my/${character}/action/unequip`;

    return api_request(url, {
        method: "POST",
        headers,
        body: JSON.stringify([{ slot: what }])
    });
}