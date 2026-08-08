// Quick and dirty testing of bank deposit gold endpoint
// Assume:  Character is on bank tile
//          Character has 1 gold in inventory
import { config } from "../config.js";
import { deposit_gold } from "../api/bank/deposit_gold.js";
import { perform } from '../utils/perform.js'

const character = config.CHARACTERS[0];

// Deposit one gold
const result = await perform(() => deposit_gold(character, 1));
console.log(result);