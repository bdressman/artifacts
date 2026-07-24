import { headers } from '../utils/headers.js'
import { api_request } from '../utils/api_request.js';

export async function equip(character, what, where) {
    const url = `https://api.artifactsmmo.com/my/${character}/action/equip`;

    return api_request(url, {
        method: "POST",
        headers,
        body: JSON.stringify([{ code: what, slot: where }])
    });
}