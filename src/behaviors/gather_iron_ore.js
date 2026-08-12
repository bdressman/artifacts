import { gather_resource } from "./gather_resource.js";


async function gather_iron_ore() {
    await gather_resource({
        resource_location: { name: "Iron Rocks", x: 1, y: 7 },
        workshop_location: { name: "mining", x: 1, y: 5 },
        raw_item: { code: "iron_ore", quantity: 10 },
        craft_item: { code: "iron_bar", quantity: 1 },
        bank_location: { x: 4, y: 1 }
    });
}

await gather_iron_ore();