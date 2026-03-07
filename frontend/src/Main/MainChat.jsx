import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

const MainChat = () => {
  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default MainChat;
