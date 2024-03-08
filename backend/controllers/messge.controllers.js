import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Conversation } from "../models/conversation.models.js";
import { Message } from "../models/message.models.js";

export const sendMessage = asyncHandler(async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    //SOCKET IO WILL BE HERE

    // This is time taking
    // await conversation.save();
    // await newMessage.save();
    //To optimize this use the code below, this will run in parallel

    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (error) {
    throw new ApiError(500, "Internal server error");
  }
});

export const getMessages = asyncHandler(async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversationsWithUser = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); //NOT a reference but actual messages

    if (!conversationsWithUser) res.status(200).json([]);

    const messages = conversationsWithUser.messages;
    res.status(200).json(messages);
  } catch (error) {
    throw new ApiError(500, "Internal server error");
  }
});
