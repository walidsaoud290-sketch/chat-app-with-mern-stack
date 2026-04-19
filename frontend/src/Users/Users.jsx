import "./Users.css";
const Users = ({ users, setUserMessage }) => {
  return (
    <div className="users">
      {users.map((user, _) => {
        console.log(user);
        return (
          <>
            <div
              className="users-wrapper"
              key={user._id}
              onClick={() => setUserMessage(user)}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={
                      user?.profilePic !== ""
                        ? "/user.jpg"
                        : "frontend/public/user.jpg"
                    }
                  />
                  <h1> {user.status} </h1>
                  <span
                    className={`status-dot ${user.status === "online" ? "online" : "offline"}`}
                  />
                </div>
              </div>
              <li className="username_user">{user.username}</li>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Users;
