const express = require("express");
const cors = require("cors");
const fusionAnswer = require("./fusion");

const app = express();

app.use(cors());
app.use(express.json());

// 1. Route utama (untuk elak error "Cannot GET /")
app.get("/", (req, res) => {
    res.send("Server berjalan dengan baik!");
});

// 2. Route untuk AI chat
app.post("/chat", async (req, res) => {
    try {
        let jawapan = await fusionAnswer(req.body.question);
        res.json({
            answer: jawapan
        });
    } catch (error) {
        res.status(500).json({ error: "Ada masalah pada server" });
    }
});

// 3. Guna process.env.PORT (penting untuk Render)
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server jalan di port ${port}!`);
});

