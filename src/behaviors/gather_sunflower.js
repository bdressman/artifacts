import { gather_resource } from "./gather_resource.js";


async function gather_sunflower() {
    await gather_resource({
        resource_location: { name: "Sunflower Field", x: 2, y: 2 },
        workshop_location: { name: "alchemy", x: 2, y: 3 },
        raw_item: { code: "sunflower", quantity: 3 },
        craft_item: { code: "small_health_potion", quantity: 2 },
        bank_location: { x: 4, y: 1 }
    });
}

await gather_sunflower();