import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
dotenv.config();

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(400).json({
      message:"Error middleware jwt"
    })
  }
};

export const verifyAdmin = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.find({ email });
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    if (user.role !== "admin")
      return res.status(400).json({
        message: "Access denied . Admin only",
      });
    next();
  } catch (error) {
    return res.status(500).json({
      error_middleware: "Error middleware :" + error,
    });
  }
};
