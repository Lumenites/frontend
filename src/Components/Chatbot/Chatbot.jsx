import React, { useEffect, useRef, useState } from "react";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { companyInfo } from "./companyInfo";
import "./Chatbot.css";

const Chatbot = () => {
  const chatBodyRef = useRef(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { hideInChat: true, role: "model", text: companyInfo },
  ]);

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text, isError },
      ]);
    };
    const systemContext = {
      role: "user",
      parts: [{
        text: `Context:\n${companyInfo}\n\nInstructions: Use the context above to answer the user's questions succinctly (<= 40 words). If the answer isn't in context, reply helpfully based on general knowledge.`
      }],
    };
    const filteredHistory = history
      .filter((m) => !m.hideInChat && m.text !== "Thinking...")
      .slice(-6);
    const contents = [
      systemContext,
      ...filteredHistory.map(({ role, text }) => ({ role, parts: [{ text }] })),
    ];
    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error?.message || "Something went wrong!");
      const apiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text?.replace(/\*\*(.*?)\*\*/g, "$1").trim() || "(No response)";
      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [chatHistory]);

  const closeAndReset = () => {
    setShowChatbot(false);
    setChatHistory([{ hideInChat: true, role: "model", text: companyInfo }]);
  };

  const handleToggle = () => {
    if (showChatbot) {
      closeAndReset();
    } else {
      setShowChatbot(true);
    }
  };

  return (
    <div className={`chatbot-container ${showChatbot ? "show-chatbot" : ""}`}>
      <button onClick={handleToggle} id="chatbot-toggler" aria-label="Open chat">
        <ChatbotIcon size={34} />
      </button>
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">LU LUMEN</h2>
          </div>
          <button onClick={closeAndReset} className="material-symbols-rounded" aria-label="Close chat"></button>
        </div>
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">Hey there\nHow can I help you today?</p>
          </div>
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>
        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;


