import { useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useGetMethod } from "../fetching_to_backend/to_backend";
import { useState } from "react";
import { useContext } from "react";
import { contextUser } from "../Main/MainChat";

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
            daisyUI
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
          {/* Cart Dropdown */}
          <div className="dropdown">
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />{" "}
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>
          </div>

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
