import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const usePostMethod = async (path, data) => {
  try {
    const response = await apiClient.post(path, data);
    return response;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      console.log("No response from server");
      throw new Error("No response from server");
    } else {
      console.log("Request error:", error.message);
      throw error;
    }
  }
};

export const useGetMethod = async (path, data) => {
  try {
    const response = await apiClient.get(path, data);
    return response;
  } catch (error) {
    console.log("Error in GET method:", error);

    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw error;
    }
  }
};
