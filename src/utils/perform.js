import { waitForCooldown } from "./cooldown.js";

export async function perform(action) {
    const result = await action();

    await waitForCooldown(result.cooldown);

    return result;
}