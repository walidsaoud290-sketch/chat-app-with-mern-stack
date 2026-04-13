import mulster from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "chat_images",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = mulster({ storage });
export default upload;
