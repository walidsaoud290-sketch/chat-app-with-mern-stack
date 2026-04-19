import { useGetMethod } from "../../fetching_to_backend/to_backend";

export const getOfficialUser = async () => {
  try {
    const api = await useGetMethod("/data/user");
    if (api.status === 200) {
      return api.data.user;
    }
  } catch (error) {
    if (error.response) console.log("Error response :" + error.response);
    console.log("Error get official user :" + error);
  }
};
