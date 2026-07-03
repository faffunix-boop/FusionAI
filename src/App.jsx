import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, load]);

  async function send() {
    if (!msg.trim() || load) return;

    const text = msg;
    setChat((prev) => [...prev, { type: "user", text }]);
    setMsg("");
    setLoad(true);
    setError(null);

    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });

      if (!res.ok) {
        throw new Error(`Server balas status ${res.status}`);
      }

      const data = await res.json();

      setChat((prev) => [...prev, { type: "ai", text: data.answer }]);
    } catch (err) {
      setError("Gagal hubungi server. Cuba refresh — server mungkin baru 'bangun' dari sleep.");
      setChat((prev) => [
        ...prev,
        { type: "ai", text: "⚠️ Maaf, saya tak dapat balas sekarang. Sila cuba lagi." },
      ]);
      console.error(err);
    } finally {
      setLoad(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="app">
      <div className="top">
        <div className="mark">
          <span className="mark-cyan" />
          <span className="mark-coral" />
        </div>
        <div>
          <h1>FusionAI</h1>
          <p>Gemini + Groq Intelligence</p>
        </div>
      </div>

      <div className="chat">
        {chat.length === 0 && !load && (
          <div className="empty-state">
            <div className="empty-mark">
              <span className="mark-cyan" />
              <span className="mark-coral" />
            </div>
            <p>Tanya apa sahaja. Saya sedia bantu.</p>
          </div>
        )}

        {chat.map((c, i) => (
          <div key={i} className={`row row-${c.type}`}>
            {c.type === "ai" && (
              <span className="msg-mark">
                <span className="mark-cyan" />
                <span className="mark-coral" />
              </span>
            )}
            <div className={c.type}>{c.text}</div>
          </div>
        ))}

        {load && (
          <div className="row row-ai">
            <span className="msg-mark">
              <span className="mark-cyan" />
              <span className="mark-coral" />
            </span>
            <div className="ai typing">
              <span className="typing-label">AI sedang berfikir</span>
              <span className="core" />
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="inputBox">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tanya sesuatu..."
          disabled={load}
        />
        <button onClick={send} disabled={load || !msg.trim()} aria-label="Hantar">
          ➤
        </button>
      </div>
    </div>
  );
}

export default App;
