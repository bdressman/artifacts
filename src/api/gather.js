import { headers } from '../utils/headers.js'

export async function gather(character) {

    const url = `https://api.artifactsmmo.com/my/${character}/action/gathering`;

    const response = await fetch(url, { method: "POST", headers });
    const data = await response.json();

    if (data.error)
        throw new Error(data.error.message);

    return data.data;
}