import { headers } from '../../utils/headers.js'

/*
Deposit a quantity of gold

*/

export async function deposit_gold(character, qty) {
    const url = `https://api.artifactsmmo.com/my/${character}/action/bank/deposit/gold`;
    const body = JSON.stringify({ quantity: qty });

    const response = await fetch(url, { method: "POST", headers, body });
    const data = await response.json();

    if (data.error)
        throw new Error(data.error.message);

    return data.data;

}