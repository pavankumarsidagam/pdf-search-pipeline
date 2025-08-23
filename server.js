const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./routes/routes"); 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/", router)

app.get("/", (req, res) => {
  res.send("PDF Search Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});