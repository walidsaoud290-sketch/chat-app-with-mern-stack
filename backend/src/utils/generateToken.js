import jwt from "jsonwebtoken";

const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent XSS attacks : cross-site scripting,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "development" ? false : true,
  });
  return token;
};

const generateRefreshToken = (id, res) => {
  const refresh_token = jwt.sign({ id }, process.env.REFRESH_SECRET, {
    expiresIn: "14d",
  });

  res.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "developpement" ? false : true,
  });
  return refresh_token;
};
export { generateRefreshToken, generateToken };
