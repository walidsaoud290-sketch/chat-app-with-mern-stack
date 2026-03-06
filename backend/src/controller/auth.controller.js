import express from "express";
import bcrypt from "bcryptjs";

export const LogIn = async (req, res) => {
  const data = req.body;
  res.status(200).json({
    data: data,
    status: true,
  });
};
