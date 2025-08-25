const { meiliClient } = require("../utils/meiliClient");
const pdfcontent = require("../models/pdfcontent");
const { v4: uuidv4 } = require("uuid");


const ingestPDFData = async (req, res) => {
  try {
    const data = req.body;

    if (!data.pdfId || !data.paragraphs) {
      return res.status(400).json({ error: "Invalid data format" });
    }

    let pdfId = data.pdfId;
    const existing = await pdfcontent.findOne({ pdfId: data.pdfId });

    if (existing) {
      pdfId = `${data.pdfId}_${uuidv4().slice(0, 3)}`; 
    }

    const index = meiliClient.index("pdfs");
    const docs = [];

    data.paragraphs.forEach((p, i) => {
      docs.push({
        id: `${pdfId}_p${i}`,
        pdfId: pdfId,
        type: "paragraph",
        content: typeof p === "string" ? p.trim() : (p.text || "").trim()
      });
    });

    (data.tables || []).forEach((t, i) => {
      docs.push({
        id: `${pdfId}_t${i}`,
        pdfId: pdfId,
        type: "table",
        content: t.content ? String(t.content).trim() : ""
      });
    });

    (data.images || []).forEach((img, i) => {
      docs.push({
        id: `${pdfId}_i${i}`,
        pdfId: pdfId,
        type: "image",
        content: img.caption ? String(img.caption).trim() : ""
      });
    });

    if (docs.length === 0) {
      return res.status(400).json({ error: "No documents to ingest" });
    }

    // console.log(docs);

    await index.addDocuments(docs, { primaryKey: "id" });

    await pdfcontent.insertMany(
      docs.map((d) => ({
        pdfId: d.pdfId,
        type: d.type,
        content: d.content,
        createdAt: new Date(),
      }))
    );

    res.json({ success: true, message: `Data ingested. Reference pdfId: ${pdfId}`, finalpdfId: pdfId, docsCount: docs.length });
  } catch (err) {
    console.error("Ingest error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { ingestPDFData };
