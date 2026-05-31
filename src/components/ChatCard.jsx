import "./ChatCard.css";

export default function ChatCard({
  id,
  profile,
  name,
  lastChat,
  time,
  isRead,
}) {
  return (
    <div className="card">
      <div className="profile">
        <img src={profile} alt={name} />
      </div>

      <div className="card-info">
        <span className="card-name">{name}</span>
        <span className="last-chat">{lastChat}</span>
      </div>

      <div className="card-status">
        <span>{time}</span>
        <span className={isRead ? "read" : "unread"}>
          {!isRead ? "Read" : "Unread"}
        </span>
      </div>
    </div>
  );
}