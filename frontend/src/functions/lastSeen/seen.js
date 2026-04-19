function formatLastSeen(date) {
  if (!date) return "";

  const lastSeen = new Date(date);
  const now = new Date();

  const diff = Math.floor((now - lastSeen) / 1000);

  if (diff < 60) return "last seen just now";

  if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `last seen ${minutes} min ago`;
  }

  if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `last seen ${hours} h ago`;
  }

  return `last seen ${lastSeen.toLocaleDateString()} ${lastSeen.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}
export default formatLastSeen;
