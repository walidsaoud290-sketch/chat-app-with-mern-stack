import axios from "axios";

export const usePostMethod = async (path, data) => {
  const token = localStorage.getItem("token");
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = "Bearer " + token;
  }
  try {
    const api = await axios.post("http://localhost:3000/api" + path, data, {
      headers,
    });
    return api;
  } catch (error) {
    console.log("error fetching data from methode POST :" + error);
  }
};
