const { meiliClient } = require("../utils/meiliClient");


const searchPDFData = async (req, res) => {
    try {
        const { pdfId, query } = req.body;
        console.log(pdfId);
        if (!pdfId || !query) {
            return res.status(400).json({ error: "pdfId and query are required" });
        }

        const paragraphResults = await meiliClient.index("pdfs").search(query, {
            filter: `pdfId = "${pdfId}" AND type = "paragraph"`,
            highlightPreTag: "<em>",
            highlightPostTag: "</em>",
        });

        const tableResults = await meiliClient.index("pdfs").search(query, {
            filter: `pdfId = "${pdfId}" AND type = "table"`,
            highlightPreTag: "<em>",
            highlightPostTag: "</em>",
        });

        const imageResults = await meiliClient.index("pdfs").search(query, {
            filter: `pdfId = "${pdfId}" AND type = "image"`,
            highlightPreTag: "<em>",
            highlightPostTag: "</em>",
        });

        res.json({
            pdfId,
            query,
            results: {
                paragraphs: paragraphResults.hits,
                tables: tableResults.hits,
                images: imageResults.hits,
            },
        });

    } catch (err) {
        console.error("Search error:", err);
        res.status(500).json({ error: "Search failed" });
    }
}

module.exports = { searchPDFData }