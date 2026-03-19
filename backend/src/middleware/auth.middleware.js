import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import { redisClient } from "../config/redis.js";
dotenv.config();

let refreshTokens = [];
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(400).json({
        message: "Token not found",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Error middleware jwt",
    });
  }
};

export const verifyRefreshToken = (req, res, next) => {
  const token = req.cookies.refresh_token;
  try {
    if (!token)
      return res.status(401).json({
        error: "Invalid token",
      });
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    req.userData = decoded;
    console.log(req.userData);
    const refresh_token = refreshTokens.find((e) => e._id === decoded);
    if (!refresh_token)
      return res.status.json({
        message: "Token is not in store",
      });

    next();
  } catch (error) {
    console.log("error verifyToken :" + error);
    return res.status(401).json({
      error_refreshToken: "Error verifying token :" + error,
    });
  }
};

export const verifyAdmin = async (req, res, next) => {
  try {
    const id = req.userData?.id;
    console.log(id);
    const user = await User.findById(id);
    if (!user) {
      console.log("user not found");
      return res.status(401).json({
        message: "User not found",
      });
    }
    if (user.role !== "admin") {
      console.log("Admin user");
      return res.status(400).json({
        message: "Access denied . Admin only",
      });
    }

    console.log("User founded");
    next();
  } catch (error) {
    console.log("Error verifying admin :" + error);
    return res.status(500).json({
      error_middleware: "Error middleware :" + error,
    });
  }
};
