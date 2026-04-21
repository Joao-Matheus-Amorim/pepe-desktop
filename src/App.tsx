import { useState, useRef, useEffect } from "react";
import { sendMessage } from "./api/pepe";
import "./App.css";

type Message = { role: "user" | "pepe"; text: string };

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    const resposta = await sendMessage(userMsg);
    setMessages((prev) => [...prev, { role: "pepe", text: resposta }]);
    setLoading(false);
  }

  return (
    <div className="app">
      <header><h1>🤖 Pepê AI</h1></header>

      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={`bubble ${msg.role}`}>
            <span>{msg.text}</span>
          </div>
        ))}
        {loading && <div className="bubble pepe typing">Pepê está digitando...</div>}
        <div ref={bottomRef} />
      </div>

      <div className="input-bar">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Fale com o Pepê..."
        />
        <button onClick={handleSend} disabled={loading}>Enviar</button>
      </div>
    </div>
  );
}