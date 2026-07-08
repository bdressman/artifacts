import { config } from "../config.js";
import { move } from "../api/move.js";

// Move to ash tree according to original tutorial entry #5

try {
  const { destination, cooldown } = await move(config.CHARACTERS[0], -1, 0);
  console.log(`✅ Moved to (${destination.x}, ${destination.y}) on ${destination.name}`);
  console.log(`⏳ Cooldown started: ${cooldown.total_seconds} seconds`);

} catch (error) {
  console.error("❌ " + error);
}