import cloudinary from "../config/cloudinary.js";
import { validationEmail } from "../functions/validation/validationEmail.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const Update = async (req, res) => {
  const { email, username } = req.body;
  let { image } = req.body;

  if (!username) {
    return res.status(400).json({
      error_username: "Username is required",
    });
  }

  if (!email) {
    return res.status(400).json({
      error_email: "Email is required",
    });
  }

  const isValidEmail = validationEmail(email);

  if (!isValidEmail) {
    return res.status(400).json({
      error_email: "Invalid Email format",
    });
  }
  try {
    if (image) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "chat_images",
      });
      image = result.secure_url;
    }

    const token = req.cookies.access_token;
    const id = jwt.verify(token, process.env.JWT_SECRET).id;

    /* const updateUser = await User.findByIdAndUpdate(id, {
      username: username,
      email,
    }); */
    const updateUser = await User.findByIdAndUpdate(id, {
      email: email,
      username: username,
    });

    await updateUser.save();
    return res.status(200).json({
      message: "Updating successfuly",
    });
  } catch (error) {
    console.log("Error profile controller :" + error);
  }
};
