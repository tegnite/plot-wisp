import dotenv from "dotenv";
const ENV_KEYS = [
    "MONGO_URI",
    "DB_NAME",
    "JWT_SECRET",
    "CLIENT_WEB_ORIGIN",
    "NODE_ENV",
    "PORT",
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
    "AWS_REGION",
] as const;

export type ENV_KEYS_TYPE = (typeof ENV_KEYS)[number];
dotenv.config();
export function get_env(key: ENV_KEYS_TYPE): string {
    const value = process.env[key];
    if (!value)
        throw new Error(
            `Environment key ${key} is not defined in the environment variables(.env)`
        );
    return value;
}
