// Quick and dirty testing of bank withdraw endpoint
// Assume:  Character is on bank tile
//          Bank has a sunflower
import { config } from "../config.js";
import { withdraw_item } from "../api/bank/withdraw_item.js";
import { perform } from '../utils/perform.js'

const character = config.CHARACTERS[0];

// Pull out one sunflower
const result = await perform(() => withdraw_item(character, "sunflower", 1));
console.log(result);