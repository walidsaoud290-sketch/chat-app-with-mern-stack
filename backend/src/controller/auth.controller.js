import express from "express";
import bcrypt from "bcryptjs";
import { generateRefreshToken, generateToken } from "../utils/generateToken.js";
import User from "../models/User.js";

const validationEmail = (email) => {
  const isCorrecte = email.split("@");
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = regex.test(email);
  if (!isNaN(isCorrecte[0]) || !isValid) {
    return false;
  }
  return true;
};

// Login
export const LogIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email && !password) {
      return res.status(400).json({
        error_message: "All field are required",
      });
    }

    if (!email) {
      return res.status(400).json({
        email: "Email is required",
      });
    }
    const isCorrecteEmail = validationEmail(email);
    if (!isCorrecteEmail) {
      return res.status(400).json({
        email: "Incorrecte email format",
      });
    }

    if (!password) {
      return res.status(400).json({
        password: "Password is required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: false,
        error_message: "Not found please sign up",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        error_message: "Invalid Password",
      });
    }

    const token = generateToken(user._id, res);
    const refresh_token = generateRefreshToken(user._id, res);
    return res.json({
      user: user,
      token: token,
      refresh_token: refresh_token,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Error controller LogIn :" + error,
    });
  }
};

// Sign up
export const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!email && !password && !username) {
      return res.status(400).json({
        error_message: "All field are required",
      });
    }
    if (!username) {
      return res.status(400).json({
        username: "your name is required",
      });
    }
    if (!email) {
      return res.status(400).json({
        email: "Email is required",
      });
    }
    const isCorrecteEmail = validationEmail(email);
    if (!isCorrecteEmail) {
      return res.status(400).json({
        email: "Invalid email format",
      });
    }
    if (!password) {
      return res.status(400).json({
        password: "Password is required",
      });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        error_message: "Email already exist",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const Hash_password = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: Hash_password,
      role: "user",
    });

    if (newUser) {
      const token = generateToken(newUser._id, res);
      const refresh_token = generateRefreshToken(newUser._id,res);
      await newUser.save();
      res.status(200).json({
        refresh_token: refresh_token,
        token: token,
      });
    } else {
      res.status(400).json({
        error_message: "Invalid data",
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: "Error controller Sign up:" + error,
    });
  }
};

// Logout
const logout = async (req, res) => {

};
