const express = require("express");
const cors = require("cors");
const path = require("path");
const fusionAnswer = require("./fusion");

const app = express();

app.use(cors());
app.use(express.json());

// Serve hasil build React (dist/ kat root, satu tingkat atas backend/)
const distPath = path.join(__dirname, "..", "dist");
app.use(express.static(distPath));

// Route untuk AI chat
app.post("/chat", async (req, res) => {
    try {
        let jawapan = await fusionAnswer(req.body.question);
        res.json({ answer: jawapan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ada masalah pada server" });
    }
});

// Semua route lain -> hantar index.html React (untuk client-side routing)
app.use((req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});

// Guna port dari Render atau 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server jalan di port ${port}!`);
});
