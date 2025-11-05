import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([{ id: 1, role: "bot", text: "Hi! How can i help you 👩‍🍳 ?" }]);
  const [input, setInput] = useState("");


  async function send() {
    const text = input.trim();
    if (!text) return;

    setMessages((m) => [...m, { id: Date.now(), role: "user", text }]); // date bach ykon dima unique
    setInput("");
    
    const API_KEY = "test";  // ms7t lapi key dyali 
    try {
      const system = `
You are a cooking-only assistant.
Reply ONLY about cooking and recipes.
Answer in clear plain text only — no Markdown, no symbols, no tables, no emojis and no ** .
When replying, use the user's language and stay neutral.
`;

      const history = [
        { role: "system", content: system },
        ...messages.map(m => ({ role: m.role === "bot" ? "assistant" : "user", content: m.text })),
        { role: "user", content: text }
      ];

      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "Foodio",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b:free",
          messages: history,
          temperature: 0.7
        })
      });

      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content || "error try again please !";
      setMessages((m) => [...m, { id: Date.now() + 1, role: "bot", text: reply }]);
    } catch {
      setMessages((m) => [...m, { id: Date.now() + 2, role: "bot", text: "error internet try again please !" }]);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    send();
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  }

  return (
    <main className="chat-page">
      <header className="chat-header">
        <div className="chat-brand">
          <span className="chat-badge"><ChefHatIcon /></span>
          <div>
            <h2 className="chat-title">Cook Assistant</h2>
            <p className="chat-sub">Meal suggestions • Ingredients • Steps</p>
          </div>
        </div>
      </header>

      <section className="chat-thread">
        {messages.map((m) => (
          <div key={m.id} className={`chat-bubble ${m.role === "user" ? "is-user" : "is-bot"}`}>
            {m.role === "bot" && <span className="chat-avatar"><ChefHatIcon /></span>}
            <p className="chat-text" style={{ whiteSpace: "pre-line" }}>{m.text}</p>
          </div>
        ))}
      </section>

      <form className="chat-inputbar" onSubmit={onSubmit}>
        <textarea
          className="chat-input"
          placeholder="Ask here ....."
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button className="chat-send" type="submit">Send</button>
      </form>
    </main>
  );
}

function ChefHatIcon(){
  return (
    <svg viewBox="0 0 24 24" width="16" height="16">
      <path fill="#e11d48" d="M7 11H5v7h14v-7h-2v5H7v-5zM12 3a5 5 0 0 0-5 5h10a5 5 0 0 0-5-5z"/>
    </svg>
  );
}
