import { v4 } from "uuid";

/** @param {import("knex").Knex} knex */
export async function seed(knex) {
    await knex("spreadsheets").insert([
        {
            spreadsheetid: v4(),
            warehouseName: "Default Warehouse",
            geoName: "Default Geo",
            boxDeliveryBase: "0",
            boxDeliveryCoefExpr: "0",
            boxDeliveryLiter: "0",
            boxDeliveryMarketplaceBase: "0",
            boxDeliveryMarketplaceCoefExpr: "0",
            boxDeliveryMarketplaceLiter: "0",
            boxStorageBase: "0",
            boxStorageCoefExpr: "0",
            boxStorageLiter: "0",
            date: new Date().toISOString().split("T")[0], // например '2025-10-28'
        },
    ]);
}
