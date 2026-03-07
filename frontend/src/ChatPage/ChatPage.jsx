import React from "react";
import "./ChatPage.css";
import Chat from "../chatFolder/Chat";
import UsersComponent from "../UsersComponentFolder/UsersComponent";
import Header from "../Header/Header";
const ChatPage = () => {
  return (
    <>
    <Header />
    <div className="parent">
      <div className="div1">1</div>
      <div className="div2">
        <Chat />
      </div>
      <div className="div3"><UsersComponent /></div>
    </div>
    </>
    
  );
};

export default ChatPage;
