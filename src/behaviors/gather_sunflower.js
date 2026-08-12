import { gather_resources } from "../commands/gather_resources.js";
import { config } from "../config.js";
import { move } from "../api/move.js";
import { perform } from "../utils/perform.js";
import { deposit_item } from "../api/bank/deposit_item.js";
import { crafting } from '../api/crafting.js'
import logger from "../utils/logger.js"
import {gather_resource} from "../behaviors/gather_resource.js";


async function gather_sunflower_lean() {
    await gather_resource({
        resource_location: { name: "Sunflower Field", x: 2, y: 2 },
        workshop_location: { name: "alchemy", x: 2, y: 3},
        raw_item: { code: "sunflower", quantity: 3 },
        craft_item: { code: "small_health_potion", quantity: 2 },
        bank_location: { x: 4, y: 1 } 
    });
}

const character = config.CHARACTERS[0];

async function gather_sunflower() {
    try {
        let result;

        // move to sunflower field
        console.log("Moving to sunflower field");
        logger.info("Moving to sunflower field at (2, 2)");
        result = await perform(() => move(character, 2, 2));

        // Fill up inventory with resources
        console.log("Gathering...");
        logger.info("Gathering sunflower");
        await gather_resources(character);

        // move to the alchemy workshop
        console.log("Moving to workshop");
        logger.info("Moving to alchemy workshop at (2, 3");
        result = await perform(() => move(character, 2, 3));

        // get the inventory from the result to see how many small health potions we can craft:
        const { inventory: craftable } = result.character;

        const quantity = craftable.find(i => i.code === "sunflower")?.quantity ?? 0;

        const potion = Math.floor(quantity / 3);

        if (potion > 0) {
            console.log(`Crafting ${potion} small health potion(s)`);
            logger.info(`Crafting ${potion} small health potion(s)`);

            result = await perform(() =>
                crafting(character, {
                    code: "small_health_potion",
                    quantity: potion
                })
            );
        } else {
            console.log("Not enough sunflower to craft a small health potion");
            logger.warn("Not enough sunflower to craft a small health potion");
        }

        // move to the bank
        console.log("Moving to bank");
        logger.info("Moving to bank at (4, 1)");
        result = await perform(() => move(character, 4, 1));

        const { inventory } = result.character;

        const bankables = inventory.filter(i => i.code !== "" && i.code !== "sunflower");

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
        process.exit(1);
    }
}

/*
while (true)
    await gather_sunflower();
*/

await gather_sunflower_lean();