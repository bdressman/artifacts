import 'dotenv/config'

const token = process.env.ARTIFACTS_API_TOKEN;
const characters = process.env.ARTIFACTS_CHARACTERS;

if (!token)
    throw new Error("ARTIFACTS_API_TOKEN is not set in .env");

if (!characters)
    throw new Error("ARTIFACTS_CHARACTERS is not set in .env");

export const config = {
    TOKEN: token,
    CHARACTERS: characters.split(",").map(c => c.trim()),
};