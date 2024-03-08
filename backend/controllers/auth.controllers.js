import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signupUser = asyncHandler(async (req, res, next) => {
  const { fullName, username, password, confirmPassword, gender } = req.body;

  if (password != confirmPassword)
    throw new ApiError(400, "Passwor doesn't match");

  const user = await User.findOne({ username });

  if (user) {
    throw new ApiError(409, "Username already exists.");
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Profile Pic Here
  const boyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const girlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

  const newUser = await new User({
    fullName,
    username,
    password: hashedPassword,
    gender,
    profilePic: gender === "male" ? boyPic : girlPic,
  });

  if (newUser) {
    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();

    res
      .status(201)
      .json(new ApiResponse(200, newUser, "User Registered successfully"));
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const isPasswordCorrect = await bcrypt.compare(
    password,
    user?.password || ""
  );

  if (!user || !isPasswordCorrect) {
    throw new ApiError(400, "Invalid username or password");
  }

  generateTokenAndSetCookie(user._id, res);

  res.status(200).json({
    _id: user._id,
    fullName: user.fullName,
    username: user.username,
    profilePic: user.profilePic,
  });
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json(new ApiResponse(200, "Logged Out Successfully"));
});
