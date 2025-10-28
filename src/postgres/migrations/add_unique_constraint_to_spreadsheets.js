/** @param {import("knex").Knex} knex */
export async function up(knex) {
    const exists = await knex.schema.hasTable("spreadsheets");
    if (!exists) {
        await knex.schema.createTable("spreadsheets", (table) => {
            table.increments("id").primary();
            table.string("spreadsheetid", 255).notNullable().unique();
            table.string("warehouseName", 255).notNullable().defaultTo("Default Warehouse");
            table.string("geoName", 255).notNullable().defaultTo("Default Geo");
            table.string("boxDeliveryBase", 255);
            table.string("boxDeliveryCoefExpr", 255);
            table.string("boxDeliveryLiter", 255);
            table.string("boxDeliveryMarketplaceBase", 255);
            table.string("boxDeliveryMarketplaceCoefExpr", 255);
            table.string("boxDeliveryMarketplaceLiter", 255);
            table.string("boxStorageBase", 255);
            table.string("boxStorageCoefExpr", 255);
            table.string("boxStorageLiter", 255);
            table.string("date", 255).notNullable();
        });
    }
}

/** @param {import("knex").Knex} knex */
export async function down(knex) {
    await knex.schema.dropTableIfExists("spreadsheets");
}
