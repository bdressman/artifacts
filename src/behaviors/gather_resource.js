// NOTE: This is an in-between refactor that still follows the gather behaviors:
//  - gather_ash_wood.js
//  - gather_copper_ore.js
//  - gather_gudgeon.js
//  - gather_iron_ore.js
//  - gather_spruce_wood.js
//  - gather_sunflower.js
//
//  However, eventually I want to control a few factors in gathering:
//      - Do we gather until full or just get enough to craft with?
//      - Do we refine it or just deposit it raw into the bank?
// 
//
// CURRENT STEPS:
//  - Move to resource location
//  - Gather until inventory is full
//  - Move to the workshop location
//  - Craft the provided crafting item
//  - Move to the bank
//  - Deposit all inventory

import { gather_resources } from "../commands/gather_resources.js";
import { config } from "../config.js";
import { move } from "../api/move.js";
import { perform } from "../utils/perform.js";
import { deposit_item } from "../api/bank/deposit_item.js";
import { crafting } from "../api/crafting.js";
import logger from "../utils/logger.js";

//const character = config.CHARACTERS[0];

export async function gather_resource({
    character,
    resource_location,  // { name, x, y }
    workshop_location,  // { name, x, y }
    raw_item,           // { code, quantity }
    craft_item,         // { code, quantity }
    bank_location       // { x, y }
}) {
    try {
        let result;

        // Move to resource
        console.log(`Moving to ${resource_location.name}`);
        logger.info(`Moving to ${resource_location.name} at (${resource_location.x},${resource_location.y})`);
        result = await perform(() => move(character, resource_location.x, resource_location.y));

        // Fill up inventory with resources
        console.log("Gathering...");
        logger.info(`Gathering ${raw_item.code}`);
        await gather_resources(character);

        // Move to workshop
        console.log("Moving to workshop");
        logger.info(`Moving to ${workshop_location.name} at (${workshop_location.x},${workshop_location.y})`);
        result = await perform(() => move(character, workshop_location.x, workshop_location.y));

        // Get inventory from result to see how many craft_item we can craft
        const workshop_inventory = result.character.inventory;

        const quantity = workshop_inventory.find(i => i.code === raw_item.code)?.quantity ?? 0;

        const craft_quantity = Math.floor(quantity / raw_item.quantity) * craft_item.quantity;

        if (craft_quantity > 0) {
            console.log(`Crafting ${craft_quantity} ${craft_item.code}`);
            logger.info(`Crafting ${craft_quantity} ${craft_item.code}`);

            result = await perform(() =>
                crafting(character, {
                    code: craft_item.code,
                    quantity: craft_quantity
                })
            );
        } else {
            console.log(`Not enough ${raw_item.code} to craft ${craft_item.code}`);
            logger.warn(`Not enough ${raw_item.code} to craft ${craft_item.code}`)
        }

        // Move to the bank
        console.log("Moving to bank");
        logger.info(`Moving to bank at (${bank_location.x},${bank_location.y})`);
        result = await perform(() => move(character, bank_location.x, bank_location.y));

        const bank_inventory = result.character.inventory;

        const bankables = bank_inventory.filter(i => i.code !== "" && i.code !== raw_item.code);

        // Deposit all in inventory
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