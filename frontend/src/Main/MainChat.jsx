import Header from "../Header/Header";
import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useGetMethod } from "../fetching_to_backend/to_backend";
import { createContext } from "react";
import { io } from "socket.io-client";
import Notifications from "../NotificationsFolder/NotificationBell";
import notificationSound from "../assets/notification.mp3";
import { useReducer } from "react";
import { formReducer, initialState } from "./reducers";
export const contextUser = createContext();

const playNotification = () => {
  const audio = new Audio(notificationSound);
  audio.play();
};

const MainChat = () => {
  const [officialUser, setOfficialUser] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [userMessage, setUserMessage] = useState({});
  const [reducer,dispatch] = useReducer(formReducer,initialState);


  const getUser = async () => {
    try {
      const api = await useGetMethod("/data/user");
      if (api.status === 200) {
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
        dispatch({type:"isAuth",payload:true});
        await getUser();
      } else {
        dispatch({type:"isAuth",payload:false});
      }
    } catch (error) {
      console.log("Error main chat :" + error);
      dispatch({type:"isAuth",payload:false});
    } finally {
      dispatch({type:"loading",payload:false});
    
    }
  };

  useEffect(() => {
    if (reducer.isAuth) getUser();
  }, [reducer.isAuth]);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (reducer.isAuth && officialUser._id) {
      const SOCKET_URL =
        import.meta.env.VITE_SOCKET_IO_NOTIFICATION || "http://localhost:7000";
      console.log("Connecting to notification socket:", SOCKET_URL);

      const newSocket = io(SOCKET_URL, {
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      newSocket.on("connect", () => {
        console.log("Notification socket connected");
        newSocket.emit("join_room_notifications", officialUser._id);
      });

      newSocket.on("connect_error", (error) => {
        console.error("Notification socket connection error:", error);
      });

      newSocket.on("notification_room_joined", (data) => {
        console.log("Joined notification room:", data);
      });
      dispatch({type:"socket",payload:newSocket});

      return () => {
        console.log("Disconnecting notification socket");
        if (newSocket) {
          newSocket.disconnect();
        }
      };
    }
  }, [reducer.isAuth, officialUser._id]);

  useEffect(() => {
    if (!reducer.socket) return;

    const handleNotification = (data) => {
      console.log("Received notification:", data);
      if (officialUser._id === data.receiverId) {
        const notification = {
          id: Date.now(),
          senderId: data.senderId,
          receiverId: data.receiverId,
          message: data.message,
          dateTime: data.dateTime || new Date().toISOString(),
          read: false,
          user: data.user,
        };
        console.log("New notification:", notification);

        if (userMessage !== notification.receiverId) {
          setNotifications((prev) => [notification, ...prev]);
          playNotification();
        } else {
          setNotifications([]);
        }

        if (Notification.permission === "granted") {
          new Notification("New Message", {
            body: `You received a new message`,
            icon: "/favicon.ico",
          });
        }
      }
    };

    reducer.socket.on("send_notification", handleNotification);

    return () => {
      reducer.socket.off("send_notification", handleNotification);
    };
  }, [reducer.socket, officialUser._id]);


  if (reducer.loading) return <p> Loading ... </p>;

  return (
    <>
      <contextUser.Provider
        value={{
          officialUser,
          setOfficialUser,
          notifications,
          setNotifications,
          userMessage,
          setUserMessage,
        }}
      >
        <div className="header">
          <Header />
        </div>
        <Notifications />
        {reducer.isAuth ? (
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
