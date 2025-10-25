import { randomBytes } from "crypto";

export async function GenerateSessionId() {
    return randomBytes(16).toString("hex")
}