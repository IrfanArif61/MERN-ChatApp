import express from "express";

import verifyingToken from "../middlewares/auth.middleware.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/", verifyingToken, getUsersForSidebar);

export default router;
