import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useGetMethod } from "../fetching_to_backend/to_backend";
const Settings = () => {
  const [user, setUser] = useState({});
  const { email } = useParams();
  const decode_id = encodeURIComponent(email);

  const decrypte = CryptoJS.AES.decrypt(
    decode_id,
    import.meta.env.VITE_SECRET_CRYPTAGE,
  );

  const id_decrypte = decrypte.toString(CryptoJS.enc.Utf8);
  console.log(id_decrypte);
  const getUser = async () => {
    try {
      const api = await useGetMethod("/data/user");
      if (api.status === 200) {
        console.log(api.data);
        setUser(api.data.user);
      }
    } catch (error) {
      console.log("Error getting the user :" + error);
      if (error.response) {
        console.log(error.response);
      }
    }
  };

  useEffect(() => {
    getUser();
    console.log(user);
  }, []);

  return (
    <div className="container-fluid bg-dark text-white min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100" style={{ maxWidth: "1000px" }}>
        {/* Sidebar */}
        <div className="col-md-4 bg-black p-4 border-end border-secondary rounded-start">
          <h4 className="mb-4">Settings</h4>

          <ul className="list-unstyled">
            <li className="mb-3 text-secondary" style={{ cursor: "pointer" }}>
              Profile
            </li>
            <li className="mb-3 text-secondary" style={{ cursor: "pointer" }}>
              Account
            </li>
            <li className="mb-3 text-secondary" style={{ cursor: "pointer" }}>
              Privacy
            </li>
            <li className="mb-3 text-secondary" style={{ cursor: "pointer" }}>
              Notifications
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="col-md-8 bg-secondary bg-opacity-25 p-4 rounded-end">
          {/* Header */}
          <div className="d-flex align-items-center mb-4">
            <div
              className="rounded-circle bg-secondary d-flex justify-content-center align-items-center me-3"
              style={{ width: "70px", height: "70px", fontSize: "24px" }}
            >
              {user?.username}
            </div>

            <div>
              <h5 className="mb-0">{user?.name || "User Name"}</h5>
              <small className="text-light">
                {user?.email || "email@example.com"}
              </small>
            </div>
          </div>

          {/* Form */}
          <form>
            <div className="mb-3">
              <label className="form-label text-light">Full Name</label>
              <input
                type="text"
                className="form-control bg-dark text-white border-secondary"
                value={user?.username || ""}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-light">Email</label>
              <input
                type="email"
                className="form-control bg-dark text-white border-secondary"
                value={user?.email || ""}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-light">Bio</label>
              <textarea
                className="form-control bg-dark text-white border-secondary"
                rows="3"
                placeholder="Write something about you..."
              ></textarea>
              <div>
                <p className="text-info">
                  {" "}
                  Created at : <span> {user.createdAt} </span>{" "}
                </p>
                <p className="text-info">Updated At : {user?.updatedAt} </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-between mt-4">
              <button type="button" className="btn btn-danger">
                Delete Account
              </button>

              <button type="button" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
