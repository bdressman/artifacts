import { config } from './config.js';

console.log(config.TOKEN ? "API Token Loaded" : "API Token Missing");
console.log(config.CHARACTERS ? `Characters: ${config.CHARACTERS}` : "No character listing");