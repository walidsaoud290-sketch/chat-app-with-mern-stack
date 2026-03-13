import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  console.log(authHeader);

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // invalid token
    req.user = decoded.username;
    next();
  });
};

export const verifyAdmin = async(req, res, next) => {
  try {
    const { email } = req.body;
  const user =await User.find({ email });
  if(!user) {
    return res.status(401).json({
      message:"User not found"
    })
  }
  if (user.role !== "admin") return res.status(400).json({
    message:"Access denied . Admin only"
  });
  next();
  } catch (error) {
    res.status(500).json({
      error_middleware:"Error middleware :"+error
    })
  }
  
};
