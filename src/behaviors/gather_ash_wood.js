import { gather_resource } from "./gather_resource.js";
import { config } from "../config.js";

async function gather_ash_wood(character) {
    await gather_resource({
        character,
        resource_location: { name: "ash tree", x: -1, y: 0 },
        workshop_location: { name: "woodcutting", x: -2, y: -3 },
        raw_item: { code: "ash_wood", quantity: 10 },
        craft_item: { code: "ash_plank", quantity: 1 },
        bank_location: { x: 4, y: 1 }
    });
}

//await gather_ash_wood(process.argv[2]);


await Promise.all(
    config.CHARACTERS.map(character => gather_ash_wood(character))
);