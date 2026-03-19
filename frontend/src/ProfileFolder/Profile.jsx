import "./Profile.css";
import { useContext } from "react";
import { contextUser } from "../Main/MainChat";

const Profile = () => {
  const { officialUser } = useContext(contextUser);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={officialUser.profilePic || "https://i.pravatar.cc/150"}
            alt="user"
            className="profile-avatar"
          />

          <h2>{officialUser.username}</h2>
          <p className="profile-role">{officialUser.role}</p>
        </div>

        <div className="profile-info">
          <div className="profile-item">
            <span>Email</span>
            <p>{officialUser.email}</p>
          </div>

          <div className="profile-item">
            <span>User ID</span>
            <p>{officialUser._id}</p>
          </div>

          <div className="profile-item">
            <span>Created At</span>
            <p>{new Date(officialUser.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
