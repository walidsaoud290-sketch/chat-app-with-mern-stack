import jwt from "jsonwebtoken";

const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("access_token", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent XSS attacks : cross-site scripting,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "development" ? false : true,
    
  });
  return token;
};

const generateRefreshToken = (id, res) => {
  const refresh_token = jwt.sign({ id }, process.env.REFRESH_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("refresh_token", refresh_token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // JS ne peux pas lire le cookie (protection XSS)
    sameSite: "strict", // protection CSRF
    secure: process.env.NODE_ENV === "developpement" ? false : true, // cookie envoye seulement en HTTPS
  });
  return refresh_token;
};

export { generateRefreshToken, generateToken };
