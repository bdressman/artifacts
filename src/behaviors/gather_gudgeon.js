import { gather_resources } from "../commands/gather_resources.js";
import { config } from "../config.js";
import { move } from "../api/move.js";
import { perform } from "../utils/perform.js";
import { deposit_item } from "../api/deposit_item.js";
import { crafting } from '../api/crafting.js'
import logger from "../utils/logger.js"

const character = config.CHARACTERS[0];

async function gather_gudgeon() {
    try {
        let result;

        // move to Gudgeon Spot
        console.log("Moving to gudgeon spot");
        logger.info("Moving to gudgeon spot at (4, 2)");
        result = await perform(() => move(character, 4, 2));

        // Fill up inventory with resources
        console.log("Gathering...");
        logger.info("Gathering gudgeon");
        await gather_resources(character);

        // move to the cooking workshop
        console.log("Moving to workshop");
        logger.info("Moving to cooking workshop at (1, 1)");
        result = await perform(() => move(character, 1, 1));

        // get the inventory from the result to see how many cooked gudgeon we can craft:
        const { inventory: craftable } = result.character;

        const quantity = craftable.find(i => i.code === "gudgeon")?.quantity ?? 0;

        // First major difference here. cooked gudgeon is 1:1 instead of prior 10 quantity
        // And also, bars, planks, and now gudgeon. We don't need to differentiate this but I will for now.
        const cooked_gudgeon = Math.floor(quantity / 1);

        if (cooked_gudgeon > 0) {
            console.log(`Crafting ${cooked_gudgeon} cooked gudgeon(s)`);
            logger.info(`Crafting ${cooked_gudgeon} cooked gudgeon(s)`);

            result = await perform(() =>
                crafting(character, {
                    code: "cooked_gudgeon",
                    quantity: cooked_gudgeon
                })
            );
        } else {
            console.log("Not enough gudgeon to craft a cooked gudgeon");
            logger.warn("Not enough gudgeon to craft a cooked gudgeon");
        }

        // move to the bank
        console.log("Moving to bank");
        logger.info("Moving to bank at (4, 1)");
        result = await perform(() => move(character, 4, 1));

        const { inventory } = result.character;

        const bankables = inventory.filter(i => i.code !== "" && i.code !== "gudgeon");

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

while (true)
    await gather_gudgeon();