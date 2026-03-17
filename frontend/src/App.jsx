import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LogIn from "./forms/LogInFolder/LogIn";
import SignUp from "./forms/SignUpFolder/SignUp";
import { createContext } from "react";
import ChatPage from "./ChatPage/ChatPage";
import Home from "./HomeFolder/Home";
import MainChat from "./Main/MainChat";
import Settings from "./Settings/Settings";
import Logout from "./forms/LogoutFolder/Logout";
import Profile from "./ProfileFolder/Profile";

export const context = createContext();
function App() {
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  return (
    <>
      <context.Provider value={{ errors, setErrors ,setIsFormValid}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/chat" element={<MainChat />}>
              <Route index path="/chat/contact" element={<ChatPage />} />
              <Route path="/chat/Home" element={<Home />} />
              <Route path="/chat/Profile/:email" element={<Profile />} />
              <Route path="/chat/Settings" element={<Settings />} />
              <Route path="/chat/Logout" element={<Logout />} />
            </Route>

            <Route
              path="*"
              element={<h1 className="text-white">Not found Page</h1>}
            />
          </Routes>
        </BrowserRouter>
      </context.Provider>
    </>
  );
}

export default App;
