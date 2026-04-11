import Header from "../Header/Header";
import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { useGetMethod } from "../fetching_to_backend/to_backend";
import { createContext } from "react";
import { store } from "../chat-redux/store.js";
export const contextUser = createContext();
const MainChat = () => {
  const [loading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [officialUser, setOfficialUser] = useState({});

  const getUser = async () => {
    try {
      const api = await useGetMethod("/data/user");
      if (api.status === 200) {
        console.log(api.data);
        setOfficialUser(api.data.user);
      }
    } catch (error) {
      if (error.response) console.log("Error response :" + error.response);
      console.log("Error get official user :" + error);
    }
  };

  const checkAuth = async () => {
    try {
      const api = await useGetMethod("/auth/verify");
      if (api.status == 200) {
        console.log("is authenticated ");
        setIsAuth(true);
        await getUser();
      } else {
        setIsAuth(false);
      }
      console.log(api.data);
    } catch (error) {
      console.log("Error main chat :" + error);
      setIsAuth(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  if (loading) return <p> Loading ... </p>;
  return (
    <>
      <contextUser.Provider value={{ officialUser, setOfficialUser }}>
        <div className="header">
          <Header />
        </div>
        {isAuth ? (
          <>
            <div>
                <Outlet />

            </div>
          </>
        ) : (
          <Navigate to={"/"} replace />
        )}
      </contextUser.Provider>
    </>
  );
};

export default MainChat;
