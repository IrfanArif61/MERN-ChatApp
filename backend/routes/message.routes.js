import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import verifyingToken from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/:id", verifyingToken, getMessages);
router.post("/send/:id", verifyingToken, sendMessage);

export default router;
