const mongoose = require("mongoose");

const PdfContentSchema = new mongoose.Schema(
  {
    pdfId: { type: String, required: true, index: true },
    type: { type: String, enum: ["paragraph", "table", "image"], required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("pdfcontent", PdfContentSchema);
