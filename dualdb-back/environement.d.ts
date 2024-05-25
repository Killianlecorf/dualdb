declare namespace NodeJS {
    interface ProcessEnv {
        PORT: number,
        DB_NAME: string,
        DB_USER:string,
        DB_PASS: string,
        DB_PORT:string,
        JWT_SECRET:string,
        URI_DB:string
    }
}