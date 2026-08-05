import fs from 'node:fs/promises';

const log_dir = "./logs";
const log_file = `${log_dir}/artifacts.log`;
await fs.mkdir(log_dir, { recursive: true });



async function write_log(level, message) {
    try {

        // ex: 08/05/2026, 01:32:39 AM
        const timestamp = new Date().toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });

        await fs.appendFile(log_file, `[${timestamp}] [${level}] ${message}\n`);
    } catch (error) {
        console.error("Could not write to log file.", error);
    }
}

// Normal progress information
function info(message) {
    return write_log("INFO", message);
}

// Expected game-state conditions
function warn(message) {
    return write_log("WARN", message);
}

// Unexpected technical failures
function fail(message) {
    return write_log("FAIL", message);
}

// Intentional shutdown
async function halt(message) {
    await write_log("HALT", message);

    process.exit(1);
}

export default {
    info,
    warn,
    fail,
    halt,
};
