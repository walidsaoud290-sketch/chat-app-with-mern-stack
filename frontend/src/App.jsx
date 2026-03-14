import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LogIn from "./forms/LogInFolder/LogIn";
import SignUp from "./forms/SignUpFolder/SignUp";
import { createContext } from "react";
import Chat from "./chatFolder/Chat";
import ChatPage from "./ChatPage/ChatPage";
import Home from "./HomeFolder/Home";
import MainChat from "./Main/MainChat";
import Settings from "./Settings/Settings";
import { useRef } from "react";
import Logout from "./forms/LogoutFolder/Logout";

export const context = createContext();
function App() {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});
  const userApp = useRef();
  return (
    <>
      <context.Provider value={{ errors, setErrors, user, setUser, userApp }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/chat" element={<MainChat />}>
              <Route index path="/chat/contact" element={<ChatPage />} />
              <Route path="/chat/Home" element={<Home />} />
              <Route path="/chat/Settings" element={<Settings />} />
              <Route path="/chat/Logout" element={<Logout />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </context.Provider>
    </>
  );
}

export default App;
