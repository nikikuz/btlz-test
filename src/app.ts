import { migrate, seed } from "#postgres/knex.js";
import { fetchWarehouses } from "#services/wb.api.js";
import cron from "node-cron";

await migrate.latest();
await seed.run();

cron.schedule('0 * * * *', async () => {
    console.log('Fetching warehouses...');
    await fetchWarehouses();
    console.log('Warehouses fetched successfully!');
});
console.log("All migrations and seeds have been run");