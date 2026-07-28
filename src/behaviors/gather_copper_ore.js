import { gather_resources } from "../commands/gather_resources.js";
import { config } from "../config.js";
import { move } from "../api/move.js";
import { perform } from "../utils/perform.js";
import { deposit_item } from "../api/deposit_item.js";

const character = config.CHARACTERS[0];

async function gather_copper_ore() {
    console.log("Enter gather_copper_ore()");


    try {
        // move to copper rocks
        /* debugging 
        console.log("Moving to copper rocks")
        const result = await perform(() => move(character, 2, 0));

        console.log("Gathering...");
        await gather_resources(character);
        */
        // move to the workshop
        //const result = await perform(() => move(character, 1, 5));

        // get the inventory from the result to see how many copper bars we can craft:
        //const { inventory } = result.character;

        //const bankables = inventory.filter(i => i.code !== "" && i.code !== "copper_ore");

        // move to the bank
        const result = await perform(() => move(character, 4, 1));

        const { inventory } = result.character;

        const bankables = inventory.filter(i => i.code !== "" && i.code !== "copper_ore");

        // deposit all in inventory
        for (const item of bankables) {
            console.log(`Depositing ${item.quantity} ${item.code}`);
            await perform(() => deposit_item(character, item.code, item.quantity));
        }
        console.log("All items deposited into bank.")

        //console.log(bankables);
    }
    catch(error) {
        console.log(error);
    }
}

await gather_copper_ore();