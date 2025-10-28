import axios from "axios";
import env from '#config/env/env.js'
import { getWareHouses, saveToDb } from "#postgres/services/postgres.db.js";
import { saveToSheets } from "./google.sheets.js";

export async function fetchWarehouses(): Promise<void> {
  try {
    const today = new Date().toISOString().slice(0, 10);

    const response = await axios.get(env.WB_API_URL, {
      headers: {
        Authorization: env.WB_TOKEN,
        Accept: "application/json",
      },
      params: {
        date: today,
      },
    });

    console.log("Received Data: ", response.data.response.data.warehouseList);

    const warehouses = response.data.response.data.warehouseList;

    await saveToDb(warehouses)
    await saveToSheets(await getWareHouses())
  } catch (error: any) {
    console.error("WB API Error:");
    console.error(error.response?.status, error.response?.data || error.message);
  }
}

