import { waitForCooldown } from "./cooldown.js";

export async function perform(action) {
    console.log("Enter perform()");

    const result = await action();

    await waitForCooldown(result.cooldown);

    return result;
}