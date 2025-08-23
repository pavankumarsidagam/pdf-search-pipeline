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
  } catch (err) {
    await meiliClient.createIndex("pdfs", { primaryKey: "id" });
  }

  const index = meiliClient.index("pdfs");
  await index.updateFilterableAttributes(["pdfId", "type"]);
}

ensureIndex();

module.exports = {meiliClient};