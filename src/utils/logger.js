import fs from 'node:fs/promises';

// project root/logs/artifacts.log
const log_dir = "./logs";
const log_file = `${log_dir}/artifacts.log`;
await fs.mkdir(log_dir, {recursive: true});

async function write_log(message) {
    

    try {
        await fs.appendFile(log_file, `${message}\n`);
    } catch (error) {
        console.error("Could not write to log file.", error);
    }
}

export function log(message) {
    return write_log(message);
}

