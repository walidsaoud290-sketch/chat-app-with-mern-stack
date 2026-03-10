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
    const api = await axios.post("http://localhost:5000/api" + path, data, {
      headers,
    });
    return api;
  } catch (error) {
    console.log("error fetching data from methode POST :" + error);
    throw error;
  }
};

export const useGetMethod = async (path) => {
  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const api = await axios.get(
      "http://localhost:5000/api" + path,
      {},
      {
        headers,
      },
    );
    return api;
  } catch (error) {
    console.log("Erreur in GET methode :" + error);
    throw error;
  }
};
