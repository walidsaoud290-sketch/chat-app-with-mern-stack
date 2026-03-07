import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { io } from "socket.io-client";
const Chat = () => {
  const socket = io("http://localhost:5000");
  const [messages, setMessages] = useState([]);
  const inputMessage = useRef();
  const inputImage = useRef();

  const addMessage = (e) => {
    e.preventDefault();
    const message = inputMessage.current.value;
    if (message) {
      socket.emit("send_message", message);
      setMessages((prev) => [...prev, message]);
      inputMessage.current.value = "";
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

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
                    className={idx % 2 == 0 ? "text-end" : "text-start"}
                  >
                    {message}
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
            className="message-input"
            ref={inputMessage}
            placeholder="Type your message here"
          />
          <button className="image_upload" onClick={()=>inputImage.current.click()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-card-image"
              viewBox="0 0 16 16"
            >
              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
              <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z" />
            </svg>
          </button>
          <input ref={inputImage} type="file" style={{ display: "none" }} name="" id="" />
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
