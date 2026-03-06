import React, { useRef, useState } from "react";
import "./Chat.css";
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const inputMessage = useRef();

  const addMessage = (e) => {
    e.preventDefault();
    const message = inputMessage.current.value;
    if (message) {
      setMessages((prev) => [...prev, message]);
    }
  };

  return (
    <>
      <div className="card">
        <div className="chat-header">Chat</div>
        <div className="chat-window">
          <ul className="message-list">
            {messages.length <= 0 ? (
              <p className="text-center"> No messages Now</p>
            ) : (
              messages.map((message, idx) => {
                return (
                  <li
                    key={idx}
                    className={idx % 2 == 0 ? "text-start" : "text-end"}
                  >
                    {" "}
                    {message}{" "}
                  </li>
                );
              })
            )}
          </ul>
        </div>
        <div className="chat-input">
          <div></div>
          <input
            type="text"
            ref={inputMessage}
            className="message-input"
            placeholder="Type your message here"
          />
          <button className="send-button" onClick={addMessage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-send"
            >
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
