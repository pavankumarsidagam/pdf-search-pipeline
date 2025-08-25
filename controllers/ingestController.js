const { meiliClient } = require("../utils/meiliClient");

const ingestPDFData = async (req, res) => {
  try {
    const data = req.body;

    if (!data.pdfId || !data.paragraphs) {
      return res.status(400).json({ error: "Invalid data format" });
    }

    const index = meiliClient.index("pdfs");
    const docs = [];

    data.paragraphs.forEach((p, i) => {
      docs.push({
        id: `${data.pdfId}_p${i}`,
        pdfId: data.pdfId,
        type: "paragraph",
        content: typeof p === "string" ? p.trim() : (p.text || "").trim()
      });
    });

    (data.tables || []).forEach((t, i) => {
      docs.push({
        id: `${data.pdfId}_t${i}`,
        pdfId: data.pdfId,
        type: "table",
        content: t.content ? String(t.content).trim() : ""
      });
    });

    (data.images || []).forEach((img, i) => {
      docs.push({
        id: `${data.pdfId}_i${i}`,
        pdfId: data.pdfId,
        type: "image",
        content: img.caption ? String(img.caption).trim() : ""
      });
    });

    if (docs.length === 0) {
      return res.status(400).json({ error: "No documents to ingest" });
    }

    // console.log(docs);

    await index.addDocuments(docs, { primaryKey: "id" });

    res.json({ success: true, message: "Data ingested", docsCount: docs.length });
  } catch (err) {
    console.error("Ingest error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { ingestPDFData };
