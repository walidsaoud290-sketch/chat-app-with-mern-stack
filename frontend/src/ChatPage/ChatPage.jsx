import "./ChatPage.css";
import Chat from "../chatFolder/Chat";
import UsersComponent from "../UsersComponentFolder/UsersComponent";
import Users from "../Users/Users";
import { useEffect } from "react";
import { useState } from "react";
import { useGetMethod } from "../fetching_to_backend/to_backend";

const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [userMessage,setUserMessage] = useState({});

  const getUsers = async () => {
    try {
      const api = await useGetMethod("/data/users_amies");
      console.log(api);
      const data = api.data.users;
      if (data && data.length > 0) {
        console.log(data);
        setUsers(data);
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
  }, []);
  return (
    <>
      <div className="parent">
        <div className="div1">
          {users.length <= 0 ? (
            <p className="text-white">there is no friends</p>
          ) : (
            <Users users={users} setUserMessage={setUserMessage} />
          )}
        </div>
        <div className="div2">
          <Chat  userMessage={userMessage} />
        </div>
        <div className="div3">
          <UsersComponent userMessage={userMessage}/>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
