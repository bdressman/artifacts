import { headers } from '../../utils/headers.js'

/*
Withdraw a quantity of gold

*/

export async function withdraw_gold(character, qty) {
    const url = `https://api.artifactsmmo.com/my/${character}/action/bank/withdraw/gold`;
    const body = JSON.stringify({ quantity: qty });

    const response = await fetch(url, { method: "POST", headers, body });
    const data = await response.json();

    if (data.error)
        throw new Error(data.error.message);

    return data.data;

}