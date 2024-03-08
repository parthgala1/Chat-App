import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.models.js";

export const getUsersForSidebar = asyncHandler(async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // console.log(loggedInUserId);

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    // console.log(filteredUsers);

    if (!filteredUsers || filteredUsers.length === 0) {
      throw new ApiError(404, "No users found");
    }

    // Sort the array by last message
    res.status(200).json(filteredUsers);
  } catch (error) {
    throw new ApiError(500, `Internal server error: ${error}`);
  }
});
