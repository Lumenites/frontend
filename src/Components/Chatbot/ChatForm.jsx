import React, { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef(null);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";
    // Build next history synchronously for immediacy
    const nextHistory = [...chatHistory, { role: "user", text: userMessage }];
    setChatHistory([...nextHistory, { role: "model", text: "Thinking..." }]);
    // Call immediately (no delay) for faster perceived response
    generateBotResponse(nextHistory);
  };
  return (
    <form onSubmit={handleFormSubmit} className="chat-form">
      <input ref={inputRef} placeholder="Message..." className="message-input" required />
      <button type="submit" id="send-message" aria-label="Send">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12L20 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 5L20 12L13 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </form>
  );
};

export default ChatForm;


