import React from "react";
import "./ChatPage.css";
import Chat from "../chatFolder/Chat";
import UsersComponent from "../UsersComponentFolder/UsersComponent";
import Header from "../Header/Header";
import Users from "../Users/Users";
const ChatPage = () => {
  return (
    <>
      <Header />
      <div className="parent">
        <div className="div1">
          <Users />
        </div>
        <div className="div2">
          <Chat />
        </div>
        <div className="div3">
          <UsersComponent />
        </div>
      </div>
    </>
  );
};

export default ChatPage;
