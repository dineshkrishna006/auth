/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();
export const signUp = async (req, res) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    // const JWT_EXPIRY = process.env.JWT_EXPIRES_IN;
    const { name, email, password } = req.body;
    // console.log(email);
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      console.log(existingUser);
      return res.status(409).json({ success: false });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create([
      { name, email, password: hashedPassword },
    ]);
    const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log(newUser, "abc");
    return res.status(200).json({
      success: true,
      message: "User created Successfully",
      data: {
        token,
        user: newUser[0],
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
};

export const signIn = async (req, res) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "UsernotFound", status: 404 });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invaid Password" });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: { token, user },
    });
  } catch (error) {
    console.log(error);
  }
};
