import 'dotenv/config'

export const config = {
    TOKEN: process.env.ARTIFACTS_API_TOKEN,
    CHARACTERS: process.env.ARTIFACTS_CHARACTERS.split(","),
};