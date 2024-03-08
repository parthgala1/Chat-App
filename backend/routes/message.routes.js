import express from "express";
import { getMessages, sendMessage } from "../controllers/messge.controllers.js";
import protectRoute from "../middlewares/protectRoute.middlewares.js";
const router = express();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
