import Header from "../Header/Header";
import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import { useGetMethod } from "../fetching_to_backend/to_backend";

const MainChat = () => {
  const [loading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const api = await useGetMethod("/auth/verify");
        if (api.status == 200) {
          console.log("is authenticated ");
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
        console.log(api);
      } catch (error) {
        console.log("Error main chat :" + error);
        setIsAuth(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);
  if (loading) return <p> Loading ... </p>;
  return (
    <>
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
    </>
  );
};

export default MainChat;
