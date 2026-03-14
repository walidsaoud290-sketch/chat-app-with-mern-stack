import React from "react";
import "./ChatPage.css";
import Chat from "../chatFolder/Chat";
import UsersComponent from "../UsersComponentFolder/UsersComponent";
import Users from "../Users/Users";
import { useContext } from "react";
import { context } from "../App";
import { useEffect } from "react";
const ChatPage = () => {
  return (
    <>
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
