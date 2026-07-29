import { headers } from "./headers.js";

// See node doctumentation for other network errors of interest.
// For now, just fixing my problem.
const NETWORK_ERROR_CODES = new Set([
    "UND_ERR_CONNECT_TIMEOUT"
]);

function is_network_error(error) {
    return (
        error instanceof TypeError &&
        error.message === "fetch failed" &&
        NETWORK_ERROR_CODES.has(error.cause?.code)
    );
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export async function api_request(url, options = {}, max_retries = 3) {
    console.log("Enter api_request()");

    for (let retry = 0; retry <= max_retries; retry++) {
        try {
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

        } catch (error) {

            const has_retries = retry < max_retries;
            if (!is_network_error(error) || !has_retries){
                throw error;
            }

            // exponential delay to be more gentle with network error time.
            const delay = 1000 * (2 ** retry);
            console.log(`Network connection failed. Retrying in ${delay / 1000} seconds`);

            await sleep(delay);
        }
    }
}