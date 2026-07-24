import { gather } from "../api/gather.js";
import { perform } from '../utils/perform.js'

// We will gather resources until the inventory is full (code=497)

export async function gather_resources(character) {
    console.log("Enter gather_resources()");

    while (true) {
        try {
            const result = await perform(() => gather(character));

            console.log(`Gathered ${result.details.items
                .map(item => `${item.quantity} ${item.code}`)
                .join(", ")}`);

        } catch (error) {
            if (error.code === 497) {
                console.log("Inventory is full. Stopping gathering.");
                return;
            }

            // We only handle 497: The character's inventory is full.
            throw error;
        }
    }
}