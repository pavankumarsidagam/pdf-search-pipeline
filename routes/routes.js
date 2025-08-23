const express = require("express");
const { authorize } = require("../middleware/auth");
const { ingestPDFData } = require("../controllers/ingestController");
const { searchPDFData } =  require("../controllers/searchController");


const router = express.Router();

router.post("/ingest", authorize, ingestPDFData);
router.post("/search", authorize, searchPDFData);

module.exports = router;