import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useGetMethod} from "../fetching_to_backend/to_backend";
import { useParams } from "react-router-dom";
import CryptoJS from "crypto-js";

const Profile = () => {
  
  const [user, setUser] = useState({});

  const {id} = useParams();
  const decodeEmail = decodeURIComponent(id);

  const decrypte = CryptoJS.AES.decrypt(
    decodeEmail,
    import.meta.env.VITE_SECRET_CRYPTAGE,
  );

  const emailDecrypte = decrypte.toString(CryptoJS.enc.Utf8);

  const getUser = async () => {
    try {
      const api = await useGetMethod("/data/user");
      if (api.status === 200) {
        console.log(api.data);
        setUser(api.data.user);
      }
    } catch (error) {
      console.log("Error getting the user :" + error);
      if(error.response){
        console.log(error.response);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-card">

        <div className="profile-header">
          <img
            src={
              user.profilePic ||
              "https://i.pravatar.cc/150"
            }
            alt="user"
            className="profile-avatar"
          />

          <h2>{user.username}</h2>
          <p className="profile-role">{user.role}</p>
        </div>

        <div className="profile-info">

          <div className="profile-item">
            <span>Email</span>
            <p>{user.email}</p>
          </div>

          <div className="profile-item">
            <span>User ID</span>
            <p>{user._id}</p>
          </div>

          <div className="profile-item">
            <span>Created At</span>
            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>

        </div>

      </div>
    </div>
  )
};

export default Profile;
