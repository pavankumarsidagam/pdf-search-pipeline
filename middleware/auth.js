const dotenv = require("dotenv");

dotenv.config();

const authorize = (req, res, next) => {
    try{
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ error: "Missing Authorization header" });
        }

        const token = authHeader.split(" ")[1];
        if (!token || token !== process.env.API_SECRET_KEY) {
            return res.status(403).json({ error: "Invalid or missing token" });
        }
        
        next();
    } catch {
        console.error("Authorization error:", err);
        res.status(500).json({ error: "Authorization middleware error" });
    }
}

module.exports = { authorize };