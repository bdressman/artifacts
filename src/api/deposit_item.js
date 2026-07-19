import { headers } from '../utils/headers.js'

/*
Deposit multiple items in a bank on the character's map. 
The cooldown will be 3 seconds multiplied by the number of different items deposited.

NOTE: Currently only supporting a single item for deposit.
*/

export async function deposit_item(character, what, qty) {
    const url = `https://api.artifactsmmo.com/my/${character}/action/bank/deposit/item`;
    const body = JSON.stringify([{ code: what, quantity: qty }]);

    const response = await fetch(url, { method: "POST", headers, body });
    const data = await response.json();

    if (data.error)
        throw new Error(data.error.message);

    return data.data;

}