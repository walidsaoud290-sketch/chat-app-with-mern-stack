import { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { io } from "socket.io-client";
import { days } from "../days";
import { usePostMethod } from "../fetching_to_backend/to_backend";
import Render from "../renderMessage/Render";

const Chat = ({ userMessage, officialUser }) => {
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);

  const inputMessage = useRef();
  const inputImage = useRef();
  const chatWindowRef = useRef();

  const idx = new Date().getDay();
  const day = days[idx - 1];

  // scroll auto
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  // connection socket
  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_IO);

    socket.emit("join_room", officialUser._id);

    socketRef.current = socket;

    return () => socket.disconnect();
  }, [officialUser._id]);

  // recevoir messages
  useEffect(() => {
    const socket = socketRef.current;

    if (!socket || !userMessage?._id) return;

    const receiveMessage = (data) => {
      if (
        data.senderId === userMessage._id ||
        data.receiverId === userMessage._id
      ) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on("receive_message", receiveMessage);
    socket.on("receive_image", receiveMessage);

    return () => {
      socket.off("receive_message", receiveMessage);
      socket.off("receive_image", receiveMessage);
    };
  }, [userMessage]);

  // envoyer message
  const addMessage = (e) => {
    e.preventDefault();

    const message = inputMessage.current.value;

    if (!message || !socketRef.current) return;

    socketRef.current.emit("send_message", {
      type: "text",
      content: message,
      send_by: officialUser._id,
      send_to: userMessage._id,
      dateTime: new Date(),
    });

    inputMessage.current.value = "";
  };

  // upload image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file || !socketRef.current) return;

    const reader = new FileReader();

    reader.onload = () => {
      socketRef.current.emit("send_image", {
        type: "image",
        message: reader.result,
        send_by: officialUser._id,
        send_to: userMessage._id,
        dateTime: new Date(),
      });
    };

    reader.readAsDataURL(file);
  };

  // récupérer messages DB
  useEffect(() => {
    const getMessages = async () => {
      if (!userMessage?._id) return;

      try {
        const apiMessages = await usePostMethod("/messages/getMessages", {
          userMessage,
        });

        if (apiMessages.status === 200) {
          setMessages(apiMessages.data);
        }
      } catch (error) {
        console.log("Error getting messages:", error);
      }
    };

    getMessages();
  }, [userMessage]);

  return (
    <div className="card">
      <div className="chat-header">Chat</div>
      <div className="chat-window" ref={chatWindowRef}>
        <ul className="message-list">
          <p className="day text-white"> {day} </p>
          {messages.length <= 0 ? (
            <p className="text-center">No messages Now</p>
          ) : (
            messages.map((message, idx) => {
              return (
                <>
                  <Render
                    message={message}
                    idx={idx}
                    officialUser={officialUser}
                  />
                </>
              );
            })
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
