import { gather_resources } from "../commands/gather_resources.js";
import { config } from "../config.js";
import { move } from "../api/move.js";
import { perform } from "../utils/perform.js";
import { deposit_item } from "../api/bank/deposit_item.js";
import { crafting } from '../api/crafting.js'
import logger from "../utils/logger.js"

const character = config.CHARACTERS[0];

async function gather_spruce_wood() {
    try {
        let result;

        // move to spruce tree
        console.log("Moving to spruce tree");
        logger.info("Moving to spruce tree at (2, 6)");
        result = await perform(() => move(character, 2, 6));

        // Fill up inventory with resources
        console.log("Gathering...");
        logger.info("Gathering spruce wood");
        await gather_resources(character);

        // move to the workshop
        console.log("Moving to workshop");
        logger.info("Moving to woodcutting workshop at (-2, -3)");
        result = await perform(() => move(character, -2, -3));

        // get the inventory from the result to see how many spruce planks we can craft:
        const { inventory: craftable } = result.character;

        const quantity = craftable.find(i => i.code === "spruce_wood")?.quantity ?? 0;

        // I know it takes 10 ash wood to make one plank, so for now I'll just directly write that in.
        const planks = Math.floor(quantity / 10);

        if (planks > 0) {
            console.log(`Crafting ${planks} spruce plank(s)`);
            logger.info(`Crafting ${planks} spruce plank(s)`);

            result = await perform(() =>
                crafting(character, {
                    code: "spruce_plank",
                    quantity: planks
                })
            );
        } else {
            console.log("Not enough spruce wood to craft a spruce plank");
            logger.warn("Not enough spruce wood to craft a spruce plank");
        }

        // move to the bank
        console.log("Moving to bank");
        logger.info("Moving to bank at (4, 1)");
        result = await perform(() => move(character, 4, 1));

        const { inventory } = result.character;

        const bankables = inventory.filter(i => i.code !== "" && i.code !== "spruce_wood");

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
    await gather_spruce_wood();