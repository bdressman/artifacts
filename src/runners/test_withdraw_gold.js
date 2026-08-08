// Quick and dirty testing of bank withdraw gold endpoint
// Assume:  Character is on bank tile
//          Character has 1 gold in bank
import { config } from "../config.js";
import { withdraw_gold } from "../api/bank/withdraw_gold.js";
import { perform } from '../utils/perform.js'

const character = config.CHARACTERS[0];

// Withdraw one gold
const result = await perform(() => withdraw_gold(character, 1));
console.log(result);