import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LogIn from "./forms/LogInFolder/LogIn";
import SignUp from "./forms/SignUpFolder/SignUp";
import { createContext } from "react";

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
          </Routes>
        </BrowserRouter>
      </context.Provider>
    </>
  );
}

export default App;
