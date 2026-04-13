import Header from "../Header/Header";
import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useGetMethod } from "../fetching_to_backend/to_backend";
import { createContext } from "react";
import { io } from "socket.io-client";
import Notifications from "../NotificationsFolder/NotificationBell";

export const contextUser = createContext();

const MainChat = () => {
  const [loading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [officialUser, setOfficialUser] = useState({});
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

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
        setIsAuth(true);
        await getUser();
      } else {
        setIsAuth(false);
      }
    } catch (error) {
      console.log("Error main chat :" + error);
      setIsAuth(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth) getUser();
  }, [isAuth]);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuth && officialUser._id) {
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

      setSocket(newSocket);

      return () => {
        console.log("Disconnecting notification socket");
        if (newSocket) {
          newSocket.disconnect();
        }
      };
    }
  }, [isAuth, officialUser._id]);

  useEffect(() => {
    if (!socket) return;

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
        };
        console.log("New notification:", notification);
        setNotifications((prev) => [notification, ...prev]);

        if (Notification.permission === "granted") {
          new Notification("New Message", {
            body: `You received a new message`,
            icon: "/favicon.ico",
          });
        }
      }
    };

    socket.on("send_notification", handleNotification);

    return () => {
      socket.off("send_notification", handleNotification);
    };
  }, [socket, officialUser._id]);

  useEffect(() => {
    console.log("Current notifications:", notifications);
  }, [notifications]);

  if (loading) return <p> Loading ... </p>;

  return (
    <>
      <contextUser.Provider
        value={{
          officialUser,
          setOfficialUser,
          notifications,
          setNotifications,
        }}
      >
        <div className="header">
          <Header />
        </div>
        <Notifications />
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
