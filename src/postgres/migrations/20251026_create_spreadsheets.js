/** @param {import("knex").Knex} knex */
export async function up(knex) {
    const exists = await knex.schema.hasTable("spreadsheets");
    if (!exists) {
        await knex.schema.createTable("spreadsheets", (table) => {
            table.string("spreadsheetid", 255).primary();
            table.string("warehouseName", 255).defaultTo("Default Warehouse");
            table.string("geoName", 255).defaultTo("Default Geo");
            table.string("boxDeliveryBase", 255);
            table.string("boxDeliveryCoefExpr", 255);
            table.string("boxDeliveryLiter", 255);
            table.string("boxDeliveryMarketplaceBase", 255);
            table.string("boxDeliveryMarketplaceCoefExpr", 255);
            table.string("boxDeliveryMarketplaceLiter", 255);
            table.string("boxStorageBase", 255);
            table.string("boxStorageCoefExpr", 255);
            table.string("boxStorageLiter", 255);
            table.string("date", 255);
        });
    } else {
        const columns = [
            { name: "warehouseName", defaultTo: "Default Warehouse" },
            { name: "geoName", defaultTo: "Default Geo" },
            { name: "boxDeliveryBase" },
            { name: "boxDeliveryCoefExpr" },
            { name: "boxDeliveryLiter" },
            { name: "boxDeliveryMarketplaceBase" },
            { name: "boxDeliveryMarketplaceCoefExpr" },
            { name: "boxDeliveryMarketplaceLiter" },
            { name: "boxStorageBase" },
            { name: "boxStorageCoefExpr" },
            { name: "boxStorageLiter" },
            { name: "date" },
        ];

        for (const col of columns) {
            const hasColumn = await knex.schema.hasColumn("spreadsheets", col.name);
            if (!hasColumn) {
                await knex.schema.alterTable("spreadsheets", (table) => {
                    if (col.defaultTo !== undefined) {
                        table.string(col.name, 255).defaultTo(col.defaultTo);
                    } else {
                        table.string(col.name, 255);
                    }
                });
            }
        }
    }
}

/** @param {import("knex").Knex} knex */
export async function down(knex) {
    await knex.schema.dropTableIfExists("spreadsheets");
}
