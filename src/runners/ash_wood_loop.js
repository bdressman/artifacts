import { config } from '../config.js';
import { perform } from '../utils/perform.js'
import { move } from "../api/move.js";
import { gather } from '../api/gather.js';
import { get_character } from '../api/get_character.js';
import { crafting } from '../api/crafting.js';
import { deposit_item } from '../api/deposit_item.js';

const character = config.CHARACTERS[0];


async function move_to(x, y) {
    try {
        console.log('Traveling...');
        const result = await perform(() => move(character, x, y));
        const { destination, cooldown } = result;

        console.log(`✅ Moved to (${destination.x}, ${destination.y}) on ${destination.name}`);
        //console.log(`⏳ Cooldown started: ${cooldown.total_seconds} seconds`);

    } catch (error) {
        console.error("❌ " + error);
    }
}

async function gather_ash_wood() {
    let inventory_full = false;

    while (!inventory_full) {
        try {
            console.log('Gathering...');
            const result = await perform(() => gather(character));
            const { details } = result;

            console.log(`🪓 Gathered successfully!`);
            console.log(`🌟 ${details.xp} Woodcutting XP gained.`);

            // debugging:
            //inventory_full = true;
        } catch (error) {
            console.error("❌ " + error);

            if (error.message.includes("inventory is full")) {
                console.log("Success detecting full inventory");
                inventory_full = true;
            }
        }
    }
}

async function ash_wood_into_ash_planks() {
    let has_wood = true;

    while (has_wood) {
        try {
            console.log("Crafting...");
            const result = await perform(() => crafting(character, "ash_plank"));
            //const { details } = result;
            console.log(`🔨 ${result.description}`);
            console.log(`🌟 ${result.xp} Woodcutting XP gained.`);

            // debugging:
            //has_wood = false;
        } catch (error) {
            console.error("❌ " + error);

            if (error.message.includes("Missing required")) {
                console.log("Success detecting missing ash wood");
                has_wood = false;
            }
        }
    }
}

async function deposit_ash_planks() {
    let ash_planks = 0;
    try {
        const { inventory } = await get_character(character);
        ash_planks = inventory.find(item => item.code === "ash_plank")?.quantity ?? 0;

    }
    catch (error) {
        console.error("❌ " + error);
    }


    try {
        console.log(`Depositing ${ash_planks} ash planks into bank.`);
        const result = await perform(() => deposit_item(character, "ash_plank", ash_planks));
        console.log("Deposited");

    } catch (error) {
        console.error("❌ " + error);
    }
}

await move_to(2,4);

while (true) {
    // First move to ash wood tree at (-1, 0)
    console.log("moving to ash tree");
    await move_to(-1, 0);

    // gather until inventory is full
    console.log("gathering ash wood");
    await gather_ash_wood();

    // Now travel to woodcutter at (-2, -3)
    console.log("moving to wood cutter");
    await move_to(-2, -3);

    // convert ash wood into ash planks
    console.log("crafting ash planks");
    await ash_wood_into_ash_planks();

    // Next, move to bank for deposit at (4, 1)
    console.log("moving to bank");
    await move_to(4, 1);

    // deposit at bank
    console.log("depositing ash planks");
    await deposit_ash_planks();

}