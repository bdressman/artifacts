import { gather_resource } from "./gather_resource.js";

async function gather_copper_ore() {
    await gather_resource({
        resource_location: { name: "copper rocks", x: 2, y: 0 },
        workshop_location: { name: "mining", x: 1, y: 5 },
        raw_item: { code: "copper_ore", quantity: 10 },
        craft_item: { code: "copper_bar", quantity: 1 },
        bank_location: { x: 4, y: 1 }
    });
}

await gather_copper_ore();