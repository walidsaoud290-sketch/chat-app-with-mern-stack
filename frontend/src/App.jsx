import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import { useGetMethod } from "./fetching_to_backend/to_backend";

export const context = createContext();
function App() {
  const [errors, setErrors] = useState({});
  const [loading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        const api = await useGetMethod("/auth/verify");
        const status = api.status;
        if (status === 200) {
          setIsAuth(true);
        }else{
          setIsAuth(false);
        }
      } catch (error) {
        if (error.response) {
          console.log("Erreur response :" + error.response);
        }
        setIsAuth(false);
        console.log("Erreur App : " + error);
      }finally{
        setIsLoading(false);
      }
    };
    isAuthenticated();
  }, []);

  if(loading) return <h1 className="text-white">Loading ....</h1>

  return (
    <>
    <h1 className="text-white">Welcome to chat App</h1>
       <context.Provider value={{ errors, setErrors,setIsAuth }}>
      <BrowserRouter>
        <Routes>

          {/* Routes publiques */}
          <Route
            path="/"
            element={!isAuth ? <LogIn /> : <Navigate to="/chat/contact" />}
          />
          <Route
            path="/signUp"
            element={!isAuth ? <SignUp /> : <Navigate to="/chat/contact" />}
          />

          {/* Routes protégées */}
          <Route
            path="/chat"
            element={isAuth ? <MainChat /> : <Navigate to="/" replace />}
          >
            <Route path="contact" element={<ChatPage />} />
            <Route path="Home" element={<Home />} />
            <Route path="Profile/:email" element={<Profile />} />
            <Route path="Settings/:id" element={<Settings />} />
            <Route path="Logout" element={<Logout />} />
          </Route>

          {/* Route inconnue */}
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
