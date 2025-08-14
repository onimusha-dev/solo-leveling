import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

export const env = {
    port: process.env.PORT || 5000,
    environment: process.env.ENVIRONMENT || "development",

    mongoURI: process.env.MONGO_URI,
    dbName: process.env.DB_NAME,

    accessTokenCode: process.env.ACCESS_TOKEN_CODE,
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,

    refreshTokenCode: process.env.REFRESH_TOKEN_CODE,
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,



}

