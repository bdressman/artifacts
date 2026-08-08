import { headers } from '../../utils/headers.js'

/*
Withdraw multiple items in a bank on the character's map. 
The cooldown will be 3 seconds multiplied by the number of different items withdrawn.

NOTE: Currently only supporting a single item for withdraw.
*/

export async function withdraw_item(character, what, qty) {
    const url = `https://api.artifactsmmo.com/my/${character}/action/bank/withdraw/item`;
    const body = JSON.stringify([{ code: what, quantity: qty }]);

    const response = await fetch(url, { method: "POST", headers, body });
    const data = await response.json();

    if (data.error)
        throw new Error(data.error.message);

    return data.data;

}