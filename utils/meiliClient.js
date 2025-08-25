const { MeiliSearch } = require("meilisearch");
const dotenv = require("dotenv");

dotenv.config();

const meiliClient = new MeiliSearch({
  host: process.env.MEILI_URL,
  apiKey: process.env.MEILI_MASTER_KEY,
});

async function ensureIndex() {
  try {
    const index = await meiliClient.getIndex("pdfs");
    
    if (index.primaryKey !== "id") {
      await meiliClient.updateIndex('pdfs', {
        primaryKey: 'id'
      });
    } 

  } catch (err) {
    if (err.cause.code === "index_not_found") {
      await meiliClient.createIndex("pdfs", { primaryKey: "id" });
      
    } else {
      throw err;
    }
  }

  const index = meiliClient.index("pdfs");
  await index.updateFilterableAttributes(["pdfId", "type"]);
}

ensureIndex().catch((err) => console.error(err));

module.exports = {meiliClient};