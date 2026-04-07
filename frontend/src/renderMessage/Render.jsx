import "./Render.css";
const Render = ({ message, idx, officialUser }) => {
  return (
    <>
      <li
        key={idx}
        className={
          message.senderId !== officialUser._id ? "text-start" : "text-end"
        }
      >
        {message.type === "image" ? (
          <div className="image-message">
            {message.senderId === officialUser._id ? (
              <>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                    />
                  </div>
                </div>
              </>
            )}

            <img
              src={message.message}
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
              <span className="timestamp">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-message">
            {message.senderId === officialUser._id ? (
              <>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                    />
                  </div>
                </div>
              </>
            )}
            <span className={`message-content text text-center`}>
              {message.message}
            </span>
            <div className="message-info">
              <span className="sender">
                {message.senderId === officialUser._id ? "" : "other"}{" "}
              </span>
              <br />
              <span className="timestamp">
                {new Date(message.dateTime).toLocaleTimeString()}
              </span>
            </div>
          </div>
        )}
      </li>
    </>
  );
};

export default Render;
