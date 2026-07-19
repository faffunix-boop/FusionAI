const express = require("express");
const cors = require("cors");
const path = require("path");

const { runPipeline } = require("./pipeline/pipeline");

const app = express();

app.use(cors());
app.use(express.json());

const distPath = path.join(__dirname, "..", "dist");
app.use(express.static(distPath));

app.post("/chat", async (req, res) => {
  const { question, history } = req.body;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  if (res.flushHeaders) res.flushHeaders();

  function sendStatus(text) {
    res.write(`data: ${JSON.stringify({
      type: "status",
      text
    })}\n\n`);
  }

  function sendAnswer(text) {
    res.write(`data: ${JSON.stringify({
      type: "answer",
      text
    })}\n\n`);
    res.end();
  }

  function sendError(text) {
    res.write(`data: ${JSON.stringify({
      type: "error",
      text
    })}\n\n`);
    res.end();
  }

  try {
    if (!question || !question.trim()) {
      return sendError("Mesej tak boleh kosong.");
    }

    sendStatus("🚀 Menjalankan Nexa Pipeline...");

    const answer = await runPipeline({
      question,
      history: history || [],
      sendStatus
    });

    sendAnswer(answer);

  } catch (err) {
    console.error(err);
    sendError(err.message || "Pipeline Error");
  }
});

app.use((req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Nexa Server Running : ${port}`);
});
