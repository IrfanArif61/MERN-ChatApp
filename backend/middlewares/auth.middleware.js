import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyingToken = async (req, res, next) => {
  try {
    const token =
      req.cookies?.jwt || req.header("Authorization")?.replace("Bearer", "");

    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Token is invalid" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in verifying token middleware");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default verifyingToken;
