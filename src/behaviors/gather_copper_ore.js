import { gather_resources } from "../commands/gather_resources.js";
import { config } from "../config.js";
import { move } from "../api/move.js";
import { perform } from "../utils/perform.js";
import { deposit_item } from "../api/bank/deposit_item.js";
import { crafting } from '../api/crafting.js'
import logger from "../utils/logger.js"
import {gather_resource} from "../behaviors/gather_resource.js";


const character = config.CHARACTERS[0];

async function gather_copper_ore_lean() {
    await gather_resource({
        resource_location: { name: "copper rocks", x: 2, y: 0 },
        workshop_location: { name: "mining", x: 1, y: 5},
        raw_item: { code: "copper_ore", quantity: 10 },
        craft_item: { code: "copper_bar", quantity: 1 },
        bank_location: { x: 4, y: 1 } 
    });
}


async function gather_copper_ore() {
    try {
        let result;

        // move to copper rocks
        console.log("Moving to copper rocks");
        logger.info("Moving to copper rocks at (2, 0)");
        result = await perform(() => move(character, 2, 0));

        // Fill up inventory with resources
        console.log("Gathering...");
        logger.info("Gathering copper rocks");
        await gather_resources(character);

        // move to the workshop
        console.log("Moving to workshop");
        logger.info("Moving to mining workshop at (1, 5)");
        result = await perform(() => move(character, 1, 5));

        // get the inventory from the result to see how many copper bars we can craft:
        const { inventory: craftable } = result.character;

        const quantity = craftable.find(i => i.code === "copper_ore")?.quantity ?? 0;

        // I know it takes 10 ore to make one bar, so for now I'll just directly write that in.
        const bars = Math.floor(quantity / 10);

        if (bars > 0) {
            console.log(`Crafting ${bars} copper bar(s)`);
            logger.info(`Crafting ${bars} copper bar(s)`);

            result = await perform(() =>
                crafting(character, {
                    code: "copper_bar",
                    quantity: bars
                })
            );
        } else {
            console.log("Not enough copper ore to craft a bar");
            logger.warn("Not enough copper ore to craft a bar");
        }

        // move to the bank
        console.log("Moving to bank");
        logger.info("Moving to bank at (4, 1)");
        result = await perform(() => move(character, 4, 1));

        const { inventory } = result.character;

        const bankables = inventory.filter(i => i.code !== "" && i.code !== "copper_ore");

        // deposit all in inventory
        console.log("Depositing inventory...");
        logger.info("Depositing inventory");
        for (const item of bankables) {
            console.log(`Depositing ${item.quantity} ${item.code}`);
            logger.info(`Depositing ${item.quantity} ${item.code}`);
            await perform(() => deposit_item(character, item.code, item.quantity));
        }
        console.log("All items deposited into bank.");
        logger.info("All items deposited into bank.");
    }
    catch (error) {
        console.log(error);
        logger.fail(error);
    }
}

/*
while (true)
    await gather_copper_ore();
*/

await gather_copper_ore_lean();