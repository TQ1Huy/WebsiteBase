import mongoose from "mongoose";
import { verify } from "node:crypto";
import { resolve } from "node:dns";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  forgotPasswordToken: String,

  forgotPasswordExpiry: Date,

  verifyToken: String,

  verifyTokenExpiry: Date,
});

const User =
  mongoose.models.User ||
  mongoose.model("User", userSchema);

export default User;