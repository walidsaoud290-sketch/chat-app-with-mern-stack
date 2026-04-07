import "./ChatPage.css";
import Chat from "../chatFolder/Chat";
import UsersComponent from "../UsersComponentFolder/UsersComponent";
import Users from "../Users/Users";
import { useEffect } from "react";
import { useState } from "react";
import { useGetMethod } from "../fetching_to_backend/to_backend";
import { useContext } from "react";
import { contextUser } from "../Main/MainChat";

const ChatPage = () => {
  const { officialUser } = useContext(contextUser);
  const [users, setUsers] = useState([]);
  const [userMessage, setUserMessage] = useState({} || users[0]);
  const [isNotified,setIsNotified] = useState(false);
  const getUsers = async () => {
    try {
      const api = await useGetMethod("/data/users_amies");
      if (api.status !== 200) {
        console.log("Error returning amies :");
        return;
      }
      const data = api.data.users;
      const usersData = api.data.users.filter(
        (e) => e._id !== officialUser._id,
      );
      if (data && data.length > 0) {
        setUsers(usersData);
        setUserMessage(usersData[0]);
      }
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
          <Chat userMessage={userMessage} officialUser={officialUser} setIsNotified={setIsNotified} />
        </div>
        <div className="div3">
          <UsersComponent
            userMessage={userMessage}
            officialUser={officialUser}
          />
        </div>
      </div>
    </>
  );
};

export default ChatPage;
