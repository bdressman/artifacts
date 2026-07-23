import { headers } from "./headers.js";

export async function api_request(url, options = {}) {
    const response = await fetch(url, {
        headers,
        ...options,
    });

    const data = await response.json();

    if (!response.ok || data.error) {
        const error = new Error(
            data.error?.message ?? `Request failed with status ${response.status}`
        );

        error.code = data.error?.code;

        throw error;
    }

    return data.data;
}