import { useState } from "react";
import { useEffect } from "react";
import { useGetMethod } from "../fetching_to_backend/to_backend";
import "./Users.css";
import { useContext } from "react";
import { context } from "../App";
const Users = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(context);
  const getUsers = async () => {
    try {
      const api = await useGetMethod("/data/users", user);
      const data = api.data;
      if (data) {
        setUsers(data.users);
      }
      console.log(data.users);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
      throw new Error("Error Users :" + error);
    }
  };

  useEffect(() => {
    getUsers();
    console.log(user);
  }, []);

  return (
    <div>
      {users.length < 0 ? (
        <h1>Not found</h1>
      ) : (
        users.map((user, _) => {
          return (
            <>
              <div className="users-wrapper" key={user._id}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={
                        user.username === "salma"
                          ? "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                          : "https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                      }
                    />
                  </div>
                </div>
                <li className="user">{user.username}</li>
              </div>
            </>
          );
        })
      )}
    </div>
  );
};

export default Users;
