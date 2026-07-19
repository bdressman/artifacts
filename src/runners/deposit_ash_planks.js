import { config } from '../config.js';
import { deposit_item } from '../api/deposit_item.js';
import { perform } from '../utils/perform.js'
import { move } from "../api/move.js";

// BIG PROBLEMS:
// - Moving errors if I am already at location, which means the data is not captured.


const name = config.CHARACTERS[0];

// First, move to bank at (4,1)
// And capture the number of ash_planks we have in invevntory
let ash_planks = 0;
try {

    console.log("Traveling...");
    const result = await perform(() => move(name, 4, 1));
    const { destination, cooldown, character } = result;

    const {inventory} = character;
    ash_planks = inventory.find(item => item.code === "ash_plank")?.quantity ?? 0;

    console.log(`✅ Moved to (${destination.x}, ${destination.y}) on ${destination.name}`);
    console.log(`${name} has ${ash_planks} ash planks in inventory.`);

} catch (error) {
    console.error("❌ " + error);
}

// Next, deposit the ash planks into bank
try {
    console.log(`Depositing ${ash_planks} ash planks into bank.`);
    const result = await perform(() => deposit_item(name, "ash_plank", ash_planks));
    console.log("Deposited");

} catch (error) {
    console.error("❌ " + error);
}