import { google } from 'googleapis';
import credentials from '../../flash-winter-476221-q3-bbe03f928d2b.json' with { type: "json" }

export const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
})


