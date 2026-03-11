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

export const context = createContext();
function App() {
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState({});

  return (
    <>
      <context.Provider value={{ errors, setErrors, token, setToken }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/chat" element={<MainChat />}>
              <Route index path="/chat/contact" element={<ChatPage />} />
              <Route path="/chat/Home" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </context.Provider>
    </>
  );
}

export default App;
