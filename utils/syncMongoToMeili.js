const pdfcontent = require('../models/pdfcontent');
const { meiliClient } = require('./meiliClient');


async function ensureIndex() {

    try {
        let index;

        try {
            index = await meiliClient.getIndex("pdfs");
            if (index.primaryKey !== "id") {
                await meiliClient.updateIndex('pdfs', {
                    primaryKey: 'id'
                });
            }

        } catch (err) {
            if (err.cause?.code === "index_not_found") {
                index = await meiliClient.createIndex("pdfs", { primaryKey: "id" });
            } else {
                throw err;
            }
        }

        try {
            await index.updateFilterableAttributes(["pdfId", "type"]);
        } catch (err) {
            console.warn("Could not update filterable attributes:", err.message);
        }
        
        return index;

    } catch (err) {
        console.error("Index creation error:", err);
        throw err;
    }
}

async function syncMongoToMeili() {
    try {
        const index = await ensureIndex();

        const contents = await pdfcontent.find({});
        if (contents.length === 0) {
            console.log("No existing data in MongoDB to sync.");
            return;
        }

        const docs = contents.map((c, i) => ({
            id: `${c.pdfId}_${c.type}_${i}`,
            pdfId: c.pdfId,
            type: c.type,
            content: c.content,
        }));

        await index.addDocuments(docs, { primaryKey: "id" });
        console.log(`Synced ${docs.length} docs from MongoDB to Meilisearch`);
    } catch (err) {
        console.error("Sync error:", err);
    }
}

module.exports = { ensureIndex, syncMongoToMeili };


