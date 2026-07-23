import { headers } from '../utils/headers.js'
import { api_request } from '../utils/api_request.js';

export async function fight(character) {
    // API endpoint to start a fight against the monster on the current tile
    const url = `https://api.artifactsmmo.com/my/${character}/action/fight`;

    return api_request(url, {
        method: "POST",
        headers
    });
}