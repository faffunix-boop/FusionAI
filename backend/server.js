const express = require("express");
const cors = require("cors");
const path = require("path");
const fusionAnswer = require("./fusion");

const app = express();

app.use(cors());
app.use(express.json());

// Memberitahu server untuk hantar fail index.html apabila orang buka laman web
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route untuk AI chat
app.post("/chat", async (req, res) => {
    try {
        let jawapan = await fusionAnswer(req.body.question);
        res.json({ answer: jawapan });
    } catch (error) {
        res.status(500).json({ error: "Ada masalah pada server" });
    }
});

// Guna port dari Render atau 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server jalan di port ${port}!`);
});

