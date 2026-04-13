import "./Settings.css";
import { useContext } from "react";
import { contextUser } from "../Main/MainChat";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { settingsAnimations } from "../animations/Settings/settingsAnimation";
import { usePostMethod } from "../fetching_to_backend/to_backend";
import { context } from "../App";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const Settings = () => {
  const { officialUser } = useContext(contextUser);
  const username = useRef();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const email = useRef();
  const secret = import.meta.env.VITE_SECRET_CRYPTAGE;
  const inputImage = useRef();
  const { errors, setErrors } = useContext(context);
  const id = encodeURIComponent(
    CryptoJS.AES.encrypt(officialUser._id, secret).toString(),
  );

  useGSAP(() => {
    settingsAnimations();
  }, []);

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImage = async (e) => {
    let file = e.target.files[0];
    if (file) {
      file = await convertImageToBase64(file);
      setImage(file);
    } else {
      setImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const api = await usePostMethod("/profile/update", {
        email: email.current.value,
        image: image,
        username: username.current.value,
      });
      const status = api.status;
      if (status === 200) {
        console.log(api.data);
        setErrors({});
        navigate("/chat/profile/" + id);
      }
    } catch (error) {
      console.log("Error settings :" + error);
      setErrors(error);
    }
  };

  useEffect(() => {
    setErrors({});
  }, []);

  return (
    <div className="settings-container">
      <div className="settings-card">
        <div className="settings-sidebar">
          <h3 className="settings-title text-white">Settings</h3>

          <ul className="settings-menu">
            <li className="menu-item active">Profile</li>
            <li className="menu-item">Account</li>
            <li className="menu-item">Privacy</li>
            <li className="menu-item">Notifications</li>
          </ul>
        </div>

        <div className="settings-content">
          <div className="settings-user">
            <div className="settings-avatar">
              <input
                type="file"
                style={{ display: "none" }}
                ref={inputImage}
                onChange={handleImage}
              />
              <img
                src={officialUser?.profilePic || "/user.jpg"}
                className="image-user"
                alt=""
                onClick={() => inputImage.current.click()}
              />
            </div>

            <div>
              <h4 className="username text-white">{officialUser?.username}</h4>
              <p className="role text-info"> {officialUser.role} </p>
            </div>
          </div>

          <form className="settings-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-white">Full Name</label>
              <input
                type="text"
                ref={username}
                defaultValue={officialUser?.username}
              />
            </div>
            {errors?.error_username && (
              <p className="text-danger"> {errors.error_username} </p>
            )}

            <div className="form-group">
              <label className="text-white">Email</label>
              <input
                type="email"
                ref={email}
                defaultValue={officialUser.email}
              />{" "}
            </div>
            {errors?.error_email && (
              <p className="text-danger"> {errors.error_email} </p>
            )}

            <div className="settings-info">
              <p>Created at : {officialUser.createdAt}</p>
              <p>Updated at : {officialUser.updatedAt}</p>
            </div>

            <button className="settings-btn">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
