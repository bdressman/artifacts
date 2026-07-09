export async function waitForCooldown(cooldown) {
    if(!cooldown?.expiration)
        return;

    const expiration = new Date(cooldown.expiration);
    const delay = expiration.getTime() - Date.now();

    if (delay > 0) {
        console.log(`⏳ Waiting ${Math.ceil(delay / 1000)} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
    }
}