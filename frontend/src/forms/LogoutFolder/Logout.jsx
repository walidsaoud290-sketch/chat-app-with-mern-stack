import { useEffect } from "react";
import { usePostMethod } from "../../fetching_to_backend/to_backend";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { context } from "../../App";

const Logout = () => {
  const { setIsAuth } = useContext(context);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const api = await usePostMethod("/auth/logout");
      if (api.status === 200) {
        console.log("Logout successfuly");
        console.log(api.data);
        navigate("/");
        setIsAuth(false);
      }
    } catch (error) {
      throw Error("Error Logout :" + error);
    }
  };
  useEffect(() => {
    logout();
  }, []);
  return <></>;
};

export default Logout;
