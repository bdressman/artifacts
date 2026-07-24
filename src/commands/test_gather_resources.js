import { gather_resources } from "./gather_resources.js";
import { config } from "../config.js";

const character = config.CHARACTERS[0];

async function test_gather_resources() {
    console.log("Enter test_gather_resources()");


    try {
        console.log("Gathering...");
        await gather_resources(character);

        console.log("Exiting to avoid rate limit!");
        return;
    }
    catch(error) {
        console.log(error);
    }
}

await test_gather_resources();