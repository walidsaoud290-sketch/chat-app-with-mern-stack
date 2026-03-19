import { redisClient } from "../config/redis.js";
import User from "../models/User.js";

export const get_users = async (req, res) => {
  try {
    // retourne seulement le champs name (et _id par defaut)
    // const users = await User.find({},'name);
    const data = await User.find({}).select("username email role"); // {vide} = tous les documents;
    res.status(200).json({
      users: data,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Erreur return data :" + error,
    });
  }
};

export const get_limit_users = async (req, res) => {
  try {
    const users_from_redis = await redisClient.get("users_chat");

    if (users_from_redis) {
      const parsed = JSON.parse(users_from_redis);
      if (parsed.length <= 0) {
        return res.status(400).json({ message: "Empty list users" });
      }
      return res.status(200).json({ users: parsed });
    }

    const users = await User.find({});

    if (users.length <= 0) {
      return res.status(400).json({ message: "Empty list users" });
    }

    await redisClient.set("users_chat", JSON.stringify(users), { EX: 60 });
    return res.status(200).json({ users: users });
  } catch (error) {
    return res.status(500).json({
      message: "Error get limiting users: " + error,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const {id} = req.userData;
    if (!id) return res.status(400).json({ message: "Unauthorized" });
    const user =await User.findById(id);

    if (!user) return res.status(400).json({ message: "Not found user" });

    return res.status(200).json({
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error getUser :" + error,
    });
  }
};
