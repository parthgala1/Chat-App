import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.models.js";

const JWT_SECRET = "BgWThx8Te4DIhMO3bVW3DGdjK+21ubxmH+PjyzcL2fk=";

const protectRoute = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new ApiError(401, "Unauthorized - No Token Provided");
  }

  const decoded = jwt.verify(token, JWT_SECRET || process.env.JWT_SECRET);

  if (!decoded) {
    throw new ApiError(401, "Unauthorized - Invalid Token");
  }

  const user = await User.findById(decoded.userId).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  req.user = user;

  next();
};

export default protectRoute;
