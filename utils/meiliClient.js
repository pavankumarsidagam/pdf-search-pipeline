const { MeiliSearch } = require("meilisearch");
const dotenv = require("dotenv");

dotenv.config();

const meiliClient = new MeiliSearch({
  host: process.env.MEILI_URL,
  apiKey: process.env.MEILI_MASTER_KEY,
});

module.exports = {meiliClient};