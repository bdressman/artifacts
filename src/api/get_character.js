import { headers } from '../utils/headers.js'

export async function get_character(name) {
    const url = `https://api.artifactsmmo.com/characters/${name}`;

    const response = await fetch(url, { method: "GET", headers });
    const data = await response.json();

    if (data.error)
        throw new Error(data.error.message);

    return data.data;
}