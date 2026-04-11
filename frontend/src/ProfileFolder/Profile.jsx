import "./Profile.css";
import { useContext } from "react";
import { contextUser } from "../Main/MainChat";
import { useRef } from "react";
import gsap from "gsap";
import { useEffect } from "react";
import { animationsForProfile } from "../animations/Profile/profileAnimations";
const Profile = () => {
  const { officialUser } = useContext(contextUser);
  const imageProfile = useRef();

  useEffect(() => {
    animationsForProfile();
  }, []);
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={officialUser.profilePic || "/user.jpg"}
            alt="user"
            className="profile-avatar"
          />

          <h2 className="h2">{officialUser.username}</h2>
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
