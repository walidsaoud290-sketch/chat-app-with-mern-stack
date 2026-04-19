import { useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useGetMethod } from "../fetching_to_backend/to_backend";
import { useState } from "react";
import { useContext } from "react";
import { contextUser } from "../Main/MainChat";
import { headerAnimations } from "../animations/Header/headerAnimations";

const Header = () => {
  const { officialUser } = useContext(contextUser);
  const [id_crypte, setIdCrypte] = useState("");
  const secret = import.meta.env.VITE_SECRET_CRYPTAGE;

  const getUser = async () => {
    try {
      const crypte = encodeURIComponent(
        CryptoJS.AES.encrypt(officialUser._id, secret).toString(),
      );

      setIdCrypte(crypte);
    } catch (error) {
      console.log("Error getting the user :" + error);
      if (error.response) {
        console.log(error.response);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="logo">
            chatApp
          </Link>
        </div>
        <ul className="menu">
          <li>
            <Link to="/chat/contact">Homepage</Link>
          </li>
          <li>
            <Link>Portfolio</Link>
          </li>
          <li>
            <Link>About</Link>
          </li>
        </ul>

        <div className="nav-right">
          <div className="dropdown"></div>

          {/* Profile Dropdown */}
          <div className="dropdown">
            <button className="avatar-btn">
              <div className="avatar">
                <img
                  alt="User avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </button>
            <ul className="dropdown-content profile-dropdown">
              <li>
                <Link
                  to={"/chat/Profile/" + id_crypte}
                  className="dropdown-item"
                >
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/chat/Settings/" + id_crypte}
                  className="dropdown-item"
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link to="/chat/Logout" className="dropdown-item">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
