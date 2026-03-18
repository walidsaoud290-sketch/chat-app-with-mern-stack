import { useState } from "react";
import { useEffect } from "react";
import { useGetMethod } from "../fetching_to_backend/to_backend";
import "./Users.css";

const Users = ({ users, setUserMessage }) => {
  return (
    <div className="users">
      {users.map((user, _) => {
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
                      user.profilePic
                        ? "https://i.pravatar.cc/150"
                        : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <li className="user">{user.username}</li>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Users;
