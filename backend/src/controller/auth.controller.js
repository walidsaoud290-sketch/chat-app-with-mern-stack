import bcrypt from "bcryptjs";
import { generateRefreshToken, generateToken } from "../utils/generateToken.js";
import User from "../models/User.js";
import { redisClient } from "../config/redis.js";
import { producer } from "../config/kafka.js";
import { validationEmail } from "../functions/validation/validationEmail.js";


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
    await producer.send({
      topic: "email-successful",
      messages: [
        {
          value: JSON.stringify({
            email: user.email,
            username: user.username,
          }),
        },
      ],
    });
    const token = generateToken(user._id, res);
    const refresh_token = generateRefreshToken(user._id, res);

    await redisClient.set("refresh_token:" + user._id, refresh_token);
    return res.json({
      user: user,
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

    const user = await User.findOne({ email });
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
    });

    if (newUser) {
      await newUser.save();
      const token = generateToken(newUser._id, res);
      const refresh_token = generateRefreshToken(newUser._id, res);

      await redisClient.set("refresh_token:" + newUser._id, refresh_token, {
        EX: 60 * 60 * 24 * 7,
      });

      return res.status(200).json({
        id: newUser._id,
        username: username,
        email: email,
      });
    } else {
      return res.status(400).json({
        error_message: "Invalid data",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Error controller Sign up:" + error,
    });
  }
};

// Logout
export const logout = async (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  return res.json({
    message: "Logout successfuly",
  });
};
