import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import {useGetMethod} from "../fetching_to_backend/to_backend";
const Settings = () => {
  const [user,setUser] = useState({});
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
      if(error.response){
        console.log(error.response);
      }
    }
  };

  useEffect(() => {
    getUser();
    console.log(user);
  }, []);
  return (
    <div>
      <h1 className="text-white text-center">Page Settings</h1>
    </div>
  );
};

export default Settings;
