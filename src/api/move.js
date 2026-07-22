import { headers } from '../utils/headers.js'
import { api_request } from '../utils/api_request.js';

export async function move(character, x, y) {
    // API endpoint for the move action
    const url = `https://api.artifactsmmo.com/my/${character}/action/move`;
    
    return api_request(url, {
        method: "POST",
        headers,
        body: JSON.stringify({x,y}),
    });
}