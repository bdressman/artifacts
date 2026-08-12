import { gather_resource } from "./gather_resource.js";

async function gather_spruce_wood() {
    await gather_resource({
        resource_location: { name: "Spruce Tree", x: 2, y: 6 },
        workshop_location: { name: "woodcutting", x: -2, y: -3 },
        raw_item: { code: "spruce_wood", quantity: 10 },
        craft_item: { code: "spruce_plank", quantity: 1 },
        bank_location: { x: 4, y: 1 }
    });
}

await gather_spruce_wood();