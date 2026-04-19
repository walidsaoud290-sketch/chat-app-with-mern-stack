import "./Render.css";

const Render = ({ message, idx, officialUser }) => {
  const isOwnMessage = message.senderId === officialUser._id;

  return (
    <li
      key={idx}
      className={`message-item ${isOwnMessage ? "message-own" : "message-other"}`}
    >
      {message.type === "image" ? (
        <div className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}>
          <div className="chat-image avatar">
            <div className="avatar-circle">
              <img
                alt="Profile avatar"
                src={
                  isOwnMessage
                    ? "https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                    : "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                }
              />
            </div>
          </div>
          <div className="chat-header">
            {isOwnMessage ? "You" : "Other User"}
            <time className="chat-time">
              {new Date(message.dateTime).toLocaleTimeString()}
            </time>
          </div>
          <div
            className={`chat-bubble ${isOwnMessage ? "chat-bubble-own" : "chat-bubble-other"}`}
          >
            <img
              src={message.message}
              alt="Chat content"
              className="chat-image-message"
              onClick={() => window.open(message.message, "_blank")}
            />
          </div>
          <div className="chat-footer">
            {isOwnMessage ? "Delivered" : "Received"}
          </div>
        </div>
      ) : (
        <div className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}>
          <div className="chat-image avatar">
            <div className="avatar-circle">
              <img
                alt="Profile avatar"
                src={
                  isOwnMessage
                    ? "https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                    : "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                }
              />
            </div>
          </div>
          <div className="chat-header">
            {isOwnMessage ? "You" : "Other User"}
            <time className="chat-time">
              {new Date(message.dateTime).toLocaleTimeString()}
            </time>
          </div>
          <div
            className={`chat-bubble ${isOwnMessage ? "chat-bubble-own" : "chat-bubble-other"}`}
          >
            {message.message}
          </div>
          <div className="chat-footer">
            {isOwnMessage ? "Delivered" : "Received"}
          </div>
        </div>
      )}
    </li>
  );
};

export default Render;
