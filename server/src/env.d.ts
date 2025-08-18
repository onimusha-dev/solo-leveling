declare namespace NodeJS {
    export interface ProcessEnv {
        PORT?: string;
        ENVIRONMENT: 'development' | 'production' | 'testing';

        MONGO_URI: string;

        ACCESS_TOKEN_CODE?: string;
        ACCESS_TOKEN_EXPIRY?: `${number}m`;

        REFRESH_TOKEN_CODE?: string;
        REFRESH_TOKEN_EXPIRY?: `${number}d`;
    
    }
}
