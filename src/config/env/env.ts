import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { z } from 'zod'

const envPath = resolve(process.cwd(), '.env');
dotenv.config({ path: envPath });

console.log('Using .env from:', envPath);
console.log('POSTGRES_DB =', process.env.POSTGRES_DB);

const envSchema = z.object({
    NODE_ENV: z.union([z.undefined(), z.enum(["development", "production"])]),
    POSTGRES_HOST: z.string(),
    POSTGRES_PORT: z
        .string()
        .regex(/^[0-9]+$/)
        .transform((value) => parseInt(value, 10)),
    POSTGRES_DB: z.string(),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    APP_PORT: z.union([
        z.undefined(),
        z
            .string()
            .regex(/^[0-9]+$/)
            .transform((value) => parseInt(value, 10)),
    ]),
    WB_TOKEN: z.string(),
    WB_API_URL: z.string().url(),
    spreadsheetid: z.string(),
});

const env = envSchema.parse({
    NODE_ENV: process.env.NODE_ENV,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    APP_PORT: process.env.APP_PORT,
    WB_TOKEN: process.env.WB_TOKEN,
    WB_API_URL: process.env.WB_API_URL,
    spreadsheetid: process.env.spreadsheetid,
});

console.log('Parsed env:', env);

export default env;
