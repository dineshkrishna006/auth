import User from "../models/user.model.js";
import dotenv from "dotenv";

export const getUser = async (req, res) => {
  try {
    const user_ = await User.findOne({ _id: req.params.id });
    console.log(user_);
    return res.status(200).json(user_);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Error" });
  }
};
