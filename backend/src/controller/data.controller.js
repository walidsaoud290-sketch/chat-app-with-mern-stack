import User from "../models/User.js";

export const return_data = async (req, res) => {
  try {
    // retourne seulement le champs name (et _id par defaut)
    // const users = await User.find({},'name);
    const data = await User.find({}); // {vide} = tous les documents;
    res.status(200).json({
      users: data,
    });
  } catch (error) {
    res.status(400).json({
      error: "Erreur return data :" + error,
    });
  }
};
