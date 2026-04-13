import { useContext, useState } from "react";
import { contextUser } from "../Main/MainChat";

const Notifications = () => {
  const { notifications, setNotifications } = useContext(contextUser);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAll = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getInitials = (senderId) =>
    senderId ? String(senderId).slice(0, 2).toUpperCase() : "??";

  const formatTime = (dateTime) => {
    const diff = Math.floor((Date.now() - new Date(dateTime)) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div style={styles.wrapper}>
      {open && (
        <div style={styles.panel}>
          <div style={styles.header}>
            <span style={styles.title}>Notifications</span>
            <button style={styles.markAllBtn} onClick={markAll}>
              Mark all as read
            </button>
          </div>

          <div style={styles.list}>
            {notifications.length === 0 ? (
              <p style={styles.empty}>No notifications</p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  style={{
                    ...styles.item,
                    background: n.read ? "transparent" : "#e6f1fb22",
                  }}
                  onClick={() => markRead(n.id)}
                >
                  <div style={styles.avatar}>{getInitials(n.senderId)}</div>
                  <div style={styles.body}>
                    <p style={styles.msg}>{n.message}</p>
                    <span style={styles.time}>{formatTime(n.dateTime)}</span>
                  </div>
                  {!n.read && <div style={styles.dot} />}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <button style={styles.bell} onClick={() => setOpen((o) => !o)}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {unreadCount > 0 && (
          <span style={styles.badge}>
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>
    </div>
  );
};

const styles = {
  wrapper: {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    zIndex: 9999,
    fontFamily: "inherit",
  },
  panel: {
    position: "absolute",
    bottom: "58px",
    right: 0,
    width: "320px",
    background: "#fff",
    border: "0.5px solid #ccc",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    borderBottom: "0.5px solid #e5e5e5",
  },
  title: { fontSize: "14px", fontWeight: 500 },
  markAllBtn: {
    fontSize: "12px",
    color: "#888",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
  },
  list: { maxHeight: "320px", overflowY: "auto" },
  item: {
    display: "flex",
    gap: "10px",
    padding: "12px 16px",
    borderBottom: "0.5px solid #f0f0f0",
    cursor: "pointer",
    alignItems: "flex-start",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#dbeeff",
    color: "#185fa5",
    fontSize: "13px",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  body: { flex: 1 },
  msg: { fontSize: "13px", margin: "0 0 2px", lineHeight: 1.4 },
  time: { fontSize: "11px", color: "#aaa" },
  dot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#378ADD",
    marginTop: "5px",
    flexShrink: 0,
  },
  bell: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "#fff",
    border: "0.5px solid #ccc",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: "6px",
    right: "6px",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    background: "#E24B4A",
    color: "#fff",
    fontSize: "10px",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    padding: "32px 16px",
    textAlign: "center",
    fontSize: "13px",
    color: "#aaa",
  },
};

export default Notifications;
