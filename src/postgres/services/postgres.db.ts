import db from "../../postgres/knex.js";
import { TypeWarehouse } from "#config/types/warehouse.js";
import env from "#config/env/env.js";
import { v4 } from "uuid";

function parseNumeric(value: string | number | undefined | null): number | null {
  if (value === undefined || value === null || value === "-") return null;
  const num = Number(value);
  return isNaN(num) ? null : num;
}

export async function saveToDb(warehouses: TypeWarehouse[]): Promise<void> {
  const today = new Date().toISOString().split("T")[0];

  const rows = warehouses.map((warehouse: TypeWarehouse) => ({
    spreadsheetid: v4(),
    warehouseName: warehouse.warehouseName ?? "-",
    geoName: warehouse.geoName ?? "-",
    boxDeliveryBase: parseNumeric(warehouse.boxDeliveryBase) ?? "-",
    boxDeliveryCoefExpr: parseNumeric(warehouse.boxDeliveryCoefExpr) ?? "-",
    boxDeliveryLiter: parseNumeric(warehouse.boxDeliveryLiter) ?? "-",
    boxDeliveryMarketplaceBase: parseNumeric(warehouse.boxDeliveryMarketplaceBase) ?? "-",
    boxDeliveryMarketplaceCoefExpr: parseNumeric(warehouse.boxDeliveryMarketplaceCoefExpr) ?? "-",
    boxDeliveryMarketplaceLiter: parseNumeric(warehouse.boxDeliveryMarketplaceLiter) ?? "-",
    boxStorageBase: parseNumeric(warehouse.boxStorageBase) ?? "-",
    boxStorageCoefExpr: parseNumeric(warehouse.boxStorageCoefExpr) ?? "-",
    boxStorageLiter: parseNumeric(warehouse.boxStorageLiter) ?? "-",
    date: today,
  }));
  console.log("rows: ", rows)

  console.log("Saving to DB:", rows.length, "rows");

  await db("spreadsheets")
    .insert(rows)
    .onConflict(["spreadsheetid"])
    .merge();
}

export async function getWareHouses(): Promise<TypeWarehouse[]> {
  return await db("spreadsheets").select("*");
}
