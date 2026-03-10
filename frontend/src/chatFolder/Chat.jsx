import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { io } from "socket.io-client";

const Chat = () => {
  
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const inputMessage = useRef();
  const inputImage = useRef();

  const addMessage = (e) => {
    e.preventDefault();
    const message = inputMessage.current.value;
    if (message && socket) {
      const messageData = {
        type: "text",
        content: message,
        sender: socket.id,
        timestamp: new Date().toISOString(),
        received: false,
      };
      socket.emit("send_message", messageData);
      inputMessage.current.value = "";
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && socket) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = {
          type: "image",
          content: event.target.result, 
          sender: socket.id,
          timestamp: new Date().toISOString(),
          received: false,
        };

        socket.emit("send_image", imageData);
      };
      console.log(messages);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("receive_image", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("receive_image");
    };
  }, [socket]);

  // Fonction pour rendre un message selon son type
  const renderMessage = (message, idx) => {
    return (
      <li
        key={idx}
        className={message.sender === socket.id ? "text-end" : "text-start"}
      >
        {message.type === "image" ? (
          <div className="image-message">
            <img
              src={message.content}
              alt="Chat content"
              style={{
                maxWidth: "250px",
                maxHeight: "200px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={() => window.open(message.content, "_blank")}
            />
            <div className="message-info">
              <span className="sender">{message.sender}</span>
              <span className="timestamp">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-message">
            <span className="message-content">{message.content}</span>
            <div className="message-info">
              <span className="sender">
                {message.sender === socket.id ? "me" : "other"}{" "}
              </span>
              <br />
              <span className="timestamp">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        )}
      </li>
    );
  };

  return (
    <div className="card">
      <div className="chat-header">Chat</div>
      <div className="chat-window">
        <ul className="message-list">
          {messages.length <= 0 ? (
            <p className="text-center">No messages Now</p>
          ) : (
            messages.map((message, idx) => renderMessage(message, idx))
          )}
        </ul>
      </div>
      <div className="chat-input">
        <input
          type="text"
          className="message-input"
          ref={inputMessage}
          placeholder="Type your message here"
          onKeyPress={(e) => e.key === "Enter" && addMessage(e)}
        />
        <button
          className="image_upload"
          onClick={() => inputImage.current.click()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z" />
          </svg>
        </button>
        <input
          ref={inputImage}
          type="file"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImageUpload}
        />
        <button className="send-button" onClick={addMessage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-send"
            viewBox="0 0 16 16"
          >
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chat;
