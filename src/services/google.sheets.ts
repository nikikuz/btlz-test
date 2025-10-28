import { TypeWarehouse } from "#config/types/warehouse.js";
import { auth } from "#utils/google.api.js";
import { google, sheets_v4 } from "googleapis";

export async function saveToSheets(
  data: TypeWarehouse[]
): Promise<sheets_v4.Schema$UpdateValuesResponse | void> {
  try {
    if (!data.length) {
      console.log("No data to save.");
      return;
    }

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.SPREADSHEET_ID!;
    const sheetName = "stocks_coefs";

    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetExists = spreadsheet.data.sheets?.some(
      (s) => s.properties?.title === sheetName
    );

    if (!sheetExists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              addSheet: { properties: { title: sheetName } },
            },
          ],
        },
      });
      console.log(`Sheet "${sheetName}" created`);
    }

    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: `${sheetName}!A1:Z1000`,
    });
    console.log(`Sheet "${sheetName}" cleared`);

    const header = [
      [
        "geoName",
        "warehouseName",
        "boxDeliveryBase",
        "boxDeliveryCoefExpr",
        "boxDeliveryLiter",
        "boxDeliveryMarketplaceBase",
        "boxDeliveryMarketplaceCoefExpr",
        "boxDeliveryMarketplaceLiter",
        "boxStorageBase",
        "boxStorageCoefExpr",
        "boxStorageLiter",
      ],
    ];

     const values = data.map((w: TypeWarehouse) => [
      w.geoName,
      w.warehouseName,
      w.boxDeliveryBase,
      w.boxDeliveryCoefExpr,
      w.boxDeliveryLiter,
      w.boxDeliveryMarketplaceBase,
      w.boxDeliveryMarketplaceCoefExpr,
      w.boxDeliveryMarketplaceLiter,
      w.boxStorageBase,
      w.boxStorageCoefExpr,
      w.boxStorageLiter
    ]);

    const allValues = [...header, ...values];

    const lastRow = allValues.length;
    const lastCol = String.fromCharCode(64 + allValues[0].length); // K для 11 колонок
    const range = `${sheetName}!A1:${lastCol}${lastRow}`;

    const result = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: { values: allValues },
    });

    console.log("Google Sheets updated successfully:", result.data.updatedRows);
    console.log("First rows to send to Sheets:", values.slice(0, 10));

    const check = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:${lastCol}${lastRow}`,
    });
    console.log("Spreadsheet first 5 rows:", JSON.stringify(check.data.values));

    return result.data;
  } catch (error) {
    console.error("Google Sheets Error:", error);
  }
}
