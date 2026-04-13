import "./Profile.css";
import { useContext } from "react";
import { contextUser } from "../Main/MainChat";
import { useEffect } from "react";
import { animationsForProfile } from "../animations/Profile/profileAnimations";
import { useGetMethod } from "../fetching_to_backend/to_backend";
const Profile = () => {
  const { officialUser,setOfficialUser } = useContext(contextUser);
  const getUser = async()=>{
    try {
          const api = await useGetMethod("/data/user");
          if (api.status === 200) {
            setOfficialUser(api.data.user);
          }
        } catch (error) {
          if (error.response) console.log("Error response :" + error.response);
          console.log("Error get official user :" + error);
        }
  }
  useEffect(()=>{
    getUser();
  },[])

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
            <span>Created At</span>
            <p>{new Date(officialUser.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="profile-item">
            <span>Updated At</span>
            <p>{new Date(officialUser.updatedAt).toLocaleDateString()}</p>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Profile;
