import { gather_resource } from "./gather_resource.js";

async function gather_gudgeon() {
    await gather_resource({
        resource_location: { name: "Gudgeon Spot", x: 4, y: 2 },
        workshop_location: { name: "cooking", x: 1, y: 1 },
        raw_item: { code: "gudgeon", quantity: 1 },
        craft_item: { code: "cooked_gudgeon", quantity: 1 },
        bank_location: { x: 4, y: 1 }
    });
}

await gather_gudgeon();