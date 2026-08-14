// We'll start this out as a probing of having multiple characters.
// I now have all 5 characters loaded up and am ready to start building scheduling
//

import { config } from "../config.js";
import { get_character } from "../api/get_character.js";
import { perform } from "../utils/perform.js";

// First, let's just see who we're working with:
console.log(`You are playing with ${config.CHARACTERS.length} characters.`);
console.log(`Their names are: ${config.CHARACTERS}`);

// Let's load them all up with get_character API call
const characters = [];
let result;
for(const character of config.CHARACTERS) {
    result = await perform(() => get_character(character));
    characters.push(result);
}

; // hold for breakpoint