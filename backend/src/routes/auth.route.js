import express from "express";

const router = express.Router();

router.get("/login", (req, res) => {
  res.json({
    data: true,
  });
});

router.get("/signUp", (req, res) => {
  res.send("Sign up server");
});

router.get("/logout", (req, res) => {
  res.send("logout server");
});
export default router;
