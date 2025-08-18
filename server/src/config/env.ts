import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
});

const requiredEnvVars = [
    "MONGO_URI",
    "ACCESS_TOKEN_CODE",
    "ACCESS_TOKEN_EXPIRY",
    "REFRESH_TOKEN_CODE",
    "REFRESH_TOKEN_EXPIRY",
] as const;

for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
        // The process will exit if a required environment variable is not found.
        console.error(`Error: Missing required environment variable: ${varName}`);
        process.exit(1);
    }
}

// We can now safely assert the types as the check above ensures they are defined.
export const env = {
    port: process.env.PORT || "5500",
    environment: process.env.ENVIRONMENT || "development",

    mongoURI: process.env.MONGO_URI ,

    accessTokenCode: process.env.ACCESS_TOKEN_CODE,
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,

    refreshTokenCode: process.env.REFRESH_TOKEN_CODE,
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,

};
