import { headers } from '../utils/headers.js'
import { api_request } from '../utils/api_request.js';

export async function rest(character) {
    const url = `https://api.artifactsmmo.com/my/${character}/action/rest`;

    return api_request(url, {
        method: "POST",
        headers
    });
}