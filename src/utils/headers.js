import { config } from "../config.js"

export const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${config.TOKEN}`
};